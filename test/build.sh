#!/usr/bin/env bash

node ../cli.js ./definitions/Icon.json ./output
node ../cli.js ./definitions/IconSet.json ./output

node ./test.js