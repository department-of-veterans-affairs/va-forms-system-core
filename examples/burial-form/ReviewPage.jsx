import React from 'react';
import { useFormikContext } from 'formik';
import { Page } from '@department-of-veterans-affairs/va-forms-system-core';
import { Link } from 'react-router-dom';


const bufferFields = (fields, rank = 0) => {
  let buffer = [];
  for (const [key, field] of Object.entries(fields)) { 
    buffer.push(recurseField(key, field, rank));
  }
  return buffer;
}

const recurseField = (key, field, rank = 0) => {
  if (!(!!field.value)) return;
  const fieldLabel = field.label && <label>{field.label}:</label>

  if ((typeof field.value) === 'object') {
    rank++;
    return (<div key={`level-${rank}-field-${key}`}> {bufferFields(field.value, rank)}</div>)
  }
  else {
    return (<div key={`level-${rank}-field-${key}`}> <strong>{fieldLabel}</strong> <span className={'field-value' + (rank > 0 && ` field-value-level-${rank}`)}>{field.value}</span></div>);
  }
}

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
                value: state.values?.claimantFullName?.first
              },
              middle: {
                label: "Middle",
                value: state.values?.claimantFullName?.middle
              },
              last: {
                label: "Last",
                value: state.values?.claimantFullName?.last
              }
            }
          },
          "relationship": {
            label: "Relationship to deceased Veteran",
            value: state.values?.relationship?.type
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
            value: state.values?.veteranSocialSecurityNumber
          },
          "vaFileNumber": {
            label: "File Number",
            value: state.values?.vaFileNumber
          },
          "veteranDateOfBirth": {
            label: "Date of Birth",
            value: state.values?.veteranDateOfBirth
          },
          "placeOfBirth": {
            label: "Place of Birth",
            value: state.values?.placeOfBirth
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
            value: state.values?.deathDate
          },
          "burialDate": {
            label: "Date of Burial",
            value: state.values?.burialDate
          },
          "locationOfDeath.location": {
            label: "Location of Death",
            value: state.values?.locationOfDeath.location
          },
          "locationOfDeath.other": {
            label: "If other, please specify",
            value: state.values?.locationOfDeath.other
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
                    label: "Service start date",
                    value: state.values?.toursOfDuty[0]?.dateRange.from
                  },
                  "to": {
                    label: "Service end date",
                    value: state.values?.toursOfDuty[0]?.dateRange.to
                  }
                }
              },
              "serviceBranch": {
                label: "Branch of service",
                value: state.values?.toursOfDuty[0]?.serviceBranch
              },
              "rank": {
                label: "Rank",
                value: state.values?.toursOfDuty[0]?.rank
              },
              "serviceNumber": {
                label: "Service number",
                value: state.values?.toursOfDuty[0]?.serviceNumber
              },
              "placeOfEntry": {
                label: "Place of entry",
                value: state.values?.toursOfDuty[0]?.placeOfEntry
              },
              "placeOfSeparation": {
                label: "Place of separation",
                value: state.values?.toursOfDuty[0]?.placeOfSeparation
              }
            }
          }
        }
      },
      // {
      //   title: 'Military Service History: Previous Names',
      //   id: 'military-history-previous-names',
      //   pageUrl: '/military-history/previous-names',
      //   fields: {
      //     "previousNames" : {
      //       label: "Did the Veteran serve under another name?", 
      //       value: {
      //         first: {
      //           label: "First",
      //           value: state.values?.previousNames?.first
      //         },
      //         middle: {
      //           label: "Middle",
      //           value: state.values?.previousNames?.middle
      //         },
      //         last: {
      //           label: "Last",
      //           value: state.values?.previousNames?.last
      //         }
      //       }
      //     }
      //   }
      // },
      // {
      //   title: 'Benefits Selection',
      //   id: 'benefits-selection',
      //   pageUrl: '/benefits/selection',
      //   fields: {
      //     "burialAllowance": {
      //       label: "Burial Allowance",
      //       value: state?.values?.burialAllowance
      //     },
      //     "plotAllowance": {
      //       label: "Plot or interment allowance",
      //       value: state?.values?.plotAllowance
      //     },
      //     "transportation": {
      //       label: "Transportation expenses",
      //       value: state?.values?.transportation
      //     },
      //     "amountIncurred": {
      //       label: "Amount Incurred",
      //       value: state?.values?.amountIncurred
      //     }
      //   },
      // },
      // {
      //   title: 'Benefits Selection: Type of Burial Allowance',
      //   id: 'benefits-burial-allowance',
      //   pageUrl: '/benefits/burial-allowance',
      //   fields: {
      //     "burialAllowanceRequested": {
      //       label: "Type of Burial allowance requested",
      //       value: state?.values?.burialAllowanceRequested
      //     }
      //   },
      // },
      // {
      //   title: 'Benefits Selection: Plot or interment allowance',
      //   id: 'benefits-plot-allowance',
      //   pageUrl: '/benefits/plot-allowance',
      //   fields: {
      //     "placeOfRemains": {
      //       label: "Place of burial or deceased Veteran’s remains",
      //       value: state?.values?.placeOfRemains
      //     },
      //     "federalCemetery": {
      //       label: "Was the Veteran buried in a national cemetary, or one owned by the federal government?",
      //       value: state?.values?.federalCemetery
      //     },
      //     "govtContributions": {
      //       label: "Amount of government or employer contribution",
      //       value: state?.values?.govtContributions
      //     },
      //     "amountGovtContribution": {
      //       label: "Amount of government or employer contribution",
      //       value: state?.values?.amountGovtContribution
      //     }
      //   },
      // },
      // {
      //   title: 'Claimant Contact Information',
      //   id: 'claimant-contact-information',
      //   pageUrl: '/claimant-contact-information',
      //   fields: {
      //     "claimantAddress": {
      //       label: "Claimant Address",
      //       value: {
      //         "street": {
      //           value: state?.values?.claimantAddress?.street,
      //         },
      //         "street2": {
      //           value: state?.values?.claimantAddress?.street2,
      //         },
      //         "city": {
      //           value: state?.values?.claimantAddress?.city,
      //         },
      //         "country": {
      //           value: state?.values?.claimantAddress?.country,
      //         },
      //         "state": {
      //           value: state?.values?.claimantAddress?.state,
      //         },
      //         "postalCode": {
      //           value: state?.values?.claimantAddress?.postalCode,
      //         }
      //       }
      //     },
      //     "claimantPhone": {
      //       label: "Claimant Phone Number",
      //       value: state?.values?.claimantPhone,
      //     }
      //   },
      // },
      // {
      //   title: "Additional information",
      //   id: 'additional-information',
      //   pageUrl: '/additional-information',
      //   fields: {
      //     "transportationReceipts": {
      //       label: "Transportation Receipts?",
      //       value: state?.values?.transportationReceipts,
      //     }
      //   },
      // }
    ]
  }

  return (
    <>
      <Page {...props}>
        <nav>
          <ul>
            { pageData.pages.map(page => {
              return (
                <li key={page.id}>
                  <Link to={'#' + page.id}>{page.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>

        { pageData.pages.map(page => (
          <div id={page.id} key={page.id}>
            <h3>{page.title}</h3>
            <Link to={page.pageUrl}>edit</Link>
            {bufferFields(page.fields)}
            <br/>
          </div>
        )) }

      </Page>
      <DebuggerView />
    </>
  )
}