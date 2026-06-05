import React, { useState } from "react";
import { Card, Button, Input } from "@/components/ui";
import {
  Plane,
  MapPin,
  CreditCard,
  Users,
  DollarSign,
  ArrowRight,
  Check,
} from "lucide-react";
import { airports } from "@/mock";
import { motion, AnimatePresence } from "motion/react";

export default function CreateOffer() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    airport: "",
    terminal: "",
    lounge: "",
    type: "",
    entries: 1,
    price: "",
  });

  const steps = [
    { id: 1, title: "Location", icon: <MapPin size={20} /> },
    { id: 2, title: "Lounge Info", icon: <Plane size={20} /> },
    { id: 3, title: "Access Type", icon: <CreditCard size={20} /> },
    { id: 4, title: "Pricing", icon: <DollarSign size={20} /> },
  ];

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Lounge Offer
        </h1>
        <p className="text-gray-500">
          Monetize your unused lounge access in minutes.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${step >= s.id ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-white border border-gray-200 text-gray-400"}`}
            >
              {step > s.id ? <Check size={18} /> : s.icon}
            </div>
            <span
              className={`text-xs font-bold mt-2 ${step >= s.id ? "text-blue-600" : "text-gray-400"}`}
            >
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-blue-900/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {step === 1 && (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900">Where are you?</h3>
                    <p className="text-sm text-blue-700">
                      Select the airport and terminal for your offer.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Airport
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 ring-blue-500/10 outline-none transition-all"
                      value={formData.airport}
                      onChange={(e) =>
                        setFormData({ ...formData, airport: e.target.value })
                      }
                    >
                      <option value="">Select Airport</option>
                      {airports.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} ({a.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Terminal
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 ring-blue-500/10 outline-none transition-all"
                      value={formData.terminal}
                      onChange={(e) =>
                        setFormData({ ...formData, terminal: e.target.value })
                      }
                    >
                      <option value="">Select Terminal</option>
                      <option value="T1">Terminal 1</option>
                      <option value="T2">Terminal 2</option>
                      <option value="T3">Terminal 3</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <Input
                  label="Lounge Name"
                  placeholder="e.g. Marhaba Lounge, Emirates First Class..."
                  value={formData.lounge}
                  onChange={(e) =>
                    setFormData({ ...formData, lounge: e.target.value })
                  }
                />
                <div className="p-4 bg-gray-50 rounded-2xl flex gap-3 items-center">
                  <Plane className="text-blue-600" />
                  <p className="text-sm font-medium text-gray-600">
                    Ensure the lounge name matches exactly as per your access
                    card.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "pp", name: "Priority Pass", icon: <CreditCard /> },
                  { id: "cc", name: "Credit Card", icon: <CreditCard /> },
                  { id: "al", name: "Airline Lounge", icon: <Plane /> },
                  { id: "lk", name: "LoungeKey", icon: <CreditCard /> },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setFormData({ ...formData, type: t.name })}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${formData.type === t.name ? "border-blue-600 bg-blue-50" : "border-gray-100 bg-gray-50 hover:border-blue-200"}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${formData.type === t.name ? "bg-blue-600 text-white" : "bg-white text-gray-400"}`}
                    >
                      {t.icon}
                    </div>
                    <p
                      className={`font-bold ${formData.type === t.name ? "text-blue-900" : "text-gray-700"}`}
                    >
                      {t.name}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <Input
                    label="Price per Guest ($)"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                  <Input
                    label="Available Entries"
                    type="number"
                    value={formData.entries}
                    onChange={(e) =>
                      setFormData({ ...formData, entries: e.target.value })
                    }
                  />
                </div>
                <div className="p-6 bg-blue-600 rounded-[2rem] text-white">
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-medium opacity-80">You'll earn</p>
                    <p className="text-3xl font-black">
                      ${(formData.price * 0.95 || 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="h-px bg-white/20 mb-4" />
                  <p className="text-xs opacity-60">
                    LoungeLink platform fee is 5%. Payouts are instant after the
                    seeker enters the lounge.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between">
          <Button
            variant="secondary"
            className="rounded-xl px-8"
            onClick={prevStep}
            disabled={step === 1}
          >
            Back
          </Button>
          <Button
            className="rounded-xl px-8 font-bold"
            onClick={
              step === 4
                ? () => (window.location.href = "/app/marketplace")
                : nextStep
            }
          >
            {step === 4 ? "Publish Offer" : "Continue"}
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
