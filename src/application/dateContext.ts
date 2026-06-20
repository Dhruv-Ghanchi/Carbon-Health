export function getCurrentWeekContext(currentDateISO: string) {
  const date = new Date(currentDateISO);
  // Simple week context: Mon to Sun
  const day = date.getDay();
  const diffToMonday = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diffToMonday));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const prevMonday = new Date(monday);
  prevMonday.setDate(monday.getDate() - 7);
  
  const prevSunday = new Date(sunday);
  prevSunday.setDate(sunday.getDate() - 7);

  return {
    weekStart: monday.toISOString(),
    weekEnd: sunday.toISOString(),
    previousWeekStart: prevMonday.toISOString(),
    previousWeekEnd: prevSunday.toISOString()
  };
}
