import React from 'react';
import { PageProps } from './types';
import { Routes, Route } from 'react-router-dom';

/**
 * Renders the page contents
 *
 * @beta
 */
export default function Page(props: PageProps): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path={props.path} element={props.children} />
      </Routes>
    </div>
  );
}
