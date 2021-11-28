---
title: GroupBy
---

### demo

```tsx
import { groupBy } from 'carefree-utils';
if (window) {
  window.groupBy = groupBy;
}
const list = [
  { a: 1, b: 1 },
  { a: 1, b: 2 },
  { a: 2, B: 2 },
  { a: 3, b: 4 },
];

console.log(groupBy(list, 'a'));
```
