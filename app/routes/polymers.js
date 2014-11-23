/**
 * Created by janos on 22/11/14.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var polymerComponents = require('../controllers/polymers');

// Define the routes module' method
module.exports = function(app) {
    // Set up the 'articles' base routes
    app.route('/api/polymer-components')
        .get(polymerComponents.list)
        .post(polymerComponents.create);

    // Set up the 'articles' parameterized routes
    app.route('/api/polymer-components/:componentId')
        .get(polymerComponents.read)
        .put(polymerComponents.update)
        .delete(polymerComponents.delete);

    // Set up the 'articleId' parameter middleware
    app.param('componentId', polymerComponents.polymerComponentByID);
};