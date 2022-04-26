import React from 'react';
import {
  TextField,
  DebuggerView,
  FormContext,
  Chapter,
  Page
} from '@department-of-veterans-affairs/va-forms-system-core';
import { Formik, Form } from 'formik';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
void defineCustomElements();

const MultiPageApp = () => (
  <div
    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
  >
    <h1>Welcome to React Router V6 Form Example</h1>
    <div>
      The links below will help you navigate through the 2 chapters and 4
      pages of this form
    </div>
    <FormContext.Consumer>
      {
        value => 
        <Formik
          initialValues={{
            formData: value.formData,
            handleUpdate: value.handleUpdate,
          }}
        >
          <Form>
            <Chapter path="chapter-one" title="Chapter 1">
              <h1>Welcome to Chapter 1</h1>
              <Page path="page-one" title="Chapter 1 - Page 1">
                <div>
                  <h2>Entering Page 1 of Chapter 1</h2>
                  <TextField
                    name="formData.chapter1.foo"
                    label="Enter your FOO data"
                    required
                  />
                </div>
              </Page>
              <Page path="page-two" title="Chapter 1 - Page 2">
                <div>
                  <TextField
                    name="formData.chapter1.bar"
                    label="Enter your BAR data"
                    required
                  />
                </div>
              </Page>
            </Chapter>
            <Chapter path="chapter-two" title="Chapter 2">
              <h1>Welcome to Chapter 2</h1>
              <Page path="page-one" title="Chapter 2 - Page 1">
                <div>
                  <h2>Entering Page 1 of Chapter 2</h2>
                  <TextField
                    name="formData.chapter2.fiz"
                    label="Enter your Fiz data"
                    required
                  />
                </div>
              </Page>
              <Page path="page-two" title="Chapter 2 - Page 1">
                <div>
                  <TextField
                    name="formData.chapter2.buz"
                    label="Enter your Buz data"
                    required
                  />
                </div>
              </Page>
            </Chapter>
            <DebuggerView />
          </Form>
        </Formik>
      }
    </FormContext.Consumer>
  </div>
);

export default MultiPageApp;
