/**
 * Created by janos on 22/11/14.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define a new 'PolymerComponentSchema'
var PolymerComponentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    githubshorthand: {
        type: String,
        default: '',
        required: 'GitHub shorthand cannot be blank',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    author: {
        type: String,
        default: '',
        required: 'Author cannot be blank',
        trim: true
    }
});

mongoose.model('PolymerComponent', PolymerComponentSchema);