import React from 'react';
import CheckboxField from '../../src/form-builder/CheckboxField';

import { buildRenderForm } from '../utils';

const renderForm = buildRenderForm({ foo: false });

const getInput = (container: HTMLElement) => {
  const input = container.querySelector('va-checkbox') as HTMLInputElement;
  if (!input) throw new Error('No va-checkbox found');
  return input;
};

describe('Form Builder - CheckboxField', () => {
  test('renders', () => {
    const { container } = renderForm(
      <CheckboxField name="thing" label="The Thing" />
    );
    const input = getInput(container);
    expect(input.getAttribute('label')).toEqual('The Thing');
    expect(input.getAttribute('name')).toEqual('thing');
  });
});
