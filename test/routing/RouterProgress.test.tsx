import { RouterContextProvider } from '../../src/routing/RouterContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom-v5-compat';
import React, { useState } from 'react';
import { Page, FormRouterProps } from '../../src';
import RouterProgress from '../../src/routing/RouterProgress';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { Formik } from 'formik';
import userEvent from '@testing-library/user-event';

const FormRouterInternal = (props: FormRouterProps): JSX.Element => {
  const [route, updateRoute] = useState('/');

  return (
    <RouterContextProvider
      routes={props.children}
    >
      <RouterProgress />
      <Formik
        initialValues={props.formData}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
        }}
      >
        <Routes>{props.children}</Routes>
      </Formik>
    </RouterContextProvider>
  );
};

const IndexPage = (props: { title: string }) => (
  <Page {...props}>
    <p>Index</p>
  </Page>
);

const AboutPage = (props: { title: string }) => (
  <Page {...props}>
    <p>About</p>
  </Page>
);

const ConfirmationPage = (props: { title: string }) => (
  <Page {...props}>
    <p>Confirmation</p>
  </Page>
);

describe('Routing - Router Progress', () => {
  test('Progress Bars do not show on intro and confirmation pages', async () => {
    const routes = ['/', '/about', '/confirmation'];
    const { container } = render(
      <MemoryRouter initialEntries={routes} initialIndex={0}>
        <FormRouterInternal basename="/" formData={{}} title="Page Test">
          <Route index element={<IndexPage title="Index" />} />
          <Route path="/about" element={<AboutPage title="About" />} />
          <Route
            path="/confirmation"
            element={<ConfirmationPage title="Confirmation" />}
          />
        </FormRouterInternal>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(container.querySelector('h2.vads-u-font-size--h4')).toBeNull();
    });
    userEvent.click(container.querySelector('va-button[continue][submit]')!);

    await waitFor(() =>
      expect(
        container.querySelector('h2.vads-u-font-size--h4')?.innerHTML
      ).toContain('Step 1 of 1: About')
    );
    fireEvent(
      container.querySelector('va-button-pair')!,
      new CustomEvent('primaryClick')
    );

    await waitFor(() => {
      expect(container.querySelector('h2.vads-u-font-size--h4')).toBeNull();
    });
  });
});
