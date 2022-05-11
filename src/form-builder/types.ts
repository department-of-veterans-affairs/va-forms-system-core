import { FieldHookConfig } from 'formik';

export type FieldProps<V> = Omit<FieldHookConfig<V>, 'required'> & {
  label: string;
  id?: string;
  /**
   * If `required` is true, the default message will be used. If `required` is a
   * string, it will be used as the error message.
   */
  required?: boolean | string;
};

export type CheckboxProps = FieldProps<string> & {
  checked?: boolean;
  content?: string;
  onValueChange?: (e: Event) => void;
  value?: boolean;
};

export type RadioGroupProps = FieldProps<string> & {
  name: string;
  options: React.ReactElement<RadioItemProps>[];
  onChange: (v: string) => void;
};

export type RadioItemProps = {
  'aria-describedby': string;
  checked: boolean;
  label: string;
  name: string;
  value: string;
  radioOptionSelected: () => void;
};

export type CheckboxGroupProps = FieldProps<string> & {
  options: CheckboxProps[];
};

export type FullNameProps = FieldProps<string> & {
  /**
   * @defaultValue
   * The default is `fullName` unless {@link FullNameProps.fieldName}
   * is passed with custom name.
   */
  fieldName?: string | undefined;
}

export type AddressProps = FieldProps<string>

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