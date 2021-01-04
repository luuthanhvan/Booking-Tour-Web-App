const mysql = require('mysql');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const dotenv = require('dotenv');
const route = require('./routes');
const app = express();

/* Database connection */
const con = require('./config/db');

dotenv.config();

// Static files configuration
app.use(express.static(path.join(__dirname, 'public')));

/* Parsing body request */
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

/* Use the session middleware */
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
}));

/* Template engine */
app.engine('.hbs', exphbs({
    // handlebars config
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'resources/views/layouts'),
    partialsDir: path.join(__dirname, 'resources/views/partials'),
}));
app.set('view engine', '.hbs');
// The views directory is in ./resource/views so we need to indicate the path to views directory
app.set('views', path.join(__dirname, 'resources/views'));

/* Connecting route to database */
app.use(function(req, res, next) {
    req.con = con;
    next();
});

/* Routing */
route(app);

app.listen(process.env.PORT, process.env.HOSTNAME, () => console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}`));
