import React from 'react';
import {
  useField,
  FieldHookConfig,
  FieldArray,
  useFormikContext,
} from 'formik';

import {
  chainArrayValidations,
  chainValidations,
  required,
  requiredLength,
} from '../utils/validation';
import CheckboxField from './CheckboxField';
import { CheckboxGroupProps, CheckboxProps } from './types';

// import CheckboxGroup from 'local-web-components/CheckboxGroup';
import CheckboxGroup from '@department-of-veterans-affairs/component-library/CheckboxGroup';

const storeInheritedValues = (fieldValue: string[] | undefined) => {
  if (fieldValue?.length) {
    const returnKeys = fieldValue.reduce(
      (
        newObj: { [key: string]: boolean },
        current
      ): { [key: string]: boolean } => {
        newObj[current] = true;
        return newObj;
      },
      {}
    );
    return returnKeys;
  }
  return {};
};

const CheckboxFieldGroup = (props: CheckboxGroupProps): JSX.Element => {
  const withValidation = {
    ...props,
    validate: chainArrayValidations(props, [requiredLength]), // chainValidations(props, [required]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string[]>
  );

  return (
    <>
      <CheckboxGroup
        id={props.id}
        label={props.label}
        required={!!props.required}
        name={props.name}
        values={storeInheritedValues(field.value)}
        options={props.options}
        onValueChange={(option: CheckboxProps) => {
          // convert field to array
          let fieldArray: string[] = [...field.value];
          // const fieldArray : any = !!field.value.length ? JSON.parse(field.value) : [];

          const fieldIndex: string | undefined = fieldArray.find(
            (fieldOption) => fieldOption === option.value
          );
          if (fieldIndex) {
            // field.value.
            fieldArray = fieldArray.filter((fieldOption) => {
              return fieldOption !== option.value;
            });
          } else {
            fieldArray.push(option.value);
          }
          // convert to string and submit
          // const fieldSerialize: string = fieldValue.length
          //   ? JSON.stringify(fieldValue)
          //   : '';

          helpers.setValue(fieldArray, true);
          helpers.setTouched(true, false);
        }}
        handleChange={(e: any) => {
          console.log(e);
        }}
        errorMessage={(meta.touched && meta.error) || undefined}
      ></CheckboxGroup>
    </>
  );
};

export default CheckboxFieldGroup;
