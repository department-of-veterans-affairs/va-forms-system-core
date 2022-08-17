import React from 'react';
import {ArrayField, DateField, DebuggerView, Page, TextField} from '@department-of-veterans-affairs/va-forms-system-core';
import {useFormikContext} from 'formik';
import {isBeforeDate} from './utils';

export default function MilitaryServiceHistory(props) {

  const state = useFormikContext();

  const tourOfDuty = () => {
    this.dateRange = {
      from: undefined,
      to: undefined
    };
    this.serviceBranch = undefined;
    this.rank = undefined;
    this.serviceNumber = undefined;
    this.placeOfEntry = undefined;
    this.placeOfSeparation = undefined;
  }

  const createEntry = () => {
    const newEntry = new tourOfDuty();
    state.values.toursOfDuty.push(newEntry);
    return newEntry;
  }

  // const removeEntry = (index) => {
  //   state.values.toursOfDuty.splice(index, 1);
  // }

  const expandedView = (props) => <>
    <DateField name={props.entry.dateRange.from}
               label="Service start date"/>
    <DateField name={props.entry.dateRange.to}
               label="Service end date"
               validate={isBeforeDate(props.entry.dateRange.to, props.entry.dateRange.from, "End of service must be after start of service")}/>
    <TextField name={props.entry.serviceBranch}
               label="Branch of service"/>
    <TextField name={props.entry.rank}
               label="Rank"/>
    <TextField name={props.entry.serviceNumber}
               label="Service number"/>
    <TextField name={props.entry.placeOfEntry}
               label="Place of entry"/>
    <TextField name={props.entry.placeOfSeparation}
               label="Place of separation"/>
  </>;

  const collapsedView = (props) => <>
    <div>
      <label className="vads-u-margin-top--1 review-page--page-info--label-text">Service start date</label>
      <span className="review-page--page-info--value-text field-value">{props.entry.dateRange.from}</span>
    </div>
    <div>
      <label className="vads-u-margin-top--1 review-page--page-info--label-text">Service end date</label>
      <span className="review-page--page-info--value-text field-value">{props.entry.dateRange.to}</span>
    </div>
    <div>
      <label className="vads-u-margin-top--1 review-page--page-info--label-text">Branch of service</label>
      <span className="review-page--page-info--value-text field-value">{props.entry.serviceBranch}</span>
    </div>
    <div>
      <label className="vads-u-margin-top--1 review-page--page-info--label-text">Rank</label>
      <span className="review-page--page-info--value-text field-value">{props.entry.rank}</span>
    </div>
    <div>
      <label className="vads-u-margin-top--1 review-page--page-info--label-text">Service number</label>
      <span className="review-page--page-info--value-text field-value">{props.entry.serviceNumber}</span>
    </div>
    <div>
      <label className="vads-u-margin-top--1 review-page--page-info--label-text">Place of entry</label>
      <span className="review-page--page-info--value-text field-value">{props.entry.placeOfEntry}</span>
    </div>
    <div>
      <label className="vads-u-margin-top--1 review-page--page-info--label-text">Place of separation</label>
      <span className="review-page--page-info--value-text field-value">{props.entry.placeOfSeparation}</span>
    </div>
  </>

  return (
    <>
      <Page {...props}>
        <div className="usa-alert usa-alert-warning background-color-only">
          <span>
            <strong>Note:</strong> If you would rather upload a DD214 than enter dates
            here, you can do that later in the form.
          </span>
        </div>
        <ArrayField label="Service Periods"
                    entries={state.values.toursOfDuty}
                    collapsedView={collapsedView}
                    expandedView={expandedView}
                    createEntry={createEntry}
                    // removeEntry={removeEntry}
        />
        <br/>
        <DebuggerView/>
      </Page>
    </>
  )
}