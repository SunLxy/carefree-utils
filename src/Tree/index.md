---
title: Tree
---

> Tree 树形选择方法使用的类方法

### getInitMap

> 返回处理好的数据

### branchKey

> 传递一个 key 数组 --> 区分出半选和全选的数据

### getRowKey

> 返回主键值

### isCheck

> 判断是否选中。返回`true`或`false`

### isCheckHalf

> 判断是否半选状态。返回`true`或`false`

### isDisabled

> 判断是否禁用。返回`true`或`false`

### checkTrue

> 传递当前选中项的值，进行处理后，返回新的全选数据和半选数据。返回`AllKeys`和`HalfKeys`

### checkFalse

> 传递当前取消项的值，进行处理后，返回新的全选数据和半选数据 ,返回`AllKeys`和`HalfKeys`

### onCheck

> 传递当前值(内部判断是选中还是取消)，进行处理返回新的全选数据和半选数据 ,返回`AllKeys`和`HalfKeys`

### search

> 模糊查询值 传 key 值和模糊查询的字段

### 参数

```ts
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
```

### 案例

```tsx
import React, { useState } from 'react';
import { Tree } from 'carefree-utils';

if (window) {
  window.Tree = Tree;
}

const initValueData = [
  {
    label: '测试1',
    value: '1',
    children: [
      {
        label: '测试二级1',
        value: '1-0',
        children: [
          {
            label: '测试三级1',
            value: '1-0-0',
            children: [
              {
                label: '测试四级1',
                value: '1-0-0-1',
              },
              {
                label: '测试四级2',
                value: '1-0-0-2',
              },
            ],
          },
          {
            label: '测试三级2',
            value: '1-0-1',
          },
        ],
      },
    ],
  },
  {
    label: '测试2',
    value: '2',
    children: [
      {
        label: '测试二级2',
        value: '2-0',
        children: [
          {
            label: '测试三级3',
            value: '2-0-0',
          },
        ],
      },
      {
        label: '测试二级',
        value: '2-1',
      },
    ],
  },
  {
    label: '测试3',
    value: '3',
    children: [
      {
        label: '测试二级3',
        value: '3-0',
        children: [
          {
            label: '测试三级4',
            value: '3-0-0',
          },
          {
            label: '测试三级5',
            value: '3-0-1',
          },
        ],
      },
      {
        label: '测试二级4',
        value: '3-1',
      },
      {
        label: '测试二级5',
        value: '3-2',
      },
    ],
  },
];

export default () => {
  const init = React.useMemo(
    () =>
      new Tree({
        treeData: initValueData,
      }),
    [],
  );

  const onClick = () => {
    console.log('测试模糊查询', init.search('测试四级', 'label'));
    console.log(
      '打印选中情况',
      init.onCheck({ label: '测试三级5', value: '3-0-1' }),
    );
  };

  React.useEffect(() => {
    console.log('new Tree---->', init);
  }, []);

  const branchKey = () => {
    init.branchKey(['3-2', '3', '2-0-0', '2-0', '2']);
    console.log(init);
  };

  return (
    <div>
      <button onClick={onClick}>点击打印值</button>
      <button onClick={branchKey}>区分出半选和全选的数据</button>
    </div>
  );
};
```
