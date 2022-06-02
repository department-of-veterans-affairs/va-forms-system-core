import React from 'react';
import {
  Page,
} from '@department-of-veterans-affairs/va-forms-system-core';
import { useFormikContext } from 'formik';

export default function BenefitsSelection(props) {

  // const state = useFormikContext();

  return (
    <>
      <Page {...props} nextPage="/benefits/burial-allowance" prevPage="/military-history/previous-names">
        
      </Page>
    </>
  )
}