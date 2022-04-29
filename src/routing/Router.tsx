import React, { useContext, useState } from 'react';
import { PageProps, Routable, RouterProps } from './types';
import { BrowserRouter, Switch, SwitchProps } from 'react-router-dom';
import { FormContext } from './FormContext';
import FormTitle from './FormTitle';

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
      {props?.formMeta?.title && (
        <FormTitle
          title={props.formMeta.title}
          subTitle={props.formMeta?.subtitle}
        />
      )}
      <BrowserRouter basename={props.basename}>
        <Switch>{props.children}</Switch>
      </BrowserRouter>
    </FormContext.Provider>
  );
}
