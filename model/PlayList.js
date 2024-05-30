const { Schema, Model } = require("mongoose");

const watchListSchema = new Schema({
    movies: {
        type: Array,
        default: []
    }
})

const WatchListModel = new Model("WatchList", watchListSchema)

module.exports = WatchListModel