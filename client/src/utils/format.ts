import { DateTime } from 'luxon';

export function formatDateTime(date: Date) {
  const dateTime = DateTime.fromJSDate(date);

  return dateTime.toLocaleString(DateTime.DATETIME_MED);
}
