import React, { useContext } from 'react';
import {Navigate, Route, useLocation} from 'react-router-dom'
import {FormRouter, RouterContext} from '@department-of-veterans-affairs/va-forms-system-core';
import BurialIntroduction from './BurialIntroduction';
import ClaimantInformation from './ClaimantInformation';
import VeteranInformation from './VeteranInformation';
import BurialInformation from './BurialInformation';
import MilitaryServiceHistory from './MilitaryServiceHistory';
import PreviousNames from './PreviousNames';
import PlotAllowance from './PlotAllowance';
import BurialAllowance from "./BurialAllowance";
import BenefitsSelection from './BenefitsSelection';
import ClaimantContactInformation from "./ClaimantContactInformation";
import ReviewPage from './ReviewPage';
import { useField } from 'formik';

const NoMatch = (props) => (
  <main style={{ padding: '1rem' }}>
    <p>There is nothing here! {props.name}</p>
  </main>
);

const RequireConditionalProperty = (props) => {
  const { listOfRoutes } = useContext(RouterContext),
        currentLocation = useLocation(),
        findIndex = listOfRoutes.indexOf(
          listOfRoutes.filter((item) => item.path === currentLocation.pathname)[0]
        ),
        condition = props?.condition || null,
        field = condition ? useField(condition) : null;

  let matchNext;
  let i = findIndex >= 0 ? findIndex : 0;

  while (i >= findIndex && i < listOfRoutes.length) {
    if (!listOfRoutes[i].conditional || listOfRoutes[i].isShown) {
      matchNext = listOfRoutes[i];
      break;
    }
    i++;
  }
  const getViableIndex = listOfRoutes.indexOf(matchNext);

  return (field && field[0].value === true)
  // use next in list of routes
  ? props.children : <Navigate to={listOfRoutes[getViableIndex].path}/>;
}

const mapProps = (values, actions) => {
}

const BurialApp = (props) => {
  // Let users extract and use formData here
  // initialValues would ideally be provided by a json-schema

  return (
    <div className='vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column'>
      <FormRouter basename={props.basename}
        formData={props.initialValues}
        title="Burials Example"
        transformForSubmit={mapProps}
        >
        <Route index element={<BurialIntroduction title="Introduction Page" />} />
        <Route path="/claimant-information" element={<ClaimantInformation title="Claimant Information" />} />
        <Route path="/veteran-information" element={<VeteranInformation title="Deceased Veteran Information" />} />
        <Route path="/veteran-information/burial" element={<BurialInformation title="Deceased Veteran Information" />} />
        <Route path="/military-history/service-periods" element={<MilitaryServiceHistory title="Military Service History" />} />
        <Route path="/military-history/previous-names" element={<PreviousNames title="Military history" />} />
        <Route path="/benefits/selection" element={<BenefitsSelection title="Benefits Selection" />} />
        <Route path="/benefits/burial-allowance" element={
          <RequireConditionalProperty type="conditional" condition={'benefitsSelection.burialAllowance'}>
            <BurialAllowance title="Benefits Selection: Burial Allowance" />
          </RequireConditionalProperty>}
        />
        <Route path="/benefits/plot-allowance" element={
          <RequireConditionalProperty type="conditional" condition={'benefitsSelection.plotAllowance'}>
            <PlotAllowance title="Benefits Selection" />
          </RequireConditionalProperty>}
        />
        <Route path="/claimant-contact-information" element={<ClaimantContactInformation title="Claimant contact information" />} />
        <Route path="/review-and-submit" element={<ReviewPage title="Review Your Application" />} />
        <Route path="*" element={<NoMatch name="No Routes for App" />} />
      </FormRouter>
    </div>
  )
}

export default BurialApp