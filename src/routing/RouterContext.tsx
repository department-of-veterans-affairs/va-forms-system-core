import React, {
  ReactChild,
  ReactElement,
  ReactFragment,
  useEffect,
} from 'react';
import { createRoutesFromChildren, RouteObject } from 'react-router-dom';
import {
  IRouterContext,
  RouteInfo,
  RouterContextProps,
  RouterProps,
} from './types';

const RouterContextDefaultState = {
  listOfRoutes: [],
  currentRoute: '',
  updateRoute: (value: string) => null,
};

export const RouterContext = React.createContext<IRouterContext>(
  RouterContextDefaultState
);

export const routeObjectsReducer = (routeObjectsArray: RouteObject[]) => {
  return routeObjectsArray.reduce<RouteInfo[]>(
    (accumulator, current): RouteInfo[] => {
      if (current.children) {
        return [
          ...accumulator,
          {
            path: current?.path as string | '/',
            title: (
              (current?.element as ReactElement)?.props as { title: string }
            )?.title,
          },
          ...current.children.map((child) => {
            return {
              path: child?.path
                ? (current?.path as string) + '/' + child.path
                : '/',
              title: (
                (child?.element as ReactElement)?.props as { title: string }
              )?.title,
            };
          }),
        ];
      }
      return [
        ...accumulator,
        {
          path: current?.path ? current.path : '/',
          title: '',
        },
      ];
    },
    []
  );
};

export function RouterContextProvider(props: RouterContextProps): JSX.Element {
  const routeObjects = createRoutesFromChildren(props.routes),
    listOfRoutes = routeObjectsReducer(routeObjects);

  return (
    <RouterContext.Provider value={{ ...props, listOfRoutes: listOfRoutes }}>
      {props.children}
    </RouterContext.Provider>
  );
}
