import{i as D,o as I,a as U,f as P}from"../chunks/firebase.client.BYc3_XmI.js";import{s as y,n as v,c as k,v as F,w as M,x as R,y as V}from"../chunks/scheduler.DCWCPtl2.js";import{S as A,i as w,e as m,s as E,c as d,l as g,f as H,m as f,x as _,g as p,p as N,d as c,a as C,h as j,I as G,F as b,H as W,E as x,B as z,C as L,D as O,G as S}from"../chunks/index.Bb8AvSvR.js";import{p as T}from"../chunks/stores.BBRuaXhS.js";import{a as q}from"../chunks/authstore.BtnQcdCW.js";import{g as J}from"../chunks/entry.2zjSjI6B.js";async function K({url:o}){try{D()}catch(n){console.error(n)}function e(){return new Promise(n=>{I(U,t=>n(t||!1))})}return{getAuthUser:e,url:o.pathname}}const Q=!0,ve=Object.freeze(Object.defineProperty({__proto__:null,load:K,prerender:Q},Symbol.toStringTag,{value:"Module"}));function B(){P(U).then(()=>{q.set(void 0),J("/login")}).catch(o=>{console.log(o)})}function X(o){let e,n="Home",t,r,i="Logout",u,l;return{c(){e=m("a"),e.textContent=n,t=E(),r=m("button"),r.textContent=i,this.h()},l(a){e=d(a,"A",{href:!0,class:!0,"data-svelte-h":!0}),g(e)!=="svelte-1umrjmk"&&(e.textContent=n),t=H(a),r=d(a,"BUTTON",{class:!0,"data-svelte-h":!0}),g(r)!=="svelte-b1bqh"&&(r.textContent=i),this.h()},h(){f(e,"href","/protected"),f(e,"class","hover:underline"),_(e,"active",o[0].url.pathname==="/protected"),f(r,"class","hover:underline")},m(a,s){p(a,e,s),p(a,t,s),p(a,r,s),u||(l=N(r,"click",B),u=!0)},p(a,[s]){s&1&&_(e,"active",a[0].url.pathname==="/protected")},i:v,o:v,d(a){a&&(c(e),c(t),c(r)),u=!1,l()}}}function Y(o,e,n){let t;return k(o,T,r=>n(0,t=r)),[t]}class Z extends A{constructor(e){super(),w(this,e,Y,X,y,{})}}function ee(o){let e,n="Home",t,r,i="Logout",u,l;return{c(){e=m("a"),e.textContent=n,t=E(),r=m("button"),r.textContent=i,this.h()},l(a){e=d(a,"A",{href:!0,class:!0,"data-svelte-h":!0}),g(e)!=="svelte-1umrjmk"&&(e.textContent=n),t=H(a),r=d(a,"BUTTON",{class:!0,"data-svelte-h":!0}),g(r)!=="svelte-b1bqh"&&(r.textContent=i),this.h()},h(){f(e,"href","/protected"),f(e,"class","hover:underline"),_(e,"active",o[0].url.pathname==="/protected"),f(r,"class","hover:underline")},m(a,s){p(a,e,s),p(a,t,s),p(a,r,s),u||(l=N(r,"click",B),u=!0)},p(a,[s]){s&1&&_(e,"active",a[0].url.pathname==="/protected")},i:v,o:v,d(a){a&&(c(e),c(t),c(r)),u=!1,l()}}}function te(o,e,n){let t;return k(o,T,r=>n(0,t=r)),[t]}class re extends A{constructor(e){super(),w(this,e,te,ee,y,{})}}function ne(o){let e,n="Register",t,r,i="Login";return{c(){e=m("a"),e.textContent=n,t=E(),r=m("a"),r.textContent=i,this.h()},l(u){e=d(u,"A",{href:!0,class:!0,"data-svelte-h":!0}),g(e)!=="svelte-1rarkbb"&&(e.textContent=n),t=H(u),r=d(u,"A",{href:!0,class:!0,"data-svelte-h":!0}),g(r)!=="svelte-1vnu10b"&&(r.textContent=i),this.h()},h(){f(e,"href","/register"),f(e,"class","hover:underline text-4xl svelte-czrvi4"),_(e,"active",o[1].url.pathname==="/register"),f(r,"href","/login"),f(r,"class","hover:underline text-4xl svelte-czrvi4"),_(r,"active",o[1].url.pathname==="/login")},m(u,l){p(u,e,l),p(u,t,l),p(u,r,l)},p(u,l){l&2&&_(e,"active",u[1].url.pathname==="/register"),l&2&&_(r,"active",u[1].url.pathname==="/login")},i:v,o:v,d(u){u&&(c(e),c(t),c(r))}}}function ae(o){let e,n;return e=new re({}),{c(){z(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,r){O(e,t,r),n=!0},p:v,i(t){n||(x(e.$$.fragment,t),n=!0)},o(t){b(e.$$.fragment,t),n=!1},d(t){S(e,t)}}}function se(o){let e,n;return e=new Z({}),{c(){z(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,r){O(e,t,r),n=!0},p:v,i(t){n||(x(e.$$.fragment,t),n=!0)},o(t){b(e.$$.fragment,t),n=!1},d(t){S(e,t)}}}function le(o){let e,n,t,r,i;const u=[se,ae,ne],l=[];function a(s,h){return s[0]&&s[0].role=="worker"?0:s[0]&&s[0].role=="policymaker"?1:2}return t=a(o),r=l[t]=u[t](o),{c(){e=m("header"),n=m("nav"),r.c(),this.h()},l(s){e=d(s,"HEADER",{class:!0});var h=C(e);n=d(h,"NAV",{class:!0});var $=C(n);r.l($),$.forEach(c),h.forEach(c),this.h()},h(){f(n,"class","flex gap-4 svelte-czrvi4"),f(e,"class","space-y-4 flex justify-center")},m(s,h){p(s,e,h),j(e,n),l[t].m(n,null),i=!0},p(s,[h]){let $=t;t=a(s),t===$?l[t].p(s,h):(G(),b(l[$],1,1,()=>{l[$]=null}),W(),r=l[t],r?r.p(s,h):(r=l[t]=u[t](s),r.c()),x(r,1),r.m(n,null))},i(s){i||(x(r),i=!0)},o(s){b(r),i=!1},d(s){s&&c(e),l[t].d()}}}function oe(o,e,n){let t,r;return k(o,q,i=>n(0,t=i)),k(o,T,i=>n(1,r=i)),[t,r]}class ie extends A{constructor(e){super(),w(this,e,oe,le,y,{})}}function ue(o){let e,n,t,r,i;t=new ie({});const u=o[1].default,l=F(u,o,o[0],null);return{c(){e=m("main"),n=m("div"),z(t.$$.fragment),r=E(),l&&l.c(),this.h()},l(a){e=d(a,"MAIN",{class:!0});var s=C(e);n=d(s,"DIV",{class:!0});var h=C(n);L(t.$$.fragment,h),r=H(h),l&&l.l(h),h.forEach(c),s.forEach(c),this.h()},h(){f(n,"class","p-4 rounded-lg"),f(e,"class","p-8 space-y-12 font-serif")},m(a,s){p(a,e,s),j(e,n),O(t,n,null),j(n,r),l&&l.m(n,null),i=!0},p(a,[s]){l&&l.p&&(!i||s&1)&&M(l,u,a,a[0],i?V(u,a[0],s,null):R(a[0]),null)},i(a){i||(x(t.$$.fragment,a),x(l,a),i=!0)},o(a){b(t.$$.fragment,a),b(l,a),i=!1},d(a){a&&c(e),S(t),l&&l.d(a)}}}function ce(o,e,n){let{$$slots:t={},$$scope:r}=e;return o.$$set=i=>{"$$scope"in i&&n(0,r=i.$$scope)},[r,t]}class $e extends A{constructor(e){super(),w(this,e,ce,ue,y,{})}}export{$e as component,ve as universal};
