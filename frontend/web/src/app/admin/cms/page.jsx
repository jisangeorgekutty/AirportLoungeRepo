"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  MessageSquare,
  Star,
  Mail,
  Bell,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Globe,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";

const mockFAQs = [
  {
    id: 1,
    question: "How does LoungeLink work?",
    answer:
      "LoungeLink connects travelers needing lounge access with providers who have unused complimentary entries through credit cards, memberships, or loyalty programs.",
    category: "General",
    published: true,
  },
  {
    id: 2,
    question: "What is the platform fee?",
    answer:
      "LoungeLink charges a 5% platform fee on all successful transactions. This covers payment processing, customer support, and platform maintenance.",
    category: "Pricing",
    published: true,
  },
  {
    id: 3,
    question: "How are providers verified?",
    answer:
      "Providers go through a multi-step KYC process including identity verification, card/membership verification, and document submission before they can list offers.",
    category: "Trust & Safety",
    published: true,
  },
  {
    id: 4,
    question: "What happens if I can't access the lounge?",
    answer:
      "If you experience any issues accessing the lounge, contact our support team immediately. We'll investigate and offer a full refund if the issue is on the provider's side.",
    category: "Support",
    published: false,
  },
];

const mockTestimonials = [
  {
    id: 1,
    name: "Rachel Kim",
    role: "Business Traveler",
    text: "LoungeLink saved me during a 6-hour layover. Found access in minutes!",
    rating: 5,
    approved: true,
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Frequent Flyer",
    text: "As a provider, I've earned over $2,000 from access I would have wasted. Incredible!",
    rating: 5,
    approved: true,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Travel Blogger",
    text: "The QR delivery system is seamless. Highly recommend for all airport lounges.",
    rating: 4,
    approved: false,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
  },
];

const cmsModules = [
  {
    id: "faqs",
    label: "FAQs",
    icon: <MessageSquare size={20} />,
    count: mockFAQs.length,
    badge: `${mockFAQs.filter((f) => f.published).length} Published`,
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: <Star size={20} />,
    count: mockTestimonials.length,
    badge: `${mockTestimonials.filter((t) => t.approved).length} Approved`,
  },
  {
    id: "emails",
    label: "Email Templates",
    icon: <Mail size={20} />,
    count: 8,
    badge: "8 Templates",
  },
  {
    id: "notifications",
    label: "Push Notifications",
    icon: <Bell size={20} />,
    count: 3,
    badge: "3 Active",
  },
  {
    id: "homepage",
    label: "Homepage Content",
    icon: <Globe size={20} />,
    count: null,
    badge: "Live",
  },
];

function FAQSection() {
  const [expanded, setExpanded] = useState(null);
  const [faqs, setFaqs] = useState(mockFAQs);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-100 w-full sm:w-80">
          <Search size={14} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="bg-transparent border-none outline-none text-sm ml-2 w-full"
          />
        </div>
        <Button className="rounded-xl flex items-center gap-2 shrink-0">
          <Plus size={14} /> Add FAQ
        </Button>
      </div>
      <div className="space-y-3">
        {filtered.map((faq) => (
          <Card
            key={faq.id}
            className="p-4 border border-gray-100 shadow-sm"
            hoverable={false}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge variant={faq.published ? "green" : "gray"}>
                    {faq.published ? "Published" : "Draft"}
                  </Badge>
                  <Badge variant="blue">{faq.category}</Badge>
                </div>
                <button
                  onClick={() =>
                    setExpanded(expanded === faq.id ? null : faq.id)
                  }
                  className="text-left w-full"
                >
                  <p className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    {faq.question}
                    {expanded === faq.id ? (
                      <ChevronUp size={14} className="text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown
                        size={14}
                        className="text-gray-400 shrink-0"
                      />
                    )}
                  </p>
                </button>
                <AnimatePresence>
                  {expanded === faq.id && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-sm text-gray-500 mt-2 leading-relaxed overflow-hidden"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() =>
                    setFaqs((prev) =>
                      prev.map((f) =>
                        f.id === faq.id ? { ...f, published: !f.published } : f,
                      ),
                    )
                  }
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                >
                  <Eye size={14} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 font-medium">
          {mockTestimonials.length} testimonials •{" "}
          {mockTestimonials.filter((t) => t.approved).length} approved
        </p>
        <Button
          variant="secondary"
          className="rounded-xl border-gray-200 flex items-center gap-2"
        >
          <Plus size={14} /> Add
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTestimonials.map((t) => (
          <Card
            key={t.id}
            className="p-5 border border-gray-100 shadow-sm relative"
            hoverable={false}
          >
            <div className="absolute top-4 right-4 flex gap-1">
              <Badge variant={t.approved ? "green" : "yellow"}>
                {t.approved ? "Approved" : "Pending"}
              </Badge>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div>
                <p className="text-sm font-bold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < t.rating ? "#f59e0b" : "none"}
                  className={i < t.rating ? "text-amber-400" : "text-gray-200"}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              "{t.text}"
            </p>
            <div className="flex gap-2">
              {!t.approved && (
                <button className="flex-1 py-2 text-xs font-bold bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
                  Approve
                </button>
              )}
              <button className="flex-1 py-2 text-xs font-bold bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                Edit
              </button>
              <button className="py-2 px-3 text-xs font-bold bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors">
                <Trash2 size={12} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function AdminCMS() {
  const [activeModule, setActiveModule] = useState("faqs");

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Content Management
          </h1>
          <p className="text-gray-500">
            Manage platform content, FAQs, and templates
          </p>
        </div>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cmsModules.map((m) => (
          <motion.button
            whileHover={{ y: -2 }}
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className={`p-4 rounded-2xl border text-left transition-all ${activeModule === m.id ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/25" : "bg-white border-gray-100 text-gray-700 hover:border-blue-200 hover:shadow-md shadow-sm"}`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${activeModule === m.id ? "bg-white/20" : "bg-blue-50"}`}
            >
              <span
                className={
                  activeModule === m.id ? "text-white" : "text-blue-600"
                }
              >
                {m.icon}
              </span>
            </div>
            <p className="font-black text-sm">{m.label}</p>
            <p
              className={`text-xs mt-1 font-medium ${activeModule === m.id ? "text-blue-100" : "text-gray-400"}`}
            >
              {m.badge}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      <Card className="p-6 border-none shadow-lg" hoverable={false}>
        <div className="mb-6 pb-4 border-b border-gray-100">
          <h3 className="font-black text-gray-900 text-lg capitalize">
            {cmsModules.find((m) => m.id === activeModule)?.label}
          </h3>
        </div>
        {activeModule === "faqs" && <FAQSection />}
        {activeModule === "testimonials" && <TestimonialsSection />}
        {(activeModule === "emails" ||
          activeModule === "notifications" ||
          activeModule === "homepage") && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-blue-400" />
            </div>
            <p className="font-black text-gray-700 text-lg mb-2">
              {cmsModules.find((m) => m.id === activeModule)?.label} Editor
            </p>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
              Use the rich editor to manage your content. Changes are previewed
              in real-time before publishing.
            </p>
            <Button className="rounded-2xl">
              <Plus size={14} className="mr-2" /> Create New
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
