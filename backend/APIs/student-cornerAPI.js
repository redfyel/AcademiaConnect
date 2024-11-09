const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const studentCornerApp = express.Router();
studentCornerApp.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

// POST: Create a new post with optional image
studentCornerApp.post("/post", upload.single('image'), expressAsyncHandler(async (req, res) => {
    const studentCornerCollection = req.app.get("postsCollection");
    const { content, type, username } = req.body;

    // Validate input
    if (!content || !type || !username) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Prepare the new post object
    const newPost = {
        content,
        type,
        username,
        createdAt: new Date(),
        replies: [],
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null // Store the full relative URL
    };

    // Insert post into the database
    const result = await studentCornerCollection.insertOne(newPost);
    newPost._id = result.insertedId; // Assign the generated ID

    res.status(201).json({ message: "Post created successfully", post: newPost });
}));

// Serve static files from 'uploads' folder
studentCornerApp.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// GET: Retrieve all posts
studentCornerApp.get("/post", expressAsyncHandler(async (req, res) => {
    const studentCornerCollection = req.app.get("postsCollection");

    if (!studentCornerCollection) {
        return res.status(500).json({ message: "Collection not found" });
    }

    const posts = await studentCornerCollection.find().toArray();
    res.status(200).json(posts);
}));

// POST: Add a reply to a specific post
studentCornerApp.post("/post/:postId/replies", expressAsyncHandler(async (req, res) => {
    const studentCornerCollection = req.app.get("postsCollection");
    const { postId } = req.params;
    const { content, username } = req.body;

    if (!ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID format." });
    }

    const post = await studentCornerCollection.findOne({ _id: new ObjectId(postId) });
    if (!post) {
        return res.status(404).json({ message: "Post not found." });
    }

    const updatedPost = await studentCornerCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $push: { replies: { content, username, createdAt: new Date() } } }
    );

    if (updatedPost.modifiedCount === 1) {
        res.status(200).json({ message: "Reply added successfully." });
    } else {
        res.status(500).json({ message: "Failed to add reply." });
    }
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

    const topPosts = await studentCornerCollection.find({})
        .sort({ 'replies.length': -1 })
        .limit(10)
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

module.exports = studentCornerApp;
