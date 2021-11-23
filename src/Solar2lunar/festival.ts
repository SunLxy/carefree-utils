export interface Festival {
  isLunar?: boolean; // 是农历节日还是公历节日
  solarMonth?: number | null; // 公历月，如果是农历节日，则为null
  solarDay?: number | null; // 公历日，如果是农历节日，则为null
  lunarMonth?: number | null; // 农历月，如果是公历节日，则为null
  lunarDay?: number | null; // 农历日，如果是公历节日，则为null
  festivalName?: string; // 节日名称，中文
  festivalEnName?: string; // 节日名称, 英文
  isTerm?: boolean; // 是否节气
  term?: string; // 节气名词
  newYearEve?: boolean; // 是否除夕
  monthDays?: number; // 当年腊月的农历天数
  isLunarFestival?: boolean; // 是农历节日还是公历节日，true为公历节日
  isFestival?: boolean; // 是否是节日
  isDoubleFestival?: boolean; // 是否双节同庆
  doubleFestivalName?: string; // 双节名称
  secondFestivalName?: string; // 第二个节日名称
  secondFestivalEnName?: string; // 第二个节日英文名称
}

/** 节日列表 **/
export const FestivalArray: Festival[] = [
  /** 农历节日
   *
   * 1.春节，正月初一
   * 2.元宵节，正月十五
   * 3.二月二/龙抬头/社日节，二月初二
   * 4.清明节，清明节气
   * 5.端午节，五月初五
   * 6.七夕节，七月初七
   * 7.中元节/盂兰盆节，七月十五
   * 8.中秋节，八月十五
   * 9.重阳节，九月初九
   * 10.冬至节，冬至节气
   * 11.除夕节，春节的前一天，腊月二十九或腊月三十
   *
   */

  // 春节，农历正月初一
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 1,
    lunarDay: 1,
    festivalName: '春节',
    festivalEnName: 'Spring Festival',
  },

  // 元宵节，农历正月十五
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 1,
    lunarDay: 15,
    festivalName: '元宵节',
    festivalEnName: 'Spring Festival',
  },

  // 二月二，也叫社日节，龙抬头，农历正月十五
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 2,
    lunarDay: 2,
    festivalName: '二月二/龙抬头/社日节',
    festivalEnName: 'Longtaitou Festival',
  },

  // 清明节，清明节节气
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '清明节',
    festivalEnName: 'Qingming Festival',
    isTerm: true,
    term: '清明',
  },

  // 端午节，农历五月初五
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 5,
    lunarDay: 5,
    festivalName: '端午节',
    festivalEnName: 'Dragon Boat Festival',
  },

  // 七夕节，农历七月初七
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 7,
    lunarDay: 7,
    festivalName: '七夕节',
    festivalEnName: "Chinese Valentine's Day",
  },

  // 中元节，农历七月十五，在我国古代和日本也叫做盂兰盆节
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 7,
    lunarDay: 15,
    festivalName: '中元节/盂兰盆节',
    festivalEnName: 'Zhongyuan Festival',
  },

  // 中秋节，农历八月十五
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 8,
    lunarDay: 15,
    festivalName: '中秋节',
    festivalEnName: 'Mid-Autumn Festival',
  },

  // 重阳节，农历九月初九
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 9,
    lunarDay: 9,
    festivalName: '重阳节',
    festivalEnName: 'Double Ninth Festival',
  },

  // 冬至节，冬至节气
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '冬至节',
    festivalEnName: 'Winter solstice',
    isTerm: true,
    term: '冬至',
  },

  // 除夕，春节的前一天，农历腊月二十九, 且当年腊月月为29天
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 12,
    lunarDay: 29,
    festivalName: '除夕',
    festivalEnName: "New year's Eve",
    newYearEve: true,
    monthDays: 29, // 表示农历当月是29天
  },

  // 除夕，春节的前一天，农历腊月三十，当年腊月为30天
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 12,
    lunarDay: 30,
    festivalName: '除夕',
    festivalEnName: "New year's Eve",
    newYearEve: true,
    monthDays: 30, // 表示农历当月是30天
  },

  /** 公历节日
   *
   * 1.元旦，1月1日
   * 2.情人节，2月14日
   * 3.妇女节，3月8日
   * 4.植树节，3月12日
   * 5.愚人节，4月1日
   * 6.劳动节，5月1日
   * 7.青年节，5月4日
   * 8.儿童节，6月1日
   * 9.建党节，7月1日
   * 10.建军节，8月1日
   * 11.国庆节，10月1日
   * 12.光棍节，11月11日
   * 13.平安夜，12月24日
   * 14.圣诞节，12月25日
   *
   */

  // 元旦节，公历1月1日
  {
    isLunar: false,
    solarMonth: 1,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '元旦',
    festivalEnName: 'New year’s Day',
  },

  // 情人节，公历2月14日
  {
    isLunar: false,
    solarMonth: 2,
    solarDay: 14,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '情人节',
    festivalEnName: "Valentine 's Day",
  },

  // 妇女节，公历3月8日
  {
    isLunar: false,
    solarMonth: 3,
    solarDay: 8,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '妇女节',
    festivalEnName: "Women's Day",
  },

  // 植树节，公历3月12日
  {
    isLunar: false,
    solarMonth: 3,
    solarDay: 12,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '植树节',
    festivalEnName: 'Arbor Day',
  },
  // 愚人节，公历4月1日
  {
    isLunar: false,
    solarMonth: 4,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '愚人节',
    festivalEnName: 'April Fools Day',
  },

  // 劳动节，公历5月1日
  {
    isLunar: false,
    solarMonth: 5,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '劳动节',
    festivalEnName: 'International Labour Day',
  },

  // 青年节，公历5月4日
  {
    isLunar: false,
    solarMonth: 5,
    solarDay: 4,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '青年节',
    festivalEnName: 'Youth Day',
  },

  // 儿童节，公历6月1日
  {
    isLunar: false,
    solarMonth: 6,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '儿童节',
    festivalEnName: "Children's Day",
  },

  // 建党节，公历7月1日
  {
    isLunar: false,
    solarMonth: 7,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '建党节',
    festivalEnName: 'CPC Founding Day',
  },

  // 建军节，公历8月1日
  {
    isLunar: false,
    solarMonth: 8,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '建军节',
    festivalEnName: 'PLA Founding Day',
  },

  // 日本投降纪念日，公历9月3日
  {
    isLunar: false,
    solarMonth: 9,
    solarDay: 3,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '日本投降纪念日',
    festivalEnName: 'Japanese surrender anniversary',
  },

  // 国庆节，公历10月1日
  {
    isLunar: false,
    solarMonth: 10,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '国庆节',
    festivalEnName: 'National Day',
  },

  // 光棍节，公历11月11日
  {
    isLunar: false,
    solarMonth: 11,
    solarDay: 11,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '光棍节',
    festivalEnName: 'National Day',
  },

  // 世界艾滋病日，公历12月1日
  {
    isLunar: false,
    solarMonth: 12,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '世界艾滋病日',
    festivalEnName: 'AIDS Day',
  },

  // 平安夜，公历12月24日
  {
    isLunar: false,
    solarMonth: 12,
    solarDay: 24,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '平安夜',
    festivalEnName: 'Christmas Eve',
  },

  // 圣诞节，公历12月25日
  {
    isLunar: false,
    solarMonth: 12,
    solarDay: 25,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '圣诞节',
    festivalEnName: 'Christmas',
  },
];

