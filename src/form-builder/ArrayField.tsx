/* eslint-disable react/prop-types */
import React from 'react';
import { FieldArray, FieldHookConfig, useField } from 'formik';
import { VaButton } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
/*
This needs to:
- render a field array that can ingest a field name, an object schema, and formik state
*/

const ArrayField = (props): JSX.Element => {
  const { name, state, arrayFieldSchema } = props;

  return (
    <FieldArray name={name}>
      {({ remove, push }) => (
        <div>
          {state?.values?.[name]?.length > 0 &&
            state?.values?.[name]?.map((entry, index) => (
              <div key={index}>
                {props.children.map((child) => {
                  const indexedName = child.props.name.replace('index', index);
                  return React.cloneElement(child, { name: indexedName });
                })}
                <button type="button" onClick={() => remove(index)}>
                  remove
                </button>
              </div>
            ))}
          <button type="button" onClick={() => push(arrayFieldSchema)}>
            add
          </button>
          <VaButton
            onClick={() => push(arrayFieldSchema)}
            text="Add another Service Period"
            secondary
          />
        </div>
      )}
    </FieldArray>
  );
};

export default ArrayField;
