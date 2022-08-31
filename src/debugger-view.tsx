import React from 'react';
import { useFormikContext } from 'formik';

const replaceUndefinedWithNull = (k: string, v: any): unknown => {
  return v === undefined ? null : v;
};

/**
 * Display the Formik state
 */
const DebuggerView = () => {
  const state = useFormikContext();

  return (
    <>
      <pre>
        <code>{JSON.stringify(state, replaceUndefinedWithNull, 2)}</code>
      </pre>
    </>
  );
};

export default DebuggerView;
