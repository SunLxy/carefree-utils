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
  const { data, index, setArr, arr, checkKey, className = '' } = props;
  const onClick = (item, check) => {
    const { isChild } = item;

    const arrs = arr.slice(0, index + 1);
    arrs[index] = { ...item };
    if (isChild) {
      // 有子项数据再加一个用于渲染
      arrs.push({});
    }
    // 选中的不用再次进行更新状态
    if (!check) {
      setArr(arrs);
    }
  };

  return (
    <div
      style={{
        borderRight: '1px solid #ccc',
        paddingLeft: 10,
        paddingRight: 10,
        overflow: 'hidden',
      }}
      className={className}
    >
      {data.map((item, key) => {
        return (
          <div
            key={key}
            onClick={onClick.bind(this, item, checkKey === item.value)}
            style={{
              height: 30,
              width: 100,
              lineHeight: '30px',
              borderBottom: '1px solid #ccc',
              cursor: 'pointer',
              background: checkKey === item.value ? 'red' : 'none',
              color: checkKey === item.value ? '#fff' : '#000',
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
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
    .div2{
      animation: 1s in-out forwards;
    }
    @keyframes in-out {
      0% {
        width: 0;
      }
      100% {
        width: 100px;
      }
    }`;
    style.type = 'text/css';
    document.head.append(style);
  }, []);

  // 每列选中数据存储 默认最少一个，
  const [arr, setArr] = React.useState([
    { label: '测试6', value: 6, isChild: true },
    {},
  ]);

  // 对 原始数据进行处理
  const cascader = React.useMemo(
    () =>
      new Cascader({
        // 原始数据
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
        // 主键
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
          // 第一个默认取 层级数据 第一级数据
          return (
            <Item
              key={key}
              index={key}
              data={cascader.getLayerData(1)}
              setArr={setArr}
              arr={arr}
              checkKey={item.value}
            />
          );
        }
        // 其他情况取上一级的主键值 从子项数据取
        return (
          <Item
            key={key}
            index={key}
            data={cascader.getChildData(arr[key - 1].value)}
            setArr={setArr}
            checkKey={item.value}
            className={Object.keys(item).length ? '' : 'div2'}
            arr={arr}
          />
        );
      })}
    </div>
  );
};
```
