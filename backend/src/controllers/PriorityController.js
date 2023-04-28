const Annotation = require("../models/Annotation");


module.exports.read = async(request,response) => {
    const priority = request.query;
    const prioritedNotes = await Annotation.find(priority);

    return response.json(prioritedNotes);
}

module.exports.update = async(request,response) => {
    const { id } = request.params;
    const annotation = await Annotation.findOne({_id:id});

    if(annotation.priority){
        annotation.priority = false;
    } else {
        annotation.priority = true;
    }

    await annotation.save();

    return response.json(annotation);
}