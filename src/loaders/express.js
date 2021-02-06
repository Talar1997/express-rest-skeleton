const bodyParser = require('body-parser')
const errorResponseMiddleware = require('../controllers/response/errorResponse')
const securityLoader = require('./security')
const routesLoader = require('../api/index')
const corsLoader = require('./cors')
const compression = require("compression")
const contextLoader = require('./contextLoader')

module.exports = async (app) => {
    app.use(compression())
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    //Placement of contextLoader middleware is important!
    await contextLoader(app)

    await corsLoader(app)
    await securityLoader(app)
    await routesLoader(app)

    app.use(errorResponseMiddleware)
}