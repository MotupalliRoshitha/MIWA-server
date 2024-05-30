const { Router } = require("express");
const [createList, getList, getAllList, deleteList, addMovie, removeMovie] = require("../Controllers/watchList")
const watchListRouter = Router()

watchListRouter.get("/create", createList ) 
watchListRouter.get("/",getAllList)
watchListRouter.get("/:listId",getList)
watchListRouter.delete("/:listId",deleteList)
watchListRouter.put("/:listId/:movieId", addMovie)
watchListRouter.patch("/:listId/:movieId", removeMovie)

module.exports = watchListRouter