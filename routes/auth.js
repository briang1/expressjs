var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var routerFunc = function(siteCtx) {

    router.route('/sign_up')
        .post(function(req, res) {
            mongodb.connect(req.mongoUri, function(err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.username,
                    password: req.body.password
                };
                collection.insert(user, function(err, results) {
                    req.login(results.ops[0], function() {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });

    router.route('/sign_in')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            return res.redirect('/auth/profile');
        });

    router.route('/profile')
        .all(function(req, res, next) {
            if (!req.user) {
                return res.redirect('/');
            }
            next();
        })
        .get(function(req, res) {
            res.json(req.user);
        });

    return router;
};

module.exports = routerFunc;
