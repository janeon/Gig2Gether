import{a as v}from"../chunks/authstore.BtnQcdCW.js";import{R as k}from"../chunks/entry.2zjSjI6B.js";import{s as y,n as f,c as m}from"../chunks/scheduler.DCWCPtl2.js";import{S,i as P,s as h,e as w,w as d,k as j,d as c,f as _,c as C,l as x,m as p,g as u,x as b}from"../chunks/index.Bb8AvSvR.js";import{p as q}from"../chunks/stores.BBRuaXhS.js";function E(a,e){throw new k(a,e.toString())}new TextEncoder;const M=async()=>(v.subscribe(e=>{if(!e)throw E(302,"/login")})(),{}),H=Object.freeze(Object.defineProperty({__proto__:null,load:M},Symbol.toStringTag,{value:"Module"}));function g(a){let e,o="Change My Demographics";return{c(){e=w("a"),e.textContent=o,this.h()},l(r){e=C(r,"A",{href:!0,class:!0,"data-svelte-h":!0}),x(e)!=="svelte-15n4024"&&(e.textContent=o),this.h()},h(){p(e,"href","/protected/demographics"),p(e,"class","hover:underline"),b(e,"active",a[1].url.pathname==="/protected/demographics")},m(r,n){u(r,e,n)},p(r,n){n&2&&b(e,"active",r[1].url.pathname==="/protected/demographics")},d(r){r&&c(e)}}}function O(a){let e,o,r="Protected route",n,i,s=a[0]&&a[0].role=="worker"&&g(a);return{c(){e=h(),o=w("h1"),o.textContent=r,n=h(),s&&s.c(),i=d(),this.h()},l(t){j("svelte-1e1qow1",document.head).forEach(c),e=_(t),o=C(t,"H1",{class:!0,"data-svelte-h":!0}),x(o)!=="svelte-19ccron"&&(o.textContent=r),n=_(t),s&&s.l(t),i=d(),this.h()},h(){document.title="Protected route",p(o,"class","text-4xl font-bold")},m(t,l){u(t,e,l),u(t,o,l),u(t,n,l),s&&s.m(t,l),u(t,i,l)},p(t,[l]){t[0]&&t[0].role=="worker"?s?s.p(t,l):(s=g(t),s.c(),s.m(i.parentNode,i)):s&&(s.d(1),s=null)},i:f,o:f,d(t){t&&(c(e),c(o),c(n),c(i)),s&&s.d(t)}}}function R(a,e,o){let r,n;return m(a,v,i=>o(0,r=i)),m(a,q,i=>o(1,n=i)),[r,n]}class N extends S{constructor(e){super(),P(this,e,R,O,y,{})}}export{N as component,H as universal};
