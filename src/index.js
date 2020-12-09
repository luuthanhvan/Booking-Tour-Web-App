const mysql = require('mysql');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
dotenv.config();

const route = require('./routes');

/* Database connection */
const con = require('./config/db');

const PORT = process.env.PORT;
const HOST = process.env.HOSTNAME;

const app = express();

// Static files configuration
app.use(express.static(path.join(__dirname, 'public')));

/* Parsing body request */
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

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
    // console.log(con);
    next();
});

/* Routing */
route(app);

app.listen(PORT, HOST, () => console.log(`Server running at http://${HOST}:${PORT}`));
