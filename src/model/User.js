const { Schema, model } = require("mongoose");

const userSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    watchLists: {
        type: Array,
        default: []
    }
})

const userModel = model("User", userSchema)

module.exports = {userModel}