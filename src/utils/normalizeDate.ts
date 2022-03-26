export default function normalizeDate(value: Date | string | number): Date {
  return (value instanceof Date) ? value : new Date(value);
}
