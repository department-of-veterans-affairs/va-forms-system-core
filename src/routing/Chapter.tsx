import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ChapterProps } from './types';

/**
 * Renders the chapter contents
 *
 * @beta
 */
export default function Chapter(props: ChapterProps): JSX.Element {
  return (
    <Route path={props.path}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1>{props.title}</h1>
      </div>
      <Switch>
        <>{props.children}</>
      </Switch>
    </Route>
  );
}
