import React, {
  JSXElementConstructor,
  ReactElement,
  ReactPortal,
  useContext,
  useEffect,
} from 'react';
import { FieldObject } from '../routing';
import { PageContext } from './PageContext';

const TYPES = [
  'AddressField',
  'CheckboxField',
  'CheckboxFieldGroup',
  'DateField',
  'EmailField',
  'FullNameField',
  'OMBInfo',
  'PhoneField',
  'RadioGroup',
  'SelectField',
  'SSNField',
  'TextField',
];

export const matchType = (elementType: React.JSXElementConstructor<any>) => {
  let typeMatch = null;

  if (elementType?.name) {
    for (let i = 0; i < TYPES.length; i++) {
      if (elementType.name === TYPES[i]) {
        typeMatch = true;
        break;
      }
    }
  }
  return typeMatch;
};

export function createOptionsFromChildren(children: React.ReactNode) {
  let options: {
    key: string;
    label: string;
  }[] = [];

  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }

    if (element.props?.children?.length > 0) {
      const option = {
        key: element.key as string,
        label: element.props.children as string,
      };

      options = [...options, option];
    }
  });

  return options;
}

export function createFieldDataFromChildren(
  children: React.ReactNode,
  rank = 0,
  fields: FieldObject[] = []
): FieldObject[] {
  React.Children.forEach(children, (element) => {
    // 1 check if valid element
    // 2 check if there are children to drill into

    if (!React.isValidElement(element) || !element.props?.name) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      const elementCondition = element as
        | ReactElement<any, string | JSXElementConstructor<any>>
        | ReactPortal;
      if (elementCondition?.props?.children) {
        fields = [
          ...fields,
          ...createFieldDataFromChildren(elementCondition.props.children, rank),
        ];
      }
      return;
    }

    const splitEl = element.props?.name.split('.');
    let fieldName = '';
    if (rank > 0) {
      // field name can be a flat string property
      fieldName = splitEl.length > 1 ? splitEl[1] : element.props.name;
    } else {
      // field name can be a flat string property
      fieldName = splitEl.length > 0 ? splitEl[0] : element.props.name;
    }

    // find the field if it already exists and update it
    const fieldIndex = fields.findIndex((field) => field.name === fieldName);
    let field: FieldObject;

    if (fieldIndex < 0) {
      field = {
        name: fieldName,
        label: element.props.label,
      };
    } else {
      field = { ...fields[fieldIndex] };
    }

    // add any children to the field
    if (
      element.props.children &&
      (element.type as JSXElementConstructor<any>)?.name === 'SelectField'
    ) {
      field.options = createOptionsFromChildren(element.props.children);
    } else if (element.props.children) {
      field.children = createFieldDataFromChildren(
        element.props.children,
        rank + 1
      );
    } else if (!element.props?.children && splitEl.length > 1 && rank === 0) {
      // manual functionality designed for flat level object fields like relationship.type
      // shallow child: this may need to be updated
      // later to include more than one nested level
      const fieldChildName =
        splitEl.length > 1 ? splitEl[1] : element.props.name;
      const fieldChildIndex = fields[fieldIndex]?.children?.findIndex(
        (field) => field.name === fieldChildName
      );

      if (fieldChildIndex && fieldChildIndex < 0) {
        const fieldChild: FieldObject = {
          name: fieldChildName,
          label: element.props.label,
        };
        field.children = [...(field?.children || []), fieldChild];
      }
    }

    // set the field based on wether it already exists
    if (fieldIndex < 0) {
      fields.push(field);
    } else {
      fields[fieldIndex] = field;
    }
  });

  return fields;
}

function ComponentReader(props: {
  fieldName: string;
  children: JSX.Element | JSX.Element[] | Element;
}): JSX.Element {
  const { listOfPages, setListOfPages } = useContext(PageContext);
  const childrenLength = React.Children.count(props.children);

  useEffect(() => {
    const listOfPagesCopy = listOfPages;
    const fieldData = createFieldDataFromChildren(props.children, 1);

    listOfPagesCopy.forEach((page, index) => {
      const indexOfField = page.fields.findIndex(
        (field) => field.name === props.fieldName
      );
      if (indexOfField >= 0) {
        page.fields[indexOfField].children = fieldData;
      }
    });

    if (listOfPagesCopy.length > 0) {
      setListOfPages(listOfPagesCopy);
    }
  }, [props.fieldName, childrenLength]);

  return <>{props.children}</>;
}

export default ComponentReader;
