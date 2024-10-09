//create a mini express module here
let exp = require("express");
let userApp = exp.Router();
const { Db } = require("mongodb");
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken'); 

//add a body parser middleware
userApp.use(exp.json());

//implementaion of routes
//create or register a user
userApp.post("/user", expressAsyncHandler(async (req, res) => {
    //get usersCollection Object first
    const usersCollection = req.app.get("usersCollection");

    //get new user data from req obj
    const newUser = req.body;

    newUser.attendance = []; 

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
      res.send({ message: "user created" });
    }
  })
);


//login route
userApp.post("/login", expressAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const { username, password } = req.body;
  const user = await usersCollection.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT token upon successful login
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY , { expiresIn: '1h' });

  const { password: _, ...userInfo } = user; 
  res.status(200).json({ message: "login success", user: userInfo, token });
}));


//get attendance to display
userApp.get('/attendance/:rollnum', expressAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get('usersCollection')
  const { rollnum } = req.params;

  try {
    // Find user by rollnum
    const user = await usersCollection.findOne({ rollnum: rollnum });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user found, return the attendance array
    const attendanceData = user.attendance || [];

    res.status(200).json({ rollnum: user.rollnum, attendance: attendanceData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance data", error: error.message });
  }
}));


// Save attendance route
userApp.post('/save-attendance', expressAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get('usersCollection');
  const { rollnum,date, status } = req.body;
  try {
    const existingRecord = await usersCollection.findOne({ rollnum: rollnum, 'attendance.date': date });

    if (existingRecord) {
      // Update the existing attendance record
      await usersCollection.updateOne(
        { rollnum: rollnum, 'attendance.date': date },
        { $set: { 'attendance.$.status': status } }
      );
    } else {
      // Create a new attendance record
      await usersCollection.updateOne(
        { rollnum: rollnum },
        { $push: { attendance: { date, status } } }
      );
    }

    res.status(200).json({ message: "Attendance data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving attendance data", error: error.message });
  }
}))

module.exports = userApp;