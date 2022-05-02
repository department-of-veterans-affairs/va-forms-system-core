import React from 'react';
import { render } from '@testing-library/react';

import Router from '../../src/routing/Router';
import FormTitle from '../../src/routing/FormTitle';

describe('FormTitle', () => {

  test('Renders title from independent instance', () => {
    const { container } = render(
      <FormTitle title="Hello World" subTitle="Hello World Subtitle"></FormTitle>
    );

    const titleText = container.querySelector('h1')?.innerHTML;

    expect(titleText).toContain("Hello World");
  });

  test('Renders subtitle from independent instance', () => {
    const { container } = render(
      <FormTitle title="Hello World" subTitle="Hello World Subtitle"></FormTitle>
    );

    const subtitleText = container.querySelector('.va-form-subtitle')?.innerHTML;

    expect(subtitleText).toContain("Hello World Subtitle");
  });

  test('Form title inherits properties from router', () => {
    const { container } = render(
      <Router basename="hello" {...{title: "hello world"}}>
      </Router>
    );

    const titleText = container.querySelector('h1')?.innerHTML;
    expect(titleText).toContain("hello world");
  });

  test('Form title inherits properties from router', () => {
    const { container } = render(
    <Router basename="hello" {...{title: "hello world", subtitle: "subtitle"}}>
    </Router>);

    const titleText = container.querySelector('.va-form-subtitle')?.innerHTML;
    expect(titleText).toContain("subtitle");
  });
});