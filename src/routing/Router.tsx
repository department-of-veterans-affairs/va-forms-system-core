import React, { useState } from 'react';
import { RouterProps } from './types';
import { BrowserRouter, Switch } from 'react-router-dom';
import { FormContext } from './FormContext';

/**
 * Manages form pages as routes
 *
 * @beta
 */
export default function Router(props: RouterProps): JSX.Element {
  const [formData, handleUpdate] = useState({});
  // const [optionalHandleUpdate] = props;
  const updateFormData = (data:Record<string, unknown>) => {
    const updatedData = {...formData, ...data};
    if (props.optionalHandleUpdate) {
      console.log('gets here', props.optionalHandleUpdate);
      // This should be one level deep, should only be something 
      // like props.optionalHandleUpdate
      props.optionalHandleUpdate.handleSubmit();
    };
    handleUpdate(updatedData);
  }
  
  return (
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
