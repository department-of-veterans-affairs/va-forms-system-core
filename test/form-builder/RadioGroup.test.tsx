import React from 'react';
import { waitFor, fireEvent, screen } from '@testing-library/react';

import {RadioGroup} from '../../src/form-builder/RadioGroup';
import { buildRenderForm, changeValue } from '../utils';

const renderForm = buildRenderForm({ radio: false });

const getInput = (container: HTMLElement) => {
  const input = container.querySelector('va-radio');
  if (!input) throw new Error('No va-radiogroup found');
  return input;
}

  const testComponent = (
    <RadioGroup 
      name="radio"
      label="Radio Button"
      options={
        [
          {label: "Yes", name: "yes", value: "yes", key: 1}, 
          {label: "No", name: "no", value: "no", key: 2}
        ]
      }
      required
    />
  )

  const testComponentErrorMessage = (
    <RadioGroup 
      name="radio"
      label="Radio Button"
      options={
        [
          {label: "Yes", name: "yes", value: "yes", key: 1}, 
          {label: "No", name: "no", value: "no", key: 2}
        ]
      }
      required="You can't proceed without checking this box"
    />
  )

describe('Form Builder - RadioGroup', () => {
  test('renders', () => {
    const { container } = renderForm(testComponent);
    const input = getInput(container);
    expect(input.getAttribute('label')).toEqual('Radio Button');
    expect(input.getAttribute('name')).toEqual('radio');
  });

  // test('selects yes', () => {
  //   const { container } = renderForm(testComponent);
  //   const input = getInput(container);
  //   fireEvent.click(screen.getByText('Yes'))
  //   expect(input.getAttribute('label')).toEqual('Radio Button');
  // });

  test('renders the default "required" validation error message', async () => {
    const { container, getFormProps } = renderForm(testComponent);
    const input = getInput(container);
    await waitFor(() => {
      getFormProps().setFieldTouched('radio');
    });
    expect(input?.getAttribute('error')).toEqual('Please provide a response');
  });

  test('renders a custom "required" validation error message', async () => {
    const { container, getFormProps } = renderForm(testComponentErrorMessage);
    const input = getInput(container);
    await waitFor(() => {
      getFormProps().setFieldTouched('radio');
    });
    expect(input?.getAttribute('error')).toEqual(
      "You can't proceed without checking this box"
    );
  });


  test('updates the formik state', async () => {
    const { container, getFormProps } = renderForm(testComponent);
    const input = getInput(container);
    await changeValue(input, true);
    fireEvent.click(screen.getByText('Yes'))

    expect(getFormProps().values).toEqual({ radio: checked });
  });
});
