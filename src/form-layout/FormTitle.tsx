import React from 'react';
import { FormTitleProps } from './types';

/**
 * Form Title component
 *
 * Simple wrapper around a Form Title and subTitle using VA styles
 *
 * @param props FormTitleProps
 * @returns React.Component
 */
const FormTitle = (props: FormTitleProps) => (
  <div className="va-form-title">
    <h1>{props.title}</h1>
    {props.subTitle && <div className="va-form-subtitle">{props.subTitle}</div>}
  </div>
);

export default FormTitle;
