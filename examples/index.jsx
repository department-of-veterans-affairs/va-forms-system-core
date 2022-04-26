import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route } from 'react-router-dom';
import { Router } from '@department-of-veterans-affairs/va-forms-system-core';
import SimpleApp from './simple-form';
import ReactRouterV6 from './router-v6';
import MultiPageApp from './multipage-form';
import FormStateApp from './form-state';
import RadioGroupApp from './radio-group';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';
void defineCustomElements();

const App = () => (
  <div className='vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column'>
    <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
      <Link to="/simple-form">Simple Form</Link> <br />
      <Link to="/multipage-form">Multipage Form</Link> <br />
      <Link to="/radio-group">Radio Group</Link> <br />
      <Link to="/form-state">Form State</Link> <br />
      <Link to="/router-v6">React Router V6</Link> <br />
    </nav>
  </div>
);


const NoMatch = (props) => (
  <main style={{ padding: '1rem' }}>
    <p>There is nothing here! {props.name}</p>
  </main>
);

const Main = () => {
  return (
    <Router>
      <Route index element={<App />} />
      <Route path="simple-form" element={<SimpleApp />} />
      <Route path="multipage-form/*" element={<MultiPageApp />} />
      <Route path="radio-group" element={<RadioGroupApp />} />
      <Route path="form-state/*" element={<FormStateApp />} />
      <Route path="router-v6/*" element={<ReactRouterV6 />} />
      <Route path="*" element={<NoMatch name="No Routes for App" />} />
    </Router>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
