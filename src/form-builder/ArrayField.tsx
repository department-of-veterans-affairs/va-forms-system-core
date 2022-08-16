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

  const removeEntry = (remove: any, index: number) => {
    return;
  }

  const addEntry = (push: any) => {
    return;
  }

  const editEntry = (index: number) => {
    visibleIndex = index;
  }

  return (
    <div>
      props.entries.length && (
      <FieldArray name={props.name}>
        {({ insert, remove, push }) => (
          <div>
            {/*{props.entries.map((entry: any, index: number) => (*/}
            {/*  <div key={index}>*/}
            {/*    {visibleIndex === index ? (*/}
            {/*      // <div slot="expanded"></div>*/}
            {/*      <button onClick={() => removeEntry(() => {return}, index)}>Remove</button>*/}
            {/*    ) : (*/}
            {/*       // <div slot="minimized"></div>*/}
            {/*       <button onClick={() => editEntry(index)}>Edit</button>*/}
            {/*     )}*/}
            {/*  </div>*/}
            {/*))}*/}
            {/*<button onClick={() => addEntry(() => {return})}>Add</button>*/}
          </div>
        )}
      </FieldArray>
      )
    </div>
  );
};

export default ArrayField;
