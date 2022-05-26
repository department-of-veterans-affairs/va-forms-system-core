import React from 'react';
import { Page, IntroductionPage } from '@department-of-veterans-affairs/va-forms-system-core';

export default function FormIntroductionPage(props) {
  return (
    <>
      <Page {...props} nextPage="/page-one">
        <IntroductionPage />
      </Page>
    </>
  )
}