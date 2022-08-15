import React from 'react';
import { useField, FieldHookConfig, useFormikContext } from 'formik';

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
    withValidation as FieldHookConfig<string[]>
  );
  const state = useFormikContext();

  const onGroupChange = (event: any) => {
    props?.options.map((option: any) => {
      if (event.target.name === option.name) {
        option.value = event.detail.checked;
      }
    });
    const checkedOptions = props?.options.filter(
      (option: any) => option.value === true
    );

    if (checkedOptions) {
      helpers.setValue([]);
    } else {
      // Not working
      state.setValues('benefitsSelection', undefined);
      state.setErrors({ benefitsSelection: 'Please provide a response' });
    }
    console.log(helpers, meta);
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
