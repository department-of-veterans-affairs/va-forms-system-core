import { createContext, FC, useState } from 'react';
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
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
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
