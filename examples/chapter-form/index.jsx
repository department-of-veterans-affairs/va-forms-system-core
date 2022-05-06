import React from 'react';
import { Outlet, Route } from 'react-router-dom'
import FormRouter from '../../src/routing/Router';
import Chapter from '../../src/routing/Chapter';
import Page from '../../src/routing/Page';
import IntroductionPage from '../../src/form-layout/IntroductionPage'
import { Link } from 'react-router-dom';

const NoMatch = (props) => (
  <main style={{ padding: '1rem' }}>
    <p>There is nothing here! {props.name}</p>
  </main>
);

const FormIntroductionPageChapter = () => {
  return (
    <>
      <Page title="Chapter Form" nextPage="chapter-one">
        <p> Chapter Form </p>
      </Page>
    </>
  )
}

const ChapterOne = (props) => (
  <>
    <h2> Chapter One</h2>
    <Link to="page-one">PageOne</Link>

    <Chapter>
      <p>Custom UI content that can go inside chapter 1</p>
    </Chapter>
  </>
);

const ChapterOnePageOne = (props) => (
  <Page nextPage="../page-two">
    <p>chapter one, page one</p>
  </Page>
);

const ChapterOnePageTwo = (props) => (
  <Page nextPage="../../chapter-two">
    <p>chapter one, page two</p>
  </Page>
);

const ChapterTwo = (props) => (
  <>
    <h2> Chapter Two</h2>
    <Link to="page-one">PageOne</Link>

    <Chapter>
      <p>Custom UI content that can go inside chapter 2</p>
    </Chapter>
  </>
);

const ChapterTwoPageOne = (props) => (
  <Page nextPage="../page-two">
    <p>chapter two, page one</p>
  </Page>
)

const ChapterTwoPageTwo = (props) => (
  <Page nextPage="../../">
    <p>chapter two, page two</p>
  </Page>
)

const ChapterForm = (props) => {
  // Let users extract and use formData here
  // initialValues would ideally be provided by a json-schema
  return (
    <div className='vads-u-display--flex vads-u-align-items--center vads-u-flex-direction--column'>
      <FormRouter basename={props.basename} formData={props.initialValues} title="Chapter Example">
        <Route index element={<FormIntroductionPageChapter />} />
        <Route path="/chapter-one" element={<ChapterOne />} >
          <Route path="page-one" element={<ChapterOnePageOne />} />
          <Route path="page-two" element={<ChapterOnePageTwo />} />
        </Route>
        <Route path="/chapter-two" element={<ChapterTwo />} >
          <Route path="page-one" element={<ChapterTwoPageOne />} />
          <Route path="page-two" element={<ChapterTwoPageTwo />} />
        </Route>
      </FormRouter>
    </div>
  )
}

export default ChapterForm;