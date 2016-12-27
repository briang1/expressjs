var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var index = require('./routes/index')({foo: 'bar'});
var auth = require('./routes/auth')();
var admin = require('./routes/admin')();
var books = require('./routes/books')();

var app = express();
app.locals.siteTitle = 'Learning ExpressJS';
app.locals.user = null;
app.locals.nav = [
    {link: '/', text: 'Home'},
    {link: '/books', text: 'Books'}
];

// Make our db accessible to our router
app.use(function(req, res, next) {
    if (env === 'dev') {
        req.mongoUri = 'mongodb://localhost:27017/libraryApp';
    } else {
        req.mongoUri = process.env.MONGODB_URI;
    }
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'library'}));
app.use(flash());

require('./config/passport')(app);

app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use('/', index);
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/books', books);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
