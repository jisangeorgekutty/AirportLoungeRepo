import React from "react";
import { Button } from "@/components/ui";
import {
  Plane,
  Shield,
  Globe,
  TrendingUp,
  Menu,
  X,
  ArrowRight,
  Star,
  Clock,
  CreditCard,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3" : "bg-transparent py-5"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Plane className="text-white w-6 h-6 rotate-45" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              LoungeLink
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              How it Works
            </a>
            <a
              href="/pricing"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </a>
            <div className="h-4 w-px bg-gray-200" />
            <Link
              to="/app/login"
              className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Button
              variant="dark"
              size="sm"
              className="rounded-full"
              onClick={() => navigate("/app/register")}
            >
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-50 blur-[120px] rounded-full opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-purple-50 blur-[120px] rounded-full opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8 border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Now live at 500+ global airports
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Turn Unused Airport <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent italic">
                Lounge Access
              </span>{" "}
              Into Income
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-12 leading-relaxed">
              Connect with travelers needing lounge access during layovers and
              earn money from unused complimentary entries. Premium comfort,
              decentralized.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full w-full sm:w-auto h-14 px-8 text-lg"
                onClick={() => navigate("/app/marketplace")}
              >
                Find Lounge Access
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full w-full sm:w-auto h-14 px-8 text-lg bg-gray-50 border-gray-100"
                onClick={() => navigate("/app/offer")}
              >
                Offer Lounge Access
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white p-2">
              <img
                src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=2000"
                alt="Lounge Dashboard"
                className="rounded-2xl w-full h-[600px] object-cover"
              />
            </div>

            {/* Floating Cards Mockup */}
            <div className="absolute -left-12 bottom-20 hidden lg:block animate-bounce-slow">
              <div className="bg-white/90 backdrop-blur shadow-xl rounded-2xl p-4 border border-gray-100 w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Daily Earnings
                    </p>
                    <p className="text-lg font-bold text-gray-900">+$240.00</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[70%]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Elevate Your Travel Experience
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Built for the modern traveler. Secure, seamless, and premium
              access for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: "Secure Verification",
                description:
                  "Every card and user is verified to ensure a safe and seamless experience for everyone.",
              },
              {
                icon: <Globe className="w-8 h-8 text-blue-600" />,
                title: "Global Coverage",
                description:
                  "Access lounges across 500+ major airports including JFK, DXB, LHR, and SIN.",
              },
              {
                icon: <CreditCard className="w-8 h-8 text-blue-600" />,
                title: "Instant Payouts",
                description:
                  "Monetize your unused complimentary entries and get paid instantly to your wallet.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-gray-800 pb-16">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Plane className="text-white w-5 h-5 rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                LoungeLink
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Making premium airport travel accessible to everyone while helping
              providers monetize unused benefits.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Lounge Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>© 2026 LoungeLink Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Built with ❤️ for Travelers</span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
