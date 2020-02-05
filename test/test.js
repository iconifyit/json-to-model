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
        },
        Build : {
            className : 'Build',
            classFile : './output/Build.es5.js',
            jsonFile  : './test-data/data-build.json'
        },
        Meta : {
            className : 'Meta',
            classFile : './output/Meta.es5.js',
            jsonFile  : './test-data/data-meta.json'
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
        },
        Build : {
            className : 'Build',
            classFile : './output/Build.es6.js',
            jsonFile  : './test-data/data-build.json'
        },
        Meta : {
            className : 'Meta',
            classFile : './output/Meta.es6.js',
            jsonFile  : './test-data/data-meta.json'
        }
    },
]

inputs.map(function(item) {

    try {
        let Icon        = require(item.Icon.classFile),
            IconSet     = require(item.IconSet.classFile),
            IconJar     = require(item.IconJar.classFile),
            Group       = require(item.Group.classFile),
            Build       = require(item.Build.classFile),
            Meta        = require(item.Meta.classFile);

        let iconData    = JSON.parse(fs.readFileSync(item.Icon.jsonFile, kUTF8)),
            setsData    = JSON.parse(fs.readFileSync(item.IconSet.jsonFile, kUTF8)),
            groupData   = JSON.parse(fs.readFileSync(item.Group.jsonFile, kUTF8)),
            buildData   = JSON.parse(fs.readFileSync(item.Build.jsonFile, kUTF8)),
            metaData    = JSON.parse(fs.readFileSync(item.Meta.jsonFile, kUTF8));

        let iconJar     = new IconJar(),
            group       = new Group(groupData[0]),
            iconSet     = new IconSet(setsData[0]),
            build       = new Build(),
            meta        = new Meta(metaData[0]);

        build.setBuild('1');
        build.setVersion('1.1.1.1');

        meta.setBuild(build.valueOf());

        iconJar.setMeta(meta.valueOf());

        iconJar.groups[group.getIdentifier()] = group.valueOf();

        iconData.forEach(function(item, i) {

            try {
                console.log("\n")

                const name = item.name;

                console.log(`Creating Icon for item ${name}`)

                let icon = new Icon(item);

                console.log('*** ICON ***', icon);

                console.log(`Testing IconSet.add(icon)`)
                iconSet.add(icon);

                console.log(`Testing IconSet.get(${i})`)
                console.log("\n")

                console.log(iconSet.get(i))

                iconJar.items[icon.getIdentifier()] = icon.valueOf();
            }
            catch(e) {
                console.error(e);
            }
        });

        iconJar.sets[iconSet.getIdentifier()] = iconSet.valueOf();

        console.log('*** FINAL ***', iconJar);
    }
    catch(e) {
        console.error(e);
    }

});