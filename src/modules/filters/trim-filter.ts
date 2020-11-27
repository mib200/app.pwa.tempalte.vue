export default (val: string, length: number): string => {
  try {
    if (val.length > length) return `${val.slice(0, length || 20).trim()}...`;
    return val;
  } catch (err) {
    return val;
  }
};
