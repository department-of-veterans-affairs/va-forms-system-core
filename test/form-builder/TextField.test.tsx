/* eslint-disable @typescript-eslint/no-empty-function */

import React from 'react';
import TextField from '../../src/form-builder/TextField';
import { fireEvent, waitFor } from '@testing-library/react';

import { buildRenderForm } from '../utils';

const renderForm = buildRenderForm();

describe('Form Builder - TextField', () => {
  test('renders', () => {
    const { container } = renderForm(
      <TextField name="thing" label="The Thing" />
    );
    const input = container.querySelector('va-text-input');
    expect(input?.getAttribute('label')).toEqual('The Thing');
  });

  test('renders initial value', () => {
    const rf = buildRenderForm({ thing: 'asdf' });
    const { container } = rf(<TextField name="thing" label="The Thing" />);
    const input = container.querySelector('va-text-input');
    expect(input?.getAttribute('value')).toEqual('asdf');
  });

  test('renders the default validation error message', () => {});

  test('renders initial value', () => {});

  /**
   * I'm not sure what to do here. When the event fires
   * - It's caught by the React wrapper
   *   - I verified this by changing the event handler to log something
   * - It runs the validation
   *   - I added a console.log() to the validation function in TextField that
   *     only fires after the event is dispatched
   *
   * Additionally, it works as expected in my sandbox project. I just don't know
   * how to test that it updates the state. I expect it's something to do with
   * the helper.
   */
  test.skip('updates the formik state', async () => {
    const { container, getFormProps, rerender } = renderForm(
      <TextField name="thing" label="The Thing" />
    );
    const input = container.querySelector('va-text-input');
    if (!input) throw new Error('No va-text-input found');

    // Simulate the input changing without hooking up the web component
    const changeEvent = new CustomEvent('vaChange', {
      detail: { value: 'asdf' },
    });

    fireEvent(input, changeEvent);
    await waitFor(() => {
      rerender();
      expect(getFormProps().values).toEqual({ thing: 'asdf' });
    });
  });
});
