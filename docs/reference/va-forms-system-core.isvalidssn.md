<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@department-of-veterans-affairs/va-forms-system-core](./va-forms-system-core.md) &gt; [isValidSSN](./va-forms-system-core.isvalidssn.md)

## isValidSSN variable

Conditions for valid SSN from the original 1010ez pdf form: '123456789' is not a valid SSN A value where the first 3 digits are 0 is not a valid SSN A value where the 4th and 5th digits are 0 is not a valid SSN A value where the last 4 digits are 0 is not a valid SSN A value with 3 digits, an optional -, 2 digits, an optional -, and 4 digits is a valid SSN 9 of the same digits (e.g., '111111111') is not a valid SSN

<b>Signature:</b>

```typescript
isValidSSN: <T>(ssnString: T, props: FieldProps<T>) => ValidationFunctionResult<T>
```
