
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
        const meta = JSON.parse(fs.readFileSync(input, kUTF8));

        /*
         * Make sure the JSON object has the required properties to determine the correct output.
         */

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
         * Primary key tells JsonToModel which property uniquely identifies an instance of the class.
         */
        if (! meta.__primaryKey) {
            throw new Error('model.__primaryKey is required in the JSON defintion');
        }

        /*
         * The parent property allows items and collections to be cross-referenced.
         */
        if (! meta.__parent) {
            throw new Error('model._parent is required in the JSON defintion');
        }

        /*
         * Create the model object.
         */
        const model = new JsonToModel(
            meta.__className,
            meta,
            path.join('./templates/', meta.__type === kTYPE_ITEM ? 'item.handlebars' : 'collection.handlebars')
        ).toString();

        /*
         * Write the JavaScript code to a new file.
         */
        fs.writeFileSync(path.join(output, meta.__className + '.js'), model, kUTF8);

        this.output = path.join(output, meta.__className + '.js');
    }

    getOutput() {
        return this.output;
    }
}

exports.JsonToJsModel = JsonToJsModel;
module.exports = JsonToJsModel;