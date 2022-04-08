import React from 'react';
import { FieldArray, useFormikContext } from 'formik';

import CheckboxField from './CheckboxField';
import { CheckboxGroupProps } from './types';

const CheckboxFieldGroup = (props: CheckboxGroupProps): JSX.Element => {
  const formikContext = useFormikContext();
  const { fieldProps, checkboxes } = props;

  return (
    <>
      <legend id={`checkbox-group-${fieldProps.name}`}>
        {fieldProps.label}
      </legend>
      <div role="group">
        <FieldArray
          name={fieldProps.name}
          render={(arrayHelpers) => (
            <>
              {checkboxes.map((prop) => (
                // checkboxField has a required property of checked?
                <CheckboxField
                  key={`checkbox-group-${fieldProps.name}-${prop.name}`}
                  name={prop.name}
                  label={prop.label}
                  required={prop?.required}
                  checked={false}
                  // onChange={(e: any) => {
                  //   // push to or remove from field array
                  //   if (e.target.checked) {
                  //     arrayHelpers.push(prop.value);
                  //   } else {
                  //     const idx = values.tags.indexOf(prop.value);
                  //     arrayHelpers.remove(idx);
                  //   }
                  // }}
                />
              ))}
            </>
          )}
        />
      </div>
    </>
  );
};

export default CheckboxFieldGroup;
