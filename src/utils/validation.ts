import { FieldProps } from '../form-builder/types';
import { getMessage } from './i18n';

export type ValidationFunctionResult<T> = (
  value: T
) => void | undefined | string | Promise<any>;
export type ValidationFunction<T> = (
  props: FieldProps<T>
) => ValidationFunctionResult<T>;

export const required = <T>(
  props: FieldProps<T>
): ValidationFunctionResult<T> => {
  return (value: T) => {
    if (props.required && !value) {
      const errorMessage =
        typeof props.required === 'string'
          ? props.required
          : getMessage('required.default');
      return errorMessage;
    }

    return props.validate ? props.validate(value) : undefined;
  };
};
