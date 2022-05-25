import React from 'react';
import {
  DateField,
  FullNameField,
  Page,
  SSNField,
  TextField
} from '@department-of-veterans-affairs/va-forms-system-core';
import { useFormikContext } from 'formik';

export default function VeteranInformation() {
  const state = useFormikContext();

  return (
    <>
      <Page title="Step 2 of 6: Deceased Veteran Information" nextPage="/" prevPage="/claimant-information">
        <FullNameField name="veteranFullName"
          label="" />
        <SSNField name="veteranSocialSecurityNumber"
          label="Social Security number (must have this or a VA file number)"
          required={state.values.vaFileNumber !== '' ? false : true} />
        <TextField name="vaFileNumber"
          label="VA file number (must have this or a Social Security number)"
          required={state.values.veteranSocialSecurityNumber !== '' ? false : true} />
        <DateField name="veteranDateOfBirth"
          label="Date of birth"
          required />
        <TextField name="placeOfBirth"
          label="Place of birth (city and state or foreign country)" />
      </Page>
      {/* <DebuggerView /> */}
    </>
  )
}