---
title: Set
---

> 从 [rc-util](http://github.com/react-component/util) 借鉴

### demo

```tsx
import { set, get } from 'carefree-utils';

let obj = {};
let obj2 = {};
let cuObj = { a: 123 };

obj = set(obj, ['a', 'b', 'c', 'd'], cuObj, false);

console.log(set(undefined, ['a', 'b'], { c: 3 }, false));
// obj2= set(obj2,["a","b","c","d"],{a:223},false)

// const current = get(obj,["a","b","c","d"])
// const current3 = get(obj2,["a","b","c","d"])

// console.log("打印参数--->",obj)

// obj= set(obj,["a","b","c","d"],cuObj,false)
// obj2= set(obj2,["a","b","c","d"],{a:223},false)

// console.log("打印参数--->",obj)

// const current2 = get(obj,["a","b","c","d"])
// const current4 = get(obj2,["a","b","c","d"])

// console.log("判断值是否相等---》",current===current2)
// console.log("判断值是否相等2---》",current3===current4)
```
