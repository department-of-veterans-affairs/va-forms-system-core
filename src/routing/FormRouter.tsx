import React from 'react';
import { Routes } from 'react-router-dom-v5-compat';
import { Formik } from 'formik';
import { FormRouterProps } from './types';

import FormTitle from '../form-layout/FormTitle';
import FormFooter from '../form-layout/FormFooter';
import { RouterContextProvider } from './RouterContext';
import RouterProgress from './RouterProgress';
import { StringifyFormReplacer } from '../utils/helpers';
import { PageContextProvider } from '../form-data/PageContext';

/**
 * Manages form pages as routes
 * Parent formik insance is rendered here
 * @public
 */
export default function FormRouter(props: FormRouterProps): JSX.Element {
  const initialValues = props.formData;
  const uiInitialValues = props?.uiFormData || {};
  const formValues = { ...initialValues, ...uiInitialValues };

  return (
    <div className="row">
      <div className="usa-width-two-thirds medium-8 columns">
        <Formik
          initialValues={formValues}
          onSubmit={(values, actions) => {
            // This is where data is transformed if a custom transformForSubmit function is provided.
            // The wrapping onSubmit function will need updated in the future if the default case needs updated when users don't pass a transformForSubmit function

            // Transform the data before submitting
            const data = JSON.stringify(values, StringifyFormReplacer);
            if (props.transformForSubmit) {
              props.transformForSubmit(values, actions);
            }
          }}
        >
          <form>
            <RouterContextProvider routes={props.children}>
              <FormTitle title={props.title} subTitle={props?.subtitle} />
              <RouterProgress />
              <PageContextProvider>
                <Routes>{props.children}</Routes>
              </PageContextProvider>
              <FormFooter />
            </RouterContextProvider>
          </form>
        </Formik>
      </div>
    </div>
  );
}
