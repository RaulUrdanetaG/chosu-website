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
