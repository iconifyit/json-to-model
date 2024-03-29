# json-to-js-model

Quickly and easily generate JavaScript models (POJsO - Plain Old JavaScript Objects) from a JSON object with getters &amp; setters, data type validation, including single item classes and collections.

## How it Works

`json-to-js-model` can be used as an import in a Node project or as a command-line utility. The tool takes a JSON description file of key -> value pairs and generates a JavaScript model with getters and setters.

### Single Item example

```json
{
  "identifier"   : "C60ED43C-FB42-4321-AAA4-2CD344CB2B91",
  "name"         : "girl-in-ballcap",
  "tags"         : "ballcap,girl,in",
  "file"         : "girl-in-ballcap.svg",
  "licence"      : "",
  "date"         : "2019-06-13 07:36:28",
  "width"        : 0,
  "height"       : 0,
  "parent"       : "E50143AB-F36E-4CA9-852A-46E83B1C3928",
  "type"         : 0,
  "unicode"      : "",
  "__primaryKey" : "identifier",
  "__parent"     : "parent",
  "__type"       : "item",
  "__className"  : "Icon"
}
```

The above JSON will be converted to a in both [es6 format](./test/output/Icon.es6.js) and [es5 format](./test/output/Icon.es5.js). Together with a related collection definition (shown below) you can quickly create models for items and collections for your app.

### Collection example

```json
{
  "identifier"   : "E50143AB-F36E-4CA9-852A-46E83B1C3928",
  "name"         : "Set Three",
  "parent"       : "B4FF6C41-534D-40CE-B5FF-6BFBB21E5471",
  "date"         : "2020-01-22 20:48:51",
  "licence"      : "",
  "sort"         : 2,
  "enabled"      : true,
  "children"     : [],
  "__primaryKey" : "identifier",
  "__parent"     : "parent",
  "__children"   : "children",
  "__type"       : "collection",
  "__className"  : "IconSet"
}
```

The above defintion will likewise generate a JavaScript model, related to the previous one, in [es6 format](./test/output/IconSet.es6.js) and [es5 format](./test/output/IconSet.es5.js) so you have what you need regardless which version of JavaScript your app is written in.

Notice that the `parent` property of the Icon definition points to the `identifier` property of the IconSet definition. Also notice the `__primaryKey` meta-property indicates the `identifier` property is the model's primary key.

For more insight, take a look at the example [definitions](./test/definitions), [output](./test/output), and [test-data](./test/test-data) in the enclosed [test](./test) directory

## Installation

`npm i --saveDev @atomiclotus/json-to-js-model`

## Usage

### Meta Properties

`json-to-js-model` can figure out which properties your class should have, but it needs some help understanding how your classes work together. For this reason, you will need to add some very basic `meta properties` to your JSON. Properties that begin with two underscores `__propertyName` are private and used by `json-to-js-model` to determine how to prepare or link the classes. There are only five (5) pre-defined private properties:

* __primaryKey
* __parent
* __children
* __type
* __className

You can use your actual JSON data to create the classes or you can code up schemas that are identical to your JSON data but include only sample data.

#### __primaryKey

Specifies the name of the primary key field such as ID, identifier, GUID, etc. This is not the *value* of the field, it is the *name* of the field.

As of version 1.1-alpha.4 you can set the `__primaryKey` property to `none` to indicate that the model should not have a primary key. This is useful for items that are not required to be unique. For example, you might have a collection of icons that are not required to be unique. You must still set the `__primaryKey` property of the collection, so that items can be given a `parent` property to associate the with a collection, but the item itself does not need to be unique. That said, you cannot omit the `__primaryKey` property. It _must_ be set to `none` to disallow the uniqe requirement.

#### __parent

Specifies the name of the parent field. The parent field connects items and sets (collections) via a primary key. The `__parent` should be set on the single item and should point to the `__primaryKey` of the collection.

#### __children

Specifies the field on the collection which will contain the array of single items. This is the name of the field, not the value of the field. `__children` should be set on the collection definition, not the item unless items can also be collections such as in a multi-level hierarchy.

#### __type

The type can be either `item` or `collection` and tells `json-to-js-model` which JavaScript class template to use.

#### __className

Specifies the name of the class to be created.

### Specifying Data Types

