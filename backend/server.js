//import express module
const exp = require('express')
const app = exp() // app contains express application object. object contains http server

//import environment variables
require('dotenv').config()

const cors = require('cors')
app.use(cors({origin : 'http://localhost:5173'}))

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
    const examCollection = db.collection('exam-corner')
    const eventsCollection = db.collection('events')


    //share collection obj to the API
    app.set('usersCollection', usersCollection)
    app.set('examCollection', examCollection)
    app.set('eventsCollection', eventsCollection)


    //start http server iff db connection has succeeded
    //assigning port number to http server of express app
    app.listen(process.env.PORT, ()=>console.log("http server started at port 4000"))
}).catch((err)=>{
    console.log("Error in DB Connection : ", err);
})

//import userApp
const userApp = require('./APIs/userAPI')
app.use('/user-api', userApp) 

const examApp = require('./APIs/examAPI')
app.use('/exam-api', examApp)

const eventsApp = require('./APIs/eventsAPI')
app.use('/events-api', eventsApp)


//error handling middleware
app.use((err, req, res, next)=>{
    res.send({message :"An error occured : ", errorMessage : err.message})
})