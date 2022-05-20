import React from 'react';
import { useField, FieldHookConfig } from 'formik';

import { DateProps } from './types';
import {
  ValidationFunction,
  chainValidations,
  required,
} from '../utils/validation';
import { VaDate } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

/**
 * Field value format: M-D-YYYY
 *
 * TODO: Convert the Date component into a web component and use it here.
 */
const DateField = (props: DateProps): JSX.Element => {
  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string>
  );
  const id = props.id || props.name;

  const value = field.value;

  // const onChange = (dateValue: any) => {
  //   helpers.setValue(dateValue.target.value);
  // };

  return (
    <VaDate
      id={id}
      required={!!props.required}
      {...props}
      label={props.label}
      // onDateChange={onChange}
      value={value}
      onDateBlur={() => helpers.setTouched(true)}
      error={(meta.touched && meta.error) || undefined}
    />
  );
};

export default DateField;
