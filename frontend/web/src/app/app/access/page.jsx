"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  QrCode,
  Upload,
  Shield,
  Clock,
  Download,
  Eye,
  CheckCircle,
  AlertTriangle,
  FileText,
  Image as ImageIcon,
  Lock,
  Zap,
  ArrowRight,
  RefreshCw,
  X,
  Copy,
  Share2,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { qrAccesses, offers, users } from "@/mock";

const currentUser = users[0];

function CountdownTimer({ validUntil }) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const calc = () => {
      const diff = new Date(validUntil) - new Date();
      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
      );
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [validUntil]);
  return <span>{timeLeft}</span>;
}

function UploadModal({ onClose, onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(dropped);
  };

  const handleSubmit = async () => {
    setUploading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setUploading(false);
    setDone(true);
    setTimeout(() => {
      onUpload();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-gray-900">
              Upload Access Pass
            </h3>
            <p className="text-sm text-gray-500">QR code, screenshot, or PDF</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {done ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <p className="font-black text-xl text-gray-900 mb-1">Delivered!</p>
            <p className="text-sm text-gray-500">
              The seeker has been notified.
            </p>
          </motion.div>
        ) : (
          <>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() =>
                document.getElementById("file-upload-input").click()
              }
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/50"}`}
            >
              <input
                id="file-upload-input"
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files))}
              />
              <Upload
                className={`mx-auto mb-3 ${dragActive ? "text-blue-600" : "text-gray-400"}`}
                size={32}
              />
              <p className="font-bold text-gray-700 mb-1">
                Drop files here or click to browse
              </p>
              <p className="text-sm text-gray-400">
                PNG, JPG, PDF — Max 10MB each
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <FileText size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700 flex-1 truncate">
                      {f.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {(f.size / 1024).toFixed(0)} KB
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: <QrCode size={20} />, label: "QR Code" },
                { icon: <ImageIcon size={20} />, label: "Screenshot" },
                { icon: <FileText size={20} />, label: "PDF Pass" },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                >
                  <div className="text-blue-600">{t.icon}</div>
                  <span className="text-xs font-bold text-gray-700">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={files.length === 0 || uploading}
              className="w-full mt-6 h-12 rounded-2xl"
            >
              {uploading ? (
                <>
                  <RefreshCw size={16} className="animate-spin mr-2" />{" "}
                  Uploading & Encrypting...
                </>
              ) : (
                <>
                  <Lock size={16} className="mr-2" /> Securely Deliver Access
                </>
              )}
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
}

