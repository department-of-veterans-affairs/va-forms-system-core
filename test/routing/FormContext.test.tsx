import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  // Router,
  // Page,
  FormContext,
} from '../../src';

// import { Route, Link } from 'react-router-dom';

// const TestForm = ( { handleSubmit, children } ) => {
//   return (
//     <Router optionalHandleUpdate={handleSubmit}>
//       <Page title="Example form" path="/one">
//         <label htmlFor="fiz">Fiz</label>
//         <input id="fiz" type="text" name="fiz" />

//         <label htmlFor="buz">Buz</label>
//         <input id="buz" type="text" name="buz" />

//         <button type="submit" name="submit">
//           {children}
//         </button>
//       </Page>

//       <Route path="/">
//         <div className="vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column">
//           <Link to="/one">Go to Form</Link>
//         </div>
//       </Route>
//     </Router>
//   )
// }

describe('FormContext is being used through Pages', () => {
  /**
   *  Test default values by rendering a context consumer without a
   *  matching provider
   */
  test('FormConsumer shows default value', () => {
    const example1 = render(
      <FormContext.Consumer>
        {(value) => (
          <>
            <div>My Name Is: {value.formData.foo}</div>
          </>
        )}
      </FormContext.Consumer>
    );
    expect(example1.getByText(/^My Name Is:/)).toHaveTextContent(
      'My Name Is: Testing'
    );
  });

  /**
   *  Test that submit can be called after routing through pages
   */
  // test('While going through pages, submit was called at least once', async () => {
  //   const handleClick = jest.fn()

  //   const example2 = render(<TestForm handleSubmit={handleClick}>Click Me</TestForm>)

  //   fireEvent.click(example2.getByText(/go to form/i))

  //   fireEvent.click(example2.getByText(/click me/i))

  //   await waitFor(() =>
  //     expect(handleClick).toHaveBeenCalledTimes(1));
  // });

  /**
   *  Form Data passes through form and submitted
   */
  // test('Data is accurate after entering fields', async () => {
  //   const handleClick = jest.fn();

  //   const example3 = render(<TestForm onClick={handleClick}>Click Me</TestForm>);

  //   fireEvent.click(example3.getByText(/go to form/i));

  //   fireEvent.change(example3.getByLabelText(/fiz/i), {target: {value: 'John'}})
  //   fireEvent.change(example3.getByLabelText(/buz/i), {target: { value: 'Dee' }})

  //   fireEvent.click(example3.getByText(/click me/i));

  //   await waitFor(() => {
  //     expect(handleClick).toHaveBeenCalledWith(
  //       {
  //         values: {
  //           formData: {
  //             buz: "Dee",
  //             fiz: "John"
  //           }
  //         }
  //       }
  //     );
  //   });
  // });
});
