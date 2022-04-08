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

import 'web-components/dist/component-library/component-library.css';
import { defineCustomElements } from 'web-components/loader';

const checkboxProps = {
  fieldProps: {
    label: 'What kind of breakfast do you like?',
    name: 'breakfast',
    id: 12,
    /**
     * If `required` is true, the default message will be used. If `required` is a
     * string, it will be used as the error message.
     */
    required: true,
  },
  checkboxes: [
    {
      name: 'eggs',
      label: 'Eggs',
      id: '12a',
    },
    {
      name: 'protien',
      label: 'Protien Shake',
      id: '12b',
    },
    {
      name: 'toast',
      label: 'Toast',
      id: '12c',
    },
  ],
};

void defineCustomElements();

const App = () => (
  <div
    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
  >
    <h1>Example form</h1>
    <Formik initialValues={{ foo: '', bar: true, baz: '', checkboxes: [] }}>
      <Form>
        <TextField name="foo" label="Example" required />
        <CheckboxField name="bar" label="Do you have pets?" required />
        <DateField name="baz" required />

        <CheckboxFieldGroup {...checkboxProps} />
        <DebuggerView />
      </Form>
    </Formik>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
