import React from 'react';
import { Formik, Form } from 'formik';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import {
  Chapter,
  Page,
  TextField,
  DebuggerView,
} from '@department-of-veterans-affairs/va-forms-system-core';

const FirstChapter = () => (
  <>
    <Chapter path="chapter-one" title="First Chapter Router V6">
      <Link to="page-one">Going to Page 1</Link> <br />
    </Chapter>
    <br />
  </>
);

const TestPage = () => (
  <Page path="page-one" title="Page One First Chapter">
    <h1>Example form</h1>

    <TextField name="formData.chapter1.foo" label="Fooooo" required />
    <TextField name="formData.chapter1.bar" label="Barrrr" required />
    <DebuggerView />
  </Page>
);

const MyForm = () => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <Formik
        initialValues={{
          formData: {
            chapter1: {
              foo: '',
              bar: '',
            },
            chapter2: {
              username: '',
              termAgreement: false,
            },
          },
          handleUpdate: () => {
            console.log('subitting');
          },
        }}
      >
        <Form>
          <h2>Welcome to your first form</h2>
          <h3>Please follow the links below to get started on your form</h3>
          <Link to="chapter-one">Going to Chapter 1</Link> <br />
          <br />
          <br />
          <Outlet />
          <br />
        </Form>
      </Formik>
    </div>
  );
};

const ReactRouterV6 = () => (
  <Routes>
    <Route path="" element={<MyForm />}>
      <Route path="chapter-one" element={<FirstChapter />}>
        <Route path="page-one" element={<TestPage />} />
      </Route>
    </Route>
  </Routes>
);

export default ReactRouterV6;
