import { FieldInputProps } from 'formik';
import {
  FieldProps,
  RadioGroupProps,
  RadioItemProps,
  SelectProps,
} from '../form-builder';
import { FieldObject, PageObject } from './types';

type typeList = RadioGroupProps | FieldProps<string> | SelectProps;

export const gatherFieldData = (
  listOfPages: PageObject[],
  field: FieldInputProps<any>,
  props: typeList
) => {
  if (listOfPages?.length <= 0) return;
  // Identify which page to edit
  for (let i = 0; i < listOfPages.length; i++) {
    if (
      typeof listOfPages[i]?.fieldNames !== 'undefined' &&
      (listOfPages[i]?.fieldNames?.length as number) > 0
    ) {
      for (let j = 0; j < (listOfPages[i]?.fieldNames?.length as number); j++) {
        const findExistingFieldIndex = listOfPages[i].fields?.findIndex(
          (field) => field.name === props.name
        );
        const fieldName = listOfPages[i]?.fieldNames?.[j] as string;

        if (props.name.includes(fieldName) && findExistingFieldIndex < 0) {
          const fieldData: FieldObject = {
            name: props.name,
            label: props.label,
          };
          if (field.value) {
            fieldData.value = field.value;
          }
          if ((props as RadioGroupProps)?.options) {
            const options = (props as RadioGroupProps)
              ?.options ;
            const propOptions = options.map((option) => {
              return {
                label: option.label ,
                value: option.value ,
              };
            });

            fieldData.options = propOptions;
          }
          if ((props as SelectProps)?.children) {
            // map options
            const propOptions = (
              (props as SelectProps)?.children as HTMLOptionElement[]
            ).map(() => {
              return {
                value: props.value as string,
                label: props.children as string,
              };
            });
            fieldData.options = propOptions;
          }
          listOfPages[i].fields?.push(fieldData);
        } else if (field.value && findExistingFieldIndex >= 0) {
          // make a copy
          const fieldData = { ...listOfPages[i].fields[findExistingFieldIndex] };
          if (field.value) {
            fieldData.value = field.value;
          }
          listOfPages[i].fields[findExistingFieldIndex] = fieldData;
        }
      }
    }
  }
  return listOfPages;
};
