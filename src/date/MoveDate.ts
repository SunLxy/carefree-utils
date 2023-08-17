import { KeyType, StrType, DateObjProps, MoveDateProps } from './interface';
import { getNumString, getRangeNumber } from './utils';
/** 日期动 则其他数据进行联动 **/
class MoveDate {
  /** 最大选择日期 **/
  private max: DateObjProps<number> = undefined;
  /** 最小选择日期 */
  private min: DateObjProps<number> = undefined;

  // 当前数据
  private year: number = undefined;
  private month: number = undefined;
  private date: number = undefined;
  private h: number = undefined;
  private m: number = undefined;
  private s: number = undefined;

  // 结果展示数组
  private dateList: DateObjProps<(string | number)[]> = {};

  private dateStr: DateObjProps<string | number> = {};

  constructor(props?: MoveDateProps) {
    this.init(props || {});
  }

  /** 初始化值 */
  private init = (props: MoveDateProps) => {
    ['max', 'min'].forEach((key) => {
      if (Reflect.has(props, key)) {
        this[key] = this.analysisDate(props[key]);
      }
    });
  };
  // 防止日期超出每月的总天数
  private getPreDate = (date: string | Date) => {
    if (typeof date === 'string') {
      const [pre, hours] = date.split(' ');
      const [year, month, d] = pre.split(/\/|-/);
      const days = new Date(Number(year), Number(month), 0).getDate();
      if (Number(d) > days) {
        return [`${year}-${month}-${days}`, hours].join(' ');
      }
    }
    return date;
  };

  move = (date?: string) => {
    const result = this.analysisDate(this.getPreDate(date || new Date()));
    Object.entries(result).forEach(([key, value]) => {
      this[key] = value;
    });
    this.getMonth();
    return {
      // 最新的渲染数据列表
      data: this.dateList,
      /** 最新的数据 */
      new: this.dateStr,
    };
  };
  // 解析出数据
  private analysisDate = (dates: string | Date) => {
    const currentDate = new Date(dates);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const h = currentDate.getHours();
    const m = currentDate.getMinutes();
    const s = currentDate.getSeconds();
    return { year, month, date, h, m, s };
  };

