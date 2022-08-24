/* eslint-disable react/prop-types */
import React from 'react';
import { FieldArray, FieldHookConfig, useField } from 'formik';
import { VaButton } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
/*
This needs to:
- render a field array that can ingest a field name, an object schema, and formik state
- collapse entries that are not currently active
  - it should collapse entries when "add another" is clicked
  - potentially clone the array and add a property to each entry that expands or collapses it?
*/

const ArrayField = (props): JSX.Element => {
  const { name, state, arrayFieldSchema } = props;

  /**
   * Pushes a new entry into the array. Loops through each current entry and
   * sets isOpen to false so the collapsed view can be toggled on.
   * @param pushHandler push helper received from Formik's FieldArray
   * @param schema the arrayFieldSchema passed in as a prop
   */
  const onAddHandler = (pushHandler, schema) => {
    state.values?.[name].forEach((entry) => {
      entry.isOpen = false;
    });
    pushHandler(schema);
  };

  return (
    <FieldArray name={name}>
      {({ remove, push }) => (
        <div>
          {state?.values?.[name]?.length > 0 &&
            state?.values?.[name]?.map((entry, index) =>
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
                </div>
              ) : (
                <div key={index}>
                  {props.children.map((child) => {
                    const indexedName = child.props.name.replace(
                      'index',
                      index
                    );
                    return React.cloneElement(child, { name: indexedName });
                  })}
                  <button type="button" onClick={() => remove(index)}>
                    remove
                  </button>
                </div>
              )
            )}
          <VaButton
            onClick={() => onAddHandler(push, arrayFieldSchema)}
            text="Add another Service Period"
            secondary
          />
        </div>
      )}
    </FieldArray>
  );
};

export default ArrayField;
