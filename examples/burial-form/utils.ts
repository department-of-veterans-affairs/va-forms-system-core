import { isBefore } from 'date-fns';

export const isBeforeDate = (
  dateOne: Date,
  dateTwo: Date,
  validationMessage: string
): string => {
  console.log('in validator', isBefore(new Date(dateOne), new Date(dateTwo)));
  return isBefore(new Date(dateOne), new Date(dateTwo)) ? validationMessage : '';
}
