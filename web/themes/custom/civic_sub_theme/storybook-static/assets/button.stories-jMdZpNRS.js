// phpcs:ignoreFile
import{B as r}from"./button-BBHC_5Xh.js";import{C as l}from"./constants-CRqfzfsz.js";import"./twig-CcN5Lhas.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./icon-zRMc7hC0.js";import"./text-icon-Dvjv34QP.js";const m={title:"Atoms/Form Controls/Button",component:r,parameters:{layout:"centered"},argTypes:{theme:{control:{type:"radio"},options:["light","dark"]},text:{control:{type:"text"}},type:{control:{type:"radio"},options:["primary","secondary","tertiary"]},kind:{control:{type:"radio"},options:["button","link","reset","submit"]},size:{control:{type:"radio"},options:["large","regular","small"]},icon:{control:{type:"select"},options:l.ICONS},icon_placement:{control:{type:"radio"},options:["before","after"]},icon_group_disabled:{control:{type:"boolean"}},icon_single_only:{control:{type:"boolean"}},url:{control:{type:"text"}},is_new_window:{control:{type:"boolean"}},is_disabled:{control:{type:"boolean"}},is_external:{control:{type:"boolean"}},allow_html:{control:{type:"boolean"}},attributes:{control:{type:"text"}},modifier_class:{control:{type:"text"}}}},t={args:{theme:"light",type:"primary",kind:"button",size:"regular",icon:"",icon_placement:"after",icon_group_disabled:!1,icon_single_only:!1,text:"My title",url:"",allow_html:!1,is_new_window:!1,is_external:!1,is_disabled:!1,attributes:"",modifier_class:""}};var o,e,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    theme: 'light',
    type: 'primary',
    kind: 'button',
    size: 'regular',
    icon: '',
    icon_placement: 'after',
    icon_group_disabled: false,
    icon_single_only: false,
    text: 'My title',
    url: '',
    allow_html: false,
    is_new_window: false,
    is_external: false,
    is_disabled: false,
    attributes: '',
    modifier_class: ''
  }
}`,...(n=(e=t.parameters)==null?void 0:e.docs)==null?void 0:n.source}}};const _=["Button"];export{t as Button,_ as __namedExportsOrder,m as default};
