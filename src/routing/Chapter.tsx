import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChapterProps } from './types';

/**
 * Renders the chapter contents
 *
 * @beta
 */
export default function Chapter(props: ChapterProps): JSX.Element {
  return (
    // <Route path={props.path}>
    //   <div className="vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column">
    //     <h1>{props.title}</h1>
    //   </div>
    //   <Routes>
    //     <>
    //       {props.children}
    //     </>
    //   </Routes>
    // </Route>
    <Route path={props.path}>
      <>
        {/* <div className="vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column">
          <h1>{props.title}</h1>
        </div> */}

        {props.children}
      </>
    </Route>
  );
}
