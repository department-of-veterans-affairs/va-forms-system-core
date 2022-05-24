import { routeObjectsReducer, RouterContext, RouterContextProvider } from "../../src/routing/RouterContext";
import { Formik } from "formik";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Page, RouterProps } from "../../src";
import { render } from "@testing-library/react";
import { useState } from "react";
import { update } from "lodash";

const PageOne = () => (
  <Page 
    nextPage="/chapter-one/page-two"
    title="page one">
    <p>page one</p>
  </Page>
);
const PageTwo = () => (
  <Page 
    nextPage="/"
    title="page two"
    >
    <p>page two</p>
  </Page>
);

const initialValues = {
  firstName: '', 
  lastName: '', 
  email: '', 
  street: '', 
  streetTwo: '', 
  streetThree: '', 
  state: '', 
  zipcode: ''
};

const FormRouterInternal = (props: RouterProps): JSX.Element => {
  const initialValues = props.formData;
  const [route, updateRoute] = useState('');

  return (<RouterContextProvider routes={props.children} currentRoute={route} updateRoute={updateRoute}>
    <Formik
      initialValues={props.formData}
      onSubmit={(values, actions) => {
        // Here we leverage formik actions to perform validations, submit data, etc.
        // Also a good candidate for extracting data out of form apps
        actions.setSubmitting(true);
      }}
    >
      <Routes>{props.children}</Routes>
    </Formik>
  </RouterContextProvider>)
};

describe('Routing - Router Context', () => {
  test('router reducer returns list of routes', () => {
    // Some Dummy Data
    const routeObjects = [
      {
        index: true,
        path: undefined
      },
      {
        path: "/about",
        children: [
          {
            path: 'plants'
          },
        ]
      },
    ]
    // Dummy Data expected result
    const expectedResult = [
      '/',
      '/about',
      '/about/plants'
    ]

    const generatedRoutes = routeObjectsReducer(routeObjects);
    expect(generatedRoutes).toEqual(expectedResult);
  });

  test('Router Context passes correct information to the progress bar', () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/", "/page-two"]} initialIndex={0}>
        <FormRouterInternal basename="/" formData={initialValues} title="Page Test">
          <Route index element={<PageOne />} />
          <Route path="/page-two" element={<PageTwo />} />
        </FormRouterInternal>
      </MemoryRouter>
    );

    const containerStepTitleP1 = container.querySelector('h2.vads-u-font-size--h4');
    expect(containerStepTitleP1?.innerHTML).toContain('Step 1 of 2: Introduction Page');
  })

});
