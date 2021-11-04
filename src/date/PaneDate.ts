import { getRangeNumber } from './utils';

// 输入年月 获取 面板展示日期
class PaneDate {
  // 天   一   二   三   四   五   六
  private panelData = [];
  private year: number = undefined;
  private month: number = undefined;
  private firstWeek: number = undefined;
  private lastWeek: number = undefined;
  private monthNum: number = undefined;

  // 上个月天数
  private preMonthNum: number = undefined;
  private prePush: (number | string)[] = [];
  // 下个月天数
  private nextPush: (number | string)[] = [];
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
    console.log(`${this.year}-${this.month}-${this.monthNum}`, this.lastWeek);
    // 判断当前月份是否是1月
    if (this.month === 1) {
      this.preMonthNum = new Date(this.year - 1, 12, 0).getDate();
    } else if (this.month === 12) {
      this.preMonthNum = new Date(this.year, this.month - 1, 0).getDate();
    } else {
      this.preMonthNum = new Date(this.year, this.month - 1, 0).getDate();
    }
  };
  private calcNum = () => {
    this.panelData = getRangeNumber(1, this.monthNum + 1);
    if (this.firstWeek > 0 && this.isFill) {
      this.prePush = getRangeNumber(
        this.preMonthNum - this.firstWeek + 1,
        this.preMonthNum + 1,
      );
      this.panelData = this.prePush.concat(this.panelData);
    }
    if (this.lastWeek <= 6 && this.isFill) {
      this.nextPush = getRangeNumber(1, this.lastWeek + 1);
      this.panelData = this.panelData.concat(this.nextPush);
    }
  };

  getPaneDate = (year: number, month: number, isFill: boolean = true) => {
    this.init(year, month, isFill);
    this.calcNum();
    return this.panelData;
  };
}

export default new PaneDate();
