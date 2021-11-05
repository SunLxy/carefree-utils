export interface MoveDateProps {
  /** 最大选择日期  **/
  max?: string;
  /** 最小选择日期 */
  min?: string;
}

export interface DateObjProps<T> {
  year?: T;
  month?: T;
  date?: T;
  h?: T;
  m?: T;
  s?: T;
}
export type KeyType = 'year' | 'month' | 'date' | 'h' | 'm' | 's';

export type StrType = 'min' | 'max' | 'maxEqual' | 'minEqual' | 'default';

/**
 * min:最小值，说明移动值小于最小值 (如果是最小值后面一直是最小值)
 * minEqual:最小值相等，
 * max:最大值，说明移动值大于最大值 (如果是最大值后面一直是最大值)
 * maxEqual:最大值相等
 * */
