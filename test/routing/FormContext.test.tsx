import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Router,
  Page,
  FormContext
} from '../../src';
import userEvent from '@testing-library/user-event';

import { Route, Link } from 'react-router-dom';
import { useFormikContext } from 'formik';

const TestForm = ( handleSubmit ) => {
  return (
    <Router optionalHandleUpdate={handleSubmit}>
      <Page title="Example form" path="/one">
        <label htmlFor="fiz">Fiz</label>
        <input id="fiz" type="text" name="fiz" />

        <label htmlFor="buz">Buz</label>
        <input id="buz" type="text" name="buz" />

        <button type="submit" name="submit">
          Submit
        </button>
      </Page>

      <Route path="/">
        <div className="vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column">
          <Link to="/one">Go to Form</Link>
        </div>
      </Route>
    </Router>
  )
}

describe('FormContext is being used through Pages', () => {
  test('Data is accurate after entering fields', async () => {

    const handleSubmit = jest.fn();

    const { getByLabelText, queryByText } = render(
      <TestForm handleSubmit={handleSubmit} />
    );

    userEvent.click(queryByText('Go to Form'));

    const fizInput = getByLabelText(/fiz/i);
    userEvent.type(fizInput, "John");

    const buzInput = getByLabelText(/buz/i);
    userEvent.type(buzInput, "Dee");

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    // const state = useFormikContext();

    await waitFor(() => {
      // expect(handleSubmit).toHaveBeenCalledWith(
      //   {
      //     values: {
      //       formData: {
      //         buz: "Dee",
      //         fiz: "John"
      //       }
      //     }
      //   }
      // );
      expect(handleSubmit).toHaveBeenCalled()
      });
  });
});

/**
 * Test default values by rendering a context consumer without a
 * matching provider
 */
test('FormConsumer shows default value', () => {
  render(
    <FormContext.Consumer>
      {(value) => (
        <>
          <div>My Name Is: {value.formData.foo}</div>
        </>
      )}
    </FormContext.Consumer>
  );
  expect(screen.getByText(/^My Name Is:/)).toHaveTextContent(
    'My Name Is: Testing'
  );
});