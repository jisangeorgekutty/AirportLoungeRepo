import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useStore } from "@/store";
import { Button, Input } from "@/components/ui";
import { Plane, Shield, Globe, ArrowRight, Sparkles, Check, Chrome, Compass } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Quick login demo accounts
  const demoAccounts = [
    {
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "Seeker",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      color: "from-emerald-500 to-teal-600",
    },
    {
      name: "Alex Thompson",
      email: "alex@example.com",
      role: "Provider",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      color: "from-blue-500 to-indigo-600",
    },
  ];

  const handleDemoLogin = (account) => {
    setEmail(account.email);
    setPassword("password123");
    setError("");
    toast.success(`Filled demo credentials for ${account.name}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate login verification
    setTimeout(() => {
      // Find matching mock user or fallback
      let matchedUser = {
        id: "u_temp",
        name: email.split("@")[0].replace(".", " "),
        email: email,
        role: "seeker",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        walletBalance: 0,
      };

      // Check if it matches our demo accounts
      if (email === "alex@example.com") {
        matchedUser = {
          id: "u1",
          name: "Alex Thompson",
          email: "alex@example.com",
          role: "provider",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
          walletBalance: 1240.5,
        };
      } else if (email === "sarah@example.com") {
        matchedUser = {
          id: "u2",
          name: "Sarah Chen",
          email: "sarah@example.com",
          role: "seeker",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
          walletBalance: 85.0,
        };
      }

      setUser(matchedUser);
      setLoading(false);
      toast.success(`Welcome back, ${matchedUser.name}!`);
      navigate("/app/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      {/* Left Panel: Visual/Brand Showcase (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-950 overflow-hidden items-center justify-center p-16">
        {/* Background Image with Ambient Glows */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540339830292-4509edd15be7?auto=format&fit=crop&q=80&w=1200"
            alt="Airport Lounge Visual"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/65 to-gray-950/30" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 blur-[130px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 blur-[130px] rounded-full" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-lg flex flex-col justify-between h-full">
          {/* Logo Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Plane className="text-white w-6 h-6 rotate-45" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              LoungeLink
            </span>
          </div>

          {/* Key Message */}
          <div className="my-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={12} /> Premium Airport Comfort
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Your gateway to airport luxury, simplified.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Connect with lounge access providers or unlock premium airport experiences globally with real-time verification and secure handshakes.
              </p>
            </motion.div>

            {/* Micro Feature Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shrink-0">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Secure Entry</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Verified QR access</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Global Network</h4>
                  <p className="text-gray-500 text-xs mt-0.5">500+ major hubs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-gray-500 text-xs leading-relaxed">
              © 2026 LoungeLink Inc. All rights reserved. Premium airport travel access platform.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel: Clean Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-gray-50/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile Logo Header */}
          <div className="flex lg:hidden items-center gap-2 justify-center mb-8">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <Plane className="text-white w-5 h-5 rotate-45" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              LoungeLink
            </span>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Welcome back
            </h1>
            <p className="text-gray-500 font-medium">
              Enter your details below to sign in to your account
            </p>
          </div>

          {/* Demo Account Shortcuts (Premium UI Helper) */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Demo Accounts (Quick Sign-In)
              </span>
              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                1-Click Autofill
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => handleDemoLogin(account)}
                  className="flex items-center gap-2.5 p-2 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left group"
                >
                  <img
                    src={account.avatar}
                    alt={account.name}
                    className="w-7 h-7 rounded-lg object-cover ring-2 ring-gray-100 group-hover:ring-blue-100"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">
                      {account.name.split(" ")[0]}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium capitalize">
                      {account.role}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 text-sm font-medium">
                {error}
              </div>
            )}

            <Input
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
            />

            <div className="space-y-1">
              <div className="flex items-center justify-between mb-0.5">
                <label className="text-sm font-medium text-gray-700 ml-1">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Password reset link simulation sent!");
                  }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500/20 border-gray-300 rounded-lg transition-colors cursor-pointer"
                defaultChecked
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm font-medium text-gray-600 cursor-pointer select-none"
              >
                Keep me signed in on this device
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl text-base font-bold shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          {/* Social Logins */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50/50 px-3 text-gray-400 font-bold tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => toast.info("Google Sign-In simulation")}
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 bg-white transition-all text-sm font-semibold text-gray-700"
            >
              <Chrome size={16} className="text-red-500" /> Google
            </button>
            <button
              onClick={() => toast.info("Compass Wallet Sign-In simulation")}
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 bg-white transition-all text-sm font-semibold text-gray-700"
            >
              <Compass size={16} className="text-blue-600 animate-pulse" /> Wallet
            </button>
          </div>

          {/* Sign Up Redirect */}
          <p className="text-center text-sm font-semibold text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/app/register"
              className="text-blue-600 hover:text-blue-700 transition-colors underline"
            >
              Create one for free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
