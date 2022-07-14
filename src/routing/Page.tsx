import React, {
  JSXElementConstructor,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import { Form, useFormikContext } from 'formik';
import {
  useNavigate,
  To,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { FieldObject, PageProps } from './types';
import { RouterContext } from './RouterContext';
import { PageContext } from './PageContext';

const TYPES = [
  'AddressField',
  'CheckboxField',
  'CheckboxFieldGroup',
  'DateField',
  'EmailField',
  'FullNameField',
  'OMBInfo',
  'PhoneField',
  'RadioGroup',
  'SelectField',
  'SSNField',
  'TextField',
];

const matchType = (type: React.JSXElementConstructor<any>) => {
  if ((type )?.name) {
    TYPES.forEach((item) => {
      if ((type ).name === item) return true;
    });
  }
  return null;
};

export function createFieldDataFromChildren(
  children: React.ReactNode
): FieldObject[] {
  let fields: FieldObject[] = [];

  React.Children.forEach(children, (element) => {
    // 1 check if valid element
    // 2 check if there are children to drill into

    if (!React.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }

    if (element.props?.children?.length > 0) {
      // Drill into any children items
      if (!matchType(element.type as JSXElementConstructor<any>)) {
        // throw new Error(`[${
        //   typeof element.type === "string" ? element.type : element.type.name
        // }] is not a valid type of component.`);
        fields = [
          ...fields,
          ...createFieldDataFromChildren(element.props.children),
        ];

        return;
      }
    }

    const field: FieldObject = {
      name: element.props.name,
      label: element.props.label,
      value: '',
    };

    if (element.props.children) {
      field.children = createFieldDataFromChildren(element.props.children);
    }

    fields.push(field);
  });

  return fields;
}

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
  const currentLocation = useLocation();
  const { listOfPages, setListOfPages } = useContext(PageContext);

  const { nextRoute, previousRoute } = useContext(RouterContext);

  useEffect(() => {
    // Reset the form on route change.
    // This could be used in a different component
    // but was used here because it's related to routing.
    state.setErrors({});
    state.setTouched({}); // resetting fields
    state.setSubmitting(false); // resetting fields

    const childItems = createFieldDataFromChildren(props.children);
    const pageData = {
      id: currentLocation.pathname,
      title: props.title,
      path: currentLocation.pathname,
      fields: [...childItems],
    };
    setListOfPages([...listOfPages, pageData]);
  }, [currentLocation]);

  return (
    <div>
      <h3>{props.title}</h3>
      <div className="vads-u-margin-y--2">{props.children}</div>

      {editPage && (
        <div>
          <button
            onClick={(event) => {
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
          onClick={() => {
            navigate(previousRoute as To);
          }}
        >
          <i className="fas fa-angle-double-left" /> Previous
        </button>
      )}

      {nextRoute && (
        <button
          className="btn usa-button-primary next"
          onClick={(event) => {
            if (Object.keys(state.errors).length > 0) {
              state.handleSubmit();
              event.preventDefault();
            } else {
              state.handleSubmit();
              navigate(nextRoute as To);
            }
          }}
          type="submit"
        >
          {props.nextButtonCustomText ? props.nextButtonCustomText : 'Next'}{' '}
          <i className="fas fa-angle-double-right" />
        </button>
      )}
    </div>
  );
}
