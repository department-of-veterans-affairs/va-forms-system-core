/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */

import React from 'react';
import { waitFor } from '@testing-library/react';

import NumberField from '../../src/form-builder/NumberField';
import { buildRenderForm, changeValue } from '../utils';

const renderForm = buildRenderForm({});

const getInput = (container: HTMLElement): HTMLVaNumberInputElement => {
  const input = container.querySelector(
    'va-number-input'
  ) as HTMLVaNumberInputElement;
  if (!input) throw new Error('No va-number-input found');
  return input;
};

describe('Form Builder - NumberField', () => {
  test('renders', () => {
    const { container } = renderForm(
      <NumberField name="thing" label="The Thing" />
    );
    const input = getInput(container);
    expect(input.getAttribute('label')).toEqual('The Thing');
    expect(input.getAttribute('name')).toEqual('thing');
  });

  test('renders initial value', () => {
    const rf = buildRenderForm({ thing: 'asdf' });
    const { container } = rf(<NumberField name="thing" label="The Thing" />);
    const input = getInput(container);
    expect(input.getAttribute('value')).toEqual('asdf');
  });

  test('renders the default "required" validation error message', async () => {
    const { container, getFormProps } = renderForm(
      <NumberField name="thing" label="The Thing" required />
    );
    const input = getInput(container);
    const label = input.getAttribute('label');
    await waitFor(() => {
      getFormProps().setFieldTouched('thing');
    });
    expect(input.getAttribute('error')).toEqual(`${label} is required`);
  });

  test('renders a custom "required" validation error message', async () => {
    const { container, getFormProps } = renderForm(
      <NumberField
        name="thing"
        label="The Thing"
        required="You need to fill this in, bub"
      />
    );
    const input = getInput(container);
    await waitFor(() => {
      getFormProps().setFieldTouched('thing');
    });
    expect(input?.getAttribute('error')).toEqual(
      'You need to fill this in, bub'
    );
  });

  test('validates using a function', async () => {
    const spy = jest.fn();
    const { getFormProps } = renderForm(
      <NumberField name="thing" label="The Thing" validate={spy} />
    );
    await waitFor(() => {
      getFormProps().validateField('thing');
    });
    expect(spy).toBeCalled();
  });

  test('handles value change using a function', async () => {
    const spy = jest.fn();
    const { container } = renderForm(
      <NumberField name="thing" label="The Thing" validate={spy} />
    );
    const input = getInput(container);

    await changeValue(input, '5463', 'input');
    expect(spy).toBeCalled();
  });

  test('updates the formik state', async () => {
    const rf = buildRenderForm({ thing: 'foo' });
    const { container, getFormProps } = rf(
      <NumberField name="thing" label="The Thing" />
    );
    const input = getInput(container);

    await changeValue(input, 'asdf', 'input');
    expect(getFormProps().values).toEqual({ thing: 'asdf' });
  });
});
