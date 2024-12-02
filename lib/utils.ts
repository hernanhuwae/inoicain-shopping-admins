import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatted =new Intl.NumberFormat("id-ID", {
  style:'currency',
  currency:'IDR'
})