//create a mini express module here
let exp = require("express");
let userApp = exp.Router();
const { Db } = require("mongodb");
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");

//add a body parser middleware
userApp.use(exp.json());

//implementaion of routes
//create or register a user
userApp.post("/user", expressAsyncHandler(async (req, res) => {
    //get usersCollection Object first
    const usersCollection = req.app.get("usersCollection");

    //get new user data from req obj
    const newUser = req.body;

    //verifying uniqueness
    let existingUser = await usersCollection.findOne({
      username: newUser.username,
    });

    //if user already existed
    if (existingUser !== null) {
      res.send({ message: "User already existed" });
    } else {
      // hashing the password
      let hashedpassword = await bcryptjs.hash(newUser.password, 7);

      //replace plain password with hashed password in newUser
      newUser.password = hashedpassword;

      //save user
      await usersCollection.insertOne(newUser);

      //temporarily I'm sending a message
      res.send({ message: "User created." });
    }
  })
);

module.exports = userApp;