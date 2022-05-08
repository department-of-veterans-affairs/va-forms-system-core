import React from 'react';
import { waitFor } from '@testing-library/react';

import { buildRenderForm } from '../utils';
import SSNField from '../../src/form-builder/SSNField';

const renderForm = buildRenderForm({});

const getInput = (container: HTMLElement): JSX.Element => {
  const input = container.querySelector('va-text-input') as JSX.Element;
  if (!input) throw new Error('No va-ssn-input found');
  return input;
};

describe('Form Builder - SSNField', () => {
  test('it renders with the correct attributes', () => {
    const { container } = renderForm(<SSNField name="ssn" label="ssn" />);
    const input = getInput(container);

    expect(input.getAttribute('label')).toEqual('ssn');
    expect(input.getAttribute('name')).toEqual('ssn');
  });

  test('it renders the default "required" validation error message', async () => {
    const { container, getFormProps } = renderForm(
      <SSNField name="ssn" label="ssn" required />
    );
    const input = getInput(container);
    await waitFor(() => {
      getFormProps().setFieldTouched('ssn');
    });

    expect(input.getAttribute('error')).toEqual('Please provide a response');
  });

  test('it renders a custom "required" validation error message', async () => {
    const expectedErrorMessage = 'You need to fill this in, bub';
    const { container, getFormProps } = renderForm(
      <SSNField name="ssn" label="ssn" required={expectedErrorMessage} />
    );
    const input = getInput(container);
    await waitFor(() => getFormProps().setFieldTouched('ssn'));

    expect(input.getAttribute('error')).toEqual(expectedErrorMessage);
  });

  test('it shows the correct error message for an invalid ssn format', async () => {
    const rf = buildRenderForm({ ssn: 'foo' });
    const { container, getFormProps } = rf(
      <SSNField name="ssn" label="ssn" />
    );
    const input = getInput(container);
    await waitFor(() => getFormProps().setFieldTouched('ssn'));

    expect(input?.getAttribute('error')).toEqual(
      'Please enter a valid 9 digit Social Security number (dashes allowed)'
    );
  });

  test('it shows no error message for a valid ssn', async () => {
    const rf = buildRenderForm({ ssn: '989-55-7788' });
    const { container, getFormProps } = rf(
      <SSNField name="ssn" label="ssn" />
    );
    const input = getInput(container);
    await waitFor(() => getFormProps().setFieldTouched('ssn'));

    expect(input?.getAttribute('error')).toBeNull();
  });

  // test('it shows no error message for an empty ssn if field is not required', async () => {
  //   const rf = buildRenderForm({ ssn: '' });
  //   const { container, getFormProps } = rf(
  //     <SSNField name="ssn" label="ssn" />
  //   );
  //   const input = getInput(container);
  //   await waitFor(() => getFormProps().setFieldTouched('ssn'));

  //   expect(input?.getAttribute('error')).toBeNull();
  // });

  // test('it shows an error message for an empty ssn if field is required', async () => {
  //   const rf = buildRenderForm({ ssn: '' });
  //   const { container, getFormProps } = rf(
  //     <SSNField name="ssn" label="ssn" required />
  //   );
  //   const input = getInput(container);
  //   await waitFor(() => getFormProps().setFieldTouched('ssn'));

  //   expect(input.getAttribute('error')).toEqual('Please provide a response');
  // });

  test('it sets the field as touched on blur', async () => {
    const rf = buildRenderForm({ ssn: '' });
    const { container, getFormProps } = rf(
      <SSNField name="ssn" label="ssn" required />
    );
    const input = getInput(container);
    await waitFor(() => getFormProps().setFieldTouched('ssn'));

    expect(input.getAttribute('error')).toEqual('Please provide a response');
  });
});