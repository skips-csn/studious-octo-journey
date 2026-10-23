// phpcs:ignoreFile
import{t as i,D as p,a as d,T as l}from"./twig-CcN5Lhas.js";import"./_commonjsHelpers-C4iS2aBk.js";d(l);l.cache(!1);const r=t=>t,h=(t={})=>{const s=i.twig({id:"/var/www/html/web/themes/custom/civic_sub_theme/components_combined/00-base/scrollspy/scrollspy.stories.twig",data:[{type:"raw",value:`<div class="story-container">
  <div class="story-container__page-content story-scrollspy"></div>
  <button class="story-scrollspy-target1" data-scrollspy data-scrollspy-offset="400">
    This Button appears when the bottom of the red container reaches top when the viewport is scrolled 400px. It disappears when the viewport is scrolled back.
  </button>
  <button class="story-scrollspy-target2" data-scrollspy data-scrollspy-offset="600">
    This Button appears when the bottom of the blue container reaches top when the viewport is scrolled 600px. It disappears when the viewport is scrolled back.
  </button>
</div>
`,position:{start:0,end:0}}],precompiled:!0});s.options.allowInlineIncludes=!0;try{return r(s.render({attributes:new p,...t}))}catch(c){return r("An error occurred whilst rendering /var/www/html/web/themes/custom/civic_sub_theme/components_combined/00-base/scrollspy/scrollspy.stories.twig: "+c.toString())}},w={title:"Base/Utilities/Scrollspy",component:h},e={parameters:{layout:"fullscreen",docs:"Scroll the viewport to see elements appear when it reaches a specific pixel threshold.",html:{disable:!0}}};var o,a,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen',
    docs: 'Scroll the viewport to see elements appear when it reaches a specific pixel threshold.',
    html: {
      disable: true
    }
  }
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const y=["Scrollspy"];export{e as Scrollspy,y as __namedExportsOrder,w as default};
