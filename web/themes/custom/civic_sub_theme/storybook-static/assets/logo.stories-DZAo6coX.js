// phpcs:ignoreFile
import{L as l}from"./logo-C0KHTYh7.js";import{L as p}from"./logo.stories.data-CoNW8qya.js";import"./twig-CcN5Lhas.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./image-DhxcWgXc.js";import"./constants-CRqfzfsz.js";const k={title:"Molecules/Logo",component:l,argTypes:{theme:{control:{type:"radio"},options:["light","dark"]},type:{control:{type:"radio"},options:["default","stacked","inline","inline-stacked"]},logos:{control:{type:"object"}},url:{control:{type:"text"}},title:{control:{type:"text"}},attributes:{control:{type:"text"}},modifier_class:{control:{type:"text"}}}},t={parameters:{layout:"centered"},args:p.args("light")},o={parameters:{layout:"centered",backgrounds:{default:"Dark"}},args:p.args("dark")};var r,e,a;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  parameters: {
    layout: 'centered'
  },
  args: LogoData.args('light')
}`,...(a=(e=t.parameters)==null?void 0:e.docs)==null?void 0:a.source}}};var s,n,c;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'Dark'
    }
  },
  args: LogoData.args('dark')
}`,...(c=(n=o.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};const L=["Logo","LogoDark"];export{t as Logo,o as LogoDark,L as __namedExportsOrder,k as default};
