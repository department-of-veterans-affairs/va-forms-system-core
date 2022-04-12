import React from 'react';
import {
  useField,
  FieldHookConfig,
  FieldArray,
  useFormikContext,
} from 'formik';

import { chainValidations, required } from '../utils/validation';
// import CheckboxField from './CheckboxField';
import { CheckboxGroupProps, CheckboxProps } from './types';

// import CheckboxGroup from 'local-web-components/CheckboxGroup';
import CheckboxGroup from '@department-of-veterans-affairs/component-library/CheckboxGroup';

const CheckboxFieldGroup = (props: CheckboxGroupProps): JSX.Element => {
  // const formikContext = useFormikContext();
  // console.log(formikContext);

  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string>
  );

  return (
    <>
      <CheckboxGroup
        id={props.id}
        label={props.label}
        required={!!props.required}
        name={props.name}
        values={props.values}
        options={props.options}
        onValueChange={(option: CheckboxProps) => {
          // convert field to array

          // !!field.value.length && isValidJson(field.value) ? JSON.parse(field.value) :
          const fieldValue: string[] = [];
          const fieldIndex: number = fieldValue.indexOf(option.value);
          if (fieldIndex >= 0) {
            fieldValue.splice(fieldIndex, 1);
          } else {
            fieldValue.push(option.value);
          }
          // convert to string and submit
          const fieldSerialize: string = fieldValue.length
            ? JSON.stringify(fieldValue)
            : '';

          helpers.setValue(fieldSerialize, true);
          helpers.setTouched(true, false);
        }}
        handleChange={(e: any) => {
          console.log(e);
        }}
        errorMessage={(meta.touched && meta.error) || undefined}
      >
        {/* {props.options.map((option) => (
            // checkboxField has a required property of checked?
            <CheckboxField
              key={option.value}
              {...option}
            />
          ))} */}
      </CheckboxGroup>
    </>
  );
};

export default CheckboxFieldGroup;
