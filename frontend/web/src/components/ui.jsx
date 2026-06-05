import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20",
    secondary:
      "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm",
    outline:
      "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    dark: "bg-gray-900 text-white hover:bg-black shadow-lg shadow-black/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg font-semibold",
  };

  return (
    <button
      className={twMerge(
        "inline-flex items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ className, children, hoverable = true }) {
  return (
    <div
      className={twMerge(
        "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transition-all duration-300",
        hoverable &&
          "hover:shadow-xl hover:-translate-y-1 hover:border-blue-100",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Badge({ children, variant = "blue", className }) {
  const variants = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    green: "bg-green-50 text-green-700 border-green-100",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-100",
    red: "bg-red-50 text-red-700 border-red-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
    gray: "bg-gray-50 text-gray-700 border-gray-100",
  };

  return (
    <span
      className={twMerge(
        "px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Input({ label, error, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700 ml-1">
          {label}
        </label>
      )}
      <input
        className={twMerge(
          "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50",
          error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 ml-1 mt-1">{error}</p>}
    </div>
  );
}
