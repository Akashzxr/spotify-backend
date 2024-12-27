const user = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res) => {
  const { token  } = req.body;
  
  //const token = await req.cookies.token
  
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const userdata = await user.findById(data.id)
      if (userdata) return res.json({ status: true, user: userdata._id })
      else return res.json({ status: false })
    }
  })
}