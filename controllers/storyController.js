const Story = require("../models/Story");
const Follow = require("../models/Follow");

// ======================================= CREATE STORY =======================================

const createStory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { text } = req.body;
    const hasImage = !!req.file;

    if (!hasImage && (!text || text.trim() === "")) {
      return res.status(400).json({
        message: "Story must contain an image or text"
      });
    }

    const newStory = await Story.create({
      user: userId,
      image: hasImage ? req.file.path : "",
      text: text ? text.trim() : ""
    });

    return res.status(201).json({
      message: "Story created successfully",
      story: newStory
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Could not create story"
    });
  }
};

// ======================================= GET STORY FEED =======================================
// Groups active (non-expired) stories by user, newest first within each user's set.

const getStoryFeed = async (req, res) => {
  try {
    const stories = await Story.find({ expiresAt: { $gt: new Date() } })
      .sort({ createdAt: -1 })
      .populate("user", "userName fullName profilePicture");

    const grouped = {};
    for (const story of stories) {
      const uid = story.user._id.toString();
      if (!grouped[uid]) {
        grouped[uid] = {
          user: story.user,
          stories: []
        };
      }
      grouped[uid].stories.push({
        _id: story._id,
        image: story.image,
        text: story.text,
        createdAt: story.createdAt
      });
    }

    return res.status(200).json({
      storyGroups: Object.values(grouped)
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Could not load stories"
    });
  }
};

module.exports = { createStory, getStoryFeed };