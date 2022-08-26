import { FieldHookConfig } from 'formik';
import React from 'react';

export type FieldProps<V> = Omit<FieldHookConfig<V>, 'required'> & {
  label: string;
  id?: string;
  onValueChange?: (e: Event) => void;
  /**
   * If `required` is true, the default message will be used. If `required` is a
   * string, it will be used as the error message.
   */
  required?: boolean | string;
};

export type CheckboxProps = FieldProps<string> & {
  checked?: boolean;
  content?: string;
  description?: string | null;
  onValueChange?: (e: Event) => void;
  value?: boolean;
};

export type RadioGroupProps = FieldProps<string> & {
  name: string;
  options: RadioItemProps[];
  onChange: (v: string) => void;
};

export type RadioItemProps = {
  'aria-describedby': string;
  label: string;
  name: string;
  value: string;
  onRadioOptionSelected: () => void;
};

export type CheckboxGroupProps = FieldProps<string> & {
  options: CheckboxProps[];
};

export type SelectProps = FieldProps<string> & {
  onVaSelect?: (e: CustomEvent) => void;
  children: HTMLOptionElement[] | unknown;
};

/**
 * OMBInfo properties
 *
 * @example
 * ```
 * {
 *    expDate: 'My Example Title' required
 *    resBurden: 1
 *    ombNumber: '123-ABC'
 * }
 * ```
 */
export interface OMBInfoProps {
  resBurden?: number;
  ombNumber?: string;
  expDate: string;
}

/**
 *
 * @remarks
 * The `name` prop must be passed in FullNameField component as it is used as object name.
 * @example
 * Here's a simple example:
 * ```
 * // <FullNameField name="fullName">
 * {
 *    fullName: {
 *      // fields
 *    }
 * }
 * ```
 *
 */
export type FullNameProps = FieldProps<string> & {
  legend: string;
  legendClasses: string;
};

export type AddressProps = FieldProps<string> & {
  legend: string;
  legendClasses: string;
};

export interface Address {
  isMilitaryBaseOutside?: boolean;
  country: string;
  streetAddress: string;
  streetAddressLine2?: string;
  streetAddressLine3?: string;
  city: string;
  state: string;
  postalCode: string;
}

export type DateProps = FieldProps<string> & {
  isMemorableDate?: boolean;
};

export interface ArrayFieldProps {
  name: string;
  buttonLabel: string;
  values: Record<string, unknown>;
  arrayFieldSchema: Record<string, unknown>;
  children: React.ReactElement;
}
