import React from 'react';
import ReactDOM from 'react-dom';

import { Formik, Form } from 'formik';
import {
  TextField,
  DebuggerView,
  Page,
} from '@department-of-veterans-affairs/formulate';

import 'web-components/dist/component-library/component-library.css';
import { defineCustomElements } from 'web-components/loader';

void defineCustomElements();

const App = () => (
  <Page title="Example form">
    <TextField name="foo" label="Example" required />
    <DebuggerView />
  </Page>
);

ReactDOM.render(<App />, document.getElementById('root'));
