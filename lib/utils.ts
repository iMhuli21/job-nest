import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Responses } from './constants';
import { Status } from '@prisma/client';

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

const responseKeys = ['answer', 'question'];

function isValidResponseObj(value: unknown): value is Responses {
  return (
    value !== null &&
    typeof value === 'object' &&
    responseKeys.every((key) => Object.hasOwn(value, key))
  );
}

export function isValidResponseArr(value: unknown): value is Responses[] {
  return (
    value !== null &&
    Array.isArray(value) &&
    value.every((item) => isValidResponseObj(item))
  );
}

export function isValidJobStatus(value: string): boolean {
  return Object.keys(Status).includes(value as Status);
}
