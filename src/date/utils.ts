import Solar2lunar, { Solar2LunarReturn } from './../Solarday2lunarday';
export const getNumString = (value: number | string) => {
  if (typeof value === 'number' && value < 10) {
    return `0${value}`;
  } else if (typeof value === 'string' && Number(value) < 10) {
    return `0${Number(value)}`;
  }
  return value;
};

export const getRangeNumber = (start: number, end: number) => {
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

export interface solarTolunarReturn extends Solar2LunarReturn {
  year: string | number | undefined;
  date: string | number | undefined;
  month: string | number | undefined;
  currentType?: 'current' | 'next' | 'pre';
  [K: string]: any;
}

// 日期转农历对象
export const solarTolunarList = (
  year: string | number,
  month: number | string,
  list: (string | number)[],
  curr: solarTolunarReturn['currentType'],
) => {
  return list.map((key) => {
    const result = Solar2lunar.solar2lunar(year, month, key) || {};
    return {
      ...result,
      date: getNumString(key),
      year,
      month: getNumString(month),
      currentType: curr,
    };
  });
};
