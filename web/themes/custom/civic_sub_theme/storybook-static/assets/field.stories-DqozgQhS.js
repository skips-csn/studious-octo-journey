// phpcs:ignoreFile
import{F as h}from"./field-mj5xxWR3.js";import{F as a}from"./field.stories.data-Dzrhj_Gs.js";import"./twig-CcN5Lhas.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./label-B8raLlBb.js";import"./field-description-CdVey6sh.js";import"./textfield-DUhEA_p-.js";import"./textarea-D-de3_qa.js";import"./select-e83jhSBd.js";import"./item-list-D0CyTs1W.js";import"./checkbox-B7GV2i0H.js";import"./radio-Bq8ZthJU.js";import"./input-C--QKvib.js";import"./field-message-DcfLUTx-.js";import"./icon-zRMc7hC0.js";const M={title:"Molecules/Field",component:h,argTypes:{theme:{control:{type:"radio"},options:["light","dark"]},type:{control:{type:"select"},options:["textfield","textarea","select","select_multiple","radio","checkbox","hidden","color","date","email","file","image","month","number","password","range","search","tel","time","url","week","other"]},title:{control:{type:"text"}},title_display:{control:{type:"radio"},options:["visible","invisible","hidden"]},description:{control:{type:"text"}},name:{control:{type:"text"}},value:{control:{type:"text"}},placeholder:{control:{type:"text"}},id:{control:{type:"text"}},is_invalid:{control:{type:"boolean"}},is_disabled:{control:{type:"boolean"}},is_required:{control:{type:"boolean"}},required_text:{control:{type:"text"}},orientation:{control:{type:"radio"},options:["vertical","horizontal"]},is_inline:{control:{type:"boolean"}},control:{control:{type:"object"}},attributes:{control:{type:"text"}},modifier_class:{control:{type:"text"}},prefix:{control:{type:"text"}},suffix:{control:{type:"text"}}}},e={parameters:{layout:"centered"},args:a.args()},t={parameters:{layout:"centered"},args:{...a.args("light",{controls:!0,is_required:!0}),type:"radio"}},r={parameters:{layout:"centered"},args:{...a.args("light",{controls:!0,is_required:!0}),type:"checkbox"}},o={parameters:{layout:"centered"},args:{...a.args("light",{options:!0,is_required:!0}),type:"select"}};var i,s,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    layout: 'centered'
  },
  args: FieldData.args()
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var l,c,p;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  parameters: {
    layout: 'centered'
  },
  args: {
    ...FieldData.args('light', {
      controls: true,
      is_required: true
    }),
    type: 'radio'
  }
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var d,m,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    layout: 'centered'
  },
  args: {
    ...FieldData.args('light', {
      controls: true,
      is_required: true
    }),
    type: 'checkbox'
  }
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var y,g,x;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    layout: 'centered'
  },
  args: {
    ...FieldData.args('light', {
      options: true,
      is_required: true
    }),
    type: 'select'
  }
}`,...(x=(g=o.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const O=["Field","FieldRadio","FieldCheckbox","FieldSelect"];export{e as Field,r as FieldCheckbox,t as FieldRadio,o as FieldSelect,O as __namedExportsOrder,M as default};
