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
    githubLink: String,
    preferredMethodOfContact: String,
    discordAvatarUrl: String,
    isBanned: {
        value: { type: Boolean },
        reason: { type: String },
    },
})

const User = models.User || model('User', userSchema)

export default User
