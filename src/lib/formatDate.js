export default function convertDate(dateObj) {
  const { year, month, day } = dateObj;
  // Ensure month and day are two digits
  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;
  // Return the date in ISO-8601 format with time
  return `${year}-${monthString}-${dayString}T00:00:00.000Z`;
}
