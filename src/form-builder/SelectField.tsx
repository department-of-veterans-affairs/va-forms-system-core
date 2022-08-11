import React, { useContext, useEffect } from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FieldProps } from './types';
import { chainValidations, required } from '../utils/validation';

import { VaSelect } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { PageContext } from '../form-data/PageContext';
import { gatherFieldData } from '../form-data/FormData';
import { SelectProps } from './types';
import { useLocation } from 'react-router-dom';

const SelectField = (props: SelectProps): JSX.Element => {
  const { listOfPages, setListOfPages } = useContext(PageContext);
  const currentLocation = useLocation();

  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta] = useField(withValidation as FieldHookConfig<string>);
  const id = props.id || props.name;

  useEffect(() => {
    // Create a copy so the context's state doesn't get mutated.
    const listOfPagesCopy = gatherFieldData(
      [...listOfPages],
      field,
      props,
      currentLocation.pathname
    );
    if (listOfPagesCopy) setListOfPages(listOfPagesCopy);
  }, [field.name, field.value]);

  return (
    <VaSelect
      id={id}
      label={props.label}
      required={!!props.required}
      {...field}
      onVaSelect={field.onChange}
      error={(meta.touched && meta.error) || undefined}
    >
      {props.children}
    </VaSelect>
  );
};

export default SelectField;
