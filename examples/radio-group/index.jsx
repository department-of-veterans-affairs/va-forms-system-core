import React from 'react';
import { Formik, Form } from 'formik';
import {
  RadioGroup,
  DebuggerView,
} from '@department-of-veterans-affairs/va-forms-system-core';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';
void defineCustomElements();

const RadioGroupApp = () => (
  <div className='vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column'>
    <h1>Example radio group</h1>
    <Formik initialValues={
      { 
        name: 'Label',
        radioTest: null,
      }}>
      <Form>
        <RadioGroup 
          label='Label' 
          name='radioTest'
          required
          options={
            [
              {label: 'yes', name: 'yes', value: 'yes', key: 1}, 
              {label: 'No', name: 'no', value: 'no', key: 2}
            ]
          } >
        </RadioGroup>
        <DebuggerView />
      </Form>
    </Formik>
  </div>
);

export default RadioGroupApp;
