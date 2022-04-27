import React from 'react';
import ReactDOM from 'react-dom';

import { Form, Formik } from 'formik';
import {
  CheckboxField,
  RadioGroup,
  DateField,
  DebuggerView,
  TextField,
  FullNameField,
  EmailField,
} from '@department-of-veterans-affairs/va-forms-system-core';

import CheckboxFieldGroup from '../../src/form-builder/CheckboxFieldGroup';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';

const checkboxProps = {
  label: 'Military Service Details',
  name: 'serviceStatus',
  id: '12',
  /**
   * If `required` is true, the default message will be used. If `required` is a
   * string, it will be used as the error message.
   */
  required: true,
  values: {},
  options: [
    {
      name: 'purpleHeartRecipient',
      label: 'Purple Heart award recipient',
      required: false,
    },
    {
      name: 'isFormerPow',
      label: 'Former Prisoner of War',
      required: false,
    },
    {
      name: 'postNov111998Combat',
      label: 'Served in combat theater of operations after November 11, 1998',
      required: false,
    },
    {
      name: 'disabledInLineOfDuty',
      label: 'Discharged or retired from the military for a disability incurred in the line of duty',
      required: false,
    },
    {
      name: 'sawAsiaCombat',
      label: 'Served in Southwest Asia during the Gulf War between August 2, 1990, and Nov 11, 1998',
      required: false,
    },
    {
      name: 'vietnamService',
      label: 'Served in Vietnam between January 9, 1962, and May 7, 1975',
      required: false,
    },
    {
      name: 'exposedToRadiation',
      label: 'Exposed to radiation while in the military',
      required: false,
    },
    {
      name: 'radiumTreatments',
      label: 'Received nose/throat radium treatments while in the military',
      required: false,
    },
    {
      name: 'campLejeune',
      label: 'Received nose/throat radium treatments while in the military',
      required: false,
    },
  ],
};

const radioGroupProps = {
  label: "Preferred contact method", 
  name: "contactMethod",
  required: true,
  options: [
    {
      label: 'Email',
      name: 'email', 
      value: 'email',
    },
    {
      label: 'Phone',
      name: 'phone',
      value: 'phone',
    },
    {
      label: 'Mail',
      name: 'mail',
      value: 'mail',
    }
  ]
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
void defineCustomElements();

const App = () => (
  <div className='vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column'>
    <h1>Example form</h1>
    <Formik
      initialValues={{
        email: "",
        serviceStatus: {
          purpleHeartRecipient: false,
          isFormerPow: false,
          postNov111998Combat: false,
          disabledInLineOfDuty: false,
          sawAsiaCombat: false,
          vietnamService: false,
          exposedToRadiation: false,
          radiumTreatments: false,
          campLejeune: false,
        },
        contactMethod: null,
      }}
    >
      <Form>
        <FullNameField fieldName="veteranFullName" required/>
        <br />
        <EmailField label="Email" name="email" required/>
        <br />
        <RadioGroup {...radioGroupProps} />
        <br />
        <CheckboxFieldGroup {...checkboxProps} />
        <br />
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
