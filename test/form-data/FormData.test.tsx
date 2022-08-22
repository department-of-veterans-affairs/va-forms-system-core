import {SSNField, TextField, RadioGroup, PhoneField, NumberField, DateField, CheckboxField, SelectField, CheckboxFieldGroup} from '../../src/form-builder/';
import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { buildRenderForm } from '../utils';
import { gatherFieldData, PageContextProvider, ReviewPage } from '../../src/form-data/';
import { Page, FormRouterProps } from '../../src';
import { MemoryRouter, Route, Routes } from 'react-router-dom-v5-compat';
import { Formik } from 'formik';
import { RouterContextProvider } from '../../src/routing/RouterContext';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const checkboxProps = {
  label: 'What are your favorite movies?',
  name: 'spookyMovies',
  required: false,
  options: [
    {
      name: 'halloween',
      label: 'Halloween',
    },
    {
      name: 'scream',
      label: 'Scream',
    },
    {
      name: 'theShining',
      label: 'The Shining',
    },
  ],
};

const PageTwo = () => (
  <Page title="The Thing The Page" fieldNames={['thing']} hidePreviousButton={false}>
    <TextField name="thing" label="The Thing" />
  </Page>
);

const PageTwoB = () => (
  <Page title="Movies List" fieldNames={['movies']} hidePreviousButton={false}>
    <SelectField
      id="movies"
      name="movies"
      value="the-thing"
      label="Favorite Movie"
      required
      >
      {
        [ { value: "the-thing",
            label: "The Thing" },
          { value: "Elvira Mistress of the Dark",
            label: "elvira-mistress-of-the-dark" }
        ].map((movie) => {
        return (
          <option value={`${movie.value}`} key={`${movie.value}`}>
            {movie.label}
          </option>
        );
      })}
    </SelectField>
  </Page>
);

const PageTwoC = () => (
  <Page title="Movies List" fieldNames={['halloween', 'scream', 'theShining']} hidePreviousButton={false}>
    <CheckboxFieldGroup {...checkboxProps} />
  </Page>
)

const FormRouterInternal = (props: FormRouterProps): JSX.Element => {
  const initialValues = props.formData;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
    >
      <RouterContextProvider routes={props.children}>
        <PageContextProvider>
          <Routes>
            {props.children}
          </Routes>
        </PageContextProvider>
      </RouterContextProvider>
    </Formik>
  );
};

describe('Form Data - Get Field Data', () => {
  test('Text field gathers correct data', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'thing': true}}
          title="Page Test"
        >
          <Route path="/page-two" element={<PageTwo/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('label')?.innerHTML
      ).toContain('The Thing')
    })
  });

  test('Uninitialized text field data is not rendered on the review page', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'thing': undefined}}
          title="Page Test"
        >
          <Route path="/page-two" element={<PageTwo/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('label')?.innerHTML
      ).toBeUndefined()
    })
  });

  test('Select field gathers correct data', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'movies': 'the-thing'}}
          title="Page Test"
        >
          <Route path="/page-two" element={<PageTwoB/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page__page-info--value-text')?.innerHTML
      ).toContain('The Thing')
    })
  });

  test('Uninitialized select field data is not rendered on the review page', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'movies': ''}}
          title="Page Test"
        >
          <Route path="/page-two" element={<PageTwoB/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page__page-info--value-text')?.innerHTML
      ).toBeUndefined()
    })
  });

  test('Checkbox field gathers correct data', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'halloween': true, 'scream': true, 'theShining': true}}
          title="Page Test"
        >
          <Route path="/page-two" element={<PageTwoC/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page__page-info--value-text')?.innerHTML
      ).toContain('Yes')
    })
  });


});

