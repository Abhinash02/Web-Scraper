const axios = require("axios");
const cheerio = require("cheerio");
const Story = require("../models/Story");

const parsePostedTime = (rawAge) => {
  if (!rawAge) return new Date();

  const now = new Date();
  const value = parseInt(rawAge, 10);

  if (rawAge.includes("minute")) {
    now.setMinutes(now.getMinutes() - value);
  } else if (rawAge.includes("hour")) {
    now.setHours(now.getHours() - value);
  } else if (rawAge.includes("day")) {
    now.setDate(now.getDate() - value);
  }

  return now;
};

const scrapeTopStories = async () => {
  const { data } = await axios.get("https://news.ycombinator.com/news", {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const $ = cheerio.load(data);
  const rows = $("tr.athing").slice(0, 10).toArray();

  const stories = [];

  for (const row of rows) {
    const $row = $(row);
    const subtextRow = $row.next();

    const hnId = $row.attr("id") || "";
    const title = $row.find(".titleline > a").first().text().trim();
    const url = $row.find(".titleline > a").first().attr("href") || "";
    const pointsText = subtextRow.find(".score").text().trim();
    const author = subtextRow.find(".hnuser").text().trim() || "unknown";
    const ageText = subtextRow.find(".age").text().trim();

    const points = parseInt(pointsText, 10) || 0;
    const postedAt = parsePostedTime(ageText);

    if (!title) continue;

    stories.push({
      hnId,
      title,
      url,
      points,
      author,
      postedAt,
    });
  }

  for (const story of stories) {
    await Story.findOneAndUpdate(
      { hnId: story.hnId },
      { $set: story },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  return stories;
};

module.exports = { scrapeTopStories };