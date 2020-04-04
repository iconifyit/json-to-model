/*
 * Copyright (c) 2020.-present Atomic Lotus, LLC - Scott Lewis <scott@atomiclotus.net>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function ucWords(str) {
    return str.replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
}

const kPRIMARY_KEY  = '__primaryKey',
      kCHILDREN_KEY = '__children',
      kPARENT_KEY   = '__parent',
      kMODEL_TYPE   = '__type',
      kCLASS_NAME   = '__className';

const kDIRECTIVES = new Set([
    kPRIMARY_KEY,
    kPARENT_KEY,
    kCHILDREN_KEY,
    kMODEL_TYPE,
    kCLASS_NAME
]);

class JsonToModel {
    constructor(className, data, tpl, vars) {

        const fs         = require('fs'),
              handlebars = require('handlebars'),
              kUTF8      = 'utf-8',
              Inflector  = require('inflected');

        this.handlebars = handlebars;
        this.Inflector  = Inflector;

        this.addHandlebarsPlugins();

        const template = this.handlebars.compile( fs.readFileSync(tpl, kUTF8) );

        const view = {
            ClassName   : className,
            properties  : [],
            getters     : [],
            setters     : [],
            adders      : [],
            removers    : [],
            hassers     : [],
            primaryKey  : data[kPRIMARY_KEY],
            parentKey   : data[kPARENT_KEY],
            childrenKey : data[kCHILDREN_KEY]
        };

        if (typeof vars !== 'undefined') {
            for (var key in vars) {
                view[key] = vars[key];
            }
        }

        for (var key in data) {

            let value;

            // console.log('(1) key', key)

            if (kDIRECTIVES.has(key)) continue;

            value = typeof data[key] === 'undefined' ? 'null' : data[key];

            const {propName, valueType, returnType, singleType}  = this.getValueType(key, value);
            const {defaultValue} = this.getDefaultValue(key);

            // console.log('(2) returnType', returnType)

            const isTypedArray = key.indexOf('[]') >= 0 ? true : false;

            view.properties.push({
                name         : propName,
                type         : valueType,
                primary      : propName === data[kPRIMARY_KEY] ? true : false,
                returnType   : returnType,
                singleType   : singleType,
                defaultValue : defaultValue,
                isTypedArray : isTypedArray
            });

            view.setters.push({
                ClassName  : className,
                name       : propName,
                setter     : 'set' + ucWords(propName),
                type       : valueType,
                singleType : singleType,
                returnType : returnType,
                isTypedArray : isTypedArray
            });

            view.getters.push({
                ClassName  : className,
                name       : propName,
                getter     : 'get' + ucWords(propName),
                type       : valueType,
                singleType : singleType,
                returnType : returnType,
                isTypedArray : isTypedArray
            });

            if (defaultValue === '[]') {

                var singlePropName   = Inflector.singularize(propName),
                    ucSinglePropName = ucWords(singlePropName);

                view.adders.push({
                    ClassName  : className,
                    name       : propName,
                    method     : 'add' + ucSinglePropName,
                    type       : valueType,
                    singleType : singleType,
                    returnType : returnType,
                    isTypedArray : isTypedArray
                });

                view.removers.push({
                    ClassName  : className,
                    name       : propName,
                    method     : 'remove' + ucSinglePropName,
                    type       : valueType,
                    singleType : singleType,
                    returnType : valueType,
                    isTypedArray : isTypedArray
                });

                view.hassers.push({
                    ClassName  : className,
                    name       : propName,
                    method     : 'has' + ucSinglePropName,
                    type       : valueType,
                    singleType : singleType,
                    returnType : 'boolean',
                    isTypedArray : isTypedArray
                });
            }
        }

        return {
            toString : function() {
                return template(view)
            }
        }
    }

    /**
     * Get default value based on valueType
     * @param key
     * @returns {string}
     */
    getDefaultValue(valueType) {
        let defaultValue = 'null',
            returnType   = 'string';

        valueType = valueType.split('::').pop();

        if (valueType.indexOf('[]') === valueType.length - 2) {
            defaultValue = '[]';
            returnType   = valueType.replace('[]', '');
        }
        else if (valueType === 'array') {
            defaultValue = '[]';
            returnType = 'array';
        }
        else if (valueType === 'date') {
            defaultValue = "(new Date()).toISOString()";
            returnType = 'date';
        }
        else if (valueType === 'number') {
            defaultValue = '0';
            returnType = 'number';
        }
        else if (valueType === 'boolean') {
            defaultValue = 'false';
            returnType = 'boolean';
        }
        else if (valueType === 'object') {
            defaultValue = '{}';
            returnType = 'object';
        }

        // console.log('(3) defaultValue, returnValue', {
        //     valueType    : valueType,
        //     defaultValue : defaultValue,
        //     returnType   : returnType
        // })

        return {
            defaultValue : defaultValue,
            returnType : returnType
        };
    }

    /**
     * If the JSON includes an explicit type declaration,
     * assume the developer knows what they are doing,
     * and ignore the computed type.
     * @param key
     * @param value
     * @returns {{valueType: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), propName: *}}
     */
    getValueType(key, value) {

        // console.log( '(4) key', key )
        
        let propName   = key,
            valueType  = typeof value,
            singleType    = null,
            returnType = typeof value

        const isDeclared = key.indexOf('::') >= 0;

        if (! isDeclared) {
            if (value instanceof Array) {
                values.valueType = 'array';
            }
            else if (Date.parse(value)) {
                values.valueType = 'date';
            }
        }
        else {
            // plugins::plugin[]
            // propName :: type

            let bits = key.split('::');
            
            propName   = bits[0];
            valueType  = bits[1];
            returnType = bits[1];

            if (valueType.indexOf('[]') >= 0) {
                singleType    = valueType.replace('[]', '');
                returnType = 'array';
                valueType  = 'array';
            }
        }
        
        // console.log('(5)  getValueType **', {
        //     propName   : propName,
        //     valueType  : valueType,
        //     singleType    : singleType,
        //     returnType : returnType
        // });

        return {
            propName   : propName,
            valueType  : valueType,
            singleType    : singleType,
            returnType : returnType
        };
    }

    addHandlebarsPlugins() {

        var self = this;

        this.handlebars.registerHelper('ucWords', function(str) {
            try {
                return str.replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                });
            }
            catch(e) {

            }
        });

        this.handlebars.registerHelper('eq', function(a, b) {
            return a === b;
        });

        this.handlebars.registerHelper('typeof', function(value) {
            return typeof value;
        });

        this.handlebars.registerHelper('bracket', function(num, options = num) {
            const i = Number.isInteger(num) ? num : 1;
            const open = '{'.repeat(i);
            const close = '}'.repeat(i);
            return `${open}${options.fn(this)}${close}`;
        });

        this.handlebars.registerHelper('getRequiredType', function(type) {
            if (type.indexOf('[]') === type.length -2) {
                return type.replace('[]');
            }
            return type;
        });

        this.handlebars.registerHelper('singularize', function(type) {
            return self.Inflector.singularize(type);
        });

        this.handlebars.registerHelper('ucSingularize', function(type) {
            let str = self.Inflector.singularize(type);
            return str.replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            })
        });
    }
}

exports.JsonToModel = JsonToModel;
