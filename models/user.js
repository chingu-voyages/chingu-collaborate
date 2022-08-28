const {Schema, model, models} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    discordUsername: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    githubProfile: String,
    preferredMethodOfContact: String,
    isNewUser: Boolean,
    isBanned: Boolean,
    projectsCreated: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }   
    ],
    projectsRequested: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }   
    ],
    projectsJoined: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }   
    ],
});

const User = models.User || model('User', userSchema)

export default User;
