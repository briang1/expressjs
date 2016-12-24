var express = require('express');
var router = express.Router();

var routerFunc = function(ctx) {

    router.get('/', function (req, res, next) {
        res.render('index', {
            foo: ctx.foo,
            bookList: ['Book A', 'Book B', 'Book C']
        });
    });

    return router;
};

module.exports = routerFunc;
