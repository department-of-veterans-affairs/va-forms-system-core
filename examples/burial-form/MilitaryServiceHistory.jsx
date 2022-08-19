/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import {ArrayField, DateField, DebuggerView, Page, TextField} from '@department-of-veterans-affairs/va-forms-system-core';
import {useFormikContext, FieldArray} from 'formik';
import {isBeforeDate} from './utils';

export default function MilitaryServiceHistory(props) {

  const state = useFormikContext();

  // TODO: fields for the rest of toursOfDuty schema

  return (
    <>
      <Page {...props}>
        <div className="usa-alert usa-alert-warning background-color-only">
          <span>
            <strong>Note:</strong> If you would rather upload a DD214 than enter dates
            here, you can do that later in the form.
          </span>
        </div>
        <FieldArray name="toursOfDuty">
          {({ remove, push }) => (
            <div>
              {state.values.toursOfDuty.length > 0 && state.values.toursOfDuty.map((tour, index) => (
                <div key={index}>
                  <DateField name={`toursOfDuty.${index}.dateRange.from`} />
                  <DateField name={`toursOfDuty.${index}.dateRange.to`} />
                  <button type="button" onClick={() => remove(index)}>remove</button>
                </div>
              ))}
              <button type="button" onClick={() => push({dateRange: {from: '', to: ''}})}>add</button>
            </div>
          )}
        </FieldArray>
        <br/>
        <DebuggerView/>
      </Page>
    </>
  )
}