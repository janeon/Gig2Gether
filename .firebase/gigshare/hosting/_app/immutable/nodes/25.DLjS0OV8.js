import{s as ie,b as v,f as y,g as b,k as j,h as U,d as g,r as H,l as f,i as C,m as c,v as ce,c as fe,e as te,E as de,t as W,j as X,n as ne,F as ue,q as pe}from"../chunks/scheduler.Tn1ca7fi.js";import{S as me,i as he,b as O,d as z,m as A,a as B,t as K,e as Q}from"../chunks/index.CSvEDU_A.js";import{e as se}from"../chunks/each.BEOo9Sh-.js";import{L as ge}from"../chunks/Label.BeoakjBe.js";import{G as _e}from"../chunks/Gallery.DQ92whFR.js";import{U as ve}from"../chunks/UploadSidebar.CRPbwSa5.js";import{r as be,h as $e,u as we,i as ye,f as je,b as De,d as Ie,e as xe}from"../chunks/client.Db5mx_yJ.js";import{p as Ee}from"../chunks/stores.CaxI_0xx.js";function le(o,t,s){const e=o.slice();return e[9]=t[s].alt,e[10]=t[s].src,e}function ae(o){let t,s,e,l;return{c(){t=v("div"),s=v("img"),l=y(),this.h()},l(n){t=b(n,"DIV",{class:!0});var a=U(t);s=b(a,"IMG",{src:!0,alt:!0,class:!0}),l=j(a),a.forEach(g),this.h()},h(){ue(s.src,e=o[10])||f(s,"src",e),f(s,"alt",o[9]),f(s,"class","object-contain w-full h-full"),f(t,"class","w-full h-100 overflow-hidden")},m(n,a){C(n,t,a),c(t,s),c(t,l)},p:pe,d(n){n&&g(t)}}}function ke(o){let t,s=se(o[3]),e=[];for(let l=0;l<s.length;l+=1)e[l]=ae(le(o,s,l));return{c(){for(let l=0;l<e.length;l+=1)e[l].c();t=te()},l(l){for(let n=0;n<e.length;n+=1)e[n].l(l);t=te()},m(l,n){for(let a=0;a<e.length;a+=1)e[a]&&e[a].m(l,n);C(l,t,n)},p(l,n){if(n&8){s=se(l[3]);let a;for(a=0;a<s.length;a+=1){const i=le(l,s,a);e[a]?e[a].p(i,n):(e[a]=ae(i),e[a].c(),e[a].m(t.parentNode,t))}for(;a<e.length;a+=1)e[a].d(1);e.length=s.length}},d(l){l&&g(t),de(e,l)}}}function Fe(o){let t;return{c(){t=W("Upload file")},l(s){t=X(s,"Upload file")},m(s,e){C(s,t,e)},d(s){s&&g(t)}}}function oe(o){let t,s;return{c(){t=v("p"),s=W(o[0]),this.h()},l(e){t=b(e,"P",{class:!0});var l=U(t);s=X(l,o[0]),l.forEach(g),this.h()},h(){f(t,"class","text-green-600 mt-2")},m(e,l){C(e,t,l),c(t,s)},p(e,l){l&1&&ne(s,e[0])},d(e){e&&g(t)}}}function re(o){let t,s;return{c(){t=v("p"),s=W(o[1]),this.h()},l(e){t=b(e,"P",{class:!0});var l=U(t);s=X(l,o[1]),l.forEach(g),this.h()},h(){f(t,"class","text-red-600 mt-2")},m(e,l){C(e,t,l),c(t,s)},p(e,l){l&2&&ne(s,e[1])},d(e){e&&g(t)}}}function Ue(o){let t,s,e,l,n,a,i,D,M="After screenshotting your completed job, add screenshots",P,I,p="Here are a couple examples:",$,d,S,x,u,E,G,k,J,N,T,L,Y='<i class="fas fa-play fa-2x mr-2"></i> <span>Learn more on how to add files or enter details</span>',R,q,Z;n=new ve({}),d=new _e({props:{class:"gap-2 grid grid-cols-4",$$slots:{default:[ke]},$$scope:{ctx:o}}}),E=new ge({props:{class:"pb-2",for:o[2].id,$$slots:{default:[Fe]},$$scope:{ctx:o}}});let m=o[0]&&oe(o),h=o[1]&&re(o);return{c(){t=v("link"),s=y(),e=v("div"),l=v("div"),O(n.$$.fragment),a=y(),i=v("div"),D=v("p"),D.textContent=M,P=y(),I=v("p"),I.textContent=p,$=y(),O(d.$$.fragment),S=y(),x=v("div"),u=v("div"),O(E.$$.fragment),G=y(),k=v("input"),J=y(),m&&m.c(),N=y(),h&&h.c(),T=y(),L=v("div"),L.innerHTML=Y,this.h()},l(r){t=b(r,"LINK",{rel:!0,href:!0}),s=j(r),e=b(r,"DIV",{class:!0});var _=U(e);l=b(_,"DIV",{class:!0});var V=U(l);z(n.$$.fragment,V),V.forEach(g),a=j(_),i=b(_,"DIV",{class:!0});var w=U(i);D=b(w,"P",{class:!0,"data-svelte-h":!0}),H(D)!=="svelte-1d34xwf"&&(D.textContent=M),P=j(w),I=b(w,"P",{"data-svelte-h":!0}),H(I)!=="svelte-ngnjs6"&&(I.textContent=p),$=j(w),z(d.$$.fragment,w),S=j(w),x=b(w,"DIV",{class:!0});var ee=U(x);u=b(ee,"DIV",{class:!0});var F=U(u);z(E.$$.fragment,F),G=j(F),k=b(F,"INPUT",{id:!0,type:!0,autocomplete:!0,class:!0}),J=j(F),m&&m.l(F),N=j(F),h&&h.l(F),F.forEach(g),ee.forEach(g),T=j(w),L=b(w,"DIV",{class:!0,"data-svelte-h":!0}),H(L)!=="svelte-11tx84z"&&(L.innerHTML=Y),w.forEach(g),_.forEach(g),this.h()},h(){f(t,"rel","stylesheet"),f(t,"href","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"),f(l,"class","w-1/4"),f(D,"class","mb-3"),f(k,"id",o[2].id),f(k,"type","file"),f(k,"autocomplete","off"),f(k,"class","mt-1"),f(u,"class","flex flex-col items-center space-y-4 ml-56"),f(x,"class","flex justify-start mt-6"),f(L,"class","flex items-center mt-4 ml-49 text-black cursor-pointer"),f(i,"class","w-3/4 rounded-md p-6"),f(e,"class","flex flex-row")},m(r,_){C(r,t,_),C(r,s,_),C(r,e,_),c(e,l),A(n,l,null),c(e,a),c(e,i),c(i,D),c(i,P),c(i,I),c(i,$),A(d,i,null),c(i,S),c(i,x),c(x,u),A(E,u,null),c(u,G),c(u,k),c(u,J),m&&m.m(u,null),c(u,N),h&&h.m(u,null),c(i,T),c(i,L),R=!0,q||(Z=ce(k,"change",o[4]),q=!0)},p(r,[_]){const V={};_&8192&&(V.$$scope={dirty:_,ctx:r}),d.$set(V);const w={};_&8192&&(w.$$scope={dirty:_,ctx:r}),E.$set(w),r[0]?m?m.p(r,_):(m=oe(r),m.c(),m.m(u,N)):m&&(m.d(1),m=null),r[1]?h?h.p(r,_):(h=re(r),h.c(),h.m(u,null)):h&&(h.d(1),h=null)},i(r){R||(B(n.$$.fragment,r),B(d.$$.fragment,r),B(E.$$.fragment,r),R=!0)},o(r){K(n.$$.fragment,r),K(d.$$.fragment,r),K(E.$$.fragment,r),R=!1},d(r){r&&(g(t),g(s),g(e)),Q(n),Q(d),Q(E),m&&m.d(),h&&h.d(),q=!1,Z()}}}function Ce(o,t,s){let e;fe(o,Ee,p=>s(5,e=p));let l={id:"job_screenshot"},n=new Date().toISOString().substring(0,10),a="",i="";const D=[{alt:"Job Screenshot example 1",src:"../job1.jpg"},{alt:"Job Screenshot example 2",src:"../job2.jpg"},{alt:"Job Screenshot example 3",src:"../job3.jpg"}];async function M(p){const $=p.target;if($.files.length>0){const d=$.files[0];if(!["image/png","image/jpeg"].includes(d.type)){s(1,i="Only PNG or JPEG files are allowed."),s(0,a="");return}s(1,i=""),await P(d)}}async function P(p){if(p){console.log("File selected for upload:",p.name);try{const $=be($e,`uploads/${p.name}`);await we($,p),console.log("File uploaded to storage:",p.name);const d=await ye($);console.log("File download URL:",d),await I(d,p.name),console.log("File uploaded and metadata saved:",p.name),s(0,a="File uploaded successfully!")}catch($){console.error("Error uploading file:",$),s(0,a=""),s(1,i="Error uploading file.")}}else console.error("No file selected"),s(1,i="No file selected"),s(0,a="")}async function I(p,$){const d=e.data.user;if(!d||!d.uid){console.error("User is not logged in");return}const S=je(De,"users",d.uid,"uploads"),x=Ie(S,`screenshot_${new Date().getTime()}`),u={name:$,url:p,timestamp:new Date,date:new Date(n)};await xe(x,u),console.log("File metadata saved to Firestore:",u)}return[a,i,l,D,M]}class Je extends me{constructor(t){super(),he(this,t,Ce,Ue,ie,{})}}export{Je as component};
