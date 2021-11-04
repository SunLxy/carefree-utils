export const getNumString = (value: number | string) => {
  if (typeof value === 'number' && value < 10) {
    return `0${value}`;
  } else if (typeof value === 'string' && Number(value) < 10) {
    return `0${value}`;
  }
  return value;
};

export const getRangeNumber = (start: number, end: number) => {
  const lg = end - start;
  let arr: (number | string)[] = [];
  for (let i = 0; i < lg; i++) {
    let ints: string | number = i + start;
    if (ints < 10) {
      ints = getNumString(ints);
    }
    arr.push(ints);
  }
  return arr;
};

// new Intl.DateTimeFormat('zh-u-ca-chinese', { dateStyle: 'medium' }).format(new Date("2021-11-01"));

// const tgString = "甲乙丙丁戊己庚辛壬癸";
// 一一对应
const dzString = '子丑寅卯辰巳午未申酉戌亥';
const ZodiacStr = '鼠牛虎兔龙蛇马羊猴鸡狗猪';
const monString = '正二三四五六七八九十冬腊';
const numString = [
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
  '十一',
  '十二',
];

export interface solarTolunarReturn {
  lunarTg: string;
  lunarZodiac: string;
  lunarMonth: string;
  lunarMonthNickname: string;
  lunarDate: string;
  date: string | number;
  week: string;
}

// 阳历转农历日期
export const solarTolunar = (
  year: number | string,
  month: string | number,
  date: string | number,
) => {
  const m = getNumString(month);
  const d = getNumString(date);
  const newDate = new Date(`${year}-${m}-${d}`);
  const str = new Intl.DateTimeFormat('zh-u-ca-chinese', {
    dateStyle: 'full',
  }).format(newDate);
  const [yearLunar, monthLunar, dateLunar, weekLunar] = str.split(/年|月|星期/);
  const lunarYear = yearLunar.slice(4, 6);
  const [tg, dz] = lunarYear.split('');
  const findIndex = dzString.indexOf(dz);
  const zodiac = ZodiacStr.slice(findIndex, findIndex + 1);
  const monthIndex = numString.indexOf(monthLunar);
  const monthNickname = monString.slice(monthIndex, monthIndex + 1);
  return {
    year: year,
    //
    lunarYear: lunarYear,
    lunarTg: tg,
    // 年 属相
    lunarZodiac: zodiac,
    // 农历月份
    lunarMonth: monthLunar,
    // 农历月份叫法
    lunarMonthNickname: monthNickname,
    // 农历 几号
    lunarDate: dateLunar,
    // 一个月中那天
    date: date,
    // 星期几
    week: `星期${weekLunar}`,
  };
};

// 日期转农历对象
export const solarTolunarList = (
  year: string | number,
  month: number | string,
  list: (string | number)[],
) => {
  return list.map((key) => {
    return solarTolunar(year, month, key);
  });
};
