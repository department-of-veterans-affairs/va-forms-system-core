import React, { createContext, FC, useState } from 'react';
import { IFormContextType } from './types';

const defaultState = {
  formData: {
    foo: 'Cool Data',
  },
};

const FormContext = createContext<IFormContextType>(defaultState);

const FormProvider: FC = ({ children }) => {
  const [formData, handleUpdate] = useState(defaultState.formData);

  const updateFormData = () => {
    console.log(handleUpdate);

    return {
      ...formData,
    };
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        handleUpdate: updateFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };
