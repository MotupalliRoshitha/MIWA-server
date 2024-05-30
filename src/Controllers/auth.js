const { userModel } = require("../model/User");
const { hash, genSalt, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    const resp = await compare(password, user.password);

    if (!resp) return res.status(401).json({ error: "user not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      ...user._doc,
      token,
      password: undefined,
    });
  } catch (e) {
    return res.status(400).json({ error: "user not found" });
  }
}

const signup = async (req,res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;
    const salt = await genSalt();
    const hashPass = await hash(password, salt);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashPass,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      ...savedUser._doc,
      password: undefined,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e.message });
  } 
}

module.exports = [signup, login]