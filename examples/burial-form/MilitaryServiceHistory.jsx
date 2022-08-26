/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import {
  ArrayField,
  DateField,
  Page,
  TextField,
  SelectField,
  DebuggerView
} from '@department-of-veterans-affairs/va-forms-system-core';
import { useFormikContext } from 'formik';
import { isBeforeDate } from './utils';


export default function MilitaryServiceHistory(props) {
  const state = useFormikContext();
  const { values } = state;

  // TODO: fields for the rest of toursOfDuty schema

  const objectSchema = state?.initialValues?.toursOfDuty[0];

  return (
    <>
      <Page
        {...props}
        fieldNames={[
          'toursOfDuty', // this needs to be updated to allow multiple field values
        ]}
      >
        <div className="usa-alert usa-alert-warning background-color-only">
          <span>
            <strong>Note:</strong> If you would rather upload a DD214 than enter
            dates here, you can do that later in the form.
          </span>
        </div>
        <ArrayField name="toursOfDuty" values={values} arrayFieldSchema={objectSchema} buttonLabel="Service Period">
          <DateField name={`toursOfDuty.index.dateRange.to`} label="Service start date"/>
          <DateField 
            name={`toursOfDuty.index.dateRange.from`} 
            label="Service end date" 
            // validate={isBeforeDate(
            //   to,
            //   from,
            //   'End of service must be after start of service'
            // )}
          />
          <SelectField
          name={`toursOfDuty.index.serviceBranch`}
          label="Branch of service"
          >
            <option>Air Force</option>
            <option>Army</option>
            <option>Coast Guard</option>
            <option>Marine Corps</option>
            <option>Navy</option>
            <option>Space Force</option>
          </SelectField>
          <TextField name={`toursOfDuty.index.rank`} label="Rank"/>
          <TextField name={`toursOfDuty.index.serviceNumber`} label="Service number"/>
          <TextField name={`toursOfDuty.index.placeOfEntry`} label="Place of entry"/>
          <TextField name={`toursOfDuty.index.placeOfSeparation`} label="Place of separation"/>
        </ArrayField>
        <br/>
        <DebuggerView/>
        <br />
      </Page>
    </>
  );
}
