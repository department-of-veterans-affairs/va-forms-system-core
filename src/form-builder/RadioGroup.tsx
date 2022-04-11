import React, {useState} from 'react';
import { RadioItemProps, RadioGroupProps } from './types';
import { VaRadio } from "@department-of-veterans-affairs/component-library/dist/react-bindings";
// import { useField, FieldHookConfig } from 'formik';

// Child component for each radio item. We only use it 
// for its props,  so it does not render anything
export const RadioItem = (props: RadioItemProps): null => null;

export function RadioGroup (props: RadioGroupProps): JSX.Element {
    const children = props.children;
    const name = props.name;
    const [sel, setSel] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSel(e.target.id);
        props.onChange(e.target.value);
    }

    return (
        <>
            <VaRadio
                label={'i am a label'}
                name={'name'}
                checked={true}
                options={options}
                // radioOptionSelected={}
                // error={}
                // required
            >
                {options.map(radioOption => (
                <va-radio-option key={radioOption.value} {...radioOption} />
              ))}
            </VaRadio>
 
        </>

    )
};

// {children.map( child => {
                //     const value = child.props.value;
                //     const id = `${name}-${value}`;
                //     const description = child.props.children;
                //     return (
                //         <div key={id}>
                //             <input
                //                 id={id}
                //                 name={name}
                //                 onChange={handleChange}
                //                 //required={!!props.required}
                //             />
                //             <label htmlFor={id}>
                //             {description}
                //         </label>
                //     </div>
                //     )}
            // )}