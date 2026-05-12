const express = require("express");
const router = express.Router();

const {
    updateProfile,
    followUser,
    unfollowUser
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// PROFILE UPDATE
router.put("/update", protect, updateProfile);

// FOLLOW SYSTEM
router.put("/follow/:id", protect, followUser);
router.put("/unfollow/:id", protect, unfollowUser);

module.exports = router;