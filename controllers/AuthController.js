const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../utils/secretToken");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const newUser = await user.create({ email, password, username });
    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "user signed succesfully", success: true, user });
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const userDetails = await user.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, userDetails.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = await createSecretToken(userDetails._id);
    console.log("token in login:"+token);
    
    res
      .cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      })
      
        res
          .status(201)
          .json({ message: "User logged in successfully", success: true,token:token });
    next();
  } catch (error) {
    console.error(error);
  }
};
