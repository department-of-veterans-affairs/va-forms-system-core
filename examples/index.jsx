import React from 'react';
import ReactDOM from 'react-dom';
import FormApp from './multi-page';
import ChapterForm from './chapter-form/index';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';
import schema from './multi-page/schema';
import { Link, Route, Routes } from 'react-router-dom';
void defineCustomElements();

const getEmptyObject = (obj) => {
    const emptyObject = {}
    Object.keys(obj).forEach(key => {
        emptyObject[key] = ''
    });
    return emptyObject;
}
// Object.keys(schema.properties).map(key => {
//
//     schemaKeys[key] = ''
// });

const getReferencedType = (refString) => {
    const referencedDefinition = /\/([A-Za-z]+)$/.exec(refString)[1];
    if (referencedDefinition === 'centralMailAddress') {
        return {
                isMilitaryBaseOutside: false,
                streetAddress: '',
                streetAddressLine2: '',
                streetAddressLine3: '',
                city: '',
                state: '',
                country: '',
                postalCode: ''
            };
    }
    const definition = schema.definitions[referencedDefinition];
    if (definition.type === 'array') {
        const reduceObject = {};
        return [Object.entries(definition.items.properties)
            .reduce((reduceObject, [innerCurrKey, innerCurrValue]) => {
                return iterateProperties(reduceObject, innerCurrKey, innerCurrValue);
            }, {})];
    } else if (definition.type === 'object') {
        const reduceObject = {};
        return Object.entries(definition.properties)
            .reduce((reduceObject, [innerCurrKey, innerCurrValue]) => {
                return iterateProperties(reduceObject, innerCurrKey, innerCurrValue);
            }, {});
    } else if (definition.type === 'number') {
        return 0;
    } else if (definition.type === 'boolean') {
        return false;
    } else {
        return '';
    }
}

const iterateProperties = (objToReturn, currKey, currVal) => {
    if (currVal.type === 'array') {
        if (currVal.items.$ref) {
            const obj = {};
            obj[currKey] = [getReferencedType(currVal.items.$ref)];
            return Object.assign(objToReturn, obj);
        } else {
            const obj = {};
            const returnVal = [Object.entries(currVal.items.properties)
                  .reduce((obj, [innerCurrKey, innerCurrValue]) => {
                      return iterateProperties(obj, innerCurrKey, innerCurrValue);
                  }, {})];
            const returnObj = {};
            returnObj[currKey] = returnVal;
            return Object.assign(objToReturn, returnObj);
        }
    } else if (currVal.$ref) {
        const obj = {};
        obj[currKey] = getReferencedType(currVal.$ref);
        return Object.assign(objToReturn, obj);
    } else if (currVal.type === 'object') {
        const reduceObject = {};
        const innerObject = Object.entries(currVal.properties)
            .reduce((reduceObject, [innerCurrKey, innerCurrValue]) => {
                return iterateProperties(reduceObject, innerCurrKey, innerCurrValue);
            }, {});

        const obj = {};
        obj[currKey] = innerObject;
        Object.assign(objToReturn, obj);
        return objToReturn;
    } else if (currVal.type === 'number') {
        const obj = {};
        obj[currKey] = 0;
        Object.assign(objToReturn, obj);
        return objToReturn;
    } else if (currVal.type === 'boolean') {
        const obj = {};
        obj[currKey] = false;
        Object.assign(objToReturn, obj);
        return objToReturn;
    } else {
        const obj = {};
        obj[currKey] = '';
        Object.assign(objToReturn, obj);
        return objToReturn;
    }
}

const schemaKeys = Object.entries(schema.properties).reduce(
    (objToReturn, [currKey, currVal]) => {
      return iterateProperties(objToReturn, currKey, currVal);
     }, {});



const initialValues = {
  firstName: '', 
  lastName: '', 
  email: '', 
  street: '', 
  streetTwo: '', 
  streetThree: '', 
  state: '', 
  zipcode: '',
  phone: '',
  ssn: ''
};

const Main = () => {
  return (
    <>
      <FormApp basename="/" initialValues={ schemaKeys } />
    </>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));
