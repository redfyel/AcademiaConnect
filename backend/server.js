//import express module
const exp = require('express')
const app = exp() // app contains express application object. object contains http server



//assigning port number to http server of express app
app.listen(4000, ()=>console.log("http server started at port 4000"))