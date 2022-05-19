import React from 'react';
import { IRouterContext } from './types';

const RouterContextDefaultState = {
  listOfRoutes: [],
};

export const RouterContext = React.createContext<IRouterContext>(
  RouterContextDefaultState
);
