import React from 'react';
import {
  useField,
  FieldHookConfig,
  FieldArray,
  useFormikContext,
} from 'formik';

import {
  chainArrayValidations,
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
  // component re-renders these values per form input inside the form
  const withValidation = {
    ...props,
    validate: chainArrayValidations(props, [requiredLength]), // chainValidations(props, [required]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string[]>
  );
  // convert the field values to a format that the component stores default values
  const inheritedValues = storeInheritedValues(field.value);

  return (
    <>
      <CheckboxGroup
        id={props.id}
        label={props.label}
        required={!!props.required}
        name={props.name}
        values={inheritedValues}
        options={props.options}
        onValueChange={(option: CheckboxProps) => {
          // store field value
          let fieldArray: string[] = [...field.value];

          const fieldIndex: string | undefined = fieldArray.find(
            (fieldOption) => fieldOption === option.value
          );
          if (fieldIndex) {
            // filter out old values
            fieldArray = fieldArray.filter((fieldOption) => {
              return fieldOption !== option.value;
            });
          } else {
            // push new values to array
            fieldArray.push(option.value);
          }

          // store and validate the value and set the field as touched
          helpers.setTouched(true, false);
          helpers.setValue(fieldArray, true);
        }}
        errorMessage={(meta.touched && meta.error) || undefined}
      ></CheckboxGroup>
    </>
  );
};

export default CheckboxFieldGroup;
