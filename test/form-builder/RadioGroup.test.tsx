import React from 'react';
import { fireEvent, getByTestId, waitFor, screen, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { RadioGroup } from '../../src/form-builder/RadioGroup';
import { buildRenderForm } from '../utils';

const renderForm = buildRenderForm({ "radio-test": false });

const getInput = (container: HTMLElement) => {
  const input = container.querySelector('va-radio');
  if (!input) throw new Error('No va-radiogroup found');
  return input;
}

  const testComponent = (
    <RadioGroup 
      name="radio-test"
      class="radio-test-class"
      label="Radio Group"
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
      name="radio-test"
      label="Radio Group"
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
    expect(input.getAttribute('label')).toEqual('Radio Group');
    expect(input.getAttribute('name')).toEqual('radio-test');
  });

  test('renders the default "required" validation error message', async () => {
    const { container, getFormProps } = renderForm(testComponent);
    const input = getInput(container);
    await waitFor(() => {
      getFormProps().setFieldTouched('radio-test');
    });
    expect(input?.getAttribute('error')).toEqual('Please provide a response');
  });

  test('renders a custom "required" validation error message', async () => {
    const { container, getFormProps } = renderForm(testComponentErrorMessage);
    const input = getInput(container);
    await waitFor(() => {
      getFormProps().setFieldTouched('radio-test');
    });
    expect(input?.getAttribute('error')).toEqual(
      "You can't proceed without checking this box"
    );
  });

  test('renders initial value', () => {
    const { container } = renderForm(testComponent);
    const vaRadioGroup = container.querySelector('va-radio') as HTMLElement;
    expect(vaRadioGroup?.getAttribute('value')).toBe("false");
  });

  test('selects options', async () => {
    const { container } = renderForm(testComponent);
    const input = getInput(container);
    // await waitFor(() => {
    //   getFormProps().setFieldTouched('radioTest-0');
    // });
    // expect(input.getAttribute('value')).toEqual('yes');


    // await waitFor(() => {
    //   fireEvent(
    //NOTE this one found the item but didn't click it bc if you change the test ID it can't find it
    //     getByTestId(container, 'radio-test-0'),
    //     new MouseEvent('click', {
    //       bubbles: true,
    //       cancelable: true,
    //     }),
    //   )
    // });
    // console.log(input)
    // expect(input.getAttribute('value')).toEqual('yes');

    // userEvent.selectOptions(
    //   // NOTE roles are hidden
    //   screen.getByRole('radiogroup'),
    //   screen.getByRole('option', { name: 'yes' }),
    // )

  //   userEvent.selectOptions(
  //     screen.getByTestId('radio-test-0'),
  //   //NOTE this is a promise and doesn't work with user events
  //     screen.findByLabelText('Radio Group', {value: "yes"})
  // });

  await waitFor(() => {
    getByTestId(container, 'radio-test-0').focus();
    fireEvent.click(container, 'radio-test-0');
  });
  console.log(input);
  expect(input.getAttribute('value')).toEqual('yes');
  })
});
