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

const page1 = (
  <Page title="Example form" path="/one" next="/two">
    <TextField name="foo" label="Example" required />
    <DebuggerView />
  </Page>
);

const page2 = (
  <Page title="Second page" path="/two" previous="/one">
    <TextField name="foo" label="Example" required />
    <CheckboxField name="bar" label="Do you have pets?" required />
    <DebuggerView />
  </Page>
);

const App = () => (
  <Router basename="multipage-form">
    {page1}
    {page2}
    <Route path="/">
      <div>Whatever:</div>
      <Link to="one">Page one</Link>
    </Route>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));