import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { FormContext } from '../../src/routing/FormContext';

import { Formik, Form } from 'formik';
import {
  TextField,
  DebuggerView,
} from '@department-of-veterans-affairs/va-forms-system-core';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
void defineCustomElements();

const App = () => {
  const { formData, handleUpdate } = useContext(FormContext);

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <h1>Example form</h1>
      <Formik initialValues={formData}>
        <Form>
          <TextField name="foo" label="Example" required />
          <button type="submit" onClick={handleUpdate}>
            Click Me!
          </button>
          <DebuggerView />
        </Form>
      </Formik>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
