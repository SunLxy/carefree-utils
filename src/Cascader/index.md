---
title: Cascader
---

> 1. `Cascader` 处理联动数据,

### 参数

```ts
// 每一项
export interface CascaderItemProps {
  [k: string]: any;
  children?: CascaderItemProps[];
}

type KeyType = number | string;

export interface CascaderProps {
  // 原始树形数据
  data: CascaderItemProps[];
  // 主键
  rowKey: KeyType | ((item: CascaderItemProps, layer: number) => string);
}
```

### demo

```tsx
import { Cascader } from 'carefree-utils';
import React from 'react';

const Item = (props) => {
  const { data, index, setArr, arr } = props;
  const onClick = (item) => {
    const { isChild } = item;
    if (isChild) {
      const arrs = arr.slice(0, index + 1);
      arrs[index] = { ...item };
      arrs.push({});
      setArr(arrs);
    }
  };

  return (
    <div
      style={{
        borderRight: '1px solid #ccc',
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      {data.map((item, key) => {
        return (
          <div
            key={key}
            onClick={onClick.bind(this, item)}
            style={{
              height: 30,
              width: 100,
              lineHeight: '30px',
              borderBottom: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

export default () => {
  const [arr, setArr] = React.useState([
    { label: '测试6', value: 6, isChild: true },
    {},
  ]);
  const cascader = React.useMemo(
    () =>
      new Cascader({
        data: [
          {
            label: '测试',
            value: 1,
            children: [{ label: '测试2', value: 2 }],
          },
          {
            label: '测试3',
            value: 3,
            children: [
              { label: '测试4', value: 4 },
              { label: '测试5', value: 5 },
            ],
          },
          {
            label: '测试6',
            value: 6,
            children: [
              {
                label: '测试7',
                value: 7,
                children: [{ label: '测试10', value: 10 }],
              },
              {
                label: '测试8',
                value: 8,
                children: [
                  {
                    label: '测试9',
                    value: 9,
                    children: [
                      {
                        label: '测试11',
                        value: 11,
                        children: [{ label: '测试12', value: 12 }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        rowKey: 'value',
      }),
    [],
  );

  // console.log("获取层级数据---->",cascader.getLayerData())
  // console.log("获取处理后父项对应子项的数据",cascader.getChildData())
  console.log('arr--->', arr);

  return (
    <div style={{ display: 'flex' }}>
      {arr.map((item, key) => {
        if (key === 0) {
          return (
            <Item
              key={key}
              index={key}
              data={cascader.getLayerData(1)}
              setArr={setArr}
              arr={arr}
            />
          );
        }
        return (
          <Item
            key={key}
            index={key}
            data={cascader.getChildData(arr[key - 1].value)}
            setArr={setArr}
            arr={arr}
          />
        );
      })}
    </div>
  );
};
```
