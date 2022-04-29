import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Link } from 'react-router-dom';
import Router from '../../src/routing/Router';
import Page from '../../src/routing/Page';
import { RouterProps } from '../../src/routing/types';

import FormTitle from '../../src/routing/FormTitle';
import { createMemoryHistory } from 'history';

describe('FormTitle', () => {
  const getTitleField = (title: string, subTitle?: string) => (
    <FormTitle title={title} subTitle={subTitle}></FormTitle>
  );


  beforeEach(() => {

  })

  test('Renders title from independent instance', () => {
    const { container } = render(getTitleField("hello world"));

    const titleText = container.querySelector('h1')?.innerHTML;

    expect(titleText).toContain("hello world");
  })

  test('Form title inherits properties from router', () => {

    const { container } = render(
    <Router basename="hello" formMeta={{title: "hello world", subtitle: "subtitle"}}>
    </Router>);

    const titleText = container.querySelector('h1')?.innerHTML;
    expect(titleText).toContain("hello world");
  })
});