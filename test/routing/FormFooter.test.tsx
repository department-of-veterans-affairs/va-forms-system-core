import React from 'react';
import { render } from '@testing-library/react';

import Router from '../../src/routing/Router';
import FormFooter from '../../src/routing/FormFooter';

describe('FormTitle', () => {

  test('Renders footer', () => {
    const { container } = render(
      <FormFooter />
    );
    const footerContainer = container.querySelector('.help-footer-box');

    expect(footerContainer).toBeTruthy();
  });

  test('Renders footer from router', () => {
    const { container } = render(
      <Router basename="hello" title="hello world">
      </Router>
    );

    const footerContainer = container.querySelector('.help-footer-box');

    expect(footerContainer).toBeTruthy();
  });
});