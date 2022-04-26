import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import {
  Chapter,
  Page,
  DebuggerView,
  FormContext,
  TextField
} from '@department-of-veterans-affairs/va-forms-system-core';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';
void defineCustomElements();

const ReactRouterV6 = () => {
  return (
    <div className="vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column">
      <FormContext.Consumer>
        {value =>
          <div>
            <Formik initialValues={value.formData} onSubmit={value.handleUpdate}>
              <Form>
                <h2>Welcome to your first form</h2>
                <h3>Please follow the links below to get started on your form</h3>

                <Link to="alone-page">Link to Alone Page</Link>
                
                <Page path="alone-page" title="Alone Page" >
                  <h2>Alone Page for fun</h2>
                </Page>
                
                <Chapter path="chapter-one" title="Chapter One" >
                  <h3>Chapter 1</h3>
                  <Page path="page-one" title="Chapter 1 Page 1">
                    <h4>Page 1</h4>

                    <TextField name="formData.foo" label="Fill in for Foo" required />
                  </Page>
                  <Page path="page-two" title="Chapter 1 Page 2">
                    <h4>Page 2</h4>
                  </Page>
                  <Page path="page-three" title="Chapter 1 Page 3">
                    <h4>Page 3</h4>
                  </Page>
                  <Page path="page-four" title="Chapter 1 Page 4">
                    <h4>Page 4</h4>
                    <button>Submit</button>
                  </Page>
                </Chapter>
                <br />
                <DebuggerView />
              </Form>
            </Formik>
          </div>
        }
      </FormContext.Consumer>
    </div>
  );
};

export default ReactRouterV6;
