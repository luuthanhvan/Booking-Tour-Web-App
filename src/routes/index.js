const siteRouter = require('./site');
const bookingRouter = require('./booking');
const manageRouter = require('./manage');

function route(app){
    app.use('/', siteRouter);
    app.use('/', bookingRouter);
    app.use('/', manageRouter);
}

module.exports = route;
