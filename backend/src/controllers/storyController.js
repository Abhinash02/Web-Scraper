// const mongoose = require("mongoose");
// const Story = require("../models/Story");
// const User = require("../models/User");
// const asyncHandler = require("../utils/asyncHandler");

// const getStories = asyncHandler(async (req, res) => {
//   const page = Math.max(Number(req.query.page) || 1, 1);
//   const pageSize = Math.max(Number(req.query.limit) || 15, 1);
//   const maxStories = 15;
//   const limit = Math.max(Number(req.query.limit) || 10, 1);
//   const skip = (page - 1) * limit;

//   const [stories, totalStories] = await Promise.all([
//     Story.find({})
//       .sort({ points: -1, postedAt: -1 })
//       .skip(skip)
//       .limit(limit),
//     Story.countDocuments(),
//   ]);

//   const totalPages = Math.ceil(totalStories / limit);

//   res.status(200).json({
//     stories,
//     pagination: {
//       page,
//       limit,
//       totalStories,
//       totalPages,
//       hasNextPage: page < totalPages,
//       hasPrevPage: page > 1,
//     },
//   });
// });

// const getStoryById = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400);
//     throw new Error("Invalid story id");
//   }

//   const story = await Story.findById(id);

//   if (!story) {
//     res.status(404);
//     throw new Error("Story not found");
//   }

//   res.status(200).json(story);
// });

// const toggleBookmark = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400);
//     throw new Error("Invalid story id");
//   }

//   const story = await Story.findById(id);

//   if (!story) {
//     res.status(404);
//     throw new Error("Story not found");
//   }

//   const user = await User.findById(req.user._id);
//   const alreadyBookmarked = user.bookmarks.some(
//     (bookmarkId) => bookmarkId.toString() === id
//   );

//   if (alreadyBookmarked) {
//     user.bookmarks = user.bookmarks.filter(
//       (bookmarkId) => bookmarkId.toString() !== id
//     );
//   } else {
//     user.bookmarks.push(id);
//   }

//   await user.save();

//   res.status(200).json({
//     message: alreadyBookmarked ? "Bookmark removed" : "Bookmark added",
//     isBookmarked: !alreadyBookmarked,
//     bookmarks: user.bookmarks,
//   });
// });

// const getMyBookmarks = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id).populate({
//     path: "bookmarks",
//     options: { sort: { points: -1, postedAt: -1 } },
//   });

//   res.status(200).json({
//     stories: user?.bookmarks || [],
//   });
// });

// module.exports = {
//   getStories,
//   getStoryById,
//   toggleBookmark,
//   getMyBookmarks,
// };

const mongoose = require("mongoose");
const Story = require("../models/Story");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

const getStories = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const maxStories = 15;

  const topStories = await Story.find({})
    .sort({ points: -1, postedAt: -1 })
    .limit(maxStories);

  const totalStories = topStories.length;
  const totalPages = Math.ceil(totalStories / limit);
  const skip = (page - 1) * limit;

  const stories = topStories.slice(skip, skip + limit);

  res.status(200).json({
    stories,
    pagination: {
      page,
      limit,
      totalStories,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
});

const getStoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid story id");
  }

  const story = await Story.findById(id);

  if (!story) {
    res.status(404);
    throw new Error("Story not found");
  }

  res.status(200).json(story);
});

const toggleBookmark = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid story id");
  }

  const story = await Story.findById(id);

  if (!story) {
    res.status(404);
    throw new Error("Story not found");
  }

  const user = await User.findById(req.user._id);

  const alreadyBookmarked = user.bookmarks.some(
    (bookmarkId) => bookmarkId.toString() === id
  );

  if (alreadyBookmarked) {
    user.bookmarks = user.bookmarks.filter(
      (bookmarkId) => bookmarkId.toString() !== id
    );
  } else {
    user.bookmarks.push(id);
  }

  await user.save();

  res.status(200).json({
    message: alreadyBookmarked ? "Bookmark removed" : "Bookmark added",
    isBookmarked: !alreadyBookmarked,
    bookmarks: user.bookmarks,
  });
});

const getMyBookmarks = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "bookmarks",
    options: { sort: { points: -1, postedAt: -1 } },
  });

  res.status(200).json({
    stories: user?.bookmarks || [],
  });
});

module.exports = {
  getStories,
  getStoryById,
  toggleBookmark,
  getMyBookmarks,
};