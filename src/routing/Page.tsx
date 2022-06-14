import React, { useContext, useEffect } from 'react';
import { Form, FormikContextType, useFormikContext } from 'formik';
import {
  useNavigate,
  To,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { IFormData, PageProps } from './types';
import { RouterContext } from './RouterContext';

const validatePage = (
  children: JSX.Element[],
  state: FormikContextType<unknown>
): boolean => {
  const requiredChildren = getRequiredChildren(children);
  const values = state.values as IFormData;

  let isValid = false;

  if (requiredChildren.length > 0) {
    requiredChildren.forEach((childField) => {
      const childFieldName = childField.props.name;

      const formikStateFieldValue = Object.entries(values).find(
        ([key, value]) => {
          if (key === childFieldName.split('.')[0]) {
            if (typeof value === 'object') {
              Object.entries(value as IFormData).find((v) => console.log(v));

              //NEEDS TO SET THE CORRECT BOOLEAN BASED ON EMPTY REQUIRED VALUE
              isValid = false;
            }
          }
        }
      );

      console.log(formikStateFieldValue);
    });
  }

  return isValid;
};

const getRequiredChildren = (children: JSX.Element[]) => {
  const requiredChildFields: JSX.Element[] = [];

  if (children.length > 0) {
    children.forEach((child) => {
      if (typeof child.props === 'object') {
        const childPropsKeys = Object.keys(child.props);

        if (childPropsKeys.indexOf('required') > -1) {
          requiredChildFields.push(child);
        }
      }
    });
  }

  return requiredChildFields;
};

/**
 * Renders the page contents
 *
 * @beta
 */
export default function Page(props: PageProps): JSX.Element {
  const state = useFormikContext();
  const { updateRoute } = useContext(RouterContext);
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editPage = searchParams.get('edit');

  useEffect(
    () =>
      updateRoute(
        currentLocation.pathname !== '' ? currentLocation.pathname : '/'
      ),
    [currentLocation]
  );

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
                navigate('/review-and-submit' as To);
              }}
              className="btn next"
            >
              Back to Review page
            </button>
          </div>
        )}
        {props.prevPage && (
          <button
            className="btn usa-button-secondary prev"
            onClick={(event) => {
              event.preventDefault();
              navigate(props.prevPage as To);
            }}
          >
            <i className="fas fa-angle-double-left"></i> Previous
          </button>
        )}

        {props.nextPage && (
          <button
            className="btn usa-button-primary next"
            onClick={(event) => {
              const isValid = validatePage(
                props.children as JSX.Element[],
                state
              );

              if (isValid) {
                navigate(props.nextPage as To);
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
