// 树形数据处理选择 (没有选择子集 保存父级半选状态的 不需要使用这个方法)

// 需要处理成的数据
// 1. 父级对应所有子集
// 2. 子集对应父级
// 3. 子集对应往上的所有父级

type KeyType = string | number;

export interface TreeItem {
  [key: string]: any;
  children?: TreeItem[];
}

export type RowKeyType = KeyType | ((item: TreeItem) => string);

export interface TreeProps {
  // 原始数据
  treeData: TreeItem[];
  // 主键 字段
  rowKey?: RowKeyType;
  /** 判断子项字段 */
  childField?: string;
  // 是否取消父级半选
  isCancelParenthalf?: boolean;
  /** 禁用项 id */
  disableId?: (string | number)[];
  //  全选数据
  AllKeys?: KeyType[] | KeyType;
  /** 半选数据  半选的时候不会存在单选 只处理多选情况 */
  HalfKeys?: KeyType[];
  // 是否多选
  multiple?: boolean;
  //父级是否可选
  isParentCheck?: boolean;
}

class Tree {
  // 主键字段
  private rowKey: RowKeyType = 'value';
  // 原始数据
  private treeData: TreeItem[] = [];
  /** 判断子项字段 */
  private childField: string = 'children';
  /** 禁用项 id */
  private disableId: (string | number)[] = [];
  // // 是否取消父级半选 子集取消选择，父级是否联动取消半选状态
  private isCancelParenthalf: boolean = false;
  // 是否多选
  private multiple: boolean = true;
  //父级是否可选
  private isParentCheck: boolean = true;

  //1.  父级对应所有子集
  private parentToADeepChild: Map<KeyType, KeyType[]> = new Map([]);
  // 2. 子集对应父级
  private childToParent: Map<KeyType, KeyType> = new Map([]);
  // 3. 子集对应往上的所有父级
  private childToDeepParent: Map<KeyType, KeyType[]> = new Map([]);
  /** 全选数据  */
  private AllKeys: KeyType[] | KeyType = [];
  /** 半选数据  半选的时候不会存在单选 只处理多选情况 */
  private HalfKeys: KeyType[] = [];

  /** 模糊查询 */
  private searchKey: string = undefined;
  /** 模糊查询 字段 */
  private searchKeyField: RowKeyType = this.rowKey;

  constructor(props: TreeProps) {
    this.init(props || { treeData: [] });
  }
  /** 获取内部存储的状态值 */
  get store() {
    return {
      rowKey: this.rowKey,
      treeData: this.treeData,
      childField: this.childField,
      disableId: this.disableId,
      isCancelParenthalf: this.isCancelParenthalf,
      multiple: this.multiple,
      isParentCheck: this.isParentCheck,
      parentToADeepChild: this.parentToADeepChild,
      childToParent: this.childToParent,
      childToDeepParent: this.childToDeepParent,
      AllKeys: this.AllKeys,
      HalfKeys: this.HalfKeys,
      searchKey: this.searchKey,
      searchKeyField: this.searchKeyField,
    };
  }

  private init = (props: TreeProps) => {
    if (Reflect.has(props, 'treeData')) {
      this.treeData = props.treeData;
    }
    if (Reflect.has(props, 'rowKey')) {
      this.rowKey = Reflect.get(props, 'rowKey');
    }
    if (typeof props.childField === 'string') {
      this.childField = props.childField;
    }
    if (Array.isArray(props.disableId)) {
      this.disableId = props.disableId;
    }
    if (Array.isArray(props.HalfKeys)) {
      this.HalfKeys = props.HalfKeys;
    }
    if (Reflect.has(props, 'AllKeys')) {
      this.AllKeys = Reflect.get(props, 'AllKeys');
    }
    if (typeof props.isCancelParenthalf === 'boolean') {
      this.isCancelParenthalf = props.isCancelParenthalf;
    }
    if (typeof props.multiple === 'boolean') {
      this.multiple = props.multiple;
    }
    this.deepTree(this.treeData, []);
  };
  // 递归树
  private deepTree = (tree: TreeItem[], parent: KeyType[]) => {
    tree.forEach((item) => {
      const { [this.childField]: children } = item;
      // 获取主键值
      const rowKey = this.getRowKey(item);
      if (Array.isArray(children) && children.length) {
        const next = parent.concat([rowKey]);
        this.deepTree(children, next);
      }
      this.changeMapData(parent, rowKey);
    });
  };
  // 处理 子集和父级对应关系
  private changeMapData = (parent: KeyType[], rowKey: string | number) => {
    // 1. 父级循环 处理 父级下所有子集的Map对象
    // 2. 直接rowKey 保存对应的父级parent
    // 3. 取 parent 最后一项 当做 rowKey 的父级rowKey
    parent.forEach((key) => {
      const arr = (this.parentToADeepChild.get(key) || []).concat([rowKey]);
      this.parentToADeepChild.set(key, arr);
    });
    if (parent.length) {
      // 子集对应的父级
      const parentKey = parent[parent.length - 1];
      this.childToParent.set(rowKey, parentKey);
      // 子集对应所有的父级数据
      this.childToDeepParent.set(rowKey, parent);
    }
  };

