import { useField, useFormikContext } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  createRoutesFromChildren,
  RouteObject,
  useLocation,
} from 'react-router-dom';
import { IRouterContext, RouteInfo, RouterContextProps } from './types';

const RouterContextDefaultState = {
  listOfRoutes: [
    {
      path: '',
      title: '',
      conditional: false,
      isShown: true,
    },
  ],
  currentRoute: '',
  updateRoute: (value: string) => null,
  // updateListOfRoutes: (value: RouteInfo[]) => {},
};

export const RouterContext = React.createContext<IRouterContext>(
  RouterContextDefaultState
);

export const routeObjectsReducer = (routeObjectsArray: RouteObject[]) => {
  return routeObjectsArray.reduce<RouteInfo[]>(
    (accumulator, current): RouteInfo[] => {
      let accumulatorItem: RouteInfo[] = [...accumulator];
      const conditionalPath =
        ((current?.element as ReactElement)?.props as { type: string })
          ?.type === 'conditional';
      const condition = (
        (current?.element as ReactElement)?.props as { condition: string }
      )?.condition ;
      const field = condition ? useField(condition) : null;

      if (current.path === '*') return accumulatorItem;

      accumulatorItem = [
        ...accumulatorItem,
        {
          path: current?.path ? current.path : '/',
          title: (
            (current?.element as ReactElement)?.props as { title: string }
          )?.title,
          conditional: conditionalPath,
          isShown: conditionalPath && field && field[0].value === true,
        },
      ];
      if (current.children) {
        accumulatorItem = [
          ...accumulatorItem,
          ...current.children.map((child) => {
            return {
              path: child?.path
                ? (current?.path as string) + '/' + child.path
                : '/',
              title: (
                (child?.element as ReactElement)?.props as { title: string }
              )?.title,
              // logic needs to be added to child path but isn't relevant now
              conditional: false,
              isShown: false,
            };
          }),
        ];
      }
      return accumulatorItem;
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
