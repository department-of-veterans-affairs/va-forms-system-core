import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { FormikContextType, useFormikContext } from 'formik';
import { Link } from 'react-router-dom';
import { VaOnThisPage } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { Page } from '../routing';
import { FieldObject } from './types';

import { parseDate } from '../utils/helpers';
import { PageContext } from './PageContext';

const TruthAndFalseLabels = [
  {
    label: 'Yes',
    values: [true, 1, 'true'],
  },
  {
    label: 'No',
    values: [false, 0, 'false'],
  },
];

/**
 * Transforms fields value into value that is more readable
 * @param {boolean | object | string} field object value
 * @param {string} key object key name
 *
 * @beta
 */
const transformFieldValue = (key: number, field: FieldObject) => {
  if (
    typeof field?.value === 'undefined' ||
    field.value === null ||
    typeof field?.value === 'object'
  )
    return;

  // check for a 0,false,1,or true value
  const truthOrFalseIndex = TruthAndFalseLabels.findIndex((labelValue) => {
    return !!labelValue.values.find(
      (fieldValue) => field?.value === fieldValue
    );
  });
  if (truthOrFalseIndex >= 0) {
    return TruthAndFalseLabels[truthOrFalseIndex].label;
  }

  // Add field options
  if (field?.options) {
    const fieldIndex = field.options.findIndex(
      (fieldOption) => fieldOption.value === field?.value
    );
    if (fieldIndex >= 0) {
      return field.options[fieldIndex].label;
    }
  }
  // Parse date
  if (field?.type === 'date') {
    const date = parseDate(field.value as string);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  // Number fields
  if (field?.type === 'accounting') {
    return `$${field.value as string}`;
  }
  // Telephone fields
  if (field?.type === 'tel') {
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

  if (field?.value) {
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

export default function ReviewPage(props: { title: string }) {
  const state = useFormikContext();
  const { listOfPages, setListOfPages } = useContext(PageContext);

  return (
    <Page {...props} nextButtonCustomText="Submit" hidePreviousButton={false}>
      <article>
        <h1>{props.title}</h1>
        <VaOnThisPage></VaOnThisPage>

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
      </article>
    </Page>
  );
}
