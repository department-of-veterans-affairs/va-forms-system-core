import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Page from '../../src/routing/Page';

describe('Routing - Page', () => {
  test('is navigable', async () => {
    const { findByText, queryByText } = render(
      <BrowserRouter>
        <Switch>
          <Page path="/my-page" title="My page">
            <div>I am a child!</div>
            <div>Me too!</div>
          </Page>

          <Route path="/">
            <h1>Intro page</h1>
            <Link to="my-page">Go to my page</Link>
          </Route>
        </Switch>
      </BrowserRouter>
    );
    expect(queryByText(/Intro page/i)).not.toBeNull();
    expect(queryByText('My page')).toBeNull();

    const goToMyPageLink = await findByText('Go to my page');

    userEvent.click(goToMyPageLink);

    expect(queryByText('My page')).not.toBeNull();
    expect(queryByText('Intro page')).toBeNull();
  });
});
