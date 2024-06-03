const watchListModel = require("../model/PlayList");

const createList = async (req, res) => {
  try {
    const {name} = req.query;
    const user = req.verifiedUser
    const newList = watchListModel({ name, user });
    await newList.save();
    const returnList = await watchListModel.find({user})
    res.status(200).json({result: returnList});
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "internal server error" });
  }
};

const getList = async (req, res) => {
  try {
    const {listId} = req.params
    const userId = req.verifiedUser
    const list = await watchListModel.findById(listId)
    if (list.isPublic === true || list.user === userId)
      return res.status(200).json(list)
    return res.status(400).json({error: "insuffient permision"})
  } catch (e) {
    console.log(e);
    return res.status(400).json({error: "internal server error"})
  }
}

const getAllLists = async (req, res) => {
  try {
    const userId = req.verifiedUser
    const lists = await watchListModel.find({user: userId})
    return res.status(200).json({result: lists})
  } catch (e) {
    console.log(e);
    return res.status(400).json({error: "internal server error"})
  }
}

const deleteList = async (req, res) => {
  try {
    const userId = req.verifiedUser
    const {listId} = req.params
    const list = await watchListModel.findById(listId)
    if (list.user === userId) {
      await watchListModel.findByIdAndDelete(listId)
    }
    const lists = await watchListModel.find({user: userId})
    return res.status(201).json({result: lists})
  } catch (e) {
    console.log(e);
    return res.status(400).json({error: "internal server error"})
  }
}

const changePublic = async (req,res) => {
  try {
    const userId = req.verifiedUser
    const {listId} = req.params
    const list = await watchListModel.findById(listId)

    if (list.user === userId) {
      const newPublicValue = !list.isPublic
      await watchListModel.updateOne(
        { _id: listId},
        { $set: {isPublic: newPublicValue}}
      )
      const newList = await watchListModel.find({user: userId})
      return res.status(200).json(newList)
    }
    
    return res.status(400).json({error: "some error"})
    
  } catch (e) {
   console.log(e);
   return res.status(400).json({error: "internal server error"}) 
  }
}

const addMovie = async (req, res) => {
  try {
    const userId = req.verifiedUser
    const {listId, movieId} = req.params
    const list = await watchListModel.findById(listId)
    if (list.user === userId) {
    const newDoc = await watchListModel.updateOne(
      { _id: listId },
      { $push: { movies: movieId } }
    );
    return res.status(200).json({msg: "success"})
    }
    return res.status(200).json({msg: "fail"})
  } catch (e) {
    console.log(e)
    res.status(400).json({error: "internal server error"})
  }
}

const removeMovie = async (req, res) => {
  try {
    const userId = req.verifiedUser
    const {listId, movieId} = req.params
    const list = await watchListModel.findById(listId)
    if (list.user === userId) {
    const newDoc = await watchListModel.updateOne(
      { _id: listId },
      { $pull: { movies: movieId } }
    );
    const fullList = await watchListModel.findById(listId)
    return res.status(200).json(fullList)
    }
    return res.status(200).json({msg: "fail"})

  } catch (e) {
    console.log(e);
    return res.status(400).json({error: "internal server error"})
  }
}

module.exports = [createList, getList, getAllLists, deleteList, addMovie, removeMovie,changePublic];
