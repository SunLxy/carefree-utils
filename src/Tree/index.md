---
title: Tree
---

## Tree 树形选择方法

### 获取树形映射数据 getParentChildKey

```ts
// 获取树形映射数据
export interface GetParentChildKeyProps {
  /** 唯一值 字段 */
  valueField: string;
  /** 判断子项 字段 */
  childrenField: string;
  /** 树 数据 */
  treeData: Array<any>;
}
```

### 选中方法 getCheckedTrue

```ts
// 返回值
export interface ReturnProps {
  /** 全选数据 */
  AllKeys: Array<any>;
  /** 半选数据 */
  HalfKeys: Array<any>;
}
// 参数
export interface GetCheckedProps {
  /** 取消/选中的 key */
  key: any;
  /** 全选数据 */
  AllKeys: Array<any>;
  /** 半选数据 */
  HalfKeys: Array<any>;
  /** 父级 Map数据 */
  ParentMap: Map<any, Array<any>>;
  /** 子级对应父级 Map数据 */
  ChildParentMap: Map<any, any>;
}
```

### 取消方法 getCheckedFalse

```ts
// 返回值
export interface ReturnProps {
  /** 全选数据 */
  AllKeys: Array<any>;
  /** 半选数据 */
  HalfKeys: Array<any>;
}
// 参数
export interface GetCheckedProps {
  /** 取消/选中的 key */
  key: any;
  /** 全选数据 */
  AllKeys: Array<any>;
  /** 半选数据 */
  HalfKeys: Array<any>;
  /** 父级 Map数据 */
  ParentMap: Map<any, Array<any>>;
  /** 子级对应父级 Map数据 */
  ChildParentMap: Map<any, any>;
}
```
