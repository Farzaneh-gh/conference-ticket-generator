"use client";

import React, { useRef, useState } from "react";

export default function Avatar({ onChange, error }) {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleClick = () => {
    fileInputRef?.current.click();
  };

  const handleSaveImage = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const previewUrl = URL.createObjectURL(imageFile);
      setImagePreview(previewUrl);

      // Convert image to base64 for email
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Pass the file, preview, and base64 to React Hook Form
        if (onChange) {
          onChange({
            file: imageFile,
            preview: previewUrl,
            base64: base64String,
          });
        }
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleChangeImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Clear the value in React Hook Form
    if (onChange) {
      onChange(null);
    }
  };

  return (
    <div className="border-2 border-neutral-600 border-dashed w-full rounded-2xl p-4 flex flex-col justify-center items-center cursor-pointer hover:border-orange-500 transition bg-neutral-900/50 text-neutral-300 gap-4 py-8">
      {imagePreview ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src={imagePreview}
            alt="Avatar Preview"
            className="w-32 h-32 object-cover rounded-xl border-2 border-neutral-700"
          />
          <div className="flex gap-3">
            <button
              type="button"
              className="bg-neutral-800 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition"
              onClick={handleRemoveImage}
            >
              Remove
            </button>
            <button
              type="button"
              className="bg-neutral-800 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition"
              onClick={handleChangeImage}
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="flex items-center justify-center border-2 border-neutral-700 bg-neutral-800 p-6 rounded-xl hover:bg-neutral-700 transition cursor-pointer"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-base md:text-lg font-medium">
              Click to upload avatar
            </p>
            <p className="text-sm text-neutral-500 mt-1">PNG, JPG up to 10MB</p>
          </div>
        </>
      )}
      {error && (
        <div className="text-left w-full px-2">
          <span className="text-red-500 text-sm">{error}</span>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleSaveImage}
      />
    </div>
  );
}
