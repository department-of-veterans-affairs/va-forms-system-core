import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route } from 'react-router-dom';
import SimpleApp from './simple-form';
import ReactRouterV6 from './router-v6';
import ContextApp from './form-state';
import { Router } from '@department-of-veterans-affairs/va-forms-system-core';
import {
  MultiPageApp,
  Chapter,
  Pages,
  Page1,
  Page2,
  Page3,
  Page4,
} from './multipage-form';

const App = () => (
  <div
    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
  >
    <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
      <Link to="/simple-form">Simple Form</Link> <br />
      <Link to="/multipage-form">Multipage Form</Link> <br />
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
      <Route path="multipage-form" element={<MultiPageApp />}>
        <Route path="chapter-one" element={<Chapter />}>
          <Route index element={<Page1 />} />
          <Route path="page-one" element={<Page1 />} />
          <Route path="page-two" element={<Page2 />} />
          <Route
            path="*"
            element={<NoMatch name="No Routes for Chapter 1" />}
          />
        </Route>
        <Route path="chapter-two" element={<Chapter />}>
          <Route index element={<Page3 />} />
          <Route path="page-three" element={<Page3 />} />
          <Route path="page-four" element={<Page4 />} />
          <Route
            path="*"
            element={<NoMatch name="No Routes for Chapter 2" />}
          />
        </Route>
        <Route path="chapter-three/*" element={<Pages />} />
        <Route
          path="*"
          element={<NoMatch name="No Routes for Multipage-Form" />}
        />
      </Route>
      <Route path="form-state/*" element={<ContextApp />} />
      <Route path="router-v6/*" element={<ReactRouterV6 />} />
      <Route path="*" element={<NoMatch name="No Routes for App" />} />
    </Router>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
