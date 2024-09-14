//import express module
const exp = require('express')
const app = exp() // app contains express application object. object contains http server

//import environment variables
require('dotenv').config()

//import MongoClient 
const {MongoClient} = require('mongodb');

//create MongoClient object
let mongoclient = new MongoClient(process.env.DB_URL)

//connect to mongodb server
mongoclient.connect().then((connectionObj)=>{
    //displaying a message for confirmation
    console.log("DB CONNECTION SUCCESS!");


    //connect to the database
    const db = connectionObj.db('acacon-db')

    //connect to a collection
    const usersCollection = db.collection('users')

    //share collection obj to the API
    app.set('usersCollection', usersCollection)


    //start http server iff db connection has succeeded
    //assigning port number to http server of express app
    app.listen(4000, ()=>console.log("http server started at port 4000"))
}).catch((err)=>{
    console.log("Error in DB Connection : ", err);
})

//import userApp
const userApp = require('./APIs/userAPI')
app.use('/user-api', userApp)