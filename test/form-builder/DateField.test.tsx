/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */

import React from 'react';
import { waitFor } from '@testing-library/react';

import { buildRenderForm, changeValue } from '../utils';
import { DateField } from '../../src';

const renderForm = buildRenderForm({});

const getInput = (
  container: HTMLElement,
  dateType = 'va-date'
): HTMLVaTextInputElement => {
  const input = container.querySelector(dateType) as HTMLVaTextInputElement;
  if (!input) throw new Error('No va-date found');
  return input;
};

describe('Form Builder - DateField', () => {
  test('renders', () => {
    const { container } = renderForm(
      <DateField name="dateOfBirth" label="Date of Birth" />
    );
    const input = getInput(container);
    expect(input.getAttribute('label')).toEqual('Date of Birth');
    expect(input.getAttribute('name')).toEqual('dateOfBirth');
  });

  test('renders VaMemorableDate', () => {
    const { container } = renderForm(
      <DateField name="dateOfBirth" label="Date of Birth" isMemorableDate />
    );
    const input = getInput(container, 'va-memorable-date');
    expect(input.getAttribute('label')).toEqual('Date of Birth');
    expect(input.getAttribute('name')).toEqual('dateOfBirth');
  });

  test('renders initial value', () => {
    const rf = buildRenderForm({ dateOfBirth: '2022-05-20' });
    const { container } = rf(
      <DateField name="dateOfBirth" label="Date of Birth" />
    );
    const input = getInput(container);
    expect(input.getAttribute('value')).toEqual('2022-05-20');
  });

  test('renders the default "required" validation error message', async () => {
    const { container, getFormProps } = renderForm(
      <DateField name="dateOfBirth" label="Date of Birth" required />
    );
    const input = getInput(container);
    const label = input.getAttribute('label');
    await waitFor(() => {
      getFormProps().setFieldTouched('dateOfBirth');
    });
    expect(input.getAttribute('error')).toEqual(`${label} is required`);
  });

  test('handles value change using a function', async () => {
    const spy = jest.fn();
    const { container } = renderForm(
      <DateField name="dateOfBirth" label="Date of Birth" validate={spy} />
    );
    const input = getInput(container);

    await changeValue(input, '2021-08-28', 'dateChange');
    expect(spy).toBeCalled();
  });

  test('updates the formik state', async () => {
    const rf = buildRenderForm({ dateOfBirth: '2022-05-20' });
    const { container, getFormProps } = rf(
      <DateField name="dateOfBirth" label="Date of Birth" />
    );
    const input = getInput(container);
    await changeValue(input, '2021-08-28', 'dateChange');
    expect(getFormProps().values).toEqual({ dateOfBirth: '2021-08-28' });
  });
});
