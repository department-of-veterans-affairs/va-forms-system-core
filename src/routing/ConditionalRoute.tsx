import React from 'react';
import { useField } from 'formik';
import { ReactElement, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RouterContext } from './RouterContext';
import { RouteInfo } from './types';

export function ConditionalRoute(props: {
  condition: string;
  type: string;
  children: ReactElement<any, any>;
}) {
  const { listOfRoutes } = useContext(RouterContext),
    condition = props?.condition || '',
    field = useField(condition),
    currentLocation = useLocation(),
    findIndex = listOfRoutes.indexOf(
      listOfRoutes.filter((item) => item.path === currentLocation.pathname)[0]
    );

  let matchNext: RouteInfo = listOfRoutes[0];
  let i = findIndex >= 0 ? findIndex : 0;

  while (i >= findIndex && i < listOfRoutes.length) {
    if (!listOfRoutes[i].conditional || listOfRoutes[i].isShown) {
      matchNext = listOfRoutes[i];
      break;
    }
    i++;
  }
  const getViableIndex = listOfRoutes.indexOf(matchNext);

  return field && field[0].value === true ? (
    // use next in list of routes
    props.children
  ) : (
    <Navigate to={listOfRoutes[getViableIndex].path} />
  );
}
