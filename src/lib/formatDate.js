export function convertDatetoDB(dateObj) {
  const { year, month, day } = dateObj;
  // Ensure month and day are two digits
  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;
  // Return the date in ISO-8601 format with time
  return `${year}-${monthString}-${dayString}T00:00:00.000Z`;
}

export function convertDBtoDate(dbDate) {
  const date = new Date(dbDate);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // Months are zero-indexed
  const day = date.getUTCDate();

  // Ensure month and day are two digits
  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;

  return { year, month: monthString, day: dayString };
}
