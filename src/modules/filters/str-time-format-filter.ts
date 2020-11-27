import dayJs from 'dayjs';

export default (strTime: string): string => {
  try {
    if (strTime) {
      const time = strTime.split(':');
      const hh = parseInt(time[0], 10);
      const mm = parseInt(time[1], 10);
      if (!(Number.isNaN(hh) || Number.isNaN(mm))) {
        const date = new Date();
        date.setHours(hh, 10);
        date.setMinutes(mm, 10);
        return dayJs(date).format('hh:mm a');
      }
      return '';
    }
    return '';
  } catch (err) {
    return '';
  }
};
