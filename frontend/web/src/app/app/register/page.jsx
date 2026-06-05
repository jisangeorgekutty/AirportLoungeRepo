import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useStore } from "@/store";
import { Button, Input } from "@/components/ui";
import { Plane, Shield, Globe, ArrowRight, Sparkles, Check, X, User, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function RegisterPage() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("seeker"); // default to seeker
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Real-time password validation state
  const [rules, setRules] = useState({
    length: false,
    hasNumber: false,
    hasUpper: false,
  });

  useEffect(() => {
    setRules({
      length: password.length >= 6,
      hasNumber: /\d/.test(password),
      hasUpper: /[A-Z]/.test(password),
    });
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!fullName) {
      setError("Full name is required");
      return;
    }
    if (!email) {
      setError("Email address is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Verify password rules
    if (!rules.length || !rules.hasNumber || !rules.hasUpper) {
      setError("Please satisfy all password requirements");
      return;
    }

    setLoading(true);

    // Simulate account registration
    setTimeout(() => {
      const newUser = {
        id: `u_${Date.now()}`,
        name: fullName,
        email: email,
        role: role,
        avatar: role === "seeker" 
          ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" 
          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        walletBalance: 0,
      };

      setUser(newUser);
      setLoading(false);
      toast.success(`Account created! Welcome, ${fullName}!`);
      navigate("/app/dashboard");
    }, 1500);
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
                <Sparkles size={12} /> Start Your Journey
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Step into a world of comfort and utility.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Unlock exclusive airport lounges or start earning by sharing access with fellow travelers. Complete in minutes.
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

      {/* Right Panel: Clean Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-gray-50/30 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-7 my-auto"
        >
          {/* Mobile Logo Header */}
          <div className="flex lg:hidden items-center gap-2 justify-center mb-6">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <Plane className="text-white w-5 h-5 rotate-45" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              LoungeLink
            </span>
          </div>

          <div className="space-y-1.5 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Create your account
            </h1>
            <p className="text-gray-500 font-medium text-sm">
              Sign up today and get access in seconds
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 text-sm font-medium">
                {error}
              </div>
            )}

            <Input
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-white"
            />

            <Input
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
            />

            {/* Interactive Role Card Selectors */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setRole("seeker")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-2 relative bg-white select-none ${
                    role === "seeker"
                      ? "border-blue-600 bg-blue-50/20 shadow-md shadow-blue-500/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {role === "seeker" && (
                    <span className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    role === "seeker" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Find Access</p>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5">I am a traveler</p>
                  </div>
                </div>

                <div
                  onClick={() => setRole("provider")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-2 relative bg-white select-none ${
                    role === "provider"
                      ? "border-blue-600 bg-blue-50/20 shadow-md shadow-blue-500/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {role === "provider" && (
                    <span className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    role === "provider" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Share Access</p>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5">I have lounge perks</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Password input + dynamic validator */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              />

              {/* Password Strength Validation Checklist */}
              {password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-1.5 mt-2"
                >
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Password Requirements:
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs">
                      {rules.length ? (
                        <Check size={14} className="text-green-500" strokeWidth={3} />
                      ) : (
                        <X size={14} className="text-gray-400" strokeWidth={3} />
                      )}
                      <span className={rules.length ? "text-green-600 font-medium" : "text-gray-500"}>
                        At least 6 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      {rules.hasNumber ? (
                        <Check size={14} className="text-green-500" strokeWidth={3} />
                      ) : (
                        <X size={14} className="text-gray-400" strokeWidth={3} />
                      )}
                      <span className={rules.hasNumber ? "text-green-600 font-medium" : "text-gray-500"}>
                        At least one number
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      {rules.hasUpper ? (
                        <Check size={14} className="text-green-500" strokeWidth={3} />
                      ) : (
                        <X size={14} className="text-gray-400" strokeWidth={3} />
                      )}
                      <span className={rules.hasUpper ? "text-green-600 font-medium" : "text-gray-500"}>
                        At least one uppercase letter
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl text-base font-bold shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 mt-4"
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
                  Registering...
                </span>
              ) : (
                <>
                  Get Started <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          {/* Sign In Redirect */}
          <p className="text-center text-sm font-semibold text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/app/login"
              className="text-blue-600 hover:text-blue-700 transition-colors underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
