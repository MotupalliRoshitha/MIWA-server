const { Router } = require("express");
const [createList, getList, getAllList, deleteList, addMovie, removeMovie, changePublic] = require("../Controllers/watchList")
const watchListRouter = Router()

watchListRouter.get("/create", createList ) 
watchListRouter.get("/",getAllList)
watchListRouter.get("/:listId",getList)
watchListRouter.put("/:listId", changePublic)
watchListRouter.delete("/:listId",deleteList)
watchListRouter.put("/:listId/:movieId", addMovie)
watchListRouter.delete("/:listId/:movieId", removeMovie)

module.exports = watchListRouter