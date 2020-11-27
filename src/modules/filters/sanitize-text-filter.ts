export default (val: string): string => {
  try {
    const div = document.createElement('div');
    div.innerHTML = val;
    const text = div.textContent || div.innerText || '';
    return text.replace(/<[^>]+>/g, '');
  } catch (err) {
    return '';
  }
};
