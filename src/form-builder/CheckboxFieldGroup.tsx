import React from 'react';
import {
  useField,
  FieldHookConfig,
  FieldArray,
  useFormikContext,
} from 'formik';

import { chainValidations, required } from '../utils/validation';
import CheckboxField from './CheckboxField';
import { CheckboxGroupProps, CheckboxProps } from './types';

// import CheckboxGroup from 'local-web-components/CheckboxGroup';
import CheckboxGroup from '@department-of-veterans-affairs/component-library/CheckboxGroup';

const validationFunction = (props: CheckboxGroupProps) => {
  console.log('hello');
};

const CheckboxFieldGroup = (props: CheckboxGroupProps): JSX.Element => {
  // const formikContext = useFormikContext();
  // console.log(formikContext);

  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string[]>
  );

  return (
    <>
      <FieldArray
        name={props.name}
        render={({ move, swap, push, insert, remove, unshift, pop }) => (
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
              // const fieldValue: string[] = ['one', 'two', 'three'];
              const fieldIndex: number = field.value.indexOf(option.value);
              if (fieldIndex >= 0) {
                remove(option.value);
              } else {
                push(option.value);
              }
              // convert to string and submit
              // const fieldSerialize: string = fieldValue.length
              //   ? JSON.stringify(fieldValue)
              //   : '';

              // helpers.setValue(fieldValue, true);
              // helpers.setTouched(true, false);
            }}
            handleChange={(e: any) => {
              console.log(e);
            }}
            errorMessage={(meta.touched && meta.error) || undefined}
          ></CheckboxGroup>
        )}
      />
    </>
  );
};

export default CheckboxFieldGroup;
