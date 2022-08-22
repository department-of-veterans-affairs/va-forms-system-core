import React from 'react';
import ReactDOM from 'react-dom';
import BurialApp from './burial-form';
import ChapterForm from './chapter-form';
import SimpleApp from './simple-form';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import './form-styles.css';
import {defineCustomElements} from '@department-of-veterans-affairs/component-library';
import schema from './burial-form/schema';
import {transformJSONSchema} from "@department-of-veterans-affairs/va-forms-system-core";

import { testData } from './testFormikData';

void defineCustomElements();

const schemaKeys = transformJSONSchema(schema);

const Main = () => {
  return (
    <>
      {/* If you would like to see the simple form or chapter form, just uncomment and comment out BurialApp */}
      <BurialApp basename="/" initialValues={testData} />
      {/* <ChapterForm basename="/" initialValues={schemaKeys} /> */}
      {/* <SimpleApp /> */}
    </>
  )
}

ReactDOM.render(<Main/>, document.getElementById('root'));
