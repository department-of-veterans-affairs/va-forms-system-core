import React from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import {
    TextField,
    EmailField,
    Page
  } from '@department-of-veterans-affairs/va-forms-system-core';

export default function PersonalInformationPage() {
    return (
        <>
            <Page title="Personal Information">
                <TextField name="firstName" label="First name"/>
                <TextField name="lastName" label="Last name"/>
                <EmailField name="email" label="Email" />
                <Link to="page-two">Next</Link>
            </Page>
        </>
    )
}