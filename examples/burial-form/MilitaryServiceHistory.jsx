import React from 'react';
import {
  DateField,
  FullNameField,
  Page,
  SSNField,
  TextField
} from '@department-of-veterans-affairs/va-forms-system-core';

export default function VeteranInformation() {
  return (
    <>
      <Page title="Step 3 of 6: Military history" nextPage="/military-history/previous-names" prevPage="/veteran-information/burial">
        <DateField name="toursOfDuty.items.properties.startDate"
          label="Service start date" />
        <DateField name="toursOfDuty.items.properties.endDate"
          label="Service end date" />
        <TextField name="toursOfDuty.items.properties.serviceBranch"
          label="Branch of service" />
        <TextField name="toursOfDuty.items.properties.rank"
          label="Rank" />
        <TextField name="toursOfDuty.items.properties.serviceNumber"
          label="Service number" />
        <TextField name="toursOfDuty.items.properties.placeOfEntry"
          label="Place of entry" />
        <TextField name="toursOfDuty.items.properties.placeOfSeparation"
          label="Place of separation" />
        <button type="button" disabled>Add another Service Period</button>
      </Page>
      {/* <DebuggerView /> */}
    </>
  )
}