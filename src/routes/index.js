const siteRouter = require('./site');
const manageRouter = require('./manage');

function route(app){
    app.use('/', manageRouter);
    app.use('/', siteRouter);
}

module.exports = route;