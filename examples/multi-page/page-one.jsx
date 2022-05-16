import React from 'react';
import {
  TextField,
  EmailField,
  Page,
  PhoneField,
  DebuggerView,
  SSNField,
  DateField
} from '@department-of-veterans-affairs/va-forms-system-core';

export default function PersonalInformationPage() {
  return (
    <>
      <Page title="Personal Information" nextPage="page-two">
        <TextField name="firstName" label="First name" required/>
        <TextField name="lastName" label="Last name" required/>
        <EmailField name="email" label="Email" required />
        <PhoneField name="phone" label="Phone" required/>
        <SSNField name="ssn" label="Social Security Number" required />
        <DateField name="dob" label="Date of burial(includes cremation or interment)" required/>
      </Page>
      <DebuggerView />
    </>
  )
}