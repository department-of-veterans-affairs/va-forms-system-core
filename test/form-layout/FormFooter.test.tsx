import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CompatRouter, Route } from 'react-router-dom-v5-compat';
import FormRouter from '../../src/routing/FormRouter';
import FormFooter from '../../src/form-layout/FormFooter';

describe('FormFooter', () => {
  test('Renders footer', () => {
    const { container } = render(<FormFooter />);
    const footerContainer = container.querySelector('.help-footer-box');

    expect(footerContainer).toBeTruthy();
  });

  test('Renders footer from router', () => {
    const { container } = render(
      <BrowserRouter basename="/">
        <CompatRouter>
          <FormRouter title="hello world" formData={{ firstName: '' }}>
            <Route path="/" element={<div>Hello World</div>} />
          </FormRouter>
        </CompatRouter>
      </BrowserRouter>
    );

    const footerContainer = container.querySelector('.help-footer-box');

    expect(footerContainer).toBeTruthy();
  });
});
