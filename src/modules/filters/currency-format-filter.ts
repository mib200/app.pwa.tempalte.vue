/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export default (value, { format = 'INR' } = {}) => {
  try {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: format,
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  } catch (err) {
    return '';
  }
};
