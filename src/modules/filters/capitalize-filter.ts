export default (val: string): string => {
  try {
    return val.replace(/\b\w/g, (l) => l.toUpperCase());
  } catch (err) {
    return '';
  }
};
