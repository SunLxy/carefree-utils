# Sortable

依赖于 `immutability-helper`和`lodash`

## getPathArr

路径进行转换成数组

## getUpdatePath

路径数组格式化成 `lodash`中的`update`需要的那种`a.children.b.children.c`这种格式

## getPathData

根据路径获取数据

## clearEmtyData

清除空数据

## getNewAndOld

获取新老数据位置

## onEnd

1. 此方法为`sortablejs`中`onEnd`事件触发后数据处理
2. 此方法可还用于`sortablejs`中的`onUpdate`事件和`onAdd`事件
3. 这只是一个方法集合，因此 dom 操作部分在下方代码中

```tsx
import React, { useState, useRef } from 'react';
import Sortable from 'sortablejs';
import { onEnd, getNewAndOld } from 'carefree-utils';
export interface SortableProps {
  sortProps?: Sortable.Options;
  children?: React.ReactNode;
  nodeTag?: string;
  warpProps?: any;
}
const ItemWarp = (props: SortableProps) => {
  const { sortProps, children, nodeTag = 'div', warpProps = {} } = props;
  const sortTableRef = useRef<Sortable>();

  const newSortable = (node: HTMLElement) => {
    if (!node) {
      sortTableRef.current && sortTableRef.current.destroy();
      return;
    }
    sortTableRef.current = Sortable.create(node, {
      ...(sortProps || {}),
    });
  };
  return React.createElement(
    nodeTag,
    { ...(warpProps || {}), ref: newSortable },
    React.Children.map(children as React.ReactElement<any>[], (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          'data-id': child.key,
        } as any);
      }
    }),
  );
};

export default () => {
  const [dataList, setDataList] = useState([
    {
      title: ' 测试1',
      children: [
        { title: 'item 1.1' },
        { title: 'item 1.2' },
        { title: 'item 1.3' },
        { title: 'item 1.4' },
        { title: 'item 1.5' },
        { title: 'item 1.6' },
      ],
    },
    {
      title: ' 测试2',
      children: [
        { title: 'item 2.1' },
        { title: 'item 2.2' },
        { title: 'item 2.3' },
        { title: 'item 2.4' },
        { title: 'item 2.5' },
        { title: 'item 2.6' },
      ],
    },
    {
      title: ' 测试3',
      children: [
        { title: 'item 3.1' },
        { title: 'item 3.2' },
        { title: 'item 3.3' },
        { title: 'item 3.4' },
        { title: 'item 3.5' },
        { title: 'item 3.6' },
      ],
    },
  ]);

  const sortProps: Sortable.Options = {
    group: 'nodes',
    animation: 300,
    fallbackOnBody: true,
    onEnd: (evt: Sortable.SortableEvent) => {
      const {
        oldIndex,
        newIndex,
        pullMode,
        oldParentPath,
        oldPath,
        newParentPath,
        newPath,
      } = getNewAndOld(evt);
      const item = {
        element: evt.item,
        clone: evt.clone,
        parentElement: evt.from,
      };
      // 需要对dom节点进行操作
      // 1. 当前内部进行 排序
      if (!pullMode) {
        /* eslint-disable */
        if (item.parentElement !== null) {
          item.parentElement.removeChild(evt.item);
        }
        if (item.parentElement) {
          const refChild = item.parentElement.childNodes[oldIndex] || null;
          if (refChild) {
            item.parentElement.insertBefore(evt.item, refChild);
          } else {
            item.parentElement.appendChild(evt.item);
          }
        }
      } else if (pullMode === 'clone') {
        // 克隆添加的 移除当前所在的位置
        if (item.element && item.element.parentElement) {
          item.element.parentElement.removeChild(item.element);
        }
      } else {
        // 不是内部排序 不是 克隆 添加
        if (item.element && item.element.parentElement) {
          item.element.parentElement.removeChild(item.element);
        }
        if (item.parentElement) {
          const refChild = item.parentElement.childNodes[oldIndex] || null;
          if (refChild) {
            item.parentElement.insertBefore(evt.item, refChild);
          } else {
            item.parentElement.appendChild(evt.item);
          }
        }
      }
      const result = onEnd(evt, dataList, () => {});
      setDataList(result);
    },
  };

  const loop = (data: any[], parentId?: string) => {
    return (data || []).map((item, index: number) => {
      const dataId = parentId ? `${parentId}-${index}` : `${index}`;
      if (item.children) {
        return (
          <ItemWarp
            sortProps={sortProps}
            key={dataId}
            warpProps={{ 'data-id': dataId, style: { padding: 20 } }}
          >
            {loop(item.children, `${dataId}`)}
          </ItemWarp>
        );
      }
      return <div key={dataId}>{item.title}</div>;
    });
  };

  return (
    <div>
      <ItemWarp sortProps={sortProps} warpProps={{ style: { padding: 20 } }}>
        {loop(dataList)}
      </ItemWarp>
    </div>
  );
};
```
