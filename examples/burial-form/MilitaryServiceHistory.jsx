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

/**
 * An individual object is passed into the array field to represent
 * the data that gets populated into the array
 */
const ARRAY_FIELD_PROPS = {
  dateRange: {
    to: undefined,
    from: undefined,
  },
  serviceBranch: undefined,
  rank: undefined,
  serviceNumber: undefined,
  placeOfEntry: undefined,
  placeOfSeparation: undefined,
}

/**
 * JSX element template is passed two parameters, the
 * * individual array item in the array field, and an index
 *
 * @param data - individual array field item - an object with key
 * * value pairs
 * @param index - Where the item can be located inside of the array
 * @returns - JSX that gets returned per array item inside of the
 * array field
 */
const FieldArrayTemplate = ({data, index}) => {
  return (
    <>
      <DateField 
        name={`toursOfDuty[${index}]dateRange.from`} 
        label="Service start date" 
        value={data.dateRange.from}
        // validate={isBeforeDate(
        //   data.dateRange.from,
        //   data.dateRange.to,
        //   'End of service must be after start of service'
        // )}
      />
      <DateField 
        name={`toursOfDuty[${index}]dateRange.to`}
        label="Service end date"
        value={data.dateRange.to}
      />
      <SelectField
      name={`toursOfDuty[${index}]serviceBranch`}
      label="Branch of service"
      value={data.serviceBranch}
      >
        <option>Air Force</option>
        <option>Army</option>
        <option>Coast Guard</option>
        <option>Marine Corps</option>
        <option>Navy</option>
        <option>Space Force</option>
      </SelectField>
      <TextField name={`toursOfDuty[${index}]rank`} label="Rank" value={data.rank}/>
      <TextField name={`toursOfDuty[${index}]serviceNumber`} label="Service number" value={data.serviceNumber}/>
      <TextField name={`toursOfDuty[${index}]placeOfEntry`} label="Place of entry" value={data.placeOfEntry}/>
      <TextField name={`toursOfDuty[${index}]placeOfSeparation`} label="Place of separation" value={data.placeOfEntry}/>
    </>
  )
}

export default function MilitaryServiceHistory(props) {
  const state = useFormikContext();
  const { values } = state;

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
        <ArrayField 
          name="toursOfDuty" 
          arrayFieldSchema={ARRAY_FIELD_PROPS} 
          buttonLabel="Service Period"
          FieldArrayTemplate={FieldArrayTemplate}
          maxLength={5} />
        <br/>
        <h3>Debug View Below</h3>
        <DebuggerView/>
        <br />
      </Page>
    </>
  );
}
