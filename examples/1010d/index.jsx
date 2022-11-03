import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CompatRouter, Route } from 'react-router-dom-v5-compat';
import {
  FormRouter,
  ConditionalRoute,
  ReviewPage,
  ErrorPage,
} from '@department-of-veterans-affairs/va-forms-system-core';
import IntroductionPage from './pages/1010dIntro';
import SponsorInformation from './pages/1010dSponsorInformation';
import ApplicantInformation from './pages/1010dApplicantInformation';
import DebugView from './pages/1010dDebuggerView';
import ConfirmationPage from './pages/1010dConfirmation';
const NoMatch = (props) => {
  return (
    <main style={{ padding: '1rem' }}>
      <p>There is nothing here! {props.name}</p>
    </main>
  );
};

const ControlSubApp = (props) => {
  return (
    <div className="vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column">
      <BrowserRouter basename={props.basename}>
        <CompatRouter>
          <FormRouter
            formData={props.initialValues}
            uiFormData={props.uiValues}
            title="10-10D CHAMPVA"
            formUri="vha_10_10d"
            formNumber="vha_10_10d"
          >
            <Route index element={<IntroductionPage title="Introduction" />} />
            <Route
              path="/veteran-information"
              element={<SponsorInformation name="Page 1" />}
            />
            <Route
              path="/application-information"
              element={<ApplicantInformation />}
            />
            <Route path="/debug" element={<DebugView />} />
            <Route
              path="/review-and-submit"
              element={<ReviewPage title="Review Your Application" />}
            />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NoMatch name="No Routes for App" />} />
          </FormRouter>
        </CompatRouter>
      </BrowserRouter>
    </div>
  );
};

export default ControlSubApp;
