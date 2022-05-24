import React from 'react';
import { Route } from 'react-router-dom'
import { FormRouter } from '@department-of-veterans-affairs/va-forms-system-core';
import FormIntroductionPage from './intro-page';
import ClaimantInformation from './claimant-information';

const NoMatch = (props) => (
  <main style={{ padding: '1rem' }}>
    <p>There is nothing here! {props.name}</p>
  </main>
);

const FormApp = (props) => {
  // Let users extract and use formData here
  // initialValues would ideally be provided by a json-schema
  return (
    <div className='vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column'>
      <FormRouter basename={props.basename} formData={props.initialValues} title='Apply for Burial Benefits'>
        <Route index element={<FormIntroductionPage />} />
        <Route path='/claimant-information' element={<ClaimantInformation />} />
        {/* <Route path='/veteran-information' element={<VeteranInformation />} /> */}
        <Route path='*' element={<NoMatch name='No Routes for App' />} />
      </FormRouter>
    </div>
  )
}

export default FormApp