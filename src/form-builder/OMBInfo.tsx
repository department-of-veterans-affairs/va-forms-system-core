import React from 'react';
import { OMBInfoProps } from './types';

const OMBInfo = (props: OMBInfoProps): JSX.Element => {
  const { resBurden, ombNumber, expDate } = props;

  return (
    <div className="omb-info">
      {resBurden && (
        <div>
          Respondent burden: <strong>{resBurden} minutes</strong>
        </div>
      )}
      {ombNumber && (
        <div>
          OMB Control #: <strong>{ombNumber}</strong>
        </div>
      )}
      <div>
        Expiration date: <strong>{expDate}</strong>
      </div>
    </div>
  );
};

export default OMBInfo;
