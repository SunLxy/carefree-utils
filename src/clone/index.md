---
title: Clone
---

> `clone` 简单的数据拷贝

### demo

```tsx
import { clone } from 'carefree-utils';

const a = [1, 2, 3, 4, 5, 6, 7, 8];
const b = a;
const c = clone(b);
console.log(a, b, c);
console.log(a === b, a === c, b === c);
```
