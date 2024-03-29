import React, { useState, useEffect, useContext } from 'react';
import { FieldHookConfig, useField } from 'formik';

import { FieldProps } from './types';
import { chainValidations, isValidSSN, required } from '../utils/validation';
import { VaTextInput } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { gatherFieldData, PageContext } from '../form-data';

export type SSNProps = FieldProps<string>;

/**
 * Renders the SSNField component
 *
 * @public
 */
const SSNField = (props: SSNProps): JSX.Element => {
  const { listOfPages, setListOfPages, currentPath } = useContext(PageContext);
  const currentPage = listOfPages.find((page) => page.path === currentPath);

  // Note: In this component, the Formik variable "field.value" holds the raw SSN value,
  // while the useState variable "ssn" controls the view and will render the masked SSN to the page
  const withValidation = {
    ...props,
    validate: chainValidations(props, [required, isValidSSN]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string>
  );
  const id = props.id || props.name;

  const [ssn, setSSN] = useState(field.value ? field.value : '');

  useEffect(() => {
    if (field.value) {
      setSSN(maskedValue(field.value));
    }

    // Create a copy so the context's state doesn't get mutated.
    const listOfPagesCopy = gatherFieldData(
      [...listOfPages],
      field,
      props,
      currentPath
    );
    if (listOfPagesCopy) setListOfPages(listOfPagesCopy);
  }, [field.value, field.name, currentPage]);

  const onInputHandler = (e: Event) => {
    if (props.onValueChange) props.onValueChange(e);
  };

  const onFocus = () => {
    if (!field.value) return;
    const valueWithoutDashes = field.value.replace('-', '');

    setSSN(valueWithoutDashes);
  };

  const onBlur = (event: Event) => {
    setTimeout(() => {
      const { value } = event.target as HTMLTextAreaElement;
      const ssnString: string = value.replace('-', '');
      helpers.setValue(ssnString);
      helpers.setTouched(true);

      setSSN(maskedValue(ssnString));
    }, 0);
  };

  const maskedValue = (ssnString: string) => {
    let maskedSSNString = '';

    if (ssnString.length) {
      const strippedSSN = ssnString.replace(/[- ]/g, '');
      const maskedSSN = strippedSSN.replace(/^\d{1,5}/, (digit) =>
        digit.replace(/\d/g, '●')
      );

      maskedSSNString = [
        [...maskedSSN].splice(0, 3).join(''),
        [...maskedSSN].splice(3, 2).join(''),
        [...maskedSSN].splice(5).join(''),
      ].join('-');
    }

    return maskedSSNString;
  };

  return (
    <VaTextInput
      {...props}
      id={id}
      value={ssn}
      maxlength={11}
      onFocus={onFocus}
      onBlur={onBlur}
      onInput={onInputHandler}
      error={(meta.touched && meta.error) || undefined}
    />
  );
};

export default SSNField;
