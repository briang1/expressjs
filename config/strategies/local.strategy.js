var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {
        var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(mongoUri, function(err, db) {
            var collection = db.collection('users');
            collection.findOne({
                username: username
            }, function(err, results) {
                if (results.password === password) {
                    done(null, results);
                } else {
                    done(null, false, {message: 'Bad Password'});
                }
            });
        });
    }));
};