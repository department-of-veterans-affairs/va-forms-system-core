import React, { ReactElement } from 'react';
import { RadioGroupProps, RadioItemProps } from './types';
import {
  VaRadio,
  VaRadioOption,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { useField, FieldHookConfig, useFormikContext } from 'formik';
import { chainValidations, required } from '../utils/validation';

export function RadioGroup(props: RadioGroupProps): JSX.Element {
  const options = props.options;
  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string>
  );
  const { value: selectedValue } = field;

  const handleRadioSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(event.target.value);
  };
  const id = props.id || props.name;

  const filterValue = (value: string) => {
    switch (value.toLowerCase().trim()) {
      case 'true':
      case 'yes':
      case '1':
        return true;
      case 'false':
      case 'no':
      case '0':
      case null:
        return false;
      default:
        return value;
    }
  };

  return (
    <VaRadio
      id={id}
      label={props.label}
      required={!!props.required}
      options={options}
      {...field}
      error={(meta.touched && meta.error) || undefined}
      onVaValueChange={(e: CustomEvent) => {
        // console.log(e);

        helpers.setTouched(true);
        helpers.setValue(e.detail.value);
      }}
      // onVaValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {
      //   // // Typed this as an event when passing into the function for safety, but event does not have property 'detail' on it.
      //   // const e: any = event;
      //   // // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      //   // if (
      //   //   e.detail.value === 'true' ||
      //   //   e.detail.value === 'false' ||
      //   //   typeof e.detail.value === 'boolean'
      //   // ) {
      //   //   setFieldValue(field.name, stringToBoolean(e.detail.value));
      //   // } else {
      //   //   helpers.setValue(e.detail.value);
      //   // }
      //   helpers.setValue(event.detail.value);
      // }}
    >
      {options.map((option: any, index: number) => {
        return (
          <VaRadioOption
            data-testid={`${field.name}-${index}`}
            {...option}
            name={field.name}
            key={`${field.name}-${index}`}
          />
        );
      })}
    </VaRadio>
  );
}
