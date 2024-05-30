const watchListModel = require("../model/PlayList");

const createList = async (req, res) => {
  try {
    const {name} = req.query;
    const user = req.verifiedUser
    console.log({name,user});
    const newList = watchListModel({ name, user });
    const savedList = await newList.save();

    res.status(200).json(savedList);
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
    console.log(lists);
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
      return res.status(201).json({message: "success"})
    }
    return res.status(201).json({message: "failed"})
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
    return res.status(200).json({msg: "success"})
    }
    return res.status(200).json({msg: "fail"})

  } catch (e) {
    console.log(e);
    return res.status(400).json({error: "internal server error"})
  }
}

module.exports = [createList, getList, getAllLists, deleteList, addMovie, removeMovie, deleteList];
