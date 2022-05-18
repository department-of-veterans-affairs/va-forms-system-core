import React, { useContext } from 'react';
import { useFormikContext, Form } from 'formik';
import { useNavigate, Link, useLocation, RouteObject } from 'react-router-dom';
import { PageProps, IFormData } from './types';
import { RouterContext } from './Router';

/**
 * Renders the page contents
 *
 * @beta
 */
export default function Page(props: PageProps): JSX.Element {
  const { values, submitForm } = useFormikContext();
  const formValues = values as IFormData;
  const routePages = useContext(RouterContext).listOfRoutes;
  const currentLocation = useLocation();

  // get the current route in order to determine the next route.
  const splitLocation = currentLocation.pathname.split('/');

  const navigate = useNavigate();

  return (
    <div>
      <h3>{props.title}</h3>
      <Form>
        {props.children}
        <button
          className="btn"
          onClick={(event) => {
            event.preventDefault();
            void submitForm();
            // then submit form has succeeded - add better promise validation here
            navigate(`${props.nextPage}`);
          }}
        >
          {' '}
          Next
        </button>
      </Form>
    </div>
  );
}
