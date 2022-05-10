import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';

import { Link, MemoryRouter, Route, Router } from 'react-router-dom';
import Page from '../../src/routing/Page';
import { createMemoryHistory } from 'history';
import { FormRouterInternal } from '../../src/routing/Router';
import { act } from 'react-dom/test-utils';

const PageOne = () => (
  <Page 
    nextPage="/page-two"
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

describe('Routing - Page', () => {

  test('switches page content', async() => {
    const { container } = render(
      <MemoryRouter initialEntries={["/", "/page-two"]} initialIndex={0}>
        <FormRouterInternal basename="/" formData={initialValues} title="Page Test">
          <Route index element={<PageOne />} />
          <Route path="/page-two" element={<PageTwo />} />
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      const goLink = container.querySelector('button');
      goLink?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitFor(() => expect(container.querySelector('h3')?.innerHTML).toContain('page two'));
  });

});
