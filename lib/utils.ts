import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { maxItems } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyFormatter(value: number) {
  return new Intl.NumberFormat('en-ZA', {
    currency: 'ZAR',
    currencyDisplay: 'symbol',
    style: 'currency',
  }).format(parseFloat(value.toString()));
}

export function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}
