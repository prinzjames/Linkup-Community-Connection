const Post = require("../models/post");

// CREATE POST
exports.createPost = async (req, res) => {
    try {
        const post = await Post.create({
            user: req.user.id,
            text: req.body.text,
            image: req.body.image || ""
        });

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ALL POSTS (FEED)
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "username email profilePic")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// LIKE / UNLIKE POST
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userId = req.user.id;

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(
                (id) => id.toString() !== userId
            );
        } else {
            post.likes.push(userId);
        }

        await post.save();

        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 💬 ADD COMMENT
exports.commentPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = {
            user: req.user.id,
            text: req.body.text
        };

        post.comments.push(comment);

        await post.save();

        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE POST
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await post.deleteOne();

        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};