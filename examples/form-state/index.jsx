import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Routes, Outlet } from 'react-router-dom';
import {
  TextField,
  DebuggerView,
  Chapter,
  Page,
  FormContext
} from '@department-of-veterans-affairs/va-forms-system-core';
import { Formik, Form } from 'formik';

import '@department-of-veterans-affairs/component-library/dist/main.css';

const FormStateApp = () => (
  <div
    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
  >
    <h1>Welcome to React Router V6 Form Example</h1>
    <div>
      The links below will help you navigate through the 2 chapters and 4
      pages of this form
    </div>
     <FormContext.Consumer>
        {value =>
          <div className="vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column">
            <Formik initialValues={value.formData} onSubmit={value.handleUpdate}>
              <Form>
                <h2>Welcome to your first form</h2>
                <h3>Please follow the links below to get started on your form</h3>

                <br />
                <Chapter path="chapter-one" title="Chapter 1">
                  <Page path="page-one" title="Chapter 1 - Page 1">
                    <TextField name="formData.foo" label="Foo Example Field" required />
                    <TextField name="formData.bar" label="Bar Example Field" required />
                  </Page>
                  <Page path="page-two" title="Chapter 1 - Page 2">
                    <TextField name="formData.fiz" label="Fiz Example Field" required />
                    <TextField name="formData.buz" label="Buz Example Field" required />
                  </Page>
                </Chapter>
                <DebuggerView />
                <br />
              </Form>
            </Formik>
          </div>
        }
      </FormContext.Consumer>
  </div>
);

export default FormStateApp;
