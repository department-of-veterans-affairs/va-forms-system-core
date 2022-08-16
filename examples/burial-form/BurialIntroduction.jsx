import React from 'react';
import { Page, IntroductionPage } from '@department-of-veterans-affairs/va-forms-system-core';
import ArrayField from "@department-of-veterans-affairs/va-forms-system-core/form-builder/ArrayField";

export default function BurialIntroduction(props) {
  return (
    <>
      <Page {...props}>
        <ArrayField label="" entries={} collapsedView={} expandedView={} />
        <IntroductionPage />
      </Page>
    </>
  )
}