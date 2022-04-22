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

const FirstChapter = () => (
  <>
    <Chapter title="Welcome to the First Chapter" path="chapter-one">
      <Link to="page-one"> Page 1</Link> &nbsp; &nbsp;
      <Link to="page-two"> Page 2 </Link>
    </Chapter>
  </>

)

const FirstPage = () => (
  <Page title="Page Number 1">
    <TextField name="formData.foo" label="Foo Example Field" required />
    <TextField name="formData.bar" label="Bar Example Field" required />
  </Page>
)

const SecondPage = () => (
  <Page title="Page Number 2">
    <TextField name="formData.fiz" label="Fiz Example Field" required />
    <TextField name="formData.buz" label="Buz Example Field" required />

    
    <Link to="/"> Back To Home Page </Link>
  </Page>
)

const FormTemplate = () => (
  <>
     <FormContext.Consumer>
        {value =>
          <div className="vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column">
            <Formik initialValues={value.formData} onSubmit={value.handleUpdate}>
              <Form>
                <h2>Welcome to your first form</h2>
                <h3>Please follow the links below to get started on your form</h3>
                <Link to="chapter-one">Going to Chapter 1</Link> <br />
                <br />
                <br />
                <Outlet />
                <button type="submit">
                  Push My Button
                </button>
                <DebuggerView />
                <br />
              </Form>
            </Formik>
          </div>
        }
      </FormContext.Consumer>
  </>
);

const ContextApp = () => {

  return (
    <Routes>
      <Route path="" element={ <FormTemplate /> }>
        <Route path="chapter-one" element={ <FirstChapter /> } >
          <Route index element={<FirstPage />} />
          <Route path="page-one" element={ <FirstPage /> } />
          <Route path="page-two" element={ <SecondPage /> } />
          <Route path="*" element={<h1>No Matching Routes for Chapter</h1>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ContextApp;
