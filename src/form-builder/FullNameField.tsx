import React from 'react';

import { Suffixes } from '../utils/constants';
import { FullNameProps } from './types';
import SelectField from './SelectField';
import TextField from './TextField';

const FullNameField = (props: FullNameProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const fieldName = props.fieldName ? props.fieldName : 'fullName';

  return (
    <>
      <TextField
        id="firstName"
        name={`${fieldName}.firstName`}
        label="Your first name"
        required
      />
      <TextField
        id="middleName"
        name={`${fieldName}.middleName`}
        label="Your middle name"
      />
      <TextField
        id="lastName"
        name={`${fieldName}.lastName`}
        label="Your last name"
        required
      />
      <SelectField id="suffix" name={`${fieldName}.suffix`} label="Suffix">
        {Suffixes.map((suffix, idx) => (
          <option key={`${idx}-${suffix}`}>{suffix}</option>
        ))}
      </SelectField>
    </>
  );
};

export default FullNameField;
