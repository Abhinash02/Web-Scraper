import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSubmitting(true);
      await login(form);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-10 flex items-center justify-center">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-2xl shadow-slate-200/70 backdrop-blur-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30">
              <LogIn size={30} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to manage your saved stories.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Mail size={16} className="text-slate-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Lock size={16} className="text-slate-500" />
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:scale-[1.01] hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-sm text-blue-900">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-fuchsia-800 hover:text-indigo-700 hover:underline"
              >
                Create one for free
              </Link>
            </p>
             <div className="mt-8 rounded-2xl bg-blue-50/50 border border-blue-100 p-4 transition-all hover:bg-blue-50">
  <div className="flex items-center justify-center gap-2 mb-2">
    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">
      Demo Access
    </span>
  </div>
  
  <div className="space-y-1 text-center">
    <p className="text-sm font-medium text-blue-900/80">
      <span className="opacity-60">Email:</span> abhinash@gmail.com
    </p>
    <p className="text-sm font-medium text-blue-900/80">
      <span className="opacity-60">Pass:</span> 123456
    </p>
  </div>
</div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;