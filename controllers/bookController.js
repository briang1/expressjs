var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function (bookService, siteCtx) {

    var getIndex = function(req, res) {
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function(err, results) {
                res.render('books', {
                    siteTitle: siteCtx.siteTitle,
                    nav: siteCtx.nav,
                    books: results
                });
            });
        });
    };
    var getById = function(req, res) {
        var id = objectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.findOne({_id: id}, function(err, results) {
                if (results.bookId) {
                    bookService.getBookById(results.bookId, function(err, book) {
                        results.book = book;
                        res.render('book', {
                            siteTitle: siteCtx.siteTitle,
                            nav: siteCtx.nav,
                            book: results
                        });
                    });
                } else {
                    res.render('book', {
                        siteTitle: siteCtx.siteTitle,
                        nav: siteCtx.nav,
                        book: results
                    });
                }

            });
        });
    };

    return {
        getIndex: getIndex,
        getById: getById
    };
};

module.exports = bookController;