const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

require('./guards/passport')(passport);

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use(
    session(
        {
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }
    )
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

const PORT = process.env.PORT || 4201;

app.listen(PORT, console.log('Server started'));