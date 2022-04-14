import React from 'react';
import {
  useField,
  FieldHookConfig,
  FieldArray,
  useFormikContext,
} from 'formik';

import {
  chainArrayValidations,
  chainValidations,
  required,
  requiredLength,
  validationChainMock,
} from '../utils/validation';
import CheckboxField from './CheckboxField';
import { CheckboxGroupProps, CheckboxProps } from './types';

// import CheckboxGroup from 'local-web-components/CheckboxGroup';
import CheckboxGroup from '@department-of-veterans-affairs/component-library/CheckboxGroup';

const storeInheritedValues = (fieldValue: string[] | undefined) => {
  if (fieldValue?.length) {
    const returnKeys = fieldValue.reduce(
      (
        newObj: { [key: string]: boolean },
        current
      ): { [key: string]: boolean } => {
        newObj[current] = true;
        return newObj;
      },
      {}
    );
    return returnKeys;
  }
  return {};
};

const CheckboxFieldGroup = (props: CheckboxGroupProps): JSX.Element => {
  const withValidation = {
    ...props,
    validate: validationChainMock(props), // chainValidations(props, [required]),
  };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<string[]>
  );
  const inheritedValues = storeInheritedValues(field.value);

  return (
    <>
      <CheckboxGroup
        id={props.id}
        label={props.label}
        required={!!props.required}
        name={props.name}
        values={inheritedValues}
        options={props.options}
        onValueChange={(option: CheckboxProps) => {
          // convert field to array
          let fieldArray: string[] = [...field.value];

          const fieldIndex: string | undefined = fieldArray.find(
            (fieldOption) => fieldOption === option.value
          );
          if (fieldIndex) {
            // field.value.
            fieldArray = fieldArray.filter((fieldOption) => {
              return fieldOption !== option.value;
            });
          } else {
            fieldArray.push(option.value);
          }
          helpers.setTouched(true, false);
          helpers.setValue(fieldArray, true);
        }}
        errorMessage={(meta.touched && meta.error) || undefined}
      ></CheckboxGroup>
    </>
  );
};

export default CheckboxFieldGroup;
