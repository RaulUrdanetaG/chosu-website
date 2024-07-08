import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(word: string): string {
  if (word.length === 0) {
    return word;
  }

  const lowerCaseWord = word.toLowerCase();
  return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
}

export async function uploadImages(selectedFiles: File[]) {
  let imageLinks;

  if (selectedFiles.length > 0) {
    const imgData = new FormData();
    selectedFiles.forEach((image) => {
      if (image !== null) imgData.append("file", image);
    });

    imageLinks = await axios.post("/api/googleCloud/images", imgData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  return imageLinks;
}

export function formatPrice(price: number) {
  return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "$";
}
