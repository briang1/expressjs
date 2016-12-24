var express = require('express');
var router = express.Router();

var routerFunc = function() {

    var bookService = require('../services/goodreads')();
    var bookController = require('../controllers/bookController')(bookService);

    router.route('/')
        .get(bookController.getIndex);

    router.route('/:id')
        .get(bookController.getById);

    return router;
};

module.exports = routerFunc;
