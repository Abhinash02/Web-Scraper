import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Menu, X, BookOpen, LogOut, User, LogIn, UserPlus, Bookmark } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setMenuOpen(false);
    navigate("/login");
  };

const navClass = ({ isActive }) =>
  `rounded-xl px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-sky-100 text-sky-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

  const mobileNavClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
     isActive
      ? "bg-sky-100 text-sky-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white shadow-lg shadow-indigo-500/25">
              <BookOpen size={18} />
            </span>
           WEB SCRAP
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            <NavLink to="/" className={navClass}>
              Stories
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/bookmarks" className={navClass}>
                Bookmarks
              </NavLink>
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <>
                <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 lg:flex">
                  <User size={14} className="text-indigo-600" />
                  Hi, {user?.name?.split(" ")[0]}
                </div>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <LogIn size={16} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-95"
                >
                  <UserPlus size={16} />
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden border-t border-slate-200 bg-white/95 transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className={mobileNavClass} onClick={() => setMenuOpen(false)}>
            Stories
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/bookmarks"
              className={mobileNavClass}
              onClick={() => setMenuOpen(false)}
            >
              Bookmarks
            </NavLink>
          )}

          <div className="my-2 h-px bg-slate-200" />

          {isAuthenticated ? (
            <>
              <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Hi, {user?.name?.split(" ")[0]}
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <LogIn size={16} />
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-95"
              >
                <UserPlus size={16} />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;