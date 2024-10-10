// Import necessary modules
let exp = require("express");
let examApp = exp.Router();

// Body parser middleware
examApp.use(exp.json());

// Route to fetch syllabus PDFs and subject names
examApp.get('/syllabus', async (req, res) => {
    try {
        const examCollection = req.app.get('examCollection');
        const syllabusData = await examCollection.find({}).toArray();

        const syllabuses = syllabusData.map(item => ({
            subjectName: item.subjectName, 
            syllabus: item.syllabus 
        })).filter(item => item.syllabus);

        res.status(200).json(syllabuses);
    } catch (error) {
        console.error("Error fetching syllabus data:", error);
        res.status(500).json({ message: "Failed to fetch syllabus data" });
    }
});

// Route to fetch Previous Year Questions (PYQs) and subject names
examApp.get('/pyqs', async (req, res) => {
    try {
        const examCollection = req.app.get('examCollection');
        const pyqsData = await examCollection.find({}).toArray();

        const pyqs = pyqsData.map(item => ({
            subjectName: item.subjectName, // Assuming you have a field named 'subjectName'
            pyqs: item.pyqs // Assuming you have a field named 'pyqs'
        })).filter(item => item.pyqs); // Filter out entries without PYQs

        res.status(200).json(pyqs);
    } catch (error) {
        console.error("Error fetching PYQs data:", error);
        res.status(500).json({ message: "Failed to fetch PYQs data" });
    }
});

// Export the examApp router
module.exports = examApp;