  /**
   * 当年份开始动的时候
   * 1. 判断是否存在年份限制
   * 2. 获取点击年份的月份的天数 判断月份和天数是否在限制内，不在则取最大或最小限制月份和天数'
   * date:"2021-12-12 12:12:12"
   * */
  private getMonth = () => {
    let start = 0;
    let str: StrType = 'default';
    if (this.min && this.min.year === this.year) {
      //判断最小年份是否相等
      // 判断当前选中月份是否合法
      if (this.month < this.min.month) {
        // 判断当前月份是否小于最小值月份
        this.dateStr.month = getNumString(this.min.month);
        start = this.min.month;
        str = 'min';
      } else if (this.month === this.min.month) {
        this.dateStr.month = getNumString(this.min.month);
        start = this.min.month;
        str = 'minEqual';
      } else {
        this.dateStr.month = getNumString(this.month);
      }
      // 获取月份数据
      this.dateList.month = getRangeNumber(start, 13); //赋列表展示值
    } else if (this.max && this.max.year === this.year) {
      //判断最大年份是否相等
      // 判断当前选中月份是否合法
      if (this.month > this.max.month) {
        // 判断当前月份是否大于最大值月份
        this.dateStr.month = getNumString(this.max.month);
        start = this.max.month;
        str = 'max';
      } else if (this.month === this.max.month) {
        this.dateStr.month = getNumString(this.max.month);
        start = this.max.month;
        str = 'maxEqual';
      } else {
        this.dateStr.month = getNumString(this.month);
      }
      // 获取月份数据
      this.dateList.month = getRangeNumber(1, start + 1); //赋列表展示值
    } else {
      this.dateStr.month = getNumString(this.month);
      // 其他情况不做处理
      this.dateList.month = getRangeNumber(1, 13); //赋列表展示值
    }
    this.getDate(str);
  };
  // 处理日期的
  private setDateCom = (
    str: StrType,
    key: KeyType,
    num: number,
    nextFun?: 'getSeconds' | "getMinutes" | "getHours" | "getDate" | "getMonth",
  ) => {
    let start = key === 'date' ? 1 : 0;
    let nextStr: StrType = 'default';
    let monthDay = num;
    if (str === 'min') {
      // 上一个取值最小值
      // 最小值一直取最小值 ()
      nextStr = 'min';
      this.dateStr[key] = getNumString(this.min[key]); // 赋结果值
      start = this.min[key];
      this.dateList[key] = getRangeNumber(
        start,
        ['date', 'h'].includes(key) ? monthDay + 1 : monthDay,
      ); // 赋列表展示值
    } else if (str === 'minEqual') {
      // 最小值相等 下一个做判断
      if (this[key] === this.min[key]) {
        nextStr = 'minEqual';
        this.dateStr[key] = getNumString(this.min[key]);
        start = this.min[key];
      } else if (this[key] < this.min[key]) {
        nextStr = 'min';
        this.dateStr[key] = getNumString(this.min[key]);
        start = this.min[key];
      } else {
        this.dateStr[key] = getNumString(this[key]);
        // start = this[key]
      }
      this.dateList[key] = getRangeNumber(
        start,
        ['date', 'h'].includes(key) ? monthDay + 1 : monthDay,
      ); // 赋列表展示值
    } else if (str === 'max') {
      // 最大值一直取最大值
      nextStr = 'max';
      this.dateStr[key] = getNumString(this.max[key]); // 赋结果值
      monthDay = this.max[key];
      this.dateList[key] = getRangeNumber(
        start,
        ['date', 'h', 's', 'm'].includes(key) ? monthDay + 1 : monthDay,
      ); // 赋列表展示值
    } else if (str === 'maxEqual') {
      //最大值相等做下一个判断
      if (this[key] === this.max[key]) {
        nextStr = 'maxEqual';
        this.dateStr[key] = getNumString(this.max[key]);
        monthDay = this.max[key];
      } else if (this[key] > this.max[key]) {
        nextStr = 'max';
        this.dateStr[key] = getNumString(this.max[key]);
        monthDay = this.max[key];
      } else {
        this.dateStr[key] = getNumString(this[key]);
      }
      this.dateList[key] = getRangeNumber(
        start,
        ['date', 'h', 's', 'm'].includes(key) ? monthDay + 1 : monthDay,
      ); // 赋列表展示值
    } else {
      // 默认情况 一直走默认
      this.dateStr[key] = getNumString(this[key]);
      this.dateList[key] = getRangeNumber(
        start,
        ['date', 'h'].includes(key) ? monthDay + 1 : monthDay,
      ); // 赋列表展示值
    }
    if (nextFun && this[nextFun]) {
      this[nextFun](nextStr);
    }
  };

  /**
   * 当月份开始动的时候(前面其他的不用动)
   * 1. 判断天数是否在限制内，不在则取最大或最小限制天数
   * **/
  private getDate = (str: StrType) => {
    /**
     * 数据返回格式 返回的是天数
     * */
    this.setDateCom(
      str,
      'date',
      new Date(this.year, this.month, 0).getDate(),
      'getHours',
    );
  };
  /**
   * 当天数开始动的时候(前面其他的不用动)
   * **/
  private getHours = (str: StrType) => {
    this.setDateCom(str, 'h', 23, 'getMinutes');
  };
  /**
   * 如果时分秒也做限制 (前面其他的不用动)
   * 1. 上面年份动 再加上时分秒的限制
   * **/
  private getMinutes = (str: StrType) => {
    this.setDateCom(str, 'm', 60, 'getSeconds');
  };
  /**
   *  动小时(前面其他的不用动)
   * */
  private getSeconds = (str: StrType) => {
    this.setDateCom(str, 's', 60);
  };
}

export default MoveDate;
