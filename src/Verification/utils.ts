export interface Rule {
  /** 必填 */
  required?: boolean;
  /** 提示信息 */
  message?: string;
  /** 数值 长度 */
  /** 字符串长度 */
  maxLength?: number;
  minLength?: number;
  /** 数值大小 */
  max?: number;
  min?: number;
  /** 字符串 正则 */

  /** 直接自定义方法 */
}

/**
 * @description: 校验数组
 * @param {*} value
 * @param {*} list
 * @return {*}
 */
export const checkArray = (value: any[], list: Rule[]) => {};
/**
 * @description: 校验对象
 * @param {*} value
 * @param {*} list
 * @return {*}
 */
export const checkObject = (value: object, list: Rule[]) => {};

/**
 * @description: 校验字符串
 * @param {*} value
 * @param {*} list
 * @return {*}
 */
export const checkString = (value: string, list: Rule[]) => {};

/**
 * @description: 校验数值
 * @param {*} value
 * @param {*} list
 * @return {*}
 */
export const checkNumber = (value: number, list: Rule[]) => {};

/**
 * @description: 校验布尔值
 * @param {*} value
 * @param {*} list
 * @return {*}
 */
export const checkBoolean = (value: boolean, list: Rule[]) => {};
