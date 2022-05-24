import React from 'react';
import { ProgressBarProps } from './types';
import { VaProgressBar } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

/**
 * Form Title component is a simple wrapper
 * around a Form Title and subTitle using VA styles
 *
 * @param {ProgressBarProps} props
 *
 * @example
 * Here's a simple example:
 * ```typescript
 * <ProgressBar stepTitle="My Title" stepNumber={5} numberOfSteps={10}/>;
 * ```
 *
 * @returns React.Component
 */
const ProgressBar = (props: ProgressBarProps) => {
  const { currentStepTitle, currentStep, numberOfSteps } = props;

  return (
    <>
      <VaProgressBar current={currentStep} total={numberOfSteps} />
      <div
        className="schemaform-chapter-progress"
        style={{
          paddingLeft: '2rem',
        }}
      >
        <div className="nav-header nav-header-schemaform">
          <h2
            className="vads-u-font-size--h4"
            id="nav-form-header"
            tabIndex={0}
          >
            Step {currentStep} of {numberOfSteps}: {currentStepTitle}
          </h2>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
