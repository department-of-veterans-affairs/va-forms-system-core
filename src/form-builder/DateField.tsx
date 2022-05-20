import React from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FieldProps } from './types';
import { getMessage } from '../utils/i18n';
import {
  ValidationFunction,
  chainValidations,
  required,
} from '../utils/validation';
import { VaDate } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

export type ComponentLibraryDatePart = {
  value: string;
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
    day: { value: day },
    month: { value: month },
    year: { value: year },
  };
};

const dateValueToString = ({ day, month, year }: ComponentLibraryDateValue) => {
  return `${month.value}-${day.value}-${year.value}`;
};

/**
 * Super basic date string validation. Only checks for the non-empty strings
 * between the `-`s.
 */
const validDate: ValidationFunction<string> = (value: string) => {
  const [month = '', day = '', year = ''] = value.split('-');
  if (!month || !day || !year) {
    return getMessage('date.incomplete');
  }
};

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

  const onChange = (dateValue: ComponentLibraryDateValue) => {
    console.log(dateValue);
  };

  return (
    <VaDate
      id={id}
      required={!!props.required}
      {...props}
      label={props.label}
      onDateChange={onChange}
      date={value}
      onDateBlur={() => helpers.setTouched(true)}
      error={(meta.touched && meta.error) || undefined}
    />
  );
};

export default DateField;
