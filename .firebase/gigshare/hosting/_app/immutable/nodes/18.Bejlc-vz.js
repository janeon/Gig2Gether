import{s as W,b as $,f as I,g as v,k as U,h as q,d as g,r as K,l as d,i as F,m as u,v as X,c as Y,e as A,E as Z,t as ee,j as te,F as se,q as ae}from"../chunks/scheduler.Tn1ca7fi.js";import{S as le,i as oe,b as M,d as N,m as T,a as G,t as P,e as S}from"../chunks/index.CSvEDU_A.js";import{e as J}from"../chunks/each.BEOo9Sh-.js";import{L as re}from"../chunks/Label.BeoakjBe.js";import{G as ne}from"../chunks/Gallery.DQ92whFR.js";import{U as ie}from"../chunks/UploadSidebar.CwuGyvda.js";import{r as ce,h as de,u as fe,i as ue,f as me,b as pe,d as ge,e as he}from"../chunks/client.Db5mx_yJ.js";import{p as _e}from"../chunks/stores.SUmdyQM3.js";function O(n,t,a){const e=n.slice();return e[6]=t[a].alt,e[7]=t[a].src,e}function Q(n){let t,a,e,s;return{c(){t=$("div"),a=$("img"),s=I(),this.h()},l(o){t=v(o,"DIV",{class:!0});var l=q(t);a=v(l,"IMG",{src:!0,alt:!0,class:!0}),s=U(l),l.forEach(g),this.h()},h(){se(a.src,e=n[7])||d(a,"src",e),d(a,"alt",n[6]),d(a,"class","object-contain w-full h-full"),d(t,"class","w-full h-70 overflow-hidden")},m(o,l){F(o,t,l),u(t,a),u(t,s)},p:ae,d(o){o&&g(t)}}}function $e(n){let t,a=J(n[1]),e=[];for(let s=0;s<a.length;s+=1)e[s]=Q(O(n,a,s));return{c(){for(let s=0;s<e.length;s+=1)e[s].c();t=A()},l(s){for(let o=0;o<e.length;o+=1)e[o].l(s);t=A()},m(s,o){for(let l=0;l<e.length;l+=1)e[l]&&e[l].m(s,o);F(s,t,o)},p(s,o){if(o&2){a=J(s[1]);let l;for(l=0;l<a.length;l+=1){const i=O(s,a,l);e[l]?e[l].p(i,o):(e[l]=Q(i),e[l].c(),e[l].m(t.parentNode,t))}for(;l<e.length;l+=1)e[l].d(1);e.length=a.length}},d(s){s&&g(t),Z(e,s)}}}function ve(n){let t;return{c(){t=ee("Upload file")},l(a){t=te(a,"Upload file")},m(a,e){F(a,t,e)},d(a){a&&g(t)}}}function we(n){let t,a,e,s,o,l,i,w,f="Upload screenshots related to quest options, progress, and details/criteria. Below are a few examples:",m,c,j,b,h,y,V,x,C,D,z='<i class="fas fa-play fa-2x mr-2"></i> <span>Learn more on how to add files or enter details</span>',E,R,B;return o=new ie({}),c=new ne({props:{class:"gap-2 grid grid-cols-4",$$slots:{default:[$e]},$$scope:{ctx:n}}}),y=new re({props:{class:"pb-2",for:n[0].id,$$slots:{default:[ve]},$$scope:{ctx:n}}}),{c(){t=$("link"),a=I(),e=$("div"),s=$("div"),M(o.$$.fragment),l=I(),i=$("div"),w=$("p"),w.textContent=f,m=I(),M(c.$$.fragment),j=I(),b=$("div"),h=$("div"),M(y.$$.fragment),V=I(),x=$("input"),C=I(),D=$("div"),D.innerHTML=z,this.h()},l(r){t=v(r,"LINK",{rel:!0,href:!0}),a=U(r),e=v(r,"DIV",{class:!0});var p=q(e);s=v(p,"DIV",{class:!0});var L=q(s);N(o.$$.fragment,L),L.forEach(g),l=U(p),i=v(p,"DIV",{class:!0});var _=q(i);w=v(_,"P",{class:!0,"data-svelte-h":!0}),K(w)!=="svelte-zjl7f1"&&(w.textContent=f),m=U(_),N(c.$$.fragment,_),j=U(_),b=v(_,"DIV",{class:!0});var H=q(b);h=v(H,"DIV",{class:!0});var k=q(h);N(y.$$.fragment,k),V=U(k),x=v(k,"INPUT",{id:!0,type:!0,autocomplete:!0,class:!0}),k.forEach(g),H.forEach(g),C=U(_),D=v(_,"DIV",{class:!0,"data-svelte-h":!0}),K(D)!=="svelte-11tx84z"&&(D.innerHTML=z),_.forEach(g),p.forEach(g),this.h()},h(){d(t,"rel","stylesheet"),d(t,"href","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"),d(s,"class","w-1/4"),d(w,"class","mb-3"),d(x,"id",n[0].id),d(x,"type","file"),d(x,"autocomplete","off"),d(x,"class","mt-1"),d(h,"class","flex flex-col items-center space-y-4 ml-56"),d(b,"class","flex justify-start mt-6"),d(D,"class","flex items-center mt-4 ml-49 text-black cursor-pointer"),d(i,"class","w-3/4 rounded-md p-6"),d(e,"class","flex flex-row")},m(r,p){F(r,t,p),F(r,a,p),F(r,e,p),u(e,s),T(o,s,null),u(e,l),u(e,i),u(i,w),u(i,m),T(c,i,null),u(i,j),u(i,b),u(b,h),T(y,h,null),u(h,V),u(h,x),u(i,C),u(i,D),E=!0,R||(B=X(x,"change",n[2]),R=!0)},p(r,[p]){const L={};p&1024&&(L.$$scope={dirty:p,ctx:r}),c.$set(L);const _={};p&1024&&(_.$$scope={dirty:p,ctx:r}),y.$set(_)},i(r){E||(G(o.$$.fragment,r),G(c.$$.fragment,r),G(y.$$.fragment,r),E=!0)},o(r){P(o.$$.fragment,r),P(c.$$.fragment,r),P(y.$$.fragment,r),E=!1},d(r){r&&(g(t),g(a),g(e)),S(o),S(c),S(y),R=!1,B()}}}function be(n,t,a){let e;Y(n,_e,f=>a(3,e=f));let s={id:"quest_screenshot"};const o=[{alt:"ubersc4",src:"../quest4.jpg"},{alt:"ubersc3",src:"../quest3.jpg"},{alt:"ubersc2",src:"../quest2.jpg"},{alt:"ubersc1",src:"../quest1.png"}];async function l(f){const m=f.target;if(m.files.length>0){const c=m.files[0];await i(c)}}async function i(f){if(f){console.log("File selected for upload:",f.name);try{const m=ce(de,`uploads/${f.name}`);await fe(m,f),console.log("File uploaded to storage:",f.name);const c=await ue(m);console.log("File download URL:",c),await w(c,f.name),console.log("File uploaded and metadata saved:",f.name)}catch(m){console.error("Error uploading file:",m)}}else console.error("No file selected")}async function w(f,m){const c=e.data.user;if(!c||!c.uid){console.error("User is not logged in");return}const j=me(pe,"users",c.uid,"uploads"),b=ge(j,`quest_${new Date().getTime()}`),h={name:m,url:f,timestamp:new Date,date:new Date};await he(b,h),console.log("File metadata saved to Firestore:",h)}return[s,o,l]}class Le extends le{constructor(t){super(),oe(this,t,be,we,W,{})}}export{Le as component};