  /** selectedKeys 所有选中的值区分 全选和半选  */
  branchKey = (selectedKeys: (string | number)[]) => {
    selectedKeys.forEach((key) => {
      const childList = this.parentToADeepChild.get(key) || [];
      const fig = this.mapCheckTrue(childList, selectedKeys);
      if ((fig || !childList.length) && Array.isArray(this.AllKeys)) {
        this.AllKeys.push(key);
      } else if (childList) {
        this.HalfKeys.push(key);
      }
    });
  };
  /** 获取处理后的数据 */
  getInitMap = () => {
    return {
      /**  1.  父级对应所有子集 */
      parentToADeepChild: this.parentToADeepChild,
      /** 2. 子集对应父级 */
      childToParent: this.childToParent,
      /** 3. 子集对应往上的所有父级 */
      childToDeepParent: this.childToDeepParent,
    };
  };
  /**获取主键值  */
  getRowKey = (item: TreeItem) => {
    return typeof this.rowKey === 'function'
      ? this.rowKey(item)
      : item[this.rowKey];
  };

  /** 判断是否选中 */
  isCheck = (item: TreeItem) => {
    if (Array.isArray(this.AllKeys) && this.multiple) {
      return this.AllKeys.includes(this.getRowKey(item));
    }
    return this.AllKeys === this.getRowKey(item);
  };
  /** 判断是否半选 */
  isCheckHalf = (item: TreeItem) => {
    return this.HalfKeys.includes(this.getRowKey(item));
  };
  /** 判断是否禁用 */
  isDisabled = (item: TreeItem) => {
    return this.disableId.includes(this.getRowKey(item));
  };

  // 数组中过滤掉某个元素
  private filterData = (list: KeyType[], rowKeys: KeyType[] | KeyType) => {
    if (Array.isArray(rowKeys)) {
      return list.filter((key) => !rowKeys.includes(key));
    } else {
      return list.filter((key) => key !== rowKeys);
    }
  };

  // 判断是子项是否全部在全选中
  private mapCheckTrue = (
    childList: KeyType[],
    allKeys: KeyType[] | string | number,
  ) => {
    // 默认全部在里面
    let fig = true;
    // 判断 子项是否全部存在 全选中
    let lg = childList.length;
    let i = 0;
    while (i < lg) {
      // 如果存在禁用数据， 这里要做处理  排除禁用的数据才能算数
      if (
        Array.isArray(allKeys) &&
        !allKeys.includes(childList[i]) &&
        !this.disableId.includes(childList[i])
      ) {
        fig = false; // 不在里面
        break;
      }
      i++;
    }
    return fig;
  };

  // 选中处理数据
  private deepCheckTrue = (data: KeyType[]) => {
    // 数组反转 从最后一个往上找
    const rowKeyArr = data.reverse();
    // 父级key
    rowKeyArr.forEach((key) => {
      // 父级下的子集
      const childList = this.parentToADeepChild.get(key) || [];
      const check = this.mapCheckTrue(childList, this.AllKeys);
      if (check && Array.isArray(this.AllKeys)) {
        // 子项所有都在全选中 则当前项父级放入全选
        this.AllKeys = Array.from(new Set(this.AllKeys.concat([key])));
      } else {
        this.HalfKeys = Array.from(new Set(this.HalfKeys.concat([key])));
      }
    });
  };

  /** 选中数据处理 */
  checkTrue = (item: TreeItem) => {
    // 这块要做返回
    // 就是往上走 找父级的子集是否都在全选中 如果是则放入全选 如果不是放入半选    半选的父级一直半选
    // 当前加入 全选中
    const rowKey = this.getRowKey(item);
    if (!this.multiple) {
      // 单选情况走这个
      this.AllKeys = rowKey;
      return {
        AllKeys: rowKey,
        HalfKeys: [],
      };
    }

    if (!this.isParentCheck) {
      //不可选择父级的情况下
      this.AllKeys = (this.AllKeys as KeyType[]).concat([rowKey]);
      return {
        AllKeys: Array.from(
          new Set(this.filterData(this.AllKeys, this.disableId)),
        ),
        HalfKeys: [],
      };
    }
    // 以下走正常情况
    const childList = (this.parentToADeepChild.get(rowKey) || []).concat([
      rowKey,
    ]);
    // this.HalfKeys = this.filterData(this.HalfKeys, childList)
    this.AllKeys = (this.AllKeys as KeyType[]).concat(childList);
    this.deepCheckTrue(this.childToDeepParent.get(rowKey) || []);
    return {
      AllKeys: Array.from(
        new Set(this.filterData(this.AllKeys, this.disableId)),
      ),
      HalfKeys: Array.from(
        new Set(
          this.filterData(this.HalfKeys, this.disableId.concat(this.AllKeys)),
        ),
      ),
    };
  };

