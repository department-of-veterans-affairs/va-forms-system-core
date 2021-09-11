import React from 'react';
import { PageType } from './types';
import { BrowserRouter, Switch } from 'react-router-dom';

interface RouterProps {
  children: Array<PageType>;
  basename: string;
  history: any; // TODO: It's the browser history...
}

export default function Router(props: RouterProps): JSX.Element {
  return (
    <BrowserRouter basename={props.basename}>
      <Switch>{props.children}</Switch>
    </BrowserRouter>
  );
}
