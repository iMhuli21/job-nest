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

export function getVisiblePages(numberOfPages: number, currentPage: number) {
  const visiblePages = [];

  const startPage = Math.max(1, currentPage - Math.floor(maxItems / 2));

  const endPage = Math.min(numberOfPages, startPage + maxItems - 1);

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return visiblePages;
}
