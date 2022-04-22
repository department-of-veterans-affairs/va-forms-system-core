import React from 'react';
import {
  TextField,
  CheckboxField,
  DebuggerView,
  FormContext
} from '@department-of-veterans-affairs/va-forms-system-core';
import { Formik, Form } from 'formik';
import { Link, Outlet } from 'react-router-dom';
import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';
import { Routes, Route } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
void defineCustomElements();

const NoMatch = (props) => (
  <main style={{ padding: '1rem' }}>
    <p>There is nothing here! {props.name}</p>
  </main>
);

const Chapter = () => (
  <div>
    <Outlet />
  </div>
);

const Pages = () => (
  <Routes>
    <Route index element={<Page1 />} />
    <Route path="page-one" element={<Page1 />} />
    <Route path="page-two" element={<Page2 />} />
    <Route path="page-three" element={<Page3 />} />
    <Route path="page-four" element={<Page4 />} />
    <Route path="*" element={<NoMatch name="No Routes for Multipage-Form" />} />
  </Routes>
);

const Page1 = () => (
  <div>
    <TextField
      name="formData.chapter1.foo"
      label="Enter your FOO data"
      required
    />
    <Link to="page-two">Continue to page 2</Link>
  </div>
);

const Page2 = () => (
  <div>
    <TextField
      name="formData.chapter1.bar"
      label="Enter your BAR data"
      required
    />
    <Link to="/multipage-form/chapter-two">
      <b>Chapter 2</b>
    </Link>
  </div>
);

const Page3 = () => (
  <div>
    <TextField
      name="formData.chapter2.username"
      label="Enter your USERNAME data"
      required
    />
    <Link to="page-four">Continue to page 4</Link>
  </div>
);

const Page4 = () => (
  <div>
    <CheckboxField
      name="formData.chapter2.termAgreement"
      label="Do you agree with the data shown below?"
      required
    />
    <button type="submit">Submit form!</button>
  </div>
);

const MultiPageApp = () => (
  <div
    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
  >
    <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
      <h1>Welcome to React Router V6 Form Example</h1>
      <div>
        The links below will help you navigate through the 2 chapters and 4
        pages of this form
      </div>
      <Link to="chapter-one">Chapter 1</Link> &nbsp;&nbsp;
      <Link to="chapter-two">Chapter 2</Link> &nbsp;&nbsp;
      <Link to="chapter-three">Chapter 3</Link> &nbsp;&nbsp;
      <br />
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
              <Outlet />
              <DebuggerView />
            </Form>
          </Formik>
        }
      </FormContext.Consumer>
      
    </nav>
  </div>
);

export { MultiPageApp, Chapter, Pages, Page1, Page2, Page3, Page4 };
