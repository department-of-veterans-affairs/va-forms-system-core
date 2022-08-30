import React, { useContext, useEffect } from 'react';
import { useField, FieldHookConfig } from 'formik';

import { chainValidations, required } from '../utils/validation';
import { VaSelect } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { gatherFieldData, PageContext } from '../form-data';
import { SelectProps } from './types';

const SelectField = (props: SelectProps): JSX.Element => {
  const { listOfPages, setListOfPages, currentPath } = useContext(PageContext);

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
      field,
      props,
      currentPath
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
      onInput={onInputHandler}
      error={(meta.touched && meta.error) || undefined}
    >
      {props.children}
    </VaSelect>
  );
};

export default SelectField;
