import React from 'react';

import { FieldProps } from './types';
import SelectField from './SelectField';
import TextField from './TextField';

const FullNameField = (props: FieldProps<string>): JSX.Element => {
  const suffixes = ['', 'Jr.', 'Sr.', 'II', 'III', 'IV']
  const onValueChange = () => {
    console.log('select')
  };

  return (
    <>
      <TextField
        id="firstName"
        name="fullName.firstName"
        label="Your first Name"
        required />
      <TextField
        id="middleName"
        name="fullName.middleName"
        label="Your middle Name" />
      <TextField
        id="lastName"
        name="fullName.lastName"
        label="Your last Name"
        required />
      <SelectField
        id="suffix"
        name="fullName.suffix"
        label="Suffix"
        onVaSelect={onValueChange}>
          {suffixes.map((suffix, idx) => <option key={`${idx}-${suffix}`}>{suffix}</option>)}
      </SelectField>
    </>
  );
};

export default FullNameField;
