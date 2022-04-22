import React from 'react';
import { Outlet } from 'react-router-dom';
import { ChapterProps } from './types';

/**
 * Renders the chapter contents
 *
 * @beta
 */
export default function Chapter(props: ChapterProps): JSX.Element {
  return (
    <div>
      <h1>{props.title}</h1>

      {props.children}

      <Outlet />
    </div>
  );
}
