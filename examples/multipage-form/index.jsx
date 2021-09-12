import React from 'react';
import ReactDOM from 'react-dom';

import {
  TextField,
  CheckboxField,
  DebuggerView,
  Page,
  Router,
} from '@department-of-veterans-affairs/formulate';

import { Link, Route } from 'react-router-dom';

import 'web-components/dist/component-library/component-library.css';
import { defineCustomElements } from 'web-components/loader';

void defineCustomElements();

const App = () => (
  <Router basename="multipage-form">
    <Page title="Example form" path="/one">
      <TextField name="foo" label="Example" required />
      <DebuggerView />
    </Page>

    <Page title="Second page" path="/two">
      <CheckboxField name="bar" label="Do you have pets?" required />
      <DebuggerView />
    </Page>

    <Route path="/">
      <Link to="one">Page one</Link>
      <br />
      <Link to="two">Page two</Link>
    </Route>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
