import {
  FestivalArray,
  lunarInfo,
  solarMonth,
  tianGan,
  diZhi,
  Animals,
  solarTerm,
  sTermInfo,
  nStr1,
  nStr2,
  nStr3,
  GZNaYin,
  GZNaYinUnicode,
  number2CN,
  constellationArray,
} from './festival';
const utils = {
  /** 节日列表 */
  festivalArray: FestivalArray,
  /**
   * 农历1900-2100的闰大小信息表
   * @Array Of Property
   * @return Hex
   */
  lunarInfo,
  /**
   * 公历每个月份的天数普通表
   * @Array Of Property
   * @return Number
   */
  solarMonth,
  /**
   * 天干地支之天干速查表
   * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
   * @return Cn string
   */
  /** tianGan: ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"], */
  tianGan,
  /** diZhi: ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"], */
  diZhi,
  /**
   * 天干地支之地支速查表<=>生肖
   * @Array Of Property
   * @trans ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
   * @return Cn string
   */
  /** Animals: ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"] */
  Animals,
  /** solarTerm: ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
   */
  solarTerm,
  /**
   * 1900-2100各年的24节气日期速查表
   * @Array Of Property
   * @return 0x string For splice
   */
  sTermInfo,
  /**
   * 数字转中文速查表
   * @Array Of Property
   * @trans ['日','一','二','三','四','五','六','七','八','九','十']
   * @return Cn string
   */
  nStr1,
  /**
   * 日期转农历称呼速查表
   * @Array Of Property
   * @trans ['初','十','廿','卅']
   * @return Cn string
   */
  nStr2,
  /**
   * 月份转农历称呼速查表
   * @Array Of Property
   * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
   * @return Cn string
   */
  nStr3,
  /**
   * 天干地支与甲子纳音对照表
   * 中文字符串数组
   * @Array Of Property
   * @return Cn string
   */
  GZNaYin,
  /**
   * 天干地支与甲子纳音对照表
   * Unicode编码数组
   * @Array Of Property
   * @return Cn string
   */
  GZNaYinUnicode,
  /**
   * 数字与中文照表
   * Unicode编码数组
   */
  number2CN,
  /** 星座 */
  constellationArray,
};

export default utils;
