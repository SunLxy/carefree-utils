---
title: Get
---

> 从 [rc-util](http://github.com/react-component/util) 借鉴

### demo

```tsx
import { get } from 'carefree-utils';
import React from 'react';
if (window) {
  window.get = get;
}
const obj = {
  a: { b: { c: 12 } },
  b: { c: { d: { e: 23 } } },
};

console.log('测试1--->', get(obj, ['a', 'b', 'c']));
console.log('测试2--->', get(obj, ['a', 'b', 'c', 'd']));
console.log('测试3--->', get(obj, ['b', 'c', 'd']));
export default () => <div />;
```
