import { ReactElement } from 'react';
import { FormikHelpers, FormikValues } from 'formik';

/**
 * The properties for the Router React component
 *
 * @public
 */
export interface FormRouterProps {
  children: ReactElement<any, any> | ReactElement<any, any>[];
  title: string;
  subtitle?: string;
  transformForSubmit?: (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => any;
  formData: IFormData;
  uiFormData?: IFormData;
  basename: string;
}

export interface RouterContextProps {
  routes: React.ReactElement | React.ReactElement[];
  children: ReactElement<any, any> | ReactElement<any, any>[];
}

/**
 * Indicates if a component can be routed using `react-router-dom`. The `path`
 * prop must be present.
 *
 * @public
 */
export interface Routable {
  path: string;
}

/**
 * Used for passing a list of routes into Router Context
 *
 * @public
 */
export interface RouteInfo {
  path: string;
  title: string;
  conditional?: boolean;
  isShown?: boolean | null;
}

/**
 * Properties for Router Context
 *
 * @internal
 */
export interface IRouterContext {
  listOfRoutes: RouteInfo[];
  currentRoute: string;
  previousRoute: string | null;
  nextRoute: string | null;
}
/**
 * The properties for the Page React component
 *
 * @public
 */
export interface PageProps {
  children: JSX.Element | JSX.Element[] | Element;
  title: string;
  fieldNames?: string[];
  hidePreviousButton?: boolean;
  nextButtonCustomText?: string;
  nextButtonDescribedBy?: string;
}

/**
 * The type for the FormData to define the flexible data object
 *
 * @public
 */
export interface IFormData {
  [prop: string]: unknown;
}

/**
 * The properties for the Chapter React component
 *
 * @alpha
 */
export interface ChapterProps {
  children: Array<any> | any;
  title?: string;
}
