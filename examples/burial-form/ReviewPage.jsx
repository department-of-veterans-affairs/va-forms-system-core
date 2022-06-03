import React from 'react';
import { useFormikContext } from 'formik';


export default function ReviewPage(props) {
  const state = useFormikContext();

  // mockup some data to review formik context
  const pageData = {
    pages: [
      {
        title: 'Claimant information',
        id: 'claimant-information',
        pageUrl: '/claimant-information',
        fields: {
          "fullName": {
            value: {
              first: {
                label: "First",
                value: state.values.fullName.first
              },
              middle: {
                label: "Middle",
                value: state.values.fullName.middle
              },
              last: {
                label: "Last",
                value: state.values.fullName.last
              }
            }
          },
          "relationship": {
            label: "Relationship",
            value: state.values.relationship,
          }
        }
      },
      {
        title: 'Deceased Veteran Information',
        id: 'veteran-information',
        pageUrl: '/veteran-information',
        fields: {
          "veteranFullName": {
            label: "Veteran Name",
            value: {
              first: {
                label: "First",
                value: state.values?.veteranFullName?.first
              },
              middle: {
                label: "Middle",
                value: state.values?.veteranFullName?.middle
              },
              last: {
                label: "Last",
                value: state.values?.veteranFullName?.last
              }
            }
          },
          "veteranSocialSecurityNumber": {
            label: "Social Security Number",
            value: state.values.veteranSocialSecurityNumber
          },
          "vaFileNumber": {
            label: "File Number",
            value: state.values.vaFileNumber
          },
          "veteranDateOfBirth": {
            label: "Date of Birth",
            value: state.values.veteranDateOfBirth
          },
          "placeOfBirth": {
            label: "Place of Birth",
            value: state.values.placeOfBirth
          }
        }
      },
      {
        title: 'Deceased Veteran Information: Death and Burial',
        id: 'veteran-information-burial',
        pageUrl: '/veteran-information/burial',
        fields: {
          "deathDate": {
            label: "Date of Death",
            value: state.values.deathDate
          },
          "burialDate": {
            label: "Date of Burial",
            value: state.values.burialDate
          },
          "locationOfDeath": {
            label: "Location of Death",
            value: state.values.locationOfDeath
          }
        }
      },
      {
        title: 'Military Service History',
        id: 'military-history-service-periods',
        pageUrl: '/military-history/service-periods',
        fields: {
          "toursOfDuty": {
            value: {
              "dateRange": {
                value: {
                  "from": {
                    label: "From",
                    value: state.values?.toursOfDuty[0]?.dateRange.from
                  },
                  "to": {
                    label: "To",
                    value: state.values?.toursOfDuty[0]?.dateRange.to
                  }
                }
              },
              "serviceBranch": {
                label: "Service Branch",
                value: state.values?.toursOfDuty[0]?.serviceBranch
              },
              "rank": {
                label: "Rank",
                value: state.values?.toursOfDuty[0]?.rank
              },
              "serviceNumber": {
                label: "Service Number",
                value: state.values?.toursOfDuty[0]?.serviceNumber
              },
              "placeOfEntry": {
                label: "Place of Entry",
                value: state.values?.toursOfDuty[0]?.placeOfEntry
              },
              "placeOfSeparation": {
                label: "Place of Separation",
                value: state.values?.toursOfDuty[0]?.placeOfSeparation
              }
            }
          }
        }
      },
      {
        title: 'Military Service History: Previous Names',
        id: 'military-history-previous-names',
        pageUrl: '/military-history/previous-names',
        fields: {
          "previousNames" : {
            label: "Did the Veteran serve under another name?", 
            value: {
              first: {
                label: "First",
                value: state.values?.previousNames?.first
              },
              middle: {
                label: "Middle",
                value: state.values?.previousNames?.middle
              },
              last: {
                label: "Last",
                value: state.values?.previousNames?.last
              }
            }
          }
        }
      },
      {
        title: 'Benefits Selection',
        id: 'benefits-selection',
        pageUrl: '/benefits/selection',
        fields: {
          "burialAllowance": {
            label: "Burial Allowance",
            value: state?.values?.burialAllowance
          },
          "plotAllowance": {
            label: "Plot or interment allowance",
            value: state?.values?.plotAllowance
          },
          "transportation": {
            label: "Transportation expenses",
            value: state?.values?.transportation
          },
          "amountIncurred": {
            label: "Amount Incurred",
            value: state?.values?.amountIncurred
          }
        },
      },
      {
        title: 'Benefits Selection: Type of Burial Allowance',
        id: 'benefits-burial-allowance',
        pageUrl: '/benefits/burial-allowance',
        fields: {
          "burialAllowanceRequested": {
            label: "Type of Burial allowance requested",
            value: state?.values?.burialAllowanceRequested
          }
        },
      },
      {
        title: 'Benefits Selection: Plot or interment allowance',
        id: 'benefits-plot-allowance',
        pageUrl: '/benefits/plot-allowance',
        fields: {
          "placeOfRemains": {
            label: "Place of burial or deceased Veteran’s remains",
            value: state?.values?.placeOfRemains
          },
          "federalCemetery": {
            label: "Was the Veteran buried in a national cemetary, or one owned by the federal government?",
            value: state?.values?.federalCemetery
          },
          "govtContributions": {
            label: "Amount of government or employer contribution",
            value: state?.values?.govtContributions
          },
          "amountGovtContribution": {
            label: "Amount of government or employer contribution",
            value: state?.values?.amountGovtContribution
          }
        },
      },
      {
        title: 'Claimant Contact Information',
        id: 'claimant-contact-information',
        pageUrl: '/claimant-contact-information',
        fields: {
          "claimantAddress": {
            label: "Claimant Address",
            value: {
              "street": {
                value: state?.values?.claimantAddress?.street,
              },
              "street2": {
                value: state?.values?.claimantAddress?.street2,
              },
              "city": {
                value: state?.values?.claimantAddress?.city,
              },
              "country": {
                value: state?.values?.claimantAddress?.country,
              },
              "state": {
                value: state?.values?.claimantAddress?.state,
              },
              "postalCode": {
                value: state?.values?.claimantAddress?.postalCode,
              }
            }
          },
          "claimantPhone": {
            label: "Claimant Phone Number",
            value: state?.values?.claimantPhone,
          }
        },
      },
      {
        title: "Additional information",
        id: 'additional-information',
        pageUrl: '/additional-information',
        fields: {
          "transportationReceipts": {
            label: "Transportation Receipts?",
            value: state?.values?.transportationReceipts,
          }
        },
      }
    ]
  }

  return (
    <>
      <Page {...props}>
        <nav>
          <ul>
          </ul>
        </nav>
      </Page>
      <DebuggerView />
    </>
  )
}