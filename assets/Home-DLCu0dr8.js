import{r as t,j as e}from"./index-1ksqUj5p.js";import{H as y}from"./Helmet-BEuzFi0R.js";import{M as w}from"./Modal-DqWjlDGl.js";function F(){const[h,o]=t.useState(!1),[u,m]=t.useState({}),[l,c]=t.useState(null),a=t.useRef(),i=t.useRef(),n=t.useRef(),r=t.useRef(),s=d=>{c(d.target.value)},x=()=>{o(!0)},p=()=>{o(!1)},b=async d=>{d.preventDefault();const j=a.current.value,g=i.current.value,v=n.current.value,f=r.current.value;m({height:j,age:g,weight:v,dweight:f,bloodType:l}),a.current.value="",i.current.value="",n.current.value="",r.current.value="",c(null),x()};return e.jsxs("div",{className:"homediv",children:[e.jsx(y,{children:e.jsx("title",{children:"SlimMom"})}),e.jsxs("div",{className:"textdiv",children:[e.jsx("p",{className:"title1",children:"Calculate your daily calorie intake right now"}),e.jsxs("form",{className:"homeform",onSubmit:b,children:[e.jsxs("div",{className:"bigdiv",children:[e.jsxs("div",{className:"labelinput",children:[e.jsx("label",{htmlFor:"height",children:"Height *"}),e.jsx("br",{}),e.jsx("input",{className:"inputline",type:"number",name:"height",id:"height",min:"120",max:"220",ref:a,required:!0})]}),e.jsxs("div",{className:"labelinput",children:[e.jsx("label",{htmlFor:"age",children:"Age *"}),e.jsx("br",{}),e.jsx("input",{className:"inputline",type:"number",name:"age",id:"age",min:"18",max:"80",ref:i,required:!0})]}),e.jsxs("div",{className:"labelinput",children:[e.jsx("label",{htmlFor:"weight",children:"Current weight *"}),e.jsx("br",{}),e.jsx("input",{className:"inputline",type:"number",name:"weight",id:"weight",min:"50",max:"180",ref:n,required:!0})]}),e.jsxs("div",{className:"labelinput",children:[e.jsx("label",{htmlFor:"dweight",children:"Desirable weight *"}),e.jsx("br",{}),e.jsx("input",{className:"inputline",type:"number",name:"dweight",id:"dweight",min:"40",max:"170",ref:r,required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{children:"Blood type *"}),e.jsx("br",{}),e.jsxs("div",{className:"radiodiv",children:[e.jsx("input",{type:"radio",id:"bt1",name:"btype",value:"1",onChange:s,checked:l==="1"}),e.jsx("label",{htmlFor:"bt1",children:" 1"}),e.jsx("input",{type:"radio",id:"bt2",name:"btype",value:"2",onChange:s,checked:l==="2"}),e.jsx("label",{htmlFor:"bt2",children:" 2"}),e.jsx("input",{type:"radio",id:"bt3",name:"btype",value:"3",onChange:s,checked:l==="3"}),e.jsx("label",{htmlFor:"bt3",children:" 3"}),e.jsx("input",{type:"radio",id:"bt4",name:"btype",value:"4",onChange:s,checked:l==="4"}),e.jsx("label",{htmlFor:"bt4",children:" 4"})]})]})]}),e.jsx("button",{className:"start",type:"submit",children:"Start losing weight"})]})]}),e.jsx(w,{show:h,handleClose:p,children:u})]})}export{F as default};
