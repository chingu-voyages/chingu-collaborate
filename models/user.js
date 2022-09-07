const { Schema, model, models } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    authenticatedDiscordId: {
        type: String,
        required: true,
    },
    discordUsername: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
    },
    githubProfile: String,
    preferredMethodOfContact: String,
    isBanned: {
        type: Boolean,
        default: false,
    },
    projectsCreated: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        },
    ],
    projectsRequested: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        },
    ],
    projectsJoined: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        },
    ],
})

const User = models.User || model('User', userSchema)

export default User