/**
 * 农历1900-2100的闰大小信息表
 * @Array Of Property
 * @return Hex
 */
export const lunarInfo = [
  0x04bd8,
  0x04ae0,
  0x0a570,
  0x054d5,
  0x0d260,
  0x0d950,
  0x16554,
  0x056a0,
  0x09ad0,
  0x055d2, //1900-1909
  0x04ae0,
  0x0a5b6,
  0x0a4d0,
  0x0d250,
  0x1d255,
  0x0b540,
  0x0d6a0,
  0x0ada2,
  0x095b0,
  0x14977, //1910-1919
  0x04970,
  0x0a4b0,
  0x0b4b5,
  0x06a50,
  0x06d40,
  0x1ab54,
  0x02b60,
  0x09570,
  0x052f2,
  0x04970, //1920-1929
  0x06566,
  0x0d4a0,
  0x0ea50,
  0x06e95,
  0x05ad0,
  0x02b60,
  0x186e3,
  0x092e0,
  0x1c8d7,
  0x0c950, //1930-1939
  0x0d4a0,
  0x1d8a6,
  0x0b550,
  0x056a0,
  0x1a5b4,
  0x025d0,
  0x092d0,
  0x0d2b2,
  0x0a950,
  0x0b557, //1940-1949
  0x06ca0,
  0x0b550,
  0x15355,
  0x04da0,
  0x0a5b0,
  0x14573,
  0x052b0,
  0x0a9a8,
  0x0e950,
  0x06aa0, //1950-1959
  0x0aea6,
  0x0ab50,
  0x04b60,
  0x0aae4,
  0x0a570,
  0x05260,
  0x0f263,
  0x0d950,
  0x05b57,
  0x056a0, //1960-1969
  0x096d0,
  0x04dd5,
  0x04ad0,
  0x0a4d0,
  0x0d4d4,
  0x0d250,
  0x0d558,
  0x0b540,
  0x0b6a0,
  0x195a6, //1970-1979
  0x095b0,
  0x049b0,
  0x0a974,
  0x0a4b0,
  0x0b27a,
  0x06a50,
  0x06d40,
  0x0af46,
  0x0ab60,
  0x09570, //1980-1989
  0x04af5,
  0x04970,
  0x064b0,
  0x074a3,
  0x0ea50,
  0x06b58,
  0x055c0,
  0x0ab60,
  0x096d5,
  0x092e0, //1990-1999
  0x0c960,
  0x0d954,
  0x0d4a0,
  0x0da50,
  0x07552,
  0x056a0,
  0x0abb7,
  0x025d0,
  0x092d0,
  0x0cab5, //2000-2009
  0x0a950,
  0x0b4a0,
  0x0baa4,
  0x0ad50,
  0x055d9,
  0x04ba0,
  0x0a5b0,
  0x15176,
  0x052b0,
  0x0a930, //2010-2019
  0x07954,
  0x06aa0,
  0x0ad50,
  0x05b52,
  0x04b60,
  0x0a6e6,
  0x0a4e0,
  0x0d260,
  0x0ea65,
  0x0d530, //2020-2029
  0x05aa0,
  0x076a3,
  0x096d0,
  0x04afb,
  0x04ad0,
  0x0a4d0,
  0x1d0b6,
  0x0d250,
  0x0d520,
  0x0dd45, //2030-2039
  0x0b5a0,
  0x056d0,
  0x055b2,
  0x049b0,
  0x0a577,
  0x0a4b0,
  0x0aa50,
  0x1b255,
  0x06d20,
  0x0ada0, //2040-2049
  0x14b63,
  0x09370,
  0x049f8,
  0x04970,
  0x064b0,
  0x168a6,
  0x0ea50,
  0x06b20,
  0x1a6c4,
  0x0aae0, //2050-2059
  0x0a2e0,
  0x0d2e3,
  0x0c960,
  0x0d557,
  0x0d4a0,
  0x0da50,
  0x05d55,
  0x056a0,
  0x0a6d0,
  0x055d4, //2060-2069
  0x052d0,
  0x0a9b8,
  0x0a950,
  0x0b4a0,
  0x0b6a6,
  0x0ad50,
  0x055a0,
  0x0aba4,
  0x0a5b0,
  0x052b0, //2070-2079
  0x0b273,
  0x06930,
  0x07337,
  0x06aa0,
  0x0ad50,
  0x14b55,
  0x04b60,
  0x0a570,
  0x054e4,
  0x0d160, //2080-2089
  0x0e968,
  0x0d520,
  0x0daa0,
  0x16aa6,
  0x056d0,
  0x04ae0,
  0x0a9d4,
  0x0a2d0,
  0x0d150,
  0x0f252, //2090-2099
  0x0d520,
]; //2100

