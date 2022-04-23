import dayjs from 'dayjs';
const text = {
    morning_1: '早上: %s',
    afternoon_1: '下午: %s',
    yesterday_1: '昨天'
}
/**
 * @param time: 单位s
 */
export default function format(time: number) {
  const varTime = time * 1000; //
  const currentYearUnix = new Date(dayjs(new Date()).format('YYYY')).getTime(); //当年时间戳
  const current0TimeUnix = new Date().setHours(0, 0, 0, 0); //当天零点时间戳
  const current12TimeUnix = new Date().setHours(12, 0, 0, 0); //当天12点时间戳
  const d1Unix = 24 * 60 * 60 * 1000;
  const isToday = varTime >= current0TimeUnix;
  const isYesterday = varTime < current0TimeUnix && varTime >= current0TimeUnix - d1Unix; //是否是昨天
  const isBefore12 = isToday && varTime - current12TimeUnix < 0; //如果是当天 是否是上午
  const islastYear = varTime < current0TimeUnix - d1Unix && varTime >= currentYearUnix; //一年内 & 前天之前

  if (isToday) {
    if (isBefore12) {
      const date = dayjs(varTime).format('HH:mm');
      return text['morning_1'].replace('%s', date);
    } else {
      let date = dayjs(varTime - 12 * 60 * 1000 * 60).format('HH:mm');
      // 如果是中午 12:30 要展示 12:30PM ，如果 -12h 会变成 00:30PM，所以需要判断下
      const dateSplit = date.split(':');
      if (dateSplit[0] === '00') {
        dateSplit[0] = '12';
      }
      date = dateSplit.join(':');
      return text['afternoon_1']?.replace('%s', date);
    }
  } else if (isYesterday) {
    return text['yesterday_1'];
  } else if (islastYear) {
    return dayjs(varTime).format('MM-DD');
  } else {
    return dayjs(varTime).format('YYYY-MM-DD');
  }
}