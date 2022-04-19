import React from 'react';
import { RouterProps } from './types';
import { BrowserRouter, Routes } from 'react-router-dom';

/**
 * Manages form pages as routes
 *
 * @beta
 */
export default function Router(props: RouterProps): JSX.Element {
  return (
    <BrowserRouter basename={props.basename}>
      <Routes>{props.children}</Routes>
    </BrowserRouter>
  );
}
