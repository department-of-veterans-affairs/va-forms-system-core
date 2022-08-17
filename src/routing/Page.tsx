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
import { PageContext } from '../form-data/PageContext';

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
  const { listOfPages, setListOfPages } = useContext(PageContext);
  const childrenLength = React.Children.count(props.children);
  const formHeading = document.querySelector<HTMLElement>('form h1');

  const { nextRoute, previousRoute } = useContext(RouterContext);

  useEffect(() => {
    const listOfPagesCopy = [...listOfPages];

    // go through list of pages and make sure info doesn't already exist
    const pageIndex = listOfPagesCopy
      .map((page) => page.id)
      .indexOf(currentLocation.pathname.replace(/\\/g, ''));

    if (pageIndex < 0 && props?.fieldNames) {
      const pageData = {
        id: currentLocation.pathname.replace(/\\/g, ''),
        title: props.title,
        path: currentLocation.pathname,
        fieldNames: props?.fieldNames,
        fields: [],
      };
      setListOfPages([...listOfPagesCopy, pageData]);
    }
  }, [currentLocation.pathname, childrenLength]);

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
            onClick={(event: Event) => {
              if (Object.keys(state.errors).length > 0) {
                state.handleSubmit();
                event.preventDefault();
              } else {
                state.handleSubmit();
                navigate(
                  `/review-and-submit${
                    sourceAnchor ? `#${sourceAnchor}` : ''
                  }` as To
                );
              }
            }}
            text="Back to Review Page"
          />
        </div>
      )}

      {previousRoute && !nextRoute && !props.hidePreviousButton && (
        <VaButton
          back
          onClick={() => {
            navigate(previousRoute as To);
          }}
        />
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

      {nextRoute && previousRoute && !props.hidePreviousButton && (
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

              // Set focus on the form heading if it exists
              if (formHeading) formHeading.focus();
            }
          }}
          onSecondaryClick={() => {
            navigate(previousRoute as To);

            // Set focus on the form heading if it exists
            if (formHeading) formHeading.focus();
          }}
        />
      )}
    </div>
  );
}
