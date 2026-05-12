const express = require("express");
const router = express.Router();

const {
    createPost,
    getPosts,
    likePost,
    deletePost
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

// CREATE POST
router.post("/", protect, createPost);

// GET FEED
router.get("/", getPosts);

// LIKE POST
router.put("/like/:id", protect, likePost);

// DELETE POST
router.delete("/:id", protect, deletePost);

module.exports = router;