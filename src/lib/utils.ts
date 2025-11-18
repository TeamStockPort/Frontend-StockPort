import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 숫자를 천 단위 구분자(쉼표)가 포함된 문자열로 포맷팅
 * @param value - 포맷팅할 숫자
 * @returns 포맷팅된 문자열 (예: 1000 -> "1,000")
 */
export function formatNumber(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return "";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);
  return num.toLocaleString("ko-KR");
}
