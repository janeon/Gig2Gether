import{s as q,b as h,f as E,g as _,h as v,k as w,r as O,d as b,l as n,i as P,m as f,v as D,x as N,q as I,w as S,t as U,j as A,y as L,n as R,z as V}from"../chunks/scheduler.Tn1ca7fi.js";import{S as j,i as z}from"../chunks/index.CSvEDU_A.js";import{e as B}from"../chunks/forms.OTAKVcbA.js";import{s as F,a as T}from"../chunks/client.Db5mx_yJ.js";function C(u){let r,e,t=u[0].formErrors+"",c;return{c(){r=h("article"),e=h("div"),c=U(t),this.h()},l(a){r=_(a,"ARTICLE",{});var i=v(r);e=_(i,"DIV",{style:!0});var l=v(e);c=A(l,t),l.forEach(b),i.forEach(b),this.h()},h(){L(e,"color","red")},m(a,i){P(a,r,i),f(r,e),f(e,c)},p(a,i){i&1&&t!==(t=a[0].formErrors+"")&&R(c,t)},d(a){a&&b(r)}}}function M(u){var x;let r,e,t,c,a,i,l,o,p="Login",g,k,s=((x=u[0])==null?void 0:x.formErrors)&&C(u);return{c(){r=h("div"),e=h("form"),t=h("input"),c=E(),a=h("input"),i=E(),s&&s.c(),l=E(),o=h("button"),o.textContent=p,this.h()},l(m){r=_(m,"DIV",{class:!0});var y=v(r);e=_(y,"FORM",{method:!0,class:!0});var d=v(e);t=_(d,"INPUT",{type:!0,placeholder:!0,name:!0,class:!0}),c=w(d),a=_(d,"INPUT",{type:!0,placeholder:!0,name:!0,class:!0}),i=w(d),s&&s.l(d),l=w(d),o=_(d,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),O(o)!=="svelte-bbrd2e"&&(o.textContent=p),d.forEach(b),y.forEach(b),this.h()},h(){n(t,"type","email"),n(t,"placeholder","email"),n(t,"name","email"),n(t,"class","px-4 py-2 border border-gray-300 rounded-md"),t.required=!0,n(a,"type","password"),n(a,"placeholder","password"),n(a,"name","password"),n(a,"class","px-4 py-2 border border-gray-300 rounded-md"),a.required=!0,n(o,"type","submit"),n(o,"class","default-action"),n(e,"method","POST"),n(e,"class","flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"),n(r,"class","flex flex-col items-center")},m(m,y){P(m,r,y),f(r,e),f(e,t),f(e,c),f(e,a),f(e,i),s&&s.m(e,null),f(e,l),f(e,o),u[2](e),g||(k=[D(o,"click",u[1]),N(B.call(null,e))],g=!0)},p(m,[y]){var d;(d=m[0])!=null&&d.formErrors?s?s.p(m,y):(s=C(m),s.c(),s.m(e,l)):s&&(s.d(1),s=null)},i:I,o:I,d(m){m&&b(r),s&&s.d(),u[2](null),g=!1,S(k)}}}function W(u,r,e){let{form:t}=r,c;async function a(l){l.preventDefault();try{c=await(await F(T,t.email.value,t.password.value)).user.getIdToken(),await T.signOut();const p=document.createElement("input");p.type="hidden",p.name="token",p.value=c,t.appendChild(p),t.submit()}catch(o){console.error(o),e(0,t.formErrors=o.code.split("/")[1],t)}}function i(l){V[l?"unshift":"push"](()=>{t=l,e(0,t)})}return u.$$set=l=>{"form"in l&&e(0,t=l.form)},[t,a,i]}class Q extends j{constructor(r){super(),z(this,r,W,M,q,{form:0})}}export{Q as component};
