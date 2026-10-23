// phpcs:ignoreFile
import{C as o}from"./select-e83jhSBd.js";import"./twig-CcN5Lhas.js";import"./_commonjsHelpers-C4iS2aBk.js";const r={title:"Atoms/Form Controls/Select",component:o,argTypes:{theme:{control:{type:"radio"},options:["light","dark"]},is_multiple:{control:{type:"boolean"}},options:{control:{type:"array"}},name:{control:{type:"text"}},id:{control:{type:"text"}},is_required:{control:{type:"boolean"}},is_invalid:{control:{type:"boolean"}},is_disabled:{control:{type:"boolean"}},attributes:{control:{type:"text"}},modifier_class:{control:{type:"text"}}}},e={parameters:{layout:"centered"},args:{theme:"light",is_multiple:!1,options:[{type:"optgroup",label:"Group label",value:"Group value",selected:!1,options:[{label:"Option label",value:"Option value",is_selected:!1,is_disabled:!1}]},{type:"option",label:"Option label",value:"Option value",selected:!1}],name:"Select name",id:"select-id",is_required:!1,is_invalid:!1,is_disabled:!1,attributes:"",modifier_class:""}};var t,l,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  parameters: {
    layout: 'centered'
  },
  args: {
    theme: 'light',
    is_multiple: false,
    options: [{
      type: 'optgroup',
      label: 'Group label',
      value: 'Group value',
      selected: false,
      options: [{
        label: 'Option label',
        value: 'Option value',
        is_selected: false,
        is_disabled: false
      }]
    }, {
      type: 'option',
      label: 'Option label',
      value: 'Option value',
      selected: false
    }],
    name: 'Select name',
    id: 'select-id',
    is_required: false,
    is_invalid: false,
    is_disabled: false,
    attributes: '',
    modifier_class: ''
  }
}`,...(a=(l=e.parameters)==null?void 0:l.docs)==null?void 0:a.source}}};const p=["Select"];export{e as Select,p as __namedExportsOrder,r as default};
