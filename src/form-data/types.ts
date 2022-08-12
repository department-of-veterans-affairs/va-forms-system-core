import { ReactElement } from 'react';
import { RadioItemProps } from '../form-builder';

export interface FieldObject {
  name: string;
  label: string;
  value?: boolean | string | undefined | number | null;
  options?: {
    label: string;
    value: string;
  }[];
  type?: string;
}

export interface PageObject {
  id: string;
  title: string;
  path: string;
  fields: FieldObject[];
  fieldNames?: string[];
}

export interface IPageContext {
  listOfPages: PageObject[];
  setListOfPages: (pages: PageObject[]) => void;
  currentPath: string;
}

export interface PageContextProps {
  children: ReactElement<any, any> | ReactElement<any, any>[];
}
