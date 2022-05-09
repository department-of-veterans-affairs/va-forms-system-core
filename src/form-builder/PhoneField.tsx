import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { FieldProps } from './types';
import { chainValidations, isValidPhone, required } from '../utils/validation';
import TextField from './TextField';
import { VaTextInput } from '@department-of-veterans-affairs/component-library/dist/react-bindings';


export type PhoneProps = FieldProps<string>;

/**
 * Renders the PhoneField component
 *
 * @beta
 */

const PhoneField = (props: PhoneProps): JSX.Element => {
  const withValidation = {
    ...props,
    validate: chainValidations(props, [required, isValidPhone]),
  };
  const [field, meta, helpers] = useField(withValidation as FieldHookConfig<string>);
  const id = props.id || props.name;
  console.log('field.val', field.value)
  const value = field.value;
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   field.onChange;
  //   helpers.setTouched(true);
  // };

  return (
    <TextField
      id={id}
      {...props}
      onChange={field.onChange}
      value={value}
      required
      onBlur={() => helpers.setTouched(true)}
    />
  );
};

export default PhoneField;

    // <VaTextInput
    //   type="tel"
    //   inputmode="tel"
    //   id={id}
    //   label={props.label}
    //   required
    //   error={(meta.touched && meta.error) || undefined}
    //   // onChange gets overwritten by field deconstruction but doesn't work to solve error issue on its own anyway
    //   // onChange={field.onChange} 
    //   // onVaChange={field.onChange}
    //   //   autocomplete={}
    //   //   maxlength={}
    //   {...field}
    // />