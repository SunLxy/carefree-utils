export const getNumString = (value: number | string) => {
  if (typeof value === 'number' && value < 10) {
    return `0${value}`;
  } else if (typeof value === 'string' && Number(value) < 10) {
    return `0${Number(value)}`;
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

/** ---------------------下面的处理节气的------------------------ ***/

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

/** ------------------------------------------------------------- ***/

/** --------------------------中国农历传统节日----------------------------------- ***/
const traditionalFestival = new Map([
  ['正月初一', '春节'],
  ['正月十五', '元宵节'],
  ['二月初二', '龙抬头'],
  ['三月初三', '上巳节'],
  ['五月初五', '端午节'],
  ['七月初七', '七夕节'],
  ['七月十五', '中元节'],
  ['八月十五', '中秋节'],
  ['九月初九', '重阳节'],
  ['十月十五', '下元节'],
  ['腊月初八', '腊八节'],
  ['腊月二十四', '小年'],
]);
/** --------------------------中国阳历节日----------------------------------- ***/
const festival = new Map([
  ['01月10日', '中国人民警察节'],
  ['03月12日', '植树节'],
  ['05月04日', '青年节'],
  ['05月30日', '全国科技工作者日'],
  ['08月01日', '中国人民解放军建军节'],
  ['08月19日', '中国医师节'],
  ['09月10日', '教师节'],
  ['10月01日', '国庆节'],
  ['11月08日', '记者节'],
]);
/** --------------------------国际节日----------------------------------- ***/
const InternationalFestivals = new Map([
  ['01月01日', '元旦'],
  ['02月14日', '情人节'],
  ['03月08日', '妇女节'],
  ['05月01日', '劳动节'],
  ['05月12日', '护士节'],
  ['06月01日', '儿童节'],
]);

/** --------------------------------------------------------------- ***/

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
  year: string | number | undefined;
  lunarYear: string | undefined;
  lunarTg: string | undefined;
  lunarZodiac: string | undefined;
  lunarMonth: string | undefined;
  lunarMonthNickname: string | undefined;
  lunarDate: string | undefined;
  date: string | number | undefined;
  week: string | undefined;
  month: string | number | undefined;
  solarTerms: string | undefined;
  traditionalFestival: string | undefined;
  festival: string | undefined;
  InternationalFestivals: string | undefined;
}

const getObjLunarDate = (
  year: number | string,
  m: string | number,
  d: string | number,
) => {
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
    yearLunar,
    monthLunar,
    dateLunar,
    weekLunar,
    lunarYear,
    tg,
    dz,
    zodiac,
    monthNickname,
  };
};

const addDays = (dates: string, days: number) => {
  let currentDate = new Date(dates);
  currentDate.setDate(currentDate.getDate() + days);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  const h = currentDate.getHours();
  const m = currentDate.getMinutes();
  const s = currentDate.getSeconds();
  return { year, month, date, h, m, s };
};

// 阳历转农历日期
export const solarTolunar = (
  year: number | string,
  month: string | number,
  date: string | number,
  terms: GetMonthTermReturn,
) => {
  const m = getNumString(month);
  const d = getNumString(date);
  const {
    monthLunar,
    dateLunar,
    weekLunar,
    tg,
    zodiac,
    monthNickname,
    lunarYear,
  } = getObjLunarDate(year, m, d);
  const { index1, index2, solarTerm1, solarTerm2 } = terms;
  let solarTerms = undefined;
  if (index1 === Number(d) - 1) {
    solarTerms = solarTerm1;
  } else if (index2 === Number(d) - 1) {
    solarTerms = solarTerm2;
  }
  // 找除夕
  // 判断农历29号30号
  let traditionalFestivalStr = traditionalFestival.get(
    `${monthLunar}月${dateLunar}`,
  );
  if (`${monthLunar}月${dateLunar}` === '腊月三十') {
    traditionalFestivalStr = '除夕';
  } else if (`${monthLunar}月${dateLunar}` === '腊月廿九') {
    // 判断是否存在30
    const { year: y, month: mo, date } = addDays(`${year}-${m}-${d}`, 1);
    const { monthLunar, dateLunar } = getObjLunarDate(y, mo, date);
    if (`${monthLunar}月${dateLunar}` !== '腊月三十') {
      traditionalFestivalStr = '除夕';
    }
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
    date: d,
    // 星期几
    week: `星期${weekLunar}`,
    // 月份
    month: getNumString(month),
    // 节气
    solarTerms,
    // 农历节日
    traditionalFestival: traditionalFestivalStr,
    // 阳历节日
    festival: festival.get(`${getNumString(month)}月${d}日`),
    // 世界节日
    InternationalFestivals: InternationalFestivals.get(
      `${getNumString(month)}月${d}日`,
    ),
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
