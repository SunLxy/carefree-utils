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
export type keyType = 'year' | 'month' | 'date' | 'h' | 'm' | 's';

export type StrType = 'min' | 'max' | 'maxEqual' | 'minEqual' | 'default';
