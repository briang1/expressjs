var express = require('express');
var router = express.Router();

var routerFunc = function(siteCtx) {

    router.get('/', function (req, res, next) {
        res.render('index', {
            siteTitle: siteCtx.siteTitle,
            nav: siteCtx.nav,
            bookList: ['Book A', 'Book B', 'Book C']
        });
    });

    return router;
};

module.exports = routerFunc;
