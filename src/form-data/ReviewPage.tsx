require('../css/reviewPage.css');
import React, { useContext } from 'react';
import { useFormikContext } from 'formik';
import { Link } from 'react-router-dom-v5-compat';
import { VaOnThisPage } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { Page } from '../routing';
import { FieldObject } from './types';
import { CheckboxField } from '../form-builder';

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
    // Revisit this in future ticket
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
    <label className="vads-u-margin-top--1 review-page__page-info__label-text">
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
          className={`review-page__page-info__value-text field-value field-value-level-${rank}`}
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
            <section key={page.id} className="review-page__page-info">
              <div className="review-page__page-heading vads-u-justify-content--space-between vads-l-row vads-u-border-bottom--1px vads-u-border-color--link-default">
                <h2 className="vads-u-font-size--h3 vads-u-flex--1 review-page__page-heading--text">
                  {page.title}
                </h2>

                <Link
                  to={page.path + '?edit=true&source=' + page.id}
                  className="vads-u-margin-bottom--1p5 review-page__page-heading--link"
                  id={`edit${page.id}`}
                  aria-label={`Edit ${page.title}`}
                >
                  Edit
                </Link>
              </div>
              {bufferFields(page.fields)}
            </section>
          );
        })}

        <div>
          <p className="vads-u-padding-y--2">
            <strong>Note:</strong> According to federal law, there are criminal
            penalties, including a fine and/or imprisonment for up to 5 years,
            for withholding information or for providing incorrect information.
            (See 18 U.S.C. 1001)
          </p>
          <CheckboxField
            required="You must accept the privacy policy before continuing."
            name="privacyAgreementAccepted"
            label="I have read and accept the privacy policy"
            description={null}
          >
            <p slot="description">
              Please read and accept the{' '}
              <a
                aria-label="Privacy policy, will open in new tab"
                target="_blank"
                href="/privacy-policy/"
              >
                privacy policy
              </a>
            </p>
          </CheckboxField>
        </div>
      </article>
    </Page>
  );
}
