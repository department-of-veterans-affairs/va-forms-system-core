import React from 'react';
import {
  FullNameField,
  Page,
  RadioGroup,
} from '@department-of-veterans-affairs/va-forms-system-core';

export default function ClaimantInformationPage() {
  return (
    <>
      <Page 
        title='Step 1 of 6: Claimant Information'
        nextPage='/page-two'
        //replace when veteran info page is ready
        //nextPage='/veteran-information'
        prevPage='/'
        >
        <FullNameField name='claimantFullName'/>
        <RadioGroup
          name='relationship.type'
          label='Relationship to the deceased Veteran'
          required
          options={
            [
              {label: 'Spouse', value: 'Spouse', key: 1, checked: false},
              {label: 'Child', value: 'Child', key: 2, checked: false},
              {label: 'Parent', value: 'Parent', key: 3, checked: false},
              {label: 'Executor/Administrator of estate', value: 'Executor/Administrator of estate', key: 4, checked: false},
              {label: 'Other', value: 'Other', key: 5, checked: false},
            ]
          }
        />
      </Page>
    </>
  )
}