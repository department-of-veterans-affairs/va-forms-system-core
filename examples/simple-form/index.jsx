import React from 'react';
import ReactDOM from 'react-dom';

import { Form, Formik } from 'formik';
import {
  CheckboxField,
  RadioGroup,
  DateField,
  DebuggerView,
  TextField,
  FullNameField
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
  values: {},
  options: [
    {
      name: 'eggs',
      label: 'Eggs',
      content: '🐥🐣',
      checked: true,
      required: false,
    },
    {
      name: 'protein',
      label: 'Protein Shake',
      content: '🏋️',
      required: true,
    },
    {
      name: 'toast',
      label: 'Toast',
      content: '🍞',
      required: false,
    },
    {
      name: 'fruit',
      label: 'Fruit',
      content: '🍐',
      required: false,
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
void defineCustomElements();

const App = () => (
  <div className='vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column'>
    <h1>Example form</h1>
    <Formik
      initialValues={{
        bar: true,
        breakfast: {
          eggs: true,
          protein: false,
          toast: false,
          fruit: false,
        },
      }}
    >
      <Form>
        <CheckboxField name="bar" label="Do you have pets?" required />
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
        <TextField name="foo" label="Example" required />
        {/* <DateField name="baz" required /> */}
        <CheckboxFieldGroup {...checkboxProps} />
        <FullNameField name="fullName" label="fullName"/>
        <button type="submit" className="btn">
          {' '}
          submit
        </button>
        <DebuggerView />
      </Form>
    </Formik>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
