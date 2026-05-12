const User = require("../models/User");

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        user.username = req.body.username || user.username;
        user.bio = req.body.bio || user.bio;
        user.profilePic = req.body.profilePic || user.profilePic;

        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// FOLLOW USER
exports.followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!userToFollow.followers.includes(req.user.id)) {
            userToFollow.followers.push(req.user.id);
            currentUser.following.push(req.params.id);
        }

        await userToFollow.save();
        await currentUser.save();

        res.json({ message: "Followed user" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UNFOLLOW USER
exports.unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        userToUnfollow.followers = userToUnfollow.followers.filter(
            id => id.toString() !== req.user.id
        );

        currentUser.following = currentUser.following.filter(
            id => id.toString() !== req.params.id
        );

        await userToUnfollow.save();
        await currentUser.save();

        res.json({ message: "Unfollowed user" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};