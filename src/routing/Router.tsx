import React, { useState } from 'react';
import { RouterProps } from './types';
import { BrowserRouter, Switch } from 'react-router-dom';

// import { FormProvider } from './FormContext';

import { FormContext } from './FormContext2';
// import { FormContext } from './FormContext2';

/**
 * Manages form pages as routes
 *
 * @beta
 */
export default function Router(props: RouterProps): JSX.Element {
  // const [formData, handleUpdate] = useState({});

  const [formData, handleUpdate] = useState({});

  const updateFormData = (data:Record<string, unknown>) => {
    const updatedData = {...formData, ...data};
    handleUpdate(updatedData);
  }
  
  return (
    // <FormProvider>
    //   <BrowserRouter basename={props.basename}>
    //     <Switch>{props.children}</Switch>
    //   </BrowserRouter>
    // </FormProvider>
    
    <FormContext.Provider value={{
        formData,
        handleUpdate: updateFormData
      }}>
      <BrowserRouter basename={props.basename}>
        <Switch>
          {props.children}
        </Switch>
      </BrowserRouter>
    </FormContext.Provider>
  );
}
