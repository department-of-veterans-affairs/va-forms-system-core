import React, {useState} from 'react';
// import { useField, FieldHookConfig } from 'formik';

export interface RadioItemProps {
    value: string;
    children: string;
}

// Child component for each radio item. We only use it 
// for its props,  so it does not render anything
const RadioItem = (props: RadioItemProps): null => null;

export interface RadioGroupProps {
    name: string;
    children: React.ReactElement<RadioItemProps>[];
    onChange: (v: string) => void;
} ;

function RadioGroup (props: RadioGroupProps): JSX.Element {
    const children = props.children;
    const name = props.name;
    const [sel, setSel] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSel(e.target.id);
        props.onChange(e.target.value);
    }

    return (
        <>
            {children.map( child => {
                const value = child.props.value;
                const id = `${name}-${value}`;
                const description = child.props.children;
                return (
                    <div key={id}>
                        <input
                            type="radio" 
                            id={id}
                            name={name}
                            onChange={handleChange}
                            //required={!!props.required}
                        />
                        <label htmlFor={id}>
                        {description}
                    </label>
                </div>
                )}
            )}
        </>

    )
};

export {RadioGroup, RadioItem};
