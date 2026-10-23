// phpcs:ignoreFile
import{t as l,D as u,a as d,T as p}from"./twig-CcN5Lhas.js";import{C as t}from"./constants-CRqfzfsz.js";import"./_commonjsHelpers-C4iS2aBk.js";d(p);p.cache(!1);const a=s=>s,y=(s={})=>{const n=l.twig({id:"/var/www/html/web/themes/custom/civic_sub_theme/components_combined/00-base/fonts/fonts.stories.twig",data:[{type:"raw",value:`<div class="story-fonts-wrapper">
  `,position:{start:0,end:36}},{type:"logic",token:{type:"Twig.logic.type.for",keyVar:null,valueVar:"font",expression:[{type:"Twig.expression.type.variable",value:"fonts",match:["fonts"]}],position:{start:36,end:59},output:[{type:"raw",value:`    <div class="story-container">
      <div class="story-container__title">`,position:{start:60,end:136}},{type:"output",position:{start:136,end:157},stack:[{type:"Twig.expression.type.variable",value:"font",match:["font"],position:{start:136,end:157}},{type:"Twig.expression.type.filter",value:"capitalize",match:["|capitalize","capitalize"],position:{start:136,end:157}}]},{type:"raw",value:`</div>
      <div class="story-container__content">
        `,position:{start:157,end:217}},{type:"logic",token:{type:"Twig.logic.type.for",keyVar:null,valueVar:"weight",expression:[{type:"Twig.expression.type.variable",value:"weights",match:["weights"]}],position:{start:217,end:244},output:[{type:"raw",value:'          <div class="story-container__subtitle">',position:{start:245,end:294}},{type:"output",position:{start:294,end:317},stack:[{type:"Twig.expression.type.variable",value:"weight",match:["weight"],position:{start:294,end:317}},{type:"Twig.expression.type.filter",value:"capitalize",match:["|capitalize","capitalize"],position:{start:294,end:317}}]},{type:"raw",value:`</div>
          <div class="story-container__subcontent story-font--`,position:{start:317,end:386}},{type:"output",position:{start:386,end:398},stack:[{type:"Twig.expression.type.variable",value:"weight",match:["weight"],position:{start:386,end:398}}]},{type:"raw",value:"--",position:{start:398,end:400}},{type:"output",position:{start:400,end:410},stack:[{type:"Twig.expression.type.variable",value:"font",match:["font"],position:{start:400,end:410}}]},{type:"raw",value:`">The quick brown fox jumps over the lazy dog</div>
          <div class="story-container__subtitle">`,position:{start:410,end:511}},{type:"output",position:{start:511,end:534},stack:[{type:"Twig.expression.type.variable",value:"weight",match:["weight"],position:{start:511,end:534}},{type:"Twig.expression.type.filter",value:"capitalize",match:["|capitalize","capitalize"],position:{start:511,end:534}}]},{type:"raw",value:` Italic</div>
          <div class="story-container__subcontent story-font--italic--`,position:{start:534,end:618}},{type:"output",position:{start:618,end:630},stack:[{type:"Twig.expression.type.variable",value:"weight",match:["weight"],position:{start:618,end:630}}]},{type:"raw",value:"--",position:{start:630,end:632}},{type:"output",position:{start:632,end:642},stack:[{type:"Twig.expression.type.variable",value:"font",match:["font"],position:{start:632,end:642}}]},{type:"raw",value:`">The quick brown fox jumps over the lazy dog</div>
        `,position:{start:642,end:702}}]},position:{open:{start:217,end:244},close:{start:702,end:714}}},{type:"raw",value:`      </div>
    </div>
  `,position:{start:715,end:741}}]},position:{open:{start:36,end:59},close:{start:741,end:753}}},{type:"raw",value:`</div>
`,position:{start:754,end:754}}],precompiled:!0});n.options.allowInlineIncludes=!0;try{return a(n.render({attributes:new u,...s}))}catch(c){return a("An error occurred whilst rendering /var/www/html/web/themes/custom/civic_sub_theme/components_combined/00-base/fonts/fonts.stories.twig: "+c.toString())}},m={title:"Base/Fonts",component:y,argTypes:{fonts:{table:{disable:!0}},weights:{table:{disable:!0}}}},e={parameters:{layout:"centered",html:{disable:!0}},args:{fonts:Object.keys({...t.SCSS_VARIABLES["ct-fonts-default"],...t.SCSS_VARIABLES["ct-fonts"]}),weights:Object.keys({...t.SCSS_VARIABLES["ct-font-weights-default"],...t.SCSS_VARIABLES["ct-font-weights"]})}};var o,i,r;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  parameters: {
    layout: 'centered',
    html: {
      disable: true
    }
  },
  args: {
    fonts: Object.keys({
      ...Constants.SCSS_VARIABLES['ct-fonts-default'],
      ...Constants.SCSS_VARIABLES['ct-fonts']
    }),
    weights: Object.keys({
      ...Constants.SCSS_VARIABLES['ct-font-weights-default'],
      ...Constants.SCSS_VARIABLES['ct-font-weights']
    })
  }
}`,...(r=(i=e.parameters)==null?void 0:i.docs)==null?void 0:r.source}}};const h=["Fonts"];export{e as Fonts,h as __namedExportsOrder,m as default};
