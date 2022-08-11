---
layout: page
title: How to add documentation for features
parent: How-to guides
---

# How to add documentation for features

Documentation for VAFSC is automatically generated using [API extractor](https://api-extractor.com). API Extractor relies on the use of [TSDoc](https://github.com/microsoft/tsdoc) while parsing comments to use during document generation. 

Features that are added to VAFSC should include TSDoc comments that provide:

- `@param` tags for function parameters. These should include the name of the parameter followed by a brief description.
- `@returns` tags that briefly describe what sort of value a function returns.
- `@example` tags provide an example of how to use the associated function.
- A release tag that indicates the support status of an API. Values can be `@alpha`, `@beta`, `@internal`, `@public`.

In addition to TSDoc comments, inilne comments are encouraged where reasoning isn't immediately clear. 

Putting it all together, a component file may look like this, taken from our [OMBInfo Component](https://github.com/department-of-veterans-affairs/va-forms-system-core/blob/e3237652f34c714b0c23f942a4e4fc778bb63648/src/form-builder/OMBInfo.tsx#L8):

```
/**
 * OMBInfo component is a simple form building component that displays the
 * VA OMB number from your form, expDate, and resBurden.
 *
 * @param {OMBInfoProps} props
 *
 * @example
 * Here's a simple example:
 * ```typescript
 * <OMBInfo ombNumber="123-ABC" expDate="01/01/1001" resBurden={1} />
 * ```
 *
 * @returns React.Component
 */
 ```