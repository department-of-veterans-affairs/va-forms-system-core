import React from 'react';

import { Formik, Form } from 'formik';
import { Route } from 'react-router-dom';
import { PageProps, Routable } from './types';

type RoutableElement = JSX.Element & Routable;

/**
 * Renders the page contents
 *
 * @beta
 *
 * ```typescript
 * <Page title="Example form" path="/one">
 *   <TextField name="foo" label="Example" required />
 * </Page>
 * ```
 */
export default function Page(props: PageProps): JSX.Element {
  const handleSubmit = () => {
    console.log('submiting');
  };

  return (
    <Route path={props.path}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1>{props.title}</h1>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          <Form>{props.children}</Form>
        </Formik>
      </div>
    </Route>
  ) as RoutableElement;
}
