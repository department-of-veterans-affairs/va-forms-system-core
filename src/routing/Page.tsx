import React, { useContext } from 'react';
import { Form, FormikContextType, useFormikContext } from 'formik';
import { useNavigate, To, useSearchParams } from 'react-router-dom';
import { IFormData, PageProps } from './types';
import { RouterContext } from './RouterContext';

const validatePage = (
  children: JSX.Element[],
  state: FormikContextType<unknown>
): boolean => {
  let isValid = true;

  const values = state.values as IFormData;
  const requiredChildren = getRequiredChildren(children);
  const requiredChildFields = getRequiredFormikFieldNames(requiredChildren);

  requiredChildFields.map((fieldName) => {
    isValid = isFieldEmptyOrErrored(fieldName, values, state);
  });

  return isValid;
};

const isFieldEmptyOrErrored = (
  fieldName: string,
  values: IFormData,
  state: FormikContextType<unknown>
): boolean => {
  let isValid = false;

  const splitFieldNameList = fieldName.split('.');

  const field = values[`${splitFieldNameList[0]}`] as IFormData;
  console.log(field);
  console.log(typeof field);

  if (splitFieldNameList.length > 1) {
    const field = values[`${splitFieldNameList[0]}`] as IFormData;
    Object.entries(field).map(([key, value]) => {
      if (key === splitFieldNameList[1]) {
        if (
          (typeof value === 'string' || typeof value === 'boolean') &&
          value !== '' &&
          state.errors !== {}
        ) {
          isValid = true;
        } else {
          isValid = false;
        }
      }
    });
  } else {
    const fieldValue = values[`${splitFieldNameList[0]}`];
    if (
      (typeof fieldValue === 'string' || typeof fieldValue === 'boolean') &&
      fieldValue !== '' &&
      state.errors !== {}
    ) {
      isValid = true;
    } else {
      isValid = false;
    }
  }

  return isValid;
};

const getRequiredFormikFieldNames = (children: JSX.Element[]): string[] => {
  const requiredChildFields: string[] = [];

  if (children.length > 0) {
    children.map((childField) => {
      requiredChildFields.push(childField.props.name);
    });
  }

  return requiredChildFields;
};

const getRequiredChildren = (children: JSX.Element[]): JSX.Element[] => {
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editPage = searchParams.get('edit');
  const { nextRoute, previousRoute } = useContext(RouterContext);
  const state = useFormikContext();

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
            onClick={(event) => {
              const isValid = validatePage(
                props.children as JSX.Element[],
                state
              );

              if (isValid) {
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
