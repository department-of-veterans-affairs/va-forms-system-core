---
layout: page
title: How to build Formulate fields
parent: How-to guides
---

# How to build Formulate fields

Fundamentally, the Formulate form builder (so not the routing or anything else) is a light layer on top of [Formik](https://formik.org/). This light layer is responsible for using the VA.gov design system components and providing some minor quality-of-life improvements, such as including the labels with the components.

Ideally, each Formulate field does all of the following:
- Uses VA.gov design system components
- Provides a consistent API
- Performs basic validation (as needed)
    - Example: `required`

## Writing a field component
To hook into Formik's React Context, we'll need to use either the [`<Field>` component](https://formik.org/docs/api/field) or the [`useField` hook](https://formik.org/docs/api/useField).

### Consistent API
Using Formulate fields should be straightforward. Common props that all fields should have are:
- `name` (string)
    - The name of the field in Formik's state
- `label` (string | `JSXElement`)
    - The text to show to the users
- `required` (boolean)
    - Whether or not the field is required
    - If the user tries to submit the data without filling this field out, there should be a validation error

### Basic validation
Each Formulate field should also perform some basic validation (such as the `required` prop above). If you're building a number input, it should throw a validation error if the data is non-numeric.

Additionally, all Formulate fields should display validation errors the same way.