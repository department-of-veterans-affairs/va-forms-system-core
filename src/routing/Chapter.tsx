import React from 'react';
import {
  Link,
  Route,
  Routes,
  useLocation,
  createRoutesFromChildren,
} from 'react-router-dom';
import { ChapterProps } from './types';

/**
 * Renders the chapter contents
 *
 * @beta
 */
export default function Chapter(props: ChapterProps): JSX.Element {
  const listOfPages = Array.isArray(props.children)
    ? props.children
    : [props.children];
  // const getRoutes = () => listOfPages.length > 0 ? listOfPages.map((page) => {
  //   return page.props.path
  // }) : [];
  // const routes = getRoutes();
  const childRoutes = createRoutesFromChildren(props.children);
  // const getLocation = useLocation();

  return (
    <div>
      <h1> Chapter title </h1>
    </div>
  );
}
