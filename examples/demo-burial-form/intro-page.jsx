import React from 'react';
import { Page, IntroductionPage } from '@department-of-veterans-affairs/va-forms-system-core';

export default function FormIntroductionPage() {
  return (
    <>
      <Page title='' nextPage='/claimant-information'>
        <IntroductionPage />
      </Page>
    </>
  )
}