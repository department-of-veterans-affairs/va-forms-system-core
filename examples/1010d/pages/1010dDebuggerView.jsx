import React from 'react';
import {
  Page,
  DebuggerView,
} from '@department-of-veterans-affairs/va-forms-system-core';
import { useFormikContext } from 'formik';

const DebugView = (props) => {
  return (
    <>
      <Page {...props}>
        <p>Submitted So Far</p>
        <DebuggerView />
      </Page>
    </>
  );
};

export default DebugView;
