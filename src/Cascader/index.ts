// 级联选择数据

// 初始化把整个树形数据传递进来

export interface CascaderItemProps {
  [k: string]: any;
  children?: CascaderItemProps[];
}

type KeyType = number | string;

export interface CascaderProps {
  data: CascaderItemProps[];
  rowKey: KeyType | ((item: CascaderItemProps, layer: number) => string);
}

class Cascader {
  // 主键字段
  private rowKey: CascaderProps['rowKey'] = 'value';
  // 原始数据
  private tree: CascaderItemProps[] = [];
  // rowKey 对应的子项数据
  private treeKeyToChildMap: Map<KeyType, CascaderItemProps[]> = new Map([]);

  // 数据根据层级分组
  private treeLayerMap: Map<number, CascaderItemProps[]> = new Map([]);

  constructor(props: CascaderProps) {
    this.rowKey = props.rowKey;
    this.tree = props.data;
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
  private mapList = (dataList: CascaderItemProps[]) => {
    return dataList.map((item) => {
      const { children, ...rest } = item;
      // 是否存在子项
      let isChild: boolean = false;
      if (Array.isArray(children) && children.length) {
        isChild = true;
      }
      return { ...rest, isChild };
    });
  };

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
