const mongoose = require('mongoose');

const AnnotationSchema = new mongoose.Schema({
    title: String,
    notes: String,
    priority:Boolean
});


module.exports = mongoose.model('Annotation',AnnotationSchema)