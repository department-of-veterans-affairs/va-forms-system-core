import React from 'react';
import { useFormikContext } from 'formik';
import schema from './burial-form/schema';


export default function ReviewPage(props) {
  const state = useFormikContext();

  // mockup some data to review formik context
  const pageData = {
    pages: [
      {
        title: 'Claimant information',
        id: 'claimant-information',
        editUrl: '/claimant-information',
        fields: {
          "fullName": state.values.fullName
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