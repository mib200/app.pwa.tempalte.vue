export default (val: string): string => {
  try {
    return val.toLowerCase();
  } catch (err) {
    return '';
  }
};
