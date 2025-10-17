"use client";

import React from "react";

const Input = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-left text-sm md:text-base font-medium text-neutral-200">
          {label}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        className={`w-full p-4 rounded-xl bg-neutral-900 border-2 ${
          error ? "border-red-500" : "border-neutral-700"
        } text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition`}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1 block">{error}</span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
