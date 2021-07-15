/* eslint-disable @typescript-eslint/no-empty-function */

import React from 'react';
import TextField from '../../src/form-builder/TextField';

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

  test('updates the formik state', () => {});

  test('renders the validation error message', () => {});
});
