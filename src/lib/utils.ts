import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFormattedDate(offset: number = 0): string {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return date.toLocaleDateString('sv')
}
