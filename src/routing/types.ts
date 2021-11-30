import { ReactNode } from 'react';

/**
 * The properties for the Router React component
 *
 * @beta
 */
export type RouterProps = {
  children: ReactNode;
  basename: string;
};

/**
 * Indicates if a component can be routed using `react-router-dom`. The `path`
 * prop must be present.
 *
 * @beta
 */
export type Routable = {
  path: string;
};

/**
 * The properties for the Page React component
 *
 * @beta
 */
export type PageProps = Routable & {
  children: JSX.Element[];
  title: string;
};
