const {Schema, model, models} = require('mongoose');

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    technologies: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    datePosted: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: String,
        required: true,
    },
    admin:{
            type: Schema.Types.ObjectId,
            ref: 'User'
    },
    currentMembers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }   
    ],
    requestedMembers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }   
    ],
});

const Project = models.project || model('Project', projectSchema)

export default Project;