import React, { useEffect } from 'react';
import {
  DebuggerView,
  FullNameField,
  Page,
  RadioGroup
} from '@department-of-veterans-affairs/va-forms-system-core';
import { useFormikContext } from 'formik';
import { ExpandingGroupClass } from '../Constant';

export default function PreviousNames(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });

  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values?.previousNames && values?.veteranServedUnderAnotherName?.type === 'false') {
      setFieldValue(`previousNames`, [])
    }
  }, [values?.veteranServedUnderAnotherName?.type]);
  
  return (
    <>
      <Page {...props} prevPage="/military-history/service-periods" nextPage="/benefits/selection">
        <RadioGroup
          name="veteranServedUnderAnotherName.type"
          label="Did the Veteran serve under another name?"
          required
          options={
            [
              {label: "Yes", value: true, key: 1},
              {label: "No", value: false, key: 2},
            ]
          }
        />
        {
          values?.veteranServedUnderAnotherName?.type === "true"
          ? (
            <div className={ExpandingGroupClass}>
              <FullNameField name="previousNames[0]"/>
              <button
                className="btn usa-button usa-button-disabled">
                Add another name
              </button>
            </div>
          )
          : (
            null
          )
        }
      </Page>
      <DebuggerView />
    </>
  )
}