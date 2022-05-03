import React from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FieldProps } from './types';
import { chainValidations, required } from '../utils/validation';
import { VaTextInput } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

const PhoneField = (props: FieldProps<string>): JSX.Element => {
  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta] = useField(withValidation as FieldHookConfig<string>);
  const id = props.id || props.name;

  return (
    <VaTextInput
      type="tel"
      inputmode="tel"
      id={id}
      label={props.label}
      required={!!props.required}
      onVaChange={field.onChange}
      error={(meta.touched && meta.error) || undefined}
    //   autocomplete={}
    //   maxlength={}
      {...field}

    />
  );
};

export default PhoneField;