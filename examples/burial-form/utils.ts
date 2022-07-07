import { isBefore } from 'date-fns';
import { RadioLabels } from './data';

export const isBeforeDate = (
  dateOne: Date,
  dateTwo: Date,
  validationMessage: string
): () => string => {
  return () => isBefore(new Date(dateOne), new Date(dateTwo)) ? validationMessage : '';
}

export const stringToBoolean = (value: string): boolean => {
  switch (value.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(value);
  }
};

export const getRadioLabel = (objectKey: string): string => {
  return RadioLabels[objectKey as keyof typeof RadioLabels]
}