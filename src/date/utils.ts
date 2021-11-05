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

// --------------------- 下面的处理节气的

export interface GetMonthTermReturn {
  index1?: number;
  index2?: number;
  solarTerm1?: string;
  solarTerm2?: string;
}

const solarTerm = new Array(
  '小寒',
  '大寒',
  '立春',
  '雨水',
  '惊蛰',
  '春分',
  '清明',
  '谷雨',
  '立夏',
  '小满',
  '芒种',
  '夏至',
  '小暑',
  '大暑',
  '立秋',
  '处暑',
  '白露',
  '秋分',
  '寒露',
  '霜降',
  '立冬',
  '小雪',
  '大雪',
  '冬至',
);
const sTermInfo = new Array(
  0,
  21208,
  42467,
  63836,
  85337,
  107014,
  128867,
  150921,
  173149,
  195551,
  218072,
  240693,
  263343,
  285989,
  308563,
  331033,
  353350,
  375494,
  397447,
  419210,
  440795,
  462224,
  483532,
  504758,
);

//返回某年的第n个节气为几日(从0小寒起算)
const sTerm = (y: number, n: number) => {
  var offDate = new Date(
    31556925974.7 * (y - 1900) +
      sTermInfo[n] * 60000 +
      Date.UTC(1900, 0, 6, 2, 5),
  );
  return offDate.getUTCDate();
};

//返回某年某月的节气数据
export const getMonthTerm = (year: number, m: number): GetMonthTermReturn => {
  const tmp1 = sTerm(year, m * 2) - 1;
  const tmp2 = sTerm(year, m * 2 + 1) - 1;
  const solarTerms1 = solarTerm[m * 2];
  const solarTerms2 = solarTerm[m * 2 + 1];
  return {
    index1: tmp1,
    index2: tmp2,
    solarTerm1: solarTerms1,
    solarTerm2: solarTerms2,
  };
};

// ------------------------------
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
  year: string | number;
  lunarYear: string;
  lunarTg: string;
  lunarZodiac: string;
  lunarMonth: string;
  lunarMonthNickname: string;
  lunarDate: string;
  date: string | number;
  week: string;
  month: string | number;
  solarTerms: string;
}

// 阳历转农历日期
export const solarTolunar = (
  year: number | string,
  month: string | number,
  date: string | number,
  terms: GetMonthTermReturn,
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
  const { index1, index2, solarTerm1, solarTerm2 } = terms;
  let solarTerms = undefined;
  if (index1 === Number(d) - 1) {
    solarTerms = solarTerm1;
  } else if (index2 === Number(d) - 1) {
    solarTerms = solarTerm2;
  }
  return {
    year: year,
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
    // 月份
    month: getNumString(month),
    // 节气
    solarTerms,
  };
};

// 日期转农历对象
export const solarTolunarList = (
  year: string | number,
  month: number | string,
  list: (string | number)[],
  terms: GetMonthTermReturn,
) => {
  return list.map((key) => {
    return solarTolunar(year, month, key, terms);
  });
};
