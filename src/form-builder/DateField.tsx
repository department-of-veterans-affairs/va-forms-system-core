import React from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FieldProps } from './types';
import { validator } from '../utils/validation';

import Date from '@department-of-veterans-affairs/component-library/Date';

const DateField = (props: FieldProps<string>): JSX.Element => {
  const withValidation = { ...props, validate: validator(props) };
  const [field, meta] = useField(withValidation as FieldHookConfig<string>);
  const id = props.id || props.name;
  return <Date id={id} {...props} onValueChange={field.onChange} />;
};

export default DateField;
