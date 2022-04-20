import React from 'react';
import { waitFor } from '@testing-library/react';

import {RadioGroup, RadioItemProps} from '../../src/form-builder/RadioGroup';
import { buildRenderForm, changeValue } from '../utils';

const renderForm = buildRenderForm({ radio: false });

const getInput = (container: HTMLElement): HTMLVaRadioGroup => {
  const input = container.querySelector('va-radio') as HTMLVaRadioGroup;
  console.log(input);
  if (!input) throw new Error('No va-radiogroup found');
  return input;
}

  const testComponent = (
    <RadioGroup 
      name="thing"
      label="The Thing"
      options={
        [
          {label: "yes", name: "yes", value: "yes", key: 1}, 
          {label: "No", name: "no", value: "no", key: 2}
        ]
      }
    
    />
  );

describe('Form Builder - RadioGroup', () => {
  test('renders', () => {
    const { container } = renderForm(testComponent);
    const input = getInput(container);
    expect(input.getAttribute('label')).toEqual('Radio Button');
    expect(input.getAttribute('name')).toEqual('radio');
  });

  // test('renders initial value', () => {
  //   const rf = buildRenderForm({ radio: true });
  //   const { container } = rf(<RadioGroup name="radio" label="Radio Button" />);
  //   const input = getInput(container);
  //   // This expects the string "true" because attributes on HTML elements are
  //   // always strings
  //   expect(input.getAttribute('value')).toEqual('true');
  // });

  // test('renders the default "required" validation error message', async () => {
  //   const { container, getFormProps } = renderForm(
  //     <RadioGroup name="radio" label="Radio Button" required />
  //   );
  //   const input = getInput(container);
  //   await waitFor(() => {
  //     getFormProps().setFieldTouched('radio');
  //   });
  //   expect(input?.getAttribute('error')).toEqual('Please provide a response');
  // });

  // test('renders a custom "required" validation error message', async () => {
  //   const { container, getFormProps } = renderForm(
  //     <RadioGroup
  //       name="radio"
  //       label="Radio Button"
  //       required="You can't proceed without checking this box"
  //     />
  //   );
  //   const input = getInput(container);
  //   await waitFor(() => {
  //     getFormProps().setFieldTouched('radio');
  //   });
  //   expect(input?.getAttribute('error')).toEqual(
  //     "You can't proceed without checking this box"
  //   );
  // });

  // test('validates using a function', async () => {
  //   const spy = jest.fn();
  //   const { getFormProps } = renderForm(
  //     <RadioGroup name="radio" label="Radio Button" validate={spy} />
  //   );
  //   await waitFor(() => {
  //     getFormProps().validateField('radio');
  //   });
  //   expect(spy).toBeCalled();
  // });

  // test('updates the formik state', async () => {
  //   const { container, getFormProps } = renderForm(
  //     <RadioGroup name="radio" label="Radio Button" />
  //   );
  //   const input = getInput(container);
  //   await changeValue(input, true);
  //   expect(getFormProps().values).toEqual({ radio: true });
  // });
});
