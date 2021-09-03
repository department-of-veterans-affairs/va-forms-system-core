import React from 'react';

import { Formik, Form } from 'formik';

type PageProps = {
  children: JSX.Element[];
  title: string;
};

export default function Page(props: PageProps): JSX.Element {
  const handleSubmit = () => {
    console.log('submiting');
  };

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <h1>{props.title}</h1>
      <Formik initialValues={{ foo: '', bar: true }} onSubmit={handleSubmit}>
        <Form>{props.children}</Form>
      </Formik>
    </div>
  );
}
