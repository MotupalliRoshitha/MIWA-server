const { Schema, Model } = require("mongoose");

const watchListSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
    movies: {
        type: Array,
        default: []
    }
})

const WatchListModel = new Model("WatchList", watchListSchema)

module.exports = WatchListModel