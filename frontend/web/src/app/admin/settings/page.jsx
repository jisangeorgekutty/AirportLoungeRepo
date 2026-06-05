"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  DollarSign,
  Bell,
  Mail,
  Shield,
  Globe,
  Save,
  Eye,
  EyeOff,
  Lock,
  Percent,
  AlertTriangle,
  CheckCircle,
  Sliders,
} from "lucide-react";
import { Card, Button, Badge } from "@/components/ui";

const settingsTabs = [
  { id: "platform", label: "Platform Fees", icon: <DollarSign size={16} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
  { id: "email", label: "Email Settings", icon: <Mail size={16} /> },
  { id: "security", label: "Security", icon: <Shield size={16} /> },
  { id: "general", label: "General", icon: <Globe size={16} /> },
];

function PlatformFeeSettings() {
  const [fees, setFees] = useState({
    platformFee: 5,
    domesticFee: 2.5,
    internationalFee: 5,
    minWithdrawal: 20,
    maxWithdrawal: 5000,
    withdrawalProcessDays: 3,
  });
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-amber-800 text-sm">
            Fee Changes Require Approval
          </p>
          <p className="text-xs text-amber-700 mt-1">
            Any changes to platform fees will be reviewed and require
            super-admin confirmation before going live.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            key: "platformFee",
            label: "Global Platform Fee",
            desc: "Applied to all transactions",
            icon: <Percent size={16} />,
            suffix: "%",
          },
          {
            key: "domesticFee",
            label: "Domestic Lounge Fee",
            desc: "Domestic airport lounge access",
            icon: <Percent size={16} />,
            suffix: "%",
          },
          {
            key: "internationalFee",
            label: "International Lounge Fee",
            desc: "International airport lounge access",
            icon: <Percent size={16} />,
            suffix: "%",
          },
          {
            key: "minWithdrawal",
            label: "Minimum Withdrawal",
            desc: "Minimum amount per withdrawal request",
            icon: <DollarSign size={16} />,
            prefix: "$",
          },
          {
            key: "maxWithdrawal",
            label: "Maximum Withdrawal",
            desc: "Maximum single withdrawal amount",
            icon: <DollarSign size={16} />,
            prefix: "$",
          },
          {
            key: "withdrawalProcessDays",
            label: "Processing Time (Days)",
            desc: "Business days to process withdrawals",
            icon: <Sliders size={16} />,
            suffix: " days",
          },
        ].map((f) => (
          <div
            key={f.key}
            className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-600">{f.icon}</span>
              <p className="text-sm font-black text-gray-900">{f.label}</p>
            </div>
            <p className="text-xs text-gray-500 mb-3">{f.desc}</p>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
              {f.prefix && (
                <span className="px-3 py-2.5 text-sm font-bold text-gray-500 bg-gray-50 border-r border-gray-200">
                  {f.prefix}
                </span>
              )}
              <input
                type="number"
                value={fees[f.key]}
                onChange={(e) =>
                  setFees((prev) => ({ ...prev, [f.key]: +e.target.value }))
                }
                className="flex-1 px-3 py-2.5 text-sm font-black text-gray-900 bg-transparent outline-none"
              />
              {f.suffix && (
                <span className="px-3 py-2.5 text-sm font-bold text-gray-500 bg-gray-50 border-l border-gray-200">
                  {f.suffix}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${saved ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
      >
        {saved ? (
          <>
            <CheckCircle size={16} /> Saved!
          </>
        ) : (
          <>
            <Save size={16} /> Save Fee Settings
          </>
        )}
      </button>
    </div>
  );
}

function NotificationSettings() {
  const [settings, setSettings] = useState({
    newBooking: true,
    paymentReceived: true,
    withdrawalRequest: true,
    newUser: false,
    disputeOpened: true,
    systemAlerts: true,
    weeklyReport: true,
    monthlyReport: false,
  });

  return (
    <div className="space-y-4">
      {[
        {
          group: "Transaction Alerts",
          items: [
            { key: "newBooking", label: "New Booking" },
            { key: "paymentReceived", label: "Payment Received" },
            { key: "withdrawalRequest", label: "Withdrawal Request" },
          ],
        },
        {
          group: "User Alerts",
          items: [
            { key: "newUser", label: "New User Registration" },
            { key: "disputeOpened", label: "Dispute Opened" },
          ],
        },
        {
          group: "System Alerts",
          items: [
            { key: "systemAlerts", label: "System Alerts" },
            { key: "weeklyReport", label: "Weekly Report" },
            { key: "monthlyReport", label: "Monthly Report" },
          ],
        },
      ].map((group) => (
        <Card
          key={group.group}
          className="p-5 border border-gray-100 shadow-sm"
          hoverable={false}
        >
          <h4 className="font-black text-gray-900 mb-4 text-sm">
            {group.group}
          </h4>
          <div className="space-y-3">
            {group.items.map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-700">
                    {item.label}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key],
                    }))
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors ${settings[item.key] ? "bg-blue-600" : "bg-gray-200"}`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[item.key] ? "translate-x-5 left-0.5" : "left-0.5"}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>
      ))}
      <Button className="rounded-2xl flex items-center gap-2">
        <Save size={14} /> Save Notification Settings
      </Button>
    </div>
  );
}

function SecuritySettings() {
  const [show2FA, setShow2FA] = useState(false);
  return (
    <div className="space-y-6">
      {[
        {
          title: "Two-Factor Authentication",
          desc: "Require 2FA for all admin accounts",
          enabled: true,
        },
        {
          title: "IP Whitelist",
          desc: "Restrict admin access to whitelisted IPs",
          enabled: false,
        },
        {
          title: "Session Timeout",
          desc: "Auto-logout after 30 minutes of inactivity",
          enabled: true,
        },
        {
          title: "Login Audit Logs",
          desc: "Track all admin login attempts",
          enabled: true,
        },
      ].map((s) => (
        <Card
          key={s.title}
          className="p-5 border border-gray-100 shadow-sm flex items-center justify-between gap-4"
          hoverable={false}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Lock size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">{s.title}</p>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={s.enabled ? "green" : "gray"}>
              {s.enabled ? "Active" : "Inactive"}
            </Badge>
            <button className="text-xs font-bold text-blue-600 hover:underline">
              Configure
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("platform");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Admin Settings
        </h1>
        <p className="text-gray-500">
          Configure platform fees, notifications, security, and more
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="lg:w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 space-y-1">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${activeTab === tab.id ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25" : "text-gray-600 hover:bg-gray-50"}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "platform" && <PlatformFeeSettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {(activeTab === "email" || activeTab === "general") && (
              <Card
                className="p-8 border-none shadow-lg text-center"
                hoverable={false}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {activeTab === "email" ? (
                    <Mail size={28} className="text-blue-400" />
                  ) : (
                    <Globe size={28} className="text-blue-400" />
                  )}
                </div>
                <p className="font-black text-gray-900 text-lg mb-2">
                  {activeTab === "email"
                    ? "Email Settings"
                    : "General Settings"}
                </p>
                <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                  Configure your{" "}
                  {activeTab === "email"
                    ? "SMTP, email templates, and sender details"
                    : "platform name, timezone, currency, and locale settings"}
                  .
                </p>
                <Button className="rounded-2xl">
                  <Sliders size={14} className="mr-2" /> Configure Settings
                </Button>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
