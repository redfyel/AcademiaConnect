const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");

const studentCornerApp = express.Router();
studentCornerApp.use(express.json()); // Ensure the request body can be parsed

// POST: Create a new post
studentCornerApp.post("/post", expressAsyncHandler(async (req, res) => {
    const studentCornerCollection = req.app.get("postsCollection");
    const { content, type, username } = req.body;

    // Validate input
    if (!content || !type || !username) {
        return res.status(400).json({ message: "All fields are required." });
    }
    const express = require("express");
    const expressAsyncHandler = require("express-async-handler");
    const { ObjectId } = require("mongodb");
    
    const studentCornerApp = express.Router();
    studentCornerApp.use(express.json()); // Ensure the request body can be parsed
    
    // POST: Create a new post (including birthday wishes)
    studentCornerApp.post("/post", expressAsyncHandler(async (req, res) => {
        const studentCornerCollection = req.app.get("postsCollection");
        const { content, type, username } = req.body;
    
        // Validate input
        if (!content || !type || !username) {
            return res.status(400).json({ message: "All fields are required." });
        }
    
       
    
        const newPost = {
            content,
            type,
            username,
            createdAt: new Date(),
            replies: [] // Initialize replies as an empty array
        };
    
        // Insert post into the database
        const result = await studentCornerCollection.insertOne(newPost);
        console.log("Inserted Post ID:", result.insertedId);
    
        // Add the generated ID to the newPost object
        newPost._id = result.insertedId; 
    
        res.status(201).json({ message: "Post created successfully", post: newPost });
    }));
    
    // Other routes...
    
    module.exports = studentCornerApp;
    
    const newPost = {
        content,
        type,
        username,
        createdAt: new Date(),
        replies: [] // Initialize replies as an empty array
    };

    // Insert post into the database
    const result = await studentCornerCollection.insertOne(newPost);
    console.log("Inserted Post ID:", result.insertedId); // Log the inserted post ID

    // Add the generated ID to the newPost object
    newPost._id = result.insertedId; 

    res.status(201).json({ message: "Post created successfully", post: newPost });
}));
// POST: Add a reply to a specific post
studentCornerApp.post("/post/:postId/replies", expressAsyncHandler(async (req, res) => {
    const studentCornerCollection = req.app.get("postsCollection");
    const { postId } = req.params;
    const { content, username } = req.body; // Ensure you receive the content and username from the body

    if (!ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID format." });
    }

    const post = await studentCornerCollection.findOne({ _id: new ObjectId(postId) });
    if (!post) {
        return res.status(404).json({ message: "Post not found." });
    }

    // Add the reply to the post's replies array
    const updatedPost = await studentCornerCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $push: { replies: { content, username, createdAt: new Date() } } } // Add a timestamp if needed
    );

    if (updatedPost.modifiedCount === 1) {
        res.status(200).json({ message: "Reply added successfully." });
    } else {
        res.status(500).json({ message: "Failed to add reply." });
    }
}));


// GET: Retrieve all posts
studentCornerApp.get("/post", expressAsyncHandler(async (req, res) => {
    const studentCornerCollection = req.app.get("postsCollection");

    if (!studentCornerCollection) {
        return res.status(500).json({ message: "Collection not found" });
    }

    const posts = await studentCornerCollection.find().toArray();
    res.status(200).json(posts);
}));

// GET: Retrieve replies for a specific post
studentCornerApp.get("/post/:postId/replies", expressAsyncHandler(async (req, res) => {
    const studentCornerCollection = req.app.get("postsCollection");
    const { postId } = req.params;

    if (!ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID format." });
    }

    const post = await studentCornerCollection.findOne({ _id: new ObjectId(postId) });
    if (!post) {
        return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json(post.replies);
}));

// GET: Retrieve top posts
studentCornerApp.get("/post/top", expressAsyncHandler(async (req, res) => {
    const studentCornerCollection = req.app.get("postsCollection");

    // Example: Fetch top posts based on the number of replies or likes
    const topPosts = await studentCornerCollection.find({})
        .sort({ 'replies.length': -1 }) // Sort by number of replies, adjust this as necessary
        .limit(10) // Limit to top 10 posts
        .toArray();

    res.json(topPosts);
}));

// GET: Retrieve posts by a specific user
studentCornerApp.get("/post/user/:username", expressAsyncHandler(async (req, res) => {
    const studentCornerCollection = req.app.get("postsCollection");
    const { username } = req.params;

    const userPosts = await studentCornerCollection.find({ username }).toArray();

    if (userPosts.length === 0) {
        return res.status(404).json({ message: "No posts found for this user." });
    }

    res.status(200).json(userPosts);
}));
// POST: Create a new birthday wish


module.exports = studentCornerApp;