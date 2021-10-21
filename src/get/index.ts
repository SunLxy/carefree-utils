/*
 * 从 [rc-util](http://github.com/react-component/util) 借鉴
 */

const get = (input: any, path: (string | number)[]) => {
  let output = input;
  for (let i = 0; i < path.length; i += 1) {
    if (output === null || output === undefined) {
      return undefined;
    }
    output = output[path[i]];
  }
  return output;
};
export default get;
