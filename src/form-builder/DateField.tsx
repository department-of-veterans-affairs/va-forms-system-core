import React from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FieldProps } from './types';
import { validator } from '../utils/validation';

import Date from '@department-of-veterans-affairs/component-library/Date';

export type ComponentLibraryDatePart = {
  value: string;
  dirty: boolean;
};

/**
 * What the Date in the component library expects.
 */
export type ComponentLibraryDateValue = {
  date: {
    day: ComponentLibraryDatePart;
    month: ComponentLibraryDatePart;
    year: ComponentLibraryDatePart;
  };
};

export type DateProps = FieldProps<string> & {
  /**
   * Format: MM-DD-YYYY
   */
  date: string;
};

/**
 * Convert the date string passed to DateField to the object expected by the
 * component library Date component.
 */
const dateStringToValue = (dateString = '') => {
  // TODO: Make this safer
  const [month = '', day = '', year = ''] = dateString.split('-');
  return {
    day: { value: day, dirty: false },
    month: { value: month, dirty: false },
    year: { value: year, dirty: false },
  };
};

const DateField = (props: DateProps): JSX.Element => {
  const withValidation = { ...props, validate: validator(props) };
  const [field, meta] = useField(withValidation as FieldHookConfig<string>);
  const id = props.id || props.name;

  const value = dateStringToValue(props.date);

  return (
    <Date id={id} {...props} onValueChange={field.onChange} date={value} />
  );
};

export default DateField;
