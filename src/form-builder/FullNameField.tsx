import React from 'react';

import { Suffixes } from '../utils/constants';
import { FullNameProps } from './types';
import SelectField from './SelectField';
import TextField from './TextField';
import { CapitalizeFirstLetter } from '../utils/helpers';

const FullNameField = (props: FullNameProps): JSX.Element => {
  const fieldName = props.name;
  const label = props.label ? props.label : '';

  const labels = {
    firstNameLabel: `${label} first name`,
    middleNameLabel: `${label} middle name`,
    lastNameLabel: `${label} last name`,
  };

  const component = (
    <>
      <TextField
        id={`${fieldName}FirstName`}
        name={`${fieldName}.first`}
        label={CapitalizeFirstLetter(labels.firstNameLabel)}
        required
      />
      <TextField
        id={`${fieldName}MiddleName`}
        name={`${fieldName}.middle`}
        label={CapitalizeFirstLetter(labels.middleNameLabel)}
      />
      <TextField
        id={`${fieldName}LastName`}
        name={`${fieldName}.last`}
        label={CapitalizeFirstLetter(labels.lastNameLabel)}
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

  // If a legend prop is defined, then wrap the component in a fieldset element and render the legend
  if (props.legend) {
    return (
      <fieldset>
        <legend className={props.legendClasses}>{props.legend}</legend>

        {component}
      </fieldset>
    );
  }

  return component;
};

export default FullNameField;
