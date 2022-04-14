import { createContext } from 'react';
import { IFormContextType } from './types';

export const defaultState = {
  formData: {
    foo: 'Testing',
  },
  handleUpdate: () => {},
};

export const FormContext = createContext<IFormContextType>(defaultState);
