    // Import express module
    const exp = require('express');
    const app = exp(); // app contains express application object. object contains http server

    // Import environment variables
    require('dotenv').config();

    const cors = require('cors');
    app.use(cors({ origin: 'http://localhost:5173' }));

    // Import Mongoose
    const mongoose = require('mongoose');

    // Connect to MongoDB using Mongoose
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Displaying a message for confirmation
        console.log("DB CONNECTION SUCCESS!");

        // Start HTTP server if DB connection has succeeded
        // Assigning port number to HTTP server of express app
        app.listen(4000, () => console.log("HTTP server started at port 4000"));
    })
    .catch((err) => {
        console.log("Error in DB Connection : ", err);
    });

    // Import the Attendance model
    const Attendance = require('../models/Attendance'); 

    // Import userApp
    const userApp = require('./APIs/userAPI');
    app.use('/user-api', userApp); 

    const attendanceApp = require('./APIs/attendanceAPI');
    app.use('/attendance-api', attendanceApp);


    // Error handling middleware
    app.use((err, req, res, next) => {
    res.send({ message: "An error occurred : ", errorMessage: err.message });
    });