  // 判断是否全部存在全选
  private mapCheckFalse = (childList: KeyType[]) => {
    let fig = false;
    // 判断 子项是否全部存在 全选中
    let lg = childList.length;
    let i = 0;
    while (i < lg) {
      // 如果存在禁用数据， 这里要做处理  排除禁用的数据才能算数
      if (
        Array.isArray(this.AllKeys) &&
        this.AllKeys.includes(childList[i]) &&
        !this.disableId.includes(childList[i])
      ) {
        fig = true; // 不在里面
        break;
      }
      i++;
    }
    return fig;
  };

  private deepCheckFalse = (data: KeyType[]) => {
    // 数组反转 从最后一个往上找
    const rowKeyArr = data.reverse();
    rowKeyArr.forEach((key) => {
      // 判断子项是否全部选中
      // 父级下的子集
      const childList = this.parentToADeepChild.get(key) || [];
      const check = this.mapCheckFalse(childList);
      // 只有半选和 移出 半选 全选
      if (check) {
        // 存在一个在全选中
        // 全选中存在  因为这是取消 所有不会存在加入全选数据中
        this.HalfKeys = this.HalfKeys.concat([key]);
      } else {
        this.HalfKeys = this.filterData(this.HalfKeys, key);
      }
      // 全选中去除当期项
      this.AllKeys = this.filterData(this.AllKeys as KeyType[], key);
    });
  };

  /** 取消选中数据处理 */
  checkFalse = (item: TreeItem) => {
    // / 这块要做返回
    // 当前项和其子项删除半选和全选
    if (!this.multiple) {
      // 单选情况走这个
      this.AllKeys = undefined;
      return {
        AllKeys: undefined,
        HalfKeys: [],
      };
    }

    const rowKey = this.getRowKey(item);

    if (!this.isParentCheck) {
      //不可选择父级的情况下
      this.AllKeys = this.filterData(this.AllKeys as KeyType[], rowKey);
      return {
        AllKeys: Array.from(
          new Set(this.filterData(this.AllKeys, this.disableId)),
        ),
        HalfKeys: [],
      };
    }
    // 以下走正常情况
    const childList = (this.parentToADeepChild.get(rowKey) || []).concat([
      rowKey,
    ]);
    this.AllKeys = this.filterData(this.AllKeys as KeyType[], childList);
    this.deepCheckFalse(this.childToDeepParent.get(rowKey) || []);
    // 父级不进行取消操作
    if (this.isCancelParenthalf) {
      this.HalfKeys = this.HalfKeys.concat(
        this.childToDeepParent.get(rowKey) || [],
      );
    }
    return {
      AllKeys: Array.from(
        new Set(this.filterData(this.AllKeys, this.disableId)),
      ),
      HalfKeys: Array.from(
        new Set(
          this.filterData(this.HalfKeys, this.disableId.concat(this.AllKeys)),
        ),
      ),
    };
  };

  /** 判断查询值是否相等 */
  private checkSearchKey = (item: TreeItem) => {
    const field =
      typeof this.searchKeyField === 'function'
        ? this.searchKeyField(item)
        : this.searchKeyField;
    const { [field]: value } = item;
    const Rg = new RegExp(`${this.searchKey}`, 'g');
    return Rg.test(value);
  };

  /** 递归树 模糊查询数据 */
  private deepSearch = (tree: TreeItem[]) => {
    return tree.filter((item) => {
      const { [this.childField]: children, ...rest } = item;
      let list = [];
      let obj = { ...rest };
      // 判断value值是否相等
      const fig = this.checkSearchKey(item);
      if (Array.isArray(children)) {
        list = this.deepSearch(children);
        if (list.length) {
          obj[this.childField] = list;
        }
      }
      if (fig || list.length) {
        return true;
      }
      return false;
    });
  };

  /**
   * @description: 模糊查询
   * @param {string} key 模糊值
   * @param {string} keyField 模糊查询字段
   * @return {*}
   */
  search = (key: string, keyField?: RowKeyType) => {
    // 值没有返回原始数据
    if (!key) {
      return this.treeData;
    }
    this.searchKey = key;
    this.searchKeyField = keyField || this.rowKey;
    const result = this.deepSearch(this.treeData);
    return result;
  };

  // 点击选中 取消事件
  onCheck = (item: TreeItem) => {
    const check = this.isCheck(item);
    if (check) {
      // 如果已经是选中数据
      return this.checkFalse(item);
    }
    return this.checkTrue(item);
  };
}
export default Tree;