/**
 * 公历每个月份的天数普通表
 * @Array Of Property
 * @return Number
 */
export const solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * 天干地支之天干速查表
 * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
 * @return Cn string
 */

// tianGan: ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],
export const tianGan = [
  '\u7532',
  '\u4e59',
  '\u4e19',
  '\u4e01',
  '\u620a',
  '\u5df1',
  '\u5e9a',
  '\u8f9b',
  '\u58ec',
  '\u7678',
];

/**
 * 天干地支之地支速查表
 * @Array Of Property
 * @trans ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
 * @return Cn string
 */

// diZhi: ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],
export const diZhi = [
  '\u5b50',
  '\u4e11',
  '\u5bc5',
  '\u536f',
  '\u8fb0',
  '\u5df3',
  '\u5348',
  '\u672a',
  '\u7533',
  '\u9149',
  '\u620c',
  '\u4ea5',
];

/**
 * 天干地支之地支速查表<=>生肖
 * @Array Of Property
 * @trans ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
 * @return Cn string
 */

// Animals: ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
export const Animals = [
  '\u9f20',
  '\u725b',
  '\u864e',
  '\u5154',
  '\u9f99',
  '\u86c7',
  '\u9a6c',
  '\u7f8a',
  '\u7334',
  '\u9e21',
  '\u72d7',
  '\u732a',
];

