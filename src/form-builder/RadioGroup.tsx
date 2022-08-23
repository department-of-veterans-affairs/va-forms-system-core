import React, { useContext, useEffect } from 'react';
import { RadioGroupProps } from './types';
import {
  VaRadio,
  VaRadioOption,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { useField, FieldHookConfig } from 'formik';
import { chainValidations, required } from '../utils/validation';
import { gatherFieldData, PageContext } from '../form-data';

export function RadioGroup(props: RadioGroupProps): JSX.Element {
  const { listOfPages, setListOfPages, currentPath } = useContext(PageContext);
  const currentPage = listOfPages.find((page) => page.path === currentPath);

  const options = props.options;
  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string>
  );

  const id = props.id || props.name;

  useEffect(() => {
    // Create a copy so the context's state doesn't get mutated.
    const listOfPagesCopy = gatherFieldData(
      [...listOfPages],
      field,
      props,
      currentPath
    );
    if (listOfPagesCopy) setListOfPages(listOfPagesCopy);
  }, [field.name, field.value, currentPage]);

  return (
    <VaRadio
      id={id}
      label={props.label}
      required={!!props.required}
      options={options}
      {...field}
      onBlur={() => helpers.setTouched(true)}
      error={(meta.touched && meta.error) || undefined}
      onVaValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        // Typed this as an event when passing into the function for safety, but event does not have property 'detail' on it.
        const e: any = event;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        helpers.setValue(e.detail.value);
      }}
    >
      {options.map((option: any, index: number) => {
        return (
          <VaRadioOption
            data-testid={`${field.name}-${index}`}
            onBlur={() => helpers.setTouched(true)}
            {...option}
            checked={field?.value === option.value.toString()}
            key={`${field.name}-${index}`}
          />
        );
      })}
    </VaRadio>
  );
}
