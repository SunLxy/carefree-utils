import { Festival } from './festival';
export interface Solar2LunarReturn {
  // 以下都是返回值
  lunarYear?: number; // 阴历年份数字
  lunarYearCN?: string; // 阴历年份的汉字（举例：一九八九）
  lunarMonthDays?: number; // 该阴历月的天数（取阴历天数）
  fullLunarMonthString?: string; // 阴历月份 + 阴历日期 （举例：正月初一）
  zodiac?: string; // 生肖
  IMonthCn?: string; // 阴历月份汉字，含闰月
  IDayCn?: string; // 阴历天汉字
  solarYear?: number; // 阳历年数字
  solarYearCN?: string; // 阳历年份的汉字（举例：一九八九）
  solarMonthDays?: number; // 该阳历月份的天数
  gzYear?: string; // 干支年（举例2020 庚子年）
  gzMonth?: string; // 干支月 (举例2020年5月 辛巳月)
  gzDay?: string; // 干支日 （举例2020年5月1日 癸酉日）
  isToday?: boolean; // 是否今天
  isLeapMonth?: boolean; // 该月是否闰月
  isLeapYear?: boolean; // 阳历年是否闰年
  nWeek?: number | string; // 星期数字
  ncWeek?: string; // 星期汉字（举例：星期六）
  Term?: string; // 节气名词
  constellation?: string; // 星座汉字
  GzNy?: string; // 该阴历年的干支纳音
  astroEn?: string; // 星座的英文
  lunarMonth?: number; // 阴历月份数字
  lunarDay?: number; // 阴历天数字
  solarMonth?: string | number; // 阳历月数字
  solarDay?: number; // 阳历天数字
  isTerm?: boolean; // 是否节气
  isFestival?: false; // 是否是节日
  festivalName?: string; // 节日中文
  festivalEnName?: string; // 节日英文
}

/** 阳历转农历 */
export type Solar2LunarType = (
  /** 阳历年*/
  Year?: number | string | Date,
  /** 阳历月*/
  Month?: number | string,
  /** 阳历天*/
  Day?: number | string,
) => Solar2LunarReturn;

/** 农历转阳历 */
export type Lunar2SolarType = (
  /** 农历年 */
  Year: number,
  /** 农历月 */
  Month: number,
  /** 农历天 */
  Day: number,
  /** 是否闰月 */
  isLeapM?: boolean,
) => Solar2LunarReturn;

/** 传阳历年 获取整年 节日列表 */
export type GetAllFestivalType = (
  /** 阳历年 */
  year: string | number,
) => Festival[];

/**  传入阳历年,月份，返回当月的阳历月天数 */
export type CountSolarMonthDaysType = (
  /** 阳历年*/
  Year: number,
  /** 阳历月*/
  Month: number,
) => number | string;

/** 传入阳历年获取是否闰年  */
export type IsLeapYearType = (
  /** 阳历年*/
  Year: number,
) => boolean | string;

/** 年份转生肖  */
export type GetAnimalType = (
  /** 阳历年*/
  Year: number,
) => string;

/** 传入农历日期数字返回汉字表示法  */
export type ToChinaDayType = (
  /** 农历日期 */
  d: number,
) => string;

/** 传入农历数字月份返回汉语通俗表示法  */
export type ToChinaMonthType = (
  /** 农历月份 */
  m: number,
) => string | number;

/** 传入公历(!)y年获得该年第n个节气的公历日期  */
export type GetTermType = (
  /** 阳历年份 */
  y: number,
  /** 第几个节气 */
  n: number,
) => number;

/**  传入offset偏移量返回干支  */
export type TotianGandiZhiType = (offset: number) => string;

/**  根据公历月份、公历日期、农历月份、农历日期、节气判断是否为节日，并范围节日对象  */
export type GetFestivalType = (
  /** 阳历月份 */
  solarMonth: number,
  /** 阳历日期 */
  solarDay: number,
  /** 农历月份 */
  lunarMonth: number,
  /** 农历日期 */
  lunarDay: number,
  /** 是否节气  */
  isTerm: boolean,
  /** 节气节日  */
  term: string | undefined,
  /** 农历年 */
  lunarYear: number,
) => Festival;

/**  公历月、日判断所属星座 */
export type SolarGetConstellationEnType = (
  /** 星座编码  */
  Astro: string,
) => string;

/**  公历月、日判断所属星座 */
export type SolarGetConstellationType = (
  /** 阳历月份  */
  m: number,
  /** 阳历天 */
  d: number,
) => string;

/**  农历年份转换为干支纪年 */
export type LunarToTianGandiZhiYearType = (
  /** 阳历年  */
  year: number,
) => string;

/**  返回公历(!)y年m月的天数 */
export type SolarMonthDaysType = (
  /** 阳历年  */
  year: number,
  /** 阳历月份  */
  m: number,
) => string | number;

/**  返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法 */
export type LunarMonthDaysType = (
  /** 阳历年  */
  year: number,
  /** 阳历月份  */
  m: number,
) => number | string;

/**  返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法 */
export type LunarYearDaysType = (
  /** 阳历年  */
  year: number,
) => number | string;

/**  返回农历y年闰月的天数 若该年没有闰月则返回0 */
export type LeapDaysType = (
  /** 阳历年  */
  year: number,
) => string | number;

/**  返回农历y年闰月是哪个月；若y年没有闰月 则返回0 */
export type LeapMonthType = (
  /** 阳历年  */
  year: number,
) => string | number;

/**  数字与中文照表 */
export type GetYearCNType = (
  /** 阳历年  */
  year: number,
) => string | number;
