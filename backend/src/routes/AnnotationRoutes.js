const {create, read, remove, update} = require('../controllers/AnnotationController');
const annotations = require("express").Router();
const priority = require('./PriorityRoutes');

annotations.post('/add-annotations',create);
annotations.get('/show-annotations',read);
annotations.delete('/delete-annotations/:id',remove);
annotations.post('/update-annotations/:id', update)

annotations.use('/priority', priority)

module.exports = annotations;