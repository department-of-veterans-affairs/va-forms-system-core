import React from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import {
    TextField,
    Page,
  } from '@department-of-veterans-affairs/va-forms-system-core';

export default function ContactInformationPage() {
    return (
        <>
            <Page title="Address Information">
                <TextField name="street" label="Street line 1"/>
                <TextField name="streetTwo" label="Street line 2"/>
                <TextField name="streetThree" label="Street line 3"/>
                <TextField name="state" label="State"/>
                <TextField name="zipcode" label="Zip code"/>
                <Link to="/test-app">Back</Link>
            </Page>
        </>
    )
}