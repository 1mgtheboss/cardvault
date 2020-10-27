'use strict';

var index = require('../controllers/index');
var final = require('../controllers/final');
var final1 = require('../controllers/final1');

function initSessionVars() {
    return function(req, res, next) {
        if (!req.session.data) {
            req.session.data = {};
        }
        if (!req.session.data.messages || !req.session.data.messages.errors) {
            req.session.data.messages = {};
            req.session.data.messages.errors = [];
        }
        next();
    }
}

module.exports = function(app) {
    app.use(initSessionVars());
    app.get('/', index.get);
    app.post('/', index.post);
    app.get('/index', index.get);
    app.post('/index', index.post);
    app.get('/final', final.get);
    app.post('/final', final.post);
    app.get('/final1', final1.get);
    app.post('/final1', final1.post);
};