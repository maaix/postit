const routes = require('express').Router();
const annotations = require('./AnnotationRoutes');

routes.use('/annotations', annotations);


module.exports = routes;


