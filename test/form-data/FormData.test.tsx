import {SSNField, TextField, RadioGroup, PhoneField, NumberField, DateField, CheckboxField, SelectField, CheckboxFieldGroup, RadioItemProps} from '../../src/form-builder/';
import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { buildRenderForm } from '../utils';
import { gatherFieldData, PageContextProvider, ReviewPage } from '../../src/form-data/';
import { Page, FormRouterProps } from '../../src';
import { MemoryRouter, Route, Routes } from 'react-router-dom-v5-compat';
import { Formik } from 'formik';
import { RouterContextProvider } from '../../src/routing/RouterContext';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const checkboxProps = {
  label: 'What are your favorite movies?',
  name: 'spookyMovies',
  required: false,
  options: [
    {
      name: 'halloween',
      label: 'Halloween',
    },
    {
      name: 'scream',
      label: 'Scream',
    },
    {
      name: 'theShining',
      label: 'The Shining',
    },
  ],
};

const PageTwo = () => (
  <Page title="The Thing The Page" fieldNames={['thing']} hidePreviousButton={false}>
    <TextField name="thing" label="The Thing" />
  </Page>
);

const PageTwoB = () => (
  <Page title="Movies List" fieldNames={['movies']} hidePreviousButton={false}>
    <SelectField
      id="movies"
      name="movies"
      value="the-thing"
      label="Favorite Movie"
      required
      >
      {
        [ { value: "the-thing",
            label: "The Thing" },
          { value: "Elvira Mistress of the Dark",
            label: "elvira-mistress-of-the-dark" }
        ].map((movie) => {
        return (
          <option value={`${movie.value}`} key={`${movie.value}`}>
            {movie.label}
          </option>
        );
      })}
    </SelectField>
  </Page>
);

const PageTwoC = () => (
  <Page title="Movies List" fieldNames={['halloween', 'scream', 'theShining']} hidePreviousButton={false}>
    <CheckboxFieldGroup {...checkboxProps} />
  </Page>
)
const PageTwoD = () => (
  <Page title="Movies Dates" fieldNames={['releaseDate']} hidePreviousButton={false}>
    <DateField
      name="releaseDate"
      label="Release Date"
      required
    />
  </Page>
)
const PageTwoE = () => (
  <Page title="Movies Price" fieldNames={['ticketPrice']} hidePreviousButton={false}>
    <NumberField
      name="ticketPrice"
      label="Ticket Price"
      required
    />
  </Page>
)
const PageTwoF = () => (
  <Page title="Movies List" fieldNames={['moviesList']} hidePreviousButton={false}>
    <RadioGroup
      name="moviesList"
      label="Favorite Movie"
      required
      options={
        [
          {
          label: "The Evil Dead",
          value: "theEvilDead",
        },
        {
          label: "Aliens",
          value: "aliens",
        }
        ] as RadioItemProps[]
      }
      onChange={() => {}}
    />
  </Page>
)
const PageTwoG = () => (
  <Page title="The Thing's SSN" fieldNames={['ssn']} hidePreviousButton={false}>
    <NumberField
      name="ssn"
      label="The Thing's SSN"
      required
    />
  </Page>
)

const FormRouterInternal = (props: FormRouterProps): JSX.Element => {
  const initialValues = props.formData;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
    >
      <RouterContextProvider routes={props.children}>
        <PageContextProvider>
          <Routes>
            {props.children}
          </Routes>
        </PageContextProvider>
      </RouterContextProvider>
    </Formik>
  );
};

describe('Form Data - Get Field Data', () => {
  test('Text field gathers correct data', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'thing': true}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwo/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('label')?.innerHTML
      ).toContain('The Thing')
    })
  });

  test('Uninitialized text field data is not rendered on the review page', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'thing': undefined}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwo/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('label')?.innerHTML
      ).toBeUndefined()
    })
  });

  test('Select field gathers correct data', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'movies': 'the-thing'}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwoB/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page--page-info--value-text')?.innerHTML
      ).toContain('The Thing')
    })
  });

  test('Uninitialized select field data is not rendered on the review page', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'movies': ''}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwoB/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page--page-info--value-text')?.innerHTML
      ).toBeUndefined()
    })
  });

  test('Checkbox field gathers correct data', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'halloween': true, 'scream': true, 'theShining': true}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwoC/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page--page-info--value-text')?.innerHTML
      ).toContain('Yes')
    })
  });

  test('Uninitialized checkbox field data is not rendered on the review page', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'halloween': undefined, 'scream': undefined, 'theShining': undefined}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwoC/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page--page-info--value-text')?.innerHTML

      ).toBeUndefined();
    })
  });

  test('Date field gathers correct data', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'releaseDate': '1981-03-03'}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwoD/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('label')?.innerHTML
      ).toContain('Release Date')
    })
  });

  test('Uninitialized date field data is not rendered on the review page', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'releaseDate': undefined}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwoD/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page--page-info--value-text')?.innerHTML
      ).toBeUndefined()
    })
  });

  test('Number field gathers correct data', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'ticketPrice': '10'}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwoE/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('label')?.innerHTML
      ).toContain('Ticket Price')
    })
  });

  test('Uninitialized number field data is not rendered on the review page', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'ticketPrice': ''}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwoE/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page--page-info--value-text')?.innerHTML
      ).toBeUndefined();
    })
  });

  test('Radio Group field gathers correct data', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'moviesList': 'aliens'}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwoF/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page--page-info--value-text')?.innerHTML
      ).toContain('Aliens')
    })
  });

  test('Uninitialized Radio Group field data is not rendered on the review page', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'moviesList': ''}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwoF/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page--page-info--value-text')?.innerHTML
      ).toBeUndefined()
    })
  });

  test('SSN field gathers correct data', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'ssn': '900-999-9882'}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwoG/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page--page-info--value-text')?.innerHTML
      ).toContain('900-999-9882')
    })
  });

  test('Uninitialized SSN field data is not rendered on the review page', async () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/page-two', '/page-three']} initialIndex={0}>
        <FormRouterInternal
          basename="/"
          formData={{'ssn': ''}}
          title="Field Data Test"
        >
          <Route path="/page-two" element={<PageTwoG/>}></Route>
          <Route path="/page-three" element={<ReviewPage title="Review Your Application" />}></Route>
        </FormRouterInternal>
      </MemoryRouter>
    );
    act(() => {
      userEvent.click(container.querySelector('va-button[continue][submit]')!);
    });
    await waitFor(() => {
      expect(
        container.querySelector('.review-page--page-info--value-text')?.innerHTML
      ).toBeUndefined()
    })
  });

});

