import React from 'react';
import { RouterProps } from './types';
import { BrowserRouter, Switch } from 'react-router-dom';

export default function Router(props: RouterProps): JSX.Element {
  return (
    <BrowserRouter basename={props.basename}>
      <Switch>{props.children}</Switch>
    </BrowserRouter>
  );
}
