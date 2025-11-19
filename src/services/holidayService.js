export function addHoliday(holidaysArray, holidayData) {
  const newHoliday = { ...holidayData, status: "requested" };
  return [...holidaysArray, newHoliday];
}

export function calculateAvailableDays(totalDays, holidays) {
  if (!Array.isArray(holidays)) {
    return totalDays;
  }

  const usedDays = holidays
    .filter((holiday) => holiday.status === "accepted")
    .reduce((sum, holiday) => {
      const days =
        typeof holiday.daysUsed === "string"
          ? parseInt(holiday.daysUsed, 10)
          : holiday.daysUsed || 0;
      return sum + days;
    }, 0);

  return Math.max(0, totalDays - usedDays);
}

export function updateAvailableDays(totalDays, holidays) {
  return calculateAvailableDays(totalDays, holidays);
}
