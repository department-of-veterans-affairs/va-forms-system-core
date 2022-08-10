import React, { useContext, useEffect } from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FieldProps } from './types';
import { chainValidations, required } from '../utils/validation';
import { VaTextInput } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { PageContext } from '../form-data/PageContext';
import { gatherFieldData } from '../form-data/FormData';

const TextField = (props: FieldProps<string>): JSX.Element => {
  const { listOfPages, setListOfPages } = useContext(PageContext);

  // find current page on component mount?
  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta] = useField(withValidation as FieldHookConfig<string>);
  const id = props.id || props.name;

  const onChange = (e: Event) => {
    field.onChange(e);
    if (props.onValueChange) props.onValueChange(e);
  };

  useEffect(() => {
    // Create a copy so the context's state doesn't get mutated.
    const listOfPagesCopy = gatherFieldData([...listOfPages], field, props);
    if (listOfPagesCopy) setListOfPages(listOfPagesCopy);
  }, [field.name, field.value]);

  return (
    <VaTextInput
      id={id}
      type={props.type ? props.type : 'text'}
      label={props.label}
      required={!!props.required}
      {...field}
      onInput={onChange}
      error={(meta.touched && meta.error) || undefined}
    />
  );
};

export default TextField;
