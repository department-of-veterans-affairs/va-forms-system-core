import React from 'react';
import ReactDOM from 'react-dom';

import { Formik, Form } from 'formik';
import {
  TextField,
  CheckboxField,
  DateField,
  DebuggerView,
} from '@department-of-veterans-affairs/va-forms-system-core';

import CheckboxFieldGroup from '../../src/form-builder/CheckboxFieldGroup';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';

const checkboxProps = {
  label: 'What breakfast?',
  name: 'breakfast',
  id: '12',
  /**
   * If `required` is true, the default message will be used. If `required` is a
   * string, it will be used as the error message.
   */
  required: true,
  values: {
    eggs: true,
  },
  options: [
    {
      value: 'eggs',
      label: 'Eggs',
      content: '🐥🐣',
    },
    {
      value: 'protien',
      label: 'Protien Shake',
      content: '🏋️',
    },
    {
      value: 'toast',
      label: 'Toast',
      content: '🍞',
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
void defineCustomElements();

const App = () => (
  <div
    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
  >
    <h1>Example form</h1>
    <Formik initialValues={{ bar: true, breakfast: '' }}>
      <Form>
        {/* <TextField name="foo" label="Example" required /> */}
        <CheckboxField name="bar" label="Do you have pets?" required />
        {/* <DateField name="baz" required /> */}

        <CheckboxFieldGroup {...checkboxProps} />
        <DebuggerView />
      </Form>
    </Formik>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
