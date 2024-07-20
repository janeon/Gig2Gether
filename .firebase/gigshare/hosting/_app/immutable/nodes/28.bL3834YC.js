import{s as Nt,z as x,b as m,f,g as p,r as ve,k as c,h as I,d as o,l as L,i as E,m as l,v as ht,B as ee,w as Lt,c as Mt,t as ae,j as le}from"../chunks/scheduler.Tn1ca7fi.js";import{S as Ot,i as St,f as te,b as _,d as v,m as d,a as h,t as b,e as w}from"../chunks/index.CSvEDU_A.js";import{d as bt,b as wt,e as kt,f as At}from"../chunks/client.Db5mx_yJ.js";import{g as Rt}from"../chunks/entry.-dPbBPsr.js";import{p as Bt}from"../chunks/stores.CaxI_0xx.js";import{C as Gt}from"../chunks/Checkbox.BSIXW5jl.js";import{L as ne}from"../chunks/Label.BeoakjBe.js";import{N as tt}from"../chunks/NumberInput.GcyP1MAD.js";import{S as Me}from"../chunks/Select.CzeuMPHa.js";function Yt(n){let a;return{c(){a=ae("Age")},l(t){a=le(t,"Age")},m(t,i){E(t,a,i)},d(t){t&&o(a)}}}function jt(n){let a;return{c(){a=ae("Gender")},l(t){a=le(t,"Gender")},m(t,i){E(t,a,i)},d(t){t&&o(a)}}}function Pt(n){let a;return{c(){a=ae("Race")},l(t){a=le(t,"Race")},m(t,i){E(t,a,i)},d(t){t&&o(a)}}}function Tt(n){let a;return{c(){a=ae("Hours spent on a W2 job (per week)")},l(t){a=le(t,"Hours spent on a W2 job (per week)")},m(t,i){E(t,a,i)},d(t){t&&o(a)}}}function qt(n){let a;return{c(){a=ae("Estimated hours spent on gigs not part of this platform")},l(t){a=le(t,"Estimated hours spent on gigs not part of this platform")},m(t,i){E(t,a,i)},d(t){t&&o(a)}}}function Ut(n){let a;return{c(){a=ae("Who Would You Like to Share Your Worker Data With?")},l(t){a=le(t,"Who Would You Like to Share Your Worker Data With?")},m(t,i){E(t,a,i)},d(t){t&&o(a)}}}function zt(n){let a;return{c(){a=ae("Data Lifespan")},l(t){a=le(t,"Data Lifespan")},m(t,i){E(t,a,i)},d(t){t&&o(a)}}}function Ft(n){let a;return{c(){a=ae("Location Granularity")},l(t){a=le(t,"Location Granularity")},m(t,i){E(t,a,i)},d(t){t&&o(a)}}}function Jt(n){let a,t="Welcome to the GigUnity data-sharing platform!",i,V,se="Before you get started, update your demographics and sharing preferences. You can change these at any time!",de,D,re,u,W,Ne="My Demographics",k,M,O,ke,H,Ce,De,S,A,ye,N,Ie,Ee,r,y,he,R,Oe,Se,T,q,Ae,B,Re,Be,U,z,Ge,G,Ye,je,oe,nt="Submit",Pe,Ve,g,be,at="My Sharing Preferences",Te,F,J,qe,Y,Ue,ze,we,lt="Data Options",Fe,K,Q,Je,j,Ke,Qe,ie,X,Xe,P,Ze,xe,Z,st="Submit",Le,et,rt;O=new ne({props:{$$slots:{default:[Yt]},$$scope:{ctx:n}}});function Ct(e){n[13](e)}let ot={class:"border-2",type:"number"};n[0]!==void 0&&(ot.value=n[0]),H=new tt({props:ot}),x.push(()=>te(H,"value",Ct)),A=new ne({props:{$$slots:{default:[jt]},$$scope:{ctx:n}}});function Dt(e){n[14](e)}let it={items:n[6]};n[1]!==void 0&&(it.value=n[1]),N=new Me({props:it}),x.push(()=>te(N,"value",Dt)),y=new ne({props:{$$slots:{default:[Pt]},$$scope:{ctx:n}}});function yt(e){n[15](e)}let ut={items:n[7]};n[2]!==void 0&&(ut.value=n[2]),R=new Me({props:ut}),x.push(()=>te(R,"value",yt)),q=new ne({props:{$$slots:{default:[Tt]},$$scope:{ctx:n}}});function It(e){n[16](e)}let ft={class:"border-2",type:"number"};n[3]!==void 0&&(ft.value=n[3]),B=new tt({props:ft}),x.push(()=>te(B,"value",It)),z=new ne({props:{$$slots:{default:[qt]},$$scope:{ctx:n}}});function Et(e){n[17](e)}let ct={class:"border-2",type:"number"};n[4]!==void 0&&(ct.value=n[4]),G=new tt({props:ct}),x.push(()=>te(G,"value",Et)),J=new ne({props:{$$slots:{default:[Ut]},$$scope:{ctx:n}}});function Vt(e){n[18](e)}let mt={choices:n[9]};n[5].sharing!==void 0&&(mt.group=n[5].sharing),Y=new Gt({props:mt}),x.push(()=>te(Y,"group",Vt)),Q=new ne({props:{$$slots:{default:[zt]},$$scope:{ctx:n}}});function Wt(e){n[19](e)}let pt={choices:n[10]};n[5].data_lifespan!==void 0&&(pt.value=n[5].data_lifespan),j=new Me({props:pt}),x.push(()=>te(j,"value",Wt)),X=new ne({props:{$$slots:{default:[Ft]},$$scope:{ctx:n}}});function Ht(e){n[20](e)}let $t={choices:n[11]};return n[5].location_granularity!==void 0&&($t.value=n[5].location_granularity),P=new Me({props:$t}),x.push(()=>te(P,"value",Ht)),{c(){a=m("h1"),a.textContent=t,i=f(),V=m("h2"),V.textContent=se,de=f(),D=m("div"),re=m("div"),u=m("div"),W=m("h1"),W.textContent=Ne,k=f(),M=m("div"),_(O.$$.fragment),ke=f(),_(H.$$.fragment),De=f(),S=m("div"),_(A.$$.fragment),ye=f(),_(N.$$.fragment),Ee=f(),r=m("div"),_(y.$$.fragment),he=f(),_(R.$$.fragment),Se=f(),T=m("div"),_(q.$$.fragment),Ae=f(),_(B.$$.fragment),Be=f(),U=m("div"),_(z.$$.fragment),Ge=f(),_(G.$$.fragment),je=f(),oe=m("button"),oe.textContent=nt,Pe=f(),Ve=m("div"),g=m("div"),be=m("h1"),be.textContent=at,Te=f(),F=m("div"),_(J.$$.fragment),qe=f(),_(Y.$$.fragment),ze=f(),we=m("h1"),we.textContent=lt,Fe=f(),K=m("div"),_(Q.$$.fragment),Je=f(),_(j.$$.fragment),Qe=f(),ie=m("div"),_(X.$$.fragment),Xe=f(),_(P.$$.fragment),xe=f(),Z=m("button"),Z.textContent=st,this.h()},l(e){a=p(e,"H1",{"data-svelte-h":!0}),ve(a)!=="svelte-1e5wwab"&&(a.textContent=t),i=c(e),V=p(e,"H2",{"data-svelte-h":!0}),ve(V)!=="svelte-11k74yl"&&(V.textContent=se),de=c(e),D=p(e,"DIV",{class:!0});var s=I(D);re=p(s,"DIV",{});var We=I(re);u=p(We,"DIV",{class:!0});var $=I(u);W=p($,"H1",{"data-svelte-h":!0}),ve(W)!=="svelte-17biu6u"&&(W.textContent=Ne),k=c($),M=p($,"DIV",{class:!0});var ue=I(M);v(O.$$.fragment,ue),ke=c(ue),v(H.$$.fragment,ue),ue.forEach(o),De=c($),S=p($,"DIV",{class:!0});var fe=I(S);v(A.$$.fragment,fe),ye=c(fe),v(N.$$.fragment,fe),fe.forEach(o),Ee=c($),r=p($,"DIV",{class:!0});var ce=I(r);v(y.$$.fragment,ce),he=c(ce),v(R.$$.fragment,ce),ce.forEach(o),Se=c($),T=p($,"DIV",{class:!0});var me=I(T);v(q.$$.fragment,me),Ae=c(me),v(B.$$.fragment,me),me.forEach(o),Be=c($),U=p($,"DIV",{class:!0});var pe=I(U);v(z.$$.fragment,pe),Ge=c(pe),v(G.$$.fragment,pe),pe.forEach(o),je=c($),oe=p($,"BUTTON",{"data-svelte-h":!0}),ve(oe)!=="svelte-lbv59w"&&(oe.textContent=nt),$.forEach(o),We.forEach(o),Pe=c(s),Ve=p(s,"DIV",{});var He=I(Ve);g=p(He,"DIV",{class:!0});var C=I(g);be=p(C,"H1",{"data-svelte-h":!0}),ve(be)!=="svelte-snkj84"&&(be.textContent=at),Te=c(C),F=p(C,"DIV",{class:!0});var $e=I(F);v(J.$$.fragment,$e),qe=c($e),v(Y.$$.fragment,$e),$e.forEach(o),ze=c(C),we=p(C,"H1",{"data-svelte-h":!0}),ve(we)!=="svelte-wbg91i"&&(we.textContent=lt),Fe=c(C),K=p(C,"DIV",{class:!0});var ge=I(K);v(Q.$$.fragment,ge),Je=c(ge),v(j.$$.fragment,ge),ge.forEach(o),Qe=c(C),ie=p(C,"DIV",{});var _e=I(ie);v(X.$$.fragment,_e),Xe=c(_e),v(P.$$.fragment,_e),_e.forEach(o),xe=c(C),Z=p(C,"BUTTON",{class:!0,"data-svelte-h":!0}),ve(Z)!=="svelte-19uljn6"&&(Z.textContent=st),C.forEach(o),He.forEach(o),s.forEach(o),this.h()},h(){L(M,"class","py-5"),L(S,"class","py-5"),L(r,"class","py-5"),L(T,"class","py-5"),L(U,"class","py-5"),L(u,"class","p-8"),L(F,"class","py-5"),L(K,"class","py-5"),L(Z,"class","py-5"),L(g,"class","p-8"),L(D,"class","flex flex-col w-1/2")},m(e,s){E(e,a,s),E(e,i,s),E(e,V,s),E(e,de,s),E(e,D,s),l(D,re),l(re,u),l(u,W),l(u,k),l(u,M),d(O,M,null),l(M,ke),d(H,M,null),l(u,De),l(u,S),d(A,S,null),l(S,ye),d(N,S,null),l(u,Ee),l(u,r),d(y,r,null),l(r,he),d(R,r,null),l(u,Se),l(u,T),d(q,T,null),l(T,Ae),d(B,T,null),l(u,Be),l(u,U),d(z,U,null),l(U,Ge),d(G,U,null),l(u,je),l(u,oe),l(D,Pe),l(D,Ve),l(Ve,g),l(g,be),l(g,Te),l(g,F),d(J,F,null),l(F,qe),d(Y,F,null),l(g,ze),l(g,we),l(g,Fe),l(g,K),d(Q,K,null),l(K,Je),d(j,K,null),l(g,Qe),l(g,ie),d(X,ie,null),l(ie,Xe),d(P,ie,null),l(g,xe),l(g,Z),Le=!0,et||(rt=[ht(oe,"click",n[8]),ht(Z,"click",n[12])],et=!0)},p(e,[s]){const We={};s&8388608&&(We.$$scope={dirty:s,ctx:e}),O.$set(We);const $={};!Ce&&s&1&&(Ce=!0,$.value=e[0],ee(()=>Ce=!1)),H.$set($);const ue={};s&8388608&&(ue.$$scope={dirty:s,ctx:e}),A.$set(ue);const fe={};!Ie&&s&2&&(Ie=!0,fe.value=e[1],ee(()=>Ie=!1)),N.$set(fe);const ce={};s&8388608&&(ce.$$scope={dirty:s,ctx:e}),y.$set(ce);const me={};!Oe&&s&4&&(Oe=!0,me.value=e[2],ee(()=>Oe=!1)),R.$set(me);const pe={};s&8388608&&(pe.$$scope={dirty:s,ctx:e}),q.$set(pe);const He={};!Re&&s&8&&(Re=!0,He.value=e[3],ee(()=>Re=!1)),B.$set(He);const C={};s&8388608&&(C.$$scope={dirty:s,ctx:e}),z.$set(C);const $e={};!Ye&&s&16&&(Ye=!0,$e.value=e[4],ee(()=>Ye=!1)),G.$set($e);const ge={};s&8388608&&(ge.$$scope={dirty:s,ctx:e}),J.$set(ge);const _e={};!Ue&&s&32&&(Ue=!0,_e.group=e[5].sharing,ee(()=>Ue=!1)),Y.$set(_e);const gt={};s&8388608&&(gt.$$scope={dirty:s,ctx:e}),Q.$set(gt);const _t={};!Ke&&s&32&&(Ke=!0,_t.value=e[5].data_lifespan,ee(()=>Ke=!1)),j.$set(_t);const vt={};s&8388608&&(vt.$$scope={dirty:s,ctx:e}),X.$set(vt);const dt={};!Ze&&s&32&&(Ze=!0,dt.value=e[5].location_granularity,ee(()=>Ze=!1)),P.$set(dt)},i(e){Le||(h(O.$$.fragment,e),h(H.$$.fragment,e),h(A.$$.fragment,e),h(N.$$.fragment,e),h(y.$$.fragment,e),h(R.$$.fragment,e),h(q.$$.fragment,e),h(B.$$.fragment,e),h(z.$$.fragment,e),h(G.$$.fragment,e),h(J.$$.fragment,e),h(Y.$$.fragment,e),h(Q.$$.fragment,e),h(j.$$.fragment,e),h(X.$$.fragment,e),h(P.$$.fragment,e),Le=!0)},o(e){b(O.$$.fragment,e),b(H.$$.fragment,e),b(A.$$.fragment,e),b(N.$$.fragment,e),b(y.$$.fragment,e),b(R.$$.fragment,e),b(q.$$.fragment,e),b(B.$$.fragment,e),b(z.$$.fragment,e),b(G.$$.fragment,e),b(J.$$.fragment,e),b(Y.$$.fragment,e),b(Q.$$.fragment,e),b(j.$$.fragment,e),b(X.$$.fragment,e),b(P.$$.fragment,e),Le=!1},d(e){e&&(o(a),o(i),o(V),o(de),o(D)),w(O),w(H),w(A),w(N),w(y),w(R),w(q),w(B),w(z),w(G),w(J),w(Y),w(Q),w(j),w(X),w(P),et=!1,Lt(rt)}}}let Kt="",Qt=0;function Xt(n,a,t){let i;Mt(n,Bt,r=>t(21,i=r));let V=0,se="",de=[{value:"male",name:"Male"},{value:"female",name:"Female"},{value:"non-binary",name:"Non-Binary"},{value:"other",name:"Other"},{value:null,name:"Do not wish to share"}],D="",re=[{value:"american indian/alaska",name:"American Indian or Alaska Native"},{value:"asian",name:"Asian"},{value:"black/african american",name:"Black or African American"},{value:"hispanic/latino",name:"Hispanic or Latino"},{value:"mena",name:"Middle Eastern or North African"},{value:"hawaiian/pi",name:"Native Hawaiian or Pacific Islander"},{value:"white",name:"White"},{value:"multi",name:"Multi-Racial"},{value:"other",name:"Other"},{value:null,name:"Do not wish to share"}],u=0,W=0;async function Ne(){let r={age:V,race:D,gender:se,ethnicity:Kt,householdIncome:Qt,w2Hours:u,otherGigHours:W};try{const y=bt(wt,"demographics",i.data.user.uid);await kt(y,r,{merge:!0})}catch{console.log("There was an error saving your information")}Rt("/protected")}let k={sharing:[],data_lifespan:"",location_granularity:""};const M=[{value:"me",label:"Me, myself, and I"},{value:"workers",label:"Other workers"},{value:"researchers",label:"Researchers"},{value:"policymakers",label:"Policymakers"}],O=[{value:"never",label:"Never"},{value:"1 week",label:"1 Week"},{value:"1 month",label:"1 Month"},{value:"6 months",label:"6 Months"},{value:"1 year",label:"1 Year"}],ke=[{value:"1 mile",label:"1 Mile Radius"},{value:"neighborhood",label:"Neighborhood"},{value:"city",label:"City"},{value:"county",label:"County"}];async function H(){var he;const r=At(wt,"users",(he=i.data.user)==null?void 0:he.uid,"settings"),y=bt(r,"sharing");kt(y,k,{merge:!0})}function Ce(r){V=r,t(0,V)}function De(r){se=r,t(1,se)}function S(r){D=r,t(2,D)}function A(r){u=r,t(3,u)}function ye(r){W=r,t(4,W)}function N(r){n.$$.not_equal(k.sharing,r)&&(k.sharing=r,t(5,k))}function Ie(r){n.$$.not_equal(k.data_lifespan,r)&&(k.data_lifespan=r,t(5,k))}function Ee(r){n.$$.not_equal(k.location_granularity,r)&&(k.location_granularity=r,t(5,k))}return[V,se,D,u,W,k,de,re,Ne,M,O,ke,H,Ce,De,S,A,ye,N,Ie,Ee]}class on extends Ot{constructor(a){super(),St(this,a,Xt,Jt,Nt,{})}}export{on as component};
