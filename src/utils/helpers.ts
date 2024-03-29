/* eslint-disable  @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment */
/**
 * Combines multiple, sequential path segments into one normalized path
 * with a single "/" character between the segments.
 * @param args Path arguments
 * @returns {String} Returns the combined, normalized path
 */
import { IFormData } from '../routing/types';

const buildPath = (...args: string[]): string => {
  return args
    .map((part, i) => {
      if (i === 0) {
        return part.trim().replace(/[/]*$/g, '');
      } else {
        return part.trim().replace(/(^[/]*|[/]*$)/g, '');
      }
    })
    .filter((x) => x.length)
    .join('/');
};

/**
 * Returns the same normalized path as the buildPath function, but
 * the path will always start with a leading "/" character.
 * @param args Path arguments
 * @returns {String} Returns the combined, normalized path with a leading "/"
 */
const buildRelativePath = (...args: string[]): string => {
  const path = buildPath(...args);

  return path.startsWith('/') ? path : `/${path}`;
};

/**
 * The class used to parse and map a VA JSON schema into an object that can be used by Formik
 */
class JSONSchemaMapper {
  private _jsonProperties: any;
  private _definitions: any;

  constructor(schema: any) {
    this._jsonProperties = schema.properties;
    this._definitions = schema.definitions;
  }

  public get jsonProperties(): any {
    return this._jsonProperties;
  }

  /**
   * Recursively iterate through an object's properties and reduce them into a flatter object
   *
   * @param objectToReduce
   */
  public flattenProperties = (objectToReduce: any) => {
    return Object.entries(objectToReduce).reduce(
      (accumulator, [currentKey, currentValue]) => {
        return this.appendProperty(accumulator, currentKey, currentValue);
      },
      {}
    );
  };

  /**
   * Finds a definition based on the refString passed in, then flattens the definition object
   *
   * @param refString - a string in the form #/definitions/<reference>, where
   * <reference> is a reference to some preset definition
   */
  getReferencedType = (refString: string): any => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const referencedDefinition: string = /\/([A-Za-z]+)$/.exec(refString)![1];
    if (referencedDefinition === 'centralMailAddress') {
      return {
        isMilitaryBaseOutside: null,
        streetAddress: '',
        streetAddressLine2: '',
        streetAddressLine3: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
      };
    }
    const definition: any = this._definitions[referencedDefinition];
    switch (definition.type) {
      case 'array':
        return [this.flattenProperties(definition.items.properties)];
      case 'object':
        return this.flattenProperties(definition.properties);
      default:
        return undefined;
    }
  };

  /**
   * For the passed key/value pair, flatten the value as much as possible, then append
   * the key and updated value to the objectToAppendTo parameter
   *
   * @param objectToAppendTo
   * @param key
   * @param initialValue
   */
  appendProperty = (
    objectToAppendTo: any,
    key: string,
    initialValue: any
  ): any => {
    let updatedValue: any;
    if (initialValue.$ref) {
      updatedValue = this.getReferencedType(initialValue.$ref);
    } else {
      switch (initialValue.type) {
        case 'array':
          if (initialValue.items.$ref) {
            updatedValue = [this.getReferencedType(initialValue.items.$ref)];
          } else {
            updatedValue = [
              this.flattenProperties({
                ...initialValue.items.properties,
                isOpen: true,
              }),
            ];
          }
          break;
        case 'object':
          updatedValue = this.flattenProperties(initialValue.properties);
          break;
        default:
          updatedValue = undefined;
          break;
      }
    }

    objectToAppendTo[key] = updatedValue;
    return objectToAppendTo;
  };
}

/**
 * A function to transform a VA schema into a flattened, Formik compatible object
 *
 * @param schema
 */
export const transformJSONSchema = (schema: any) => {
  const schemaMapper = new JSONSchemaMapper(schema);
  return schemaMapper.flattenProperties(schemaMapper.jsonProperties);
};

export const CapitalizeFirstLetter = (value: string): string => {
  return value.trim().charAt(0).toUpperCase() + value.trim().slice(1);
};

/**
 * A function to transform a dateString in the form yyyy-mm-dd into a javascript date object. This is necessary because
 * parsing the date string will result in a date one day before the expected value
 *
 * @param dateString
 */
export const parseDate = (dateString: string): Date => {
  const [yyyy, mm, dd] = dateString.split('-').map((str) => parseInt(str));
  return new Date(yyyy, mm - 1, dd);
};

/**
 * Returns the value after checking if its value is not undefined.
 *
 * @remarks
 *
 * @param key - The key is of type string
 * @param value - The value can be of any type like string, boolean, object, number.
 *
 */
export const StringifyFormReplacer = (key: string, value: any): unknown => {
  // an object with country is an address
  const isAddress =
    typeof value?.country !== 'undefined' &&
    (!value.street || !value.city || (!value.postalCode && !value.zipcode));

  if (isAddress) return undefined;

  // converting string to boolean
  if (value === 'false' || value === 'true') {
    value = value === 'false' ? false : true;
  }

  // clean up empty objects, which we have no reason to send
  if (typeof value === 'object') {
    const fields = Object.keys(value || {});
    if (
      fields.length === 0 ||
      fields.every((field) => value[field] === undefined || value[field] === '')
    ) {
      return undefined;
    }
  }

  // Clean up empty objects in arrays
  if (Array.isArray(value)) {
    const newValues = value.filter((v) => !!StringifyFormReplacer(key, v));
    // If every item in the array is cleared, remove the whole array
    return newValues.length > 0 ? newValues : undefined;
  }

  return value;
};

/**
 * Returns null if value is undefined, otherwise returns value
 *
 * @param value - The value can be of any type like string, boolean, object, number.
 *
 */
export const replaceUndefinedWithNull = (value: any): unknown => {
  return value === undefined ? null : value;
};

/**
 * Returns JSON string after removing all ui initial values.
 *
 * @param values - The object contains all the filled values as JSON string
 * @param uiInitialValues - The object initialized for ui validation contains list of key value pair.
 *
 */
export const removeUiInitialValues = (
  values: string,
  uiInitialValues: IFormData
): string => {
  // Parsing the JSON string
  const parsedData = JSON.parse(values);

  // Creating list of keys in uiInitialValues
  const keys = Object.keys(uiInitialValues);

  // Looping through the parsedData object
  for (const key of Object.keys(parsedData)) {
    // Delete all the keys present in keys Array
    if (keys.includes(key)) delete parsedData[key];
  }

  // Stringifying the JSON object
  return JSON.stringify(parsedData);
};
