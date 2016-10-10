"use strict";

/**
 * Created by Veshtemov on 04.10.2016.
 */

let nconf = require('nconf');
let path = require('path');

nconf.argv()
    .env()
    .file({file: path.join(__dirname, 'config.json')});

module.exports = nconf;