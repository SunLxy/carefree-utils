// 简单做了个数据拷贝
type CloneType = number | string | object | string | boolean | undefined;

const clone = (item: CloneType, removeUndefined: boolean) => {
  if (Array.isArray(item)) {
    const result = item.map((value) => {
      return clone(value, removeUndefined);
    });
    if (removeUndefined) {
      return result.filter((key: CloneType) => key !== undefined);
    } else {
      return result;
    }
  } else if (Object.prototype.toString.call(item) === '[object Object]') {
    const restlt = {};
    Object.entries(item).forEach(([key, value]) => {
      const resultKey = clone(value, removeUndefined);
      if (!(removeUndefined && resultKey === undefined)) {
        restlt[key] = resultKey;
      }
    });
    return restlt;
  }
  return item;
};

export default clone;
