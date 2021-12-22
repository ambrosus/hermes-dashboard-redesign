export const ENABLE_DEBUG_LOG = false;
/* eslint-disable-next-line no-console */
export const debugLog = (...logs) => ENABLE_DEBUG_LOG && console.log(...logs);
