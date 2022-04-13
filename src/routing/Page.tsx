import React from 'react';

import { Formik, Form } from 'formik';
import { Link, Route } from 'react-router-dom';
import { PageProps } from './types';

import { FormContext } from './FormContext2';

/**
 * Renders the page contents
 *
 * @beta
 */
export default function Page(props: PageProps): JSX.Element {
  
  // I DONT WANT TO PUT THIS HERE, THERE SHOULD BE SOME WAY TO HAVE 
  // HANDLEUPDATE COME FROM CONTEXT

  const handleUpdate = () => {
    console.log('submiting');
  };

  return (
    <Route path={props.path}>
      <FormContext.Consumer>
      {value => 
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1>{props.title}</h1>
          {/* <Formik initialValues={value.formData} onSubmit={value.handleUpdate}> */}
          <Formik initialValues={value.formData} onSubmit={handleUpdate}>
            <Form>{props.children}</Form>
          </Formik>
        </div>
      }
      </FormContext.Consumer>
    </Route>
  );
}
