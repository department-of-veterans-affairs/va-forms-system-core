import React from 'react';
import { Page, DateField, RadioGroup } from '@department-of-veterans-affairs/va-forms-system-core';
import { useFormikContext } from 'formik';

const LOCATIONS = [
    {label: "VA medical center", name:"vaMedicalCenter"},
    {label: "State Veterans home", name:"stateVeteransHome"},
    {label: "Nursing home under VA contract", name:"nursingHome"},
    {label: "Other", name:"other"},
]

export default function BurialInformation(props) {
    const state = useFormikContext();

    return (
        <Page {...props} nextPage="/military-history/service-periods" prevPage="/veteran-information">
            <DateField name="deathDate" label="Date of death" required />
            <DateField name="burialDate" label="Date of burial (includes cremation or internment)" required />
            <RadioGroup 
                name="locationOfDeath" 
                label="Where did the Veteran’s death occur?" 
                required 
                options={LOCATIONS} />
        </Page>
    )
}