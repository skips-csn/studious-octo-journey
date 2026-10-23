// phpcs:ignoreFile
import{t as n,D as p,a as r,T as s}from"./twig-CcN5Lhas.js";import{C as l}from"./content-link-CpyRHWi-.js";import{B as t}from"./button-BBHC_5Xh.js";import{T as c}from"./table-CUv6LVHh.js";import{C as u}from"./figure-Bc-l8F3S.js";import{C as m}from"./video-player-DAbP8E25.js";r(s);s.cache(!1);const a=e=>e,h=(e={})=>{const i=n.twig({id:"/var/www/html/web/themes/custom/civic_sub_theme/components_combined/02-molecules/basic-content/basic-content.twig",data:[{type:"raw",value:`

`,position:{start:416,end:418}},{type:"logic",token:{type:"Twig.logic.type.set",key:"with_background_class",expression:[{type:"Twig.expression.type.variable",value:"with_background",match:["with_background"]},{type:"Twig.expression.type.string",value:"ct-basic-content--with-background"},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"}],position:{start:418,end:510}},position:{start:418,end:510}},{type:"logic",token:{type:"Twig.logic.type.set",key:"vertical_spacing_class",expression:[{type:"Twig.expression.type.variable",value:"vertical_spacing",match:["vertical_spacing"]},{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"top"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"bottom"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"both"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.operator.binary",value:"in",precidence:8,associativity:"leftToRight",operator:"in"},{type:"Twig.expression.type.string",value:"ct-vertical-spacing-inset--%s"},{type:"Twig.expression.type.filter",value:"format",match:["|format","format"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.variable",value:"vertical_spacing",match:["vertical_spacing"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"}],position:{start:511,end:655}},position:{start:511,end:655}},{type:"logic",token:{type:"Twig.logic.type.set",key:"theme_class",expression:[{type:"Twig.expression.type.string",value:"ct-theme-%s"},{type:"Twig.expression.type.filter",value:"format",match:["|format","format"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.variable",value:"theme",match:["theme"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"light"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:656,end:724}},position:{start:656,end:724}},{type:"logic",token:{type:"Twig.logic.type.set",key:"modifier_class",expression:[{type:"Twig.expression.type.string",value:"%s %s %s %s"},{type:"Twig.expression.type.filter",value:"format",match:["|format","format"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.variable",value:"theme_class",match:["theme_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"vertical_spacing_class",match:["vertical_spacing_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"with_background_class",match:["with_background_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_class",match:["modifier_class"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:725,end:860}},position:{start:725,end:860}},{type:"raw",value:`
`,position:{start:861,end:862}},{type:"logic",token:{type:"Twig.logic.type.set",key:"is_contained",expression:[{type:"Twig.expression.type.variable",value:"is_contained",match:["is_contained"]},{type:"Twig.expression.type.test",filter:"defined",modifier:"not"},{type:"Twig.expression.type.variable",value:"is_contained",match:["is_contained"]},{type:"Twig.expression.type.bool",value:!1},{type:"Twig.expression.type.operator.binary",value:"!=",precidence:9,associativity:"leftToRight",operator:"!="},{type:"Twig.expression.type.operator.binary",value:"or",precidence:14,associativity:"leftToRight",operator:"or"},{type:"Twig.expression.type.bool",value:!0},{type:"Twig.expression.type.bool",value:!1},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"}],position:{start:862,end:954}},position:{start:862,end:954}},{type:"raw",value:"",position:{start:955,end:956}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"content",match:["content"]},{type:"Twig.expression.type.test",filter:"empty",modifier:"not"}],position:{start:956,end:985},output:[{type:"raw",value:'  <div class="ct-basic-content ',position:{start:986,end:1017}},{type:"output_whitespace_post",position:{start:1017,end:1038},stack:[{type:"Twig.expression.type.variable",value:"modifier_class",match:["modifier_class"],position:{start:1017,end:1038}}]},{type:"raw",value:'" ',position:{start:1038,end:1040}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"attributes",match:["attributes"]},{type:"Twig.expression.type.test",filter:"empty",modifier:"not"}],position:{start:1040,end:1072},output:[{type:"output_whitespace_both",position:{start:1072,end:1094},stack:[{type:"Twig.expression.type.variable",value:"attributes",match:["attributes"],position:{start:1072,end:1094}},{type:"Twig.expression.type.filter",value:"raw",match:["|raw","raw"],position:{start:1072,end:1094}}]}]},position:{open:{start:1040,end:1072},close:{start:1094,end:1105}}},{type:"raw",value:`>
    `,position:{start:1105,end:1111}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"is_contained",match:["is_contained"]}],position:{start:1111,end:1132},output:[{type:"raw",value:`      <div class="container">
        <div class="row">
          <div class="col-xxs-12">
            `,position:{start:1133,end:1236}}]},position:{open:{start:1111,end:1132},close:{start:1236,end:1247}}},{type:"raw",value:"",position:{start:1248,end:1262}},{type:"output_whitespace_both",position:{start:1262,end:1281},stack:[{type:"Twig.expression.type.variable",value:"content",match:["content"],position:{start:1262,end:1281}},{type:"Twig.expression.type.filter",value:"raw",match:["|raw","raw"],position:{start:1262,end:1281}}]},{type:"raw",value:"",position:{start:1281,end:1294}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"is_contained",match:["is_contained"]}],position:{start:1294,end:1315},output:[{type:"raw",value:`          </div>
        </div>
      </div>
    `,position:{start:1316,end:1365}}]},position:{open:{start:1294,end:1315},close:{start:1365,end:1376}}},{type:"raw",value:`  </div>
`,position:{start:1377,end:1386}}]},position:{open:{start:956,end:985},close:{start:1386,end:1397}}}],precompiled:!0});i.options.allowInlineIncludes=!0;try{return a(i.render({attributes:new p,...e}))}catch(o){return a("An error occurred whilst rendering /var/www/html/web/themes/custom/civic_sub_theme/components_combined/02-molecules/basic-content/basic-content.twig: "+o.toString())}},b={args:(e="light")=>({theme:e,content:`<h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p>Text without a class sed aute in sed consequat veniam excepteur minim mollit.</p>
      <p class="ct-text-large">Large text sed aute in sed consequat veniam excepteur minim mollit.</p>
      <p class="ct-text-regular">Regular text veniam reprehenderit velit ea veniam occaecat magna est sed duis quis elit occaecat dolore ut enim est do in dolor non elit aliquip commodo aliquip sint veniam ullamco adipisicing tempor ad.</p>
      <p class="ct-text-small">Small text <span>duis sunt velit.</span><span>Ea eu non.</span></p>
      <p>In mollit in minim ut non ${l({theme:e,text:"commodo dolore",url:"https://example.com"})} nisi anim.</p>
      <p>Deserunt in ex dolore. <sup>Super cupidatat esse.</sup> <sub>Sub do mollit aute labore.</sub></p>
      <p>Primary button link within text mollit in minim ut non ${t({theme:e,kind:"link",type:"primary",text:"Primary button text",url:"https://example.com"})} nisi anim.</p>
      <p>Secondary button link within text mollit in minim ut non ${t({theme:e,kind:"link",type:"secondary",text:"Secondary button text",url:"https://example.com"})} nisi anim.</p>
      <p>Tertiary button link within text mollit in minim ut non ${t({theme:e,kind:"link",type:"tertiary",text:"Tertiary button text",url:"https://example.com"})} nisi anim.</p>
      <p>Sed aute in sed consequat veniam excepteur minim mollit.</p>
      <blockquote>Culpa laboris sit fugiat minim ad commodo eu id sint eu sed nisi.</blockquote>
      <blockquote>Culpa laboris sit fugiat minim ad commodo eu id sint eu sed nisi.<cite>Sed aute</cite></blockquote>
      <ul>
        <li>Sint pariatur quis tempor.</li>
        <li>Lorem ipsum dolore laborum nulla ut.</li>
        <li>Deserunt ullamco occaecat anim cillum.</li>
      </ul>
      <ol>
        <li>Id nostrud id sit nulla.</li>
        <li>Dolore ea cillum culpa nulla.</li>
        <li>Lorem ipsum ex excepteur.</li>
      </ol>
      <p>Number list with bullet children</p>
      <ol>
          <li>Number</li>
          <li>Number</li>
          <li>Number
            <ul>
              <li>Bullet</li>
              <li>Bullet</li>
            </ul>
          </li>
          <li>Number</li>
          <li>Number</li>
      </ol>
      <p>Bullet list with number children</p>
      <ul>
          <li>Bullet</li>
          <li>Bullet
            <ol>
              <li>Number</li>
              <li>Number</li>
            </ol>
          </li>
          <li>Bullet</li>
          <li>Bullet</li>
          <li>Bullet</li>
      </ul>
      ${u({theme:e,url:"./demo/images/demo1.jpg",alt:"Occaecat laborum voluptate cupidatat.",caption:"Commodo anim sint minim."})}
      ${m({theme:e,sources:[{url:"demo/videos/demo.webm",type:"video/webm"},{url:"demo/videos/demo.mp4",type:"video/mp4"},{url:"demo/videos/demo.avi",type:"video/avi"}],poster:"demo/videos/demo_poster.png"})}
      ${c({theme:e,header:["Column A","Column B","Column C"],rows:[["Do duis minim cupidatat eu.","Ullamco sunt dolore.","Dolor in officia."],["Do duis minim cupidatat eu.","Ullamco sunt dolore.","Dolor in officia."],["Lorem ipsum magna sint.","Consequat qui anim.","Lorem ipsum aliqua veniam deserunt."]]})}
      `,is_contained:!0,vertical_spacing:"none",with_background:!1,modifier_class:"",attributes:""})};export{h as B,b as a};
