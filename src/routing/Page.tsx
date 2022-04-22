import React from 'react';
import { PageProps } from './types';

/**
 * Renders the page contents
 *
 * @beta
 */
export default function Page(props: PageProps): JSX.Element {
  return (
    <div>
      <h1>{props.title}</h1>

      {props.children}
    </div>
  );
}
