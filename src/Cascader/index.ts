import groupBy from './../groupBy';

// 级联选择数据

// 初始化把整个树形数据传递进来

export interface CascaderItemProps {
  [k: string]: any;
  children?: CascaderItemProps[];
}

type KeyType = number | string;

export interface CascaderProps {
  data: CascaderItemProps[];
  rowKey?: KeyType | ((item: CascaderItemProps, layer: number) => string);
  //---------- 下面这两个是用于转换拼音使用的
  rowTransform?: (item: CascaderItemProps) => CascaderItemProps;
  // ----------- 用于拼音转换后的数据排序使用
  rowKeyGroup?: KeyType;
}

class Cascader {
  // 主键字段
  private rowKey: CascaderProps['rowKey'] = 'value';
  // 原始数据
  private tree: CascaderItemProps[] = [];
  // rowKey 对应的子项数据
  private treeKeyToChildMap: Map<KeyType, CascaderItemProps[]> = new Map([]);
  // 数组中那个字段用于数据分组
  private rowKeyGroup: KeyType = 'pinYin';
  // 每条数据做转换
  private rowTransform: CascaderProps['rowTransform'] = undefined;

  // 数据根据层级分组
  private treeLayerMap: Map<number, CascaderItemProps[]> = new Map([]);

  constructor(props: CascaderProps) {
    this.rowKey = props.rowKey;
    this.tree = props.data;
    if (typeof props.rowTransform === 'function') {
      this.rowTransform = props.rowTransform;
    }
    this.init();
  }
  // 对树形数据进行处理
  private init = () => {
    this.deepTree(this.tree, 1);
  };
  // 递归数据进行存储  layer 层级
  private deepTree = (tree: CascaderItemProps[], layer: number) => {
    tree.forEach((item) => {
      const { children, ...rest } = item;
      // 是否存在子项
      let isChild: boolean = false;
      // 获取主键值
      const rowKey =
        typeof this.rowKey === 'function'
          ? this.rowKey(item, layer)
          : item[this.rowKey];
      if (Array.isArray(children) && children.length) {
        isChild = true;
        this.treeKeyToChildMap.set(rowKey, this.mapList(children));
        this.deepTree(item.children, layer + 1);
      }
      // 存层级数据
      let layerArr = this.treeLayerMap.get(layer) || [];
      layerArr.push({ ...rest, isChild });
      this.treeLayerMap.set(layer, layerArr);
    });
  };

  // 对数据进行去除children字段保存
  mapList = (dataList: CascaderItemProps[]) => {
    return dataList.map((item) => {
      const { children, ...rest } = item;
      // 是否存在子项
      let isChild: boolean = item.isChild || false;
      if (Array.isArray(children) && children.length) {
        isChild = true;
      }
      return { ...rest, isChild };
    });
  };

  //数据转换
  transform = (list: CascaderItemProps[]) => {
    let result = list;
    if (typeof this.transform === 'function') {
      result = list.map((item) => this.rowTransform(item));
    }
    return result;
  };
  // 排序
  sort = (list: CascaderItemProps[]) => {
    // 先做转换
    const transform = this.transform(list);
    // 1. 先排序
    const sortResult = transform.sort(
      (a, b) => a[this.rowKeyGroup] - b[this.rowKeyGroup],
    );
    // 2.  分组
    const group = groupBy(sortResult, this.rowKeyGroup);
    // 3. 分组数据  分组数据排序
    const resultKeys = Object.keys(group).sort();
    // 4. 连接数据
    let resultList = [];
    resultKeys.forEach((k) => {
      const [first, ...rest] = group[k] || [];
      resultList = resultList.concat([{ ...first, groupByName: k }, ...rest]);
    });
    return {
      resultList,
      resultKeys,
    };
  };
  // 如果需要做数据转换的使用这个 如果传 layer 则使用 层级数据进行返回
  getRenderList = (rowKey: KeyType, layer?: number) => {
    let resultList = this.treeKeyToChildMap.get(rowKey) || [];
    if (typeof layer === 'number') {
      resultList = this.treeLayerMap.get(layer) || [];
    }
    return this.sort(resultList);
  };

  // 设置 下属节点
  setTreeKeyToChildMap(list: CascaderItemProps[], rowKey: KeyType) {
    this.treeKeyToChildMap.set(rowKey, list);
  }

  // 获取单个或者全部处理后Map数据
  getChildData = (rowKey?: KeyType) => {
    if (typeof rowKey === 'number' || typeof rowKey === 'string') {
      return this.treeKeyToChildMap.get(rowKey) || [];
    }
    return this.treeKeyToChildMap;
  };

  // 传递多个返回多个
  getChildDataArr = (rowKey: KeyType[]) => {
    return rowKey.map((key) => this.treeKeyToChildMap.get(key));
  };

  // 传递多个返回多个
  getChildDataObj = (rowKey: KeyType[]) => {
    const result: { [key: string]: CascaderItemProps[] } = {};
    rowKey.forEach((key) => {
      result[key] = this.treeKeyToChildMap.get(key);
    });
    return result;
  };
  // 获取层级数据
  getLayerData = (layer?: number) => {
    if (typeof layer === 'number') {
      return this.treeLayerMap.get(layer) || [];
    }
    return this.treeLayerMap;
  };
}

export default Cascader;
