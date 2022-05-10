import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Link, MemoryRouter, Route, Router } from 'react-router-dom';
import Page from '../../src/routing/Page';
import Chapter from '../../src/routing/Chapter';
import { createMemoryHistory } from 'history';
import { FormRouterInternal } from '../../src/routing/Router';
import { act } from 'react-dom/test-utils';

const ChapterOne = () => (
  <>
    <Chapter title="Chapter One">
      <p>
        Custom UI content that can go inside chapter 1: 
        <Link to="/chapter-one/page-one">PageOne</Link>
      </p>
    </Chapter>
  </>
);

const ChapterOnePageOne = () => (
  <Page title="Page One" nextPage="/chapter-one/page-two">
    <p>chapter one, page one</p>
  </Page>
);

const ChapterOnePageTwo = () => (
  <Page title="Page Two" nextPage="/">
    <p>chapter one, page two</p>
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

describe('Routing - Chapter', () => {

  test('it can navigate Chapters and Pages', async() => {

    const { container } = render(
      <MemoryRouter initialEntries={["/chapter-one", "/chapter-one/page-one", "/chapter-one/page-two"]} initialIndex={0}>
        <FormRouterInternal basename="/" formData={initialValues} title="Chapter Test">
          <Route path="/chapter-one" element={<ChapterOne />} >
            <Route path="page-one" element={<ChapterOnePageOne />} />
            <Route path="page-two" element={<ChapterOnePageTwo />} />
          </Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      const goLink = container.querySelector('[href="/chapter-one/page-one"]');
      goLink?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitFor(() => expect(container.querySelector('h3')?.innerHTML).toContain('Page One'));
  });

  test('it can navigate Pages within Chapters', async() => {
    let { container } = render(
      <MemoryRouter initialEntries={["/chapter-one", "/chapter-one/page-one", "/chapter-one/page-two"]} initialIndex={1}>
        <FormRouterInternal basename="/" formData={initialValues} title="Chapter Test">
          <Route path="/chapter-one" element={<ChapterOne />} >
            <Route path="page-one" element={<ChapterOnePageOne />} />
            <Route path="page-two" element={<ChapterOnePageTwo />} />
          </Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      const goLink = container.querySelector('button.btn');
      goLink?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitFor(() => expect(container.querySelector('h3')?.innerHTML).toContain('Page Two'));
  });
});
