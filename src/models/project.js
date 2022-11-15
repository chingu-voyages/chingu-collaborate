import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
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
    timezone: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expiresIn: {
        type: Date,
        required: true,
    },
    admin: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    currentMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    requestedMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
})

const Project =
    mongoose.models.Project || mongoose.model('Project', projectSchema)

export default Project
