import React from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FieldProps } from './types';
import { chainValidations, required } from '../utils/validation';
import { VaNumberInput } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

const NumberField = (props: FieldProps<string>): JSX.Element => {
  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta] = useField(withValidation as FieldHookConfig<string>);
  const id = props.id || props.name;

  return (
    <VaNumberInput
      id={id}
      label={props.label}
      required={!!props.required}
      {...field}
      onInput={field.onChange}
      error={(meta.touched && meta.error) || undefined}
    />
  );
};

export default NumberField;
