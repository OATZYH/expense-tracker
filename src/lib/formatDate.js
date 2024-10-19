// lib/formatDate.js

// Converts a DateValue to ISO-8601 string with time for the database
export function convertDatetoDB(dateValue) {
  if (!dateValue || !dateValue.year || !dateValue.month || !dateValue.day) {
    throw new Error("Invalid date value");
  }
  const year = dateValue.year;
  const monthString = dateValue.month.toString().padStart(2, "0");
  const dayString = dateValue.day.toString().padStart(2, "0");

  // Return the date in ISO-8601 format with time
  return `${year}-${monthString}-${dayString}T00:00:00.000Z`;
}

// Converts a date string from the database to a formatted date string
export function convertDBtoDate(dbDate) {
  if (!dbDate) {
    throw new Error("Invalid date string from database");
  }
  const datePart = dbDate.split("T")[0]; // Extract 'YYYY-MM-DD'
  return parseDate(datePart);
}

// Optional: Function to format date for display in 'DD-MM-YYYY' format
export function formatDateForDisplay(dbDate) {
  const date = new Date(dbDate);
  if (isNaN(date)) {
    return 'Invalid Date';
  }
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}
