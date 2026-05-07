require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { scrapeTopStories } = require("./services/scrapeHn");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  try {
    const stories = await scrapeTopStories();
    console.log(`Initial scrape complete: ${stories.length} stories saved`);
  } catch (error) {
    console.error("Initial scrape failed:", error.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();