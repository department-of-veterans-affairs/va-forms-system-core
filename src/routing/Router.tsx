import React from 'react';
import { RouterProps } from './types';
import { BrowserRouter, Switch } from 'react-router-dom';
import { FormProvider } from './FormContext';

/**
 * Manages form pages as routes
 *
 * @beta
 */
export default function Router(props: RouterProps): JSX.Element {
  return (
    <FormProvider>
      <BrowserRouter basename={props.basename}>
        <Switch>{props.children}</Switch>
      </BrowserRouter>
    </FormProvider>
  );
}
