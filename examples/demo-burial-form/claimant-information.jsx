import React from 'react';
import {
  FullNameField,
  RadioGroup,
  Page,
  DebuggerView,
} from '@department-of-veterans-affairs/va-forms-system-core';

export default function ClaimantInformation() {
  const radioOptions =             [
    {label: 'Spouse', name: 'spouse', value: 'spouse', key: 1, checked: true}, 
    {label: 'Child', name: 'child', value: 'child', key: 2, checked: false},
    {label: 'Parent', name: 'parent', value: 'parent', key: 3, checked: false},
    {label: 'Executor/Administrator of estate', name: 'execAdmin', value: 'execAdmin', key: 4, checked: false},
    {label: 'Other', name: 'other', value: 'other', key: 5, checked: false}
  ];

  return (
    <>
      <Page title='Step 1 of 6: Claimant Information' nextPage='/veteran-information' prevPage='/'>
        <p>You aren&apos;t required to fill in all fields, but we can review your application faster if you provide more information.</p>
        <FullNameField name='fullName'/>
        <RadioGroup 
          label='Relationship to the deceased Veteran' 
          name='claimaintRadio'
          required
          options={radioOptions} 
        />
      </Page>
      {/* take out the debugger when you're finished */}
      <DebuggerView />
    </>
  )
}