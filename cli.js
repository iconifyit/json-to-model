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

const intput = args[0],
      output = args[1];

console.log(
    new jsonToJsModel(input, output).getOutput()
);
