import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom-v5-compat';
import { FormRouterProps } from '../../src/routing/types';
import Page from '../../src/routing/Page';
import { Formik, useFormikContext } from 'formik';
import { RouterContextProvider } from '../../src/routing/RouterContext';
import { before } from 'lodash';
import { TextField } from '../../src';

const FormRouterInternal = (props: FormRouterProps): JSX.Element => {
  const initialValues = props.formData;
  const uiValues = props?.uiFormData || {} ;
  const formData = {...initialValues, ...uiValues} 

  return (
    <Formik
      initialValues={formData}
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
  <Page title="page one">
    <p>page one</p>
    <TextField name="eggs" label="eggs" id="eggs"/>
  </Page>
);

const PageTwo = () => (
  <Page title="page two">
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
  eggs: true
};
describe('Routing - Router', () => {

  test('can display page content', async () => {
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
    await waitFor(() => {
      const containerTitleP1 = container.querySelector('h3');
      expect(containerTitleP1?.innerHTML).toContain('page one');
    })
  });

  test('switches page content', async () => {
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

    await waitFor(() => {
      const containerTitleP1 = container.querySelector('h3');
      expect(containerTitleP1?.innerHTML).toContain('page two');
    });
  });

  test('uiFormDataAreGettingCombined', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/', '/page-two']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={initialValues}
          uiFormData={{eggs: false}}
          title="Page Test"
        >
          <Route index element={<PageOne />} />
        </FormRouterInternal>
      </MemoryRouter>
    );

    await waitFor(() => {
      const containerTextInput = container.querySelector('#eggs');
      expect(containerTextInput?.value).toEqual(false);
    });
  });
});
