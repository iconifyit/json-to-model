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

const jsonToJsModel = require('./index');

console.log(new jsonToJsModel(args[0], args[1]).getOutput());
// console.log(new jsonToJsModel('IconSet.json', './output').getOutput());