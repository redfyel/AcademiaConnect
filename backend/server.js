// const express = require('express');
// const mongoose = require('mongoose'); // For MongoDB
// const cors = require('cors'); // For handling Cross-Origin requests
// const app = express();

// app.use(cors());
// app.use(express.json());

// // MongoDB connection (replace with your own connection string)
// mongoose.connect('mongodb+srv://hariniap04:<db_password>@studentcorner.1y4pc.mongodb.net/?retryWrites=true&w=majority&appName=studentCorner', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // Define the schema and model for the posts
// const postSchema = new mongoose.Schema({
//     title: String,
//     type: String, // Either 'doubt' or 'complaint'
//     issue: String,
// });

// const Post = mongoose.model('Post', postSchema);

// // API to fetch doubts or complaints
// app.get('/api/:type', async (req, res) => {
//     const type = req.params.type;
//     try {
//         const posts = await Post.find({ type });
//         res.json(posts);
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// });

// // API to submit a new post
// app.post('/api/posts', async (req, res) => {
//     const { title, type, issue } = req.body;
//     try {
//         const newPost = new Post({ title, type, issue });
//         await newPost.save();
//         res.status(201).json(newPost);
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
