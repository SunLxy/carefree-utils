---
title: Date
---

> 1. `MoveDate` 是传递一个日期处理成渲染数据列表的类方法
> 2. `paneDate` 传一个年份和月份 获取这个月份的面板渲染数据

### 参数

```ts
// new MoveDate 需要的参数
interface MoveDateProps {
  /** 最大选择日期  **/
  max?: string;
  /** 最小选择日期 */
  min?: string;
}

// paneDate 返回数组中单个数据参数
export interface solarTolunarReturn extends Solar2LunarReturn {
  year: string | number | undefined;
  date: string | number | undefined;
  month: string | number | undefined;
  currentType?: 'current' | 'next' | 'pre';
  [K: string]: any;
}
```

### demo

```tsx
import { MoveDate, paneDate } from 'carefree-utils';
import React from 'react';
if (window) {
  window.MoveDate = MoveDate;
  window.paneDate = paneDate;
}
// 案例
const getslit = () => {
  const dates = new MoveDate({
    // min: "2021-12-14 16:16:26",
    max: '2022-12-14 16:16:26',
  });
  const dates2 = new MoveDate({
    min: '2021-10-14 16:16:26',
    // max: '2022-12-14 16:16:26',
  });
  const dates3 = new MoveDate({
    min: '2021-12-14 16:16:26',
    max: '2022-12-14 16:16:26',
  });
  const dates4 = new MoveDate({
    min: '2021-12-14 16:16:26',
    max: '2022-12-14 16:16:26',
  });
  const dates5 = new MoveDate({
    min: '2021-12-14 16:16:26',
    max: '2022-12-14 16:16:26',
  });
  var resu = dates.move('2021-11-31 15:14:18');
  var resu2 = dates2.move('2021-09-17 15:14:18');
  var resu3 = dates3.move('2021-12-17 15:14:18');
  var resu4 = dates4.move('2021-12-17');
  var resu5 = dates5.move('2022-12-01');
  // eslint-disable-next-line no-console
  console.log('resu=---', resu);
  console.log('resu2=---', resu2);
  console.log('resu3=---', resu3);
  console.log('resu4=---', resu4);
  console.log('resu5=---', resu5);

  for (let i = 0; i < 12; i++) {
    console.log(`2021年${i + 1}月`, new paneDate().getPaneDate(2021, i + 1));
  }
};
getslit();
// //new MoveDate().move 返回格式
// const result = {
//   data: {
//     month: [
//       '01', '02', '03', '04',
//       '05', '06', '07', '08',
//       '09', 10, 11, 12
//     ],
//     date: [
//       '01', '02', '03', '04', '05', '06', '07',
//       '08', '09', 10, 11, 12, 13, 14,
//       15, 16, 17, 18, 19, 20, 21,
//       22, 23, 24, 25, 26, 27, 28,
//       29, 30, 31
//     ],
//     h: [
//       '01', '02', '03', '04', '05', '06',
//       '07', '08', '09', 10, 11, 12,
//       13, 14, 15, 16, 17, 18,
//       19, 20, 21, 22, 23
//     ],
//     m: [
//       '00', '01', '02', '03', '04', '05', '06', '07', '08',
//       '09', 10, 11, 12, 13, 14, 15, 16, 17,
//       18, 19, 20, 21, 22, 23, 24, 25, 26,
//       27, 28, 29, 30, 31, 32, 33, 34, 35,
//       36, 37, 38, 39, 40, 41, 42, 43, 44,
//       45, 46, 47, 48, 49, 50, 51, 52, 53,
//       54, 55, 56, 57, 58, 59
//     ],
//     s: [
//       '00', '01', '02', '03', '04', '05', '06', '07', '08',
//       '09', 10, 11, 12, 13, 14, 15, 16, 17,
//       18, 19, 20, 21, 22, 23, 24, 25, 26,
//       27, 28, 29, 30, 31, 32, 33, 34, 35,
//       36, 37, 38, 39, 40, 41, 42, 43, 44,
//       45, 46, 47, 48, 49, 50, 51, 52, 53,
//       54, 55, 56, 57, 58, 59
//     ]
//   },
//   new: { month: 12, date: 17, h: 15, m: 14, s: 18 }
// }
// // paneDate.getPaneDate(2021,10) 返回格式
//
export default () => <div />;
```
