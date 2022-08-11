import React from 'react';
import ReactDOM from 'react-dom';
import BurialApp from './burial-form';
import SimpleApp from './simple-form';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import './form-styles.css';
import {defineCustomElements} from '@department-of-veterans-affairs/component-library';
import schema from './burial-form/schema';
import {transformJSONSchema} from "@department-of-veterans-affairs/va-forms-system-core";

void defineCustomElements();

const schemaKeys = transformJSONSchema(schema);

const Main = () => {
  return (
    <>
      {/* <BurialApp basename="/" initialValues={schemaKeys} /> */}
      <SimpleApp />
    </>
  )
}

ReactDOM.render(<Main/>, document.getElementById('root'));
