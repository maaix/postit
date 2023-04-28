const {read,update} = require('../controllers/PriorityController');
const prioritedAnnotations = require("express").Router();

prioritedAnnotations.get('/show-priorited-annotations',read)
prioritedAnnotations.post('/update-priority/:id' ,update)

module.exports = prioritedAnnotations;