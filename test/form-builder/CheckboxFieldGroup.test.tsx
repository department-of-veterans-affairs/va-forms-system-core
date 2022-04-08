import React from 'react';
import { waitFor } from '@testing-library/react';

import CheckboxFieldGroup from '../../src/form-builder/CheckboxFieldGroup';
import { buildRenderForm, changeValue } from '../utils';

const renderForm = buildRenderForm({ thing: false });

const getInput = (container: HTMLElement): HTMLVaCheckboxElement => {
  const input = container.querySelector('va-checkbox') as HTMLVaCheckboxElement;
  if (!input) throw new Error('No va-checkbox found');
  return input;
};
import {
  CheckboxProps,
  CheckboxGroupProps,
} from '../../src/form-builder/types';
import { required } from '../../src/utils/validation';

const testData: CheckboxGroupProps = {
  fieldProps: {
    name: 'breakfast',
    label: 'What kind of breakfast do you like?',
    id: '12',
    /**
     * If `required` is true, the default message will be used. If `required` is a
     * string, it will be used as the error message.
     */
    required: true,
  },
  checkboxes: [
    {
      name: 'eggs',
      label: 'Eggs',
      id: '12a',
      checked: false,
    },
    {
      name: 'protien',
      label: 'Protien Shake',
      id: '12b',
      checked: false,
    },
    {
      name: 'toast',
      label: 'Toast',
      id: '12c',
      checked: false,
    },
  ],
};

describe('Form Builder - CheckboxFieldGroup', () => {
  test('renders', () => {
    const { container } = renderForm(<CheckboxFieldGroup {...testData} />);
    const input = getInput(container);
    expect(input.getAttribute('label')).toEqual('Eggs');
    expect(input.getAttribute('name')).toEqual('eggs');
  });

  test('renders the default "required" validation error message', async () => {
    const { container, getFormProps } = renderForm(
      <CheckboxFieldGroup {...testData} />
    );
    const input = getInput(container);
    await waitFor(() => {
      getFormProps().setFieldTouched('thing');
    });
    expect(input?.getAttribute('error')).toEqual('Please provide a response');
  });
});
