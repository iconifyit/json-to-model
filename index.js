const fs            = require('fs'),
      path          = require('path'),
      {JsonToModel} = require('./classes/JsonToModel'),
      handlebars    = require('handlebars');

const kUTF8 = 'utf-8';

const itemJsonModel       = fs.readFileSync('./test/model-icon.json', kUTF8),
      collectionJsonModel = fs.readFileSync('./test/model-iconset.json', kUTF8);

const itemClass       = 'Icon',
      collectionClass = 'IconSet';

const itemModel = new JsonToModel(
    itemClass,
    JSON.parse(itemJsonModel),
    'item.handlebars'
).toString();

const collectionModel = new JsonToModel(
    collectionClass,
    JSON.parse(collectionJsonModel),
    'collection.handlebars',
    {ItemName : 'Icon'}
).toString();

fs.writeFileSync(path.join('test', itemClass + '.js'), itemModel, kUTF8);
fs.writeFileSync(path.join('test', collectionClass + '.js'), collectionModel, kUTF8);

// console.log('itemModel', itemModel);
// console.log('collectionModel', collectionModel)