const {Schema, model, models} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    discordId: String,
    githubProfile: String,
    preferredMethodOfContact: String,
    isNewUser: Boolean,
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
    projectsApplied: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }   
    ],
});

const User = models.User || model('User', userSchema)

export default User;