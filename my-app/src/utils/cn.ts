// utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Поєднує довільну кількість класів (масив, обʼєкт, рядок),
 * прибирає фальш‑значення та вирішує конфлікти Tailwind.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}