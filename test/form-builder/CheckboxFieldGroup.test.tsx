import React from 'react';
import { waitFor } from '@testing-library/react';

import CheckboxFieldGroup from '../../src/form-builder/CheckboxFieldGroup';
import { buildRenderForm, changeValue } from '../utils';

const renderForm = buildRenderForm({ thing: false, breakfast: [] });

const getInput = (container: HTMLElement): HTMLElement => {
  const input = container.querySelector('.fieldset-input') as HTMLElement;
  if (!input) throw new Error('No va-checkbox found');
  return input;
};
import {
  CheckboxProps,
  CheckboxGroupProps,
} from '../../src/form-builder/types';
import { required } from '../../src/utils/validation';

const testData: CheckboxGroupProps = {
  label: 'What breakfast?',
  name: 'breakfast',
  id: '12',
  /**
   * If `required` is true, the default message will be used. If `required` is a
   * string, it will be used as the error message.
   */
  required: true,
  options: [
    {
      value: 'eggs',
      label: 'Eggs',
      name: 'breakfast',
    },
    {
      value: 'protien',
      label: 'Protien Shake',
      name: 'breakfast',
    },
    {
      value: 'toast',
      label: 'Toast',
      name: 'breakfast',
    },
  ],
};

describe('Form Builder - CheckboxFieldGroup', () => {
  test('renders', () => {
    const { container } = renderForm(<CheckboxFieldGroup {...testData} />);
    const input = getInput(container);
    const firstCheckboxLabel = input.querySelector(
      '.form-checkbox-buttons label'
    );
    expect(firstCheckboxLabel?.textContent).toEqual('Eggs');
  });

  test('renders the default "required" validation error message', async () => {
    const { container, getFormProps } = renderForm(
      <CheckboxFieldGroup {...testData} />
    );
    const input = getInput(container);
    await waitFor(() => {
      getFormProps().setFieldTouched('breakfast');
    });
    expect(
      input?.querySelector('.usa-input-error-message')?.textContent
    ).toContain('Please provide a response');
  });

  test('renders initial value', () => {
    const rf = buildRenderForm({ breakfast: ['eggs'] });
    const { container } = rf(<CheckboxFieldGroup {...testData} />);
    const input = getInput(container);
    const firstCheckbox = input.querySelector('input');
    // This expects the string "true" because attributes on HTML elements are
    // always strings
    expect(firstCheckbox?.hasAttribute('checked')).toBeTruthy();
  });
});
