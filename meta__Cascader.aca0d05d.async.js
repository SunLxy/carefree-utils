"use strict";(self.webpackChunkcarefree_utils=self.webpackChunkcarefree_utils||[]).push([[225],{28504:function(k,o,e){e.r(o),e.d(o,{demos:function(){return O}});var E=e(17061),d=e.n(E),D=e(27424),M=e.n(D),K=e(42122),A=e.n(K),I=e(17156),g=e.n(I),P=e(67294),B=e(62634),O={"src-cascader-demo-0":{component:P.memo(P.lazy(g()(d()().mark(function p(){var C=this,_,i,m,r,a;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,Promise.resolve().then(e.bind(e,53018));case 2:return _=l.sent,i=_.Cascader,l.next=6,Promise.resolve().then(e.t.bind(e,67294,19));case 6:return m=l.sent,r=m.default,window&&(window.Cascader=i),a=function(s){var h=s.data,c=s.index,v=s.setArr,f=s.arr,n=s.checkKey,t=s.className,R=t===void 0?"":t,w=function(y,L){var T=y.isChild,b=f.slice(0,c+1);b[c]=A()({},y),T&&b.push({}),L||v(b)};return r.createElement("div",{style:{borderRight:"1px solid #ccc",paddingLeft:10,paddingRight:10,overflow:"hidden"},className:R},h.map(function(u,y){return r.createElement("div",{key:y,onClick:w.bind(C,u,n===u.value),style:{height:30,width:100,lineHeight:"30px",borderBottom:"1px solid #ccc",cursor:"pointer",background:n===u.value?"red":"none",color:n===u.value?"#fff":"#000"}},u.label)}))},l.abrupt("return",{default:function(){r.useEffect(function(){var n=document.createElement("style");n.innerHTML=`
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
    }`,n.type="text/css",document.head.append(n)},[]);var s=r.useState([{label:"\u6D4B\u8BD56",value:6,isChild:!0},{}]),h=M()(s,2),c=h[0],v=h[1],f=r.useMemo(function(){return new i({data:[{label:"\u6D4B\u8BD5",value:1,children:[{label:"\u6D4B\u8BD52",value:2}]},{label:"\u6D4B\u8BD53",value:3,children:[{label:"\u6D4B\u8BD54",value:4},{label:"\u6D4B\u8BD55",value:5}]},{label:"\u6D4B\u8BD56",value:6,children:[{label:"\u6D4B\u8BD57",value:7,children:[{label:"\u6D4B\u8BD510",value:10}]},{label:"\u6D4B\u8BD58",value:8,children:[{label:"\u6D4B\u8BD59",value:9,children:[{label:"\u6D4B\u8BD511",value:11,children:[{label:"\u6D4B\u8BD512",value:12}]}]}]}]}],rowKey:"value"})},[]);return console.log("arr--->",c),r.createElement("div",{style:{display:"flex"}},c.map(function(n,t){return t===0?r.createElement(a,{key:t,index:t,data:f.getLayerData(1),setArr:v,arr:c,checkKey:n.value}):r.createElement(a,{key:t,index:t,data:f.getChildData(c[t-1].value),setArr:v,checkKey:n.value,className:Object.keys(n).length?"":"div2",arr:c})}))}});case 11:case"end":return l.stop()}},p)})))),asset:{type:"BLOCK",id:"src-cascader-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Cascader } from 'carefree-utils';
import React from 'react';

if (window) {
  window.Cascader = Cascader;
}

const Item = (props) => {
  const { data, index, setArr, arr, checkKey, className = '' } = props;
  const onClick = (item, check) => {
    const { isChild } = item;

    const arrs = arr.slice(0, index + 1);
    arrs[index] = { ...item };
    if (isChild) {
      // \u6709\u5B50\u9879\u6570\u636E\u518D\u52A0\u4E00\u4E2A\u7528\u4E8E\u6E32\u67D3
      arrs.push({});
    }
    // \u9009\u4E2D\u7684\u4E0D\u7528\u518D\u6B21\u8FDB\u884C\u66F4\u65B0\u72B6\u6001
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
    style.innerHTML = \`
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
    }\`;
    style.type = 'text/css';
    document.head.append(style);
  }, []);

  // \u6BCF\u5217\u9009\u4E2D\u6570\u636E\u5B58\u50A8 \u9ED8\u8BA4\u6700\u5C11\u4E00\u4E2A\uFF0C
  const [arr, setArr] = React.useState([
    { label: '\u6D4B\u8BD56', value: 6, isChild: true },
    {},
  ]);

  // \u5BF9 \u539F\u59CB\u6570\u636E\u8FDB\u884C\u5904\u7406
  const cascader = React.useMemo(
    () =>
      new Cascader({
        // \u539F\u59CB\u6570\u636E
        data: [
          {
            label: '\u6D4B\u8BD5',
            value: 1,
            children: [{ label: '\u6D4B\u8BD52', value: 2 }],
          },
          {
            label: '\u6D4B\u8BD53',
            value: 3,
            children: [
              { label: '\u6D4B\u8BD54', value: 4 },
              { label: '\u6D4B\u8BD55', value: 5 },
            ],
          },
          {
            label: '\u6D4B\u8BD56',
            value: 6,
            children: [
              {
                label: '\u6D4B\u8BD57',
                value: 7,
                children: [{ label: '\u6D4B\u8BD510', value: 10 }],
              },
              {
                label: '\u6D4B\u8BD58',
                value: 8,
                children: [
                  {
                    label: '\u6D4B\u8BD59',
                    value: 9,
                    children: [
                      {
                        label: '\u6D4B\u8BD511',
                        value: 11,
                        children: [{ label: '\u6D4B\u8BD512', value: 12 }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        // \u4E3B\u952E
        rowKey: 'value',
      }),
    [],
  );

  // console.log("\u83B7\u53D6\u5C42\u7EA7\u6570\u636E---->",cascader.getLayerData())
  // console.log("\u83B7\u53D6\u5904\u7406\u540E\u7236\u9879\u5BF9\u5E94\u5B50\u9879\u7684\u6570\u636E",cascader.getChildData())
  console.log('arr--->', arr);

  return (
    <div style={{ display: 'flex' }}>
      {arr.map((item, key) => {
        if (key === 0) {
          // \u7B2C\u4E00\u4E2A\u9ED8\u8BA4\u53D6 \u5C42\u7EA7\u6570\u636E \u7B2C\u4E00\u7EA7\u6570\u636E
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
        // \u5176\u4ED6\u60C5\u51B5\u53D6\u4E0A\u4E00\u7EA7\u7684\u4E3B\u952E\u503C \u4ECE\u5B50\u9879\u6570\u636E\u53D6
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
};`},"carefree-utils":{type:"NPM",value:"1.0.18"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"carefree-utils":e(53018),react:e(67294)},renderOpts:{compile:function(){var p=g()(d()().mark(function _(){var i,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(19).then(e.bind(e,4019));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,m));case 3:case"end":return a.stop()}},_)}));function C(){return p.apply(this,arguments)}return C}()}}}},31675:function(k,o,e){e.r(o),e.d(o,{texts:function(){return d}});var E=e(62634);const d=[{value:"Cascader",paraId:0},{value:" \u5904\u7406\u8054\u52A8\u6570\u636E,",paraId:0},{value:`// \u6BCF\u4E00\u9879
export interface CascaderItemProps {
  [k: string]: any;
  children?: CascaderItemProps[];
}

type KeyType = number | string;

export interface CascaderProps {
  // \u539F\u59CB\u6811\u5F62\u6570\u636E
  data: CascaderItemProps[];
  // \u4E3B\u952E
  rowKey: KeyType | ((item: CascaderItemProps, layer: number) => string);
}
`,paraId:1,tocIndex:0}]}}]);
