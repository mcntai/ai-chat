const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const isLeapYear = (year: number) =>
  ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);

const getDaysInMonth = (year: number, month: number) =>
  [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];

const addSeconds = (date: number | string | Date, seconds: number) =>
  new Date(new Date(date).getTime() + (seconds * SECOND));
const addMinutes = (date: number | string | Date, minutes: number) =>
  new Date(new Date(date).getTime() + (minutes * MINUTE));
const addHours = (date: number | string | Date, hours: number) =>
  new Date(new Date(date).getTime() + (hours * HOUR));
const addDays = (date: number | string | Date, days: number) => new Date(new Date(date).getTime() + (days * DAY));

const addMonths = (date: number | string | Date, months: number) => {
  date = new Date(date);

  const n = date.getDate();

  date.setDate(1);
  date.setMonth(date.getMonth() + months);
  date.setDate(Math.min(n, getDaysInMonth(date.getFullYear(), date.getMonth())));

  return date;
};

const trimTime = (date: number | string | Date) => new Date(new Date(date).setHours(0, 0, 0, 0));

export {
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  trimTime,
};