import React, { ReactElement, useContext, useEffect, useState } from 'react';
import {
  IPageContext,
  PageContextProps,
  PageObject,
  FieldObject,
} from './types';

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
