import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { RouteObject } from 'react-router-dom';
import {
  IPageContext,
  PageContextProps,
  PageObject,
  FieldObject,
} from '../routing/types';

import Page from '../routing/Page';
import { update } from 'lodash';

export function createPagesFromChildren(
  children: React.ReactNode,
  url = ''
): PageObject[] {
  let pages: PageObject[] = [];

  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }

    if (
      element.type === React.Fragment ||
      (element.type as React.JSXElementConstructor<any>)?.name === 'Routes' ||
      (element.type as React.JSXElementConstructor<any>)?.name === 'Route'
    ) {
      pages = [
        ...pages,
        ...createPagesFromChildren(element.props.children, ''),
      ];
      return;
    }

    // may not be needed here
    if ((element.type as React.JSXElementConstructor<any>) !== Page) {
      throw new Error(
        `[${
          typeof element.type === 'string' ? element.type : element.type.name
        }] is not a <Page> component.`
      );
    }

    const page: PageObject = {
      title: element.props.title,
      id: '',
      path: '',
      fields: [],
    };

    // if (element.props.children) {
    //   page.children = createPagesFromChildren(element.props.children);
    // }

    pages.push(page);
  });

  return pages;
}

const PageContextInitialValues = {
  listOfPages: [],
  setListOfPages: (pages: PageObject[]) => null,
};

export const PageContext = React.createContext<IPageContext>(
  PageContextInitialValues
);

export function PageContextProvider(props: PageContextProps): JSX.Element {
  const [listOfPages, setListOfPages] = useState<PageObject[]>([]);

  const updatePages = (pages: PageObject[]) => {
    setListOfPages(pages);
  };

  return (
    <PageContext.Provider
      value={{
        listOfPages: listOfPages,
        setListOfPages: updatePages,
      }}
    >
      {props.children}
    </PageContext.Provider>
  );
}
