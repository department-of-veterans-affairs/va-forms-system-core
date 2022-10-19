import React from 'react';
import { Page } from '@department-of-veterans-affairs/va-forms-system-core';

const IntroductionPage = (props) => {
  return (
    <>
      <Page {...props}>
        <p>
          The following persons are eligible for CHAMPVA benifits,{' '}
          <strong>
            providing they are <i>NOT</i> eligible for DoD TRICARE benifits:
          </strong>
        </p>
        <ul>
          <li>
            <div>
              <p>
                the spouse or child of a veteran who has been rated by a VA
                regional office as having a permanent and total
                service-connected condition/disability
              </p>
            </div>
          </li>
          <li>
            <div>
              the surviving spouse or child of a veteran who died as a result of
              a VA-rated service-connected condition; who, at the time of death,
              was reated permanently and totally disabled from a
              service-connected condition
            </div>
          </li>
          <li>
            <div>
              the surviving spouse or child of a person who died in the line of
              duty and not due to misconduct
            </div>
          </li>
        </ul>
        <p>
          <strong>Medicare Impact.</strong> If you are eligible or become
          eligible for Medicare Part A and you are under age 65, you MUST have
          Part B to be covered by CHAMPVA. Effective October 1, 2001, CHAMPVA
          benefits were extended to beneficiaries age 65 or older. If you are
          eligible for Medicare Part A and you are age 65 or older, you are
          required to have Part B to be covered by CHAMPVA if your 65th birthday
          was on or after June 5, 2001, or if you were already enrolled in Part
          B prior to June 5, 2001.{' '}
        </p>
        <p>
          <strong>Service-connected condition/disability</strong> Refers to a VA
          determination that a veteran illness or injury was incurred or
          aggravated while on active duty in military service and resulted in
          some degree of disability.
        </p>
        <p>
          <strong>Sponsor</strong> Refers to the veteran upon whom CHAMPVA
          eligibility for the applicant is based.
        </p>
        <p>
          <strong>Spouse</strong> Refers to a person who is married to or is a
          widow(er) of an eligible CHAMPVA sponsor. If you are certifying that a
          person is your spouse for the purpose of VA benefits, your marriage
          must be recognized by the place where you and/or your spouse resided
          at the time of marriage, or where you and/or your spouse reside when
          you file your claim (or at a later date when you become eligible for
          benefits) (38 U.S.C. 103(c)). Additional guidance on when VA
          recognizes marriages is available at http://www.va.gov/opa/marriage/.
          If the spouse remarries prior to age 55, CHAMPVA benefits end on the
          date of the remarriage. Effective February 4, 2003, if the spouse
          remarries on or after age 55, CHAMPVA benefits continue. Additionally,
          in some instances, a remarried surviving spouse whose remarriage is
          either terminated by death, divorce or annulment is CHAMPVA eligible
          when supported by a copy of the appropriate documentation (death
          certificate/divorce decree/annulment certification).
        </p>
        <p>
          <strong>Child</strong> Includes legitimate, adopted, illegitimate, and
          stepchildren. To be eligible, the child must be unmarried and: 1)
          under the age of 18; or 2) who, before reaching age 18, became
          permanently incapable of self-support as rated by a VA regional
          office; or 3) who, after reaching age 18 and continuing up to age 23,
          is enrolled in a full-time course of instruction at an approved
          educational institution---school certification required (see below).
          <br />
          <strong>Note:</strong> Except for stepchildren, the eligibility of
          children is not affected by divorce or remarriage of the spouse or
          surviving spouse.
        </p>
        <p></p>
      </Page>
    </>
  );
};

export default IntroductionPage;
