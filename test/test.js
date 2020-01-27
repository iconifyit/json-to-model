/*
 * Copyright (c) 2020. Atomic Lotus, LLC
 */

// const fs          = require('fs'),
//       JsonToModel = require('json-to-js-model'),
//       kUTF8       = 'utf-8';

// import Icon from './Icon.js';
// import IconSet from './Icons.js';

// const {Icon}    = require('./Icon.js'),
//       {IconSet} = require('./IconSet.js');
//
// const iconData = JSON.parse(fs.readFileSync('./data-icons.json', kUTF8)),
//       setsData = JSON.parse(fs.readFileSync('./data-iconsets.json', kUTF8));
//
// // const icon    = new Icon(iconData[0]);
// const iconSet = new IconSet(setsData[0]);
//
// iconData.forEach(function(item) {
//     console.log(item);
//     iconSet.add(new Icon(item));
// });
//
// console.log('IconSet', iconSet);

const jsonToJsModel = require('../index');

console.log(new jsonToJsModel('Icon.json', './output').getOutput());
console.log(new jsonToJsModel('IconSet.json', './output').getOutput());
