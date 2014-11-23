/**
 * Created by janos on 22/11/14.
 */
"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var config = require('./config/config');

// DB stuff
var mongoose = require('./config/mongoose');
mongoose();

// Backend
var express = require('./config/express');
var app = express();

app.listen(config.port);
console.log("Polymers started, listening on " + config.port);
