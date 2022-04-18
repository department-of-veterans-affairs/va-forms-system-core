import React from 'react';
import ReactDOM from 'react-dom';

import { Formik, Form } from 'formik';

import {
  RadioGroup,
  RadioItem,
  DebuggerView,
} from '@department-of-veterans-affairs/va-forms-system-core';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
void defineCustomElements();

const App = () => (
  <div
    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
  >
    <h1>Example radio group</h1>
    <Formik initialValues={
      { 
        name: 'Label',
      }}>
      <Form>
        <RadioGroup name="radio-test" options={[{checked: true, label: "yes", name: "yes", value: true}, {checked: false, label: "No", name: "no", value: false}]} >
        </RadioGroup>
        <DebuggerView />
      </Form>
    </Formik>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));