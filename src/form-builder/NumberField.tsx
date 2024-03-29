import React, { useContext, useEffect } from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FieldProps } from './types';
import { chainValidations, required } from '../utils/validation';
import { VaNumberInput } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { gatherFieldData, PageContext } from '../form-data';

const NumberField = (props: FieldProps<string>): JSX.Element => {
  const { listOfPages, setListOfPages, currentPath } = useContext(PageContext);
  const currentPage = listOfPages.find((page) => page.path === currentPath);

  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta] = useField(withValidation as FieldHookConfig<string>);
  const id = props.id || props.name;
  const onInputHandler = (e: Event) => {
    field.onChange(e);
    if (props.onValueChange) props.onValueChange(e);
  };

  useEffect(() => {
    // Create a copy so the context's state doesn't get mutated.
    const listOfPagesCopy = gatherFieldData(
      [...listOfPages],
      { ...field, type: 'accounting' },
      props,
      currentPath
    );
    if (listOfPagesCopy) setListOfPages(listOfPagesCopy);
  }, [field.name, field.value, currentPage]);

  return (
    <VaNumberInput
      id={id}
      label={props.label}
      required={!!props.required}
      {...field}
      onInput={onInputHandler}
      error={(meta.touched && meta.error) || undefined}
    />
  );
};

export default NumberField;
