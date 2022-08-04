import React, { useContext, useEffect, useLayoutEffect } from 'react';
import {
  FormikBag,
  FormikComputedProps,
  FormikContextType,
  FormikProps,
  useFormikContext,
} from 'formik';
import { Link, useLocation } from 'react-router-dom';
import { VaOnThisPage } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { FieldObject, Page, PageObject, PageProps } from '../routing';
import { parseDate } from '../utils/helpers';
import { PageContext } from './PageContext';
// import { getRadioLabel } from "../utils/helpers";

/**
 * Transforms fields value into value that is more readable
 * @param {boolean | object | string} field object value
 * @param {string} key object key name
 *
 * @beta
 */
const transformFieldValue = (key: number, field: FieldObject) => {
  if (typeof field?.value === 'undefined' || typeof field?.value === 'object')
    return;

  if (field.value === 'true' || field.value === true) {
    return 'Yes';
  }
  if (field.value === 'false' || field.value === false) {
    return 'No';
  }
  if (
    ['from', 'to', 'veteranDateOfBirth', 'deathDate', 'burialDate'].indexOf(
      field.name
    ) > -1
  ) {
    const date = parseDate(field.value as string);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  if (['amountIncurred', 'amountGovtContribution'].indexOf(field.name) > -1) {
    return `$${field.value }`;
  }
  if (['claimantPhone'].indexOf(field.name) > -1) {
    return `${(field.value as string).replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1) $2-$3'
    )}`;
  }
  return field.value;
};

/**
 * Loops through field objects and adds JSX to a buffer
 * to be rendered later
 * @param {objects} fields object value
 * @param {number} rank level number of recursion
 *
 * @beta
 */
const bufferFields = (fields: FieldObject[], rank = 0) => {
  const fieldBuffer: JSX.Element[] = [];
  fields.forEach((field, key) => {
    const fieldJSX = recurseField(key, field, rank);
    if (fieldJSX) fieldBuffer.push(fieldJSX);
  });
  if (fieldBuffer.length > 0) return fieldBuffer;
};

/**
 * Recurses through field and either returns value or
 * uses bufferField to loop through object value
 * @param {string} key object key name
 * @param {boolean | object | string} field object value
 * @param {number} rank level number of recursion
 *
 * @beta
 */
const recurseField = (
  key: number,
  field: FieldObject,
  rank = 0
): JSX.Element | undefined => {
  if (
    field.value === '' ||
    field.value === 0 ||
    field.value === null ||
    field.value === undefined
  )
    return;
  const fieldLabel = field.label && (
    <label className="vads-u-margin-top--1 review-page--page-info--label-text">
      {field.label}
    </label>
  );

  if (field?.children && field?.children.length > 0) {
    return (
      <div
        className={`level-${rank}-field-${key}`}
        key={`level-${rank}-field-${key}`}
      >
        {' '}
        {bufferFields(field.children, rank + 1)}
      </div>
    );
  } else if (field?.value) {
    return (
      <div
        className={`level-${rank}-field-${key} vads-u-margin-bottom--1p5`}
        key={`level-${rank}-field-${key}`}
      >
        {fieldLabel}
        <span
          className={`review-page--page-info--value-text field-value field-value-level-${rank}`}
          key={`child-level-${rank}-field-${key}`}
        >
          {' '}
          {transformFieldValue(key, field)}
        </span>
      </div>
    );
  }
};

export function SyncFormikDataToPages(
  pages: PageObject[],
  formikData: FormikContextType<any>
): PageObject[] {
  const newArrayBuffer = [...pages];

  // go into the page level
  for (let i = 0; i < newArrayBuffer.length; i++) {
    const arrPage = newArrayBuffer[i];
    if (arrPage?.fields.length) {
      // make a copy
      const arrPageFields = [...arrPage.fields];
      // go into the fields level
      for (let x = 0; x < arrPageFields.length; x++) {
        // make a copy
        const arrPageField = arrPageFields[x];

        // check to see if the value exists in formik
        if (formikData.values[arrPageField.name]) {
          // first, check to see if the field has any children
          if (arrPageField?.children && (arrPageField?.children).length > 0) {
            // make a copy
            const arrPageFieldChildren = [...arrPageField.children];

            for (let f = 0; f < arrPageFieldChildren.length; f++) {
              if (arrPageFieldChildren[f]) {
                const fieldName = arrPageFieldChildren[f].name.split('.');
                // set the value
                arrPageFieldChildren[f].value =
                  formikData.values[arrPageField.name][
                    arrPageFieldChildren[f].name
                  ];
              }
            }
            // reset the value
            arrPageField.children = arrPageFieldChildren;
          }

          // go ahead and set it's value directly even if it has children
          if (typeof formikData.values[arrPageField.name] !== 'object') {
            arrPageField.value = formikData.values[arrPageField.name];
          }
        }
        // reset its value
        arrPageFields[x] = arrPageField;
      }

      arrPage.fields = arrPageFields;
    }
    // reset the value
    newArrayBuffer[i] = arrPage;
  }
  return newArrayBuffer;
}

export default function ReviewPage(props: { title: string }) {
  const state = useFormikContext();
  const { listOfPages, setListOfPages } = useContext(PageContext);

  const location = useLocation();

  useEffect(() => {
    const newListOfPages = SyncFormikDataToPages(listOfPages, state);
    setListOfPages(newListOfPages);
  }, [state]);
  return (
    <article>
      <h1>{props.title}</h1>
      {/* <VaOnThisPage></VaOnThisPage> */}

      {listOfPages.map((page) => {
        return (
          <section
            id={page.id}
            key={page.id}
            className="review-page--page-info"
          >
            <div className="review-page--page-heading vads-u-justify-content--space-between vads-l-row vads-u-border-bottom--1px vads-u-border-color--link-default">
              <h2
                id={page.id}
                className="vads-u-font-size--h3 vads-u-flex--1 review-page--page-heading--text"
              >
                {page.title}
              </h2>
              <Link
                to={page.path + '?edit=true&source=' + page.id}
                className="vads-u-margin-bottom--1p5 review-page--page-heading--link"
              >
                Edit
              </Link>
            </div>
            {bufferFields(page.fields)}
          </section>
        );
      })}

      {/* { pageData.pages.map(page => { return (
          <section id={page.id} key={page.id} className="review-page--page-info">
            <div className='review-page--page-heading vads-u-justify-content--space-between vads-l-row vads-u-border-bottom--1px vads-u-border-color--link-default'>
              <h2 id={page.id} className='vads-u-font-size--h3 vads-u-flex--1 review-page--page-heading--text'>{page.title}</h2>
              <Link to={page.pageUrl+'?edit=true&source='+page.id} className='vads-u-margin-bottom--1p5 review-page--page-heading--link'>Edit</Link>
            </div>

            {{bufferFields(page.fields)}
        </section>
        )}) } */}
    </article>
  );
}
