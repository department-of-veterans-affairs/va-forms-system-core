import React from 'react';
import { RouterProps } from './types';
import { BrowserRouter, Switch } from 'react-router-dom';

/**
 * Manages form pages as routes
 *
 * @beta
 *
 * ```typescript
 * <Router basename="multipage-form">
 *   <Page title="Example form" path="/one">
 *     <TextField name="foo" label="Example" required />
 *   </Page>
 * </Router>
 * ```
 */
export default function Router(props: RouterProps): JSX.Element {
  return (
    <BrowserRouter basename={props.basename}>
      <Switch>{props.children}</Switch>
    </BrowserRouter>
  );
}
