var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function (bookService) {

    var getIndex = function(req, res) {
        mongodb.connect(req.mongoUri, function(err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function(err, results) {
                res.render('books', {
                    books: results
                });
            });
        });
    };
    var getById = function(req, res) {
        var id = objectId(req.params.id);
        mongodb.connect(req.mongoUri, function(err, db) {
            var collection = db.collection('books');
            collection.findOne({_id: id}, function(err, results) {
                if (results.bookId) {
                    bookService.getBookById(results.bookId, function(err, book) {
                        results.book = book;
                        res.render('book', {
                            book: results
                        });
                    });
                } else {
                    res.render('book', {
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