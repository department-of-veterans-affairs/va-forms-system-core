import React from 'react';

import { Formik, Form } from 'formik';
import { Link, Route } from 'react-router-dom';

type PageProps = {
  children: JSX.Element[];
  title: string;
  path: string;
  next: string; // These next and previous props are temporary until we implement Context
  previous: string;
};

type WrapperProps = {
  children: JSX.Element;
};

export default function Page(props: PageProps): JSX.Element {
  const handleSubmit = () => {
    console.log('submiting');
  };

  const Wrapper = (wrapperProps: WrapperProps) => {
    return props.path ? (
      <Route path={props.path}>{wrapperProps.children}</Route>
    ) : (
      <>{wrapperProps.children}</>
    );
  };

  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1>{props.title}</h1>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          <Form>{props.children}</Form>
        </Formik>

        {props.previous && <Link to={props.previous}>Previous page</Link>}
        {props.next && <Link to={props.next}>Next page</Link>}
      </div>
    </Wrapper>
  );
}
