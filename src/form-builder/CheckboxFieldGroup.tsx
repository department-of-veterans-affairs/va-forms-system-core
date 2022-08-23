import React, { useEffect } from 'react';
import { useField, FieldHookConfig } from 'formik';

import { chainValidations, required } from '../utils/validation';

import { CheckboxGroupProps, CheckboxProps } from './types';

import { VaCheckboxGroup } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import CheckboxField from './CheckboxField';

const CheckboxFieldGroup = (props: CheckboxGroupProps): JSX.Element => {
  // component re-renders these values per form input inside the form
  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<boolean>
  );

  useEffect(() => {
    helpers.setValue(false);
  }, []);

  /**
   * Toggles the value of checkbox group based on its options on change.
   *
   * @param event - Synthetic Event to get checkbox target name and value
   *
   */
  const onGroupChange = (event: any) => {
    props?.options.map((option: any) => {
      if (event.target.name === option.name) {
        option.value = event.detail.checked;
      }
    });
    const checkedOptions = props?.options.filter(
      (option: any) => option.value === true
    );

    if (checkedOptions.length > 0) {
      helpers.setValue(true);
    } else {
      helpers.setValue(false);
      helpers.setTouched(true);
      helpers.setError('Please provide a response');
    }
  };

  return (
    <>
      <VaCheckboxGroup
        id={props.id}
        label={props.label}
        required={!!props.required}
        name={props.name}
        options={props.options}
        onVaChange={onGroupChange}
        onBlur={() => {
          helpers.setTouched(true, true);
        }}
        error={(meta.touched && meta.error) || undefined}
      >
        {props.options.map((option: CheckboxProps, index: number) => (
          <CheckboxField
            key={`va-checkbox-field-${field.name}-${index}`}
            {...option}
            required={false}
            name={option.name}
          />
        ))}
      </VaCheckboxGroup>
    </>
  );
};

export default CheckboxFieldGroup;
