export default (val: string): string => {
  try {
    return val.replace(/(-\w)/g, (m) => m[1].toUpperCase());
  } catch (err) {
    return '';
  }
};