/**
 * 24节气速查表
 * @Array Of Property
 * @trans ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
 * @return Cn string
 */

// solarTerm: ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
export const solarTerm = [
  '\u5c0f\u5bd2',
  '\u5927\u5bd2',
  '\u7acb\u6625',
  '\u96e8\u6c34',
  '\u60ca\u86f0',
  '\u6625\u5206',
  '\u6e05\u660e',
  '\u8c37\u96e8',
  '\u7acb\u590f',
  '\u5c0f\u6ee1',
  '\u8292\u79cd',
  '\u590f\u81f3',
  '\u5c0f\u6691',
  '\u5927\u6691',
  '\u7acb\u79cb',
  '\u5904\u6691',
  '\u767d\u9732',
  '\u79cb\u5206',
  '\u5bd2\u9732',
  '\u971c\u964d',
  '\u7acb\u51ac',
  '\u5c0f\u96ea',
  '\u5927\u96ea',
  '\u51ac\u81f3',
];

/**
 * 1900-2100各年的24节气日期速查表
 * @Array Of Property
 * @return 0x string For splice
 */
export const sTermInfo = [
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa',
  '9778397bd19801ec9210c965cc920e',
  '97b6b97bd19801ec95f8c965cc920f',
  '97bd09801d98082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd197c36c9210c9274c91aa',
  '97b6b97bd19801ec95f8c965cc920e',
  '97bd09801d98082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa',
  '97b6b97bd19801ec95f8c965cc920e',
  '97bcf97c3598082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd07f595b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2',
  '9778397bd19801ec9210c9274c920e',
  '97b6b97bd19801ec95f8c965cc920f',
  '97bd07f5307f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c920e',
  '97b6b97bd19801ec95f8c965cc920f',
  '97bd07f5307f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bd07f1487f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c9274c920e',
  '97bcf7f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa',
  '97b6b97bd197c36c9210c9274c920e',
  '97bcf7f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c920e',
  '97b6b7f0e47f531b0723b0b6fb0722',
  '7f0e37f5307f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36b0b70c9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0787b0721',
  '7f0e27f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa',
  '97b6b7f0e47f149b0723b0787b0721',
  '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2',
  '977837f0e37f149b0723b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e37f5307f595b0b0bc920fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2',
  '977837f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2',
  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0723b06bd',
  '7f07e7f0e37f149b0723b0787b0721',
  '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e37f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0723b06bd',
  '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0723b06bd',
  '7f07e7f0e37f14998083b0787b0721',
  '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14898082b0723b02d5',
  '7f07e7f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e36665b66aa89801e9808297c35',
  '665f67f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e36665b66a449801e9808297c35',
  '665f67f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e36665b66a449801e9808297c35',
  '665f67f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e26665b66a449801e9808297c35',
  '665f67f0e37f1489801eb072297c35',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
];

/**
 * 数字转中文速查表
 * @Array Of Property
 * @trans ['日','一','二','三','四','五','六','七','八','九','十']
 * @return Cn string
 */
export const nStr1 = [
  '\u65e5',
  '\u4e00',
  '\u4e8c',
  '\u4e09',
  '\u56db',
  '\u4e94',
  '\u516d',
  '\u4e03',
  '\u516b',
  '\u4e5d',
  '\u5341',
];

/**
 * 日期转农历称呼速查表
 * @Array Of Property
 * @trans ['初','十','廿','卅']
 * @return Cn string
 */
export const nStr2 = ['\u521d', '\u5341', '\u5eff', '\u5345'];

/**
 * 月份转农历称呼速查表
 * @Array Of Property
 * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
 * @return Cn string
 */
