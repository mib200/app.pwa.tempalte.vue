/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import dayJs from 'dayjs';

// interface DateFormatFuncOptionsInterface {
//   minified: boolean;
//   timestampMini: boolean;
// }

export default (val: string, { minified, timestampMini } = {}): string => {
  try {
    if (minified) {
      return dayJs(val).format('DD/MM/YYYY');
    }
    if (timestampMini) {
      return dayJs(val).format('h:mm A');
    }
    return dayJs(val).format('MMM D, YYYY');
  } catch (err) {
    return '';
  }
};
