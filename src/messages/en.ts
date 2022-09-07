import { Messages } from './types';

export const messages: Messages = {
  required: {
    /*
      This default value is not tied to any functionality. It is rather a placeholder for a future feature where the default error message should be rendered from the input's label. That label should be injected into this object, instead of from validation.js
      
      The feature should be added in relation to this issue: https://github.com/department-of-veterans-affairs/va-forms-system-core/issues/586
    */
    default: '{{ input_label }} is required',
  },
  length: {
    default: 'Please provide one or more entries',
    min: 'The minimum amount of entries is x',
    max: 'The maximum amount of entries is x',
  },
};
