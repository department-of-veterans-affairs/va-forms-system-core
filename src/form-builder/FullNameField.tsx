import React, { useContext, useEffect } from 'react';

import { Suffixes } from '../utils/constants';
import { FullNameProps } from './types';
import SelectField from './SelectField';
import TextField from './TextField';
import { CapitalizeFirstLetter } from '../utils/helpers';
import { PageContext } from '../routing/PageContext';

import { createFieldDataFromChildren } from '../routing/Page';
import { FieldObject, PageObject } from '../routing';

const ComponentReader = (props: {
  children: JSX.Element[];
  fieldName: string;
}): JSX.Element => {
  const { children, fieldName } = props;
  const { listOfPages, setListOfPages } = useContext(PageContext);

  useEffect(() => {
    const listOfPagesCopy = listOfPages;
    const fieldData = createFieldDataFromChildren(children);

    listOfPagesCopy.forEach((page, index) => {
      const indexOfField = page.fields.findIndex(
        (field) => field.name === fieldName
      );
      if (indexOfField >= 0) {
        page.fields[indexOfField].children = fieldData;
      }
    });

    if (listOfPagesCopy.length > 0) {
      setListOfPages(listOfPagesCopy);
    }
  }, [listOfPages]);

  return <>{children}</>;
};

const FullNameField = (props: FullNameProps): JSX.Element => {
  const fieldName = props.name;
  const label = props.label ? props.label : '';

  const labels = {
    firstNameLabel: `${label} first name`,
    middleNameLabel: `${label} middle name`,
    lastNameLabel: `${label} last name`,
  };

  return (
    <ComponentReader fieldName={fieldName}>
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
    </ComponentReader>
  );
};

export default FullNameField;
