import React from 'react';
import { Link, Route } from 'react-router-dom';
import {
    TextField,
    EmailField,
    Page, 
    Chapter,
    DebuggerView
  } from '@department-of-veterans-affairs/va-forms-system-core';

export function PageOne() {
  return (
  <Page title="Chapter One Page One" prevPage="../" nextPage="page-two">
    <TextField name="firstName" label="First name"/>
    <TextField name="lastName" label="Last name"/>
    <DebuggerView />
  </Page>);
}

export default function ChapterOne() {
    return (
      <div>
        <Link to="page-one">page one</Link>
      </div>

    )
}