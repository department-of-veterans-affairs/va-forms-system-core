import React from 'react';
import ReactDOM from 'react-dom';
import BurialApp from './burial-form';
import ChapterForm from './chapter-form';
import SimpleApp from './simple-form';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import './form-styles.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';
import schema from './burial-form/schema';
import controlSchema from './1010d/schema';
import { transformJSONSchema } from '@department-of-veterans-affairs/va-forms-system-core';

// USE THIS IF YOU DON'T WANT TO FILL OUT THE FORM
// Simply change the initialValues to use testData
import { testData } from './testFormikData';
import ControlSubApp from './1010d';

void defineCustomElements();

const schemaKeys = transformJSONSchema(controlSchema);

// Initializing object to validate fields which are not present in schema but are required for form validation
const uiInitialValues = {
  veteranServedUnderAnotherName: undefined,
  benefitsSelection: undefined,
};

const Main = () => {
  return (
    <>
      {/* If you would like to see the simple form or chapter form, just uncomment and comment out BurialApp */}
      {/* <BurialApp
        basename="/"
        initialValues={testData}
        uiValues={uiInitialValues}
      /> */}
      {/* <ChapterForm basename="/" initialValues={schemaKeys} /> */}
      {/* <SimpleApp /> */}
      <ControlSubApp
        basename="/"
        initialValues={schemaKeys}
        uiValues={schemaKeys}
      />
    </>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
