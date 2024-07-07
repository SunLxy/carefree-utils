"use strict";(self.webpackChunkcarefree_utils=self.webpackChunkcarefree_utils||[]).push([[221],{91375:function(f,t,e){e.r(t),e.d(t,{demos:function(){return b}});var v=e(17061),r=e.n(v),m=e(17156),I=e.n(m),p=e(67294),x=e(3484),b={"src-tree-demo-0":{component:p.memo(p.lazy(I()(r()().mark(function i(){var c,n,u,o,s;return r()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Promise.resolve().then(e.t.bind(e,67294,19));case 2:return c=a.sent,n=c.default,a.next=6,Promise.resolve().then(e.bind(e,53018));case 6:return u=a.sent,o=u.Tree,window&&(window.Tree=o),s=[{label:"\u6D4B\u8BD51",value:"1",children:[{label:"\u6D4B\u8BD5\u4E8C\u7EA71",value:"1-0",children:[{label:"\u6D4B\u8BD5\u4E09\u7EA71",value:"1-0-0",children:[{label:"\u6D4B\u8BD5\u56DB\u7EA71",value:"1-0-0-1"},{label:"\u6D4B\u8BD5\u56DB\u7EA72",value:"1-0-0-2"}]},{label:"\u6D4B\u8BD5\u4E09\u7EA72",value:"1-0-1"}]}]},{label:"\u6D4B\u8BD52",value:"2",children:[{label:"\u6D4B\u8BD5\u4E8C\u7EA72",value:"2-0",children:[{label:"\u6D4B\u8BD5\u4E09\u7EA73",value:"2-0-0"}]},{label:"\u6D4B\u8BD5\u4E8C\u7EA7",value:"2-1"}]},{label:"\u6D4B\u8BD53",value:"3",children:[{label:"\u6D4B\u8BD5\u4E8C\u7EA73",value:"3-0",children:[{label:"\u6D4B\u8BD5\u4E09\u7EA74",value:"3-0-0"},{label:"\u6D4B\u8BD5\u4E09\u7EA75",value:"3-0-1"}]},{label:"\u6D4B\u8BD5\u4E8C\u7EA74",value:"3-1"},{label:"\u6D4B\u8BD5\u4E8C\u7EA75",value:"3-2"}]}],a.abrupt("return",{default:function(){var d=n.useMemo(function(){return new o({treeData:s})},[]),h=function(){console.log("\u6D4B\u8BD5\u6A21\u7CCA\u67E5\u8BE2",d.search("\u6D4B\u8BD5\u56DB\u7EA7","label")),console.log("\u6253\u5370\u9009\u4E2D\u60C5\u51B5",d.onCheck({label:"\u6D4B\u8BD5\u4E09\u7EA75",value:"3-0-1"}))};n.useEffect(function(){console.log("new Tree---->",d)},[]);var y=function(){d.branchKey(["3-2","3","2-0-0","2-0","2"]),console.log(d)};return n.createElement("div",null,n.createElement("button",{onClick:h},"\u70B9\u51FB\u6253\u5370\u503C"),n.createElement("button",{onClick:y},"\u533A\u5206\u51FA\u534A\u9009\u548C\u5168\u9009\u7684\u6570\u636E"))}});case 11:case"end":return a.stop()}},i)})))),asset:{type:"BLOCK",id:"src-tree-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import React, { useState } from 'react';
import { Tree } from 'carefree-utils';

if (window) {
  window.Tree = Tree;
}

const initValueData = [
  {
    label: '\u6D4B\u8BD51',
    value: '1',
    children: [
      {
        label: '\u6D4B\u8BD5\u4E8C\u7EA71',
        value: '1-0',
        children: [
          {
            label: '\u6D4B\u8BD5\u4E09\u7EA71',
            value: '1-0-0',
            children: [
              {
                label: '\u6D4B\u8BD5\u56DB\u7EA71',
                value: '1-0-0-1',
              },
              {
                label: '\u6D4B\u8BD5\u56DB\u7EA72',
                value: '1-0-0-2',
              },
            ],
          },
          {
            label: '\u6D4B\u8BD5\u4E09\u7EA72',
            value: '1-0-1',
          },
        ],
      },
    ],
  },
  {
    label: '\u6D4B\u8BD52',
    value: '2',
    children: [
      {
        label: '\u6D4B\u8BD5\u4E8C\u7EA72',
        value: '2-0',
        children: [
          {
            label: '\u6D4B\u8BD5\u4E09\u7EA73',
            value: '2-0-0',
          },
        ],
      },
      {
        label: '\u6D4B\u8BD5\u4E8C\u7EA7',
        value: '2-1',
      },
    ],
  },
  {
    label: '\u6D4B\u8BD53',
    value: '3',
    children: [
      {
        label: '\u6D4B\u8BD5\u4E8C\u7EA73',
        value: '3-0',
        children: [
          {
            label: '\u6D4B\u8BD5\u4E09\u7EA74',
            value: '3-0-0',
          },
          {
            label: '\u6D4B\u8BD5\u4E09\u7EA75',
            value: '3-0-1',
          },
        ],
      },
      {
        label: '\u6D4B\u8BD5\u4E8C\u7EA74',
        value: '3-1',
      },
      {
        label: '\u6D4B\u8BD5\u4E8C\u7EA75',
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
    console.log('\u6D4B\u8BD5\u6A21\u7CCA\u67E5\u8BE2', init.search('\u6D4B\u8BD5\u56DB\u7EA7', 'label'));
    console.log(
      '\u6253\u5370\u9009\u4E2D\u60C5\u51B5',
      init.onCheck({ label: '\u6D4B\u8BD5\u4E09\u7EA75', value: '3-0-1' }),
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
      <button onClick={onClick}>\u70B9\u51FB\u6253\u5370\u503C</button>
      <button onClick={branchKey}>\u533A\u5206\u51FA\u534A\u9009\u548C\u5168\u9009\u7684\u6570\u636E</button>
    </div>
  );
};`},react:{type:"NPM",value:"18.3.1"},"carefree-utils":{type:"NPM",value:"1.0.18"}},entry:"index.tsx"},context:{react:e(67294),"carefree-utils":e(53018)},renderOpts:{compile:function(){var i=I()(r()().mark(function n(){var u,o=arguments;return r()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,e.e(19).then(e.bind(e,4019));case 2:return l.abrupt("return",(u=l.sent).default.apply(u,o));case 3:case"end":return l.stop()}},n)}));function c(){return i.apply(this,arguments)}return c}()}}}},39921:function(f,t,e){e.r(t),e.d(t,{texts:function(){return r}});var v=e(3484);const r=[{value:"Tree \u6811\u5F62\u9009\u62E9\u65B9\u6CD5\u4F7F\u7528\u7684\u7C7B\u65B9\u6CD5",paraId:0},{value:"\u8FD4\u56DE\u5904\u7406\u597D\u7684\u6570\u636E",paraId:1,tocIndex:0},{value:"\u4F20\u9012\u4E00\u4E2A key \u6570\u7EC4 --> \u533A\u5206\u51FA\u534A\u9009\u548C\u5168\u9009\u7684\u6570\u636E",paraId:2,tocIndex:1},{value:"\u8FD4\u56DE\u4E3B\u952E\u503C",paraId:3,tocIndex:2},{value:"\u5224\u65AD\u662F\u5426\u9009\u4E2D\u3002\u8FD4\u56DE",paraId:4,tocIndex:3},{value:"true",paraId:4,tocIndex:3},{value:"\u6216",paraId:4,tocIndex:3},{value:"false",paraId:4,tocIndex:3},{value:"\u5224\u65AD\u662F\u5426\u534A\u9009\u72B6\u6001\u3002\u8FD4\u56DE",paraId:5,tocIndex:4},{value:"true",paraId:5,tocIndex:4},{value:"\u6216",paraId:5,tocIndex:4},{value:"false",paraId:5,tocIndex:4},{value:"\u5224\u65AD\u662F\u5426\u7981\u7528\u3002\u8FD4\u56DE",paraId:6,tocIndex:5},{value:"true",paraId:6,tocIndex:5},{value:"\u6216",paraId:6,tocIndex:5},{value:"false",paraId:6,tocIndex:5},{value:"\u4F20\u9012\u5F53\u524D\u9009\u4E2D\u9879\u7684\u503C\uFF0C\u8FDB\u884C\u5904\u7406\u540E\uFF0C\u8FD4\u56DE\u65B0\u7684\u5168\u9009\u6570\u636E\u548C\u534A\u9009\u6570\u636E\u3002\u8FD4\u56DE",paraId:7,tocIndex:6},{value:"AllKeys",paraId:7,tocIndex:6},{value:"\u548C",paraId:7,tocIndex:6},{value:"HalfKeys",paraId:7,tocIndex:6},{value:"\u4F20\u9012\u5F53\u524D\u53D6\u6D88\u9879\u7684\u503C\uFF0C\u8FDB\u884C\u5904\u7406\u540E\uFF0C\u8FD4\u56DE\u65B0\u7684\u5168\u9009\u6570\u636E\u548C\u534A\u9009\u6570\u636E ,\u8FD4\u56DE",paraId:8,tocIndex:7},{value:"AllKeys",paraId:8,tocIndex:7},{value:"\u548C",paraId:8,tocIndex:7},{value:"HalfKeys",paraId:8,tocIndex:7},{value:"\u4F20\u9012\u5F53\u524D\u503C(\u5185\u90E8\u5224\u65AD\u662F\u9009\u4E2D\u8FD8\u662F\u53D6\u6D88)\uFF0C\u8FDB\u884C\u5904\u7406\u8FD4\u56DE\u65B0\u7684\u5168\u9009\u6570\u636E\u548C\u534A\u9009\u6570\u636E ,\u8FD4\u56DE",paraId:9,tocIndex:8},{value:"AllKeys",paraId:9,tocIndex:8},{value:"\u548C",paraId:9,tocIndex:8},{value:"HalfKeys",paraId:9,tocIndex:8},{value:"\u6A21\u7CCA\u67E5\u8BE2\u503C \u4F20 key \u503C\u548C\u6A21\u7CCA\u67E5\u8BE2\u7684\u5B57\u6BB5",paraId:10,tocIndex:9},{value:`type KeyType = string | number;

export interface TreeItem {
  [key: string]: any;
  children?: TreeItem[];
}

export type RowKeyType = KeyType | ((item: TreeItem) => string);

export interface TreeProps {
  // \u539F\u59CB\u6570\u636E
  treeData: TreeItem[];
  // \u4E3B\u952E \u5B57\u6BB5
  rowKey?: RowKeyType;
  /** \u5224\u65AD\u5B50\u9879\u5B57\u6BB5 */
  childField?: string;
  // \u662F\u5426\u53D6\u6D88\u7236\u7EA7\u534A\u9009
  isCancelParenthalf?: boolean;
  /** \u7981\u7528\u9879 id */
  disableId?: (string | number)[];
  //  \u5168\u9009\u6570\u636E
  AllKeys?: KeyType[] | KeyType;
  /** \u534A\u9009\u6570\u636E  \u534A\u9009\u7684\u65F6\u5019\u4E0D\u4F1A\u5B58\u5728\u5355\u9009 \u53EA\u5904\u7406\u591A\u9009\u60C5\u51B5 */
  HalfKeys?: KeyType[];
  // \u662F\u5426\u591A\u9009
  multiple?: boolean;
  //\u7236\u7EA7\u662F\u5426\u53EF\u9009
  isParentCheck?: boolean;
}
`,paraId:11,tocIndex:10}]}}]);
