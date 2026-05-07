const asyncHandler = require("../utils/asyncHandler");
const { scrapeTopStories } = require("../services/scrapeHn");

const triggerScrape = asyncHandler(async (req, res) => {
  const stories = await scrapeTopStories();

  res.status(200).json({
    message: "Scrape completed successfully",
    count: stories.length,
  });
});

module.exports = { triggerScrape };