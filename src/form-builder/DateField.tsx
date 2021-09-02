import React from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FieldProps } from './types';
import { required } from '../utils/validation';

import Date from '@department-of-veterans-affairs/component-library/Date';

export type ComponentLibraryDatePart = {
  value: string;
  dirty: boolean;
};

/**
 * What the Date in the component library expects.
 */
export type ComponentLibraryDateValue = {
  day: ComponentLibraryDatePart;
  month: ComponentLibraryDatePart;
  year: ComponentLibraryDatePart;
};

export type DateProps = FieldProps<string>;

/**
 * Convert the date string passed to DateField to the object expected by the
 * component library Date component.
 */
const dateStringToValue = (dateString = '') => {
  // TODO: Make this conversion handle edge cases
  const [month = '', day = '', year = ''] = dateString.split('-');
  return {
    day: { value: day, dirty: false },
    month: { value: month, dirty: false },
    year: { value: year, dirty: false },
  };
};

const dateValueToString = ({ day, month, year }: ComponentLibraryDateValue) => {
  return `${month.value}-${day.value}-${year.value}`;
};

/**
 * Field value format: M-D-YYYY
 */
const DateField = (props: DateProps): JSX.Element => {
  const withValidation = { ...props, validate: required(props) };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string>
  );
  const id = props.id || props.name;

  const value = dateStringToValue(field.value);

  const onChange = (dateValue: ComponentLibraryDateValue) => {
    helpers.setValue(dateValueToString(dateValue));
  };

  return <Date id={id} {...props} onValueChange={onChange} date={value} />;
};

export default DateField;
