const user = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.getUserId = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        resolve(null);
      } else {
        try {
          const userdata = await user.findById(data.id);
          if (userdata) {
            resolve(userdata._id);
          } else {
            resolve(null);
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  });
};
