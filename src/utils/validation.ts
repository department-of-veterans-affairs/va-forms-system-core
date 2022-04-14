import { FieldProps } from '../form-builder/types';
import { getMessage } from './i18n';

export type ValidationFunctionResult<T> =
  | void
  | undefined
  | string
  | Promise<any>;

export type ValidationFunction<T> = (
  value: T,
  props: FieldProps<T>
) => ValidationFunctionResult<T>;

export type ValidationFunctionArray<T> = (
  value: T[],
  props: FieldProps<T>
) => ValidationFunctionResult<T>;

export const validationChainMock = <T>(
  props: FieldProps<T>
): ((value: T[]) => ValidationFunctionResult<T>) => {
  return (value: T[]) => {
    if (props.required && value?.length <= 0) {
      const errorMessage =
        typeof props.required === 'string'
          ? props.required
          : getMessage('required.default');
      return errorMessage;
    }

    return props.validate ? props.validate(value) : undefined;
  };
};

export const chainArrayValidations = <T>(
  props: FieldProps<T>,
  validations: ValidationFunctionArray<T>[]
): ((value: T[]) => ValidationFunctionResult<T>) => {
  return (value: T[]) => {
    // Return the error message from the first validation function that fails.
    const errorMessage = validations
      .map((v) => v(value, props))
      .filter((m) => m)[0];
    if (errorMessage) return errorMessage;

    // None of the built-in validation functions failed; run the validate
    // function passed to the component.
    return props.validate ? props.validate(value) : undefined;
  };
};

export const chainValidations = <T>(
  props: FieldProps<T>,
  validations: ValidationFunction<T>[]
): ((value: T) => ValidationFunctionResult<T>) => {
  return (value: T) => {
    // Return the error message from the first validation function that fails.
    const errorMessage = validations
      .map((v) => v(value, props))
      .filter((m) => m)[0];
    if (errorMessage) return errorMessage;

    // None of the built-in validation functions failed; run the validate
    // function passed to the component.
    return props.validate ? props.validate(value) : undefined;
  };
};

export const required = <T>(
  value: T,
  props: FieldProps<T>
): ValidationFunctionResult<T> => {
  if (props.required && !value) {
    const errorMessage =
      typeof props.required === 'string'
        ? props.required
        : getMessage('required.default');
    return errorMessage;
  }

  return props.validate ? props.validate(value) : undefined;
};

export const requiredLength = <T>(
  value: T[],
  props: FieldProps<T>
): ValidationFunctionResult<T> => {
  if (props.required && value?.length <= 0) {
    const errorMessage =
      typeof props.required === 'string'
        ? props.required
        : getMessage('required.default');
    return errorMessage;
  }

  return props.validate ? props.validate(value) : undefined;
};
