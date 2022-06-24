import React, { useContext } from 'react';
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
  const state = useFormikContext();

  const { nextRoute, previousRoute } = useContext(RouterContext);

  return (
    <div>
      <h3>{props.title}</h3>
      <form onSubmit={state.handleSubmit}>
        <div className="vads-u-margin-y--2">{props.children}</div>

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
        {previousRoute && !props.hidePreviousButton && (
          <button
            className="btn usa-button-secondary prev"
            onClick={(event) => {
              event.preventDefault();
              navigate(previousRoute as To);
            }}
          >
            <i className="fas fa-angle-double-left" /> Previous
          </button>
        )}

        {nextRoute && (
          <button
            className="btn usa-button-primary next"
            onClick={async (event) => {
              const validate = await state.validateForm();
              const validateKeys = Object.keys(validate);

              if (validateKeys.length === 0) {
                navigate(nextRoute as To);
              }
              console.log(state.touched);
            }}
          >
            {props.nextButtonCustomText ? props.nextButtonCustomText : 'Next'}{' '}
            <i className="fas fa-angle-double-right" />
          </button>
        )}
      </form>
    </div>
  );
}
