/**
 * Created by janos on 22/11/14.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    PolymerComponent = mongoose.model('PolymerComponent');

// Create a new error handling controller method
var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

// Create a new controller method that creates new articles
exports.create = function(req, res) {
    // Create a new article object
    var polymerComponent = new PolymerComponent(req.body);

    // Try saving the article
    polymerComponent.save(function(err) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article
            res.json(polymerComponent);
        }
    });
};

// Create a new controller method that retrieves a list of articles
exports.list = function(req, res) {
    // Use the model 'find' method to get a list of articles
    PolymerComponent.find().sort('-created').exec(function(err, polymerComponents) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article
            res.json(polymerComponents);
        }
    });
};

// Create a new controller method that returns an existing article
exports.read = function(req, res) {
    res.json(req.polymerComponent);
};

// Create a new controller method that updates an existing article
exports.update = function(req, res) {
    // Get the article from the 'request' object
    var polymerComponent = req.polymerComponent;

    // Update the article fields
    polymerComponent.name = req.body.name;
    polymerComponent.githubshorthand = req.body.githubshorthand;
    polymerComponent.description = req.body.description;
    polymerComponent.author = req.body.author;

    // Try saving the updated article
    polymerComponent.save(function(err) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article
            res.json(polymerComponent);
        }
    });
};

// Create a new controller method that delete an existing article
exports.delete = function(req, res) {
    // Get the article from the 'request' object
    var polymerComponent = req.polymerComponent;

    // Use the model 'remove' method to delete the component
    polymerComponent.remove(function(err) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article
            res.json(polymerComponent);
        }
    });
};

// Create a new controller middleware that retrieves a single existing article
exports.polymerComponentByID = function(req, res, next, id) {
    // Use the model 'findById' method to find a single article
    PolymerComponent.findById(id).exec(function(err, polymerComponent) {
        if (err) return next(err);
        if (!polymerComponent) return next(new Error('Failed to load polymer component ' + id));

        // If an article is found use the 'request' object to pass it to the next middleware
        req.polymerComponent = polymerComponent;

        // Call the next middleware
        next();
    });
};
