import React from 'react';
import { VaButton } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { Form, Formik } from 'formik';
import {
  CheckboxField,
  DebuggerView,
  TextField,
  CheckboxFieldGroup,
  FullNameField,
  DateField, 
  EmailField,
  RadioGroup
} from '@department-of-veterans-affairs/va-forms-system-core';

const checkboxProps = {
  label: 'Military Service Details',
  name: 'checkboxGroupExample',
  id: '12',
  /**
   * If `required` is true, the default message will be used. If `required` is a
   * string, it will be used as the error message.
   */
  required: true,
  values: {},
  options: [
    {
      name: 'checkboxGroupExample.purpleHeartRecipient',
      label: 'Purple Heart award recipient'
    },
    {
      name: 'checkboxGroupExample.isFormerPow',
      label: 'Former Prisoner of War'
    },
    {
      name: 'checkboxGroupExample.postNov111998Combat',
      label: 'Served in combat theater of operations after November 11, 1998'
    },
    {
      name: 'checkboxGroupExample.disabledInLineOfDuty',
      label: 'Discharged or retired from the military for a disability incurred in the line of duty'
    },
    {
      name: 'checkboxGroupExample.sawAsiaCombat',
      label: 'Served in Southwest Asia during the Gulf War between August 2, 1990, and Nov 11, 1998'
    },
    {
      name: 'checkboxGroupExample.vietnamService',
      label: 'Served in Vietnam between January 9, 1962, and May 7, 1975'
    },
    {
      name: 'checkboxGroupExample.exposedToRadiation',
      label: 'Exposed to radiation while in the military'
    },
    {
      name: 'checkboxGroupExample.radiumTreatments',
      label: 'Received nose/throat radium treatments while in the military'
    },
    {
      name: 'checkboxGroupExample.campLejeune',
      label: 'Received nose/throat radium treatments while in the military'
    },
  ],
};

const SimpleApp = () => (
  <div className='vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column'>
    <h1>Example form</h1>
    <Formik
      initialValues={{
        emailExample: '',
        textExample: '',
        checkboxGroupExample: {
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
        nameExample: {
          first: '',
          middle: '',
          last: '',
          suffix: ''
        },
        memorableDateExample: '',
        dateExample: '',
        acknowledgeExample: null,
      }}
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <TextField name="textExample" label="Enter some cool text!" required />
        <EmailField name="emailExample" label="Please Enter Your Email Address" />
        <CheckboxFieldGroup {...checkboxProps} />
        <DateField name="memorableDateExample" label="Enter Your Date of Birth" required isMemorableDate />
        <DateField name="dateExample" label="Enter Your Date of Birth" required />
        <RadioGroup 
          name="radioExample" 
          label="Please select one of the few radio buttons" 
          required 
          options={[
            { label: 'Yes', value: true, key: 1 },
            { label: 'No', value: false, key: 2 },
          ]}/>
        <FullNameField name="nameExample" label="Enter Your Full Name Below" />
        <CheckboxField name="acknowledgeExample" label="Please acknowledge if you understand the Form above" required />
        <VaButton submit text="Submit" />
        <DebuggerView />
      </Form>
    </Formik>
  </div>
);

export default SimpleApp;
