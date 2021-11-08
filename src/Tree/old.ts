type KeyType = string | number;

export interface TreeItem {
  [key: string]: any;
  children?: TreeItem[];
}
export type RowKeyType = KeyType | ((item: TreeItem) => string);

export interface InitTreeMapProps {
  // 原始数据
  treeData: TreeItem[];
  // 主键 字段
  rowKey?: RowKeyType;
  /** 判断子项字段 */
  childField?: string;
}
// -------------- 处理原始数据
export const initTreeMap = (props: InitTreeMapProps) => {
  const { rowKey, childField, treeData } = props;
  const parentToADeepChild = new Map([]);
  const childToParent = new Map([]);
  const childToDeepParent = new Map([]);
  // 获取主键值
  const getRowKey = (item: TreeItem) => {
    return typeof rowKey === 'function' ? rowKey(item) : item[rowKey];
  };

  // 处理 子集和父级对应关系
  const changeMapData = (parent: KeyType[], rowKey: string | number) => {
    // 1. 父级循环 处理 父级下所有子集的Map对象
    // 2. 直接rowKey 保存对应的父级parent
    // 3. 取 parent 最后一项 当做 rowKey 的父级rowKey
    parent.forEach((key) => {
      const arr = ((parentToADeepChild.get(key) || []) as KeyType[]).concat([
        rowKey,
      ]);
      parentToADeepChild.set(key, arr);
    });
    if (parent.length) {
      // 子集对应的父级
      const parentKey = parent[parent.length - 1];
      childToParent.set(rowKey, parentKey);
      // 子集对应所有的父级数据
      childToDeepParent.set(rowKey, parent);
    }
  };
  // 递归树
  const deepTree = (tree: TreeItem[], parent: KeyType[]) => {
    tree.forEach((item) => {
      const { [childField]: children } = item;
      // 获取主键值
      const rowChildKey = getRowKey(item);
      if (Array.isArray(children) && children.length) {
        const next = parent.concat([rowChildKey]);
        deepTree(children, next);
      }
      changeMapData(parent, rowChildKey);
    });
  };
  deepTree(treeData, []);
  return {
    parentToADeepChild,
    childToParent,
    childToDeepParent,
  };
};
// ---------------------------------------
export interface CheckFunProps {
  /** 全选数据 */
  AllKeys: Array<KeyType>;
  /** 半选数据 */
  HalfKeys: Array<KeyType>;
  /** 父级 下所有子集 */
  ParentDeepChildMap: Map<KeyType, Array<KeyType>>;
  // 子集往上所有父级
  ChildDeepParentMap: Map<KeyType, KeyType>;
  // 禁用的ids
  disableId: KeyType[];
  key: KeyType;
}

// 数组中过滤掉某个元素
const filterData = (list: KeyType[], rowKeys: KeyType[] | KeyType) => {
  if (Array.isArray(rowKeys)) {
    return list.filter((key) => !rowKeys.includes(key));
  } else {
    return list.filter((key) => key !== rowKeys);
  }
};

// 判断是子项是否全部在全选中
const mapCheckTrue = (
  childList: KeyType[],
  AllKeys: KeyType[],
  disableId: KeyType[],
) => {
  // 默认全部在里面
  let fig = true;
  // 判断 子项是否全部存在 全选中
  let lg = childList.length;
  let i = 0;
  while (i < lg) {
    // 如果存在禁用数据， 这里要做处理  排除禁用的数据才能算数
    if (!AllKeys.includes(childList[i]) && !disableId.includes(childList[i])) {
      fig = false; // 不在里面
      break;
    }
    i++;
  }
  return fig;
};
// ------- 选中 ---------------
export const CheckedTreeTrue = ({
  AllKeys,
  HalfKeys,
  key,
  ParentDeepChildMap,
  ChildDeepParentMap,
  disableId = [],
}: CheckFunProps) => {
  // 选中的数据
  // 1. 把当前选中项和子项进行数据处理
  const childArr = ParentDeepChildMap.get(key) || [];
  let all = AllKeys.concat(childArr).concat([key]);
  // 2. 半选的最后做处理
  // 3. 获取父级
  const parentArr = (
    (ChildDeepParentMap.get(key) || []) as KeyType[]
  ).reverse();
  // 反转
  // 进行数据找父级下子集是否都在全选中
  parentArr.forEach((k) => {
    // 父级下的子集
    const childList = ParentDeepChildMap.get(k) || [];
    const check = mapCheckTrue(childList, all, disableId);
    if (check) {
      // 子项所有都在全选中 则当前项父级放入全选
      all = Array.from(new Set(all.concat([key])));
    } else {
      HalfKeys = Array.from(new Set(HalfKeys.concat([key])));
    }
  });

  return {
    AllKeys: Array.from(new Set(all)),
    HalfKeys: Array.from(new Set(filterData(HalfKeys, all))),
  };
};
// --------------------------

// 判断是否全部存在全选
const mapCheckFalse = (
  childList: KeyType[],
  AllKeys: KeyType[],
  disableId: KeyType[],
) => {
  let fig = false;
  // 判断 子项是否全部存在 全选中
  let lg = childList.length;
  let i = 0;
  while (i < lg) {
    // 如果存在禁用数据， 这里要做处理  排除禁用的数据才能算数
    if (AllKeys.includes(childList[i])) {
      fig = true; // 不在里面
      break;
    }
    i++;
  }
  return fig;
};

// ---------- 取消选中 ------
export const checkTreeFalse = ({
  AllKeys,
  HalfKeys,
  key,
  ParentDeepChildMap,
  ChildDeepParentMap,
  disableId = [],
}: CheckFunProps) => {
  // 获取取消的数据
  const childList = (ParentDeepChildMap.get(key) || []).concat([key]);
  AllKeys = filterData(AllKeys, childList);
  // 子集往上所有 父级
  const parentArr = (
    (ChildDeepParentMap.get(key) || []) as KeyType[]
  ).reverse();
  parentArr.forEach((k) => {
    // 判断子项是否全部选中
    // 父级下的子集
    const childList = ParentDeepChildMap.get(k) || [];
    const check = mapCheckFalse(childList, AllKeys, disableId);
    // 只有半选和 移出 半选 全选
    if (check) {
      // 全选中存在  因为这是取消 所有不会存在加入全选数据中
      HalfKeys = HalfKeys.concat([k]);
    } else {
      HalfKeys = filterData(HalfKeys, k);
    }
    // 全选中去除当期项
    AllKeys = filterData(AllKeys, key);
  });

  return {
    AllKeys: Array.from(new Set(filterData(AllKeys, disableId))),
    HalfKeys: Array.from(
      new Set(filterData(HalfKeys, disableId.concat(AllKeys))),
    ),
  };
};
