import React, { useState } from 'react';
import {
  AddressField,
  Page,
  DateField,
  EmailField,
  FullNameField,
  PhoneField,
  SSNField,
  TextField,
} from '@department-of-veterans-affairs/va-forms-system-core';
import { VaButton } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { useFormikContext } from 'formik';

const ApplicantInformation = (props) => {
  const { values, setFieldValue } = useFormikContext();
  const [totalApplicants, setTotalApplicants] = useState([1]);

  const handleAddApplicant = () => {
    setTotalApplicants([...totalApplicants, totalApplicants.length + 1]);
  };

  const handleRemoveApplicant = () => {
    const applicantId = totalApplicants[totalApplicants.length - 1];
    for (const value in values) {
      if (value === `applicant${applicantId}`) {
        setFieldValue(value, undefined);
      }
    }
    setTotalApplicants(totalApplicants.slice(0, totalApplicants.length - 1));
  };

  return (
    <>
      <Page {...props} fieldName={[]}>
        <p>Applicant Information</p>
        {totalApplicants.map((applicant) => {
          return (
            <div className="vads-u-margin-y--1" key={applicant}>
              <p>Applicant {`${applicant}`}</p>
              <FullNameField
                className="vads-u-border-color--primary-alt-light vads-u-border-left--4px vads-u-padding-left--2 vads-u-padding-y--0p5 vads-u-margin-left--neg2p5"
                name={`applicant${applicant}.fullname`}
              />

              <SSNField
                className="vads-u-border-color--primary-alt-light vads-u-border-left--4px vads-u-padding-left--2 vads-u-padding-y--0p5 vads-u-margin-left--neg2p5"
                name={`applicant${applicant}.ssn`}
                label="Social Security Number"
              />

              <AddressField
                className="vads-u-border-color--primary-alt-light vads-u-border-left--4px vads-u-padding-left--2 vads-u-padding-y--0p5 vads-u-margin-left--neg2p5"
                name={`applicant${applicant}.address`}
                label="Applicant Address"
              />

              <EmailField
                className="vads-u-border-color--primary-alt-light vads-u-border-left--4px vads-u-padding-left--2 vads-u-padding-y--0p5 vads-u-margin-left--neg2p5"
                name={`applicant${applicant}.email`}
                label="Email"
              />

              <PhoneField
                className="vads-u-border-color--primary-alt-light vads-u-border-left--4px vads-u-padding-left--2 vads-u-padding-y--0p5 vads-u-margin-left--neg2p5"
                name={`applicant${applicant}.phoneNumber`}
                label="Phone Number"
              />

              <DateField
                name={`applicant${applicant}.dob`}
                label="Date of Birth"
              />

              <TextField
                className="vads-u-border-color--primary-alt-light vads-u-border-left--4px vads-u-padding-left--2 vads-u-padding-y--0p5 vads-u-margin-left--neg2p5"
                name={`applicant${applicant}.relationship`}
                label="Relationship to the veteran (i.e., spouse, child, stepchild)"
              />
            </div>
          );
        })}
        <VaButton onClick={handleAddApplicant} text="Add another Applicant" />
        {totalApplicants.length > 1 && (
          <VaButton onClick={handleRemoveApplicant} text="Remove Applicant" />
        )}
      </Page>
    </>
  );
};

export default ApplicantInformation;
