import React from 'react';
import { Formik, Form } from 'formik';
import { Routes, Route } from 'react-router-dom'
import PersonalInformationPage from './page-one';
import ContactInformationPage from './page-two';

const FormApp = () => (
    <Routes>
        <Route index element={<PersonalInformationPage />} />
        <Route path="/page-two" element={<ContactInformationPage />} />
    </Routes>
)

export default FormApp