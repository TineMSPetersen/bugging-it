import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateString(dateString: string) {
  // Create a new Date object from the input string
  const date = new Date(dateString);

  // Define month names
  const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
  ];

  // Get the components of the date
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();

  // Get the components of the time
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to always have two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Construct the formatted date string
  const formattedDate = `${month} ${day}, ${year} - ${hours}:${formattedMinutes} ${ampm}`;

  return formattedDate;
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};