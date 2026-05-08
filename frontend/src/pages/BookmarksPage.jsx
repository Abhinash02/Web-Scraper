import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBookmarksRequest } from "../api/storyApi";
import StoryCard from "../components/StoryCard";
import PageLoader from "../components/PageLoader";
import { useAuth } from "../context/AuthContext";
import { Bookmark, RefreshCw, BookOpen } from "lucide-react";

const BookmarksPage = () => {
  const { token } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarks = async () => {
    try {
      setLoading(true);
      const data = await getBookmarksRequest(token);
      setStories(data?.stories || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadBookmarks();
  }, [token]);

  const handleBookmarkChange = (storyId, nowBookmarked) => {
    if (!nowBookmarked) {
      setStories((prev) => prev.filter((story) => story._id !== storyId));
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />

          <div className="relative">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
              <Bookmark size={14} />
              Your saved reading space
            </p>

            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                  Your bookmarks
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                  Keep track of the stories you want to revisit. Everything you save appears here in one clean and organized space.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                  <BookOpen size={16} className="text-indigo-600" />
                  {stories.length} saved {stories.length === 1 ? "story" : "stories"}
                </div>

                <button
                  onClick={loadBookmarks}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="mt-8 grid min-h-[50vh] place-items-center">
            <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
              <PageLoader text="Loading bookmarks..." />
            </div>
          </div>
        ) : stories.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-200 bg-white/80 p-10 text-center shadow-lg backdrop-blur-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Bookmark size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">No bookmarks yet</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
              Start saving stories from the home page and build your personal reading list.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-95"
              >
                Explore stories
              </a>
            </div>
          </div>
        ) : (
          <section className="mt-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Saved stories</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Read, manage, and remove your bookmarked content.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {stories.map((story) => (
                <StoryCard
                  key={story._id}
                  story={story}
                  isBookmarked={true}
                  onBookmarkChange={handleBookmarkChange}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default BookmarksPage;