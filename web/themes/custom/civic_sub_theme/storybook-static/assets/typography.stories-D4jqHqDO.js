// phpcs:ignoreFile
import{t as p,D as d,a as u,T as a}from"./twig-CcN5Lhas.js";import"./_commonjsHelpers-C4iS2aBk.js";u(a);a.cache(!1);const n=t=>t,c=(t={})=>{const i=p.twig({id:"/var/www/html/web/themes/custom/civic_sub_theme/components_combined/00-base/typography/typography.stories.twig",data:[{type:"raw",value:`

<div class="story-container">
  <div class="story-container__title">Headings</div>
  <div class="story-container__content">
    `,position:{start:52,end:182}},{type:"logic",token:{type:"Twig.logic.type.for",keyVar:null,valueVar:"level",expression:[{type:"Twig.expression.type.number",value:1,match:["1",null]},{type:"Twig.expression.type.number",value:6,match:["6",null]},{type:"Twig.expression.type.operator.binary",value:"..",precidence:20,associativity:"leftToRight",operator:".."}],position:{start:182,end:205},output:[{type:"raw",value:"      <h",position:{start:206,end:214}},{type:"output",position:{start:214,end:225},stack:[{type:"Twig.expression.type.variable",value:"level",match:["level"],position:{start:214,end:225}}]},{type:"raw",value:`>
        The quick brown fox jumps over the lazy dog
      </h`,position:{start:225,end:288}},{type:"output",position:{start:288,end:299},stack:[{type:"Twig.expression.type.variable",value:"level",match:["level"],position:{start:288,end:299}}]},{type:"raw",value:`>
    `,position:{start:299,end:305}}]},position:{open:{start:182,end:205},close:{start:305,end:317}}},{type:"raw",value:`  </div>
</div>

<div class="story-container">
  <div class="story-container__title">Text</div>
  `,position:{start:318,end:416}},{type:"logic",token:{type:"Twig.logic.type.for",keyVar:null,valueVar:"type",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"extra-large"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"large"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"regular"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"small"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]}],position:{start:416,end:478},output:[{type:"raw",value:'    <div class="story-container__content ct-text-',position:{start:479,end:528}},{type:"output",position:{start:528,end:538},stack:[{type:"Twig.expression.type.variable",value:"type",match:["type"],position:{start:528,end:538}}]},{type:"raw",value:`">
      Text - `,position:{start:538,end:554}},{type:"output",position:{start:554,end:564},stack:[{type:"Twig.expression.type.variable",value:"type",match:["type"],position:{start:554,end:564}}]},{type:"raw",value:`. Pellentesque in ipsum id orci porta dapibus. convallis
      at tellus Curabitur non nulla sit amet nisl tempus convallis quis ac
      lectus.
    </div>
  `,position:{start:564,end:723}}]},position:{open:{start:416,end:478},close:{start:723,end:735}}},{type:"raw",value:`</div>

<div class="story-container">
  <div class="story-container__title">Labels</div>
  `,position:{start:736,end:827}},{type:"logic",token:{type:"Twig.logic.type.for",keyVar:null,valueVar:"type",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"extra-large"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"large"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"regular"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"small"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"extra-small"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]}],position:{start:827,end:904},output:[{type:"raw",value:'    <div class="story-container__content ct-label-',position:{start:905,end:955}},{type:"output",position:{start:955,end:965},stack:[{type:"Twig.expression.type.variable",value:"type",match:["type"],position:{start:955,end:965}}]},{type:"raw",value:`">
      Label - `,position:{start:965,end:982}},{type:"output",position:{start:982,end:992},stack:[{type:"Twig.expression.type.variable",value:"type",match:["type"],position:{start:982,end:992}}]},{type:"raw",value:`
    </div>
  `,position:{start:992,end:1006}}]},position:{open:{start:827,end:904},close:{start:1006,end:1018}}},{type:"raw",value:`</div>

<div class="story-container">
  <div class="story-container__title">Text styles</div>
  <div class="story-container__content">
    <p>
      Nulla quis lorem ut <a href="https://example.com">example link in
        paragraph</a> libero malesuada feugiat.
    </p>
    <p><strong>Bold: Nulla quis lorem ut libero malesuada feugiat.</strong></p>
    <p><em>Italic: Nulla quis lorem ut libero malesuada feugiat.</em></p>
    <p>
      <span style="text-decoration: underline;">Underline: Nulla quis lorem ut libero malesuada feugiat.</span>
    </p>
    <p>
      <span style="text-decoration: line-through;">Strikethrouh: Nulla quis lorem ut libero malesuada feugiat.</span>
    </p>
    <p>Date: 20<sup>th&nbsp;</sup>August 2022</p>
    <p>H<sub>2</sub>0</p>
  </div>
</div>

<div class="story-container">
  <div class="story-container__title">Paragraphs</div>
  <div class="story-container__content">
    <p>Pellentesque in ipsum id orci porta dapibus. convallis at tellus
      Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
      Pellentesque in ipsum id orci porta dapibus.
    </p>
    <p>Pellentesque in ipsum id orci porta dapibus. convallis at tellus
      Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
      Pellentesque in ipsum id orci porta dapibus.
    </p>
    <p>Pellentesque in ipsum id orci porta dapibus. convallis at tellus
      Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
      Pellentesque in ipsum id orci porta dapibus.
    </p>
  </div>
</div>

<div class="story-container">
  <div class="story-container__title">Blockquote</div>
  <div class="story-container__content">
    <p>
      Pellentesque in ipsum id orci porta dapibus. convallis at tellus
      Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
      Pellentesque in ipsum id orci porta dapibus.
    </p>
    <blockquote>
      Vivamus suscipit tortor eget felis porttitor volutpat.
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
      cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper
      sit amet ligula. Donec rutrum congue leo eget malesuada.
    </blockquote>
    <p>
      Pellentesque in ipsum id orci porta dapibus. convallis at tellus
      Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
      Pellentesque in ipsum id orci porta dapibus.
    </p>
  </div>
</div>

<div class="story-container">
  <div class="story-container__title">Unordered list</div>
  <div class="story-container__content">
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
      <li>List item 4</li>
      <li>List item 5</li>
    </ul>
  </div>

  <div class="story-container__title">Unordered list with sub unordered list
  </div>
  <div class="story-container__content">
    <ul>
      <li>List item 1</li>
      <li>List item 2
        <ul>
          <li>List item 2</li>
          <li>List item 3
            <ul>
              <li>List item 2</li>
              <li>List item 3</li>
              <li>List item 4</li>
            </ul>
          </li>
          <li>List item 4</li>
        </ul>
      </li>
      <li>List item 3</li>
      <li>List item 4</li>
      <li>List item 5</li>
    </ul>
  </div>

  <div class="story-container__title">Unordered list with sub ordered list
  </div>
  <div class="story-container__content">
    <ul>
      <li>List item 1</li>
      <li>List item 2
        <ol>
          <li>Ordered List item 2</li>
          <li>Ordered List item 3
            <ol>
              <li>Ordered List item 2</li>
              <li>Ordered List item 3</li>
              <li>Ordered List item 4</li>
            </ol>
          </li>
          <li>List item 4</li>
        </ol>
      </li>
      <li>List item 3</li>
      <li>List item 4</li>
      <li>List item 5</li>
    </ul>
  </div>

  <div class="story-container__title">Ordered list</div>
  <div class="story-container__content">
    <ol>
      <li>Ordered list item 1</li>
      <li>Ordered list item 2</li>
      <li>Ordered list item 3</li>
      <li>Ordered list item 4</li>
      <li>Ordered list item 5</li>
    </ol>
  </div>

  <div class="story-container__title">Ordered list with sub ordered list</div>
  <div class="story-container__content">
    <ol>
      <li>
        Ordered list item 1
        <ol>
          <li>Ordered list item 2</li>
          <li>Ordered list item 3</li>
        </ol>
      </li>
      <li>Ordered list item 2</li>
      <li>
        Ordered list item 3
        <ol>
          <li>Ordered list item 3</li>
          <li>Ordered list item 4
            <ol>
              <li>Ordered list item 3</li>
              <li>Ordered list item 4</li>
              <li>Ordered list item 5</li>
            </ol>
          </li>
          <li>Ordered list item 5</li>
        </ol>
      </li>
      <li>Ordered list item 4</li>
      <li>Ordered list item 5</li>
    </ol>
  </div>

  <div class="story-container__title">Ordered list with sub unordered list
  </div>
  <div class="story-container__content">
    <ol>
      <li>Ordered list item 1
        <ul>
          <li>Unordered list item 1</li>
          <li>Unordered list item 2</li>
        </ul>
      </li>
      <li>Ordered list item 2</li>
      <li>Ordered list item 3
        <ul>
          <li>Unordered list item 1</li>
          <li>Unordered list item 2
            <ul>
              <li>Unordered list item 1</li>
              <li>Unordered list item 2</li>
              <li>Unordered list item 3</li>
            </ul>
          </li>
          <li>Unordered list item 3</li>
        </ul>
      </li>
      <li>Ordered list item 4</li>
      <li>Ordered list item 5</li>
    </ol>
  </div>
</div>
`,position:{start:1019,end:1019}}],precompiled:!0});i.options.allowInlineIncludes=!0;try{return n(i.render({attributes:new d,...t}))}catch(o){return n("An error occurred whilst rendering /var/www/html/web/themes/custom/civic_sub_theme/components_combined/00-base/typography/typography.stories.twig: "+o.toString())}},v={title:"Base/Typography",component:c},e={parameters:{layout:"centered",html:{disable:!0}}};var s,l,r;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  parameters: {
    layout: 'centered',
    html: {
      disable: true
    }
  }
}`,...(r=(l=e.parameters)==null?void 0:l.docs)==null?void 0:r.source}}};const g=["Typography"];export{e as Typography,g as __namedExportsOrder,v as default};
