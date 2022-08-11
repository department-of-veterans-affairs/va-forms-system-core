import React from 'react';
import { Outlet } from 'react-router-dom-v5-compat';
import { ChapterProps } from './types';

/**
 * Renders the chapter contents
 *
 * @alpha
 */
export default function Chapter(props: ChapterProps): JSX.Element {
  return (
    <div className="chapter">
      {props.title && <h2>{props.title}</h2>}
      {props.children}
      <Outlet />
    </div>
  );
}
