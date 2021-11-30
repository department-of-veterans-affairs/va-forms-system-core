import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Link } from 'react-router-dom';
import Router from '../../src/routing/Router';
import Page from '../../src/routing/Page';

describe('Routing - Router', () => {
  test('can switch pages', async () => {
    const { findByText, queryByText } = render(
      <Router basename="">
        <Page path="/my-page" title="My page">
          <div>I am a child!</div>
          <div>Me too!</div>
        </Page>

        <Page path="/" title="Intro">
          <h1>Intro page</h1>
          <Link to="my-page">Go to my page</Link>
        </Page>
      </Router>
    );
    expect(queryByText(/Intro page/i)).not.toBeNull();
    expect(queryByText('My page')).toBeNull();

    const goToMyPageLink = await findByText('Go to my page');

    userEvent.click(goToMyPageLink);

    expect(queryByText('My page')).not.toBeNull();
    expect(queryByText('Intro page')).toBeNull();
  });
});