export const nStr3 = [
  '\u6b63',
  '\u4e8c',
  '\u4e09',
  '\u56db',
  '\u4e94',
  '\u516d',
  '\u4e03',
  '\u516b',
  '\u4e5d',
  '\u5341',
  '\u51ac',
  '\u814a',
];

/**
 * 天干地支与甲子纳音对照表
 * 中文字符串数组
 * @Array Of Property
 * @return Cn string
 */
export const GZNaYin = [
  '海中金',
  '炉中火',
  '大林木',
  '路旁土',
  '剑锋金',
  '山头火',
  '漳下水',
  '城头土',
  '白腊金',
  '杨柳木',
  '泉中水',
  '屋上土',
  '霹雳火',
  '松柏木',
  '长流水',
  '砂石金',
  '山下火',
  '平地木',
  '壁上土',
  '金箔金',
  '覆灯火',
  '天河水',
  '大驿土',
  '钗钏金',
  '桑柘木',
  '太溪水',
  '沙中土',
  '天上火',
  '石榴木',
  '大海水',
];

/**
 * 天干地支与甲子纳音对照表
 * Unicode编码数组
 * @Array Of Property
 * @return Cn string
 */
export const GZNaYinUnicode = [
  '\u6d77\u4e2d\u91d1',
  '\u7089\u4e2d\u706b',
  '\u5927\u6797\u6728',
  '\u8def\u65c1\u571f',
  '\u5251\u950b\u91d1',
  '\u5c71\u5934\u706b',
  '\u6f33\u4e0b\u6c34',
  '\u57ce\u5934\u571f',
  '\u767d\u814a\u91d1',
  '\u6768\u67f3\u6728',
  '\u6cc9\u4e2d\u6c34',
  '\u5c4b\u4e0a\u571f',
  '\u9739\u96f3\u706b',
  '\u677e\u67cf\u6728',
  '\u957f\u6d41\u6c34',
  '\u7802\u77f3\u91d1',
  '\u5c71\u4e0b\u706b',
  '\u5e73\u5730\u6728',
  '\u58c1\u4e0a\u571f',
  '\u91d1\u7b94\u91d1',
  '\u8986\u706f\u706b',
  '\u5929\u6cb3\u6c34',
  '\u5927\u9a7f\u571f',
  '\u9497\u948f\u91d1',
  '\u6851\u67d8\u6728',
  '\u592a\u6eaa\u6c34',
  '\u6c99\u4e2d\u571f',
  '\u5929\u4e0a\u706b',
  '\u77f3\u69b4\u6728',
  '\u5927\u6d77\u6c34',
];
/**
 * @description: 数字与中文照表
 * Unicode编码数组
 */
export const number2CN = [
  { name: '零', value: '\u96f6' },
  { name: '一', value: '\u4e00' },
  { name: '二', value: '\u4e8c' },
  { name: '三', value: '\u4e09' },
  { name: '四', value: '\u56db' },
  { name: '五', value: '\u4e94' },
  { name: '六', value: '\u516d' },
  { name: '七', value: '\u4e03' },
  { name: '八', value: '\u516b' },
  { name: '九', value: '\u4e5d' },
];
/**
 * 星座
 * */
export const constellationArray = [
  { key: 'Capricornus', name: '摩羯座', value: '\u9b54\u7faf\u5ea7' },
  { key: 'Taurus', name: '金牛座', value: '\u91d1\u725b\u5ea7' },
  { key: 'Gemini', name: '双子座', value: '\u53cc\u5b50\u5ea7' },
  { key: 'Cancer', name: '巨蟹座', value: '\u5de8\u87f9\u5ea7' },
  { key: 'Leo', name: '狮子座', value: '\u72ee\u5b50\u5ea7' },
  { key: 'Virgo', name: '处女座', value: '\u5904\u5973\u5ea7' },
  { key: 'Libra', name: '天秤座', value: '\u5929\u79e4\u5ea7' },
  { key: 'Scorpio', name: '天蝎座', value: '\u5929\u874e\u5ea7' },
  { key: 'Sagittarius', name: '射手座', value: '\u5c04\u624b\u5ea7' },
  { key: 'Aquarius', name: '水瓶座', value: '\u6c34\u74f6\u5ea7' },
  { key: 'Pisces', name: '双鱼座', value: '\u53cc\u9c7c\u5ea7' },
  { key: 'Aries', name: '白羊座', value: '\u767d\u7f8a\u5ea7' },
];
