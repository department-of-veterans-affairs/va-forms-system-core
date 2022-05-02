import React, { useState } from 'react';
import { FieldHookConfig, useField } from 'formik';

import { FieldProps } from './types';
import { chainValidations, isValidSSN, required } from '../utils/validation';
import { VaTextInput } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

export type SSNProps = FieldProps<string>;

/**
 * Renders the SSNField component
 *
 * @beta
 */
const SSNField = (props: SSNProps): JSX.Element => {
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
  const [ssn, setSSN] = useState('');

  const onFocus = () => {
    if (!field.value) return;
    const valueWithoutDashes = field.value.replaceAll('-', '');

    setSSN(valueWithoutDashes);
  };

  const onBlur = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const { value } = event.target;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const ssnString: string = value.replaceAll('-', '');
    helpers.setValue(ssnString);
    helpers.setTouched(true);

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

    helpers.setError(isValidSSN(field.value, props) as string);
    setSSN(maskedSSNString);
  };

  return (
    <VaTextInput
      id={id}
      {...props}
      value={ssn}
      required
      onFocus={onFocus}
      onVaBlur={onBlur}
    />
  );
};

export default SSNField;
