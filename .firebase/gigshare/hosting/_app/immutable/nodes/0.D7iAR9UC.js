import{s as y,n as $,c as j,q as P,u as R,v as q,w as D}from"../chunks/4.D81rxgET.js";import{S as C,i as H,e as h,s as A,c as _,l as g,f as L,m as c,A as v,g as p,d as f,a as x,h as M,u as F,o as b,p as I,q as k,w,x as T,y as E,z as O}from"../chunks/index.DHZf7VPw.js";import{p as S}from"../chunks/stores.DvPWDyKx.js";const se=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));function N(l){let e,n="Home",t,r,o='<button type="submit">Log out</button>';return{c(){e=h("a"),e.textContent=n,t=A(),r=h("form"),r.innerHTML=o,this.h()},l(a){e=_(a,"A",{href:!0,class:!0,"data-svelte-h":!0}),g(e)!=="svelte-1umrjmk"&&(e.textContent=n),t=L(a),r=_(a,"FORM",{action:!0,method:!0,"data-svelte-h":!0}),g(r)!=="svelte-4vj6ua"&&(r.innerHTML=o),this.h()},h(){c(e,"href","/protected"),c(e,"class","hover:underline"),v(e,"active",l[0].url.pathname==="/protected"),c(r,"action","/logout"),c(r,"method","POST")},m(a,s){p(a,e,s),p(a,t,s),p(a,r,s)},p(a,[s]){s&1&&v(e,"active",a[0].url.pathname==="/protected")},i:$,o:$,d(a){a&&(f(e),f(t),f(r))}}}function V(l,e,n){let t;return j(l,S,r=>n(0,t=r)),[t]}class W extends C{constructor(e){super(),H(this,e,V,N,y,{})}}function B(l){let e,n="Home",t,r,o='<button type="submit">Log out</button>';return{c(){e=h("a"),e.textContent=n,t=A(),r=h("form"),r.innerHTML=o,this.h()},l(a){e=_(a,"A",{href:!0,class:!0,"data-svelte-h":!0}),g(e)!=="svelte-1umrjmk"&&(e.textContent=n),t=L(a),r=_(a,"FORM",{action:!0,method:!0,"data-svelte-h":!0}),g(r)!=="svelte-4vj6ua"&&(r.innerHTML=o),this.h()},h(){c(e,"href","/protected"),c(e,"class","hover:underline"),v(e,"active",l[0].url.pathname==="/protected"),c(r,"action","/logout"),c(r,"method","POST")},m(a,s){p(a,e,s),p(a,t,s),p(a,r,s)},p(a,[s]){s&1&&v(e,"active",a[0].url.pathname==="/protected")},i:$,o:$,d(a){a&&(f(e),f(t),f(r))}}}function G(l,e,n){let t;return j(l,S,r=>n(0,t=r)),[t]}class J extends C{constructor(e){super(),H(this,e,G,B,y,{})}}function K(l){let e,n="Register",t,r,o="Login";return{c(){e=h("a"),e.textContent=n,t=A(),r=h("a"),r.textContent=o,this.h()},l(a){e=_(a,"A",{href:!0,class:!0,"data-svelte-h":!0}),g(e)!=="svelte-1rarkbb"&&(e.textContent=n),t=L(a),r=_(a,"A",{href:!0,class:!0,"data-svelte-h":!0}),g(r)!=="svelte-1vnu10b"&&(r.textContent=o),this.h()},h(){c(e,"href","/register"),c(e,"class","hover:underline text-4xl svelte-czrvi4"),v(e,"active",l[0].url.pathname==="/register"),c(r,"href","/login"),c(r,"class","hover:underline text-4xl svelte-czrvi4"),v(r,"active",l[0].url.pathname==="/login")},m(a,s){p(a,e,s),p(a,t,s),p(a,r,s)},p(a,s){s&1&&v(e,"active",a[0].url.pathname==="/register"),s&1&&v(r,"active",a[0].url.pathname==="/login")},i:$,o:$,d(a){a&&(f(e),f(t),f(r))}}}function Q(l){let e,n;return e=new J({}),{c(){w(e.$$.fragment)},l(t){T(e.$$.fragment,t)},m(t,r){E(e,t,r),n=!0},p:$,i(t){n||(k(e.$$.fragment,t),n=!0)},o(t){b(e.$$.fragment,t),n=!1},d(t){O(e,t)}}}function U(l){let e,n;return e=new W({}),{c(){w(e.$$.fragment)},l(t){T(e.$$.fragment,t)},m(t,r){E(e,t,r),n=!0},p:$,i(t){n||(k(e.$$.fragment,t),n=!0)},o(t){b(e.$$.fragment,t),n=!1},d(t){O(e,t)}}}function X(l){let e,n,t,r,o;const a=[U,Q,K],s=[];function u(i,m){var d,z;return((d=i[0].data.user)==null?void 0:d.role)=="worker"?0:((z=i[0].data.user)==null?void 0:z.role)=="policymaker"?1:2}return t=u(l),r=s[t]=a[t](l),{c(){e=h("header"),n=h("nav"),r.c(),this.h()},l(i){e=_(i,"HEADER",{class:!0});var m=x(e);n=_(m,"NAV",{class:!0});var d=x(n);r.l(d),d.forEach(f),m.forEach(f),this.h()},h(){c(n,"class","flex gap-4 svelte-czrvi4"),c(e,"class","space-y-4 flex justify-center")},m(i,m){p(i,e,m),M(e,n),s[t].m(n,null),o=!0},p(i,[m]){let d=t;t=u(i),t===d?s[t].p(i,m):(F(),b(s[d],1,1,()=>{s[d]=null}),I(),r=s[t],r?r.p(i,m):(r=s[t]=a[t](i),r.c()),k(r,1),r.m(n,null))},i(i){o||(k(r),o=!0)},o(i){b(r),o=!1},d(i){i&&f(e),s[t].d()}}}function Y(l,e,n){let t;return j(l,S,r=>n(0,t=r)),[t]}class Z extends C{constructor(e){super(),H(this,e,Y,X,y,{})}}function ee(l){let e,n,t,r,o;t=new Z({});const a=l[1].default,s=P(a,l,l[0],null);return{c(){e=h("main"),n=h("div"),w(t.$$.fragment),r=A(),s&&s.c(),this.h()},l(u){e=_(u,"MAIN",{class:!0});var i=x(e);n=_(i,"DIV",{class:!0});var m=x(n);T(t.$$.fragment,m),r=L(m),s&&s.l(m),m.forEach(f),i.forEach(f),this.h()},h(){c(n,"class","p-4 rounded-lg"),c(e,"class","p-8 space-y-12 font-serif")},m(u,i){p(u,e,i),M(e,n),E(t,n,null),M(n,r),s&&s.m(n,null),o=!0},p(u,[i]){s&&s.p&&(!o||i&1)&&R(s,a,u,u[0],o?D(a,u[0],i,null):q(u[0]),null)},i(u){o||(k(t.$$.fragment,u),k(s,u),o=!0)},o(u){b(t.$$.fragment,u),b(s,u),o=!1},d(u){u&&f(e),O(t),s&&s.d(u)}}}function te(l,e,n){let{$$slots:t={},$$scope:r}=e;return l.$$set=o=>{"$$scope"in o&&n(0,r=o.$$scope)},[r,t]}class le extends C{constructor(e){super(),H(this,e,te,ee,y,{})}}export{le as component,se as universal};
