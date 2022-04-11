import React from 'react';
import ReactDOM from 'react-dom';

import {
  CheckboxField,
  DebuggerView,
  Page,
  Router,
  TextField,
} from '@department-of-veterans-affairs/va-forms-system-core';

import { Link, Switch } from 'react-router-dom';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';
import Chapter from '@department-of-veterans-affairs/va-forms-system-core/routing/Chapter';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
void defineCustomElements();

const App = () => (
  <Router basename="multipage-form">
    <>
      <Switch>
        <Chapter title="Chapter One" path="/chapter-one">
          <Page title="First Page" path="/page-one">
            <TextField name="foo" label="Example" required />
            <DebuggerView />
            <Link to="/chapter-one/page-two">Chapter one - Page two</Link>
          </Page>

          <Page title="Second Page" path="/page-two">
            <CheckboxField name="bar" label="Do you have pets?" required />
            <DebuggerView />
            <Link to="/chapter-two/page-one">Chapter two - Page one</Link>
          </Page>
        </Chapter>
        <Chapter title="Chapter Two" path="/chapter-two">
          <Page title="First page" path="/page-one">
            <div>Page 3</div>
            <Link to="/chapter-two/page-two">Chapter two - Page two</Link>
          </Page>
          <Page title="Second page" path="/page-two">
            <div>Page 4</div>
            <div>done</div>
            <Link to="/chapter-one/page-one">Chapter one - Page one</Link>
          </Page>
        </Chapter>
      </Switch>

      {/* This Route is last because a Switch will render whichever component */}
      {/* is the first to match a path, and a `/` would be a match for any page */}
      {/* https://reactrouter.com/web/guides/quick-start */}
      <div>
        <Link to="/chapter-one/page-one">Chapter one - Page one</Link>
      </div>
    </>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
