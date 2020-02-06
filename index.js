/*
 * Import dependencies.
 */
const fs            = require('fs'),
      path          = require('path'),
      {JsonToModel} = require('./classes/JsonToModel'),
      handlebars    = require('handlebars');

/*
 * String constants.
 */
const kUTF8            = 'utf-8',
      kTYPE_ITEM       = 'item',
      kTYPE_COLLECTION = 'collection';

class JsonToJsModel {

    /**
     * Class constructor.
     * @param   {string}    input   A file path to the JSON file to convert to a JS model.
     * @param   {string}    output  The output folder path (Output file is named automatically).
     * @returns {string}    Returns the output file path.
     * @constructor
     */
    constructor(input, output) {

        if ((typeof input === 'undefined' || null === input) ||
            (typeof input === 'string' && input.replace(/\s/g, '') === '')) {

            throw new Error('No input file path provided to constructor');
        }

        if (! fs.existsSync(input)) {
            throw new Error('File ' + input + ' does not exist');
        }

        if ((typeof output === 'undefined' || null === output) ||
            (typeof output === 'string' && output.replace(/\s/g, '') === '')) {

            throw new Error('No output file path provided to constructor');
        }

        /*
         * Loop through the arguments (input file paths).
         */
        let meta = undefined;
        try {
            meta = JSON.parse(fs.readFileSync(input, kUTF8));
        }
        catch(e) {
            throw new Error('Could not parse `meta` JSON. ' + e.message);
        }

        /*
         * Make sure the JSON object has the required properties to determine the correct output.
         */
        if (typeof meta !== 'object') {
            throw new Error('META must be a JSON object. `' + typeof meta + '` given');
        }

        /*
         * Class name is required to know what we are creating.
         */
        if (! meta.__className) {
            throw new Error('model.__className is required in the JSON defintion');
        }

        /*
         * The type tells JsonToModel which class template to use.
         */
        if (! meta.__type) {
            throw new Error('model.__type is required in the JSON defintion');
        }

        /*
         * Create the model object.
         */

        let rootDir = './';

        if (! fs.existsSync('./templates/') && fs.existsSync('../templates/')) {
            rootDir = '../';
        }

        console.log('rootDir', rootDir);

        const es5__model = new JsonToModel(
            meta.__className,
            meta,
            path.join(
                rootDir,
                'templates',
                meta.__type === kTYPE_ITEM ?
                    'es5--item.handlebars' :
                    'es5--collection.handlebars'
            )
        ).toString();

        const es6__model = new JsonToModel(
            meta.__className,
            meta,
            path.join(
                rootDir,
                'templates',
                meta.__type === kTYPE_ITEM ?
                    'es6--item.handlebars' :
                    'es6--collection.handlebars'
            )
        ).toString();

        /*
         * Write the JavaScript code to a new file.
         */
        const es5__path = path.join(output, meta.__className + '.es5.js'),
              es6__path = path.join(output, meta.__className + '.es6.js');

        /*
         * Create the output folder if it does not exist.
         */
        if (! fs.existsSync(output)) {
            fs.mkdirSync(output);
        }

        fs.writeFileSync(es5__path, es5__model, kUTF8);
        fs.writeFileSync(es6__path, es6__model, kUTF8);

        this.output = [ es5__path, es6__path ];
    }

    getOutput() {
        return this.output;
    }
}

(function (root, factory, moduleName, theModule) {
    if (typeof define === 'function' && define.amd) {
        define([moduleName], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = theModule;
    }
    else if (typeof exports === 'object') {
        exports[moduleName] = theModule;
    }
    else {
        root.returnExports = factory(root[moduleName]);
    }
}(typeof self !== 'undefined' ? self : this, function(theModule) {
    return theModule;
}, 'JsonToJsModel', JsonToJsModel));
