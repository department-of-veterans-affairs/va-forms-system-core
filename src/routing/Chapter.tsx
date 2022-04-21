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
    <div className="vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column">
      <h1>{props.title}</h1>

      {props.children}

      <Outlet />
    </div>
  );
}
