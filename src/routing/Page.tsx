import React, { useContext, useEffect } from 'react';
import { useFormikContext } from 'formik';
import {
  useNavigate,
  To,
  useSearchParams,
  useLocation,
} from 'react-router-dom-v5-compat';
import { PageProps } from './types';
import { RouterContext } from './RouterContext';
import {
  VaButtonPair,
  VaButton,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';

/**
 * Renders the page contents
 *
 * @public
 */
export default function Page(props: PageProps): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editPage = searchParams.get('edit');
  const sourceAnchor = searchParams.get('source');
  const state = useFormikContext();
  const currentLocation = useLocation();

  const { nextRoute, previousRoute } = useContext(RouterContext);

  useEffect(() => {
    // Reset the form on route change.
    // This could be used in a different component
    // but was used here because it's related to routing.
    state.setErrors({});
    state.setTouched({}); // resetting fields
    state.setSubmitting(false); // resetting fields
  }, [currentLocation]);

  return (
    <div>
      <h3>{props.title}</h3>
      <div className="vads-u-margin-y--2">{props.children}</div>

      {editPage && (
        <div>
          <VaButton
            onClick={() => {
              navigate(
                `/review-and-submit${
                  sourceAnchor ? `#${sourceAnchor}` : ''
                }` as To
              );
            }}
            className="btn next"
            text="Back to Review Page"
          />
        </div>
      )}

      {nextRoute && !previousRoute && (
        <VaButton
          submit
          continue
          onClick={(event: Event) => {
            if (Object.keys(state.errors).length > 0) {
              state.handleSubmit();
              event.preventDefault();
            } else {
              state.handleSubmit();
              navigate(nextRoute as To);
            }
          }}
          aria-describedby={props.nextButtonDescribedBy}
          className="btn next"
        />
      )}

      {nextRoute && previousRoute && (
        <VaButtonPair
          continue
          submit
          onPrimaryClick={(event: Event) => {
            if (Object.keys(state.errors).length > 0) {
              state.handleSubmit();
              event.preventDefault();
            } else {
              state.handleSubmit();
              navigate(nextRoute as To);
            }
          }}
          onSecondaryClick={() => {
            navigate(previousRoute as To);
          }}
        />
      )}
    </div>
  );
}
