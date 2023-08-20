const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    profile_pic: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
    },
    joiningDate: {
        type: Date,
        default: Date.now
    }

})

const User = model('user', UserSchema)

module.exports = User