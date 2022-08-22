const {Schema, model, models} = require('mongoose');

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

const User = models.User || model('User', userSchema)

export default User;