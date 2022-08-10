import React, { useContext, useEffect } from 'react';
import { useField, FieldHookConfig } from 'formik';

import { DateProps } from './types';
import { chainValidations, isValidDate, required } from '../utils/validation';
import {
  VaDate,
  VaMemorableDate,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { gatherFieldData, PageContext } from '../form-data';

const DateField = (props: DateProps): JSX.Element => {
  const { listOfPages, setListOfPages } = useContext(PageContext);
  const withValidation = {
    ...props,
    validate: chainValidations(props, [required, isValidDate]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string>
  );
  const id = props.id || props.name;

  /**
   * The default date value must be in YYYY-MM-DD format.
   */
  const value = field.value;

  const onChange = (dateValue: CustomEvent) => {
    helpers.setValue((dateValue?.target as HTMLInputElement).value);
  };

  useEffect(() => {
    // Create a copy so the context's state doesn't get mutated.
    const listOfPagesCopy = gatherFieldData([...listOfPages], field, props);
    if (listOfPagesCopy) setListOfPages(listOfPagesCopy);
  }, [field.name, field.value]);

  return props.isMemorableDate ? (
    <VaMemorableDate
      id={id}
      required={!!props.required}
      {...props}
      label={props.label}
      onDateChange={onChange}
      value={value}
      onDateBlur={() => helpers.setTouched(true)}
      error={(meta.touched && meta.error) || undefined}
    />
  ) : (
    <VaDate
      id={id}
      required={!!props.required}
      {...props}
      label={props.label}
      onDateChange={onChange}
      value={value}
      onDateBlur={() => helpers.setTouched(true)}
      error={(meta.touched && meta.error) || undefined}
    />
  );
};

export default DateField;
