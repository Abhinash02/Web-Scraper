import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getBookmarksRequest, getStoriesRequest } from "../api/storyApi";
import StoryCard from "../components/StoryCard";
import PageLoader from "../components/PageLoader";
import { useAuth } from "../context/AuthContext";
import {
  BookOpen,
  Bookmark,
  Sparkles,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isAuthenticated, token } = useAuth();
  const [stories, setStories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  useEffect(() => {
    const loadStories = async () => {
      try {
        setLoading(true);

        const storyData = await getStoriesRequest(page, limit);
        setStories(storyData.stories || []);
        setTotalPages(storyData.pagination?.totalPages || 1);
        setHasNextPage(storyData.pagination?.hasNextPage || false);
        setHasPrevPage(storyData.pagination?.hasPrevPage || false);

        if (isAuthenticated && token) {
          try {
            const bookmarkData = await getBookmarksRequest(token);
            setBookmarks((bookmarkData.stories || []).map((item) => item._id));
          } catch (error) {
            const status = error?.response?.status;

            if (status === 401) {
              toast.info(
                "Please register first if you are a new user, or log in if you already have an account."
              );
            } else {
              toast.error(
                error?.response?.data?.message || "Failed to load bookmarks"
              );
            }

            setBookmarks([]);
          }
        } else {
          setBookmarks([]);
        }
      } catch (error) {
        const status = error?.response?.status;

        if (status === 401) {
          toast.info(
            "Please register first if you are a new user, or log in if you already have an account."
          );
        } else {
          toast.error(error?.response?.data?.message || "Failed to load stories");
        }
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [isAuthenticated, token, page, limit]);

  const bookmarkSet = useMemo(() => new Set(bookmarks), [bookmarks]);

  const handleBookmarkChange = (storyId, nowBookmarked) => {
    setBookmarks((prev) =>
      nowBookmarked
        ? [...new Set([...prev, storyId])]
        : prev.filter((id) => id !== storyId)
    );
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
                <Sparkles size={14} />
                Latest scrape from Hacker News
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Top stories, cleaner layout, saved bookmarks.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                Browse the top 15 Hacker News stories, log in, and keep the ones you want to revisit.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                <BookOpen size={16} className="text-indigo-600" />
                {stories.length} stories
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                <Bookmark size={16} className="text-fuchsia-600" />
                {bookmarks.length} bookmarks
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-95"
            >
              Get started
            </Link>
            <Link
              to="/bookmarks"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View bookmarks
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </section>

        <section className="mt-8">
          {loading ? (
            <div className="grid min-h-[50vh] place-items-center">
              <PageLoader text="Loading stories..." />
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {stories.map((story) => (
                  <StoryCard
                    key={story._id}
                    story={story}
                    isBookmarked={bookmarkSet.has(story._id)}
                    onBookmarkChange={handleBookmarkChange}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={!hasPrevPage}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  <div className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg">
                    Page {page} of {totalPages}
                  </div>

                  <button
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={!hasNextPage}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default HomePage;