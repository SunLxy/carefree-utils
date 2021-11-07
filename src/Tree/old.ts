/**
 * /*
 *
 * @format
 * @Author: SunLxy
 * @Description: 用于树形选择
 * @FilePath: /carefree-utils/src/Tree.ts
 */

const getChildKey = (
  data: Array<any>,
  ParentMap: Map<any, Array<any>>,
  parent: any,
  ChildParentMap: Map<any, any>,
  valueField: string,
  childrenField: string,
  parentArr: Array<any>,
  ChildDeepParentMap: Map<any, Array<any>>,
): Array<any> => {
  let list: Array<any> = [];
  data.forEach((item) => {
    list.push(item[valueField]);
    ChildParentMap.set(item[valueField], parent);
    ChildDeepParentMap.set(item[valueField], parentArr);
    if (item[childrenField]) {
      // eslint-disable-next-line no-shadow
      const parent = ParentMap.get(item[valueField]) || [];
      const childKeys = getChildKey(
        item[childrenField],
        ParentMap,
        item[valueField],
        ChildParentMap,
        valueField,
        childrenField,
        parentArr.concat([item[valueField]]),
        ChildDeepParentMap,
      );
      if (childKeys.length) {
        const cont = parent.concat(childKeys);
        list = list.concat(childKeys);
        ParentMap.set(item[valueField], cont);
      }
    }
  });
  return list;
};
/**
 * 获取父级下所有的子集
 * 获取子集对应的父级
 * 获取子集父级往上的所有父级
 *
 */
export interface GetParentChildKeyProps {
  /** 唯一值 字段 */
  valueField: string;
  /** 判断子项 字段 */
  childrenField: string;
  /** 树 数据 */
  treeData: Array<any>;
}
export interface GetParentChildKeyReturnProps {
  /** 父级下的所有子集 */
  ParentMap: Map<any, Array<any>>;
  /** 所有子集对应的父级 */
  ChildParentMap: Map<any, any>;
  /** 所有子集对应的往上找的所有父级 */
  ChildDeepParentMap: Map<any, Array<any>>;
}
/**
 * @description: 获取后面 树形 判断的数据
 */
export const getParentChildKey = ({
  valueField = 'value',
  childrenField = 'children',
  treeData,
}: GetParentChildKeyProps): GetParentChildKeyReturnProps => {
  // 父级下的所有子集
  const ParentMap = new Map<any, Array<any>>();
  // 所有子集对应的父级
  const ChildParentMap = new Map<any, any>();
  // 所有子集对应的往上找的所有父级
  const ChildDeepParentMap = new Map<any, Array<any>>();
  treeData.forEach((item) => {
    if (item[childrenField]) {
      const parent = ParentMap.get(item[valueField]) || [];
      const childKeys = getChildKey(
        item[childrenField],
        ParentMap,
        item[valueField],
        ChildParentMap,
        valueField,
        childrenField,
        [item[valueField]],
        ChildDeepParentMap,
      );
      if (childKeys.length) {
        const cont = parent.concat(childKeys);
        ParentMap.set(item[valueField], cont);
      }
    }
  });
  return {
    ParentMap,
    ChildParentMap,
    ChildDeepParentMap,
  };
};

/**
 * 取消
 * 1. 判断是否是父级
 * 2. 是 则把子集数据全部剔除 全选数据中
 * 3. 否 则 判断父级子集是否只有一个 如果是一个，则去除父级全选 往上找父级 同理
 * 3.1 如果父级下子集多个，判断子集是否存在选中，如果存在选中，不进行往上找父级操作
 * 3.2 如果父级下子集多个，子集不存在选中 父级剔除半选中，往上查找父级判断同理
 *
 * 选中
 * 1. 判断是否是父级
 * 2. 是  选中子集 并往上找父级，进行判断父级是否在全选或半选中  如果是半选，查看父级下子集加上当前选中的是否所有都在全选中，如果是 则父级加入全选
 * 往上查找父级 同理， 否则 不进行往上查找
 * 3. 否 查父级下所有子集是否都存在全选中，如果是则把父级加入全选 同理往上查找父级操作
 */

export interface ReturnProps {
  /** 全选数据 */
  AllKeys: Array<any>;
  /** 半选数据 */
  HalfKeys: Array<any>;
}

export interface FunProps {
  /** 全选数据 */
  AllKeys: Array<any>;
  /** 半选数据 */
  HalfKeys: Array<any>;
  /** 父级 Map数据 */
  ParentMap: Map<any, Array<any>>;
  /** 子级对应父级 Map数据 */
  ChildParentMap: Map<any, any>;
}
export interface GetCheckedProps extends FunProps {
  /** 取消/选中的 key */
  key: any;
}

