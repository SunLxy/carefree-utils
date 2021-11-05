import {
  getRangeNumber,
  solarTolunarList,
  solarTolunarReturn,
  GetMonthTermReturn,
  getMonthTerm,
} from './utils';
// 输入年月 获取 面板展示日期
class PaneDate {
  // 天   一   二   三   四   五   六
  private panelData: solarTolunarReturn[] = [];
  private year: number = undefined;
  private month: number = undefined;
  private firstWeek: number = undefined;
  private lastWeek: number = undefined;
  private monthNum: number = undefined;
  private term: GetMonthTermReturn = {};

  // 上个月天数
  private preYear: number = undefined;
  private preMonth: number = undefined;
  private preMonthNum: number = undefined;
  private prePush: solarTolunarReturn[] = [];
  private preTerm: GetMonthTermReturn = {};
  // 下个月天数
  private nextYear: number = undefined;
  private nextMonth: number = undefined;
  private nextPush: solarTolunarReturn[] = [];
  private nextTerm: GetMonthTermReturn = {};
  // 是否需要前后其他月份日期填充
  private isFill: boolean = true;

  private init = (year: number, month: number, isFill: boolean = true) => {
    this.year = year;
    this.month = month;
    this.isFill = isFill;
    this.monthNum = new Date(this.year, this.month, 0).getDate();
    this.firstWeek = new Date(`${this.year}-${this.month}-01`).getDay();
    this.lastWeek =
      6 - new Date(`${this.year}=${this.month}-${this.monthNum}`).getDay();
    // 判断当前月份是否是1月
    if (this.month === 1) {
      this.preYear = this.year - 1;
      this.nextYear = this.year;
      this.nextMonth = this.month + 1;
      this.preMonth = 12;
    } else if (this.month === 12) {
      this.preYear = this.year;
      this.preMonth = this.month - 1;
      this.nextYear = this.year + 1;
      this.nextMonth = 1;
    } else {
      this.preYear = this.year;
      this.nextYear = this.year;
      this.nextMonth = this.month + 1;
      this.preMonth = this.month - 1;
    }
    this.preTerm = getMonthTerm(this.preYear, this.preMonth - 1);
    this.term = getMonthTerm(this.year, this.month - 1);
    this.nextTerm = getMonthTerm(this.nextYear, this.nextMonth - 1);
    this.preMonthNum = new Date(this.preYear, this.preMonth, 0).getDate();
  };
  private calcNum = () => {
    this.panelData = solarTolunarList(
      this.year,
      this.month,
      getRangeNumber(1, this.monthNum + 1),
      this.term,
      'current',
    );
    if (this.firstWeek > 0 && this.isFill) {
      this.prePush = solarTolunarList(
        this.preYear,
        this.preMonth,
        getRangeNumber(
          this.preMonthNum - this.firstWeek + 1,
          this.preMonthNum + 1,
        ),
        this.preTerm,
        'pre',
      );
      this.panelData = this.prePush.concat(this.panelData);
    }
    if (this.lastWeek <= 6 && this.isFill) {
      this.nextPush = solarTolunarList(
        this.nextYear,
        this.nextMonth,
        getRangeNumber(1, this.lastWeek + 1),
        this.nextTerm,
        'next',
      );
      this.panelData = this.panelData.concat(this.nextPush);
    }
  };

  getPaneDate = (year: number, month: number, isFill: boolean = true) => {
    this.init(year, month, isFill);
    this.calcNum();
    return this.panelData;
  };
}

export default PaneDate;
