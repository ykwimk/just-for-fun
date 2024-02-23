import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setStorage = ({ key, value }: { key: string; value: any }) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = ({ key }: { key: string }) => {
  const getItem = sessionStorage.getItem(key) as string;

  return JSON.parse(getItem);
};
