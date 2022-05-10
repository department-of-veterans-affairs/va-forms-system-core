import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


import { Link, MemoryRouter, Route, } from 'react-router-dom';
import FormRouter, { FormRouterInternal } from '../../src/routing/Router';
import Page from '../../src/routing/Page';
import { act } from 'react-dom/test-utils';

const PageOne = () => (
  <Page 
    nextPage="/chapter-one/page-two"
    title="page one">
    <p>page one</p>
  </Page>
);

const PageTwo = () => (
  <Page 
    nextPage="/"
    title="page two"
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
  zipcode: ''
};
describe('Routing - Router', () => {
  test('can display page content', () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/", "/page-two"]} initialIndex={0}>
        <FormRouterInternal basename="/" formData={initialValues} title="Page Test">
          <Route index element={<PageOne />} />
          <Route path="/page-two" element={<PageTwo />} />
        </FormRouterInternal>
      </MemoryRouter>
    );

    const containerTitleP1 = container.querySelector('h3');
    expect(containerTitleP1?.innerHTML).toContain('page one');
  });

  test('switches page content', () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/", "/page-two"]} initialIndex={1}>
        <FormRouterInternal basename="/" formData={initialValues} title="Page Test">
          <Route index element={<PageOne />} />
          <Route path="/page-two" element={<PageTwo />} />
        </FormRouterInternal>
      </MemoryRouter>
    );

    const containerTitleP1 = container.querySelector('h3');
    expect(containerTitleP1?.innerHTML).toContain('page two');
  });
});
