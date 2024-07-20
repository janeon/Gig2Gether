import{s as te,b as $,f as U,g as b,k as E,h as k,d as g,r as se,l as d,i as F,m as h,v as le,c as ae,e as A,E as re,t as O,j as z,n as ee,F as oe,q as ne}from"../chunks/scheduler.Tn1ca7fi.js";import{S as ie,i as ce,b as R,d as G,m as x,a as q,t as C,e as H}from"../chunks/index.CSvEDU_A.js";import{e as Q}from"../chunks/each.BEOo9Sh-.js";import{L as fe}from"../chunks/Label.BeoakjBe.js";import{G as de}from"../chunks/Gallery.DQ92whFR.js";import{U as ue}from"../chunks/UploadSidebar.CRPbwSa5.js";import{r as pe,h as me,u as he,i as ge,f as _e,b as ve,d as $e,e as be}from"../chunks/client.Db5mx_yJ.js";import{p as we}from"../chunks/stores.CaxI_0xx.js";function W(r,t,s){const e=r.slice();return e[9]=t[s].alt,e[10]=t[s].src,e}function X(r){let t,s,e,l;return{c(){t=$("div"),s=$("img"),l=U(),this.h()},l(n){t=b(n,"DIV",{class:!0});var a=k(t);s=b(a,"IMG",{src:!0,alt:!0,class:!0}),l=E(a),a.forEach(g),this.h()},h(){oe(s.src,e=r[10])||d(s,"src",e),d(s,"alt",r[9]),d(s,"class","object-contain w-full h-full"),d(t,"class","w-full h-70 overflow-hidden")},m(n,a){F(n,t,a),h(t,s),h(t,l)},p:ne,d(n){n&&g(t)}}}function ye(r){let t,s=Q(r[3]),e=[];for(let l=0;l<s.length;l+=1)e[l]=X(W(r,s,l));return{c(){for(let l=0;l<e.length;l+=1)e[l].c();t=A()},l(l){for(let n=0;n<e.length;n+=1)e[n].l(l);t=A()},m(l,n){for(let a=0;a<e.length;a+=1)e[a]&&e[a].m(l,n);F(l,t,n)},p(l,n){if(n&8){s=Q(l[3]);let a;for(a=0;a<s.length;a+=1){const c=W(l,s,a);e[a]?e[a].p(c,n):(e[a]=X(c),e[a].c(),e[a].m(t.parentNode,t))}for(;a<e.length;a+=1)e[a].d(1);e.length=s.length}},d(l){l&&g(t),re(e,l)}}}function De(r){let t;return{c(){t=O("Upload file")},l(s){t=z(s,"Upload file")},m(s,e){F(s,t,e)},d(s){s&&g(t)}}}function Y(r){let t,s;return{c(){t=$("p"),s=O(r[0]),this.h()},l(e){t=b(e,"P",{class:!0});var l=k(t);s=z(l,r[0]),l.forEach(g),this.h()},h(){d(t,"class","text-green-600 mt-2")},m(e,l){F(e,t,l),h(t,s)},p(e,l){l&1&&ee(s,e[0])},d(e){e&&g(t)}}}function Z(r){let t,s;return{c(){t=$("p"),s=O(r[1]),this.h()},l(e){t=b(e,"P",{class:!0});var l=k(t);s=z(l,r[1]),l.forEach(g),this.h()},h(){d(t,"class","text-red-600 mt-2")},m(e,l){F(e,t,l),h(t,s)},p(e,l){l&2&&ee(s,e[1])},d(e){e&&g(t)}}}function Ie(r){let t,s,e,l,n,a,c,w,T,D,u,i,v,f,V,L,S,j,B='<i class="fas fa-play fa-2x mr-2"></i> <span>Learn more on how to add files or enter details</span>',N,P,J;n=new ue({}),w=new de({props:{class:"gap-2 grid grid-cols-4",$$slots:{default:[ye]},$$scope:{ctx:r}}}),i=new fe({props:{class:"pb-2",for:r[2].id,$$slots:{default:[De]},$$scope:{ctx:r}}});let p=r[0]&&Y(r),m=r[1]&&Z(r);return{c(){t=$("link"),s=U(),e=$("div"),l=$("div"),R(n.$$.fragment),a=U(),c=$("div"),R(w.$$.fragment),T=U(),D=$("div"),u=$("div"),R(i.$$.fragment),v=U(),f=$("input"),V=U(),p&&p.c(),L=U(),m&&m.c(),S=U(),j=$("div"),j.innerHTML=B,this.h()},l(o){t=b(o,"LINK",{rel:!0,href:!0}),s=E(o),e=b(o,"DIV",{class:!0});var _=k(e);l=b(_,"DIV",{class:!0});var M=k(l);G(n.$$.fragment,M),M.forEach(g),a=E(_),c=b(_,"DIV",{class:!0});var y=k(c);G(w.$$.fragment,y),T=E(y),D=b(y,"DIV",{class:!0});var K=k(D);u=b(K,"DIV",{class:!0});var I=k(u);G(i.$$.fragment,I),v=E(I),f=b(I,"INPUT",{id:!0,type:!0,autocomplete:!0,class:!0}),V=E(I),p&&p.l(I),L=E(I),m&&m.l(I),I.forEach(g),K.forEach(g),S=E(y),j=b(y,"DIV",{class:!0,"data-svelte-h":!0}),se(j)!=="svelte-11tx84z"&&(j.innerHTML=B),y.forEach(g),_.forEach(g),this.h()},h(){d(t,"rel","stylesheet"),d(t,"href","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"),d(l,"class","w-1/4"),d(f,"id",r[2].id),d(f,"type","file"),d(f,"autocomplete","off"),d(f,"class","mt-1"),d(u,"class","flex flex-col items-center space-y-4 ml-56"),d(D,"class","flex justify-start mt-6"),d(j,"class","flex items-center mt-4 ml-49 text-black cursor-pointer"),d(c,"class","w-3/4 rounded-md p-6"),d(e,"class","flex flex-row")},m(o,_){F(o,t,_),F(o,s,_),F(o,e,_),h(e,l),x(n,l,null),h(e,a),h(e,c),x(w,c,null),h(c,T),h(c,D),h(D,u),x(i,u,null),h(u,v),h(u,f),h(u,V),p&&p.m(u,null),h(u,L),m&&m.m(u,null),h(c,S),h(c,j),N=!0,P||(J=le(f,"change",r[4]),P=!0)},p(o,[_]){const M={};_&8192&&(M.$$scope={dirty:_,ctx:o}),w.$set(M);const y={};_&8192&&(y.$$scope={dirty:_,ctx:o}),i.$set(y),o[0]?p?p.p(o,_):(p=Y(o),p.c(),p.m(u,L)):p&&(p.d(1),p=null),o[1]?m?m.p(o,_):(m=Z(o),m.c(),m.m(u,null)):m&&(m.d(1),m=null)},i(o){N||(q(n.$$.fragment,o),q(w.$$.fragment,o),q(i.$$.fragment,o),N=!0)},o(o){C(n.$$.fragment,o),C(w.$$.fragment,o),C(i.$$.fragment,o),N=!1},d(o){o&&(g(t),g(s),g(e)),H(n),H(w),H(i),p&&p.d(),m&&m.d(),P=!1,J()}}}function Ue(r,t,s){let e;ae(r,we,i=>s(5,e=i));let l={id:"trip_screenshot"},n=new Date().toISOString().substring(0,10),a="",c="";const w=[{alt:"Uber Trip Screenshot example 1",src:"../trip1.jpg"},{alt:"Uber Trip Screenshot example 2",src:"../trip2.jpg"},{alt:"Uber Trip Screenshot example 3",src:"../trip3.jpg"}];async function T(i){const v=i.target;if(v.files.length>0){const f=v.files[0];if(!["image/png","image/jpeg"].includes(f.type)){s(1,c="Only PNG or JPEG files are allowed."),s(0,a="");return}s(1,c=""),await D(f)}}async function D(i){if(i){console.log("File selected for upload:",i.name);try{const v=pe(me,`uploads/${i.name}`);await he(v,i),console.log("File uploaded to storage:",i.name);const f=await ge(v);console.log("File download URL:",f),await u(f,i.name),console.log("File uploaded and metadata saved:",i.name),s(0,a="File uploaded successfully!")}catch(v){console.error("Error uploading file:",v),s(0,a=""),s(1,c="Error uploading file.")}}else console.error("No file selected"),s(1,c="No file selected"),s(0,a="")}async function u(i,v){const f=e.data.user;if(!f||!f.uid){console.error("User is not logged in");return}const V=_e(ve,"users",f.uid,"uploads"),L=$e(V,`trip_${new Date().getTime()}`),S={name:v,url:i,timestamp:new Date,date:new Date(n)};await be(L,S),console.log("File metadata saved to Firestore:",S)}return[a,c,l,w,T]}class Me extends ie{constructor(t){super(),ce(this,t,Ue,Ie,te,{})}}export{Me as component};
