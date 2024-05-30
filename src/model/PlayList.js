const { Schema, model } = require("mongoose");

const watchListSchema = Schema({
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    movies: {
        type: Array,
        default: []
    }
})

const WatchListModel = model("WatchList", watchListSchema)

module.exports = WatchListModel