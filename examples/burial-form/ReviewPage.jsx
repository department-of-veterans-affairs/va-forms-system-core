import React from 'react';
import { useFormikContext } from 'formik';
import schema from './burial-form/schema';


export default function ReviewPage(props) {
  const state = useFormikContext();

  const mapData = (name, formValues, schema) => {
    const formikValue = formValues[name];
    const originalSchemaValue = schema[name]

    if (formikValue && originalSchemaValue) {
      if (typeof formikValue === "object") {
        // drill into the item if it's an object
        return {
          [name]: mapData(item, formikValue, originalSchemaValue)
        }
        // for (item in formikValue) {
        //   return mapData(item, formikValue, originalSchemaValue)
        // }
      }
      else {
        return {
          ...originalSchemaValue,
          value: formikValue
        }
      }
    };
  }

  // mockup some data to review formik context
  const pageData = {
    pages: [
      {
        title: 'Claimant information',
        id: 'claimant-information',
        fields: {
          "fullName": mapData("fullName", state.values, schema.properties)
        }
      },
      // {
      //   title: 'Claimant information',
      //   id: 'claimant-information',
      //   fields: {
      //     "fullName": mapData("fullName", state)
      //   }
      // },
      {}
    ]
  }

  return (
    <>
      <Page {...props}>
        <nav>
          <ul>
            <li>
              
            </li>
          </ul>
        </nav>
      </Page>
      <DebuggerView />
    </>
  )
}