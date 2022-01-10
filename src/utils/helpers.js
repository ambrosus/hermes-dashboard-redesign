import {
  getTimestamp,
  getTimestampSubDays,
  getTimestampSubHours,
  getTimestampSubMonths,
} from './datetime';
export const formattingGroup = (type) => {
  switch (type) {
    case '24h':
      return 'HH';
    case '7d':
      return 'DD-MM';
    case '28d':
      return 'DD-MM';
    case '12m':
      return 'MMMM';
    default:
      return 'Y-MM-DD-HH';
  }
};
export const getGroup = (type) => {
  switch (type) {
    case '24h':
      return 'hour';
    case '12m':
      return 'month';
    default:
      return 'day';
  }
};
export const getStartEnd = (type) => {
  let start = 0;
  let end = 0;
  switch (type) {
    case '24h':
      start = getTimestampSubHours(24);
      break;

    case '7d':
      start = getTimestampSubDays(7);
      break;

    case '28d':
      start = getTimestampSubDays(28);
      break;

    case '12m':
      start = getTimestampSubMonths(12);
      break;
    default:
      start = getTimestampSubDays(7);
  }

  end = getTimestamp();

  return [start, end];
};
