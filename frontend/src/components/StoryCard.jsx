import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toggleBookmarkRequest } from "../api/storyApi";
import { useAuth } from "../context/AuthContext";
import { formatPostedTime } from "../utils/formatDate";

const StoryCard = ({ story, isBookmarked = false, onBookmarkChange }) => {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
  if (!isAuthenticated) {
  toast.info(
    "Please register first if you are a new user, or log in if you already have an account."
  );
  navigate("/login");
  return;
}

    try {
      setLoading(true);
      const data = await toggleBookmarkRequest(story._id, token);
      onBookmarkChange?.(story._id, data.isBookmarked);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not update bookmark");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="story-card">
      <div className="story-main">
        <a
          href={story.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="story-title"
        >
          {story.title}
        </a>

        <div className="story-meta">
          <span>{story.points} points</span>
          <span>•</span>
          <span>{story.author}</span>
          <span>•</span>
          <span>{formatPostedTime(story.postedAt)}</span>
        </div>
      </div>

      <button
        className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
        onClick={handleBookmark}
        disabled={loading}
      >
        {loading ? "Saving..." : isBookmarked ? "Bookmarked" : "Bookmark"}
      </button>
    </article>
  );
};

export default StoryCard;