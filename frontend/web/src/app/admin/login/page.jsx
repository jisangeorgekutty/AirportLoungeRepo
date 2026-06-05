import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input } from "@/components/ui";
import { Globe, ShieldAlert, Key, ArrowRight, Server, Terminal, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuickLogin = () => {
    setEmail("admin@loungelink.com");
    setAccessKey("admin123");
    toast.success("Loaded Super Admin credentials");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Admin email is required");
      return;
    }
    if (!accessKey) {
      setError("Access key is required");
      return;
    }

    setLoading(true);

    // Simulate Admin Terminal authorization
    setTimeout(() => {
      if (email === "admin@loungelink.com" && accessKey === "admin123") {
        setLoading(false);
        toast.success("Authorization successful. Welcome to HQ.");
        navigate("/admin/dashboard");
      } else {
        setLoading(false);
        setError("Invalid administrator credentials or access key revoked.");
        toast.error("Access Denied");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Matrix/Grid Effect */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Gradient Ambient Lights */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-900/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-950/30 blur-[150px] rounded-full" />

      {/* Main Terminal Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-2xl border border-gray-800 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        {/* HQ Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 relative group">
            <Globe className="text-white w-8 h-8 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-4 border-gray-900" />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic flex items-center justify-center gap-1.5">
              LoungeLink <span className="text-blue-500">HQ</span>
            </h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1 flex items-center justify-center gap-1.5">
              <Server size={12} className="text-gray-600" /> Secure Admin Terminal
            </p>
          </div>
        </div>

        {/* Quick Demo Credentials */}
        <div className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
              Environment Setup
            </p>
            <p className="text-xs font-semibold text-gray-300">
              Super Admin Quick Entry
            </p>
          </div>
          <button
            type="button"
            onClick={handleQuickLogin}
            className="text-xs font-bold bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            Autofill HQ
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-950/30 border border-red-900/40 text-red-400 rounded-xl p-3 text-xs font-medium flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
              Admin Identity / Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="admin@loungelink.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-950 text-white placeholder-gray-600 text-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
              Terminal Access Key
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-950 text-white placeholder-gray-600 text-sm font-medium"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl text-base font-bold shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white border-none cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2 text-sm uppercase tracking-wider font-bold">
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
                Authorizing...
              </span>
            ) : (
              <>
                Initialize Access <ArrowRight size={16} />
              </>
            )}
          </Button>
        </form>

        {/* Back to Client Site */}
        <div className="mt-8 text-center border-t border-gray-800/80 pt-5">
          <a
            href="/"
            className="text-xs font-semibold text-gray-500 hover:text-blue-400 transition-colors flex items-center justify-center gap-1.5"
          >
            <Terminal size={12} /> Return to Client Platform
          </a>
        </div>
      </motion.div>
    </div>
  );
}
