## Description

This package is used to interact with objects

## Basic Usage

*install*

`npm install --save wizebin/objex`

*import*

`import { get, set, has } from 'objex';`

## Api Reference

### get(object, path, defaultValue)

*parameters:*

* object: The object to get a value from
* path: The key path to pull the value from
    * This can be a string 'a.b.c' or an array ['a', 'b', 'c'] or null, if the key is null `object` is returned
* defaultValue: If there is no value at that location, (if that value comes out as `undefined`), get will return this value. If this value is not specified get will return undefined

*response:*

The value at that key

*example:*

    const person = {
        name: 'jeffery',
        address: {
            street: '123 fake st',
            city: 'faketown',
            state: 'FS',
            zip: '90909',
        }
    };

    get(person, 'address.city') // returns 'faketown'
    get(person, 'key.that.doesnot.exist') // returns undefined
    get(person, 'key.that.doesnot.exist', 'hola') // returns 'hola'
