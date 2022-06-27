import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, useLocation } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { RouterProps } from './types';

import FormTitle from '../form-layout/FormTitle';
import FormFooter from '../form-layout/FormFooter';
import { RouterContextProvider } from './RouterContext';
import RouterProgress from './RouterProgress';

// const formikValidation = async (event) => {
// event.preventDefault();
// state.setTouched({});
// const validate = await state.validateForm();
// const validateKeys = Object.keys(validate);

// if (validateKeys.length === 0) {
//   navigate(nextRoute as To);
// }
// else {
//   state.handleSubmit();
// }

//   /// if -- the last page
//   //
// }
/**
 * Manages form pages as routes
 * Parent formik insance is rendered here
 * @beta
 */
export default function FormRouter(props: RouterProps): JSX.Element {
  const initialValues = props.formData;

  return (
    <div className="row">
      <div className="usa-width-two-thirds medium-8 columns">
        <BrowserRouter basename={props.basename}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              // if not the last page:
              actions.setTouched({}); // resetting fields
              actions.setSubmitting(false); // resetting fields
              // else: final submission
              // This is where data is transformed if a custom transformForSubmit function is provided.
              // The wrapping onSubmit function will need updated in the future if the default case needs updated when users don't pass a transformForSubmit function
              if (props.transformForSubmit) {
                props.transformForSubmit(values, actions);
              }
            }}
          >
            <form>
              <RouterContextProvider routes={props.children}>
                <FormTitle title={props.title} subTitle={props?.subtitle} />
                <RouterProgress />
                <Routes>{props.children}</Routes>
                <FormFooter />
              </RouterContextProvider>
            </form>
          </Formik>
        </BrowserRouter>
      </div>
    </div>
  );
}
