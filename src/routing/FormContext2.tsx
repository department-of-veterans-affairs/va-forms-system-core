import { createContext } from 'react';
import { IFormContextType } from './types';

export const defaultState = {
  formData: {
    foo: 'Testing',
  },
  handleUpdate: () => {
    console.log('Updating something in formData');
  },
};

export const FormContext = createContext<IFormContextType>(defaultState);

// export const FormContext = createContext({});
