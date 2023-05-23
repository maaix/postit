const Annotations = require('../models/Annotation');

module.exports.create = async (request,response) => {
    const {title, notes, priority} = request.body;

    if (!notes || !title){
        return response.status(400).json({error: "Empty fields are no allowed!"});
    }

    const annotationCreated = await Annotations.create({
        title,
        notes,
        priority
    })

    return response.json(annotationCreated);
};

module.exports.read = async (request, response) => {
    const annotationList = await Annotations.find();

    return response.json(annotationList);
};

module.exports.readPrioritedAnottations = async (request, response) => {
    const annotationList = await Annotations.find({priority: true});

    return response.json(annotationList);
};

module.exports.readNotPrioritedAnottations = async (request, response) => {
    const annotationList = await Annotations.find({priority: false});

    return response.json(annotationList);
};

module.exports.remove = async (request,response) => {
    const { id } = request.params;
    const annotationDeleted = await Annotations.findOneAndDelete({ _id:id });

    if(!annotationDeleted){
        return response.status(401).json({error: 'Cannot Delete! register was not found!'});
    }

    return response.json(annotationDeleted);
};

module.exports.update = async (request,response) => {
    const {id} = request.params;
    const { title, notes } = request.body;

    const annotation = await Annotations.findOne({_id:id});

    if(annotation){
        if(title){
            annotation.title = title;
        }
        if (notes) {
            annotation.notes = notes;
        }
        await annotation.save();
    }

    return response.json(annotation);

}