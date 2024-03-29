<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@department-of-veterans-affairs/va-forms-system-core](./va-forms-system-core.md) &gt; [ArrayFieldProps](./va-forms-system-core.arrayfieldprops.md)

## ArrayFieldProps type

The prop type for the Array Field Component

<b>Signature:</b>

```typescript
export declare type ArrayFieldProps<T> = FieldProps<T[]> & {
    name: string;
    label: string;
    arrayFieldSchema: Record<string, unknown>;
    FieldArrayTemplate: (props: {
        data: T;
        index: number;
    }) => React.ReactNode;
    minLength?: number;
    maxLength?: number;
};
```
<b>References:</b> [FieldProps](./va-forms-system-core.fieldprops.md)

