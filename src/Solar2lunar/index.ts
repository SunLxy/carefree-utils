// > 阳历和农历互转 从这个[solarday2lunarday](https://github.com/liquanjiang/solarday2lunarday) 中搬来改造的，去除了 dayjs
import utils from './utils';
import { Festival } from './festival';
export * from './interface.d';
export type { Festival };
class Solar2lunar {
  /**
   * 数字与中文照表
   * Unicode编码数组
   * @param year   1989
   * @return string   一九八九
   */
  getYearCN(year: number) {
    const Year = year.toString().split('');
    return Year.reduce((total, item: string) => {
      const index = Number.parseInt(item);
      total += utils.number2CN[index].value;
      return total;
    }, '');
  }
  /**
   * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
   * @return Number (0-12)
   * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
   * @param y
   */
  leapMonth(y: number) {
    // 闰字编码 \u95f0
    return utils.lunarInfo[y - 1900] & 0xf;
  }
  /**
   * 返回农历y年闰月的天数 若该年没有闰月则返回0
   * @return Number (0、29、30)
   * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
   * @param y
   */
  leapDays(y: number) {
    if (this.leapMonth(y)) {
      return utils.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }
    return 0;
  }
  /**
   * 返回农历y年一整年的总天数
   * @return Number
   * @evar .lunarYearDays(1987) ;//count=387
   * @param y
   */
  lunarYearDays(y: number) {
    let i,
      sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += utils.lunarInfo[y - 1900] & i ? 1 : 0;
    }
    return sum + this.leapDays(y);
  }
  /**
   * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
   * @return Number (-1、29、30)
   * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
   * @param y
   * @param m
   */
  lunarMonthDays(y: number, m: number) {
    if (m > 12 || m < 1) {
      //月份参数从1至12，参数错误返回-1
      return -1;
    }
    return utils.lunarInfo[y - 1900] & (0x10000 >> m) ? 30 : 29;
  }
  /**
   * 返回公历(!)y年m月的天数
   * @return Number (-1、28、29、30、31)
   * @eg:let solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
   * @param y
   * @param m
   */
  solarMonthDays(y: number, m: number) {
    if (m > 12 || m < 1) {
      //若参数错误 返回-1
      return -1;
    }
    const ms = m - 1;
    if (ms === 1) {
      //2月份的闰平规律测算后确认返回28或29
      return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 ? 29 : 28;
    } else {
      return utils.solarMonth[ms];
    }
  }
  /**
   * 农历年份转换为干支纪年
   * @param  y 农历年的年份数
   * @return  string
   */
  lunarToTianGandiZhiYear(y: number) {
    let ganKey = (y - 3) % 10;
    let zhiKey = (y - 3) % 12;
    if (ganKey === 0) ganKey = 10; //如果余数为0则为最后一个天干
    if (zhiKey === 0) zhiKey = 12; //如果余数为0则为最后一个地支
    return utils.tianGan[ganKey - 1] + utils.diZhi[zhiKey - 1];
  }

  /**
   * 公历月、日判断所属星座
   * @param  m 月
   * @param  d 天
   * @return  string
   */
  solarGetConstellation(m: number, d: number) {
    const s =
      '\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf';
    const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(m * 2 - (d < arr[m - 1] ? 2 : 0), 2) + '\u5ea7'; //座
  }

  /**
   * 公历月、日判断所属星座
   * @return  string
   */
  solarGetConstellationEn(Astro: string): string {
    const obj = utils.constellationArray.find((item) => item.value === Astro);
    return obj ? obj.key : '';
  }

  /**
   * 根据公历月份、公历日期、农历月份、农历日期、节气判断是否为节日，并范围节日对象
   * @return Cn string
   * @param solarMonth number
   * @param solarDay number
   * @param lunarMonth number
   * @param lunarDay number
   * @param isTerm boolean
   * @param term string
   * @param lunarYear
   */
  getFestival(
    solarMonth: number,
    solarDay: number,
    lunarMonth: number,
    lunarDay: number,
    isTerm: boolean,
    term: string | undefined,
    lunarYear: number,
  ): Festival {
    const obj = utils.festivalArray.filter((item: any) => {
      const flag1 =
        solarMonth === item.solarMonth && solarDay === item.solarDay; // 阳历节日
      const flag2 =
        lunarMonth === item.lunarMonth &&
        lunarDay === item.lunarDay &&
        !item.newYearEve; // 农历节日
      const flag3 = isTerm === item.isTerm && term === item.term; // 节气节日
      // 农历12月 且农历日期等于除夕，并且当天的日期数等于当年腊月的天数，即腊月有29天时，必须为二十九，腊月有30天时，必须等于三十
      const flag4 =
        lunarMonth === 12 &&
        lunarMonth === item.lunarMonth &&
        lunarDay === item.lunarDay &&
        lunarDay === this.solarMonthDays(lunarYear, lunarMonth) &&
        !!item.newYearEve;
      return flag1 || flag2 || flag3 || flag4;
    });
    // 如果找到了对应的节日
    if (obj.length > 0) {
      const {
        isLunar = false,
        festivalEnName = '',
        festivalName = '',
      } = obj[0];
      if (obj.length === 1) {
        return {
          isLunarFestival: isLunar,
          festivalEnName,
          festivalName,
          isFestival: true,
        };
      } else {
        // 如果有两个节日重合，则添加双节同庆
        const sec = obj[1];
        const isDoubleFestival = true;
        const doubleFestivalName = `${festivalName}${sec.festivalName}同庆`;
        const secondFestivalName = sec.festivalName;
        const secondFestivalEnName = sec.festivalEnName;
        return {
          isDoubleFestival,
          doubleFestivalName,
          secondFestivalName,
          secondFestivalEnName,
          isLunarFestival: isLunar,
          festivalEnName,
          festivalName,
          isFestival: true,
        };
      }
    } else {
      return {
        isLunarFestival: false,
        festivalEnName: '',
        festivalName: '',
        isFestival: false,
      };
    }
  }

  /**
   * 传入offset偏移量返回干支
   * @param offset 相对甲子的偏移量
   * @return Cn string
   */
  totianGandiZhi(offset: number) {
    return utils.tianGan[offset % 10] + utils.diZhi[offset % 12];
  }

  /**
   * 传入公历(!)y年获得该年第n个节气的公历日期
   * @return day Number
   * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
   * @param y
   * @param n
   */
  getTerm(y: number, n: number) {
    if (y < 1900 || y > 2100) {
      return -1;
    }
    if (n < 1 || n > 24) {
      return -1;
    }
    const table = utils.sTermInfo[y - 1900];
    const _info = [
      parseInt('0x' + table.substr(0, 5)).toString(),
      parseInt('0x' + table.substr(5, 5)).toString(),
      parseInt('0x' + table.substr(10, 5)).toString(),
      parseInt('0x' + table.substr(15, 5)).toString(),
      parseInt('0x' + table.substr(20, 5)).toString(),
      parseInt('0x' + table.substr(25, 5)).toString(),
    ];

    const array: string[] = [];
    _info.forEach((item) => {
      array.push(item.substr(0, 1));
      array.push(item.substr(1, 2));
      array.push(item.substr(3, 1));
      array.push(item.substr(4, 2));
    });
    return parseInt(array[n - 1]);
  }

  /**
   * 传入农历数字月份返回汉语通俗表示法
   * @return Cn string
   * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
   * @param m
   */
  toChinaMonth(m: number) {
    // 月 => \u6708
    if (m > 12 || m < 1) {
      return -1;
    } //若参数错误 返回-1
    let s = utils.nStr3[m - 1];
    s += '\u6708'; //加上月字
    return s;
  }

  /**
   * 传入农历日期数字返回汉字表示法
   * @return Cn string
   * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
   * @param d
   */
  toChinaDay(d: number) {
    //日 => \u65e5
    let s;
    switch (d) {
      case 10:
        s = '\u521d\u5341';
        break;
      case 20:
        s = '\u4e8c\u5341';
        break;
      case 30:
        s = '\u4e09\u5341';
        break;
      default:
        s = utils.nStr2[Math.floor(d / 10)];
        s += utils.nStr1[d % 10];
    }
    return s;
  }

  /**
   * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
   * @param y year
   * @return Cn string
   * @eg:var animal = calendar.getAnimal(1987) ; //animal='兔'
   */
  getAnimal(y: number) {
    return utils.Animals[(y - 4) % 12];
  }

  /**
   * 传入阳历年获取是否闰年
   * @return boolean
   * @eg:console.log(calendar.isLeapYear(1989));
   * @param solarYear number
   */
  isLeapYear(solarYear: number): boolean | string {
    if (solarYear < 1901 || solarYear > 2099) {
      return '请传入1901~2099年之间的年数';
    }
    return (
      (solarYear % 4 === 0 && solarYear % 100 !== 0) || solarYear % 400 === 0
    );
  }

  /**
   * 传入阳历年,月份，返回当月的阳历月天数
   * @return number
   * @eg:console.log(calendar.countSolarMonthDays(1989, 7));
   * @param solarYear number
   * @param solarMonth number
   *
   */
  countSolarMonthDays(solarYear: number, solarMonth: number): number | string {
    const isLeapYear = this.isLeapYear(solarYear) === true;
    const big = [1, 3, 5, 7, 8, 10, 12];
    const small = [4, 6, 9, 11];
    if (solarMonth === 2) {
      return isLeapYear ? 29 : 28;
    }
    if (big.includes(solarMonth)) {
      return 31;
    }
    if (small.includes(solarMonth)) {
      return 30;
    }
    const error = '请输入正确的月数';
    return error;
  }

  /**
   * 传入阳历年份，获取该年的所有节日，节日列表同 FestivalArray 中所列举
   * @return []
   * @param solarYear: string | number
   */
  getAllFestival(solarYear: number | string) {
    let y: number;
    const festivalArr = [];
    if (typeof solarYear === 'number') {
      y = Number(solarYear);
    } else {
      const s = Number.parseInt(solarYear);
      if (Number.isNaN(s)) {
        const error = '请输入正确的年份格式';
        return error;
      }
      y = s;
    }

    if (y < 1901 || y > 2099) {
      const error =
        '请检查输入参数的合法性，目前仅支持1901.1.1-2099.12.31之间的查询,传入的时间超出查询范围！';
      return error;
    }

    const len = this.isLeapYear(y) ? 366 : 365;
    let Year = new Date(`${solarYear.toString()}-01-01`);
    for (let i = 0; i < len; i++) {
      const obj = this.solar2lunar(Year);
      if (typeof obj === 'object') {
        const {
          solarMonth,
          solarDay,
          lunarMonth,
          lunarDay,
          isTerm,
          Term,
          fullLunarMonthString,
        } = obj;
        const festival = this.getFestival(
          solarMonth,
          solarDay,
          lunarMonth,
          lunarDay,
          isTerm,
          Term,
          y - 1,
        );
        const {
          isFestival = false,
          isLunarFestival = false,
          festivalEnName = '',
          festivalName = '',
          doubleFestivalName,
          isDoubleFestival = false,
          secondFestivalEnName,
          secondFestivalName,
        } = festival;
        const fullSolarMonthString = `${solarMonth}月${solarDay}日`;
        if (isFestival) {
          if (isDoubleFestival) {
            festivalArr.push({
              doubleFestivalName,
              isDoubleFestival,
              secondFestivalEnName,
              secondFestivalName,
              fullLunarMonthString,
              isFestival,
              isLunarFestival,
              festivalEnName,
              fullSolarMonthString,
              festivalName,
              solarMonth,
              solarDay,
              lunarMonth,
              lunarDay,
              isTerm,
              Term,
            });
          } else {
            festivalArr.push({
              fullLunarMonthString,
              isFestival,
              isLunarFestival,
              festivalEnName,
              fullSolarMonthString,
              festivalName,
              solarMonth,
              solarDay,
              lunarMonth,
              lunarDay,
              isTerm,
              Term,
            });
          }
        }
      }
      Year = new Date(Year);
      let currentDate = new Date(Year);
      currentDate.setDate(currentDate.getDate() + 1);
      Year = currentDate;
    }
    return festivalArr;
  }

  /**
   * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
   * @return JSON object
   * @eg:console.log(calendar.solar2lunar(1987,11,01));
   * @param Year
   * @param Month
   * @param Day
   */
  solar2lunar(
    Year: number | string | Date,
    Month?: number | string,
    Day?: number | string,
  ) {
    // 参数区间1900.1.1~2099.12.31

    let yy: number, mm: number, dd: number;
    const args = Array.from(arguments);
    if (args.length === 0) {
      const ds = new Date();
      yy = ds.getFullYear();
      mm = ds.getMonth() + 1;
      dd = ds.getDate();
    } else if (args.length < 3) {
      const ds = new Date(Year);
      yy = ds.getFullYear();
      mm = ds.getMonth() + 1;
      dd = ds.getDate();
    } else {
      const ty = typeof Year;
      const tm = typeof Month;
      const td = typeof Day;
      yy =
        ty === 'number'
          ? Number(Year)
          : typeof Year === 'string'
          ? Number.parseInt(Year)
          : 0;
      mm =
        tm === 'number'
          ? Number(Month)
          : typeof Month === 'string'
          ? Number.parseInt(Month)
          : 0;
      dd =
        td === 'number'
          ? Number(Day)
          : typeof Day === 'string'
          ? Number.parseInt(Day)
          : 0;
    }

    let objDate: any;
    //年份限定、上限
    if (yy < 1901 || yy > 2099) {
      const error =
        '请检查输入参数的合法性，目前仅支持1901.1.1-2099.12.31之间的查询,传入的时间超出查询范围！';
      return error;
    }

    //月份限定、上限
    if (mm < 1 || mm > 12) {
      const error = '请检查输入参数的合法性，月份只能在1~12之间！';
      return error;
    }

    //月份限定、上限
    if (dd < 1 || dd > 31) {
      const error = '日期只能在1~31之间！';
      return error;
    }

    //未传参  获得当天
    if (!yy) {
      objDate = new Date();
    } else {
      objDate = new Date(yy, mm - 1, dd);
    }
    let i: number,
      leap = 0,
      temp = 0;
    //修正ymd参数
    const solarYear = objDate.getFullYear(),
      solarMonth = objDate.getMonth() + 1,
      solarDay = objDate.getDate();
    let offset =
      (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) -
        Date.UTC(1900, 0, 31)) /
      86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = this.lunarYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;
      i--;
    }

    //是否今天
    let isTodayObj = new Date(),
      isToday = false;
    if (
      isTodayObj.getFullYear() === solarYear &&
      isTodayObj.getMonth() + 1 === solarMonth &&
      isTodayObj.getDate() === solarDay
    ) {
      isToday = true;
    }

    //星期几
    let nWeek = objDate.getDay(),
      cWeek = utils.nStr1[nWeek];
    //数字表示周几顺应天朝周一开始的惯例
    if (nWeek === 0) {
      nWeek = 7;
    }

    //农历年
    const lunarYear = i;
    leap = this.leapMonth(i); //闰哪个月
    let isLeap = false; // 是否闰月

    //效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      //闰月
      if (leap > 0 && i === leap + 1 && !isLeap) {
        --i;
        isLeap = true;
        temp = this.leapDays(lunarYear); //计算农历闰月天数
      } else {
        temp = this.lunarMonthDays(lunarYear, i); //计算农历普通月天数
      }
      //解除闰月
      if (isLeap && i === leap + 1) {
        isLeap = false;
      }
      offset -= temp;
    }
    // 闰月导致数组下标重叠取反
    if (offset === 0 && leap > 0 && i === leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
      }
    }
    if (offset < 0) {
      offset += temp;
      --i;
    }
    //农历月
    const lunarMonth = i;
    //农历日
    const lunarDay = offset + 1;
    //天干地支处理
    const sm = solarMonth - 1;
    const gzY = this.lunarToTianGandiZhiYear(lunarYear);

    // 当月的两个节气
    const firstNode = this.getTerm(solarYear, solarMonth * 2 - 1); //返回当月「节」为几日开始
    const secondNode = this.getTerm(solarYear, solarMonth * 2); //返回当月「节」为几日开始

    // 依据12节气修正干支月
    let gzM = this.totianGandiZhi((solarYear - 1900) * 12 + solarMonth + 11);
    if (solarDay >= firstNode) {
      gzM = this.totianGandiZhi((solarYear - 1900) * 12 + solarMonth + 12);
    }

    // 传入的日期的节气与否
    let isTerm = false;
    let Term = '';
    if (firstNode === solarDay) {
      isTerm = true;
      Term = utils.solarTerm[solarMonth * 2 - 2];
    }
    if (secondNode === solarDay) {
      isTerm = true;
      Term = utils.solarTerm[solarMonth * 2 - 1];
    }
    //日柱 当月一日与 1900/1/1 相差天数
    const dayCyclical =
      Date.UTC(solarYear, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    const gzD = this.totianGandiZhi(dayCyclical + solarDay - 1);

    //该日期所属的星座
    const constellation = this.solarGetConstellation(solarMonth, solarDay);

    const astroEn = this.solarGetConstellationEn(constellation);

    // 该年是否为闰年
    const isLeapYear = this.isLeapYear(solarYear);

    // 获取该阴历月的天数，如果是闰月则返回该年闰月的天数，如果不是则返回该阴历月天使，（取值29或30）
    const lunarMonthDays = isLeap
      ? this.leapDays(lunarYear)
      : this.lunarMonthDays(lunarYear, lunarMonth);

    // 该月的阳历月天数
    const solarMonthDays = this.countSolarMonthDays(solarYear, solarMonth);

    // 获取该年的干支纳音
    const index = Math.floor(((lunarYear - 1864) % 60) / 2);
    const GzNy = `${utils.GZNaYinUnicode[index]}`;

    // 加入节假日的判断,节日的对象数据类型参见interface  Festival 中的介绍
    const festival = this.getFestival(
      solarMonth,
      solarDay,
      lunarMonth,
      lunarDay,
      isTerm,
      Term,
      lunarYear,
    );

    // 阴历月份的中文
    const IMonthCn = (isLeap ? '\u95f0' : '') + this.toChinaMonth(lunarMonth);

    // 阴历日期的中文
    const IDayCn = this.toChinaDay(lunarDay);

    // 阴历年份中文
    const lunarYearCN = this.getYearCN(lunarYear);

    // 阳历年份中文
    const solarYearCN = this.getYearCN(solarYear);

    const obj = {
      lunarYear: lunarYear, // 阴历年份数字
      lunarYearCN: lunarYearCN, // 阴历年份的汉字（举例：一九八九）
      lunarMonth: lunarMonth, // 阴历月份数字
      lunarDay: lunarDay, // 阴历天数字
      lunarMonthDays: lunarMonthDays, // 该阴历月的天数（取阴历天数）
      fullLunarMonthString: `${IMonthCn}${IDayCn}`, // 阴历月份 + 阴历日期 （举例：正月初一）
      zodiac: this.getAnimal(lunarYear), // 生肖
      IMonthCn: IMonthCn, // 阴历月份汉字，含闰月
      IDayCn: IDayCn, // 阴历天汉字
      solarYear: solarYear, // 阳历年数字
      solarYearCN: solarYearCN, // 阳历年份的汉字（举例：一九八九）
      solarMonth: solarMonth, // 阳历月数字
      solarDay: solarDay, // 阳历天数字
      solarMonthDays: solarMonthDays, // 该阳历月份的天数
      gzYear: gzY, // 干支年（举例2020 庚子年）
      gzMonth: gzM, // 干支月 (举例2020年5月 辛巳月)
      gzDay: gzD, // 干支日 （举例2020年5月1日 癸酉日）
      isToday: isToday, // 是否今天
      isLeapMonth: isLeap, // 该月是否闰月
      isLeapYear: isLeapYear, // 阳历年是否闰年
      nWeek: nWeek, // 星期数字
      ncWeek: '\u661f\u671f' + cWeek, // 星期汉字（举例：星期六）
      isTerm: isTerm, // 是否节气
      Term: Term, // 节气名词
      constellation: constellation, // 星座汉字
      GzNy: GzNy, // 该阴历年的干支纳音
      astroEn: astroEn, // 星座的英文
      isFestival: false, // 是否是节日
      festivalName: '', // 节日中文
      festivalEnName: '', // 节日英文
    };

    const final = Object.assign(obj, festival);
    return final;
  }

  /**
   * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历o
   * @param year number  年份数字
   * @param month number  月份数字
   * @param date number  日期数字
   * @param isLeapM boolean  是否闰月
   * @return JSON object
   * @eg:console.log(calendar.lunar2solar(1987,9,10));
   */
  lunar2solar(
    year: number,
    month: number,
    date: number,
    isLeapM?: boolean,
  ): any {
    //参数区间1901正月初一 ~ 2099年冬月二十
    const isLeapMonth = isLeapM || false; // 是否闰月
    const leapMonth = this.leapMonth(year);

    if (year < 1901 || year > 2099) {
      const error = '目前只能支持到1901-2099年之间的数据查询';
      return error;
    }

    if (
      (year === 2099 && month > 11) ||
      (year === 2099 && month === 11 && date > 20)
    ) {
      const error =
        '目前只能支持到农历1901年正月初一至2099年冬月二十(2099.12.31)的精确查询';
      return error;
    }

    if (isLeapMonth && leapMonth !== month) {
      const error = '传参要求计算该闰月公历,该年得出的闰月与传参的月份并不同';
      return error;
    } // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同

    const day = this.solarMonthDays(year, month);
    let _day = day;

    //if month is leap, _day use leapDays method
    if (isLeapMonth) {
      _day = this.leapDays(year);
    }

    if (date > _day) {
      const error = `传参要求计算阴历月份的天数，该阴历月份并没有阴历${this.toChinaDay(
        date,
      )}`;
      return error;
    } //参数合法性效验

    //计算农历的时间差
    let offset = 0;
    for (let i = 1900; i < year; i++) {
      offset += this.lunarYearDays(i);
    }
    let leap = 0,
      isAdd = false;
    for (let i = 1; i < month; i++) {
      leap = this.leapMonth(year);
      if (!isAdd) {
        //处理闰月
        if (leap <= i && leap > 0) {
          offset += this.leapDays(year);
          isAdd = true;
        }
      }
      offset += this.lunarMonthDays(year, i);
    }

    //转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {
      offset += day;
    }

    //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    const map = Date.UTC(1900, 1, 30, 0, 0, 0);
    const calObj = new Date((offset + date - 31) * 86400000 + map);
    const cY = calObj.getUTCFullYear();
    const cM = calObj.getUTCMonth() + 1;
    const cD = calObj.getUTCDate();

    return this.solar2lunar(cY, cM, cD);
  }
}
export default Solar2lunar;
