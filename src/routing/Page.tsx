import React from 'react';
import { PageProps } from './types';
import { useParams } from 'react-router-dom';

/**
 * Renders the page contents
 *
 * @beta
 */
export default function Page(props: PageProps): JSX.Element {
  let params = useParams();

  return (
    <div>
      <h1>{props.title}</h1>

      <h2>{params.pageId}</h2>

      <h3>{props.children}</h3>
    </div>
  );
}
