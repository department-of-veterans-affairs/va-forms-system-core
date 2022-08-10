import React, { useContext, useEffect } from 'react';
import { useField, FieldHookConfig } from 'formik';

import { chainValidations, required } from '../utils/validation';
import { VaCheckbox } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { CheckboxProps } from './types';
import { gatherFieldData, PageContext } from '../form-data';

const CheckboxField = (props: CheckboxProps): JSX.Element => {
  const { listOfPages, setListOfPages } = useContext(PageContext);

  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<boolean>
  );
  const id = props.id || props.name;

  useEffect(() => {
    // Create a copy so the context's state doesn't get mutated.
    const listOfPagesCopy = gatherFieldData([...listOfPages], field, props);
    if (listOfPagesCopy) setListOfPages(listOfPagesCopy);
  }, [field.name, field.value]);

  return (
    <VaCheckbox
      id={id}
      label={props.label}
      required={!!props.required}
      {...field}
      name={props.name}
      checked={field.value}
      onBlur={() => helpers.setTouched(true)}
      onVaChange={(e: CustomEvent) => {
        helpers.setValue((e?.target as HTMLInputElement).checked);
        if (props.onValueChange) {
          props.onValueChange(e);
        }
      }}
      error={(meta.touched && meta.error) || undefined}
    />
  );
};

export default CheckboxField;
