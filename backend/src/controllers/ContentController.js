const Annotation = require("../models/Annotation");


module.exports.update = async (request,response) => {
    const {id} = request.params;

    const annotation = await Annotation.findOne({_id:id});

    if(annotation){
        annotation.title = updatedAnnotation;
        annotation.notes = updatedNotes;
    }

}