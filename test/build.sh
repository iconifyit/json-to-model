#!/usr/bin/env bash

#node ../cli.js ./definitions/Icon.json ./output
#node ../cli.js ./definitions/IconSet.json ./output
#node ../cli.js ./definitions/IconJar.json ./output
#node ../cli.js ./definitions/Group.json ./output
#node ../cli.js ./definitions/Build.json ./output
#node ../cli.js ./definitions/Meta.json ./output
#node ../cli.js ./definitions/Plugin.json ./output
#node ../cli.js ./definitions/Plugins.json ./output

node ../cli.js ./definitions/Groups.json ./output
node ../cli.js ./definitions/Sets.json ./output

#node ./test.js