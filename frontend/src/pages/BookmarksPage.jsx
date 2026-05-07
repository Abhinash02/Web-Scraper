import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBookmarksRequest } from "../api/storyApi";
import StoryCard from "../components/StoryCard";
import PageLoader from "../components/PageLoader";
import { useAuth } from "../context/AuthContext";

const BookmarksPage = () => {
  const { token } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarks = async () => {
    try {
      setLoading(true);
      const data = await getBookmarksRequest(token);
      setStories(data.stories);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, [token]);

  const handleBookmarkChange = (storyId, nowBookmarked) => {
    if (!nowBookmarked) {
      setStories((prev) => prev.filter((story) => story._id !== storyId));
    }
  };

  return (
    <section className="container page-section">
      <div className="section-heading">
        <h1>Your bookmarks</h1>
        <p>Everything you saved appears here.</p>
      </div>

      {loading ? (
        <PageLoader text="Loading bookmarks" />
      ) : stories.length === 0 ? (
        <div className="empty-state">
          <h2>No bookmarks yet</h2>
          <p>Save a few stories from the home page and they’ll show up here.</p>
        </div>
      ) : (
        <div className="story-list">
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              isBookmarked={true}
              onBookmarkChange={handleBookmarkChange}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BookmarksPage;