import React, { useRef } from "react";
import Image from "next/image";

const Avatar = ({ onChange, error }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = React.useState(null);

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
    <div className="border-2 border-neutral-600 border-dashed w-full rounded-2xl p-2 flex flex-col justify-center items-center cursor-pointer hover:border-purple-500 transition bg-white/10 text-neutral-300 gap-2 py-4">
      {imagePreview ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src={imagePreview}
            width={128}
            height={128}
            alt="Avatar Preview"
            className="object-cover rounded-xl"
          />
          <div>
            <button
              type="button"
              className="ml-4 bg-white/10 hover:bg-red-700 text-neutral-300 font-bold py-2 px-6 rounded text-sm md:text-base"
              onClick={handleRemoveImage}
            >
              Remove
            </button>
            <button
              type="button"
              className="ml-4 bg-white/10 hover:bg-blue-700 text-neutral-300 font-bold py-2 px-6 rounded text-sm md:text-base"
              onClick={handleChangeImage}
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center border border-neutral-300 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition">
            <Image
              src="/images/iconupload.svg"
              width={32}
              height={32}
              alt="Upload Avatar"
              className="object-cover cursor-pointer"
              onClick={handleClick}
            />
          </div>
          <span className="text-sm md:text-lg">
            Drag and drop or click to upload
          </span>
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
};

export default Avatar;
