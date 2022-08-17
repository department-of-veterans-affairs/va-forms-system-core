import React from 'react';
import { FieldArray, FieldHookConfig, useField } from 'formik';

import { chainValidations, requiredValue } from '../utils/validation';

import { ArrayProps } from './types';

const ArrayField = (props: ArrayProps): JSX.Element => {
  // component re-renders these values per form input inside the form
  const withValidation = {
    ...props,
    validate: chainValidations(props, [requiredValue]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<any[]>
  );

  if (!field.value) {
    field.value = props.entries;
  }

  let visibleIndex = 0;

  const removeEntry = (remove: (index: number) => void, index: number) => {
    props.entries.splice(index, 1);
    remove(index);
  };

  const addEntry = (push: (entry: any) => void) => {
    const newEntry = props.createEntry();
    push(newEntry);
  };

  const editEntry = (index: number) => {
    visibleIndex = index;
  };

  return (
    <div>
      <FieldArray name={props.name}>
        {({ remove, push }) => (
          <div>
            {props.entries.length &&
              props.entries.map((entry: any, index: number) => (
                <div key={index}>
                  {visibleIndex === index ? (
                    <>
                      {React.cloneElement(props.expandedView, { entry })}
                      <button onClick={() => removeEntry(remove, index)}>
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      {React.cloneElement(props.collapsedView, { entry })}
                      <button onClick={() => editEntry(index)}>Edit</button>
                    </>
                  )}
                </div>
              ))}
            <button onClick={() => addEntry(push)}>Add</button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default ArrayField;
