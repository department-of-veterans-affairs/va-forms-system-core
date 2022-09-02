import React, { ReactElement, ReactNode, useEffect } from 'react';
import {
  FieldArray,
  FieldHookConfig,
  useField,
  useFormikContext,
} from 'formik';
import { VaButton } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import DateField from './DateField';
import SelectField from './SelectField';
import TextField from './TextField';
import {
  chainArrayValidations,
  requiredLength,
  minLength,
  maxLength,
} from '../utils';
import { ArrayFieldProps } from './types';

const errorTemplate = (errorMsg: string) => (
  <span className="usa-input-error-message" role="alert">
    <span className="sr-only">Error</span>
    {errorMsg}
  </span>
);

/**
 * The ArrayField accepts a template and a schema and renders them for each entry in whichever array field is
 * specified in props.name. This component provides a wrapper so end users do not
 * have to manage looping through their array, or working with Formik helpers, instead allowing them to
 * just focus on what their React components will look like.
 *
 * @param props - will include the field name as props.name,
 * the formik state as props.state, and the array entry object schema as props.arrayFieldSchema
 *
 * @returns - FieldArray component provided by Formik
 */
const ArrayField = <T extends Record<string, unknown>>(
  props: ArrayFieldProps<T>
) => {
  const { FieldArrayTemplate } = props;

  const withValidation = {
    ...props,
    validate: chainArrayValidations(props, [
      requiredLength,
      minLength,
      maxLength,
    ]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<T[]>
  );

  const addItem = () => {
    const fieldValueCopy = field.value;
    fieldValueCopy.push(props.arrayFieldSchema as T);
    helpers.setValue(fieldValueCopy);
    helpers.setTouched(true);
  };

  const deleteItem = (index: number) => {
    const fieldValueCopy = field.value;

    fieldValueCopy.splice(index, 1);
    helpers.setValue(fieldValueCopy);
    helpers.setTouched(true);
  };

  return (
    <div id={props.name}>
      <fieldset>
        <legend>{props.label}</legend>
        {field.value.map((value, index) => {
          return (
            <div key={index}>
              {FieldArrayTemplate({ data: value, index: index })}

              <VaButton
                onClick={() => deleteItem(index)}
                text="Remove"
                id={`remove-${index}`}
              />
            </div>
          );
        })}
      </fieldset>

      <VaButton onClick={addItem} text="Add" id="add-item" />

      {
        // since theres not really a ds component for this,
        // errors need to be inserted as markup
        meta.touched && meta.error && errorTemplate(meta.error)
      }
    </div>
  );
};

export default ArrayField;