In most cases, `json-to-js-model` can figure out what the intended type is, including dates (using `Date.parse()`). If you encounter an error in `json-to-js-model`'s type detection, you can explicitly declare the type by appending it to the field (property) name with double colons `firstName::string` or `birthday::date` or `age::number`. `json-to-js-model` will honor the declared type over all other considerations. It will also strip the type declaration from the final property name so you won't end up with `firstName::string` in your JS class.

**DO NOT** add type delcarations to meta properties (those with two underscores at the beginning of the name).

**NB** : On the roadmap I plan to add complex type validations like `url`, `email`, etc. The best way to learn how to use the package is probably looking at the files in `test`, in particular the `definitions`. The markup is very simple and easy-to-understand. It's just JSON with a few extra properties to tell the parser how you intend for your classes to be connected.

#### Example Type Declaraction

```json
{
  "identifier::string"   : "C60ED43C-FB42-4321-AAA4-2CD344CB2B91",
  "parent::string"       : "E50143AB-F36E-4CA9-852A-46E83B1C3928",
  "name::string"         : "girl-in-ballcap",
  "tags::array"          : ["girl", "ball cap", "baseball"],
  "file::string"         : "girl-in-ballcap.svg",
  "licence::string"      : "",
  "modified::date"       : "2019-06-13 07:36:28",
  "width::number"        : 0,
  "height:number"        : 0,

  "__primaryKey" : "identifier",
  "__parent"     : "parent",
  "__type"       : "item",
  "__className"  : "Icon"
}
```

#### Typed Arrays

`json-to-js-model` also supports typed arrays as a property type. If you declare a property type as a typed array, for instance `string[]` (meaning an array of strings), the utility will add the accompanying methods to add, remove, and check to see if an item exists in the array.

```json
{
  "name::string"       :  "Plugin Name",
  "client::string[]"   : [],
  "host::object[]"     : [],
  "disabled::boolean"  : false,

  "__className"  : "Plugin",
  "__type"       : "item",
  "__primaryKey" : "name",
  "__parent"     : "plugins"
}
```

Notice that the `client` and `host` properties specify a `array of strings` and `array of objects` as the value types. The class generated by `json-to-js-model` will include `addClient`, `addHost`, `removeClient`, `removeHost`, `hasClient`, and `hasHost` in addition to the retular getters and setters. What's more, the methods validate that the input arguments are the correct type. See [Plugin.e6.js](test/output/Plugin.es6.js) for a detailed example.

#### Example command-line usage:

Currently `json-to-js-model` can only process a single file at a time. The final RC version will include support for multiple input files and directory inputs.

```bash
node cli.js ./path/to/item.json ./path/to/collection.json
```

#### Example import usage:

```javascript
const jsonToJsModel = require('json-to-js-model');

console.log(new jsonToJsModel('Icon.json', './output').getOutput());
console.log(new jsonToJsModel('IconSet.json', './output').getOutput());
```

## Why is this not written in modern JavaScript?

That is a legitimate question and I wish I _could_ write it all in ES6, but I primarily built this tool for my own needs building Adobe CEP (Common Extensibility Platform) extensions for Adobe Illustrator. Since CEP is an older technology, it does not _always_ support ES6. Each Adobe product has a different extension API. Some use UXP (XD, for example) and others (most) use their own implementation of CEP which is based on CEF (Chromium Extension Framework). 

So in order to be able to use the tool for my work building Illustrator and Photoshop extensions, I had to generate ES5 classes instead of ES6. This is, however, _alpha_ code and the plan is to update the package itself to use only ES6 and to generate both ES6 and ES5 output.

## Known Issues

- A fair amount of code is duplicated in paired collection and item classes.
- Methods like `generateUUID()` do not belong in the resulting class. They were added to avoid dependencies. The solution is to output a utility file with the classes that will allow developers to either use the provided utility file, or roll their own. Another option is to use existing NPM packages for this functionality whenever possible.Everything is a trade-off and for now self-encapsulation is the best, simplest solution.
- Need to remove unnecessary dev files from package.

## Roadmap

- Add complex type validations for things like email, url, etc.
- Add unit tests for this package and for resulting classes (some basic testing is in test.js already)
- Add recursive parsing to allow class hierarchies to be defined in a single JSON file.
- Add support for multiple file inputs via cli
- Add support for directories as input for cli