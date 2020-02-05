/*
 * Copyright (c) 2020.-present Atomic Lotus, LLC - Scott Lewis <scott@atomiclotus.net>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// vendor/datejs/build/date-en-US.js

const DateJS = require('../vendor/datejs/build/date');


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

        // ===============================================================
        // ======================= @ Handlebars @ ========================
        // ===============================================================

        this.addHandlebarsPlugins(handlebars);

        const template = handlebars.compile( fs.readFileSync(tpl, kUTF8) );

        // ===============================================================
        // ======================= ! Handlebars ! ========================
        // ===============================================================

        const view = {
            ClassName   : className,
            properties  : [],
            getters     : [],
            setters     : [],
            primaryKey  : data[kPRIMARY_KEY],
            parentKey   : data[kPARENT_KEY],
            childrenKey : data[kCHILDREN_KEY]
        };

        if (typeof vars !== 'undefined') {
            for (var key in vars) {
                view[key] = vars[key];
            }
        }

        var value, valueType, defaultValue;

        var props = this.walkTree(data);
        console.log(props);
        // fs.writeFileSync('./tmp/properties.' + new Date().getTime() + '.json', JSON.stringify(props))

        for (var key in data) {

            var bits,
                value,
                valueType,
                propName,
                defaultValue;

            if (kDIRECTIVES.has(key)) continue;

            value        = data[key];
            propName     = key;
            valueType    = typeof value;
            defaultValue = 'null';

            if (value instanceof Array) {
                defaultValue = '[]';
                valueType = 'array';
            }
            else if (Date.parse(value)) {
                valueType = 'date';
                defaultValue = "(new Date()).toISOString()";
            }
            else if (valueType === 'number') {
                defaultValue = '0';
            }
            else if (valueType === 'boolean') {
                defaultValue = 'false';
            }
            else if (valueType === 'object') {
                defaultValue = '{}';
            }

            /*
             * If the JSON includes an explicit type declaration,
             * assume the developer knows what they are doing,
             * and ignore the computed type.
             */
            bits = key.split('::');

            if (bits.length == 2) {
                propName  = bits[0];
                valueType = bits[1];
            }

            view.properties.push({
                name    : propName,
                type    : valueType,
                primary : propName === data[kPRIMARY_KEY] ? true : false,
                defaultValue : defaultValue
            });

            view.setters.push({
                ClassName : className,
                name      : propName,
                setter    : 'set' + ucWords(propName),
                type      : valueType
            });

            view.getters.push({
                ClassName : className,
                name      : propName,
                getter    : 'get' + ucWords(propName),
                type      : valueType
            });
        }

        return {
            toString : function() {
                return template(view)
            }
        }
    }

    createClass(json) {

    }

    walkTree(item, properties = {}) {
        for (var key in item) {
            var value = item[key];
            properties[key] = typeof value === 'object'
                    ? this.walkTree(value)
                    : value
        }
        return properties
    }

    addHandlebarsPlugins(handlebars) {
        handlebars.registerHelper('ucWords', function(str) {
            return str.replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
        });

        handlebars.registerHelper('eq', function(a, b) {
            return a === b;
        });

        handlebars.registerHelper('typeof', function(value) {
            return typeof value;
        });

        handlebars.registerHelper('bracket', function(num, options = num) {
            const i = Number.isInteger(num) ? num : 1;
            const open = '{'.repeat(i);
            const close = '}'.repeat(i);
            return `${open}${options.fn(this)}${close}`;
        });
    }
}

exports.JsonToModel = JsonToModel;
