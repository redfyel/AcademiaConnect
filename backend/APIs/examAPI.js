//create a mini express module here
let exp = require("express");
let examApp = exp.Router();
const { Db } = require("mongodb");


//add a body parser middleware
examApp.use(exp.json());

examApp.get('/syllabus', (async (req, res) => {
    let exp = require('express');
let examApp = exp.Router();

// Body parser middleware
examApp.use(exp.json());

// Route to fetch syllabus, tutorials, and PYQs
examApp.get('/syllabus', async (req, res) => {
    try {
        // Access the 'examCollection' set in server.js
        const examCollection = req.app.get('examCollection');

        // Fetch all documents from the 'exam-corner' collection
        const syllabusData = await examCollection.find({}).toArray();

        // Send the fetched data as a JSON response
        res.status(200).json(syllabusData);
    } catch (error) {
        console.error("Error fetching syllabus data:", error);
        res.status(500).json({ message: "Failed to fetch syllabus data" });
    }
});

module.exports = examApp;

}))


module.exports = examApp;