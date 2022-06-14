import React from 'react';

import { getNextRoute, getPreviousRoute, routeObjectsReducer, RouterContext, RouterContextProvider } from "../../src/routing/RouterContext";
import { Formik } from "formik";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ConditionalRoute, Page, RouterProps } from "../../src";
import { render, waitFor } from "@testing-library/react";
import RouterProgress from "../../src/routing/RouterProgress";

const PageOne = (props: {title: string}) => (
  <Page 
    {...props}
    nextPage="/page-two">
    <p>page one</p>
  </Page>
);

const PageTwo = (props: {title: string}) => (
  <Page 
  {...props}
  nextPage="/"
  >
  <p>page two</p>
</Page>
);

const initialValues = {
  firstName: '', 
  lastName: '', 
  email: '', 
  street: '', 
  streetTwo: '', 
  streetThree: '', 
  state: '', 
  zipcode: '',
  conditional: true
};

const FormRouterInternal = (props: RouterProps): JSX.Element => {
  const initialValues = props.formData;

  return (
    <Formik
      initialValues={props.formData}
      onSubmit={(values, actions) => {
        // Here we leverage formik actions to perform validations, submit data, etc.
        // Also a good candidate for extracting data out of form apps
        actions.setSubmitting(true);
      }}
      >
      <RouterContextProvider
        routes={props.children}
        >
        <RouterProgress />
        <Routes>{props.children}</Routes>
      </RouterContextProvider>
    </Formik>
  )
};

describe('Routing - Router Context', () => {

  test('NextRoute function returns next viable route', () => {
    const routes = [
      {
        path: '/',
        title: "Introduction Page",
        conditional: false,
        isShown: null
      },
      {
        path: '/about',
        title: "About",
        conditional: true,
        isShown: false
      },
      {
        path: '/about-plants',
        title: "About Plants",
        conditional: true,
        isShown: true
      }
    ]
    const nextRoute = getNextRoute(routes, '/');
    expect(nextRoute.path).toEqual('/about-plants');
  });

  test('PrevRoute function returns previous viable route', () => {
    const routes = [
      {
        path: '/',
        title: "Introduction Page",
        conditional: false,
        isShown: null
      },
      {
        path: '/about-animals',
        title: "About Animals",
        conditional: true,
        isShown: true
      },
      {
        path: '/about',
        title: "About",
        conditional: true,
        isShown: false
      },
      {
        path: '/about-plants',
        title: "About Plants",
        conditional: true,
        isShown: true
      }
    ]
    const nextRoute = getPreviousRoute(routes, '/about-plants');
    expect(nextRoute.path).toEqual('/about-animals');
  });

  test('Router Context passes correct route information to the progress bar', async() => {
    const routes = ["/", "/page-two"];
    const { container } = render(
      <MemoryRouter initialEntries={routes} initialIndex={1}>
        <FormRouterInternal
          basename="/"
          formData={initialValues}
          title="Page Test"
          >
          <Route index element={<PageOne title="Page One" />} />
          <Route path="/page-two" element={<PageTwo title="Page Two" />} />
        </FormRouterInternal>
      </MemoryRouter>
    );

    await waitFor(() => expect(
      container.querySelector('h2.vads-u-font-size--h4')
      ?.innerHTML).toContain('Step 2 of 2: Page Two')
    );
  })

  test('Router Context passes correct conditional route information to the progress bar', async() => {
    const routes = ["/", "/page-two"];
    const { container } = render(
      <MemoryRouter initialEntries={routes} initialIndex={1}>
        <FormRouterInternal
          basename="/"
          formData={initialValues}
          title="Page Test"
          >
          <Route index element={<PageOne title="Page One" />} />
          <Route path="/page-two" element={<PageTwo title="Page Two" />} />
          <Route path="/page-two-conditional" element={
            <ConditionalRoute title="Page Two" type="conditional" condition={'conditional'}>
              <PageTwo title="Page Two" />
            </ConditionalRoute>
          } />
        </FormRouterInternal>
      </MemoryRouter>
    );

    await waitFor(() => expect(
      container.querySelector('h2.vads-u-font-size--h4')
      ?.innerHTML).toContain('Step 2 of 3: Page Two')
    );
  })
});
