/**
 * Reusable Date Formatter component
 * @param {string} dateString - Date string to format
 * @param {string} format - Format type: "short" (default) or "long"
 */
function DateFormatter({ dateString, format = "short" }) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return "Invalid Date";

  const options =
    format === "long"
      ? {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      : {
          year: "numeric",
          month: "short",
          day: "numeric",
        };

  return date.toLocaleDateString("en-US", options);
}

export default DateFormatter;

