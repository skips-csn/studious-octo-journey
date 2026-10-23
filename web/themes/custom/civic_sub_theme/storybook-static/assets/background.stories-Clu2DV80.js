// phpcs:ignoreFile
import{t as p,D as l,a as u,T as i}from"./twig-CcN5Lhas.js";import{C as t}from"./constants-CRqfzfsz.js";import"./_commonjsHelpers-C4iS2aBk.js";u(i);i.cache(!1);const n=o=>o,m=(o={})=>{const r=p.twig({id:"/var/www/html/web/themes/custom/civic_sub_theme/components_combined/00-base/background/background.stories.twig",data:[{type:"raw",value:`<div class="story-background-wrapper">
  <div
    class="ct-background ct-background--`,position:{start:0,end:86}},{type:"output",position:{start:86,end:102},stack:[{type:"Twig.expression.type.variable",value:"blend_mode",match:["blend_mode"],position:{start:86,end:102}}]},{type:"raw",value:`"
    style="background-image: url('`,position:{start:102,end:138}},{type:"output",position:{start:138,end:147},stack:[{type:"Twig.expression.type.variable",value:"url",match:["url"],position:{start:138,end:147}}]},{type:"raw",value:"'); background-color: ",position:{start:147,end:169}},{type:"output",position:{start:169,end:180},stack:[{type:"Twig.expression.type.variable",value:"color",match:["color"],position:{start:169,end:180}}]},{type:"raw",value:`"
  ></div>
</div>
`,position:{start:180,end:180}}],precompiled:!0});r.options.allowInlineIncludes=!0;try{return n(r.render({attributes:new l,...o}))}catch(d){return n("An error occurred whilst rendering /var/www/html/web/themes/custom/civic_sub_theme/components_combined/00-base/background/background.stories.twig: "+d.toString())}},y={title:"Base/Background",component:m,argTypes:{blend_mode:{control:{type:"select"},options:t.SCSS_VARIABLES["ct-background-blend-modes"]},color:{control:{type:"color"}},url:{control:{type:"select"},options:t.BACKGROUNDS}}},e={parameters:{layout:"centered"},args:{url:t.BACKGROUNDS[Object.keys(t.BACKGROUNDS)[0]],color:"#003a4f",blend_mode:t.SCSS_VARIABLES["ct-background-blend-modes"][0]}};var a,s,c;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  parameters: {
    layout: 'centered'
  },
  args: {
    url: Constants.BACKGROUNDS[Object.keys(Constants.BACKGROUNDS)[0]],
    color: '#003a4f',
    blend_mode: Constants.SCSS_VARIABLES['ct-background-blend-modes'][0]
  }
}`,...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};const k=["Background"];export{e as Background,k as __namedExportsOrder,y as default};
