import { useState } from "react";

export function useImages() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;

    setSelectedFiles((prevImages) => [
      ...prevImages,
      ...Array.from(files).reverse(),
    ]);

    const newPreviews = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  }

  function resetImages() {
    setSelectedFiles([]);
    setImagePreviews([]);
  }

  function right() {
    setSelectedFiles((prevFiles) => {
      if (prevFiles.length === 0) return prevFiles;
      const newFiles = [...prevFiles.slice(1), prevFiles[0]];
      return newFiles;
    });

    setImagePreviews((prevPreviews) => {
      if (prevPreviews.length === 0) return prevPreviews;
      const newPreviews = [...prevPreviews.slice(1), prevPreviews[0]];
      return newPreviews;
    });
  }

  function left() {
    setSelectedFiles((prevFiles) => {
      if (prevFiles.length === 0) return prevFiles;
      const newFiles = [
        prevFiles[prevFiles.length - 1],
        ...prevFiles.slice(0, -1),
      ];
      return newFiles;
    });

    setImagePreviews((prevPreviews) => {
      if (prevPreviews.length === 0) return prevPreviews;
      const newPreviews = [
        prevPreviews[prevPreviews.length - 1],
        ...prevPreviews.slice(0, -1),
      ];
      return newPreviews;
    });
  }

  function removeImage(index: number) {
    setSelectedFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, idx) => idx !== index);
      return newFiles;
    });

    setImagePreviews((prevPreviews) => {
      const newPreviews = prevPreviews.filter((_, idx) => idx !== index);
      return newPreviews;
    });
  }

  return {
    images: { selectedFiles, imagePreviews, removeImage },
    handleImageUpload,
    resetImages,
    setImagePreviews,
    setSelectedFiles,
    shift: { right, left },
  };
}
