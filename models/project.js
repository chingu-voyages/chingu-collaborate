const { Schema, model, models } = require('mongoose')

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    technologies: [
        {
            type: String,
            required: true,
        },
    ],
    details: {
        type: String,
        required: true,
    },
    datePosted: {
        type: Date,
        required: true,
    },
    expiresIn: {
        type: Date,
        required: true,
    },
    admin: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    currentMembers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    requestedMembers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
})

const Project = models.Project || model('Project', projectSchema)

export default Project
