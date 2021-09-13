import React from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FieldProps } from './types';
import { getMessage } from '../utils/i18n';
import {
  ValidationFunction,
  chainValidations,
  required,
} from '../utils/validation';

import { SimpleDate } from '@department-of-veterans-affairs/component-library/Date';

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
 * Super basic date string validation. Only checks for the non-empty strings
 * between the `-`s.
 */
const validDate: ValidationFunction<string> = (
  value: string,
  props: DateProps
) => {
  if (props.required) {
    const [month = '', day = '', year = ''] = value.split('-');
    if (!month || !day || !year) {
      return typeof props.required === 'string'
        ? props.required
        : getMessage('required.default');
    }
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
    validate: chainValidations(props, [required, validDate]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string>
  );
  const id = props.id || props.name;

  // TODO: Keep track of the dirty state of these
  const value = dateStringToValue(field.value);

  const onChange = (dateValue: ComponentLibraryDateValue) => {
    helpers.setValue(dateValueToString(dateValue));
  };

  return (
    <SimpleDate
      id={id}
      {...props}
      onValueChange={onChange}
      date={value}
      errorMessage={meta.touched && meta.error}
      onBlur={() => helpers.setTouched(true)}
    />
  );
};

export default DateField;
