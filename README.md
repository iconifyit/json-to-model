# json-to-js-model

Converts a JSON object to JavaScript class (singles &amp; multiples) with getters &amp; setters.

## Usage:

json-to-js-model can be used as an import in a Node project or as a command-line utility. The tool takes a JSON
description file of key -> value pairs and generates a JavaScript model with getters and setters.

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
  "parent"       : "F19A7973-0CB3-4751-B74F-E2AF0F9B2AF4",
  "type"         : 0,
  "unicode"      : "",
  "__primaryKey" : "identifier",
  "__parent"     : "parent",
  "__type"       : "item",
  "__className"  : "Icon"
}
```
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

## Usage

### Meta Properties

`JsonToJsModel` can figure out which properties your class should have, but it nees some help understanding 
how your classes work together. For this reason, you will need to add some very basic "meta properties to 
your JSON. Properties that begin with two underscores `__propertyName` are private and used by json-to-js-model to 
determine how to prepare or link the classes. There are only five (5) pre-defined 
private properties:

```
- __primaryKey
- __parent
- __children
- __type
- __className
```

You can use your actual JSON data to create the classes or you can code up schemas that are identical to your 
JSON data but include only sample data.

#### __primaryKey

Specifies the name of the primary key field such as ID, identifier, GUID, etc. This is not the *value* of the field, it is the *name* of the field.

#### __parent

Specifies the name of the parent field. The parent field connects items and sets (collections) via a primary key. The __parent should be set on 
the single item and should point to the __primaryKey of the collection.

#### __children

Specifies the field on the collection which will contain the array of single items. This is the name of the field, not the value of the field. 
__children should be set on the collection definition, not the item unless items can also be collections such as in a multi-level hierarchy.

#### __type

The type can be either `item` or `collection` and tells json-to-js-model which JavaScript class template to use.

#### __className

Specifies the name of the class to be created.

### Specifying Data Types

In most cases, `JsonToJsModel` can figure out what the intended type is, including dates (using `Date.parse()`). 
If you encounter an error in `JsonToJsModel`'s type detection, you can explicitly decale the type by appending it 
to the field (property) name with double colons `firstName::string` or `birthday::date` or `age::number`. 
`JsonToJsModel` will honor the declared type over all other considerations. It will also strip the type declaration 
from the final property name so you won't end up with `firstName::string` in your JS class.

**DO NOT** add type delcarations to meta properties (those with two underscores at the beginning of the name).

NB : On the roadmap I plan to add complex type validations like `url`, `email`, etc.

#### Example Type Declaraction

```json
{
  "identifier::string"   : "C60ED43C-FB42-4321-AAA4-2CD344CB2B91",
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

#### Example command-line usage:

Notice that you can pass as many file paths as you want. The file paths point to the JSON description 
files for the classes to be created.

```bash
node cli.js ./path/to/item.json ./path/to/collection.json
```

#### Example import usage:

```javascript
const jsonToJsModel = require('../index');

console.log(new jsonToJsModel('Icon.json', './output').getOutput());
console.log(new jsonToJsModel('IconSet.json', './output').getOutput());
```

## Why is this not written in modern JavaScript?

That is a legitimate question and I wish I _could_ write it all in ES6, but I primarily built this tool for my own needs 
building Adobe CEP (Common Extensibility Platform) extensions for Adobe Illustrator. Since CEP is an older technology, 
it does not _always_ support ES6. Each Adobe product has a different extension API. Some use UXP (XD, for example) and 
others (most) use their own implementation of CEP which is based on CEF (Chromium Extension Framework). 

So in order to be able to use the tool for my work building Illustrator and Photoshop extensions, I had to generate 
ES5 classes instead of ES6. This is, however, _alpha_ code and the plan is to update the package itself to use only 
ES6 and to generate both ES6 and ES5 output.