import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom-v5-compat';
import { FormRouterProps } from '../../src/routing/types';
import Page from '../../src/routing/Page';
import { act } from 'react-dom/test-utils';
import { Formik } from 'formik';
import { RouterContextProvider } from '../../src/routing/RouterContext';

const FormRouterInternal = (props: FormRouterProps): JSX.Element => {
  return (
    <Formik
      initialValues={props.formData}
      onSubmit={(values, actions) => {
        // Here we leverage formik actions to perform validations, submit data, etc.
        // Also a good candidate for extracting data out of form apps
        actions.setSubmitting(true);
      }}
    >
      <RouterContextProvider routes={props.children}>
        <Routes>{props.children}</Routes>
      </RouterContextProvider>
    </Formik>
  );
};

const PageOne = () => (
  <Page title="page one" hidePreviousButton={true}>
    <p>page one</p>
  </Page>
);

const PageTwo = () => (
  <Page title="page two" hidePreviousButton={false}>
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
};

describe('Routing - Page', () => {
  test('switches page content', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/', '/page-two']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={initialValues}
          title="Page Test"
        >
          <Route index element={<PageOne />} />
          <Route path="/page-two" element={<PageTwo />} />
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      const goLink = container.querySelector('va-button[continue][submit]');
      goLink?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await waitFor(() =>
      expect(container.querySelector('h3')?.innerHTML).toContain('page two')
    );
  });

  test('switches page content to go back a page', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/', '/page-two']} initialIndex={1}>
        <FormRouterInternal
          basename="/"
          formData={initialValues}
          title="Page Test"
        >
          <Route index element={<PageOne />} />
          <Route path="/page-two" element={<PageTwo />} />
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      const goLink = container.querySelector('va-button[back]');
      goLink?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await waitFor(() =>
      expect(container.querySelector('h3')?.innerHTML).toContain('page one')
    );
  });
});
