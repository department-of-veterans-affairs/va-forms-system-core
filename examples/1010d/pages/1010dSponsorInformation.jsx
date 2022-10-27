import React from 'react';
import {
  Page,
  AddressField,
  DateField,
  FullNameField,
  PhoneField,
  SSNField,
  TextField,
  RadioGroup,
} from '@department-of-veterans-affairs/va-forms-system-core';
import { useFormikContext } from 'formik';

const OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

const SponsorInformation = (props) => {
  const { values } = useFormikContext();

  return (
    <>
      <Page
        {...props}
        fieldNames={[
          'lastfullNameName',
          'ssn',
          'claimNumber',
          'address',
          'phoneNumber',
          'dob',
          'marraigeDate',
          'deceased',
          'deceasedDate',
          'deathDuringService',
        ]}
      >
        <p>Veteran Sponsor Information</p>
        <FullNameField
          className="vads-u-border-color--primary-alt-light vads-u-border-left--4px vads-u-padding-left--2 vads-u-padding-y--0p5 vads-u-margin-left--neg2p5"
          name="veteranFullName"
        />

        <SSNField
          className="vads-u-border-color--primary-alt-light vads-u-border-left--4px vads-u-padding-left--2 vads-u-padding-y--0p5 vads-u-margin-left--neg2p5"
          name="veteranSocialSecurityNumber"
          label="Social Security Number"
        />

        <TextField
          className="vads-u-border-color--primary-alt-light vads-u-border-left--4px vads-u-padding-left--2 vads-u-padding-y--0p5 vads-u-margin-left--neg2p5"
          name="vaFileNumber"
          label="VA File Number"
        />

        <AddressField
          className="vads-u-border-color--primary-alt-light vads-u-border-left--4px vads-u-padding-left--2 vads-u-padding-y--0p5 vads-u-margin-left--neg2p5"
          name="sponsorAddress"
        />

        <PhoneField
          className="vads-u-border-color--primary-alt-light vads-u-border-left--4px vads-u-padding-left--2 vads-u-padding-y--0p5 vads-u-margin-left--neg2p5"
          name="sponsorPhone"
          label="Phone Number"
        />

        <DateField name="vet.dob" label="Date of Birth" />

        <DateField name="vet.marraigeDate" label="Marraige Date" />

        <RadioGroup
          name="deceased"
          label="Is veteran deceased?"
          options={OPTIONS}
        />

        {values.deceased === 'yes' && (
          <div>
            <DateField name="vet.deceasedDate" label="Date of Death" />

            <RadioGroup
              name="deathDuringService"
              label="Did the vetran die while on active millitary service?"
              options={OPTIONS}
            />
          </div>
        )}
      </Page>
    </>
  );
};

export default SponsorInformation;
