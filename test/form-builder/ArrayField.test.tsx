/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */

import React, { ReactElement } from 'react';
import { render, waitFor } from '@testing-library/react';

import ArrayField from '../../src/form-builder/ArrayField';
import { buildRenderForm, changeValue } from '../utils';
import TextField from '../../src/form-builder/TextField';
import { Formik } from 'formik';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

const renderForm = buildRenderForm({});

const ArrayFieldTemplate = ({data, index}) => 
<TextField name={`thing[${index}]thing`} label="Rank" value={data.thing}/>

describe('Form Builder - ArrayField', () => {
  test('renders', () => {
    const { container } = render(
      <Formik
        initialValues={{thing: [
          {
            thing: 'hello'
          }
        ]}}
        onSubmit={(values, actions) => {}}
      >
        <ArrayField name="thing" label="The Thing" 
          arrayFieldSchema={
            {
              thing: undefined
            }
          }
          FieldArrayTemplate={ArrayFieldTemplate}
        />
      </Formik>
      
    );
    const input = container.querySelector('#thing') as Element;
    expect(input.querySelector('legend')?.innerHTML).toContain('The Thing');
  });

  test('deletes a field and shows required error', async () => {
    const { container } = render(
      <Formik
        initialValues={{thing: [
          {
            thing: 'hello'
          }
        ]}}
        onSubmit={(values, actions) => {}}
      >
        <ArrayField name="thing" label="The Thing" 
          arrayFieldSchema={
            {
              thing: undefined
            }
          }
          FieldArrayTemplate={ArrayFieldTemplate}
          required
        />
      </Formik>
      
    );
    act(() => {
      const input = container.querySelector('#remove-0') as Element;

      userEvent.click(input);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.usa-input-error-message')?.innerHTML
      ).toContain("Please");
    })
  });

  test('Adds Item', async () => {
    const { container } = render(
      <Formik
        initialValues={{thing: [
          {
            thing: 'hello'
          }
        ]}}
        onSubmit={(values, actions) => {}}
      >
        <ArrayField name="thing" label="The Thing" 
          arrayFieldSchema={
            {
              thing: undefined
            }
          }
          FieldArrayTemplate={ArrayFieldTemplate}
          required
        />
      </Formik>
      
    );
    act(() => {
      const input = container.querySelector('#add-item') as Element;

      userEvent.click(input);
    });
    await waitFor(() => {
      expect(
        container.querySelectorAll('va-text-input')?.length
      ).toEqual(2);
    })
  });
});
