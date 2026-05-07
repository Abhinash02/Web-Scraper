import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getBookmarksRequest, getStoriesRequest } from "../api/storyApi";
import StoryCard from "../components/StoryCard";
import PageLoader from "../components/PageLoader";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated, token } = useAuth();
  const [stories, setStories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      try {
        setLoading(true);

        const [storyData, bookmarkData] = await Promise.all([
          getStoriesRequest(1, 10),
          isAuthenticated ? getBookmarksRequest(token) : Promise.resolve({ stories: [] }),
        ]);

        setStories(storyData.stories);
        setBookmarks(bookmarkData.stories.map((item) => item._id));
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load stories");
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [isAuthenticated, token]);

  const bookmarkSet = useMemo(() => new Set(bookmarks), [bookmarks]);

  const handleBookmarkChange = (storyId, nowBookmarked) => {
    setBookmarks((prev) =>
      nowBookmarked ? [...new Set([...prev, storyId])] : prev.filter((id) => id !== storyId)
    );
  };

  return (
    <section className="container page-section">
      <div className="hero-card">
        <p className="eyebrow">Latest scrape from Hacker News</p>
        <h1>Top stories, cleaner layout, saved bookmarks.</h1>
        <p className="hero-copy">
          Browse the top 10 Hacker News stories, log in, and keep the ones you want to revisit.
        </p>
      </div>

      {loading ? (
        <PageLoader text="Loading stories" />
      ) : (
        <div className="story-list">
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              isBookmarked={bookmarkSet.has(story._id)}
              onBookmarkChange={handleBookmarkChange}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HomePage;