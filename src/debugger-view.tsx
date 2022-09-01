import React from 'react';
import { useFormikContext } from 'formik';
import { replaceUndefinedWithNull } from './utils';

/**
 * Display the Formik state
 */
const DebuggerView = () => {
  const state = useFormikContext();

  return (
    <>
      <pre>
        <code>
          {JSON.stringify(
            state,
            (key, value) => replaceUndefinedWithNull(value),
            2
          )}
        </code>
      </pre>
    </>
  );
};

export default DebuggerView;
