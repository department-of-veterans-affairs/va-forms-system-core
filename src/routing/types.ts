/**
 * The properties for the Router React component
 *
 * @beta
 */
import { Page } from './index';

export interface RouterProps {
  children: Routable | Array<Routable>;
  basename: string;
}

/**
 * Indicates if a component can be routed using `react-router-dom`. The `path`
 * prop must be present.
 *
 * @beta
 */
export interface Routable {
  path: string;
}

/**
 * The properties for the Page React component
 *
 * @beta
 */
export interface PageProps {
  children: JSX.Element[];
  title: string;
  path: string;
}

/**
<<<<<<< HEAD
 * The type for the FormData to define the flexible data object
 *
 * @beta
 */
export interface IFormData {
  [prop: string]: unknown;
}

/**
 * The type for the FormContext to manage state between Chapters and Pages
 *
 * @beta
 */
export interface IFormContextType {
  formData: IFormData;
  handleUpdate?: () => void;
}

/**
 * The properties for the Chapter React component
 *
 * @beta
 */
export interface ChapterProps {
  children: typeof Page[];
  title: string;
  path: string;
}
