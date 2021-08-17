/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useEffect } from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FieldProps } from './types';
import { getMessage } from '../utils/i18n';

import { VaSelect } from 'web-components/react-bindings';

type SelectProps = FieldProps<string> & {
  onVaSelect: (e: CustomEvent) => void;
  children: any;
};

const SelectField = (props: SelectProps): JSX.Element => {
  const [field, meta] = useField(props as FieldHookConfig<string>);
  const id = props.id || props.name;

  const validate = (value: string) => {
    if (props.required && !value) {
      const errorMessage =
        typeof props.required === 'string'
          ? props.required
          : getMessage('required.default');
      return errorMessage;
    }

    return props.validate ? props.validate(value) : undefined;
  };

  const { required, ...nonRequired } = props;
  return (
    <VaSelect
      id={id}
      label={props.label}
      required={!!props.required}
      {...field}
      onVaSelect={field.onChange}
    >
      {props.children}
    </VaSelect>
  );
};

export default SelectField;