export interface GetParentProps extends FunProps {
  /** 子项 key */
  childKey: any;
}

/**
 * @description:  取消负责    不选 和 半选
 */
export const getParentFalse = ({
  AllKeys,
  HalfKeys,
  childKey,
  ParentMap,
  ChildParentMap,
}: GetParentProps): ReturnProps => {
  const parentArr = ParentMap.get(childKey) || [];
  // 子项是否全部在全选中
  // 判断子项是否最少有一个在全选中
  let fig = false;
  AllKeys.forEach((k) => {
    if (parentArr.includes(k)) {
      fig = true;
    }
  });
  if (fig) {
    HalfKeys.push(childKey);
  } else {
    HalfKeys = HalfKeys.filter((k) => k !== childKey);
  }
  AllKeys = AllKeys.filter((k) => k !== childKey);
  const childParentKey = ChildParentMap.get(childKey);
  if (childParentKey) {
    return getParentFalse({
      AllKeys,
      HalfKeys,
      childKey: childParentKey,
      ParentMap,
      ChildParentMap,
    });
  }
  return {
    AllKeys,
    HalfKeys,
  };
};

/**
 * @description: 取消
 */
export const getCheckedFalse = ({
  AllKeys,
  HalfKeys,
  key,
  ParentMap,
  ChildParentMap,
}: GetCheckedProps): ReturnProps => {
  let All = AllKeys.filter((k) => k !== key);
  let Half = HalfKeys.filter((k) => k !== key);

  // 1. 判断是否在父级中
  const parentArr = ParentMap.get(key);
  if (parentArr) {
    // 是父级
    All = All.filter((k) => !parentArr.includes(k));
    Half = Half.filter((k) => !parentArr.includes(k));
  }
  // 父级子集 往上递归查询判断
  const childParentKey = ChildParentMap.get(key);
  // 存在父级再进行查找
  if (childParentKey) {
    const result = getParentFalse({
      AllKeys: All,
      HalfKeys: Half,
      childKey: childParentKey,
      ParentMap,
      ChildParentMap,
    });
    All = result.AllKeys;
    Half = result.HalfKeys;
  }
  return {
    AllKeys: Array.from(new Set(All)),
    HalfKeys: Array.from(new Set(Half)),
  };
};

/**
 * @description: 放入 负责全选和半选
 */
export const getParentTrue = ({
  AllKeys,
  HalfKeys,
  childKey,
  ParentMap,
  ChildParentMap,
}: GetParentProps): ReturnProps => {
  const parentArr = ParentMap.get(childKey) || [];
  // 判断是否都在全选中
  let fig = true;
  parentArr.forEach((k) => {
    if (!AllKeys.includes(k)) {
      fig = false;
    }
  });
  if (!fig) {
    HalfKeys.push(childKey);
    AllKeys = AllKeys.filter((k) => k !== childKey);
  } else {
    AllKeys.push(childKey);
    HalfKeys = HalfKeys.filter((k) => k !== childKey);
  }
  const childParentKey = ChildParentMap.get(childKey);
  if (childParentKey) {
    return getParentTrue({
      AllKeys,
      HalfKeys,
      childKey: childParentKey,
      ParentMap,
      ChildParentMap,
    });
  }
  return {
    AllKeys,
    HalfKeys,
  };
};

/**
 * @description: 选中
 */
export const getCheckedTrue = ({
  AllKeys,
  HalfKeys,
  key,
  ParentMap,
  ChildParentMap,
}: GetCheckedProps): ReturnProps => {
  let All = AllKeys.concat([]);
  let Half = HalfKeys.concat([]);

  // 1. 判断是否在父级中
  const parentArr = ParentMap.get(key);
  All.push(key);
  if (parentArr) {
    // 是父级
    All = All.concat(parentArr);
  }
  // 父级子集 往上递归查询判断
  const childParentKey = ChildParentMap.get(key);
  // 存在父级再进行查找
  if (childParentKey) {
    const result = getParentTrue({
      AllKeys: All,
      HalfKeys: Half,
      childKey: childParentKey,
      ParentMap,
      ChildParentMap,
    });
    All = result.AllKeys;
    Half = result.HalfKeys;
  }
  return {
    AllKeys: Array.from(new Set(All)),
    HalfKeys: Array.from(new Set(Half)),
  };
};
