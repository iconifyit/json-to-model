/*
 * Copyright (c) 2020. Atomic Lotus, LLC
 */

const fs          = require('fs'),
      JsonToModel = require('json-to-js-model'),
      kUTF8       = 'utf-8';


const inputs = [
    {
        Icon : {
            className : 'Icon',
            classFile : './output/Icon.es5.js',
            jsonFile  : './test-data/data-icons.json'
        },
        IconSet : {
            className : 'IconSet',
            classFile : './output/IconSet.es5.js',
            jsonFile  : './test-data/data-iconsets.json'
        },

    },
    {
        Icon : {
            className : 'Icon',
            classFile : './output/Icon.es6.js',
            jsonFile  : './test-data/data-icons.json'
        },
        IconSet : {
            className : 'IconSet',
            classFile : './output/IconSet.es6.js',
            jsonFile  : './test-data/data-iconsets.json'
        },

    },
]

inputs.map(function(item) {
    let Icon    = require(item.Icon.classFile),
        IconSet = require(item.IconSet.classFile);

    let iconData = JSON.parse(fs.readFileSync(item.Icon.jsonFile, kUTF8)),
        setsData = JSON.parse(fs.readFileSync(item.IconSet.jsonFile, kUTF8));

    let iconSet = new IconSet(setsData[0]);

    iconData.forEach(function(item, i) {

        console.log("\n")
        const name = item.name;
        console.log(`Creating Icon for item ${name}`)
        iconSet.add(new Icon(item));

        console.log(`Testing IconSet.get(${i})`)
        console.log("\n")
        console.log(iconSet.get(i))
    });
});



// const jsonToJsModel = require('../index');
//
// console.log(new jsonToJsModel('Icon.json', './output').getOutput());
// console.log(new jsonToJsModel('IconSet.json', './output').getOutput());
