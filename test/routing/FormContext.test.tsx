// import React from 'react';

// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Router from '../../src/routing/Router';
// import Page from '../../src/routing/Page';
// import TextField from '../../src/form-builder/TextField';
// import DebuggerView from '../../src/debugger-view';
// import { Route, Link } from 'react-router-dom';
// import { useFormikContext } from 'formik';

// describe('FormContext is being used through Pages', () => {
//   test('Data is accurate after entering fields', async () => {
//     const handleSubmit = jest.fn();

//     const { getByLabelText, queryByText } = render(
//       <Router>
//         <Page title="Example form" path="/one" handleUpdate={handleSubmit}>
//           <label htmlFor="fiz">Fiz</label>
//           <input id="fiz" type="text" name="fiz" />

//           <label htmlFor="buz">Buz</label>
//           <input id="buz" type="text" name="buz" />

//           <button type="submit" name="submit">
//             Submit
//           </button>
//         </Page>

//         {/* This Route is last because a Switch will render whichever component */}
//         {/* is the first to match a path, and a `/` would be a match for any page */}
//         {/* https://reactrouter.com/web/guides/quick-start */}
//         <Route path="/">
//           <div className="vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column">
//             <Link to="/one">Go to Form</Link>
//           </div>
//         </Route>
//       </Router>
//     );

//     userEvent.click(queryByText('Go to Form'));

//     const fizInput = getByLabelText(/fiz/i);
//     userEvent.type(fizInput, "John");

//     const buzInput = getByLabelText(/buz/i);
//     userEvent.type(buzInput, "Dee");

//     await userEvent.click(screen.getByRole('button', { name: /submit/i }));

//     await waitFor(() =>
//       expect(handleSubmit).toHaveBeenCalledWith({
//           fiz: "John",
//           buz: "Dee"
//       })
//     );
//   });
// });

// myForm.test.js
// import React from 'react'
// import {render, screen, waitFor} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

// import {MyForm} from './TestForm'

// test('rendering and submitting a basic Formik form', async () => {
//   const handleSubmit = jest.fn()
//   const { queryByText } = render(<MyForm onSubmit={handleSubmit} />)

//   userEvent.click(queryByText('Go to Form'));

//   await userEvent.type(screen.getByLabelText(/first name/i), 'John')
//   await userEvent.type(screen.getByLabelText(/last name/i), 'Dee')
//   await userEvent.type(screen.getByLabelText(/email/i), 'john.dee@someemail.com')

//   await userEvent.click(screen.getByRole('button', {name: /submit/i}))

//   await waitFor(() =>
//     expect(handleSubmit).toHaveBeenCalledWith({
//       email: 'john.dee@someemail.com',
//       firstName: 'John',
//       lastName: 'Dee',
//     }),
//   )
// })

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormContext } from '../../src/routing/FormContext';

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
