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

Properties that begin with two underscores `__propertyName` are private and used by json-to-js-model to determine how to prepare or link the classes. There are only five (5) pre-defined 
private properties:

- __primaryKey
- __parent
- __children
- __type
- __className

#### __primaryKey

Specifies the name of the primary key field such as ID, identifier, GUID, etc. This is not the *value* of the field, it is the *name* of the field.

#### __parent

Specifies the name of the parent field. The parent field connects items and sets (collections) via a primary key. The __parent should be set on 
the single item and should point to the __primaryKey of the collection.

#### __children

Specifies the field on the collection which will contain the array of single items. This is the name of the field, not the value of the field. 
__children should be set on the collection definition, not the item unless items can also be collections such as in a multi-level hierarchy.

### __type

The type can be either `item` or `collection` and tells json-to-js-model which JavaScript class template to use.

#### __className

Specifies the name of the class to be created.

#### Example command-line usage:

Notice that you can pass as many file paths as you want. The file paths point to the JSON description files for the classes to be created.

```bash
node cli.js ./path/to/item.json ./path/to/collection.json
```

#### Example import usage:

```javascript
const jsonToJsModel = require('../index');

console.log(new jsonToJsModel('Icon.json', './output').getOutput());
console.log(new jsonToJsModel('IconSet.json', './output').getOutput());
```