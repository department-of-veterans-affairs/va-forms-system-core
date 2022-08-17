import React from 'react';
import {IntroductionPage, Page} from '@department-of-veterans-affairs/va-forms-system-core';

export default function BurialIntroduction(props) {
  return (
    <>
      <Page {...props}>
        <IntroductionPage/>
      </Page>
    </>
  )
}