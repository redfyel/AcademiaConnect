let exp = require("express");
let timeTableApp = exp.Router();


timeTableApp.use(exp.json());


timeTableApp.get('/syllabus', async (req, res) => {
    try {
        const timeTableCollection = req.app.get('timeTableCollection'); // Reference the correct collection
        const syllabusData = await timeTableCollection.find({}).toArray();

        // Extract and map all the fields from the dataset
        const result = syllabusData.map(item => ({
            title: item.title, // Extract the title
            data: item.data.map(subItem => ({
                date: subItem.date,       // Extract date
                subject: subItem.subject, // Extract subject
                syllabus: subItem.syllabus, // Extract syllabus URL
                tutorials: subItem.tutorials, // Extract tutorials URL
                pyqs: subItem.pyqs // Extract previous year questions URL
            }))
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching syllabus data:", error);
        res.status(500).json({ message: "Failed to fetch syllabus data" });
    }
});


module.exports = timeTableApp;
