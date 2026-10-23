// phpcs:ignoreFile
const i={title:"Atoms/Chip example event",parameters:{docs:{description:{component:`@file
Chip component event binding example.

Disregard 'export default' - it is required by Storybook only.`}}}};document.addEventListener("DOMContentLoaded",()=>{function t(){alert(`Chip dismiss example event was triggered for Chip with content "${this.textContent.trim()}"`)}document.querySelectorAll(".ct-chip").forEach(e=>{e.hasAttribute("story-processed")||(e.addEventListener("ct.chip.dismiss",t),e.setAttribute("story-processed",1))})});const n=[];export{n as __namedExportsOrder,i as default};
