var express = require('express');
var router = express.Router();

var routerFunc = function(siteCtx) {

    var bookService = require('../services/goodreads')();
    var bookController = require('../controllers/bookController')(bookService, siteCtx);

    router.route('/')
        .get(bookController.getIndex);

    router.route('/:id')
        .get(bookController.getById);

    return router;
};

module.exports = routerFunc;
