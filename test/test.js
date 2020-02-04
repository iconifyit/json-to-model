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
        IconJar : {
            className : 'IconJar',
            classFile : './output/IconJar.es5.js',
            jsonFile  : './test-data/data-iconjars.json'
        },
        Group : {
            className : 'Group',
            classFile : './output/Group.es5.js',
            jsonFile  : './test-data/data-groups.json'
        }
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
        IconJar : {
            className : 'IconJar',
            classFile : './output/IconJar.es6.js',
            jsonFile  : './test-data/data-iconjars.json'
        },
        Group : {
            className : 'Group',
            classFile : './output/Group.es6.js',
            jsonFile  : './test-data/data-groups.json'
        }
    },
]

inputs.map(function(item) {
    let Icon        = require(item.Icon.classFile),
        IconSet     = require(item.IconSet.classFile),
        IconJar     = require(item.IconJar.classFile),
        Group       = require(item.Group.classFile);

    let iconData    = JSON.parse(fs.readFileSync(item.Icon.jsonFile, kUTF8)),
        setsData    = JSON.parse(fs.readFileSync(item.IconSet.jsonFile, kUTF8)),
        iconJarData = JSON.parse(fs.readFileSync(item.IconJar.jsonFile, kUTF8)),
        groupData   = JSON.parse(fs.readFileSync(item.Group.jsonFile, kUTF8));

    let iconSet     = new IconSet(setsData[0]),
        iconJar     = new IconJar(iconJarData[0]),
        group       = new Group(groupData[0]);

    iconData.forEach(function(item, i) {

        console.log("\n")

        const name = item.name;

        console.log(`Creating Icon for item ${name}`)

        iconSet.add(new Icon(item));

        console.log(`Testing IconSet.get(${i})`)
        console.log("\n")
        console.log(iconSet.get(i))

        console.log('iconJar', iconJar);
        console.log('group', group);
    });
});