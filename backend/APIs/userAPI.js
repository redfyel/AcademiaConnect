//create a mini express module here
let exp = require('express')
let userApp = exp.Router()
const {Db} = require('mongodb')

//implementaion of routes

//create or register a user
userApp.post('/user', async(req, res)=>{
    //get usersCollection Object first
    const usersCollection = req.app.get('usersCollection')

    //get new user data from req obj
    const newUser = req.body

    //implement 
        //verifying uniqueness
        // hashing the password

    //temporarily I'm sending a message
    res.send({message : "User created."})
})
