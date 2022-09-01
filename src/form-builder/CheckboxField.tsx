import React, { useContext, useEffect } from 'react';
import { useField, FieldHookConfig } from 'formik';

import { chainValidations, required } from '../utils/validation';
import { VaCheckbox } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { CheckboxProps } from './types';
import { gatherFieldData, PageContext } from '../form-data';

/**
 * CheckboxField component is a simple form building component that displays a
 * checkbox for the user.
 *
 * @param {CheckboxProps} props
 *
 * @returns React.Component
 *
 * @remarks
 * A description can be passed in two different ways
 *   1 - Pass a string variable through the description prop
 *   2 - Inside a <CheckboxField> tag, create a child element
 *   with a slot="description" attribute, while setting the
 *   normal description prop to null. HTML can then be passed
 *   through the slot and will render above the CheckboxField.
 */
const CheckboxField = (props: CheckboxProps): JSX.Element => {
  const { listOfPages, setListOfPages, currentPath } = useContext(PageContext);
  const currentPage = listOfPages.find((page) => page.path === currentPath);

  const withValidation = {
    ...props,
    validate: chainValidations(props, [required]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<boolean>
  );
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
  }, [field.name, field.value, currentPage]);

  return (
    <VaCheckbox
      id={id}
      label={props.label}
      required={!!props.required}
      {...field}
      description={props.description}
      name={props.name}
      checked={field.value}
      onBlur={() => helpers.setTouched(true)}
      onVaChange={(e: CustomEvent) => {
        helpers.setValue((e?.target as HTMLInputElement).checked);
        if (props.onValueChange) {
          props.onValueChange(e);
        }
      }}
      onInput={onInputHandler}
      error={(meta.touched && meta.error) || undefined}
    >
      {props.children}
    </VaCheckbox>
  );
};

export default CheckboxField;