function QRPreviewCard({ access }) {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(
      `LOUNGELINK-ACCESS-${access.id.toUpperCase()}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isExpired = new Date(access.validUntil) < new Date();
  const isDelivered = access.status === "delivered";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden"
    >
      {/* Top gradient strip */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={isDelivered ? "green" : "yellow"}>
                {isDelivered ? "✓ Delivered" : "⏳ Pending"}
              </Badge>
              {isExpired && <Badge variant="red">Expired</Badge>}
            </div>
            <h3 className="text-xl font-black text-gray-900">
              {access.lounge}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {access.airport} · {access.terminal}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mb-1 relative overflow-hidden">
              <QrCode className="text-white" size={32} />
              {!isDelivered && (
                <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                  <Lock size={14} className="text-gray-400" />
                </div>
              )}
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Access Pass
            </span>
          </div>
        </div>

        {/* Validity window */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Valid From
            </p>
            <p className="text-sm font-black text-gray-900">
              {new Date(access.validFrom).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(access.validFrom).toLocaleDateString([], {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Valid Until
            </p>
            <p className="text-sm font-black text-gray-900">
              {new Date(access.validUntil).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(access.validUntil).toLocaleDateString([], {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Countdown */}
        {isDelivered && !isExpired && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Time Remaining
              </p>
              <p className="text-2xl font-black text-blue-700 font-mono">
                <CountdownTimer validUntil={access.validUntil} />
              </p>
            </div>
          </div>
        )}

        {isDelivered && access.qrCodeUrl && (
          <>
            {showQR ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6"
              >
                <div className="bg-white border-2 border-gray-900 rounded-2xl p-4 flex flex-col items-center gap-4">
                  <img
                    src={access.qrCodeUrl}
                    alt="QR Code"
                    className="w-48 h-48 rounded-xl"
                  />
                  <div className="flex items-center gap-2 w-full bg-gray-50 rounded-xl px-3 py-2">
                    <code className="text-xs font-mono text-gray-700 flex-1 truncate">
                      LOUNGELINK-ACCESS-{access.id.toUpperCase()}
                    </code>
                    <button
                      onClick={copyCode}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}

            <div className="flex gap-3">
              <button
                onClick={() => setShowQR(!showQR)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-colors"
              >
                <Eye size={16} /> {showQR ? "Hide" : "View"} QR Code
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-colors">
                <Download size={16} /> Download
              </button>
              <button className="p-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </>
        )}

        {/* Security notice */}
        <div className="mt-4 flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3">
          <Shield size={14} className="text-green-600 shrink-0" />
          <p className="text-xs text-green-700 font-medium">
            This pass is encrypted and single-use. Do not share outside the
            platform.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AccessPage() {
  const [showUpload, setShowUpload] = useState(false);
  const [accesses, setAccesses] = useState(qrAccesses);
  const [activeTab, setActiveTab] = useState("received");

  const myProviderAccesses = accesses.filter(
    (a) => a.providerId === currentUser.id,
  );
  const mySeekerAccesses = accesses.filter(
    (a) => a.seekerId === currentUser.id,
  );

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showUpload && (
          <UploadModal
            onClose={() => setShowUpload(false)}
            onUpload={() => {}}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            QR Access Delivery
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and deliver secure lounge access passes
          </p>
        </div>
        <Button
          onClick={() => setShowUpload(true)}
          className="rounded-2xl flex items-center gap-2"
        >
          <Upload size={16} /> Upload Access Pass
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Delivered",
            value: "12",
            icon: <CheckCircle size={18} />,
            color: "green",
          },
          {
            label: "Pending Upload",
            value: "2",
            icon: <Clock size={18} />,
            color: "yellow",
          },
          {
            label: "Active Passes",
            value: "5",
            icon: <Zap size={18} />,
            color: "blue",
          },
          {
            label: "Expired",
            value: "8",
            icon: <AlertTriangle size={18} />,
            color: "red",
          },
        ].map((s) => (
          <Card
            key={s.label}
            className="p-5 border-none shadow-md"
            hoverable={false}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                s.color === "green"
                  ? "bg-green-50 text-green-600"
                  : s.color === "yellow"
                    ? "bg-yellow-50 text-yellow-600"
                    : s.color === "blue"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-red-50 text-red-600"
              }`}
            >
              {s.icon}
            </div>
            <p className="text-2xl font-black text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 font-medium">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit">
        {["received", "sent"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all capitalize ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {tab === "received" ? "Received Passes" : "Sent Passes"}
          </button>
        ))}
      </div>

      {/* Access Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {(activeTab === "received" ? mySeekerAccesses : myProviderAccesses).map(
          (access) => (
            <QRPreviewCard key={access.id} access={access} />
          ),
        )}

        {(activeTab === "received" ? mySeekerAccesses : myProviderAccesses)
          .length === 0 && (
          <div className="col-span-2 text-center py-24">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode size={36} className="text-gray-400" />
            </div>
            <p className="text-lg font-black text-gray-700 mb-2">
              No access passes yet
            </p>
            <p className="text-gray-500 text-sm mb-6">
              {activeTab === "received"
                ? "Your purchased lounge access passes will appear here."
                : "Upload QR codes for your approved bookings."}
            </p>
            {activeTab === "sent" && (
              <Button
                onClick={() => setShowUpload(true)}
                className="rounded-2xl"
              >
                <Upload size={16} className="mr-2" /> Upload First Pass
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Provider action banner */}
      {activeTab === "sent" &&
        myProviderAccesses.some((a) => a.status === "pending") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 text-white flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
              <p className="font-black text-lg">Action Required</p>
              <p className="text-orange-100 text-sm">
                You have pending bookings awaiting QR code upload. Upload now to
                maintain your provider rating.
              </p>
            </div>
            <Button
              onClick={() => setShowUpload(true)}
              className="bg-white text-orange-600 hover:bg-orange-50 shadow-none rounded-2xl shrink-0"
            >
              Upload Now <ArrowRight size={16} className="ml-1" />
            </Button>
          </motion.div>
        )}
    </div>
  );
}
