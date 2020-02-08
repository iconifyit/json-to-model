/*
 * Copyright (c) 2020.-present Atomic Lotus, LLC - Scott Lewis <scott@atomiclotus.net>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const getValueType = (key, value) => {

    let bits = key.split('::'),
        values = {
            propName     : key,
            valueType    : typeof value,
            defaultValue : 'null',
            valueSubType : undefined
        };

    if (value instanceof Array) {
        values.valueType = 'array';
    }
    else if (Date.parse(value)) {
        values.valueType = 'date';
    }

    if (bits.length == 2) {

        let valueType = bits[1],
            valueSubType;

        console.log(valueType.indexOf('[]'));

        if (valueType.indexOf('[]') === valueType.length - 2) {
            valueSubType = valueType.replace('[]', '');
            valueType = 'array';
        }

        values = {
            propName     : bits[0],
            valueType    : valueType,
            valueSubType : valueSubType
        }
    }

    return values;
}

console.log(getValueType('foo::object[]', 'bar'));