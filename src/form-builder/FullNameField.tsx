import React from 'react';

import { Suffixes } from '../utils/constants';
import { FullNameProps } from './types';
import SelectField from './SelectField';
import TextField from './TextField';

const FullNameField = (props: FullNameProps): JSX.Element => {
  const fieldName = props.name;

  return (
    <>
      <TextField
        id={`${fieldName}FirstName`}
        name={`${fieldName}.first`}
        label="Your first Name"
        required
      />
      <TextField
        id={`${fieldName}MiddleName`}
        name={`${fieldName}.middle`}
        label="Your middle Name"
      />
      <TextField
        id={`${fieldName}LastName`}
        name={`${fieldName}.last`}
        label="Your last Name"
        required
      />
      <SelectField
        id={`${fieldName}Suffix`}
        name={`${fieldName}.suffix`}
        label="Suffix"
      >
        {Suffixes.map((suffix, idx) => (
          <option key={`${idx}-${suffix}`}>{suffix}</option>
        ))}
      </SelectField>
    </>
  );
};

export default FullNameField;
