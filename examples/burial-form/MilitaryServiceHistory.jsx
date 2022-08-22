/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import {ArrayField, DateField, DebuggerView, Page, TextField} from '@department-of-veterans-affairs/va-forms-system-core';
import {useFormikContext, FieldArray} from 'formik';
import {isBeforeDate} from './utils';

export default function MilitaryServiceHistory(props) {

  const state = useFormikContext();

  // TODO: fields for the rest of toursOfDuty schema

  const serviceHistoryObjectSchema = {
      dateRange: {
        from: "",
        to: ""
      },
      serviceBranch: "",
      rank: "",
      serviceNumber: "",
      placeOfEntry: "",
      placeOfSeparation: ""
  }

  return (
    <>
      <Page {...props}>
        <div className="usa-alert usa-alert-warning background-color-only">
          <span>
            <strong>Note:</strong> If you would rather upload a DD214 than enter dates
            here, you can do that later in the form.
          </span>
        </div>
        <ArrayField name="toursOfDuty" state={state} arrayFieldSchema={serviceHistoryObjectSchema}>
          <DateField name={`toursOfDuty.index.dateRange.from`} label="Date service period began"/>
          <DateField name={`toursOfDuty.index.dateRange.to`} label="Date service period ended"/>
          <TextField name={`toursOfDuty.index.serviceBranch`} label="Branch of Service"/>
          <TextField name={`toursOfDuty.index.rank`} label="Rank held"/>
          <TextField name={`toursOfDuty.index.serviceNumber`} label="Service number"/>
          <TextField name={`toursOfDuty.index.placeOfEntry`} label="Location service period began"/>
          <TextField name={`toursOfDuty.index.placeOfSeparation`} label="Location service period ended"/>
        </ArrayField>
        <br/>
        <DebuggerView/>
      </Page>
    </>
  )
}