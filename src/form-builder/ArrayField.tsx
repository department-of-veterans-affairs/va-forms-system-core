import React, { ReactElement } from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { VaButton } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { ArrayFieldProps } from './types';

/**
 * The ArrayField accepts props.children and renders them for each entry in whichever array field is
 * specified in props.name. This component provides a wrapper around FieldArray so end users do not
 * have to manage looping through their array, or working with Formik helpers, instead allowing them to
 * just focus on what their React components will look like.
 *
 * @param props - will include the field name as props.name,
 * the formik state as props.state, and the array entry object schema as props.arrayFieldSchema
 *
 * @returns - FieldArray component provided by Formik
 */

const ArrayField = (props: ArrayFieldProps): JSX.Element => {
  const { name, values, arrayFieldSchema, buttonLabel } = props;
  const { setFieldValue } = useFormikContext();

  /**
   * Pushes a new entry into the array. Loops through each current entry and
   * sets isOpen to false so the collapsed view can be toggled on.
   * @param pushHandler push helper received from Formik's FieldArray
   * @param schema the arrayFieldSchema passed in as a prop
   */
  const onAddHandler = (
    pushHandler: (obj: Record<string, unknown>) => void,
    schema: Record<string, unknown>
  ) => {
    values?.[name].forEach((entry: Record<string, unknown>) => {
      entry.isOpen = false;
    });
    pushHandler(schema);
  };

  /**
   * Creates a copy of the array field stored in Formik and
   * sets entry.isOpen to true for the matching index. Then,
   * uses setFieldValue to update the field itself in Formik
   * @param idx index of entry that needs to be expanded
   */
  const onEditHandler = (idx: number) => {
    const fieldArrayOfObjects = [...values?.[name]];
    fieldArrayOfObjects.forEach((entry, index) => {
      if (index === idx) {
        entry.isOpen = true;
      } else {
        entry.isOpen = false;
      }
    });
    setFieldValue(name, fieldArrayOfObjects);
  };

  return (
    <FieldArray name={name}>
      {({ remove, push }) => (
        <div>
          {values?.[name]?.length > 0 &&
            values?.[name]?.map(
              (entry: Record<string, unknown>, index: number) =>
                entry.isOpen === false ? (
                  <div
                    className="vads-u-background-color--gray-light-alt vads-u-padding--2 vads-u-margin-y--1"
                    key={index}
                  >
                    <strong className="vads-u-margin--0">
                      {entry.serviceBranch}
                    </strong>
                    <p className="vads-u-margin--0">
                      {entry.dateRange.from} - {entry.dateRange.to}
                    </p>
                    <VaButton
                      secondary
                      text="Edit"
                      onClick={() => onEditHandler(index)}
                    />
                  </div>
                ) : (
                  <div key={index}>
                    {React.Children.map(
                      props.children,
                      (child: ReactElement) => {
                        const indexedName = child?.props.name.replace(
                          'index',
                          index
                        );
                        return React.cloneElement(child, {
                          name: indexedName,
                        });
                      }
                    )}
                    <VaButton
                      onClick={() => remove(index)}
                      text={`Remove ${buttonLabel}`}
                    />
                  </div>
                )
            )}
          <VaButton
            onClick={() => onAddHandler(push, arrayFieldSchema)}
            text={`Add another ${buttonLabel}`}
            secondary
          />
        </div>
      )}
    </FieldArray>
  );
};

export default ArrayField;
