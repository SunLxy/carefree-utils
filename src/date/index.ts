import { keyType, StrType, DateObjProps, MoveDateProps } from './interface';

const getNumString = (value: number) => {
  if (value < 10) {
    return `0${value}`;
  }
  return value;
};

const getRangeNumber = (start: number, end: number) => {
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
        // console.log(key, this.analysisDate(props[key]))
        this[key] = this.analysisDate(props[key]);
      }
    });
  };
  move = async (date: string) => {
    const result = this.analysisDate(date);
    Object.entries(result).forEach(([key, value]) => {
      this[key] = value;
    });
    await this.getMonth();
    return {
      // 最新的渲染数据列表
      data: this.dateList,
      /** 最新的数据 */
      new: this.dateStr,
    };
  };
  // 解析出数据
  private analysisDate = (dates: string) => {
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
  private getMonth = async () => {
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
    console.log(str);
    await this.getDate(str);
  };
  // 处理日期的
  private setDateCom = async (
    str: StrType,
    key: keyType,
    num: number,
    nextFun?: string,
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
        ['date', 'h'].includes(key) ? monthDay + 1 : monthDay,
      ); // 赋列表展示值
    } else if (str === 'maxEqual') {
      //最大值相等做下一个判断
      if (this[key] === this.max[key]) {
        nextStr = 'maxEqual';
        this.dateStr[key] = getNumString(this.max[key]);
        start = this.max[key];
      } else if (this[key] > this.max[key]) {
        nextStr = 'max';
        this.dateStr[key] = getNumString(this.max[key]);
        monthDay = this.max[key];
      } else {
        this.dateStr[key] = getNumString(this[key]);
        // monthDay = this[key]
      }
      this.dateList[key] = getRangeNumber(
        start,
        ['date', 'h'].includes(key) ? monthDay + 1 : monthDay,
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
      await this[nextFun](nextStr);
    }
  };

  /**
   * 当月份开始动的时候(前面其他的不用动)
   * 1. 判断天数是否在限制内，不在则取最大或最小限制天数
   * **/
  private getDate = async (str: StrType) => {
    /**
     * 数据返回格式 返回的是天数
     * */
    await this.setDateCom(
      str,
      'date',
      new Date(this.year, this.month, 0).getDate(),
      'getHours',
    );

    // let start = 1;
    // let nextStr: StrType = 'default';
    // let monthDay = new Date(this.year, this.month, 0).getDate();
    // if (str === "min") {// 上一个取值最小值
    //   // 最小值一直取最小值 ()
    //   nextStr = "min"
    //   this.dateStr.date = getNumString(this.min.date); // 赋结果值
    //   start = this.min.date
    //   this.dateList.date = getRangeNumber(start, monthDay + 1); // 赋列表展示值
    // } else if (str === "minEqual") {
    //   // 最小值相等 下一个做判断
    //   if (this.date === this.min.date) {
    //     nextStr = "minEqual"
    //     this.dateStr.date = getNumString(this.min.date)
    //     start = this.min.date
    //   } else if (this.date < this.min.date) {
    //     nextStr = "min"
    //     this.dateStr.date = getNumString(this.min.date)
    //     start = this.min.date
    //   } else {
    //     this.dateStr.date = getNumString(this.date)
    //     // start = this.date
    //   }
    //   this.dateList.date = getRangeNumber(start, monthDay + 1); // 赋列表展示值
    // } else if (str === "max") {
    //   // 最大值一直取最大值
    //   nextStr = "max"
    //   this.dateStr.date = getNumString(this.max.date); // 赋结果值
    //   monthDay = this.max.date
    //   this.dateList.date = getRangeNumber(start, monthDay + 1); // 赋列表展示值
    // } else if (str === "maxEqual") {
    //   //最大值相等做下一个判断
    //   if (this.date === this.max.date) {
    //     nextStr = "maxEqual"
    //     this.dateStr.date = getNumString(this.max.date)
    //     start = this.max.date
    //   } else if (this.date > this.max.date) {
    //     nextStr = "max"
    //     this.dateStr.date = getNumString(this.max.date)
    //     monthDay = this.max.date
    //   } else {
    //     this.dateStr.date = getNumString(this.date)
    //     // monthDay = this.date
    //   }
    //   this.dateList.date = getRangeNumber(start, monthDay + 1); // 赋列表展示值
    // } else {
    //   // 默认情况 一直走默认
    //   this.dateStr.date = getNumString(this.date)
    //   this.dateList.date = getRangeNumber(start, monthDay + 1); // 赋列表展示值
    // }
    // await this.getHours(nextStr)
  };
  /**
   * 当天数开始动的时候(前面其他的不用动)
   * **/
  private getHours = async (str: StrType) => {
    await this.setDateCom(str, 'h', 23, 'getMinutes');
    // let start = 0;
    // let nextStr: StrType = 'default';
    // let monthDay = 23;
    // if (str === "min") {// 上一个取值最小值
    //   // 最小值一直取最小值 ()
    //   nextStr = "min"
    //   this.dateStr.h = getNumString(this.min.h); // 赋结果值
    //   start = this.min.h
    //   this.dateList.h = getRangeNumber(start, monthDay + 1); // 赋列表展示值
    // } else if (str === "minEqual") {
    //   // 最小值相等 下一个做判断
    //   if (this.h === this.min.h) {
    //     nextStr = "minEqual"
    //     this.dateStr.h = getNumString(this.min.h)
    //     start = this.min.h
    //   } else if (this.h < this.min.h) {
    //     nextStr = "min"
    //     this.dateStr.h = getNumString(this.min.h)
    //     start = this.min.h
    //   } else {
    //     this.dateStr.h = getNumString(this.h)
    //     // start = this.date
    //   }
    //   this.dateList.h = getRangeNumber(start, monthDay + 1); // 赋列表展示值
    // } else if (str === "max") {
    //   // 最大值一直取最大值
    //   nextStr = "max"
    //   this.dateStr.h = getNumString(this.max.h); // 赋结果值
    //   monthDay = this.max.h
    //   this.dateList.h = getRangeNumber(start, monthDay + 1); // 赋列表展示值
    // } else if (str === "maxEqual") {
    //   //最大值相等做下一个判断
    //   if (this.h === this.max.h) {
    //     nextStr = "maxEqual"
    //     this.dateStr.h = getNumString(this.max.h)
    //     start = this.max.h
    //   } else if (this.h > this.max.h) {
    //     nextStr = "max"
    //     this.dateStr.h = getNumString(this.max.h)
    //     monthDay = this.max.h
    //   } else {
    //     this.dateStr.h = getNumString(this.h)
    //     // monthDay = this.date
    //   }
    //   this.dateList.h = getRangeNumber(start, monthDay + 1); // 赋列表展示值
    // } else {
    //   // 默认情况 一直走默认
    //   this.dateStr.h = getNumString(this.h)
    //   this.dateList.h = getRangeNumber(start, monthDay + 1); // 赋列表展示值
    // }
    // await this.getMinutes(nextStr)
  };
  /**
   * 如果时分秒也做限制 (前面其他的不用动)
   * 1. 上面年份动 再加上时分秒的限制
   * **/
  private getMinutes = async (str: StrType) => {
    await this.setDateCom(str, 'm', 60, 'getSeconds');
    // let start = 0;
    // let nextStr: StrType = 'default';
    // let monthDay = 60;
    // if (str === "min") {// 上一个取值最小值
    //   // 最小值一直取最小值 ()
    //   nextStr = "min"
    //   this.dateStr.m = getNumString(this.min.m); // 赋结果值
    //   start = this.min.m
    //   this.dateList.m = getRangeNumber(start, monthDay); // 赋列表展示值
    // } else if (str === "minEqual") {
    //   // 最小值相等 下一个做判断
    //   if (this.m === this.min.m) {
    //     nextStr = "minEqual"
    //     this.dateStr.m = getNumString(this.min.m)
    //     start = this.min.m
    //   } else if (this.m < this.min.m) {
    //     nextStr = "min"
    //     this.dateStr.m = getNumString(this.min.m)
    //     start = this.min.m
    //   } else {
    //     this.dateStr.m = getNumString(this.m)
    //     // start = this.date
    //   }
    //   this.dateList.m = getRangeNumber(start, monthDay); // 赋列表展示值
    // } else if (str === "max") {
    //   // 最大值一直取最大值
    //   nextStr = "max"
    //   this.dateStr.m = getNumString(this.max.m); // 赋结果值
    //   monthDay = this.max.m
    //   this.dateList.m = getRangeNumber(start, monthDay); // 赋列表展示值
    // } else if (str === "maxEqual") {
    //   //最大值相等做下一个判断
    //   if (this.m === this.max.m) {
    //     nextStr = "maxEqual"
    //     this.dateStr.m = getNumString(this.max.m)
    //     start = this.max.m
    //   } else if (this.m > this.max.m) {
    //     nextStr = "max"
    //     this.dateStr.m = getNumString(this.max.m)
    //     monthDay = this.max.m
    //   } else {
    //     this.dateStr.m = getNumString(this.m)
    //     // monthDay = this.date
    //   }
    //   this.dateList.m = getRangeNumber(start, monthDay); // 赋列表展示值
    // } else {
    //   // 默认情况 一直走默认
    //   this.dateStr.m = getNumString(this.m)
    //   this.dateList.m = getRangeNumber(start, monthDay); // 赋列表展示值
    // }
    // await this.getSeconds(nextStr)
  };
  /**
   *  动小时(前面其他的不用动)
   * */
  private getSeconds = async (str: StrType) => {
    await this.setDateCom(str, 's', 60);
    // let start = 0;
    // let nextStr: StrType = 'default';
    // let monthDay = 60;
    // if (str === "min") {// 上一个取值最小值
    //   // 最小值一直取最小值 ()
    //   nextStr = "min"
    //   this.dateStr.s = getNumString(this.min.s); // 赋结果值
    //   start = this.min.s
    //   this.dateList.s = getRangeNumber(start, monthDay); // 赋列表展示值
    // } else if (str === "minEqual") {
    //   // 最小值相等 下一个做判断
    //   if (this.s === this.min.s) {
    //     nextStr = "minEqual"
    //     this.dateStr.s = getNumString(this.min.s)
    //     start = this.min.s
    //   } else if (this.s < this.min.s) {
    //     nextStr = "min"
    //     this.dateStr.s = getNumString(this.min.s)
    //     start = this.min.s
    //   } else {
    //     this.dateStr.s = getNumString(this.s)
    //     // start = this.date
    //   }
    //   this.dateList.s = getRangeNumber(start, monthDay); // 赋列表展示值
    // } else if (str === "max") {
    //   // 最大值一直取最大值
    //   nextStr = "max"
    //   this.dateStr.s = getNumString(this.max.s); // 赋结果值
    //   monthDay = this.max.s
    //   this.dateList.s = getRangeNumber(start, monthDay); // 赋列表展示值
    // } else if (str === "maxEqual") {
    //   //最大值相等做下一个判断
    //   if (this.s === this.max.s) {
    //     nextStr = "maxEqual"
    //     this.dateStr.s = getNumString(this.max.s)
    //     start = this.max.s
    //   } else if (this.s > this.max.s) {
    //     nextStr = "max"
    //     this.dateStr.s = getNumString(this.max.s)
    //     monthDay = this.max.s
    //   } else {
    //     this.dateStr.s = getNumString(this.s)
    //     // monthDay = this.date
    //   }
    //   this.dateList.s = getRangeNumber(start, monthDay); // 赋列表展示值
    // } else {
    //   // 默认情况 一直走默认
    //   this.dateStr.s = getNumString(this.s)
    //   this.dateList.s = getRangeNumber(start, monthDay); // 赋列表展示值
    // }
  };
  // 这个方法不进行使用只是解决eslint问题
  getFun = () => {
    return {
      getSeconds: this.getSeconds,
      getMinutes: this.getMinutes,
      getHours: this.getHours,
      getDate: this.getDate,
      getMonth: this.getMonth,
    };
  };
}

export default MoveDate;
