import{s as me,z as K,b as W,f as k,g as L,h as j,k as y,d as _,r as ue,l as B,i as T,m as r,v as ge,B as Q,c as _e,t as ee,j as te}from"../chunks/scheduler.Tn1ca7fi.js";import{S as de,i as he,f as X,b as I,d as O,m as E,a as V,t as Y,e as q}from"../chunks/index.CSvEDU_A.js";import{p as be}from"../chunks/stores.SUmdyQM3.js";import{f as ve,d as ke,e as ye,b as we}from"../chunks/client.Db5mx_yJ.js";import{S as De}from"../chunks/Sidebar.D8leGSOR.js";import{C as Ce}from"../chunks/Checkbox.BSIXW5jl.js";import{L as Z}from"../chunks/Label.BeoakjBe.js";import{S as ce}from"../chunks/Select.CzeuMPHa.js";function Se(s){let a;return{c(){a=ee("Who Would You Like to Share Your Worker Data With?")},l(t){a=te(t,"Who Would You Like to Share Your Worker Data With?")},m(t,u){T(t,a,u)},d(t){t&&_(a)}}}function We(s){let a;return{c(){a=ee("Data Lifespan")},l(t){a=te(t,"Data Lifespan")},m(t,u){T(t,a,u)},d(t){t&&_(a)}}}function Le(s){let a;return{c(){a=ee("Location Granularity")},l(t){a=te(t,"Location Granularity")},m(t,u){T(t,a,u)},d(t){t&&_(a)}}}function Ie(s){let a,t,u,n,p,$,M,c,R,N,d,o="Data Options",P,f,h,x,m,z,H,w,b,U,g,A,F,v,ae="Submit",G,J,ne;t=new De({}),$=new Z({props:{$$slots:{default:[Se]},$$scope:{ctx:s}}});function fe(e){s[5](e)}let se={choices:s[1]};s[0].sharing!==void 0&&(se.group=s[0].sharing),c=new Ce({props:se}),K.push(()=>X(c,"group",fe)),h=new Z({props:{$$slots:{default:[We]},$$scope:{ctx:s}}});function pe(e){s[6](e)}let le={choices:s[2]};s[0].data_lifespan!==void 0&&(le.value=s[0].data_lifespan),m=new ce({props:le}),K.push(()=>X(m,"value",pe)),b=new Z({props:{$$slots:{default:[Le]},$$scope:{ctx:s}}});function $e(e){s[7](e)}let oe={choices:s[3]};return s[0].location_granularity!==void 0&&(oe.value=s[0].location_granularity),g=new ce({props:oe}),K.push(()=>X(g,"value",$e)),{c(){a=W("div"),I(t.$$.fragment),u=k(),n=W("div"),p=W("div"),I($.$$.fragment),M=k(),I(c.$$.fragment),N=k(),d=W("h1"),d.textContent=o,P=k(),f=W("div"),I(h.$$.fragment),x=k(),I(m.$$.fragment),H=k(),w=W("div"),I(b.$$.fragment),U=k(),I(g.$$.fragment),F=k(),v=W("button"),v.textContent=ae,this.h()},l(e){a=L(e,"DIV",{class:!0});var l=j(a);O(t.$$.fragment,l),u=y(l),n=L(l,"DIV",{class:!0});var i=j(n);p=L(i,"DIV",{class:!0});var D=j(p);O($.$$.fragment,D),M=y(D),O(c.$$.fragment,D),D.forEach(_),N=y(i),d=L(i,"H1",{"data-svelte-h":!0}),ue(d)!=="svelte-wbg91i"&&(d.textContent=o),P=y(i),f=L(i,"DIV",{class:!0});var C=j(f);O(h.$$.fragment,C),x=y(C),O(m.$$.fragment,C),C.forEach(_),H=y(i),w=L(i,"DIV",{});var S=j(w);O(b.$$.fragment,S),U=y(S),O(g.$$.fragment,S),S.forEach(_),F=y(i),v=L(i,"BUTTON",{class:!0,"data-svelte-h":!0}),ue(v)!=="svelte-19uljn6"&&(v.textContent=ae),i.forEach(_),l.forEach(_),this.h()},h(){B(p,"class","py-5"),B(f,"class","py-5"),B(v,"class","py-5"),B(n,"class","p-8 w-1/2"),B(a,"class","flex flex-row")},m(e,l){T(e,a,l),E(t,a,null),r(a,u),r(a,n),r(n,p),E($,p,null),r(p,M),E(c,p,null),r(n,N),r(n,d),r(n,P),r(n,f),E(h,f,null),r(f,x),E(m,f,null),r(n,H),r(n,w),E(b,w,null),r(w,U),E(g,w,null),r(n,F),r(n,v),G=!0,J||(ne=ge(v,"click",s[4]),J=!0)},p(e,[l]){const i={};l&512&&(i.$$scope={dirty:l,ctx:e}),$.$set(i);const D={};!R&&l&1&&(R=!0,D.group=e[0].sharing,Q(()=>R=!1)),c.$set(D);const C={};l&512&&(C.$$scope={dirty:l,ctx:e}),h.$set(C);const S={};!z&&l&1&&(z=!0,S.value=e[0].data_lifespan,Q(()=>z=!1)),m.$set(S);const re={};l&512&&(re.$$scope={dirty:l,ctx:e}),b.$set(re);const ie={};!A&&l&1&&(A=!0,ie.value=e[0].location_granularity,Q(()=>A=!1)),g.$set(ie)},i(e){G||(V(t.$$.fragment,e),V($.$$.fragment,e),V(c.$$.fragment,e),V(h.$$.fragment,e),V(m.$$.fragment,e),V(b.$$.fragment,e),V(g.$$.fragment,e),G=!0)},o(e){Y(t.$$.fragment,e),Y($.$$.fragment,e),Y(c.$$.fragment,e),Y(h.$$.fragment,e),Y(m.$$.fragment,e),Y(b.$$.fragment,e),Y(g.$$.fragment,e),G=!1},d(e){e&&_(a),q(t),q($),q(c),q(h),q(m),q(b),q(g),J=!1,ne()}}}function Oe(s,a,t){let u;_e(s,be,o=>t(8,u=o));let n={sharing:[],data_lifespan:"",location_granularity:""};const p=[{value:"me",label:"Me, myself, and I"},{value:"workers",label:"Other workers"},{value:"researchers",label:"Researchers"},{value:"policymakers",label:"Policymakers"}],$=[{value:"never",label:"Never"},{value:"1 week",label:"1 Week"},{value:"1 month",label:"1 Month"},{value:"6 months",label:"6 Months"},{value:"1 year",label:"1 Year"}],M=[{value:"1 mile",label:"1 Mile Radius"},{value:"neighborhood",label:"Neighborhood"},{value:"city",label:"City"},{value:"county",label:"County"}];async function c(){var f;const o=ve(we,"users",(f=u.data.user)==null?void 0:f.uid,"settings"),P=ke(o,"sharing");ye(P,n,{merge:!0})}function R(o){s.$$.not_equal(n.sharing,o)&&(n.sharing=o,t(0,n))}function N(o){s.$$.not_equal(n.data_lifespan,o)&&(n.data_lifespan=o,t(0,n))}function d(o){s.$$.not_equal(n.location_granularity,o)&&(n.location_granularity=o,t(0,n))}return[n,p,$,M,c,R,N,d]}class je extends de{constructor(a){super(),he(this,a,Oe,Ie,me,{})}}export{je as component};
