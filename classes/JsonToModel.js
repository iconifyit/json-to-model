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

const privateKeys = [
    kPRIMARY_KEY,
    kPARENT_KEY,
    kCHILDREN_KEY,
    kMODEL_TYPE,
    kCLASS_NAME
];

class JsonToModel {
    constructor(className, data, tpl, vars) {

        if (! className || typeof className !== 'string') {
            throw new Error('ClassName is required');
        }

        if (typeof data !== 'object') {
            throw new Error('data must be a JSON object');
        }

        const fs         = require('fs'),
              handlebars = require('handlebars'),
              kUTF8      = 'utf-8';


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

        const template = handlebars.compile(fs.readFileSync('../templates/' + tpl, kUTF8));

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

        for (var key in data) {

            if (privateKeys.indexOf(key) !== -1) continue;

            view.properties.push({
                name  : key,
                type  : typeof data[key],
                primary : key === data[kPRIMARY_KEY] ? true : false
            });

            view.setters.push({
                ClassName : className,
                name   : key,
                setter : 'set' + ucWords(key),
                type   : typeof data[key]
            });

            view.getters.push({
                ClassName : className,
                name      : key,
                getter    : 'get' + ucWords(key),
                type      : typeof data[key]
            });
        }

        return {
            toString : function() {
                return template(view)
            }
        }
    }
}

exports.JsonToModel = JsonToModel;
