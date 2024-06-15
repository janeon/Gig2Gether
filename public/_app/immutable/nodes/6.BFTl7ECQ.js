import{s as J,n as R,d as Y,e as Z,r as $,c as x,b as ee}from"../chunks/scheduler.DCWCPtl2.js";import{S as K,i as Q,w as F,g as I,d as v,e as k,t as V,s as E,c as w,a as q,b as B,f as C,m as u,y as U,h as m,j as M,r as te,p as T,l as A,z as le,n as D,A as se,B as ae,k as ne,C as re,D as ie,q as oe,E as ue,F as ce,G as de}from"../chunks/index.Bb8AvSvR.js";import{g as fe}from"../chunks/entry.2zjSjI6B.js";import{e as _e,d as he,b as pe,c as me,a as ve}from"../chunks/firebase.client.BYc3_XmI.js";import{a as L}from"../chunks/authstore.BtnQcdCW.js";import{e as j}from"../chunks/each.D6YF6ztN.js";function G(a,e,t){const n=a.slice();return n[11]=e[t],n}function be(a){let e,t,n,c,l,s=j(a[3]),r=[];for(let i=0;i<s.length;i+=1)r[i]=W(G(a,s,i));return{c(){e=k("div"),t=k("div"),n=k("div"),c=V(a[1]),l=E();for(let i=0;i<r.length;i+=1)r[i].c();this.h()},l(i){e=w(i,"DIV",{class:!0});var o=q(e);t=w(o,"DIV",{role:!0,class:!0,"aria-labelledby":!0,style:!0,id:!0});var d=q(t);n=w(d,"DIV",{class:!0,id:!0});var h=q(n);c=B(h,a[1]),h.forEach(v),l=C(d);for(let p=0;p<r.length;p+=1)r[p].l(d);d.forEach(v),o.forEach(v),this.h()},h(){u(n,"class","legend"),u(n,"id",`label-${a[6]}`),u(t,"role","radiogroup"),u(t,"class","group-container svelte-oqfdep"),u(t,"aria-labelledby",`label-${a[6]}`),U(t,"font-size",a[4]+"px"),u(t,"id",`group-${a[6]}`),u(e,"class","s s--multi svelte-oqfdep")},m(i,o){I(i,e,o),m(e,t),m(t,n),m(n,c),m(t,l);for(let d=0;d<r.length;d+=1)r[d]&&r[d].m(t,null)},p(i,o){if(o&2&&M(c,i[1]),o&73){s=j(i[3]);let d;for(d=0;d<s.length;d+=1){const h=G(i,s,d);r[d]?r[d].p(h,o):(r[d]=W(h),r[d].c(),r[d].m(t,null))}for(;d<r.length;d+=1)r[d].d(1);r.length=s.length}o&16&&U(t,"font-size",i[4]+"px")},d(i){i&&v(e),te(r,i)}}}function ge(a){let e,t,n,c,l,s,r;return{c(){e=k("div"),t=k("span"),n=V(a[1]),c=E(),l=k("button"),this.h()},l(i){e=w(i,"DIV",{class:!0,style:!0});var o=q(e);t=w(o,"SPAN",{id:!0});var d=q(t);n=B(d,a[1]),d.forEach(v),c=C(o),l=w(o,"BUTTON",{role:!0,"aria-checked":!0,"aria-labelledby":!0,class:!0});var h=q(l);h.forEach(v),o.forEach(v),this.h()},h(){u(t,"id",`switch-${a[6]}`),u(l,"role","switch"),u(l,"aria-checked",a[5]),u(l,"aria-labelledby",`switch-${a[6]}`),u(l,"class","svelte-oqfdep"),u(e,"class","s s--slider svelte-oqfdep"),U(e,"font-size",a[4]+"px")},m(i,o){I(i,e,o),m(e,t),m(t,n),m(e,c),m(e,l),s||(r=T(l,"click",a[7]),s=!0)},p(i,o){o&2&&M(n,i[1]),o&32&&u(l,"aria-checked",i[5]),o&16&&U(e,"font-size",i[4]+"px")},d(i){i&&v(e),s=!1,r()}}}function ke(a){let e,t,n,c,l,s,r="worker",i,o,d="policymaker",h,p;return{c(){e=k("div"),t=k("span"),n=V(a[1]),c=E(),l=k("button"),s=k("span"),s.textContent=r,i=E(),o=k("span"),o.textContent=d,this.h()},l(_){e=w(_,"DIV",{class:!0});var f=q(e);t=w(f,"SPAN",{id:!0,class:!0});var b=q(t);n=B(b,a[1]),b.forEach(v),c=C(f),l=w(f,"BUTTON",{role:!0,"aria-checked":!0,"aria-labelledby":!0,class:!0});var N=q(l);s=w(N,"SPAN",{class:!0,"data-svelte-h":!0}),A(s)!=="svelte-175zwfg"&&(s.textContent=r),i=C(N),o=w(N,"SPAN",{class:!0,"data-svelte-h":!0}),A(o)!=="svelte-g1qozs"&&(o.textContent=d),N.forEach(v),f.forEach(v),this.h()},h(){u(t,"id",`switch-${a[6]}`),u(t,"class","svelte-oqfdep"),u(s,"class","svelte-oqfdep"),u(o,"class","svelte-oqfdep"),u(l,"role","switch"),u(l,"aria-checked",a[5]),u(l,"aria-labelledby",`switch-${a[6]}`),u(l,"class","svelte-oqfdep"),u(e,"class","s s--inner  svelte-oqfdep")},m(_,f){I(_,e,f),m(e,t),m(t,n),m(e,c),m(e,l),m(l,s),m(l,i),m(l,o),h||(p=T(l,"click",a[7]),h=!0)},p(_,f){f&2&&M(n,_[1]),f&32&&u(l,"aria-checked",_[5])},d(_){_&&v(e),h=!1,p()}}}function W(a){let e,t,n,c=!1,l,s,r=a[11]+"",i,o,d,h,p,_;return h=le(a[9][0]),{c(){e=k("input"),l=E(),s=k("label"),i=V(r),o=E(),this.h()},l(f){e=w(f,"INPUT",{type:!0,id:!0,class:!0}),l=C(f),s=w(f,"LABEL",{for:!0,class:!0});var b=q(s);i=B(b,r),o=C(b),b.forEach(v),this.h()},h(){u(e,"type","radio"),u(e,"id",t=`${a[11]}-${a[6]}`),e.__value=n=a[11],D(e,e.__value),u(e,"class","svelte-oqfdep"),u(s,"for",d=`${a[11]}-${a[6]}`),u(s,"class","svelte-oqfdep"),h.p(e)},m(f,b){I(f,e,b),e.checked=e.__value===a[0],I(f,l,b),I(f,s,b),m(s,i),m(s,o),p||(_=T(e,"change",a[8]),p=!0)},p(f,b){b&8&&t!==(t=`${f[11]}-${f[6]}`)&&u(e,"id",t),b&8&&n!==(n=f[11])&&(e.__value=n,D(e,e.__value),c=!0),(c||b&9)&&(e.checked=e.__value===f[0]),b&8&&r!==(r=f[11]+"")&&M(i,r),b&8&&d!==(d=`${f[11]}-${f[6]}`)&&u(s,"for",d)},d(f){f&&(v(e),v(l),v(s)),h.r(),p=!1,_()}}}function we(a){let e;function t(l,s){return l[2]=="inner"?ke:l[2]=="slider"?ge:be}let n=t(a),c=n(a);return{c(){c.c(),e=F()},l(l){c.l(l),e=F()},m(l,s){c.m(l,s),I(l,e,s)},p(l,[s]){n===(n=t(l))&&c?c.p(l,s):(c.d(1),c=n(l),c&&(c.c(),c.m(e.parentNode,e)))},i:R,o:R,d(l){l&&v(e),c.d(l)}}}function ye(a,e,t){let{label:n}=e,{design:c="inner label"}=e,{options:l=[]}=e,{fontSize:s=16}=e,{value:r="on"}=e,i=!0;const o=Math.floor(Math.random()*100);function d(_){const b=_.target.getAttribute("aria-checked");t(5,i=b!=="true"),t(0,r=i===!0?"worker":"policymaker"),console.log(r)}const h=[[]];function p(){r=this.__value,t(0,r)}return a.$$set=_=>{"label"in _&&t(1,n=_.label),"design"in _&&t(2,c=_.design),"options"in _&&t(3,l=_.options),"fontSize"in _&&t(4,s=_.fontSize),"value"in _&&t(0,r=_.value)},[r,n,c,l,s,i,o,d,p,h]}class qe extends K{constructor(e){super(),Q(this,e,ye,we,J,{label:1,design:2,options:3,fontSize:4,value:0})}}function H(a){let e,t="There was an error registering. Please try again.";return{c(){e=k("div"),e.textContent=t,this.h()},l(n){e=w(n,"DIV",{class:!0,"data-svelte-h":!0}),A(e)!=="svelte-1hkfoem"&&(e.textContent=t),this.h()},h(){u(e,"class","p-8 text-red-500 bg-red-100")},m(n,c){I(n,e,c)},d(n){n&&v(e)}}}function Ee(a){let e,t,n,c,l,s,r,i,o,d,h,p="Register",_,f,b,N;function X(g){a[5](g)}let O={label:"I'm a gig",options:["worker","policymaker"],design:"inner"};a[2]!==void 0&&(O.value=a[2]),n=new qe({props:O}),Y.push(()=>se(n,"value",X));let y=!a[3]&&a[3]!==void 0&&H();return{c(){e=E(),t=k("div"),ae(n.$$.fragment),l=E(),s=k("form"),r=k("input"),i=E(),o=k("input"),d=E(),h=k("button"),h.textContent=p,_=E(),y&&y.c(),this.h()},l(g){ne("svelte-f1nrop",document.head).forEach(v),e=C(g),t=w(g,"DIV",{class:!0});var S=q(t);re(n.$$.fragment,S),l=C(S),s=w(S,"FORM",{class:!0});var z=q(s);r=w(z,"INPUT",{type:!0,placeholder:!0,class:!0}),i=C(z),o=w(z,"INPUT",{type:!0,placeholder:!0,class:!0}),d=C(z),h=w(z,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),A(h)!=="svelte-r6twxh"&&(h.textContent=p),_=C(z),y&&y.l(z),z.forEach(v),S.forEach(v),this.h()},h(){document.title="Register",u(r,"type","email"),u(r,"placeholder","Email"),u(r,"class","px-4 py-2 border border-gray-300 rounded-md"),r.required=!0,u(o,"type","password"),u(o,"placeholder","Password"),u(o,"class","px-4 py-2 border border-gray-300 rounded-md"),o.required=!0,u(h,"type","submit"),u(h,"class","default-action"),u(s,"class","flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"),u(t,"class","flex flex-col items-center")},m(g,P){I(g,e,P),I(g,t,P),ie(n,t,null),m(t,l),m(t,s),m(s,r),D(r,a[0]),m(s,i),m(s,o),D(o,a[1]),m(s,d),m(s,h),m(s,_),y&&y.m(s,null),f=!0,b||(N=[T(r,"input",a[6]),T(o,"input",a[7]),T(s,"submit",oe(a[4]))],b=!0)},p(g,[P]){const S={};!c&&P&4&&(c=!0,S.value=g[2],Z(()=>c=!1)),n.$set(S),P&1&&r.value!==g[0]&&D(r,g[0]),P&2&&o.value!==g[1]&&D(o,g[1]),!g[3]&&g[3]!==void 0?y||(y=H(),y.c(),y.m(s,null)):y&&(y.d(1),y=null)},i(g){f||(ue(n.$$.fragment,g),f=!0)},o(g){ce(n.$$.fragment,g),f=!1},d(g){g&&(v(e),v(t)),de(n),y&&y.d(),b=!1,$(N)}}}function Ce(a,e,t){let n;x(a,L,p=>t(8,n=p));let c,l,s="worker",r;const i=()=>{_e(ve,c,l).then(async p=>{ee(L,n={uid:p.user.uid,email:p.user.email||"",role:s},n);const _=he(pe,"users",n.uid);await me(_,{email:n.email}),fe("/protected")}).catch(p=>{const _=p.code,f=p.message;console.log(_,f),t(3,r=!1)})};function o(p){s=p,t(2,s)}function d(){c=this.value,t(0,c)}function h(){l=this.value,t(1,l)}return[c,l,s,r,i,o,d,h]}class Te extends K{constructor(e){super(),Q(this,e,Ce,Ee,J,{})}}export{Te as component};
