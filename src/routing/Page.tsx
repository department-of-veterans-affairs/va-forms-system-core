import React, { useContext, useEffect } from 'react';
import { Form, useFormikContext } from 'formik';
import { useNavigate, To, useSearchParams } from 'react-router-dom';
import { PageProps } from './types';
import { RouterContext } from './RouterContext';

/**
 * Renders the page contents
 *
 * @beta
 */
export default function Page(props: PageProps): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editPage = searchParams.get('edit');
  const sourceAnchor = searchParams.get('source');

  const { nextRoute, previousRoute } = useContext(RouterContext);
  const state = useFormikContext();

  useEffect(() => {
    state.setTouched({});
  }, []);

  return (
    <div>
      <h3>{props.title}</h3>
      <Form>
        {props.children}

        {editPage && (
          <div>
            <button
              onClick={(event) => {
                event.preventDefault();
                navigate(
                  `/review-and-submit${
                    sourceAnchor ? `#${sourceAnchor}` : ''
                  }` as To
                );
              }}
              className="btn next"
            >
              Back to Review page
            </button>
          </div>
        )}
        {previousRoute && (
          <button
            className="btn usa-button-secondary prev"
            onClick={(event) => {
              event.preventDefault();
              navigate(previousRoute as To);
            }}
          >
            <i className="fas fa-angle-double-left"></i> Previous
          </button>
        )}

        {nextRoute && (
          <button
            className="btn usa-button-primary next"
            onClick={() => {
              const keys = Object.keys(state.errors);
              if (keys.length > 0) {
                state.handleSubmit();
              } else {
                navigate(nextRoute as To);
              }
            }}
          >
            Next <i className="fas fa-angle-double-right"></i>
          </button>
        )}
      </Form>
    </div>
  );
}
