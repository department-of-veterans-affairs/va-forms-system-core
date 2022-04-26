import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Outlet } from 'react-router-dom';
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
      <Link to="/simple-form"><button type="button">Simple Form</button></Link>
      <Link to="/multipage-form"><button type="button">Multipage Form</button></Link>
      <Link to="/radio-group"><button type="button">Radio Group</button></Link>
      <Link to="/form-state"><button type="button">Form State</button></Link>
      <Link to="/router-v6"><button type="button">React Router V6</button></Link>
    </nav>

    <Outlet />
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
      <Route path="/" element={ <App /> }>
        <Route path="simple-form" element={<SimpleApp />} />
        <Route path="multipage-form/*" element={<MultiPageApp />} />
        <Route path="radio-group" element={<RadioGroupApp />} />
        <Route path="form-state/*" element={<FormStateApp />} />
        <Route path="router-v6/*" element={<ReactRouterV6 />} />
        <Route path="*" element={<NoMatch name="No Routes for App" />} />
      </Route>
    </Router>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
