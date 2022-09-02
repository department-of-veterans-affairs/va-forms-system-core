import { Messages } from './types';

export const messages: Messages = {
  // The error messages on required fields
  required: {
    default: 'Please provide a response',
    length: 'Please provide more than one entry',
  },
  date: {
    incomplete: 'Please provide a valid date',
  },
  length: {
    default: 'Please provide one or more entries',
    min: 'Please provide more than x amount of entries.',
    max: 'Please provide less than x amount of entries.',
  },
};
