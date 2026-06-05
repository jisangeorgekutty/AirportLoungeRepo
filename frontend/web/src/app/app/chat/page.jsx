"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Search,
  Paperclip,
  Image,
  File,
  MoreVertical,
  Check,
  CheckCheck,
  Phone,
  Video,
  ArrowLeft,
  Smile,
  ExternalLink,
  X,
  Download,
} from "lucide-react";
import { chatConversations, users } from "@/mock";

const currentUser = users[0];

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function formatDate(iso) {
  const d = new Date(iso);
  const today = new Date();
  const diff = today - d;
  if (diff < 86400000) return "Today";
  if (diff < 172800000) return "Yesterday";
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

export default function ChatPage() {
  const [conversations, setConversations] = useState(chatConversations);
  const [activeConvId, setActiveConvId] = useState(chatConversations[0].id);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mobileView, setMobileView] = useState("list");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const activeConv = conversations.find((c) => c.id === activeConvId);
  const otherUserId = activeConv?.participants.find(
    (p) => p !== currentUser.id,
  );
  const otherUser = users.find((u) => u.id === otherUserId) || users[1];

  const filteredConvs = conversations.filter((c) => {
    const ou = users.find(
      (u) => u.id === c.participants.find((p) => p !== currentUser.id),
    );
    return ou?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConvId, conversations]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      text: inputText,
      time: new Date().toISOString(),
      read: true,
      type: "text",
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: inputText,
              lastMessageTime: newMsg.time,
              unread: 0,
            }
          : c,
      ),
    );
    setInputText("");
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply = {
          id: `m${Date.now() + 1}`,
          senderId: otherUserId,
          text: "Thanks for reaching out! I'll get back to you shortly.",
          time: new Date().toISOString(),
          read: false,
          type: "text",
        };
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConvId
              ? {
                  ...c,
                  messages: [...c.messages, reply],
                  lastMessage: reply.text,
                  lastMessageTime: reply.time,
                }
              : c,
          ),
        );
      }, 2000);
    }, 500);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex rounded-2xl overflow-hidden border border-gray-100 shadow-xl bg-white">
      {/* Sidebar */}
      <div
        className={`w-full md:w-96 md:flex flex-col border-r border-gray-100 bg-white ${mobileView === "chat" ? "hidden" : "flex"}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-gray-900">Messages</h2>
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {conversations.reduce((sum, c) => sum + c.unread, 0)} New
            </span>
          </div>
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-100">
            <Search className="text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filteredConvs.map((conv) => {
            const ou = users.find(
              (u) =>
                u.id === conv.participants.find((p) => p !== currentUser.id),
            );
            const isActive = conv.id === activeConvId;
            return (
              <motion.button
                key={conv.id}
                whileHover={{ backgroundColor: "#f8fafc" }}
                onClick={() => {
                  setActiveConvId(conv.id);
                  setMobileView("chat");
                }}
                className={`w-full flex items-center gap-4 px-6 py-4 transition-all text-left ${isActive ? "bg-blue-50 border-r-4 border-blue-600" : ""}`}
              >
                <div className="relative shrink-0">
                  <img
                    src={ou?.avatar}
                    alt={ou?.name}
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p
                      className={`text-sm font-bold ${isActive ? "text-blue-700" : "text-gray-900"} truncate`}
                    >
                      {ou?.name}
                    </p>
                    <span className="text-[10px] text-gray-400 font-medium shrink-0 ml-2">
                      {formatDate(conv.lastMessageTime)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 truncate max-w-[180px]">
                      {conv.lastMessage}
                    </p>
                    {conv.unread > 0 && (
                      <span className="bg-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  {conv.offerId && (
                    <span className="text-[10px] text-blue-500 font-bold mt-0.5 block">
                      Re: Lounge Offer #{conv.offerId}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      <div
        className={`flex-1 flex flex-col min-w-0 ${mobileView === "list" ? "hidden md:flex" : "flex"}`}
      >
        {/* Chat header */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100 bg-white gap-4">
          <button
            onClick={() => setMobileView("list")}
            className="md:hidden p-2 text-gray-400 hover:text-gray-700"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="relative">
            <img
              src={otherUser?.avatar}
              alt={otherUser?.name}
              className="w-11 h-11 rounded-xl object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div className="flex-1">
            <p className="font-black text-gray-900">{otherUser?.name}</p>
            <p className="text-xs text-green-500 font-bold">Active now</p>
          </div>
          {activeConv?.offerId && (
            <a
              href="/app/marketplace"
              className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
            >
              <ExternalLink size={12} /> View Offer #{activeConv.offerId}
            </a>
          )}
          <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
            <Phone size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
            <Video size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
          {activeConv?.messages.map((msg, idx) => {
            const isMe = msg.senderId === currentUser.id;
            const showDate =
              idx === 0 ||
              new Date(activeConv.messages[idx - 1].time).toDateString() !==
                new Date(msg.time).toDateString();
            return (
              <div key={msg.id}>
                {showDate && (
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400 font-bold">
                      {formatDate(msg.time)}
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                >
                  {!isMe && (
                    <img
                      src={otherUser?.avatar}
                      alt=""
                      className="w-8 h-8 rounded-xl object-cover shrink-0 mb-1"
                    />
                  )}
                  <div
                    className={`max-w-[70%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        isMe
                          ? "bg-blue-600 text-white rounded-br-md"
                          : "bg-white text-gray-900 border border-gray-100 shadow-sm rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <div
                      className={`flex items-center gap-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <span className="text-[10px] text-gray-400">
                        {formatTime(msg.time)}
                      </span>
                      {isMe &&
                        (msg.read ? (
                          <CheckCheck size={12} className="text-blue-500" />
                        ) : (
                          <Check size={12} className="text-gray-400" />
                        ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end gap-2"
            >
              <img
                src={otherUser?.avatar}
                alt=""
                className="w-8 h-8 rounded-xl object-cover"
              />
              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6,
                      delay: i * 0.15,
                    }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-400 hover:text-blue-600 transition-colors p-1"
            >
              <Paperclip size={18} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*,.pdf"
            />
            <button className="text-gray-400 hover:text-blue-600 transition-colors p-1">
              <Image size={18} />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-400"
            />
            <button className="text-gray-400 hover:text-yellow-500 transition-colors p-1">
              <Smile size={18} />
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={sendMessage}
              disabled={!inputText.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white p-2.5 rounded-xl transition-all"
            >
              <Send size={16} />
            </motion.button>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-2 font-medium">
            All conversations are encrypted and monitored for safety
          </p>
        </div>
      </div>
    </div>
  );
}
