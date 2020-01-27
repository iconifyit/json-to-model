#!/usr/bin/env node

/*
 * Capture CLI arguments.
 */
const [,, ...args] = process.argv

/*
 * Make sure we have at least one argument.
 */
if (args.length === 0) {
    console.log(
        "\nUsage : \n" +
        "    @param Path to JSON definition file \n" +
        "\n" +
        "See `link` for full documentation.\n"
    );
    return;
}

/*
 * Import dependencies.
 */
const fs          = require('fs'),
    path          = require('path'),
    {JsonToModel} = require('./classes/JsonToModel'),
    handlebars    = require('handlebars');

/*
 * String constants.
 */
const kUTF8            = 'utf-8',
      kTYPE_ITEM       = 'item',
      kTYPE_COLLECTION = 'collection';

/*
 * For the output file paths.
 */
const output = [];

/*
 * Loop through the arguments (input file paths).
 */
args.forEach(function(arg) {
    const meta = JSON.parse(fs.readFileSync(arg, kUTF8));

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
        meta.__type === kTYPE_ITEM ? 'item.handlebars' : 'collection.handlebars'
    ).toString();

    /*
     * Write the JavaScript code to a new file.
     */
    fs.writeFileSync(path.join('./', meta.__className + '.js'), model, kUTF8);

    /*
     * Add new file path to the output array.
     */
    output.push(path.join('./', meta.__className + '.js'));
})

/*
 * Show the done message.
 */
console.log('Done! Your files can be found at ' + output.join(', '));