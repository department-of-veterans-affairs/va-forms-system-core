import React, { useEffect } from 'react';
import {
  DateField,
  Page,
  TextField,
  DebuggerView
} from '@department-of-veterans-affairs/va-forms-system-core';

export default function MilitaryServiceHistory(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });

  return (
    <>
      <Page {...props} nextPage="/military-history/previous-names" prevPage="/veteran-information">
        <div className="usa-alert usa-alert-warning background-color-only">
          <span>
            <strong>Note:</strong> If you would rather upload a DD214 than enter dates
            here, you can do that later in the form.
          </span>
        </div>
        <h3>Service Periods</h3>
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
        <button type="button" className="usa-button-secondary va-growable-add-btn usa-button-disabled" disabled>Add another Service Period</button>
        <br />
      </Page>
      <DebuggerView />
    </>
  )
}