
// Format a date string or Date object to a readable time (e.g., 2:30 PM)
export function formatMessageTime(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12: false, });
}
