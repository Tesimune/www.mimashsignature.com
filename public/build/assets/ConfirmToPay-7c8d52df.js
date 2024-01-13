import{r as i,R as p,W as G,j as o}from"./app-33a1ec65.js";import{M as A}from"./Modal-f8215d17.js";import{L as B}from"./index.esm-35a9a222.js";import"./transition-b326e396.js";import"./iconBase-f687fc9c.js";var m=[];function H(){var e="https://js.paystack.co/v1/inline.js",a=i.useState({loaded:!1,error:!1}),t=a[0],n=a[1];return i.useEffect(function(){if(m.includes(e))n({loaded:!0,error:!1});else{m.push(e);var r=document.createElement("script");r.src=e,r.async=!0;var c=function(){n({loaded:!0,error:!1})},l=function(){var s=m.indexOf(e);s>=0&&m.splice(s,1),r.remove(),n({loaded:!0,error:!0})};return r.addEventListener("load",c),r.addEventListener("complete",c),r.addEventListener("error",l),document.body.appendChild(r),function(){r.removeEventListener("load",c),r.removeEventListener("error",l)}}},[e]),[t.loaded,t.error]}var J=function(e){var a=window.PaystackPop&&window.PaystackPop.setup(e);a&&a.openIframe()};function N(e){var a=H(),t=a[0],n=a[1],r=e.publicKey,c=e.firstname,l=e.lastname,s=e.phone,P=e.email,v=e.amount,y=e.reference,d=e.metadata,h=d===void 0?{}:d,f=e.currency,u=f===void 0?"NGN":f,z=e.channels,x=e.label,L=x===void 0?"":x,g=e.plan,M=g===void 0?"":g,j=e.quantity,T=j===void 0?"":j,C=e.subaccount,R=C===void 0?"":C,S=e.transaction_charge,q=S===void 0?0:S,E=e.bearer,I=E===void 0?"account":E,K=e.split,F=e.split_code;function U(w,k){if(n)throw new Error("Unable to load paystack inline script");if(t){var W={callback:w||function(){return null},onClose:k||function(){return null},key:r,ref:y,email:P,firstname:c,lastname:l,phone:s,amount:v,currency:u,plan:M,quantity:T,"data-custom-button":e["data-custom-button"]||"",channels:z,subaccount:R,transaction_charge:q,bearer:I,label:L,metadata:h,split:K,split_code:F};J(W)}}return i.useEffect(function(){if(n)throw new Error("Unable to load paystack inline script")},[n]),U}var b=function(){return b=Object.assign||function(a){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&(a[c]=t[c])}return a},b.apply(this,arguments)};function O(e,a){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&a.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)a.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(t[n[r]]=e[n[r]]);return t}var _=i.createContext({initializePayment:function(){return null},onSuccess:function(){return null},onClose:function(){return null}}),Q=function(e){var a=e.children,t=e.onSuccess,n=e.onClose,r=O(e,["children","onSuccess","onClose"]),c=N(r);return p.createElement(_.Provider,{value:{initializePayment:c,onSuccess:t,onClose:n}},a)},V=function(e){var a=e.children,t=e.ref,n=i.useContext(_),r=n.initializePayment,c=n.onSuccess,l=n.onClose,s=function(){return r(c,l)};return a({initializePayment:s,ref:t})};i.forwardRef(function(e,a){var t=e.children,n=e.onSuccess,r=e.onClose,c=O(e,["children","onSuccess","onClose"]),l=n||function(){return null},s=r||function(){return null};return p.createElement(Q,b({},c,{onSuccess:l,onClose:s}),p.createElement(V,{ref:a},t))});function ee({store:e,paystack_pub:a,orderData:t,open:n,setOpen:r}){const c={reference:"MS-"+Math.floor(Math.random()*1e9+1),email:t.orderFrom.email,amount:t.SubtotalToPay*100,publicKey:a},{data:l,setData:s,errors:P,post:v}=G({reference:c.reference,total_price:t.total_price,paid_price:t.SubtotalToDisplay,received:t.SubtotalToPay,charges:t.charges,order_from:t.orderFrom,order_to:t.orderTo,description:t.description,content:t.content}),y=N(c),d=u=>{u.preventDefault(),y(h,f)},h=u=>{v(route("order.store",e.username)),r(!1)},f=()=>{console.log("closed"),r(!1)};return o.jsx(A,{show:n,onClose:u=>r(!1),children:o.jsxs("div",{className:"grid py-3 px-5",children:[o.jsxs("div",{className:"flex flex-col justify-center gap-3 h-56",children:[o.jsx("div",{className:"flex justify-center",children:o.jsx("span",{className:" p-3 rounded-full border-2",children:o.jsx(B,{className:"h-9 w-9"})})}),o.jsx("div",{className:"flex justify-center",children:o.jsx("span",{className:"text-3xl",children:"Proceed to Payment?"})})]}),o.jsxs("div",{className:"flex justify-end items-end gap-3",children:[o.jsx("button",{className:"btn btn-primary bg-red-500 hover:bg-red-500/90",children:"Cancel"}),o.jsx("button",{onClick:d,className:"btn btn-primary bg-gold hover:bg-gold/90",children:"Submit"})]})]})})}export{ee as default};