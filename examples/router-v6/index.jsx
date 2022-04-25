import React from 'react';
import { Formik, Form } from 'formik';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import {
  Chapter,
  Page,
  TextField,
  DebuggerView,
  FormContext
} from '@department-of-veterans-affairs/va-forms-system-core';

const Chapters = () => (
  <>
   <Link to="1">
      <button type="button">Chapter 1!</button>
    </Link>
    <Link to="2">
      <button type="button">Chapter 2!</button>
    </Link>

    <Outlet />
  </>
);

const Pages = () => (
  <>
   <Link to="1">
      <button type="button">Page 1!</button>
    </Link>
    <Link to="2">
      <button type="button">Page 2!</button>
    </Link>

    <Outlet />
  </>
);

const RouterV6Form = () => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <FormContext.Consumer>
        {value =>
          <div className="vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column">
            <Formik initialValues={value.formData} onSubmit={value.handleUpdate}>
              <Form>
                <h2>Welcome to your first form</h2>
                <h3>Please follow the links below to get started on your form</h3>
                <Link to="chapters">
                  <button type="button">Start Form!</button>
                </Link>
                <br />
                <br />
                <DebuggerView />
                <br />
              </Form>
            </Formik>
          </div>
        }
      </FormContext.Consumer>
    </div>
  );
};

const ReactRouterV6 = () => (
  <Routes>
    <Route path="" element={<RouterV6Form />} />
    <Route path="chapters" element={<Chapters />}>
      <Route path=":chapterId" element={ <Chapter /> } >
        <Route path="pages" element={<Pages /> }>
          <Route path=":pageId" element={ <Page /> } />
        </Route>
      </Route>
    </Route>
  </Routes>

  // <Routes>
  //   <Route path="" element={<RouterV6Form />} />
  //   <Route path="chapter/*" element={ <Chapter title="Chapter 1" /> } />
  // </Routes>
);

export default ReactRouterV6;
