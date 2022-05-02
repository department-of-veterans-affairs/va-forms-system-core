import React, { useContext, useState } from 'react';
import { PageProps, Routable, RouterProps } from './types';
import { BrowserRouter, Switch, SwitchProps } from 'react-router-dom';
import { FormContext } from './FormContext';
import FormTitle from './FormTitle';
import FormFooter from './FormFooter';

export type RouterAndSwitchProps = RouterProps & SwitchProps;

/**
 * Manages form pages as routes
 *
 * @beta
 */
export default function Router(props: RouterAndSwitchProps): JSX.Element {
  const [formData, handleUpdate] = useState({});

  const updateFormData = (data: Record<string, unknown>) => {
    const updatedData = { ...formData, ...data };
    handleUpdate(updatedData);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        handleUpdate: updateFormData,
      }}
    >
      {props?.title && (
        <FormTitle title={props.title} subTitle={props?.subtitle} />
      )}
      <BrowserRouter basename={props.basename}>
        <Switch>{props.children}</Switch>
      </BrowserRouter>
      <FormFooter />
    </FormContext.Provider>
  );
}
