import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isValid,
  differenceInDays,
  addDays,
  addMonths,
  subMonths,
} from "date-fns"

export const DATE_FORMAT = "yyyy-MM-dd"
export const DISPLAY_FORMAT = "MMM d, yyyy"
export const MONTH_FORMAT = "MMMM yyyy"

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date
  return format(d, DISPLAY_FORMAT)
}

export function formatDateISO(date: Date): string {
  return format(date, DATE_FORMAT)
}

export function formatMonth(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date
  return format(d, MONTH_FORMAT)
}

export function getMonthRange(date: Date): { start: Date; end: Date } {
  return { start: startOfMonth(date), end: endOfMonth(date) }
}

export function getYearRange(date: Date): { start: Date; end: Date } {
  return { start: startOfYear(date), end: endOfYear(date) }
}

export function isValidDate(date: unknown): boolean {
  if (date instanceof Date) return isValid(date)
  if (typeof date === "string") return isValid(parseISO(date))
  return false
}

export {
  parseISO,
  differenceInDays,
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
}
