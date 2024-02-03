export function convertStringToDate(date: string): Date {
  const [datePart, timePart] = date.split(" ");
  const [day, month, year] = datePart.split("/");

  if (!timePart) return new Date(Number(year), Number(month) - 1, Number(day));

  const [hour, minute, second] = timePart.split(":");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second)
  );
}

export function normalizeString(str: string): string {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}