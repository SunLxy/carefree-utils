---
title: Solar2lunar
---

> 阳历和农历互转 从这个 [solarday2lunarday](https://github.com/liquanjiang/solarday2lunarday) 中搬来改造的，去除了 dayjs

### solar2lunar 阳历转农历

```ts
/** 阳历转农历 */
export type Solar2LunarType = (
  /** 阳历年*/
  Year?: number | string | Date,
  /** 阳历月*/
  Month?: number | string,
  /** 阳历天*/
  Day?: number | string,
) => Solar2LunarReturn;
```

```tsx
import React from 'react';
import { Solar2lunar, Solar2LunarReturn } from 'carefree-utils';

if (window) {
  window.Solar2lunar = Solar2lunar;
}

const solar2lunar: Solar2LunarReturn = new Solar2lunar().solar2lunar(
  2021,
  11,
  10,
);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### lunar2solar 农历转阳历

```ts
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
```

```tsx
import React from 'react';
import { Solar2lunar, Solar2LunarReturn } from 'carefree-utils';
const solar2lunar: Solar2LunarReturn = new Solar2lunar().lunar2solar(
  2021,
  11,
  10,
  false,
);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### getAllFestival 传入年份 获取节日列表

```ts
/** 传阳历年 获取整年 节日列表 */
export type GetAllFestivalType = (
  /** 阳历年 */
  year: string | number,
) => Festival[];
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().getAllFestival(2021);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### countSolarMonthDays 传入阳历年,月份，返回当月的阳历月天数

```ts
/**  传入阳历年,月份，返回当月的阳历月天数 */
export type CountSolarMonthDaysType = (
  /** 阳历年*/
  Year: number,
  /** 阳历月*/
  Month: number,
) => number | string;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().countSolarMonthDays(2021, 11);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### isLeapYear 传入阳历年获取是否闰年

```ts
/** 传入阳历年获取是否闰年  */
export type IsLeapYearType = (
  /** 阳历年*/
  Year: number,
) => boolean | string;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().isLeapYear(2021);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### getAnimal 年份转生肖

```ts
/** 年份转生肖  */
export type GetAnimalType = (
  /** 阳历年*/
  Year: number,
) => string;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().getAnimal(2021);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### toChinaDay 传入农历日期数字返回汉字表示法

```ts
/** 传入农历日期数字返回汉字表示法  */
export type ToChinaDayType = (
  /** 农历日期 */
  d: number,
) => string;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().toChinaDay(23);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### toChinaMonth 传入农历数字月份返回汉语通俗表示法

```ts
/** 传入农历数字月份返回汉语通俗表示法  */
export type ToChinaMonthType = (
  /** 农历月份 */
  m: number,
) => string | number;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().toChinaMonth(4);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### getTerm 传入公历(!)y 年获得该年第 n 个节气的公历日期

```ts
/** 传入公历(!)y年获得该年第n个节气的公历日期  */
export type GetTermType = (
  /** 阳历年份 */
  y: number,
  /** 第几个节气 */
  n: number,
) => number;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().getTerm(2021, 4);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### totianGandiZhi 传入 offset 偏移量返回干支

```ts
/**  传入offset偏移量返回干支  */
export type TotianGandiZhiType = (offset: number) => string;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().totianGandiZhi(4);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### getFestival 根据公历月份、公历日期、农历月份、农历日期、节气判断是否为节日，并范围节日对象

```ts
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
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().getFestival(
  11,
  10,
  10,
  6,
  false,
  2021 - 1,
);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### solarGetConstellationEn 公历月、日判断所属星座

```ts
/**  公历月、日判断所属星座 */
export type SolarGetConstellationEnType = (
  /** 星座编码  */
  Astro: string,
) => string;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().solarGetConstellationEn(
  '\u9b54\u7faf\u5ea7',
);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### solarGetConstellation 公历月、日判断所属星座

```ts
/**  公历月、日判断所属星座 */
export type SolarGetConstellationType = (
  /** 阳历月份  */
  m: number,
  /** 阳历天 */
  d: number,
) => string;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().solarGetConstellation(9, 10);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### lunarToTianGandiZhiYear 农历年份转换为干支纪年

```ts
/**  农历年份转换为干支纪年 */
export type LunarToTianGandiZhiYearType = (
  /** 阳历年  */
  year: number,
) => string;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().lunarToTianGandiZhiYear(2021);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### solarMonthDays 返回公历(!)y 年 m 月的天数

```ts
/**  返回公历(!)y年m月的天数 */
export type SolarMonthDaysType = (
  /** 阳历年  */
  year: number,
  /** 阳历月份  */
  m: number,
) => string | number;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().solarMonthDays(2021, 12);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### lunarMonthDays 返回农历 y 年 m 月（非闰月）的总天数，计算 m 为闰月时的天数请使用 leapDays 方法

```ts
/**  返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法 */
export type LunarMonthDaysType = (
  /** 阳历年  */
  year: number,
  /** 阳历月份  */
  m: number,
) => string | number;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().lunarMonthDays(2021, 11);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### lunarYearDays 返回农历 y 年 m 月（非闰月）的总天数，计算 m 为闰月时的天数请使用 leapDays 方法

```ts
/**  返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法 */
export type LunarYearDaysType = (
  /** 阳历年  */
  year: number,
) => string | number;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().lunarYearDays(2021);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### leapDays 返回农历 y 年闰月的天数 若该年没有闰月则返回 0

```ts
/**  返回农历y年闰月的天数 若该年没有闰月则返回0 */
export type LeapDaysType = (
  /** 阳历年  */
  year: number,
) => string | number;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().leapDays(2021);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### leapMonth 返回农历 y 年闰月是哪个月；若 y 年没有闰月 则返回 0

```ts
/**  返回农历y年闰月是哪个月；若y年没有闰月 则返回0 */
export type LeapMonthType = (
  /** 阳历年  */
  year: number,
) => string | number;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().leapMonth(2021);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```

### getYearCN 数字与中文照表

```ts
/**  数字与中文照表 */
export type GetYearCNType = (
  /** 阳历年  */
  year: number,
) => string | number;
```

```tsx
import React from 'react';
import { Solar2lunar } from 'carefree-utils';
const solar2lunar = new Solar2lunar().getYearCN(2021);
console.log(solar2lunar);
export default () => {
  return <div>{JSON.stringify(solar2lunar)}</div>;
};
```
