// phpcs:ignoreFile
import{B as l,a as p}from"./banner.stories.data-C1iY3Gp2.js";import{C as m}from"./constants-CRqfzfsz.js";import"./twig-CcN5Lhas.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./breadcrumb-CUTyE6az.js";import"./item-list-D0CyTs1W.js";import"./link-CrNmH4-1.js";import"./text-icon-Dvjv34QP.js";import"./icon-zRMc7hC0.js";import"./heading-Cd2ghLiH.js";import"./image-DhxcWgXc.js";import"./paragraph-BdByGZ8Z.js";import"./button-BBHC_5Xh.js";import"./navigation-card-DR44gJzA.js";import"./tag-list-DRSHPNCa.js";import"./tag-DmQOAFam.js";import"./grid-PcQOytk6.js";const E={title:"Organisms/Banner",component:l,argTypes:{theme:{control:{type:"radio"},options:["light","dark"]},content_top1:{control:{type:"text"}},breadcrumb:{control:{type:"array"}},content_top2:{control:{type:"text"}},content_top3:{control:{type:"text"}},content_middle:{control:{type:"text"}},content:{control:{type:"text"}},content_bottom:{control:{type:"text"}},content_below:{control:{type:"text"}},site_section:{control:{type:"text"}},title:{control:{type:"text"}},is_decorative:{control:{type:"boolean"}},featured_image:{control:{type:"object"}},background_image:{control:{type:"object"}},background_image_blend_mode:{control:{type:"select"},options:m.SCSS_VARIABLES["ct-background-blend-modes"]},modifier_class:{control:{type:"text"}},attributes:{control:{type:"text"}}}},t={parameters:{layout:"fullscreen"},args:p.args("light")},e={parameters:{layout:"fullscreen",backgrounds:{default:"Dark"}},args:p.args("dark")};var r,o,a;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  args: BannerData.args('light')
}`,...(a=(o=t.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};var n,s,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'Dark'
    }
  },
  args: BannerData.args('dark')
}`,...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};const O=["Banner","BannerDark"];export{t as Banner,e as BannerDark,O as __namedExportsOrder,E as default};
