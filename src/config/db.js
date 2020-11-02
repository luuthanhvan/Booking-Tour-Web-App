const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    multipleStatements: true,
});

connection.connect((err) => {
    // console.log(connection);
    if (err) {
        console.log(err.message);
    }
    console.log('Database ' + connection.state);
});

module.exports = connection;
