import React from 'react';
import { FieldProps } from './types';
import {
  VaRadio,
  VaRadioOption,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { useField, FieldHookConfig } from 'formik';
import { chainValidations, required } from '../utils/validation';

type RadioGroupProps = FieldProps<string> & {
  name: string;
  options: React.ReactElement<RadioItemProps>[];
  onChange: (v: string) => void;
};

export type RadioItemProps = {
  'aria-describedby': string;
  checked: boolean;
  label: string;
  name: string;
  value: string;
  radioOptionSelected: () => void;
};

export function RadioGroup(props: RadioGroupProps): JSX.Element {
  const options = props.options;
  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string>
  );

  const handleRadioSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    helpers.setValue(event.target.value);
  };
  const id = props.id || props.name;
  return (
    <VaRadio
      id={id}
      label={props.label}
      required={!!props.required}
      options={options}
      {...field}
      error={(meta.touched && meta.error) || undefined}
      onRadioOptionSelected={handleRadioSelected}
    >
      {options.map((option) => (
        <VaRadioOption {...option} key={option.key} />
      ))}
    </VaRadio>
  );
}
