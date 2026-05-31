(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var t={},n=[],r=()=>{},i=()=>!1,a=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),o=e=>e.startsWith(`onUpdate:`),s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>x(e)===`[object Map]`,p=e=>x(e)===`[object Set]`,m=e=>x(e)===`[object Date]`,h=e=>typeof e==`function`,g=e=>typeof e==`string`,_=e=>typeof e==`symbol`,v=e=>typeof e==`object`&&!!e,y=e=>(v(e)||h(e))&&h(e.then)&&h(e.catch),b=Object.prototype.toString,x=e=>b.call(e),S=e=>x(e).slice(8,-1),C=e=>x(e)===`[object Object]`,w=e=>g(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,ee=e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),te=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},ne=/-\w/g,T=te(e=>e.replace(ne,e=>e.slice(1).toUpperCase())),re=/\B([A-Z])/g,E=te(e=>e.replace(re,`-$1`).toLowerCase()),D=te(e=>e.charAt(0).toUpperCase()+e.slice(1)),ie=te(e=>e?`on${D(e)}`:``),O=(e,t)=>!Object.is(e,t),ae=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},k=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},oe=e=>{let t=parseFloat(e);return isNaN(t)?e:t},se,ce=()=>se||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function le(e){if(d(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=g(r)?pe(r):le(r);if(i)for(let e in i)t[e]=i[e]}return t}else if(g(e)||v(e))return e}var ue=/;(?![^(]*\))/g,de=/:([^]+)/,fe=/\/\*[^]*?\*\//g;function pe(e){let t={};return e.replace(fe,``).split(ue).forEach(e=>{if(e){let n=e.split(de);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function A(e){let t=``;if(g(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){let r=A(e[n]);r&&(t+=r+` `)}else if(v(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}var me=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,he=e(me);me+``;function ge(e){return!!e||e===``}function _e(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=ve(e[r],t[r]);return n}function ve(e,t){if(e===t)return!0;let n=m(e),r=m(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=_(e),r=_(t),n||r)return e===t;if(n=d(e),r=d(t),n||r)return n&&r?_e(e,t):!1;if(n=v(e),r=v(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!ve(e[n],t[n]))return!1}}return String(e)===String(t)}var ye=e=>!!(e&&e.__v_isRef===!0),j=e=>g(e)?e:e==null?``:d(e)||v(e)&&(e.toString===b||!h(e.toString))?ye(e)?j(e.value):JSON.stringify(e,be,2):String(e),be=(e,t)=>ye(t)?be(e,t.value):f(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[xe(t,r)+` =>`]=n,e),{})}:p(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>xe(e))}:_(t)?xe(t):v(t)&&!d(t)&&!C(t)?String(t):t,xe=(e,t=``)=>_(e)?`Symbol(${e.description??t})`:e,M,Se=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&M&&(M.active?(this.parent=M,this.index=(M.scopes||=[]).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){let t=M;try{return M=this,e()}finally{M=t}}}on(){++this._on===1&&(this.prevScope=M,M=this)}off(){if(this._on>0&&--this._on===0){if(M===this)M=this.prevScope;else{let e=M;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Ce(){return M}var N,we=new WeakSet,Te=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,M&&(M.active?M.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,we.has(this)&&(we.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||ke(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ve(this),Me(this);let e=N,t=P;N=this,P=!0;try{return this.fn()}finally{Ne(this),N=e,P=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Ie(e);this.deps=this.depsTail=void 0,Ve(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?we.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Pe(this)&&this.run()}get dirty(){return Pe(this)}},Ee=0,De,Oe;function ke(e,t=!1){if(e.flags|=8,t){e.next=Oe,Oe=e;return}e.next=De,De=e}function Ae(){Ee++}function je(){if(--Ee>0)return;if(Oe){let e=Oe;for(Oe=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;De;){let t=De;for(De=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function Me(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Ne(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Ie(r),Le(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Pe(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Fe(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Fe(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===He)||(e.globalVersion=He,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Pe(e))))return;e.flags|=2;let t=e.dep,n=N,r=P;N=e,P=!0;try{Me(e);let n=e.fn(e._value);(t.version===0||O(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{N=n,P=r,Ne(e),e.flags&=-3}}function Ie(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Ie(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Le(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var P=!0,Re=[];function ze(){Re.push(P),P=!1}function Be(){let e=Re.pop();P=e===void 0?!0:e}function Ve(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=N;N=void 0;try{t()}finally{N=e}}}var He=0,Ue=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},We=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!N||!P||N===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==N)t=this.activeLink=new Ue(N,this),N.deps?(t.prevDep=N.depsTail,N.depsTail.nextDep=t,N.depsTail=t):N.deps=N.depsTail=t,Ge(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=N.depsTail,t.nextDep=void 0,N.depsTail.nextDep=t,N.depsTail=t,N.deps===t&&(N.deps=e)}return t}trigger(e){this.version++,He++,this.notify(e)}notify(e){Ae();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{je()}}};function Ge(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Ge(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Ke=new WeakMap,qe=Symbol(``),Je=Symbol(``),Ye=Symbol(``);function F(e,t,n){if(P&&N){let t=Ke.get(e);t||Ke.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new We),r.map=t,r.key=n),r.track()}}function Xe(e,t,n,r,i,a){let o=Ke.get(e);if(!o){He++;return}let s=e=>{e&&e.trigger()};if(Ae(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&w(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Ye||!_(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Ye)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(qe)),f(e)&&s(o.get(Je)));break;case`delete`:i||(s(o.get(qe)),f(e)&&s(o.get(Je)));break;case`set`:f(e)&&s(o.get(qe));break}}je()}function Ze(e){let t=R(e);return t===e?t:(F(t,`iterate`,Ye),L(e)?t:t.map(z))}function Qe(e){return F(e=R(e),`iterate`,Ye),e}function I(e,t){return Pt(e)?Lt(Nt(e)?z(t):t):z(t)}var $e={__proto__:null,[Symbol.iterator](){return et(this,Symbol.iterator,e=>I(this,e))},concat(...e){return Ze(this).concat(...e.map(e=>d(e)?Ze(e):e))},entries(){return et(this,`entries`,e=>(e[1]=I(this,e[1]),e))},every(e,t){return nt(this,`every`,e,t,void 0,arguments)},filter(e,t){return nt(this,`filter`,e,t,e=>e.map(e=>I(this,e)),arguments)},find(e,t){return nt(this,`find`,e,t,e=>I(this,e),arguments)},findIndex(e,t){return nt(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return nt(this,`findLast`,e,t,e=>I(this,e),arguments)},findLastIndex(e,t){return nt(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return nt(this,`forEach`,e,t,void 0,arguments)},includes(...e){return it(this,`includes`,e)},indexOf(...e){return it(this,`indexOf`,e)},join(e){return Ze(this).join(e)},lastIndexOf(...e){return it(this,`lastIndexOf`,e)},map(e,t){return nt(this,`map`,e,t,void 0,arguments)},pop(){return at(this,`pop`)},push(...e){return at(this,`push`,e)},reduce(e,...t){return rt(this,`reduce`,e,t)},reduceRight(e,...t){return rt(this,`reduceRight`,e,t)},shift(){return at(this,`shift`)},some(e,t){return nt(this,`some`,e,t,void 0,arguments)},splice(...e){return at(this,`splice`,e)},toReversed(){return Ze(this).toReversed()},toSorted(e){return Ze(this).toSorted(e)},toSpliced(...e){return Ze(this).toSpliced(...e)},unshift(...e){return at(this,`unshift`,e)},values(){return et(this,`values`,e=>I(this,e))}};function et(e,t,n){let r=Qe(e),i=r[t]();return r!==e&&!L(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var tt=Array.prototype;function nt(e,t,n,r,i,a){let o=Qe(e),s=o!==e&&!L(e),c=o[t];if(c!==tt[t]){let t=c.apply(e,a);return s?z(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,I(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function rt(e,t,n,r){let i=Qe(e),a=i!==e&&!L(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=I(e,t)),n.call(this,t,I(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?I(e,c):c}function it(e,t,n){let r=R(e);F(r,`iterate`,Ye);let i=r[t](...n);return(i===-1||i===!1)&&Ft(n[0])?(n[0]=R(n[0]),r[t](...n)):i}function at(e,t,n=[]){ze(),Ae();let r=R(e)[t].apply(e,n);return je(),Be(),r}var ot=e(`__proto__,__v_isRef,__isVue`),st=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(_));function ct(e){_(e)||(e=String(e));let t=R(this);return F(t,`has`,e),t.hasOwnProperty(e)}var lt=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Dt:Et:i?Tt:wt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=$e[t]))return e;if(t===`hasOwnProperty`)return ct}let o=Reflect.get(e,t,B(e)?e:n);if((_(t)?st.has(t):ot(t))||(r||F(e,`get`,t),i))return o;if(B(o)){let e=a&&w(t)?o:o.value;return r&&v(e)?jt(e):e}return v(o)?r?jt(o):kt(o):o}},ut=class extends lt{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&w(t);if(!this._isShallow){let e=Pt(i);if(!L(n)&&!Pt(n)&&(i=R(i),n=R(n)),!a&&B(i)&&!B(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,B(e)?e:r);return e===R(r)&&(o?O(n,i)&&Xe(e,`set`,t,n,i):Xe(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&Xe(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!_(t)||!st.has(t))&&F(e,`has`,t),n}ownKeys(e){return F(e,`iterate`,d(e)?`length`:qe),Reflect.ownKeys(e)}},dt=class extends lt{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},ft=new ut,pt=new dt,mt=new ut(!0),ht=e=>e,gt=e=>Reflect.getPrototypeOf(e);function _t(e,t,n){return function(...r){let i=this.__v_raw,a=R(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?ht:t?Lt:z;return!t&&F(a,`iterate`,l?Je:qe),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function vt(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function yt(e,t){let n={get(n){let r=this.__v_raw,i=R(r),a=R(n);e||(O(n,a)&&F(i,`get`,n),F(i,`get`,a));let{has:o}=gt(i),s=t?ht:e?Lt:z;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&F(R(t),`iterate`,qe),t.size},has(t){let n=this.__v_raw,r=R(n),i=R(t);return e||(O(t,i)&&F(r,`has`,t),F(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=R(a),s=t?ht:e?Lt:z;return!e&&F(o,`iterate`,qe),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:vt(`add`),set:vt(`set`),delete:vt(`delete`),clear:vt(`clear`)}:{add(e){let n=R(this),r=gt(n),i=R(e),a=!t&&!L(e)&&!Pt(e)?i:e;return r.has.call(n,a)||O(e,a)&&r.has.call(n,e)||O(i,a)&&r.has.call(n,i)||(n.add(a),Xe(n,`add`,a,a)),this},set(e,n){!t&&!L(n)&&!Pt(n)&&(n=R(n));let r=R(this),{has:i,get:a}=gt(r),o=i.call(r,e);o||=(e=R(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?O(n,s)&&Xe(r,`set`,e,n,s):Xe(r,`add`,e,n),this},delete(e){let t=R(this),{has:n,get:r}=gt(t),i=n.call(t,e);i||=(e=R(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&Xe(t,`delete`,e,void 0,a),o},clear(){let e=R(this),t=e.size!==0,n=e.clear();return t&&Xe(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=_t(r,e,t)}),n}function bt(e,t){let n=yt(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}var xt={get:bt(!1,!1)},St={get:bt(!1,!0)},Ct={get:bt(!0,!1)},wt=new WeakMap,Tt=new WeakMap,Et=new WeakMap,Dt=new WeakMap;function Ot(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function kt(e){return Pt(e)?e:Mt(e,!1,ft,xt,wt)}function At(e){return Mt(e,!1,mt,St,Tt)}function jt(e){return Mt(e,!0,pt,Ct,Et)}function Mt(e,t,n,r,i){if(!v(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let a=i.get(e);if(a)return a;let o=Ot(S(e));if(o===0)return e;let s=new Proxy(e,o===2?r:n);return i.set(e,s),s}function Nt(e){return Pt(e)?Nt(e.__v_raw):!!(e&&e.__v_isReactive)}function Pt(e){return!!(e&&e.__v_isReadonly)}function L(e){return!!(e&&e.__v_isShallow)}function Ft(e){return e?!!e.__v_raw:!1}function R(e){let t=e&&e.__v_raw;return t?R(t):e}function It(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&k(e,`__v_skip`,!0),e}var z=e=>v(e)?kt(e):e,Lt=e=>v(e)?jt(e):e;function B(e){return e?e.__v_isRef===!0:!1}function Rt(e){return zt(e,!1)}function zt(e,t){return B(e)?e:new Bt(e,t)}var Bt=class{constructor(e,t){this.dep=new We,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:R(e),this._value=t?e:z(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||L(e)||Pt(e);e=n?e:R(e),O(e,t)&&(this._rawValue=e,this._value=n?e:z(e),this.dep.trigger())}};function Vt(e){return B(e)?e.value:e}var Ht={get:(e,t,n)=>t===`__v_raw`?e:Vt(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return B(i)&&!B(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Ut(e){return Nt(e)?e:new Proxy(e,Ht)}var Wt=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new We(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=He-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&N!==this)return ke(this,!0),!0}get value(){let e=this.dep.track();return Fe(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function Gt(e,t,n=!1){let r,i;return h(e)?r=e:(r=e.get,i=e.set),new Wt(r,i,n)}var Kt={},qt=new WeakMap,Jt=void 0;function Yt(e,t=!1,n=Jt){if(n){let t=qt.get(n);t||qt.set(n,t=[]),t.push(e)}}function Xt(e,n,i=t){let{immediate:a,deep:o,once:s,scheduler:l,augmentJob:u,call:f}=i,p=e=>o?e:L(e)||o===!1||o===0?Zt(e,1):Zt(e),m,g,_,v,y=!1,b=!1;if(B(e)?(g=()=>e.value,y=L(e)):Nt(e)?(g=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>Nt(e)||L(e)),g=()=>e.map(e=>{if(B(e))return e.value;if(Nt(e))return p(e);if(h(e))return f?f(e,2):e()})):g=h(e)?n?f?()=>f(e,2):e:()=>{if(_){ze();try{_()}finally{Be()}}let t=Jt;Jt=m;try{return f?f(e,3,[v]):e(v)}finally{Jt=t}}:r,n&&o){let e=g,t=o===!0?1/0:o;g=()=>Zt(e(),t)}let x=Ce(),S=()=>{m.stop(),x&&x.active&&c(x.effects,m)};if(s&&n){let e=n;n=(...t)=>{e(...t),S()}}let C=b?Array(e.length).fill(Kt):Kt,w=e=>{if(!(!(m.flags&1)||!m.dirty&&!e))if(n){let e=m.run();if(o||y||(b?e.some((e,t)=>O(e,C[t])):O(e,C))){_&&_();let t=Jt;Jt=m;try{let t=[e,C===Kt?void 0:b&&C[0]===Kt?[]:C,v];C=e,f?f(n,3,t):n(...t)}finally{Jt=t}}}else m.run()};return u&&u(w),m=new Te(g),m.scheduler=l?()=>l(w,!1):w,v=e=>Yt(e,!1,m),_=m.onStop=()=>{let e=qt.get(m);if(e){if(f)f(e,4);else for(let t of e)t();qt.delete(m)}},n?a?w(!0):C=m.run():l?l(w.bind(null,!0),!0):m.run(),S.pause=m.pause.bind(m),S.resume=m.resume.bind(m),S.stop=S,S}function Zt(e,t=1/0,n){if(t<=0||!v(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,B(e))Zt(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)Zt(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{Zt(e,t,n)});else if(C(e)){for(let r in e)Zt(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&Zt(e[r],t,n)}return e}function Qt(e,t,n,r){try{return r?e(...r):e()}catch(e){$t(e,t,n)}}function V(e,t,n,r){if(h(e)){let i=Qt(e,t,n,r);return i&&y(i)&&i.catch(e=>{$t(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push(V(e[a],t,n,r));return i}}function $t(e,n,r,i=!0){let a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||t;if(n){let t=n.parent,i=n.proxy,a=`https://vuejs.org/error-reference/#runtime-${r}`;for(;t;){let n=t.ec;if(n){for(let t=0;t<n.length;t++)if(n[t](e,i,a)===!1)return}t=t.parent}if(o){ze(),Qt(o,null,10,[e,i,a]),Be();return}}en(e,r,a,i,s)}function en(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var H=[],U=-1,tn=[],nn=null,rn=0,an=Promise.resolve(),on=null;function sn(e){let t=on||an;return e?t.then(this?e.bind(this):e):t}function cn(e){let t=U+1,n=H.length;for(;t<n;){let r=t+n>>>1,i=H[r],a=mn(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function ln(e){if(!(e.flags&1)){let t=mn(e),n=H[H.length-1];!n||!(e.flags&2)&&t>=mn(n)?H.push(e):H.splice(cn(t),0,e),e.flags|=1,un()}}function un(){on||=an.then(hn)}function dn(e){d(e)?tn.push(...e):nn&&e.id===-1?nn.splice(rn+1,0,e):e.flags&1||(tn.push(e),e.flags|=1),un()}function fn(e,t,n=U+1){for(;n<H.length;n++){let t=H[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;H.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function pn(e){if(tn.length){let e=[...new Set(tn)].sort((e,t)=>mn(e)-mn(t));if(tn.length=0,nn){nn.push(...e);return}for(nn=e,rn=0;rn<nn.length;rn++){let e=nn[rn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}nn=null,rn=0}}var mn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function hn(e){try{for(U=0;U<H.length;U++){let e=H[U];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Qt(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;U<H.length;U++){let e=H[U];e&&(e.flags&=-2)}U=-1,H.length=0,pn(e),on=null,(H.length||tn.length)&&hn(e)}}var W=null,gn=null;function _n(e){let t=W;return W=e,gn=e&&e.type.__scopeId||null,t}function vn(e,t=W,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&xi(-1);let i=_n(t),a;try{a=e(...n)}finally{_n(i),r._d&&xi(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function yn(e,n){if(W===null)return e;let r=ra(W),i=e.dirs||=[];for(let e=0;e<n.length;e++){let[a,o,s,c=t]=n[e];a&&(h(a)&&(a={mounted:a,updated:a}),a.deep&&Zt(o),i.push({dir:a,instance:r,value:o,oldValue:void 0,arg:s,modifiers:c}))}return e}function bn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(ze(),V(c,n,8,[e.el,s,e,t]),Be())}}function xn(e,t){if(Q){let n=Q.provides,r=Q.parent&&Q.parent.provides;r===n&&(n=Q.provides=Object.create(r)),n[e]=t}}function Sn(e,t,n=!1){let r=Hi();if(r||Er){let i=Er?Er._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&h(t)?t.call(r&&r.proxy):t}}var Cn=Symbol.for(`v-scx`),wn=()=>Sn(Cn);function Tn(e,t,n){return En(e,t,n)}function En(e,n,i=t){let{immediate:a,deep:o,flush:c,once:l}=i,u=s({},i),d=n&&a||!n&&c!==`post`,f;if(Ji){if(c===`sync`){let e=wn();f=e.__watcherHandles||=[]}else if(!d){let e=()=>{};return e.stop=r,e.resume=r,e.pause=r,e}}let p=Q;u.call=(e,t,n)=>V(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{K(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():ln(e)}),u.augmentJob=e=>{n&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=Xt(e,n,u);return Ji&&(f?f.push(h):d&&h()),h}function Dn(e,t,n){let r=this.proxy,i=g(e)?e.includes(`.`)?On(r,e):()=>r[e]:e.bind(r,r),a;h(t)?a=t:(a=t.handler,n=t);let o=Gi(this),s=En(i,a.bind(r),n);return o(),s}function On(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var kn=Symbol(`_vte`),An=e=>e.__isTeleport,jn=Symbol(`_leaveCb`);function Mn(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Mn(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Nn(e){e.ids=[e.ids[0]+ e.ids[2]+++`-`,0,0]}function Pn(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var Fn=new WeakMap;function In(e,n,r,a,o=!1){if(d(e)){e.forEach((e,t)=>In(e,n&&(d(n)?n[t]:n),r,a,o));return}if(Rn(a)&&!o){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&In(e,n,r,a.component.subTree);return}let s=a.shapeFlag&4?ra(a.component):a.el,l=o?null:s,{i:f,r:p}=e,m=n&&n.r,_=f.refs===t?f.refs={}:f.refs,v=f.setupState,y=R(v),b=v===t?i:e=>Pn(_,e)?!1:u(y,e),x=(e,t)=>!(t&&Pn(_,t));if(m!=null&&m!==p){if(Ln(n),g(m))_[m]=null,b(m)&&(v[m]=null);else if(B(m)){let e=n;x(m,e.k)&&(m.value=null),e.k&&(_[e.k]=null)}}if(h(p))Qt(p,f,12,[l,_]);else{let t=g(p),n=B(p);if(t||n){let i=()=>{if(e.f){let n=t?b(p)?v[p]:_[p]:x(p)||!e.k?p.value:_[e.k];if(o)d(n)&&c(n,s);else if(d(n))n.includes(s)||n.push(s);else if(t)_[p]=[s],b(p)&&(v[p]=_[p]);else{let t=[s];x(p,e.k)&&(p.value=t),e.k&&(_[e.k]=t)}}else t?(_[p]=l,b(p)&&(v[p]=l)):n&&(x(p,e.k)&&(p.value=l),e.k&&(_[e.k]=l))};if(l){let t=()=>{i(),Fn.delete(e)};t.id=-1,Fn.set(e,t),K(t,r)}else Ln(e),i()}}}function Ln(e){let t=Fn.get(e);t&&(t.flags|=8,Fn.delete(e))}ce().requestIdleCallback,ce().cancelIdleCallback;var Rn=e=>!!e.type.__asyncLoader,zn=e=>e.type.__isKeepAlive;function Bn(e,t){Hn(e,`a`,t)}function Vn(e,t){Hn(e,`da`,t)}function Hn(e,t,n=Q){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(Wn(t,r,n),n){let e=n.parent;for(;e&&e.parent;)zn(e.parent.vnode)&&Un(r,t,n,e),e=e.parent}}function Un(e,t,n,r){let i=Wn(t,e,r,!0);Zn(()=>{c(r[t],i)},n)}function Wn(e,t,n=Q,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{ze();let i=Gi(n),a=V(t,n,e,r);return i(),Be(),a};return r?i.unshift(a):i.push(a),a}}var Gn=e=>(t,n=Q)=>{(!Ji||e===`sp`)&&Wn(e,(...e)=>t(...e),n)},Kn=Gn(`bm`),qn=Gn(`m`),Jn=Gn(`bu`),Yn=Gn(`u`),Xn=Gn(`bum`),Zn=Gn(`um`),Qn=Gn(`sp`),$n=Gn(`rtg`),er=Gn(`rtc`);function tr(e,t=Q){Wn(`ec`,e,t)}var nr=Symbol.for(`v-ndc`);function rr(e,t,n,r){let i,a=n&&n[r],o=d(e);if(o||g(e)){let n=o&&Nt(e),r=!1,s=!1;n&&(r=!L(e),s=Pt(e),e=Qe(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?Lt(z(e[n])):z(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}else if(v(e))if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}else i=[];return n&&(n[r]=i),i}var ir=e=>e?qi(e)?ra(e):ir(e.parent):null,ar=s(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>ir(e.parent),$root:e=>ir(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>mr(e),$forceUpdate:e=>e.f||=()=>{ln(e.update)},$nextTick:e=>e.n||=sn.bind(e.proxy),$watch:e=>Dn.bind(e)}),or=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),sr={get({_:e},n){if(n===`__v_skip`)return!0;let{ctx:r,setupState:i,data:a,props:o,accessCache:s,type:c,appContext:l}=e;if(n[0]!==`$`){let e=s[n];if(e!==void 0)switch(e){case 1:return i[n];case 2:return a[n];case 4:return r[n];case 3:return o[n]}else if(or(i,n))return s[n]=1,i[n];else if(a!==t&&u(a,n))return s[n]=2,a[n];else if(u(o,n))return s[n]=3,o[n];else if(r!==t&&u(r,n))return s[n]=4,r[n];else lr&&(s[n]=0)}let d=ar[n],f,p;if(d)return n===`$attrs`&&F(e.attrs,`get`,``),d(e);if((f=c.__cssModules)&&(f=f[n]))return f;if(r!==t&&u(r,n))return s[n]=4,r[n];if(p=l.config.globalProperties,u(p,n))return p[n]},set({_:e},n,r){let{data:i,setupState:a,ctx:o}=e;return or(a,n)?(a[n]=r,!0):i!==t&&u(i,n)?(i[n]=r,!0):u(e.props,n)||n[0]===`$`&&n.slice(1)in e?!1:(o[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:i,appContext:a,props:o,type:s}},c){let l;return!!(r[c]||e!==t&&c[0]!==`$`&&u(e,c)||or(n,c)||u(o,c)||u(i,c)||u(ar,c)||u(a.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?u(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function cr(e){return d(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var lr=!0;function ur(e){let t=mr(e),n=e.proxy,i=e.ctx;lr=!1,t.beforeCreate&&fr(t.beforeCreate,e,`bc`);let{data:a,computed:o,methods:s,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:g,updated:_,activated:y,deactivated:b,beforeDestroy:x,beforeUnmount:S,destroyed:C,unmounted:w,render:ee,renderTracked:te,renderTriggered:ne,errorCaptured:T,serverPrefetch:re,expose:E,inheritAttrs:D,components:ie,directives:O,filters:ae}=t;if(u&&dr(u,i,null),s)for(let e in s){let t=s[e];h(t)&&(i[e]=t.bind(n))}if(a){let t=a.call(n,n);v(t)&&(e.data=kt(t))}if(lr=!0,o)for(let e in o){let t=o[e],a=$({get:h(t)?t.bind(n,n):h(t.get)?t.get.bind(n,n):r,set:!h(t)&&h(t.set)?t.set.bind(n):r});Object.defineProperty(i,e,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(let e in c)pr(c[e],i,n,e);if(l){let e=h(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{xn(t,e[t])})}f&&fr(f,e,`c`);function k(e,t){d(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(k(Kn,p),k(qn,m),k(Jn,g),k(Yn,_),k(Bn,y),k(Vn,b),k(tr,T),k(er,te),k($n,ne),k(Xn,S),k(Zn,w),k(Qn,re),d(E))if(E.length){let t=e.exposed||={};E.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={};ee&&e.render===r&&(e.render=ee),D!=null&&(e.inheritAttrs=D),ie&&(e.components=ie),O&&(e.directives=O),re&&Nn(e)}function dr(e,t,n=r){d(e)&&(e=yr(e));for(let n in e){let r=e[n],i;i=v(r)?`default`in r?Sn(r.from||n,r.default,!0):Sn(r.from||n):Sn(r),B(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function fr(e,t,n){V(d(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function pr(e,t,n,r){let i=r.includes(`.`)?On(n,r):()=>n[r];if(g(e)){let n=t[e];h(n)&&Tn(i,n)}else if(h(e))Tn(i,e.bind(n));else if(v(e))if(d(e))e.forEach(e=>pr(e,t,n,r));else{let r=h(e.handler)?e.handler.bind(n):t[e.handler];h(r)&&Tn(i,r,e)}}function mr(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>hr(c,e,o,!0)),hr(c,t,o)),v(t)&&a.set(t,c),c}function hr(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&hr(e,a,n,!0),i&&i.forEach(t=>hr(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=gr[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var gr={data:_r,props:xr,emits:xr,methods:br,computed:br,beforeCreate:G,created:G,beforeMount:G,mounted:G,beforeUpdate:G,updated:G,beforeDestroy:G,beforeUnmount:G,destroyed:G,unmounted:G,activated:G,deactivated:G,errorCaptured:G,serverPrefetch:G,components:br,directives:br,watch:Sr,provide:_r,inject:vr};function _r(e,t){return t?e?function(){return s(h(e)?e.call(this,this):e,h(t)?t.call(this,this):t)}:t:e}function vr(e,t){return br(yr(e),yr(t))}function yr(e){if(d(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function G(e,t){return e?[...new Set([].concat(e,t))]:t}function br(e,t){return e?s(Object.create(null),e,t):t}function xr(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:s(Object.create(null),cr(e),cr(t??{})):t}function Sr(e,t){if(!e)return t;if(!t)return e;let n=s(Object.create(null),e);for(let r in t)n[r]=G(e[r],t[r]);return n}function Cr(){return{app:null,config:{isNativeTag:i,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var wr=0;function Tr(e,t){return function(n,r=null){h(n)||(n=s({},n)),r!=null&&!v(r)&&(r=null);let i=Cr(),a=new WeakSet,o=[],c=!1,l=i.app={_uid:wr++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:aa,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&h(e.install)?(a.add(e),e.install(l,...t)):h(e)&&(a.add(e),e(l,...t))),l},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),l},component(e,t){return t?(i.components[e]=t,l):i.components[e]},directive(e,t){return t?(i.directives[e]=t,l):i.directives[e]},mount(a,o,s){if(!c){let u=l._ceVNode||Oi(n,r);return u.appContext=i,s===!0?s=`svg`:s===!1&&(s=void 0),o&&t?t(u,a):e(u,a,s),c=!0,l._container=a,a.__vue_app__=l,ra(u.component)}},onUnmount(e){o.push(e)},unmount(){c&&(V(o,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return i.provides[e]=t,l},runWithContext(e){let t=Er;Er=l;try{return e()}finally{Er=t}}};return l}}var Er=null,Dr=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${T(t)}Modifiers`]||e[`${E(t)}Modifiers`];function Or(e,n,...r){if(e.isUnmounted)return;let i=e.vnode.props||t,a=r,o=n.startsWith(`update:`),s=o&&Dr(i,n.slice(7));s&&(s.trim&&(a=r.map(e=>g(e)?e.trim():e)),s.number&&(a=r.map(oe)));let c,l=i[c=ie(n)]||i[c=ie(T(n))];!l&&o&&(l=i[c=ie(E(n))]),l&&V(l,e,6,a);let u=i[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,V(u,e,6,a)}}var kr=new WeakMap;function Ar(e,t,n=!1){let r=n?kr:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},c=!1;if(!h(e)){let r=e=>{let n=Ar(e,t,!0);n&&(c=!0,s(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!c?(v(e)&&r.set(e,null),null):(d(a)?a.forEach(e=>o[e]=null):s(o,a),v(e)&&r.set(e,o),o)}function jr(e,t){return!e||!a(t)?!1:(t=t.slice(2).replace(/Once$/,``),u(e,t[0].toLowerCase()+t.slice(1))||u(e,E(t))||u(e,t))}function Mr(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:s,attrs:c,emit:l,render:u,renderCache:d,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=_n(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=Pi(u.call(t,e,d,f,m,p,h)),y=c}else{let e=t;v=Pi(e.length>1?e(f,{attrs:c,slots:s,emit:l}):e(f,null)),y=t.props?c:Nr(c)}}catch(t){vi.length=0,$t(t,e,1),v=Oi(gi)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(o)&&(y=Pr(y,a)),b=ji(b,y,!1,!0))}return n.dirs&&(b=ji(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&Mn(b,n.transition),v=b,_n(_),v}var Nr=e=>{let t;for(let n in e)(n===`class`||n===`style`||a(n))&&((t||={})[n]=e[n]);return t},Pr=(e,t)=>{let n={};for(let r in e)(!o(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Fr(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Ir(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(Lr(o,r,n)&&!jr(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?Ir(r,o,l):!0:!!o;return!1}function Ir(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(Lr(t,e,a)&&!jr(n,a))return!0}return!1}function Lr(e,t,n){let r=e[n],i=t[n];return n===`style`&&v(r)&&v(i)?!ve(r,i):r!==i}function Rr({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var zr={},Br=()=>Object.create(zr),Vr=e=>Object.getPrototypeOf(e)===zr;function Hr(e,t,n,r=!1){let i={},a=Br();e.propsDefaults=Object.create(null),Wr(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);n?e.props=r?i:At(i):e.type.props?e.props=i:e.props=a,e.attrs=a}function Ur(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=R(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(jr(e.emitsOptions,o))continue;let d=t[o];if(c)if(u(a,o))d!==a[o]&&(a[o]=d,l=!0);else{let t=T(o);i[t]=Gr(c,s,t,d,e,!1)}else d!==a[o]&&(a[o]=d,l=!0)}}}else{Wr(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!u(t,a)&&((r=E(a))===a||!u(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=Gr(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!u(t,e))&&(delete a[e],l=!0)}l&&Xe(e.attrs,`set`,``)}function Wr(e,n,r,i){let[a,o]=e.propsOptions,s=!1,c;if(n)for(let t in n){if(ee(t))continue;let l=n[t],d;a&&u(a,d=T(t))?!o||!o.includes(d)?r[d]=l:(c||={})[d]=l:jr(e.emitsOptions,t)||(!(t in i)||l!==i[t])&&(i[t]=l,s=!0)}if(o){let n=R(r),i=c||t;for(let t=0;t<o.length;t++){let s=o[t];r[s]=Gr(a,n,s,i[s],e,!u(i,s))}}return s}function Gr(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=u(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&h(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=Gi(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===E(n))&&(r=!0))}return r}var Kr=new WeakMap;function qr(e,r,i=!1){let a=i?Kr:r.propsCache,o=a.get(e);if(o)return o;let c=e.props,l={},f=[],p=!1;if(!h(e)){let t=e=>{p=!0;let[t,n]=qr(e,r,!0);s(l,t),n&&f.push(...n)};!i&&r.mixins.length&&r.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!p)return v(e)&&a.set(e,n),n;if(d(c))for(let e=0;e<c.length;e++){let n=T(c[e]);Jr(n)&&(l[n]=t)}else if(c)for(let e in c){let t=T(e);if(Jr(t)){let n=c[e],r=l[t]=d(n)||h(n)?{type:n}:s({},n),i=r.type,a=!1,o=!0;if(d(i))for(let e=0;e<i.length;++e){let t=i[e],n=h(t)&&t.name;if(n===`Boolean`){a=!0;break}else n===`String`&&(o=!1)}else a=h(i)&&i.name===`Boolean`;r[0]=a,r[1]=o,(a||u(r,`default`))&&f.push(t)}}let m=[l,f];return v(e)&&a.set(e,m),m}function Jr(e){return e[0]!==`$`&&!ee(e)}var Yr=e=>e===`_`||e===`_ctx`||e===`$stable`,Xr=e=>d(e)?e.map(Pi):[Pi(e)],Zr=(e,t,n)=>{if(t._n)return t;let r=vn((...e)=>Xr(t(...e)),n);return r._c=!1,r},Qr=(e,t,n)=>{let r=e._ctx;for(let n in e){if(Yr(n))continue;let i=e[n];if(h(i))t[n]=Zr(n,i,r);else if(i!=null){let e=Xr(i);t[n]=()=>e}}},$r=(e,t)=>{let n=Xr(t);e.slots.default=()=>n},ei=(e,t,n)=>{for(let r in t)(n||!Yr(r))&&(e[r]=t[r])},ti=(e,t,n)=>{let r=e.slots=Br();if(e.vnode.shapeFlag&32){let e=t._;e?(ei(r,t,n),n&&k(r,`_`,e,!0)):Qr(t,r)}else t&&$r(e,t)},ni=(e,n,r)=>{let{vnode:i,slots:a}=e,o=!0,s=t;if(i.shapeFlag&32){let e=n._;e?r&&e===1?o=!1:ei(a,n,r):(o=!n.$stable,Qr(n,a)),s=n}else n&&($r(e,n),s={default:1});if(o)for(let e in a)!Yr(e)&&s[e]==null&&delete a[e]},K=mi;function ri(e){return ii(e)}function ii(e,i){let a=ce();a.__VUE__=!0;let{insert:o,remove:s,patchProp:c,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=r,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,s=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Ti(e,t)&&(r=ve(e),A(e,i,a,!0),e=null),t.patchFlag===-2&&(c=!1,t.dynamicChildren=null);let{type:l,ref:u,shapeFlag:d}=t;switch(l){case hi:y(e,t,n,r);break;case gi:b(e,t,n,r);break;case _i:e??x(t,n,r,o);break;case q:ie(e,t,n,r,i,a,o,s,c);break;default:d&1?w(e,t,n,r,i,a,o,s,c):d&6?O(e,t,n,r,i,a,o,s,c):(d&64||d&128)&&l.process(e,t,n,r,i,a,o,s,c,be)}u!=null&&i?In(u,e&&e.ref,a,t||e,!t):u==null&&e&&e.ref!=null&&In(e.ref,null,a,e,!0)},y=(e,t,n,r)=>{if(e==null)o(t.el=u(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,r)=>{e==null?o(t.el=d(t.children||``),n,r):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=h(e),o(e,n,r),e=i;o(t,n,r)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),s(e),e=n;s(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)te(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),re(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},te=(e,t,n,r,i,a,s,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,a,m&&m.is,m),h&8?p(d,e.children):h&16&&T(e.children,d,null,r,i,ai(e,a),s,u),_&&bn(e,null,r,`created`),ne(d,e,e.scopeId,s,r),m){for(let e in m)e!==`value`&&!ee(e)&&c(d,e,null,m[e],a,r);`value`in m&&c(d,`value`,null,m.value,a),(f=m.onVnodeBeforeMount)&&Ri(f,r,e)}_&&bn(e,null,r,`beforeMount`);let v=si(i,g);v&&g.beforeEnter(d),o(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&K(()=>{try{f&&Ri(f,r,e),v&&g.enter(d),_&&bn(e,null,r,`mounted`)}finally{}},i)},ne=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||pi(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;ne(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},T=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++)v(null,e[l]=s?Fi(e[l]):Pi(e[l]),t,n,r,i,a,o,s)},re=(e,n,r,i,a,o,s)=>{let l=n.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=n;u|=e.patchFlag&16;let m=e.props||t,h=n.props||t,g;if(r&&oi(r,!1),(g=h.onVnodeBeforeUpdate)&&Ri(g,r,n,e),f&&bn(n,e,r,`beforeUpdate`),r&&oi(r,!0),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?E(e.dynamicChildren,d,l,r,i,ai(n,a),o):s||ue(e,n,l,null,r,i,ai(n,a),o,!1),u>0){if(u&16)D(l,m,h,r,a);else if(u&2&&m.class!==h.class&&c(l,`class`,null,h.class,a),u&4&&c(l,`style`,m.style,h.style,a),u&8){let e=n.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t],i=m[n],o=h[n];(o!==i||n===`value`)&&c(l,n,i,o,a,r)}}u&1&&e.children!==n.children&&p(l,n.children)}else !s&&d==null&&D(l,m,h,r,a);((g=h.onVnodeUpdated)||f)&&K(()=>{g&&Ri(g,r,n,e),f&&bn(n,e,r,`updated`)},i)},E=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s];v(c,l,c.el&&(c.type===q||!Ti(c,l)||c.shapeFlag&198)?m(c.el):n,null,r,i,a,o,!0)}},D=(e,n,r,i,a)=>{if(n!==r){if(n!==t)for(let t in n)!ee(t)&&!(t in r)&&c(e,t,n[t],null,a,i);for(let t in r){if(ee(t))continue;let o=r[t],s=n[t];o!==s&&t!==`value`&&c(e,t,s,o,a,i)}`value`in r&&c(e,`value`,n.value,r.value,a)}},ie=(e,t,n,r,i,a,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(o(d,n,r),o(f,n,r),T(t.children||[],n,f,i,a,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(E(e.dynamicChildren,m,n,i,a,s,c),(t.key!=null||i&&t===i.subTree)&&ci(e,t,!0)):ue(e,t,n,f,i,a,s,c,l)},O=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):k(t,n,r,i,a,o,c):oe(e,t,c)},k=(e,t,n,r,i,a,o)=>{let s=e.component=Vi(e,r,i);if(zn(e)&&(s.ctx.renderer=be),Yi(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,se,o),!e.el){let r=s.subTree=Oi(gi);b(null,r,t,n),e.placeholder=r.el}}else se(s,e,t,n,i,a,o)},oe=(e,t,n)=>{let r=t.component=e.component;if(Fr(e,t,n))if(r.asyncDep&&!r.asyncResolved){le(r,t,n);return}else r.next=t,r.update();else t.el=e.el,r.vnode=t},se=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=ui(e);if(n){t&&(t.el=c.el,le(e,t,o)),n.asyncDep.then(()=>{K(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;oi(e,!1),t?(t.el=c.el,le(e,t,o)):t=c,n&&ae(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&Ri(d,s,t,c),oi(e,!0);let f=Mr(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),ve(p),e,i,a),t.el=f.el,u===null&&Rr(e,f.el),r&&K(r,i),(d=t.props&&t.props.onVnodeUpdated)&&K(()=>Ri(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=Rn(t);if(oi(e,!1),l&&ae(l),!m&&(o=c&&c.onVnodeBeforeMount)&&Ri(o,d,t),oi(e,!0),s&&M){let t=()=>{e.subTree=Mr(e),M(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=Mr(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&K(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;K(()=>Ri(o,d,e),i)}(t.shapeFlag&256||d&&Rn(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&K(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new Te(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>ln(u),oi(e,!0),l()},le=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,Ur(e,t.props,r,n),ni(e,t.children,n),ze(),fn(e),Be()},ue=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){fe(l,d,n,r,i,a,o,s,c);return}else if(f&256){de(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&_e(l,i,a),d!==l&&p(n,d)):u&16?m&16?fe(l,d,n,r,i,a,o,s,c):_e(l,i,a,!0):(u&8&&p(n,``),m&16&&T(d,n,r,i,a,o,s,c))},de=(e,t,r,i,a,o,s,c,l)=>{e||=n,t||=n;let u=e.length,d=t.length,f=Math.min(u,d),p;for(p=0;p<f;p++){let n=t[p]=l?Fi(t[p]):Pi(t[p]);v(e[p],n,r,null,a,o,s,c,l)}u>d?_e(e,a,o,!0,!1,f):T(t,r,i,a,o,s,c,l,f)},fe=(e,t,r,i,a,o,s,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let n=e[u],i=t[u]=l?Fi(t[u]):Pi(t[u]);if(Ti(n,i))v(n,i,r,null,a,o,s,c,l);else break;u++}for(;u<=f&&u<=p;){let n=e[f],i=t[p]=l?Fi(t[p]):Pi(t[p]);if(Ti(n,i))v(n,i,r,null,a,o,s,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,n=e<d?t[e].el:i;for(;u<=p;)v(null,t[u]=l?Fi(t[u]):Pi(t[u]),r,n,a,o,s,c,l),u++}}else if(u>p)for(;u<=f;)A(e[u],a,o,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?Fi(t[u]):Pi(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let n=e[u];if(y>=b){A(n,a,o,!0);continue}let i;if(n.key!=null)i=g.get(n.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&Ti(n,t[_])){i=_;break}i===void 0?A(n,a,o,!0):(C[i-h]=u+1,i>=S?S=i:x=!0,v(n,t[i],r,null,a,o,s,c,l),y++)}let w=x?li(C):n;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,n=t[e],f=t[e+1],p=e+1<d?f.el||fi(f):i;C[u]===0?v(null,n,r,p,a,o,s,c,l):x&&(_<0||u!==w[_]?pe(n,r,p,2):_--)}}},pe=(e,t,n,r,i=null)=>{let{el:a,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){pe(e.component.subTree,t,n,r);return}if(d&128){e.suspense.move(t,n,r);return}if(d&64){c.move(e,t,n,be);return}if(c===q){o(a,t,n);for(let e=0;e<u.length;e++)pe(u[e],t,n,r);o(e.anchor,t,n);return}if(c===_i){S(e,t,n);return}if(r!==2&&d&1&&l)if(r===0)l.persisted&&!a[jn]?o(a,t,n):(l.beforeEnter(a),o(a,t,n),K(()=>l.enter(a),i));else{let{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?s(a):o(a,t,n)},d=()=>{let e=a._isLeaving||!!a[jn];a._isLeaving&&a[jn](!0),l.persisted&&!e?u():r(a,()=>{u(),c&&c()})};i?i(a,u,d):d()}else o(a,t,n)},A=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if(d===-2&&(i=!1),s!=null&&(ze(),In(s,null,n,e,!0),Be()),p!=null&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!Rn(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&Ri(_,t,e),u&6)ge(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&bn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,be,r):l&&!l.hasOnce&&(a!==q||d>0&&d&64)?_e(l,t,n,!1,!0):(a===q&&d&384||!i&&u&16)&&_e(c,t,n),r&&me(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&K(()=>{_&&Ri(_,t,e),h&&bn(e,null,t,`unmounted`),v&&(e.el=null)},n)},me=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===q){he(n,r);return}if(t===_i){C(e);return}let a=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(e.shapeFlag&1&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,o=()=>t(n,a);r?r(e.el,a,o):o()}else a()},he=(e,t)=>{let n;for(;e!==t;)n=h(e),s(e),e=n;s(t)},ge=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;di(c),di(l),r&&ae(r),i.stop(),a&&(a.flags|=8,A(o,e,t,n)),s&&K(s,t),K(()=>{e.isUnmounted=!0},t)},_e=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)A(e[o],t,n,r,i)},ve=e=>{if(e.shapeFlag&6)return ve(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[kn];return n?h(n):t},ye=!1,j=(e,t,n)=>{let r;e==null?t._vnode&&(A(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ye||=(ye=!0,fn(r),pn(),!1)},be={p:v,um:A,m:pe,r:me,mt:k,mc:T,pc:ue,pbc:E,n:ve,o:e},xe,M;return i&&([xe,M]=i(be)),{render:j,hydrate:xe,createApp:Tr(j,xe)}}function ai({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function oi({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function si(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function ci(e,t,n=!1){let r=e.children,i=t.children;if(d(r)&&d(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=Fi(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&ci(t,a)),a.type===hi&&(a.patchFlag===-1&&(a=i[e]=Fi(a)),a.el=t.el),a.type===gi&&!a.el&&(a.el=t.el)}}function li(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-- >0;)n[a]=o,o=t[o];return n}function ui(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:ui(t)}function di(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function fi(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?fi(t.subTree):null}var pi=e=>e.__isSuspense;function mi(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):dn(e)}var q=Symbol.for(`v-fgt`),hi=Symbol.for(`v-txt`),gi=Symbol.for(`v-cmt`),_i=Symbol.for(`v-stc`),vi=[],J=null;function Y(e=!1){vi.push(J=e?null:[])}function yi(){vi.pop(),J=vi[vi.length-1]||null}var bi=1;function xi(e,t=!1){bi+=e,e<0&&J&&t&&(J.hasOnce=!0)}function Si(e){return e.dynamicChildren=bi>0?J||n:null,yi(),bi>0&&J&&J.push(e),e}function X(e,t,n,r,i,a){return Si(Z(e,t,n,r,i,a,!0))}function Ci(e,t,n,r,i){return Si(Oi(e,t,n,r,i,!0))}function wi(e){return e?e.__v_isVNode===!0:!1}function Ti(e,t){return e.type===t.type&&e.key===t.key}var Ei=({key:e})=>e??null,Di=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:g(e)||B(e)||h(e)?{i:W,r:e,k:t,f:!!n}:e);function Z(e,t=null,n=null,r=0,i=null,a=e===q?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ei(t),ref:t&&Di(t),scopeId:gn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:W};return s?(Ii(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=g(n)?8:16),bi>0&&!o&&J&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&J.push(c),c}var Oi=ki;function ki(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===nr)&&(e=gi),wi(e)){let r=ji(e,t,!0);return n&&Ii(r,n),bi>0&&!a&&J&&(r.shapeFlag&6?J[J.indexOf(e)]=r:J.push(r)),r.patchFlag=-2,r}if(ia(e)&&(e=e.__vccOpts),t){t=Ai(t);let{class:e,style:n}=t;e&&!g(e)&&(t.class=A(e)),v(n)&&(Ft(n)&&!d(n)&&(n=s({},n)),t.style=le(n))}let o=g(e)?1:pi(e)?128:An(e)?64:v(e)?4:h(e)?2:0;return Z(e,t,n,r,i,o,a,!0)}function Ai(e){return e?Ft(e)||Vr(e)?s({},e):e:null}function ji(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?Li(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Ei(l),ref:t&&t.ref?n&&a?d(a)?a.concat(Di(t)):[a,Di(t)]:Di(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==q?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&ji(e.ssContent),ssFallback:e.ssFallback&&ji(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&Mn(u,c.clone(u)),u}function Mi(e=` `,t=0){return Oi(hi,null,e,t)}function Ni(e=``,t=!1){return t?(Y(),Ci(gi,null,e)):Oi(gi,null,e)}function Pi(e){return e==null||typeof e==`boolean`?Oi(gi):d(e)?Oi(q,null,e.slice()):wi(e)?Fi(e):Oi(hi,null,String(e))}function Fi(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:ji(e)}function Ii(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(d(t))n=16;else if(typeof t==`object`)if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),Ii(e,n()),n._c&&(n._d=!0));return}else{n=32;let r=t._;!r&&!Vr(t)?t._ctx=W:r===3&&W&&(W.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else h(t)?(t={default:t,_ctx:W},n=32):(t=String(t),r&64?(n=16,t=[Mi(t)]):n=8);e.children=t,e.shapeFlag|=n}function Li(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=A([t.class,r.class]));else if(e===`style`)t.style=le([t.style,r.style]);else if(a(e)){let n=t[e],i=r[e];i&&n!==i&&!(d(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!o(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function Ri(e,t,n,r=null){V(e,t,7,[n,r])}var zi=Cr(),Bi=0;function Vi(e,n,r){let i=e.type,a=(n?n.appContext:e.appContext)||zi,o={uid:Bi++,vnode:e,type:i,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Se(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:qr(i,a),emitsOptions:Ar(i,a),emit:null,emitted:null,propsDefaults:t,inheritAttrs:i.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=Or.bind(null,o),e.ce&&e.ce(o),o}var Q=null,Hi=()=>Q||W,Ui,Wi;{let e=ce(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};Ui=t(`__VUE_INSTANCE_SETTERS__`,e=>Q=e),Wi=t(`__VUE_SSR_SETTERS__`,e=>Ji=e)}var Gi=e=>{let t=Q;return Ui(e),e.scope.on(),()=>{e.scope.off(),Ui(t)}},Ki=()=>{Q&&Q.scope.off(),Ui(null)};function qi(e){return e.vnode.shapeFlag&4}var Ji=!1;function Yi(e,t=!1,n=!1){t&&Wi(t);let{props:r,children:i}=e.vnode,a=qi(e);Hr(e,r,a,t),ti(e,i,n||t);let o=a?Xi(e,t):void 0;return t&&Wi(!1),o}function Xi(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,sr);let{setup:r}=n;if(r){ze();let n=e.setupContext=r.length>1?na(e):null,i=Gi(e),a=Qt(r,e,0,[e.props,n]),o=y(a);if(Be(),i(),(o||e.sp)&&!Rn(e)&&Nn(e),o){if(a.then(Ki,Ki),t)return a.then(n=>{Zi(e,n,t)}).catch(t=>{$t(t,e,0)});e.asyncDep=a}else Zi(e,a,t)}else ea(e,t)}function Zi(e,t,n){h(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:v(t)&&(e.setupState=Ut(t)),ea(e,n)}var Qi,$i;function ea(e,t,n){let i=e.type;if(!e.render){if(!t&&Qi&&!i.render){let t=i.template||mr(e).template;if(t){let{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:a,compilerOptions:o}=i;i.render=Qi(t,s(s({isCustomElement:n,delimiters:a},r),o))}}e.render=i.render||r,$i&&$i(e)}{let t=Gi(e);ze();try{ur(e)}finally{Be(),t()}}}var ta={get(e,t){return F(e,`get`,``),e[t]}};function na(e){return{attrs:new Proxy(e.attrs,ta),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function ra(e){return e.exposed?e.exposeProxy||=new Proxy(Ut(It(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in ar)return ar[n](e)},has(e,t){return t in e||t in ar}}):e.proxy}function ia(e){return h(e)&&`__vccOpts`in e}var $=(e,t)=>Gt(e,t,Ji),aa=`3.5.35`,oa=void 0,sa=typeof window<`u`&&window.trustedTypes;if(sa)try{oa=sa.createPolicy(`vue`,{createHTML:e=>e})}catch{}var ca=oa?e=>oa.createHTML(e):e=>e,la=`http://www.w3.org/2000/svg`,ua=`http://www.w3.org/1998/Math/MathML`,da=typeof document<`u`?document:null,fa=da&&da.createElement(`template`),pa={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?da.createElementNS(la,e):t===`mathml`?da.createElementNS(ua,e):n?da.createElement(e,{is:n}):da.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>da.createTextNode(e),createComment:e=>da.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>da.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===a||!(i=i.nextSibling)););else{fa.innerHTML=ca(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=fa.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},ma=Symbol(`_vtc`);function ha(e,t,n){let r=e[ma];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var ga=Symbol(`_vod`),_a=Symbol(`_vsh`),va={name:`show`,beforeMount(e,{value:t},{transition:n}){e[ga]=e.style.display===`none`?``:e.style.display,n&&t?n.beforeEnter(e):ya(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),ya(e,!0),r.enter(e)):r.leave(e,()=>{ya(e,!1)}):ya(e,t))},beforeUnmount(e,{value:t}){ya(e,t)}};function ya(e,t){e.style.display=t?e[ga]:`none`,e[_a]=!t}var ba=Symbol(``),xa=/(?:^|;)\s*display\s*:/;function Sa(e,t,n){let r=e.style,i=g(n),a=!1;if(n&&!i){if(t)if(g(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??wa(r,t,``)}else for(let e in t)n[e]??wa(r,e,``);for(let i in n){i===`display`&&(a=!0);let o=n[i];o==null?wa(r,i,``):Oa(e,i,!g(t)&&t?t[i]:void 0,o)||wa(r,i,o)}}else if(i){if(t!==n){let e=r[ba];e&&(n+=`;`+e),r.cssText=n,a=xa.test(n)}}else t&&e.removeAttribute(`style`);ga in e&&(e[ga]=a?r.display:``,e[_a]&&(r.display=`none`))}var Ca=/\s*!important$/;function wa(e,t,n){if(d(n))n.forEach(n=>wa(e,t,n));else if(n??=``,t.startsWith(`--`))e.setProperty(t,n);else{let r=Da(e,t);Ca.test(n)?e.setProperty(E(r),n.replace(Ca,``),`important`):e[r]=n}}var Ta=[`Webkit`,`Moz`,`ms`],Ea={};function Da(e,t){let n=Ea[t];if(n)return n;let r=T(t);if(r!==`filter`&&r in e)return Ea[t]=r;r=D(r);for(let n=0;n<Ta.length;n++){let i=Ta[n]+r;if(i in e)return Ea[t]=i}return t}function Oa(e,t,n,r){return e.tagName===`TEXTAREA`&&(t===`width`||t===`height`)&&g(r)&&n===r}var ka=`http://www.w3.org/1999/xlink`;function Aa(e,t,n,r,i,a=he(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(ka,t.slice(6,t.length)):e.setAttributeNS(ka,t,n):n==null||a&&!ge(n)?e.removeAttribute(t):e.setAttribute(t,a?``:_(n)?String(n):n)}function ja(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?ca(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=ge(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function Ma(e,t,n,r){e.addEventListener(t,n,r)}function Na(e,t,n,r){e.removeEventListener(t,n,r)}var Pa=Symbol(`_vei`);function Fa(e,t,n,r,i=null){let a=e[Pa]||(e[Pa]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=La(t);r?Ma(e,n,a[t]=Va(r,i),s):o&&(Na(e,n,o,s),a[t]=void 0)}}var Ia=/(?:Once|Passive|Capture)$/;function La(e){let t;if(Ia.test(e)){t={};let n;for(;n=e.match(Ia);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===`:`?e.slice(3):E(e.slice(2)),t]}var Ra=0,za=Promise.resolve(),Ba=()=>Ra||=(za.then(()=>Ra=0),Date.now());function Va(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;let r=n.value;if(d(r)){let n=e.stopImmediatePropagation;e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0};let i=r.slice(),a=[e];for(let n=0;n<i.length&&!e._stopped;n++){let e=i[n];e&&V(e,t,5,a)}}else V(r,t,5,[e])};return n.value=e,n.attached=Ba(),n}var Ha=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Ua=(e,t,n,r,i,s)=>{let c=i===`svg`;t===`class`?ha(e,r,c):t===`style`?Sa(e,n,r):a(t)?o(t)||Fa(e,t,n,r,s):(t[0]===`.`?(t=t.slice(1),!0):t[0]===`^`?(t=t.slice(1),!1):Wa(e,t,r,c))?(ja(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&Aa(e,t,r,c,s,t!==`value`)):e._isVueCE&&(Ga(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!g(r)))?ja(e,T(t),r,s,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),Aa(e,t,r,c))};function Wa(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&Ha(t)&&h(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return Ha(t)&&g(n)?!1:t in e}function Ga(e,t){let n=e._def.props;if(!n)return!1;let r=T(t);return Array.isArray(n)?n.some(e=>T(e)===r):Object.keys(n).some(e=>T(e)===r)}var Ka=e=>{let t=e.props[`onUpdate:modelValue`]||!1;return d(t)?e=>ae(t,e):t};function qa(e){e.target.composing=!0}function Ja(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event(`input`)))}var Ya=Symbol(`_assign`);function Xa(e,t,n){return t&&(e=e.trim()),n&&(e=oe(e)),e}var Za={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e[Ya]=Ka(i);let a=r||i.props&&i.props.type===`number`;Ma(e,t?`change`:`input`,t=>{t.target.composing||e[Ya](Xa(e.value,n,a))}),(n||a)&&Ma(e,`change`,()=>{e.value=Xa(e.value,n,a)}),t||(Ma(e,`compositionstart`,qa),Ma(e,`compositionend`,Ja),Ma(e,`change`,Ja))},mounted(e,{value:t}){e.value=t??``},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:a}},o){if(e[Ya]=Ka(o),e.composing)return;let s=(a||e.type===`number`)&&!/^0\d/.test(e.value)?oe(e.value):e.value,c=t??``;if(s===c)return;let l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!==`range`&&(r&&t===n||i&&e.value.trim()===c)||(e.value=c)}},Qa=s({patchProp:Ua},pa),$a;function eo(){return $a||=ri(Qa)}var to=((...e)=>{let t=eo().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=ro(e);if(!r)return;let i=t._component;!h(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,no(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function no(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function ro(e){return g(e)?document.querySelector(e):e}window.COURSE_DATA={generatedAt:`2026-05-30T12:51:07.017Z`,title:`Temporal TypeScript Training`,exercises:[{id:`exercise1`,number:1,title:`Exercise 1: Hello Temporal (30 min)`,duration:`30 min`,root:`exercise1`,readme:`# Exercise 1: Hello Temporal (30 min)

## Learning Objectives
- Understand Temporal Workflow and Activity concepts
- Learn how to register workflows and activities with a Worker
- Execute your first Temporal workflow

## Key Concepts

### Workflow
- Workflows orchestrate activities and contain business logic
- Must be deterministic and use Temporal SDK APIs
- Defined as exported async functions

### Activity
- Activities handle external interactions (API calls, database operations, etc.)
- Can fail and be retried automatically
- Defined as regular async functions

### Worker
- Polls task queues for work
- Executes workflow and activity code
- Must register workflow and activity implementations

## Tasks
1. Complete the workflow implementation in \`src/workflow.ts\`
2. Complete the activity implementation in \`src/activities.ts\`
3. Complete the worker setup in \`src/worker/index.ts\`
4. Run the workflow

## Running the Exercise
1. Start worker: \`npx ts-node exercise1/src/worker/index.ts\`
2. Execute workflow: \`npx ts-node exercise1/src/starter/index.ts\`
3. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows

## Expected Output
"Hello, Temporal!"
`,sandbox:`# Exercise 1: Hello Temporal

## What you'll build
Your first Temporal application: a **Workflow** that calls an **Activity** to
produce the message \`Hello, Temporal!\`.

In this sandbox you don't run any terminal commands. You edit the files in the
tabs above the editor, then press **Run**. Pressing Run will, behind the scenes:

1. start a Temporal dev server,
2. start your **Worker**,
3. execute the **Starter**, which kicks off the Workflow and prints its result.

Work through the steps below in order. Each step tells you *which file* to edit,
*what code* to add, and *why* it's needed.

## Step 1 — Implement the Activity

**File:** open the \`activities.ts\` tab.

Activities are where real work happens — anything that talks to the outside
world (APIs, databases, sending email). They run as ordinary async functions and
can fail and be retried. Our Activity just builds the greeting string.

Replace the body of \`createGreeting\`:

\`\`\`typescript
export async function createGreeting(name: string): Promise<string> {
  return \`Hello, \${name}!\`;
}
\`\`\`

**Why:** the Workflow itself stays small and deterministic; it delegates the
actual greeting work to this Activity.

## Step 2 — Implement the Workflow

**File:** open the \`workflow.ts\` tab.

The Workflow is the orchestrator. It must be deterministic, so it never calls
external services directly — instead it calls Activities through the
\`proxyActivities\` handle that's already created at the top of the file:

\`\`\`typescript
const { createGreeting } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});
\`\`\`

Replace the body of \`greet\` so it calls the Activity and returns the result:

\`\`\`typescript
export async function greet(name: string): Promise<string> {
  return await createGreeting(name);
}
\`\`\`

**Why:** \`proxyActivities\` returns stand-ins that, when called, tell Temporal to
schedule the real Activity on a Worker and durably record the result. Awaiting it
gives you the returned greeting.

## Step 3 — Register the Workflow with the Worker

**File:** open the \`worker/index.ts\` tab.

A Worker polls a task queue and runs your Workflow and Activity code. It already
registers the Activities (\`activities\`), but the Workflow registration is
commented out. Uncomment it:

\`\`\`typescript
const worker = await Worker.create({
  workflowsPath: require.resolve('../workflow'),
  activities,
  taskQueue: TASK_QUEUE,
});
\`\`\`

**Why:** without \`workflowsPath\`, the Worker doesn't know where your Workflow
code lives, so it can't execute \`greet\` and the Starter would wait forever.

## Step 4 — Review the Starter (no changes needed)

**File:** open the \`starter/index.ts\` tab.

The Starter is the client that begins a Workflow execution. It's already
complete — read it to see what happens:

\`\`\`typescript
const handle = await client.workflow.start(greet, {
  taskQueue: 'hello-task-queue',
  workflowId: 'greeting-workflow',
  args: ['Temporal'],
});

const result = await handle.result();
console.log(result);
\`\`\`

**Why it matters:** the Starter and the Worker connect through the *same task
queue* (\`hello-task-queue\`). The \`args: ['Temporal']\` value becomes the \`name\`
parameter of your Workflow, which is why the output ends with \`Temporal!\`.

## Step 5 — Run it

Press the **Run** button. Watch the **Console** tab in the runner below the
editor: you'll see the Temporal server start, the Worker start, and the Starter
run. When it finishes, the **Output** tab shows:

\`\`\`
Hello, Temporal!
\`\`\`

You can also open the **Temporal UI** button to inspect the \`greeting-workflow\`
execution and its event history.

## Recap
- **Activity** (\`createGreeting\`) does the work.
- **Workflow** (\`greet\`) orchestrates and calls the Activity through \`proxyActivities\`.
- **Worker** runs both, and must register the Workflow via \`workflowsPath\`.
- **Starter** begins the execution on a shared task queue and prints the result.

Stuck? Use **Switch to solution** above the editor to view the completed code.
`,solution:`# Exercise 1 Solution: Hello Temporal

## workflow.ts
\`\`\`typescript
export async function greet(name: string): Promise<string> {
  return await createGreeting(name);
}
\`\`\`

## activities.ts
\`\`\`typescript
export async function createGreeting(name: string): Promise<string> {
  return \`Hello, \${name}!\`;
}
\`\`\`

## worker/index.ts
\`\`\`typescript
const worker = await Worker.create({
  workflowsPath: require.resolve('../src/workflow'),
  activities,
  taskQueue: TASK_QUEUE,
});
\`\`\`

## Running the Exercise
1. Start worker: \`npx ts-node exercise1/src/worker/index.ts\`
2. Execute workflow: \`npx ts-node exercise1/src/starter/index.ts\`
`,files:[{path:`src/workflow.ts`,content:`import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { createGreeting } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});

// TODO: Implement the greet workflow function
// - Call the createGreeting activity with the name parameter
// - Return the result
export async function greet(name: string): Promise<string> {
  return ''; // Replace with activity call
}
`,solution:`import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { createGreeting } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export async function greet(name: string): Promise<string> {
  return await createGreeting(name);
}
`},{path:`src/activities.ts`,content:`// TODO: Return a greeting message in the format "Hello, {name}!"
export async function createGreeting(name: string): Promise<string> {
  return ''; // Replace with actual greeting
}
`,solution:`export async function createGreeting(name: string): Promise<string> {
  return \`Hello, \${name}!\`;
}
`},{path:`src/worker/index.ts`,content:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'hello-task-queue';

async function main() {
  const worker = await Worker.create({
    // TODO: Register the workflow by pointing to the workflow file
    // workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'hello-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`},{path:`src/starter/index.ts`,content:`import { Client } from '@temporalio/client';
import { greet } from '../workflow';

async function main() {
  const client = new Client();

  const handle = await client.workflow.start(greet, {
    taskQueue: 'hello-task-queue',
    workflowId: 'greeting-workflow',
    args: ['Temporal'],
  });

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Client } from '@temporalio/client';
import { greet } from '../workflow';

async function main() {
  const client = new Client();

  const handle = await client.workflow.start(greet, {
    taskQueue: 'hello-task-queue',
    workflowId: 'greeting-workflow',
    args: ['Temporal'],
  });

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`}]},{id:`exercise2`,number:2,title:`Exercise 2: Money Transfer Basics (30 min)`,duration:`30 min`,root:`exercise2`,readme:`# Exercise 2: Money Transfer Basics (30 min)

## Learning Objectives
- Implement multiple activities (withdraw, deposit, refund)
- Use signals for workflow interaction
- Implement condition() for approval waiting
- Handle basic error scenarios with compensation

## Tasks

### 1. Implement Activities (10 min)
- Implement \`withdraw()\`: Add logging and error simulation
- Implement \`deposit()\`: Add logging and error simulation
- Implement \`refund()\`: Add logging for compensation
- Use \`Math.random()\` to simulate network failures

### 2. Implement transfer Workflow (15 min)
- Set up signal handler for \`approveSignal\` using \`setHandler()\`
- Call withdraw activity
- Wait for approval signal using \`condition()\`
- If approved: call deposit activity
- If not approved: call refund activity
- Return appropriate status message

### 3. Complete Worker (5 min)
- Register the workflow by uncommenting \`workflowsPath\`

### 4. Complete Starter (5 min)
- Send approval signal after a short delay

## Key Concepts
- **Activities**: External operations that can fail and be retried
- **Signals**: Asynchronous messages sent to running workflows via \`setHandler()\`
- **condition()**: Wait for conditions to be met (equivalent to Go's \`workflow.Await()\`)
- **Compensation**: Undoing operations when things go wrong

## Testing
1. Start the worker: \`npx ts-node exercise2/src/worker/index.ts\`
2. Run the workflow: \`npx ts-node exercise2/src/starter/index.ts\`
3. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows
4. Observe the workflow waiting for approval, then completing the transfer

### Try Signaling via UI
Comment out \`await handle.signal(approveSignal, true);\` in \`starter/index.ts\` and use Temporal UI's **More Actions → Send a Signal** to manually signal the workflow.

## Next Steps
Exercise 3 will add query handlers for better observability.
`,sandbox:`# Exercise 2: Money Transfer Basics

## What you'll build
A money-transfer **Workflow** that withdraws from one account, waits for a human
**approval signal**, then either deposits to the target account or refunds the
source. This introduces multiple Activities, signals, \`condition()\`, and the
compensation (refund) pattern.

In this sandbox you don't run any terminal commands. You edit the files in the
tabs above the editor, then press **Run**. Pressing Run starts a Temporal dev
server, starts your **Worker**, and runs the **Starter**, which begins the
Workflow and sends the approval signal automatically.

Work through the steps in order. Each step tells you *which file* to edit, *what
code* to add, and *why* it's needed.

## Step 1 — Add failure simulation to the Activities

**File:** open the \`activities.ts\` tab.

Activities model real external calls (a bank API here), which can fail. Add a
random failure to \`withdraw\` and \`deposit\` so you can see Temporal's automatic
retries in action. \`refund\` is already implemented.

In \`withdraw\`, after the log line:

\`\`\`typescript
if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
\`\`\`

In \`deposit\`, after the log line:

\`\`\`typescript
if (Math.random() < 0.05) throw new Error('deposit failed - account not found');
\`\`\`

**Why:** Activities are the only place failures should happen. When one throws,
Temporal retries it for you — the Workflow code doesn't need any retry logic.

## Step 2 — Implement the transfer Workflow

**File:** open the \`workflow.ts\` tab.

The Activities (\`withdraw\`, \`deposit\`, \`refund\`) and the \`approveSignal\` are
already declared at the top of the file. Replace the body of \`transfer\` so it
registers the signal, withdraws, waits for approval, and then deposits or
refunds:

\`\`\`typescript
export async function transfer(request: TransferRequest): Promise<string> {
  let approved = false;
  let approvalReceived = false;

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  await withdraw(request.fromAccount, request.amount);
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    await deposit(request.toAccount, request.amount);
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
\`\`\`

**Why:** \`setHandler\` registers the signal callback, and \`condition(() =>
approvalReceived)\` durably pauses the Workflow until that signal arrives — the
Workflow can wait minutes or months without consuming resources.

## Step 3 — Register the Workflow with the Worker

**File:** open the \`worker/index.ts\` tab.

Uncomment the Workflow registration:

\`\`\`typescript
workflowsPath: require.resolve('../workflow'),
\`\`\`

**Why:** without \`workflowsPath\`, the Worker can't run \`transfer\`, so the Starter
would hang waiting for a result.

## Step 4 — Send the approval signal from the Starter

**File:** open the \`starter/index.ts\` tab.

The Starter begins the Workflow, but the approval is commented out — so the
Workflow would wait forever. Uncomment it:

\`\`\`typescript
await new Promise((resolve) => setTimeout(resolve, 2000));
await handle.signal(approveSignal, true);
\`\`\`

**Why:** the Workflow blocks on \`condition(() => approvalReceived)\`. This sends
the \`approve\` signal (after a short delay) so the transfer is approved and
completes. The Starter and Worker share the \`money-transfer-task-queue\`.

## Step 5 — Run it

Press the **Run** button. In the **Console** you'll see the withdrawal, the
"Waiting for approval..." pause, and the approval arriving (you may also see a
retry if the random failure fires). The **Output** tab shows:

\`\`\`
Transfer completed successfully
\`\`\`

Open the **Temporal UI** button to watch the signal land and the Activities run.

## Recap
- **Activities** (\`withdraw\`, \`deposit\`, \`refund\`) do the work and may fail; Temporal retries them.
- **Signal** (\`approveSignal\`) delivers the human approval into the running Workflow.
- **\`condition()\`** durably waits until approval is received.
- **Compensation**: if not approved, the Workflow refunds the withdrawal.

Stuck? Use **Switch to solution** above the editor to view the completed code.
`,solution:`# Exercise 2 Solution: Money Transfer Basics

## Key Implementation Points

### 1. activities.ts
\`\`\`typescript
export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
}
\`\`\`

### 2. workflow.ts
\`\`\`typescript
export async function transfer(request: TransferRequest): Promise<string> {
  let approved = false;
  let approvalReceived = false;

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  await withdraw(request.fromAccount, request.amount);
  await condition(() => approvalReceived);

  if (approved) {
    await deposit(request.toAccount, request.amount);
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  return 'Transfer rejected and refunded';
}
\`\`\`

### 3. worker/index.ts
\`\`\`typescript
workflowsPath: require.resolve('../src/workflow'),
\`\`\`

### 4. starter/index.ts
\`\`\`typescript
await new Promise((resolve) => setTimeout(resolve, 2000));
await handle.signal(approveSignal, true);
\`\`\`

## Key Concepts Demonstrated
1. **Multiple Activities**: withdraw, deposit, refund operations
2. **Signal Handling**: External approval mechanism via \`setHandler()\`
3. **condition()**: Blocking until condition is met
4. **Compensation Pattern**: Refund when transfer is rejected
`,files:[{path:`src/workflow.ts`,content:`import { proxyActivities, setHandler, condition, defineSignal } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');

// TODO: Implement the complete transfer workflow:
// 1. Set up signal handler for approveSignal
// 2. Withdraw from source account
// 3. Wait for approval signal using condition()
// 4. If approved: deposit to target account
// 5. If not approved: refund to source account
// 6. Return appropriate status message
export async function transfer(request: TransferRequest): Promise<string> {
  // TODO: Implement workflow logic
  return '';
}
`,solution:`import { proxyActivities, setHandler, condition, defineSignal } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');

export async function transfer(request: TransferRequest): Promise<string> {
  let approved = false;
  let approvalReceived = false;

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  await withdraw(request.fromAccount, request.amount);
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    await deposit(request.toAccount, request.amount);
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
`},{path:`src/activities.ts`,content:`import { log } from '@temporalio/activity';

// TODO: Implement withdraw logic with logging and simulate occasional failures
// Use Math.random() < 0.1 to simulate network failures and return an error
export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  // TODO: Add failure simulation
}

// TODO: Implement deposit logic with logging and simulate occasional failures
// Use Math.random() < 0.05 to simulate network failures and return an error
export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  // TODO: Add failure simulation
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
`,solution:`import { log } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (Math.random() < 0.05) throw new Error('deposit failed - account not found');
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
`},{path:`src/models.ts`,content:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}
`,solution:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}
`},{path:`src/worker/index.ts`,content:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    // TODO: Register the workflow by pointing to the workflow file
    // workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`},{path:`src/starter/index.ts`,content:`import { Client } from '@temporalio/client';
import { transfer, approveSignal } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
  });

  // TODO: Send approval signal after delay
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Client } from '@temporalio/client';
import { transfer, approveSignal } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));
  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`}]},{id:`exercise3`,number:3,title:`Exercise 3: Flow Control with Query Handlers (30 min)`,duration:`30 min`,root:`exercise3`,readme:`# Exercise 3: Flow Control with Query Handlers (30 min)

## Learning Objectives
- Implement Query handlers for workflow state inspection
- Track workflow status throughout execution
- Query workflow state from external clients
- Understand the difference between Signals and Queries

## Tasks

### 1. Implement Query Handler (10 min)
- Define a query using \`defineQuery<TransferStatus>('getStatus')\`
- Add \`setHandler(getStatusQuery, () => status)\` in the workflow
- Return current status from the handler

### 2. Add Status Tracking (10 min)
- Update status to \`'APPROVED'\` when approval received
- Update status to \`'COMPLETED'\` when transfer succeeds
- Update status to \`'CANCELLED'\` when rejected
- Update status to \`'FAILED'\` on errors (use try/catch)

## Key Concepts
- **Query Handlers**: Read-only operations to inspect workflow state via \`setHandler()\`
- **Status Tracking**: Maintaining workflow state for external visibility
- **Signal vs Query**: Signals modify state, Queries only read state

## Testing
1. Start the worker: \`npx ts-node exercise3/src/worker/index.ts\`
2. Run the workflow: \`npx ts-node exercise3/src/starter/index.ts\`
3. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows
4. Observe status changes through query outputs

## Expected Output
- Initial status: PENDING
- Status after approval: APPROVED → COMPLETED
- Final status confirmation

### Query Using CLI
You can also query the workflow status using the Temporal CLI:
\`\`\`bash
temporal workflow query \\
  --workflow-id money-transfer-workflow \\
  --type getStatus
\`\`\`

### Try Interactive Signaling
Comment out \`await handle.signal(approveSignal, true);\` in \`starter/index.ts\`, then:
1. Run the workflow - it will wait for approval
2. Query the status using CLI (should show PENDING)
3. Send approval signal via Temporal UI: **More Actions → Send a Signal**
4. Query again to see status change to APPROVED → COMPLETED

### Worker Dependency Experiment
To understand that queries require an running worker:
1. Stop the worker before sending approval signal
2. Try querying the workflow - it will fail (no worker to handle query)
3. Restart the worker
4. Query again - it works, showing workflow state persisted across worker restarts
`,sandbox:`# Exercise 3: Flow Control with Query Handlers

## What you'll build
You'll extend the money-transfer Workflow with a **Query** so external clients
can read the Workflow's current status at any time, and you'll track that status
as the Workflow moves through its states.

In this sandbox you don't run any terminal commands. You edit the files in the
tabs above the editor, then press **Run**. Pressing Run starts a Temporal dev
server, starts your **Worker**, and runs the **Starter**, which begins the
Workflow, queries its status, sends the approval signal, and prints the result.

Work through the steps in order. Each step tells you *which file* to edit, *what
code* to add, and *why* it's needed.

## Step 1 — Register the Query handler

**File:** open the \`workflow.ts\` tab.

The \`getStatusQuery\` is already declared at the top of the file, and the
\`transfer\` function already has a \`status\` variable. Register a handler so the
query returns the current status. Add it next to the existing signal handler:

\`\`\`typescript
setHandler(getStatusQuery, () => status);
\`\`\`

**Why:** a **Query** is a read-only request that returns Workflow state without
changing it. Unlike a Signal, it must not mutate anything — it just reports the
current \`status\`.

## Step 2 — Track status through the Workflow

**File:** still in \`workflow.ts\`.

Update \`status\` at each transition and mark it \`FAILED\` if an Activity throws.
The completed \`transfer\` function looks like this:

\`\`\`typescript
export async function transfer(request: TransferRequest): Promise<string> {
  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  try {
    await withdraw(request.fromAccount, request.amount);
  } catch (e) {
    status = 'FAILED';
    throw e;
  }
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      throw e;
    }
    status = 'COMPLETED';
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
\`\`\`

**Why:** keeping \`status\` current means any client that queries \`getStatus\` sees
where the transfer is. The \`try/catch\` records \`FAILED\` before re-throwing, so a
permanently failing Activity still leaves an accurate status behind.

## Step 3 — Review the Starter (no changes needed)

**File:** open the \`starter/index.ts\` tab.

The Starter is already complete. Notice it queries the status before approving:

\`\`\`typescript
const status = await handle.query(getStatusQuery);
console.log('Status:', status);

await handle.signal(approveSignal, true);
\`\`\`

**Why it matters:** this shows a client reading live Workflow state (the Query)
and then driving it forward (the Signal) — the two halves of Workflow
interaction.

## Step 4 — Run it

Press the **Run** button. The **Output** tab shows the queried status followed by
the final result, for example:

\`\`\`
Status: PENDING
Transfer completed successfully
\`\`\`

Open the **Temporal UI** button and use the **Queries** tab to call \`getStatus\`
yourself while exploring the execution.

## Recap
- A **Query** (\`getStatus\`) reads Workflow state without mutating it.
- The Workflow keeps \`status\` accurate at every transition, including \`FAILED\`.
- **Signals change state; Queries read it** — that's the key distinction.

Stuck? Use **Switch to solution** above the editor to view the completed code.
`,solution:`# Exercise 3 Solution: Flow Control with Query Handlers

## Key Implementation Points

### Query Handler
\`\`\`typescript
setHandler(getStatusQuery, () => status);
\`\`\`

### Signal Handler
\`\`\`typescript
setHandler(approveSignal, (value: boolean) => {
  approved = value;
  approvalReceived = true;
});
\`\`\`

### Status Tracking
\`\`\`typescript
let status: TransferStatus = 'PENDING';

try {
  await withdraw(request.fromAccount, request.amount);
} catch (e) {
  status = 'FAILED';
  throw e;
}

if (approved) {
  status = 'APPROVED';
  await deposit(request.toAccount, request.amount);
  status = 'COMPLETED';
  return 'Transfer completed successfully';
}

await refund(request.fromAccount, request.amount);
status = 'CANCELLED';
return 'Transfer rejected and refunded';
\`\`\`

## Key Concepts
1. **Query Handlers**: Read-only workflow state inspection using \`defineQuery()\` + \`setHandler()\`
2. **Status Tracking**: Maintaining workflow state throughout execution
3. **External Visibility**: Clients can monitor workflow progress
4. **Signal vs Query**: Signals use \`defineSignal()\` to modify state, Queries use \`defineQuery()\` to read state
`,files:[{path:`src/workflow.ts`,content:`import { proxyActivities, setHandler, condition, defineSignal, defineQuery } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

// TODO: Implement query handler for "getStatus" that returns current status
// TODO: Update status at each step:
//   - 'PENDING' at start
//   - 'APPROVED' when approved
//   - 'COMPLETED' when deposit succeeds
//   - 'CANCELLED' when refunded
//   - 'FAILED' on errors
export async function transfer(request: TransferRequest): Promise<string> {
  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  // TODO: Set up query handler for getStatusQuery using setHandler()

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  await withdraw(request.fromAccount, request.amount);
  // TODO: Update status to 'FAILED' on error (use try/catch)

  await condition(() => approvalReceived);

  if (approved) {
    // TODO: Update status to 'APPROVED'
    await deposit(request.toAccount, request.amount);
    // TODO: Update status to 'COMPLETED'
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  // TODO: Update status to 'CANCELLED'
  return 'Transfer rejected and refunded';
}
`,solution:`import { proxyActivities, setHandler, condition, defineSignal, defineQuery } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

export async function transfer(request: TransferRequest): Promise<string> {
  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  try {
    await withdraw(request.fromAccount, request.amount);
  } catch (e) {
    status = 'FAILED';
    throw e;
  }
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      throw e;
    }
    status = 'COMPLETED';
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
`},{path:`src/activities.ts`,content:`import { log } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (Math.random() < 0.05) throw new Error('deposit failed - account not found');
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
`,solution:`import { log } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (Math.random() < 0.05) throw new Error('deposit failed - account not found');
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
`},{path:`src/models.ts`,content:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
`,solution:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
`},{path:`src/worker/index.ts`,content:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`},{path:`src/starter/index.ts`,content:`import { Client } from '@temporalio/client';
import { transfer, approveSignal, getStatusQuery } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const status = await handle.query(getStatusQuery);
  console.log('Status:', status);

  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Client } from '@temporalio/client';
import { transfer, approveSignal, getStatusQuery } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const status = await handle.query(getStatusQuery);
  console.log('Status:', status);

  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`}]},{id:`exercise4`,number:4,title:`Exercise 4: Visibility & Monitoring with Custom Search Attributes (30 min)`,duration:`30 min`,root:`exercise4`,readme:`# Exercise 4: Visibility & Monitoring with Custom Search Attributes (30 min)

## Learning Objectives
- Create and use Custom Search Attributes for workflow filtering
- Upsert Search Attributes from within workflows
- Understand how Search Attributes enable workflow discovery

## Tasks

### 1. Implement Search Attribute Upsert (15 min)
- Set \`AccountId\` in \`client.workflow.start()\` searchAttributes in the starter
- Add \`upsertSearchAttributes()\` in the transfer workflow to update:
  - \`TransferStatus\`: Set to current status and update as workflow progresses
- Update \`TransferStatus\` as the workflow transitions through states (PENDING, APPROVED, COMPLETED, CANCELLED, FAILED)

## Key Concepts
- **Search Attributes**: Custom metadata for workflow filtering and discovery
- **upsertSearchAttributes()**: Method to set search attributes from workflows

## Prerequisites
Make sure Temporal server is started with the AccountId and TransferStatus search attributes:
\`\`\`bash
temporal server start-dev --search-attribute AccountId=Keyword --search-attribute TransferStatus=Keyword
\`\`\`

## Testing
1. Start the worker: \`npx ts-node exercise4/src/worker/index.ts\`
2. Run the workflow: \`npx ts-node exercise4/src/starter/index.ts\`
3. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows
4. Verify the AccountId and TransferStatus search attributes in the UI
5. Filter workflows by search attributes using CLI:
\`\`\`bash
temporal workflow list --query 'AccountId="account-123"'
temporal workflow list --query 'TransferStatus="COMPLETED"'
\`\`\`

### Explore Search Attributes in Temporal UI
- Customize the workflow list view by clicking the cog icon and adding AccountId and TransferStatus columns
- Use the search bar to filter workflows: \`AccountId="account-123"\` or \`TransferStatus="COMPLETED"\`

## Expected Behavior
- Workflow executes normally with all previous functionality
- AccountId and TransferStatus search attributes are visible in Temporal Web UI
- TransferStatus updates as workflow progresses through different states
- Can filter workflows by AccountId or TransferStatus in the Web UI
`,sandbox:`# Exercise 4: Visibility & Monitoring with Custom Search Attributes

## What you'll build
You'll make the transfer Workflow discoverable in the Temporal UI by tagging it
with **Custom Search Attributes** — \`AccountId\` set when the Workflow starts, and
\`TransferStatus\` updated from inside the Workflow as it progresses.

In this sandbox you don't run any terminal commands. You edit the files in the
tabs above the editor, then press **Run**. The sandbox's Temporal dev server is
already started with the \`AccountId\` and \`TransferStatus\` search attributes
registered, so you only need to set them.

Work through the steps in order. Each step tells you *which file* to edit, *what
code* to add, and *why* it's needed.

## Step 1 — Set AccountId when starting the Workflow

**File:** open the \`starter/index.ts\` tab.

Add a \`searchAttributes\` option to \`client.workflow.start()\`:

\`\`\`typescript
searchAttributes: {
  AccountId: [request.fromAccount],
},
\`\`\`

**Why:** search attributes set at start time let you find this execution later by
account — e.g. "show all transfers for account-123" — directly from the Temporal
UI or \`temporal workflow list\`.

## Step 2 — Upsert TransferStatus from inside the Workflow

**File:** open the \`workflow.ts\` tab.

\`upsertSearchAttributes\` is already imported. Update \`TransferStatus\` at every
state transition so the live status is searchable. The completed \`transfer\`
function:

\`\`\`typescript
export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ TransferStatus: ['PENDING'] });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  try {
    await withdraw(request.fromAccount, request.amount);
  } catch (e) {
    status = 'FAILED';
    upsertSearchAttributes({ TransferStatus: ['FAILED'] });
    throw e;
  }

  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    upsertSearchAttributes({ TransferStatus: ['APPROVED'] });
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      upsertSearchAttributes({ TransferStatus: ['FAILED'] });
      throw e;
    }
    status = 'COMPLETED';
    upsertSearchAttributes({ TransferStatus: ['COMPLETED'] });
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  upsertSearchAttributes({ TransferStatus: ['CANCELLED'] });
  return 'Transfer rejected and refunded';
}
\`\`\`

**Why:** \`upsertSearchAttributes\` writes the attribute into Temporal's visibility
store as the Workflow runs, so you can filter on the *current* status
(\`TransferStatus = "COMPLETED"\`) — not just data known at start time. Note this
mirrors the in-memory \`status\` used by the Query from Exercise 3; search
attributes power cross-Workflow search, while the Query reads a single Workflow.

## Step 3 — Run it

Press the **Run** button. The **Output** tab shows:

\`\`\`
Transfer completed successfully
\`\`\`

Open the **Temporal UI** button and try filtering the workflow list with a query
such as \`TransferStatus = "COMPLETED"\` or \`AccountId = "account-123"\`.

## Recap
- **Search attributes** make Workflows discoverable by business data.
- Set immutable-at-start data (\`AccountId\`) in \`client.workflow.start()\`.
- Update changing data (\`TransferStatus\`) with \`upsertSearchAttributes()\` inside the Workflow.

Stuck? Use **Switch to solution** above the editor to view the completed code.
`,solution:`# Exercise 4 Solution: Visibility & Monitoring with Custom Search Attributes

## Key Implementation

### Upsert Search Attributes
\`\`\`typescript
upsertSearchAttributes({ AccountId: [request.fromAccount] });
\`\`\`

## Key Points
- Place early in workflow execution
- Enables filtering workflows by account
- Immediately visible in Temporal Web UI
- Can be updated multiple times during workflow execution

## Testing
1. Start worker: \`npx ts-node exercise4/src/worker/index.ts\`
2. Run workflow: \`npx ts-node exercise4/src/starter/index.ts\`
3. Verify in Web UI: Open http://localhost:8233 and check workflow details
4. Filter workflows by AccountId using CLI:
\`\`\`bash
temporal workflow list --query 'AccountId="account-123"'
\`\`\`
`,files:[{path:`src/workflow.ts`,content:`import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

// TODO: Use upsertSearchAttributes to update 'TransferStatus' throughout workflow
export async function transfer(request: TransferRequest): Promise<string> {
  // TODO: Update TransferStatus search attribute as workflow progresses
  // upsertSearchAttributes({ TransferStatus: ['PENDING'] });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  try {
    await withdraw(request.fromAccount, request.amount);
  } catch (e) {
    status = 'FAILED';
    // TODO: Update TransferStatus search attribute
    // upsertSearchAttributes({ TransferStatus: ['FAILED'] });
    throw e;
  }

  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    // TODO: Update TransferStatus search attribute
    // upsertSearchAttributes({ TransferStatus: ['APPROVED'] });
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      // TODO: Update TransferStatus search attribute
      // upsertSearchAttributes({ TransferStatus: ['FAILED'] });
      throw e;
    }
    status = 'COMPLETED';
    // TODO: Update TransferStatus search attribute
    // upsertSearchAttributes({ TransferStatus: ['COMPLETED'] });
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  // TODO: Update TransferStatus search attribute
  // upsertSearchAttributes({ TransferStatus: ['CANCELLED'] });
  return 'Transfer rejected and refunded';
}
`,solution:`import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ TransferStatus: ['PENDING'] });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  try {
    await withdraw(request.fromAccount, request.amount);
  } catch (e) {
    status = 'FAILED';
    upsertSearchAttributes({ TransferStatus: ['FAILED'] });
    throw e;
  }

  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    upsertSearchAttributes({ TransferStatus: ['APPROVED'] });
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      upsertSearchAttributes({ TransferStatus: ['FAILED'] });
      throw e;
    }
    status = 'COMPLETED';
    upsertSearchAttributes({ TransferStatus: ['COMPLETED'] });
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  upsertSearchAttributes({ TransferStatus: ['CANCELLED'] });
  return 'Transfer rejected and refunded';
}
`},{path:`src/activities.ts`,content:`import { log } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (Math.random() < 0.05) throw new Error('deposit failed - account not found');
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
`,solution:`import { log } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (Math.random() < 0.05) throw new Error('deposit failed - account not found');
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
`},{path:`src/models.ts`,content:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
`,solution:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
`},{path:`src/worker/index.ts`,content:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`},{path:`src/starter/index.ts`,content:`import { Client } from '@temporalio/client';
import { transfer, approveSignal } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
    // TODO: Add searchAttributes to set AccountId
    // searchAttributes: {
    //   AccountId: [request.fromAccount],
    // },
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Client } from '@temporalio/client';
import { transfer, approveSignal } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
    searchAttributes: {
      AccountId: [request.fromAccount],
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`}]},{id:`exercise5`,number:5,title:`Exercise 5: User Metadata & Activity Summaries`,duration:``,root:`exercise5`,readme:`# Exercise 5: User Metadata & Activity Summaries

## Learning Objectives
- Add descriptive summaries to activities for better observability
- Understand how metadata enhances workflow visibility in Temporal Web UI

## Background
Temporal provides metadata capabilities to make workflows and activities more observable:
- **Activity Summary**: Descriptive text that appears in the Temporal Web UI for each activity execution

## Your Task

### Add Activity Summaries
In \`workflow.ts\`, add a \`summary\` field to \`proxyActivities\` options for each activity:

- Withdraw: \`"Withdrawing funds from account {fromAccount}"\`
- Deposit: \`"Depositing funds to account {toAccount}"\`
- Refund: \`"Refunding funds to account {fromAccount}"\`

Use separate \`proxyActivities\` calls per activity to set different summaries.

## Expected Behavior
After implementing the summaries:
1. Activities will show descriptive text in the Temporal Web UI
2. Monitoring and debugging become easier with meaningful metadata

## Testing Your Implementation

1. Start the Temporal server:
\`\`\`bash
temporal server start-dev --search-attribute AccountId=Keyword
\`\`\`

2. Run the worker:
\`\`\`bash
npx ts-node exercise5/src/worker/index.ts
\`\`\`

3. Execute the workflow:
\`\`\`bash
npx ts-node exercise5/src/starter/index.ts
\`\`\`

4. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows
5. Check the activity summaries in the workflow execution details

## Key Concepts
- **Activity Summary**: Runtime metadata that describes what an activity is doing
- **Observability**: Making workflows easier to monitor and debug through descriptive metadata
`,sandbox:`# Exercise 5: User Metadata & Activity Summaries

## What you'll build
You'll attach a human-readable **summary** to each Activity call so the Temporal
UI shows *what* each step is doing (e.g. "Withdrawing funds from account
account-123") instead of just the Activity name.

In this sandbox you don't run any terminal commands. You edit the files in the
tabs above the editor, then press **Run**, which starts a Temporal dev server,
your **Worker**, and the **Starter**.

## Step 1 — Give each Activity its own proxy with a summary

**File:** open the \`workflow.ts\` tab.

Today all three Activities share one \`proxyActivities\` call at the top of the
file. A \`summary\` is per-call metadata, and we want it to include the account
numbers from the request — so each Activity needs its own proxy created *inside*
the Workflow function where \`request\` is available.

First, delete the shared module-level block near the top of the file (the one
marked with the TODO):

\`\`\`typescript
const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});
\`\`\`

Then, as the first statements inside the \`transfer\` function, create one proxy
per Activity with a descriptive \`summary\`:

\`\`\`typescript
const { withdraw } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  summary: \`Withdrawing funds from account \${request.fromAccount}\`,
});
const { deposit } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  summary: \`Depositing funds to account \${request.toAccount}\`,
});
const { refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  summary: \`Refunding funds to account \${request.fromAccount}\`,
});
\`\`\`

**Why:** the \`summary\` field is observability metadata that Temporal surfaces in
the Web UI for each Activity execution. Creating the proxies inside the function
lets each summary embed live request data, making the event history far easier to
read at a glance.

## Step 2 — Run it

Press the **Run** button. The **Output** tab shows:

\`\`\`
Transfer completed successfully
\`\`\`

Open the **Temporal UI** button and look at the Activity events — each now
carries its summary text describing the account it acted on.

## Recap
- **Activity summaries** are metadata that improves observability in the Web UI.
- Defining a proxy per Activity inside the Workflow lets the summary include request data.
- The Workflow's behavior is unchanged — this is purely about visibility.

Stuck? Use **Switch to solution** above the editor to view the completed code.
`,solution:`# Exercise 5 Solution: User Metadata & Activity Summaries

## Solution Implementation

### Activity Summaries in workflow.ts
\`\`\`typescript
const { withdraw } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  summary: \`Withdrawing funds from account \${request.fromAccount}\`,
});

const { deposit } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  summary: \`Depositing funds to account \${request.toAccount}\`,
});

const { refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  summary: \`Refunding funds to account \${request.fromAccount}\`,
});
\`\`\`

Note: \`proxyActivities\` must be called at the top level of the workflow function (not inside conditionals) to remain deterministic. Use separate calls per activity to set different summaries.

## Key Points
- **Activity Summary**: Provides runtime context for each activity execution
- **Observability**: Summaries appear in Temporal Web UI for better monitoring
- **Best Practice**: Use descriptive, contextual summaries that help with debugging
`,files:[{path:`src/workflow.ts`,content:`import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus } from './models';

// TODO: Use separate proxyActivities calls per activity to add summary metadata
// Each call should have a 'summary' field describing what the activity does
const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  // TODO: Add summary field for withdraw
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ AccountId: [request.fromAccount] });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  setHandler(getStatusQuery, () => status);
  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  try {
    await withdraw(request.fromAccount, request.amount);
  } catch (e) {
    status = 'FAILED';
    throw e;
  }

  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      throw e;
    }
    status = 'COMPLETED';
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  return 'Transfer rejected and refunded';
}
`,solution:`import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus } from './models';

export const approveSignal = defineSignal<[boolean]>('approve');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ AccountId: [request.fromAccount] });

  const { withdraw } = proxyActivities<typeof activities>({
    startToCloseTimeout: '5 seconds',
    summary: \`Withdrawing funds from account \${request.fromAccount}\`,
  });
  const { deposit } = proxyActivities<typeof activities>({
    startToCloseTimeout: '5 seconds',
    summary: \`Depositing funds to account \${request.toAccount}\`,
  });
  const { refund } = proxyActivities<typeof activities>({
    startToCloseTimeout: '5 seconds',
    summary: \`Refunding funds to account \${request.fromAccount}\`,
  });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  setHandler(getStatusQuery, () => status);
  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  try {
    await withdraw(request.fromAccount, request.amount);
  } catch (e) {
    status = 'FAILED';
    throw e;
  }

  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      throw e;
    }
    status = 'COMPLETED';
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  return 'Transfer rejected and refunded';
}
`},{path:`src/activities.ts`,content:`import { log } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (Math.random() < 0.05) throw new Error('deposit failed - account not found');
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
`,solution:`import { log } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (Math.random() < 0.05) throw new Error('deposit failed - account not found');
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
`},{path:`src/models.ts`,content:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
`,solution:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
`},{path:`src/worker/index.ts`,content:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`},{path:`src/starter/index.ts`,content:`import { Client } from '@temporalio/client';
import { transfer, approveSignal } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Client } from '@temporalio/client';
import { transfer, approveSignal } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`}]},{id:`exercise6`,number:6,title:`Exercise 6: Complete Implementation`,duration:``,root:`exercise6`,readme:`# Exercise 6: Complete Implementation

## Overview
This exercise contains the complete implementation of all features from exercises 1-5:
- Multiple activities with error simulation
- Signal handling for approval
- Query handlers for status tracking
- Search attributes for workflow filtering
- Activity summaries for observability

## Running the Exercise

1. Start the Temporal server:
\`\`\`bash
temporal server start-dev --search-attribute AccountId=Keyword
\`\`\`

2. Run the worker:
\`\`\`bash
npx ts-node exercise6/src/worker/index.ts
\`\`\`

3. Execute the workflow:
\`\`\`bash
npx ts-node exercise6/src/starter/index.ts
\`\`\`

4. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows

## Features Demonstrated
- Complete money transfer workflow
- Signal-based approval mechanism
- Query-based status monitoring
- Search attributes for filtering
- Activity summaries for observability
`,sandbox:"# Exercise 6: Complete Implementation\n\n## What this is\nThis exercise is the **complete, working implementation** that combines\neverything from Exercises 1–5:\n\n- multiple Activities with error simulation (`withdraw`, `deposit`, `refund`),\n- a signal-based approval (`approveSignal` + `condition()`),\n- a status **Query** (`getStatus`),\n- custom **search attributes** (`AccountId`, `TransferStatus`),\n- per-Activity **summaries** for observability.\n\nThere are no TODOs to fill in. Use it as a reference and a sandbox to experiment\nin. In this sandbox you don't run terminal commands — just press **Run**, which\nstarts a Temporal dev server, your **Worker**, and the **Starter**.\n\n## Step 1 — Read through the files\n\nOpen each tab and connect it back to the earlier exercises:\n\n- **`activities.ts`** — `withdraw`/`deposit` randomly fail; Temporal retries them automatically.\n- **`workflow.ts`** — registers the Query and approval Signal, upserts `TransferStatus` at each transition, and gives each Activity a descriptive summary.\n- **`worker/index.ts`** — registers the Workflow (`workflowsPath`) and Activities on the shared task queue.\n- **`starter/index.ts`** — starts the Workflow, queries status, and sends the approval signal.\n\n## Step 2 — Run it\n\nPress the **Run** button. The **Output** tab shows:\n\n```\nTransfer completed successfully\n```\n\nOpen the **Temporal UI** button to see it all together: the Activity summaries,\nthe `getStatus` query, the approval signal, and the `TransferStatus` search\nattribute moving from `PENDING` to `COMPLETED`.\n\n## Step 3 — Experiment\n\nBecause this version is complete, it's a good place to try things and press\n**Run** again:\n\n- change the `amount` or account names in `starter/index.ts`,\n- send `approveSignal` as `false` to watch the refund (compensation) path,\n- filter the workflow list in the Temporal UI by `TransferStatus` or `AccountId`.\n\n## Recap\n- Exercise 6 is the reference implementation of the full money-transfer Workflow.\n- Every concept from Exercises 1–5 appears here working together.\n- Use **Run** plus the **Temporal UI** to explore how the pieces interact.\n\nTip: Use **Switch to solution** above the editor to compare against the canonical source.\n",solution:``,files:[{path:`src/workflow.ts`,content:`import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus } from './models';

export const approveSignal = defineSignal<[boolean]>('approve');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ AccountId: [request.fromAccount] });

  const { withdraw } = proxyActivities<typeof activities>({
    startToCloseTimeout: '5 seconds',
    summary: \`Withdrawing funds from account \${request.fromAccount}\`,
  });
  const { deposit } = proxyActivities<typeof activities>({
    startToCloseTimeout: '5 seconds',
    summary: \`Depositing funds to account \${request.toAccount}\`,
  });
  const { refund } = proxyActivities<typeof activities>({
    startToCloseTimeout: '5 seconds',
    summary: \`Refunding funds to account \${request.fromAccount}\`,
  });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  setHandler(getStatusQuery, () => status);
  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  try {
    await withdraw(request.fromAccount, request.amount);
  } catch (e) {
    status = 'FAILED';
    throw e;
  }

  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      throw e;
    }
    status = 'COMPLETED';
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  return 'Transfer rejected and refunded';
}
`,solution:`import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus } from './models';

export const approveSignal = defineSignal<[boolean]>('approve');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ AccountId: [request.fromAccount] });

  const { withdraw } = proxyActivities<typeof activities>({
    startToCloseTimeout: '5 seconds',
    summary: \`Withdrawing funds from account \${request.fromAccount}\`,
  });
  const { deposit } = proxyActivities<typeof activities>({
    startToCloseTimeout: '5 seconds',
    summary: \`Depositing funds to account \${request.toAccount}\`,
  });
  const { refund } = proxyActivities<typeof activities>({
    startToCloseTimeout: '5 seconds',
    summary: \`Refunding funds to account \${request.fromAccount}\`,
  });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  setHandler(getStatusQuery, () => status);
  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  try {
    await withdraw(request.fromAccount, request.amount);
  } catch (e) {
    status = 'FAILED';
    throw e;
  }

  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      throw e;
    }
    status = 'COMPLETED';
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  return 'Transfer rejected and refunded';
}
`},{path:`src/activities.ts`,content:`import { log } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (Math.random() < 0.05) throw new Error('deposit failed - account not found');
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
`,solution:`import { log } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (Math.random() < 0.05) throw new Error('deposit failed - account not found');
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
`},{path:`src/models.ts`,content:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
`,solution:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
`},{path:`src/worker/index.ts`,content:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`},{path:`src/starter/index.ts`,content:`import { Client } from '@temporalio/client';
import { transfer, approveSignal } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Client } from '@temporalio/client';
import { transfer, approveSignal } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`}]},{id:`exercise7`,number:7,title:`Exercise 7: Manual Activity Retry`,duration:``,root:`exercise7`,readme:`# Exercise 7: Manual Activity Retry

## Objective
Learn how to implement manual retry patterns using signals when automatic retries are insufficient for handling invalid data scenarios.

## Key Concepts
- Preventing automatic retries for invalid data
- Manual retry pattern using signals
- Interactive error correction
- Dynamic request updates during workflow execution

## What You'll Implement

### 1. Activity Configuration
Throw \`ApplicationFailure.nonRetryable()\` errors in activities for invalid data scenarios to prevent automatic retries.

### 2. Manual Retry Logic
Wrap activity calls in a \`while(true)\` loop that:
- Executes operations
- Catches errors and sets status to \`'PENDING_FIX'\`
- Waits for retry signal before continuing

### 3. Signal Handlers
- \`approveSignal\`: Handle approval/rejection signals
- \`retrySignal\`: Handle retry signals with updated data (key/value pairs)

## Testing the Exercise

1. Start the worker:
\`\`\`bash
npx ts-node exercise7/src/worker/index.ts
\`\`\`

2. Run the workflow:
\`\`\`bash
npx ts-node exercise7/src/starter/index.ts
\`\`\`

3. View workflow in Temporal UI to comprehend event history: http://localhost:8233/namespaces/default/workflows

## Expected Behavior
1. Workflow starts and attempts withdrawal (fails with invalid-account)
2. Workflow enters PENDING_FIX status
3. Send retry signal with corrected account data
4. Withdrawal succeeds, workflow waits for approval
5. After approval, deposit completes
6. Workflow completes successfully

### Interactive Testing via UI
Comment out the signal calls in \`starter/index.ts\` to manually send signals via Temporal UI:
1. Run the workflow - it will wait in PENDING_FIX status
2. Use **More Actions → Send a Signal** to send retry signal with corrected data
3. Query status to see workflow progress
4. Send approval signal via UI
5. Observe workflow complete step by step

### Alternative: Use Temporal CLI
Send approval:
\`\`\`bash
temporal workflow signal \\
  --workflow-id money-transfer-workflow \\
  --name approve \\
  --input true
\`\`\`

Retry with corrected data:
\`\`\`bash
temporal workflow signal \\
  --workflow-id money-transfer-workflow \\
  --name retry \\
  --input '{"key":"toAccount","value":"account-456"}'
\`\`\`

## Key Learning Points
- When to use manual vs automatic retries
- Signal-based error correction patterns
- Interactive workflow debugging
- Handling invalid data scenarios gracefully
`,sandbox:`# Exercise 7: Manual Activity Retry

## What you'll build
Some failures can't be fixed by retrying — like a transfer to an *invalid
account*. You'll mark those as **non-retryable**, then build a **manual retry**
pattern: the Workflow catches the failure, sets status to \`PENDING_FIX\`, and
waits for a human to send corrected data via a **retry signal** before continuing.

In this sandbox you don't run any terminal commands. You edit the files in the
tabs above the editor, then press **Run**. The Starter intentionally begins with
an invalid account, then signals a correction so you can watch the recovery.

Work through the steps in order. Each step tells you *which file* to edit, *what
code* to add, and *why* it's needed.

## Step 1 — Make invalid-account failures non-retryable

**File:** open the \`activities.ts\` tab.

\`ApplicationFailure\` is already imported. Replace the plain \`throw new Error(...)\`
for the invalid account in both \`withdraw\` and \`deposit\`.

In \`withdraw\`:

\`\`\`typescript
if (account === 'invalid-account') {
  throw ApplicationFailure.nonRetryable('withdrawal failed - invalid account');
}
\`\`\`

In \`deposit\`:

\`\`\`typescript
if (account === 'invalid-account') {
  throw ApplicationFailure.nonRetryable('deposit failed - invalid account');
}
\`\`\`

**Why:** by default Temporal retries failed Activities forever. Retrying a bad
account number will never succeed, so we throw \`ApplicationFailure.nonRetryable\`
to stop the automatic retries and hand control back to the Workflow to decide
what to do.

## Step 2 — Add the manual-retry logic to the Workflow

**File:** open the \`workflow.ts\` tab.

The \`retrySignal\` is already declared at the top. Complete the \`transfer\`
function so it: handles the retry signal (updating the request), wraps Activities
in a helper that pauses on failure, and resumes when a correction arrives:

\`\`\`typescript
export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ TransferStatus: ['PENDING'] });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;
  let retryRequested = false;
  const updatedRequest = { ...request };

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  setHandler(retrySignal, (update: RetryUpdate) => {
    if (update.key === 'fromAccount') updatedRequest.fromAccount = update.value;
    else if (update.key === 'toAccount') updatedRequest.toAccount = update.value;
    else if (update.key === 'amount') updatedRequest.amount = parseFloat(update.value);
    retryRequested = true;
  });

  // Helper function to update status and search attributes
  const updateStatus = (newStatus: TransferStatus) => {
    status = newStatus;
    upsertSearchAttributes({ TransferStatus: [newStatus] });
  };

  // Helper function to retry activities on failure, waiting for manual correction via signal
  const retryActivity = async <T>(fn: () => Promise<T>): Promise<T> => {
    while (true) {
      try {
        return await fn();
      } catch (e) {
        updateStatus('PENDING_FIX');
        retryRequested = false;
        await condition(() => retryRequested);
      }
    }
  };

  await retryActivity(() => withdraw(updatedRequest.fromAccount, updatedRequest.amount));
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    updateStatus('APPROVED');
    await retryActivity(() => deposit(updatedRequest.toAccount, updatedRequest.amount));
    updateStatus('COMPLETED');
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(updatedRequest.fromAccount, updatedRequest.amount);
  updateStatus('CANCELLED');
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
\`\`\`

**Why:** \`retryActivity\` runs an Activity, and on a non-retryable failure it
parks the Workflow at \`PENDING_FIX\` and \`await\`s \`condition(() =>
retryRequested)\`. The \`retrySignal\` handler patches \`updatedRequest\` and flips
\`retryRequested\`, which wakes the loop so it retries with the corrected data.

## Step 3 — Review the Starter (no changes needed)

**File:** open the \`starter/index.ts\` tab.

The Starter is already complete. It starts with an invalid account, then sends
the correction and the approval:

\`\`\`typescript
await handle.signal(retrySignal, { key: 'fromAccount', value: 'account-123' });
// ...
await handle.signal(approveSignal, true);
\`\`\`

**Why it matters:** this simulates an operator fixing bad input on a live
Workflow — exactly what the manual-retry pattern is for.

## Step 4 — Run it

Press the **Run** button. In the **Console** you'll see the withdrawal fail, the
status move to \`PENDING_FIX\`, the retry signal correct the account, and the
transfer recover. The **Output** tab shows:

\`\`\`
Transfer completed successfully
\`\`\`

Open the **Temporal UI** button to watch \`TransferStatus\` pass through
\`PENDING_FIX\` before reaching \`COMPLETED\`.

## Recap
- \`ApplicationFailure.nonRetryable\` stops pointless automatic retries for bad data.
- The Workflow catches the failure, marks \`PENDING_FIX\`, and waits for a fix.
- A **retry signal** delivers corrected data and resumes execution.

Stuck? Use **Switch to solution** above the editor to view the completed code.
`,solution:`# Exercise 7 Solution: Manual Activity Retry

## Key Implementation Points

### 1. Use Non-Retryable Errors
\`\`\`typescript
import { log, ApplicationFailure } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (account === 'invalid-account') {
    throw ApplicationFailure.nonRetryable('withdrawal failed - invalid account');
  }
}
\`\`\`

### 2. Helper Functions
\`\`\`typescript
// Update status and search attributes together
const updateStatus = (newStatus: TransferStatus) => {
  status = newStatus;
  upsertSearchAttributes({ TransferStatus: [newStatus] });
};

// Retry activities on failure, waiting for manual correction via signal
const retryActivity = async <T>(fn: () => Promise<T>): Promise<T> => {
  while (true) {
    try {
      return await fn();
    } catch (e) {
      updateStatus('PENDING_FIX');
      retryRequested = false;
      await condition(() => retryRequested);
    }
  }
};
\`\`\`

### 3. Retry Signal Handler
\`\`\`typescript
setHandler(retrySignal, (update: RetryUpdate) => {
  if (update.key === 'fromAccount') updatedRequest.fromAccount = update.value;
  else if (update.key === 'toAccount') updatedRequest.toAccount = update.value;
  else if (update.key === 'amount') updatedRequest.amount = parseFloat(update.value);
  retryRequested = true;
});
\`\`\`

### 4. Use Retry Helper
\`\`\`typescript
await retryActivity(() => withdraw(updatedRequest.fromAccount, updatedRequest.amount));
\`\`\`

## Key Concepts
- Non-retryable errors for invalid data scenarios
- Manual retry loops for handling correctable errors
- Signal-based data correction
- Dynamic request updates during execution
- Helper functions to reduce code duplication
`,files:[{path:`src/workflow.ts`,content:`import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus, RetryUpdate } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const retrySignal = defineSignal<[RetryUpdate]>('retry');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

// TODO: Implement manual retry pattern:
//   1. Create updateStatus helper to update status and search attributes
//   2. Create retryActivity helper that wraps activities in while(true) loop
//   3. On error, call updateStatus('PENDING_FIX') and wait for retrySignal
//   4. Set up retrySignal handler to update request fields
export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ TransferStatus: ['PENDING'] });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;
  let retryRequested = false;
  const updatedRequest = { ...request };

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  // TODO: Set up retrySignal handler

  // TODO: Create updateStatus helper function

  // TODO: Create retryActivity helper function

  // TODO: Use retryActivity for withdraw
  await withdraw(updatedRequest.fromAccount, updatedRequest.amount);

  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    // TODO: Use retryActivity for deposit
    await deposit(updatedRequest.toAccount, updatedRequest.amount);
    status = 'COMPLETED';
    return 'Transfer completed successfully';
  }

  await refund(updatedRequest.fromAccount, updatedRequest.amount);
  status = 'CANCELLED';
  return 'Transfer rejected and refunded';
}
`,solution:`import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus, RetryUpdate } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const retrySignal = defineSignal<[RetryUpdate]>('retry');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ TransferStatus: ['PENDING'] });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;
  let retryRequested = false;
  const updatedRequest = { ...request };

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  setHandler(retrySignal, (update: RetryUpdate) => {
    if (update.key === 'fromAccount') updatedRequest.fromAccount = update.value;
    else if (update.key === 'toAccount') updatedRequest.toAccount = update.value;
    else if (update.key === 'amount') updatedRequest.amount = parseFloat(update.value);
    retryRequested = true;
  });

  // Helper function to update status and search attributes
  const updateStatus = (newStatus: TransferStatus) => {
    status = newStatus;
    upsertSearchAttributes({ TransferStatus: [newStatus] });
  };

  // Helper function to retry activities on failure, waiting for manual correction via signal
  const retryActivity = async <T>(fn: () => Promise<T>): Promise<T> => {
    while (true) {
      try {
        return await fn();
      } catch (e) {
        updateStatus('PENDING_FIX');
        retryRequested = false;
        await condition(() => retryRequested);
      }
    }
  };

  await retryActivity(() => withdraw(updatedRequest.fromAccount, updatedRequest.amount));
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    updateStatus('APPROVED');
    await retryActivity(() => deposit(updatedRequest.toAccount, updatedRequest.amount));
    updateStatus('COMPLETED');
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(updatedRequest.fromAccount, updatedRequest.amount);
  updateStatus('CANCELLED');
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
`},{path:`src/activities.ts`,content:`import { log, ApplicationFailure } from '@temporalio/activity';

// TODO: Throw ApplicationFailure.nonRetryable() for invalid account errors
export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (account === 'invalid-account') throw new Error('withdrawal failed - invalid account');
}

// TODO: Throw ApplicationFailure.nonRetryable() for invalid account errors
export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (account === 'invalid-account') throw new Error('deposit failed - invalid account');
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
`,solution:`import { log, ApplicationFailure } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (account === 'invalid-account') {
    throw ApplicationFailure.nonRetryable('withdrawal failed - invalid account');
  }
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (account === 'invalid-account') {
    throw ApplicationFailure.nonRetryable('deposit failed - invalid account');
  }
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
`},{path:`src/models.ts`,content:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'PENDING_FIX';

export interface RetryUpdate {
  key: string;
  value: string;
}
`,solution:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'PENDING_FIX';

export interface RetryUpdate {
  key: string;
  value: string;
}
`},{path:`src/worker/index.ts`,content:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`},{path:`src/starter/index.ts`,content:`import { Client } from '@temporalio/client';
import { transfer, approveSignal, retrySignal } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'invalid-account',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
    searchAttributes: {
      AccountId: [request.fromAccount],
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Sending retry signal with corrected account...');
  await handle.signal(retrySignal, { key: 'fromAccount', value: 'account-123' });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Client } from '@temporalio/client';
import { transfer, approveSignal, retrySignal } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'invalid-account',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
    searchAttributes: {
      AccountId: [request.fromAccount],
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Sending retry signal with corrected account...');
  await handle.signal(retrySignal, { key: 'fromAccount', value: 'account-123' });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`}]},{id:`exercise8`,number:8,title:`Exercise 8: Workflow Versioning with Patched API`,duration:``,root:`exercise8`,readme:`# Exercise 8: Workflow Versioning with Patched API

## Goal
Learn how to safely evolve workflows using Temporal's \`patched()\` API for versioning, ensuring backward compatibility with running workflows.

## Scenario
We'll evolve the money transfer workflow by adding a new notification step after deposit. Using versioning ensures existing workflows continue running correctly while new workflows use the updated logic.

## Learning Objectives
- Understand workflow versioning and why it's needed
- Use \`patched()\` to introduce non-deterministic changes
- Write replay tests to verify version compatibility
- Handle multiple workflow versions in production

## Background: Why Versioning?

Temporal workflows are deterministic - replaying history must produce the same result. Adding new activities or changing execution order breaks this. The \`patched()\` API allows safe evolution:

\`\`\`typescript
import { patched } from '@temporalio/workflow';

// Version 1: Original workflow (no patched call)
await withdraw(from, amount);
await deposit(to, amount);

// Version 2: Add notification (with patched)
await withdraw(from, amount);
await deposit(to, amount);
if (patched('add-notification')) {
  await sendNotification(to, amount);  // New activity
}
\`\`\`

**How it works:**
- Old workflows: \`patched()\` returns \`false\` (skip new code)
- New workflows: \`patched()\` returns \`true\` (run new code)
- Change IDs must be unique and permanent

## Tasks

### Task 1: Add Notification Activity
Create a \`sendNotification\` activity in \`activities.ts\`:
\`\`\`typescript
export async function sendNotification(account: string, amount: number): Promise<void>
\`\`\`

### Task 2: Version the Workflow
In \`workflow.ts\`, after the deposit activity:
1. Import \`patched\` from \`@temporalio/workflow\`
2. Use \`patched('add-notification')\` to conditionally call \`sendNotification\`
3. Only send notification when transfer is approved and completed

### Task 3: Write Replay Test
Create \`workflow.test.ts\` to verify:
1. Old workflow history replays correctly (without notification)
2. New workflow executes with notification
3. Use \`@temporalio/testing\` for replay testing

### Task 4: Generate History File

1. Start Temporal dev server:
\`\`\`bash
temporal server start-dev --search-attribute AccountId=Keyword --search-attribute TransferStatus=Keyword
\`\`\`

2. In another terminal, start the worker:
\`\`\`bash
npx ts-node exercise7/src/worker/index.ts
\`\`\`

3. In another terminal, run a workflow with the old code (workflow-v1.ts):
\`\`\`bash
npx ts-node exercise7/src/starter/index.ts
\`\`\`

4. Download history from Temporal Web UI:
   - Open http://localhost:8233
   - Find your workflow execution
   - Click "Download" → "Download Event History JSON" → Select "encoded"
   - Save as \`exercise8/src/workflow-history-v1.json\`

Alternatively, use the CLI:
\`\`\`bash
temporal workflow show --workflow-id <your-workflow-id> --output json > exercise8/src/workflow-history-v1.json
\`\`\`

## Testing Your Solution

### Run the workflow:
\`\`\`bash
# Terminal 1: Start worker
npx ts-node exercise8/src/worker/index.ts

# Terminal 2: Start workflow
npx ts-node exercise8/src/starter/index.ts
\`\`\`

### Run replay tests:
\`\`\`bash
npm test -- exercise8
\`\`\`

## Expected Behavior

**New workflow execution:**
1. Withdraw from account
2. Wait for approval signal
3. If approved: deposit + send notification
4. If rejected: refund (no notification)

**Replay of old workflow:**
- Skips notification step
- Completes successfully without errors

## Key Concepts

- **patched(changeId)**: Returns \`true\` for new executions, \`false\` when replaying old history
- **Change ID**: Unique string identifier (e.g., 'add-notification')
- **Replay test**: Validates workflow can replay old history with new code
- **Determinism**: Workflows must produce same result when replayed

## Tips

- Change IDs are permanent - never reuse or remove them
- Test replay before deploying versioned workflows
- Use descriptive change IDs (e.g., 'add-notification-v1')
- Multiple \`patched()\` calls can coexist in one workflow

## Next Steps

After completing this exercise, you'll understand how to:
- Safely evolve production workflows
- Maintain backward compatibility
- Test version changes with replay
- Handle multiple workflow versions simultaneously
`,sandbox:`# Exercise 8: Workflow Versioning with Patched API

## What you'll build
You'll evolve the transfer Workflow by adding a **notification** step after the
deposit — without breaking Workflows that are already running. Temporal's
\`patched()\` API lets new executions run the new code while old histories still
replay correctly.

In this sandbox you don't run any terminal commands. You edit the files in the
tabs above the editor, then press **Run**, which starts a Temporal dev server,
your **Worker**, and the **Starter**.

Work through the steps in order. Each step tells you *which file* to edit, *what
code* to add, and *why* it's needed.

## Step 1 — Add the notification Activity

**File:** open the \`activities.ts\` tab.

Add a new Activity that represents the notification (here it just logs):

\`\`\`typescript
export async function sendNotification(account: string, amount: number): Promise<void> {
  log.info('Sending notification', { amount, account });
}
\`\`\`

**Why:** the new behavior is "send a notification after a successful deposit."
Like all side effects, it belongs in an Activity, not in the Workflow.

## Step 2 — Version the Workflow with \`patched()\`

**File:** open the \`workflow.ts\` tab.

First, add \`patched\` to the import from \`@temporalio/workflow\`:

\`\`\`typescript
import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes, patched } from '@temporalio/workflow';
\`\`\`

Add \`sendNotification\` to the Activities you proxy:

\`\`\`typescript
const { withdraw, deposit, refund, sendNotification } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});
\`\`\`

Then, in the approved branch, right after the \`deposit\` call, guard the new step
with \`patched()\`:

\`\`\`typescript
if (patched('add-notification')) {
  await sendNotification(updatedRequest.toAccount, updatedRequest.amount);
  console.log('Notification sent');
}
\`\`\`

**Why:** \`patched('add-notification')\` returns \`true\` for new executions (so they
run the notification) and \`false\` when replaying history recorded *before* the
change existed (so old Workflows skip it and stay deterministic). The change ID
is permanent — it's how Temporal tells the two versions apart.

## Step 3 — About the replay test

**File:** open the \`workflow.test.ts\` tab.

Task 3 of this exercise writes a **replay test** that loads a pre-recorded v1
history and replays it against your new code to prove backward compatibility.
Replay tests run through the test suite (\`npm test\`), which is outside this
sandbox's click-to-run flow — pressing **Run** here exercises the *new* Workflow
path instead. Use **Switch to solution** to read the completed \`workflow.test.ts\`
and the replay assertion.

## Step 4 — Run it

Press the **Run** button. Because this is a brand-new execution, \`patched()\`
returns \`true\`, so you'll see the notification fire. The **Console** shows
\`Notification sent\`, and the **Output** tab shows:

\`\`\`
Transfer completed successfully
\`\`\`

Open the **Temporal UI** button to see the \`sendNotification\` Activity in the
event history after the deposit.

## Recap
- \`patched(changeId)\` returns \`true\` for new runs and \`false\` when replaying pre-change history.
- New side effects (the notification) go in an Activity, gated by the patch.
- Replay tests verify old histories still work — validated via the test suite, not the Run button.

Stuck? Use **Switch to solution** above the editor to view the completed code.
`,solution:`# Exercise 8 Solution: Workflow Versioning

## Key Implementation Points

### 1. Add Notification Activity
\`\`\`typescript
export async function sendNotification(account: string, amount: number): Promise<void> {
  log.info('Sending notification', { amount, account });
}
\`\`\`

### 2. Import patched API
\`\`\`typescript
import { patched } from '@temporalio/workflow';
\`\`\`

### 3. Proxy the New Activity
\`\`\`typescript
const { withdraw, deposit, refund, sendNotification } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});
\`\`\`

### 4. Use patched() for Versioning
\`\`\`typescript
if (approved) {
  updateStatus('APPROVED');
  await retryActivity(() => deposit(updatedRequest.toAccount, updatedRequest.amount));
  
  // Version 2: Add notification with patched API
  if (patched('add-notification')) {
    await sendNotification(updatedRequest.toAccount, updatedRequest.amount);
    console.log('Notification sent');
  }
  
  updateStatus('COMPLETED');
  console.log('Transfer approved and completed');
  return 'Transfer completed successfully';
}
\`\`\`

### 5. Replay Test Implementation
\`\`\`typescript
import { TestWorkflowEnvironment } from '@temporalio/testing';
import { Worker } from '@temporalio/worker';
import { transfer, approveSignal } from './workflow';
import { defineSearchAttributeKey, SearchAttributeType } from '@temporalio/common';
import assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

describe('Solution 8: Workflow Versioning', () => {
  let testEnv: TestWorkflowEnvironment;
  let worker: Worker;
  let runPromise: Promise<void>;

  before(async function () {
    this.timeout(60000);
    testEnv = await TestWorkflowEnvironment.createLocal({
      server: {
        searchAttributes: [
          defineSearchAttributeKey('TransferStatus', SearchAttributeType.KEYWORD),
        ],
      },
    });
    worker = await Worker.create({
      connection: testEnv.nativeConnection,
      taskQueue: 'test-queue',
      workflowsPath: require.resolve('./workflow'),
      activities: {
        withdraw: async () => {},
        deposit: async () => {},
        refund: async () => {},
        sendNotification: async () => {},
      },
    });
    runPromise = worker.run();
  });

  after(async () => {
    worker.shutdown();
    await runPromise;
    await testEnv.teardown();
  });

  it('should replay old workflow history without notification', async () => {
    // Load pre-generated workflow history from v1 (without notification)
    const historyPath = path.join(__dirname, 'workflow-history-v1.json');
    const history = JSON.parse(await fs.promises.readFile(historyPath, 'utf8'));

    // Replay with new workflow code (with patched)
    await Worker.runReplayHistory(
      {
        workflowsPath: require.resolve('./workflow'),
      },
      history
    );
    // If replay succeeds without throwing, test passes
  });
});
\`\`\`

### 6. Generating History File
The \`workflow-history-v1.json\` file is pre-generated. To regenerate:

**Option 1: Using Temporal Web UI**
1. Start Temporal dev server and run workflow-v1
2. Open http://localhost:8233
3. Find workflow ID: \`workflow-v1-history\`
4. Click "Download" → "Download Event History JSON" → Select "encoded"
5. Save as \`workflow-history-v1.json\`

**Option 2: Using Temporal CLI**
\`\`\`bash
temporal workflow show --workflow-id workflow-v1-history --output json > workflow-history-v1.json
\`\`\`

Note: The history file must be in the format exported by Temporal CLI or Web UI (encoded format) to work with \`Worker.runReplayHistory()\`.

## Key Concepts

### patched() Behavior
- **New workflows**: \`patched('add-notification')\` returns \`true\` → executes notification
- **Replaying old workflows**: \`patched('add-notification')\` returns \`false\` → skips notification
- **Change ID**: Must be unique and permanent (never reuse or remove)

### Why Versioning Matters
- Workflows can run for days, weeks, or months
- Code must evolve without breaking running workflows
- Temporal replays workflow history to recover state
- Non-deterministic changes break replay → workflow fails

### Safe Evolution Pattern
1. Add new code inside \`if (patched('change-id'))\` block
2. Test replay with old workflow histories
3. Deploy new code - old workflows continue, new workflows use new logic
4. Never remove \`patched()\` calls (keep forever)

### Replay Testing
- Validates backward compatibility
- Catches determinism errors before production
- Uses real workflow history from old version
- Replays with new workflow code

## Best Practices
- Use descriptive change IDs: \`'add-notification'\`, \`'fix-refund-logic'\`
- Test replay before deploying versioned workflows
- Keep \`patched()\` calls permanently in code
- Document what each version change does
- Never reuse change IDs for different changes
`,files:[{path:`src/workflow.ts`,content:`import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
// TODO: Task 2 - Import patched from @temporalio/workflow
import type * as activities from './activities';
import type { TransferRequest, TransferStatus, RetryUpdate } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const retrySignal = defineSignal<[RetryUpdate]>('retry');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ TransferStatus: ['PENDING'] });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;
  let retryRequested = false;
  const updatedRequest = { ...request };

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  setHandler(retrySignal, (update: RetryUpdate) => {
    if (update.key === 'fromAccount') updatedRequest.fromAccount = update.value;
    else if (update.key === 'toAccount') updatedRequest.toAccount = update.value;
    else if (update.key === 'amount') updatedRequest.amount = parseFloat(update.value);
    retryRequested = true;
  });

  const updateStatus = (newStatus: TransferStatus) => {
    status = newStatus;
    upsertSearchAttributes({ TransferStatus: [newStatus] });
  };

  const retryActivity = async <T>(fn: () => Promise<T>): Promise<T> => {
    while (true) {
      try {
        return await fn();
      } catch (e) {
        updateStatus('PENDING_FIX');
        retryRequested = false;
        await condition(() => retryRequested);
      }
    }
  };

  await retryActivity(() => withdraw(updatedRequest.fromAccount, updatedRequest.amount));
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    updateStatus('APPROVED');
    await retryActivity(() => deposit(updatedRequest.toAccount, updatedRequest.amount));
    
    // TODO: Task 2 - Add versioning with patched('add-notification')
    // if (patched('add-notification')) {
    //   await sendNotification(updatedRequest.toAccount, updatedRequest.amount);
    // }
    
    updateStatus('COMPLETED');
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(updatedRequest.fromAccount, updatedRequest.amount);
  updateStatus('CANCELLED');
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
`,solution:`import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes, patched } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus, RetryUpdate } from './models';

const { withdraw, deposit, refund, sendNotification } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const retrySignal = defineSignal<[RetryUpdate]>('retry');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ TransferStatus: ['PENDING'] });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;
  let retryRequested = false;
  const updatedRequest = { ...request };

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  setHandler(retrySignal, (update: RetryUpdate) => {
    if (update.key === 'fromAccount') updatedRequest.fromAccount = update.value;
    else if (update.key === 'toAccount') updatedRequest.toAccount = update.value;
    else if (update.key === 'amount') updatedRequest.amount = parseFloat(update.value);
    retryRequested = true;
  });

  const updateStatus = (newStatus: TransferStatus) => {
    status = newStatus;
    upsertSearchAttributes({ TransferStatus: [newStatus] });
  };

  const retryActivity = async <T>(fn: () => Promise<T>): Promise<T> => {
    while (true) {
      try {
        return await fn();
      } catch (e) {
        updateStatus('PENDING_FIX');
        retryRequested = false;
        await condition(() => retryRequested);
      }
    }
  };

  await retryActivity(() => withdraw(updatedRequest.fromAccount, updatedRequest.amount));
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    updateStatus('APPROVED');
    await retryActivity(() => deposit(updatedRequest.toAccount, updatedRequest.amount));
    
    if (patched('add-notification')) {
      await sendNotification(updatedRequest.toAccount, updatedRequest.amount);
      console.log('Notification sent');
    }
    
    updateStatus('COMPLETED');
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(updatedRequest.fromAccount, updatedRequest.amount);
  updateStatus('CANCELLED');
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
`},{path:`src/activities.ts`,content:`import { log, ApplicationFailure } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (account === 'invalid-account') {
    throw ApplicationFailure.nonRetryable('withdrawal failed - invalid account');
  }
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (account === 'invalid-account') {
    throw ApplicationFailure.nonRetryable('deposit failed - invalid account');
  }
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}

// TODO: Task 1 - Add sendNotification activity
// export async function sendNotification(account: string, amount: number): Promise<void> {
//   log.info('Sending notification', { amount, account });
// }
`,solution:`import { log, ApplicationFailure } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (account === 'invalid-account') {
    throw ApplicationFailure.nonRetryable('withdrawal failed - invalid account');
  }
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (account === 'invalid-account') {
    throw ApplicationFailure.nonRetryable('deposit failed - invalid account');
  }
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}

export async function sendNotification(account: string, amount: number): Promise<void> {
  log.info('Sending notification', { amount, account });
}
`},{path:`src/models.ts`,content:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'PENDING_FIX';

export interface RetryUpdate {
  key: string;
  value: string;
}
`,solution:`export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'PENDING_FIX';

export interface RetryUpdate {
  key: string;
  value: string;
}
`},{path:`src/worker/index.ts`,content:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'money-transfer-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`},{path:`src/starter/index.ts`,content:`import { Client } from '@temporalio/client';
import { transfer, approveSignal } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
    searchAttributes: {
      AccountId: [request.fromAccount],
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Sending approval signal...');
  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,solution:`import { Client } from '@temporalio/client';
import { transfer, approveSignal } from '../workflow';
import type { TransferRequest } from '../models';

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: 'money-transfer-workflow',
    args: [request],
    searchAttributes: {
      AccountId: [request.fromAccount],
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Sending approval signal...');
  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
`},{path:`src/workflow.test.ts`,content:`import { TestWorkflowEnvironment } from '@temporalio/testing';
import { Worker } from '@temporalio/worker';
import { transfer, approveSignal } from './workflow';
import type { TransferRequest } from './models';
import { defineSearchAttributeKey, SearchAttributeType } from '@temporalio/common';
import assert from 'assert';

// TODO: Task 3 - Implement replay test
// This test should:
// 1. Create a workflow history without the notification (old version)
// 2. Replay that history with the new workflow code (with patched)
// 3. Verify the replay succeeds without errors

describe('Exercise 8: Workflow Versioning', () => {
  let testEnv: TestWorkflowEnvironment;
  let worker: Worker;
  let runPromise: Promise<void>;

  before(async function () {
    this.timeout(60000);
    testEnv = await TestWorkflowEnvironment.createLocal({
      server: {
        searchAttributes: [
          defineSearchAttributeKey('AccountId', SearchAttributeType.KEYWORD),
          defineSearchAttributeKey('TransferStatus', SearchAttributeType.KEYWORD),
        ],
      },
    });
    worker = await Worker.create({
      connection: testEnv.nativeConnection,
      taskQueue: 'test-queue',
      workflowsPath: require.resolve('./workflow'),
      activities: {
        withdraw: async () => {},
        deposit: async () => {},
        refund: async () => {},
        // TODO: Task 1 - Add sendNotification mock
        // sendNotification: async () => {},
      },
    });
    runPromise = worker.run();
  });

  after(async () => {
    worker.shutdown();
    await runPromise;
    await testEnv.teardown();
  });

  const makeRequest = (transferId: string): TransferRequest => ({
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId,
  });

  it('should execute new workflow with notification', async () => {
    const { client } = testEnv;

    const handle = await client.workflow.start(transfer, {
      taskQueue: 'test-queue',
      workflowId: \`test-transfer-\${Date.now()}\`,
      args: [makeRequest('transfer-1')],
    });

    await handle.signal(approveSignal, true);
    const result = await handle.result();
    assert.strictEqual(result, 'Transfer completed successfully');
  });

  // TODO: Task 3 - Add replay test here
  // it('should replay old workflow history without notification', async () => {
  //   // Load pre-generated workflow history from v1 (without notification)
  //   const historyPath = path.join(__dirname, 'workflow-history-v1.json');
  //   const historyJson = fs.readFileSync(historyPath, 'utf8');
  //   const { history: historyBase64 } = JSON.parse(historyJson);
  //   
  //   // Decode from base64 and deserialize protobuf
  //   const historyBytes = Buffer.from(historyBase64, 'base64');
  //   const { temporal } = await import('@temporalio/proto');
  //   const history = temporal.api.history.v1.History.decode(historyBytes);
  //
  //   // Replay with new workflow code (with patched)
  //   await Worker.runReplayHistory(
  //     {
  //       workflowsPath: require.resolve('./workflow'),
  //     },
  //     history
  //   );
  //   // If replay succeeds without throwing, test passes
  // });
});
`,solution:`import { TestWorkflowEnvironment } from '@temporalio/testing';
import { Worker } from '@temporalio/worker';
import { transfer, approveSignal } from './workflow';
import type { TransferRequest } from './models';
import { defineSearchAttributeKey, SearchAttributeType } from '@temporalio/common';
import assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

describe('Solution 8: Workflow Versioning', () => {
  let testEnv: TestWorkflowEnvironment;
  let worker: Worker;
  let runPromise: Promise<void>;

  before(async function () {
    this.timeout(60000);
    testEnv = await TestWorkflowEnvironment.createLocal({
      server: {
        searchAttributes: [
          defineSearchAttributeKey('AccountId', SearchAttributeType.KEYWORD),
          defineSearchAttributeKey('TransferStatus', SearchAttributeType.KEYWORD),
        ],
      },
    });
    worker = await Worker.create({
      connection: testEnv.nativeConnection,
      taskQueue: 'test-queue',
      workflowsPath: require.resolve('./workflow'),
      activities: {
        withdraw: async () => {},
        deposit: async () => {},
        refund: async () => {},
        sendNotification: async () => {},
      },
    });
    runPromise = worker.run();
  });

  after(async () => {
    worker.shutdown();
    await runPromise;
    await testEnv.teardown();
  });

  const makeRequest = (transferId: string): TransferRequest => ({
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId,
  });

  it('should execute new workflow with notification', async () => {
    const { client } = testEnv;

    const handle = await client.workflow.start(transfer, {
      taskQueue: 'test-queue',
      workflowId: \`test-transfer-\${Date.now()}\`,
      args: [makeRequest('transfer-1')],
    });

    await handle.signal(approveSignal, true);
    const result = await handle.result();
    assert.strictEqual(result, 'Transfer completed successfully');
  });

  it('should replay old workflow history without notification', async () => {
    // Load pre-generated workflow history from v1 (without notification)
    const historyPath = path.join(__dirname, 'workflow-history-v1.json');
    const history = JSON.parse(await fs.promises.readFile(historyPath, 'utf8'));

    // Replay with new workflow code (with patched)
    await Worker.runReplayHistory(
      {
        workflowsPath: require.resolve('./workflow'),
      },
      history
    );
    // If replay succeeds without throwing, test passes
  });
});
`}]}]};function io({count:e=160,duration:t=2800}={}){if(typeof document>`u`)return;let n=document.createElement(`canvas`);n.setAttribute(`aria-hidden`,`true`),n.style.cssText=`position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;`,document.body.appendChild(n);let r=n.getContext(`2d`),i=window.devicePixelRatio||1,a=()=>window.innerWidth,o=()=>window.innerHeight,s=()=>{n.width=a()*i,n.height=o()*i,r.setTransform(i,0,0,i,0,0)};s(),window.addEventListener(`resize`,s);let c=[`#444CE7`,`#818cf8`,`#B664FF`,`#34d399`,`#fbbf24`,`#f78c6c`],l=Array.from({length:e},()=>({x:Math.random()*a(),y:-20-Math.random()*o()*.35,w:6+Math.random()*6,h:8+Math.random()*8,vx:-2+Math.random()*4,vy:2+Math.random()*4,rot:Math.random()*Math.PI,vrot:-.2+Math.random()*.4,color:c[Math.floor(Math.random()*c.length)]})),u=performance.now(),d=0;function f(e){let i=e-u;r.clearRect(0,0,a(),o());let c=i>t-700?Math.max(0,(t-i)/700):1;for(let e of l)e.vy+=.05,e.x+=e.vx,e.y+=e.vy,e.rot+=e.vrot,r.save(),r.translate(e.x,e.y),r.rotate(e.rot),r.globalAlpha=c,r.fillStyle=e.color,r.fillRect(-e.w/2,-e.h/2,e.w,e.h),r.restore();i<t?d=requestAnimationFrame(f):(cancelAnimationFrame(d),window.removeEventListener(`resize`,s),n.remove())}d=requestAnimationFrame(f)}var ao=`temporal-ts-course`;function oo(...e){return[ao,...e].join(`:`)}function so(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}var co=[[`comment`,/\/\/[^\n]*|\/\*[\s\S]*?\*\//],[`string`,/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/],[`number`,/\b0[xXbBoO][\da-fA-F_]+\b|\b\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?\b/],[`keyword`,RegExp(`\\b(?:${`abstract.any.as.async.await.boolean.break.case.catch.class.const.continue.debugger.declare.default.delete.do.else.enum.export.extends.false.finally.for.from.function.get.if.implements.import.in.infer.instanceof.interface.is.keyof.let.namespace.never.new.null.number.object.of.private.protected.public.readonly.return.set.static.string.super.switch.symbol.this.throw.true.try.type.typeof.undefined.unknown.var.void.while.yield`.split(`.`).join(`|`)})\\b`)],[`decorator`,/@[A-Za-z_]\w*/],[`function`,/[A-Za-z_]\w*(?=\s*\()/],[`type`,/\b[A-Z]\w*\b/]],lo=new RegExp(co.map(([,e])=>`(${e.source})`).join(`|`),`g`);function uo(e){let t=String(e);lo.lastIndex=0;let n=``,r=0,i;for(;(i=lo.exec(t))!==null;){i.index>r&&(n+=so(t.slice(r,i.index)));let[e]=co[i.slice(1).findIndex(e=>e!==void 0)];n+=`<span class="tok-${e}">${so(i[0])}</span>`,r=lo.lastIndex,lo.lastIndex===i.index&&(lo.lastIndex+=1)}return n+=so(t.slice(r)),n}function fo(e){let t=so(e);return t=t.replace(/`([^`]+)`/g,`<code>$1</code>`),t=t.replace(/\*\*([^*]+)\*\*/g,`<strong>$1</strong>`),t=t.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(e,t,n)=>`<a href="${so(String(n).startsWith(`javascript:`)?`#`:n)}" target="_blank" rel="noopener">${t}</a>`),t}function po(e){let t=e.replace(/\r\n/g,`
`).split(`
`),n=[],r=null,i=!1,a=[],o=``,s=()=>{r&&=(n.push(`</${r}>`),null)},c=()=>{let e=a.join(`
`),t=/^(ts|tsx|typescript|js|jsx|javascript)$/i.test(o)?uo(e):so(e);n.push(`<pre><code data-language="${so(o)}">${t}</code></pre>`),i=!1,a=[],o=``};for(let e of t){let t=e.match(/^```(\S*)/);if(t){i?c():(s(),i=!0,o=t[1]??``);continue}if(i){a.push(e);continue}if(!e.trim()){s();continue}let l=e.match(/^(#{1,4})\s+(.+)$/);if(l){s();let e=l[1].length;n.push(`<h${e}>${fo(l[2])}</h${e}>`);continue}let u=e.match(/^\s*\d+\.\s+(.+)$/);if(u){r!==`ol`&&(s(),r=`ol`,n.push(`<ol>`)),n.push(`<li>${fo(u[1])}</li>`);continue}let d=e.match(/^\s*[-*]\s+(.+)$/);if(d){r!==`ul`&&(s(),r=`ul`,n.push(`<ul>`)),n.push(`<li>${fo(d[1])}</li>`);continue}s(),n.push(`<p>${fo(e)}</p>`)}return i&&c(),s(),`<div class="markdown">${n.join(`
`)}</div>`}function mo(e){let t=String(e).replace(/\r\n/g,`
`).split(`
`),n=[],r=[],i=null,a=!1;for(let e of t){/^```/.test(e)&&(a=!a);let t=!a&&e.match(/^##\s+(.+)$/);t?(i={title:t[1].trim(),lines:[e]},r.push(i)):i?i.lines.push(e):n.push(e)}return{intro:po(n.join(`
`)),steps:r.map((e,t)=>({id:t,title:e.title,checkable:/^step\b/i.test(e.title),html:po(e.lines.join(`
`))}))}}function ho(e,t){let n=t.split(`/`),r=n[n.length-1];return!(e.files.filter(e=>e.path.endsWith(`/${r}`)).length>1)||n.length<2?r:`${n[n.length-2]}/${r}`}var go={class:`app-frame`},_o={class:`topbar`},vo={class:`topbar-controls`},yo=[`disabled`],bo={class:`exercise-picker`},xo=[`value`],So=[`value`],Co=[`disabled`],wo=[`aria-pressed`,`title`],To={class:`workspace-panel code-panel`,"aria-label":`Code workspace`},Eo={class:`file-tabs`,role:`tablist`,"aria-label":`Source files`},Do=[`title`,`onClick`],Oo=[`title`],ko={class:`editor-shell`},Ao=[`innerHTML`],jo={class:`runner-header`},Mo={class:`runner-actions`},No=[`disabled`],Po=[`href`],Fo=[`disabled`],Io={class:`runner-tabs`,role:`tablist`,"aria-label":`Runner output`},Lo={key:0,class:`sandbox-id`},Ro={class:`runner-output`},zo={class:`editor-footer`},Bo={class:`workspace-panel instruction-panel`,"aria-label":`Exercise instructions`},Vo={class:`instruction-content`},Ho={key:0,class:`walkthrough`},Uo=[`innerHTML`],Wo=[`checked`,`aria-label`,`onChange`],Go=[`innerHTML`],Ko=[`innerHTML`],qo=[`innerHTML`],Jo=`Transfer completed successfully`;to({__name:`App`,setup(e){function t(){let e=localStorage.getItem(`${ao}:theme`);return e===`light`||e===`dark`?e:window.matchMedia?.(`(prefers-color-scheme: dark)`).matches?`dark`:`light`}let n=window.COURSE_DATA,r={exercise1:`Hello, Temporal!`};function i(e,t){let n=r[e]??Jo,i=String(t??``).trim();if(!i)return!1;if(i===n)return!0;let a=i.split(`
`).map(e=>e.trim()).filter(Boolean);return a[a.length-1]===n}let a=kt({exerciseIndex:te(),theme:t(),activeFilePath:``,fileView:`exercise`,toast:``,sandboxStatus:`checking`,sandboxAvailable:!1,sandboxMessage:``,sandboxId:localStorage.getItem(`temporal-ts-course:sandbox-id`)??``,temporalUiUrl:localStorage.getItem(`temporal-ts-course:temporal-ui-url`)??``,runnerPanel:`console`,logs:[],spinner:``,workflowOutput:``,running:!1,codeWidth:localStorage.getItem(`temporal-ts-course:code-width`)??``,dockHeight:localStorage.getItem(`temporal-ts-course:dock-height`)??``}),o=Rt(``),s=Rt(0),c=Rt(null),l=Rt(null),u=0,d=null,f=$(()=>`${uo(o.value)}\n`),p=$(()=>a.theme===`dark`?`Light mode`:`Dark mode`),m=$(()=>a.fileView===`solution`?`Switch to exercise`:`Switch to solution`),h=$(()=>n.exercises[a.exerciseIndex]),g=$(()=>h.value?.files??[]),_=$(()=>g.value.some(e=>typeof e.solution==`string`)),v=$(()=>g.value.find(e=>e.path===a.activeFilePath)??g.value[0]),y=$(()=>h.value.sandbox?mo(h.value.sandbox):null),b=$(()=>(s.value,ne(h.value))),x=$(()=>po(h.value.readme)),S=$(()=>{let e=o.value;return`${e.length?e.split(`
`).length:0} lines - ${e.length} chars`}),C=$(()=>a.sandboxAvailable),w=$(()=>!!a.sandboxId&&!a.running),ee=$(()=>`Course data ${new Date(n.generatedAt).toLocaleString()}`);function te(){let e=window.location.hash.replace(/^#/,``),t=n.exercises.findIndex(t=>t.id===e);return t>=0?t:0}function ne(e){try{let t=localStorage.getItem(oo(`walk`,e.id));return t?JSON.parse(t):{}}catch{return{}}}function T(e,t){let n=ne(h.value);n[e]=t,localStorage.setItem(oo(`walk`,h.value.id),JSON.stringify(n)),s.value+=1}function re(e){return oo(a.fileView===`solution`?`sol-edit`:`edit`,h.value.id,e)}function E(e){return a.fileView===`solution`&&typeof e.solution==`string`?e.solution:e.content}function D(e){return localStorage.getItem(re(e.path))??E(e)}function ie(e){return D(e)!==E(e)}function O(){return Object.fromEntries(g.value.map(e=>[e.path,D(e)]))}function ae(e){a.activeFilePath=e,localStorage.setItem(oo(`active-file`,h.value.id),e),k()}function k(){if(!v.value){o.value=``;return}o.value=D(v.value)}function oe(){v.value&&(o.value===E(v.value)?localStorage.removeItem(re(v.value.path)):localStorage.setItem(re(v.value.path),o.value))}function se(e){a.exerciseIndex=Math.max(0,Math.min(n.exercises.length-1,e)),a.fileView=`exercise`;let t=h.value,r=localStorage.getItem(oo(`active-file`,t.id));a.activeFilePath=t.files.some(e=>e.path===r)?r:t.files[0]?.path??``,a.logs=[],a.workflowOutput=``,k(),ce()}function ce(){let e=h.value;window.location.hash!==`#${e.id}`&&history.replaceState(null,``,`#${e.id}`)}function ue(){v.value&&(localStorage.removeItem(re(v.value.path)),k(),fe(`File reset`))}function de(){a.fileView=a.fileView===`solution`?`exercise`:`solution`,k(),fe(a.fileView===`solution`?`Showing solution`:`Showing exercise`)}function fe(e){a.toast=e,window.clearTimeout(u),u=window.setTimeout(()=>{a.toast=``},1700)}function pe(){a.theme=a.theme===`dark`?`light`:`dark`}function me(e){document.documentElement.dataset.theme=e,localStorage.setItem(`${ao}:theme`,e)}function he(){!c.value||!l.value||(l.value.scrollTop=c.value.scrollTop,l.value.scrollLeft=c.value.scrollLeft)}function ge(e,t,n){e.preventDefault();let r=document.body.style.cursor;document.body.style.userSelect=`none`,document.body.style.cursor=e.currentTarget.dataset.cursor??`default`;let i=e=>t(e),a=()=>{window.removeEventListener(`pointermove`,i),window.removeEventListener(`pointerup`,a),document.body.style.userSelect=``,document.body.style.cursor=r,n()};window.addEventListener(`pointermove`,i),window.addEventListener(`pointerup`,a)}function _e(e){let t=e.currentTarget.parentElement;ge(e,e=>{let n=getComputedStyle(t),r=parseFloat(n.paddingLeft)||0,i=parseFloat(n.paddingRight)||0,o=t.getBoundingClientRect(),s=o.width-r-i;if(s<=0)return;let c=(e.clientX-o.left-r)/s*100;a.codeWidth=`${Math.min(78,Math.max(28,c)).toFixed(2)}%`},()=>localStorage.setItem(`${ao}:code-width`,a.codeWidth))}function ve(e){let t=e.currentTarget.nextElementSibling,n=e.clientY,r=t.getBoundingClientRect().height;ge(e,e=>{let t=r-(e.clientY-n);a.dockHeight=`${Math.round(Math.min(640,Math.max(120,t)))}px`},()=>localStorage.setItem(`${ao}:dock-height`,a.dockHeight))}function ye(e){if(e.key!==`Tab`)return;e.preventDefault();let t=e.target,n=t.selectionStart,r=t.selectionEnd;o.value=`${o.value.slice(0,n)}  ${o.value.slice(r)}`,sn(()=>{t.selectionStart=n+2,t.selectionEnd=n+2})}async function be(){a.sandboxStatus=`checking`;try{let e=await fetch(`/api/health`);if(!e.ok)throw Error(`HTTP ${e.status}`);let t=await e.json();a.sandboxAvailable=!!t.daytona,a.sandboxStatus=t.daytona?`ready`:`unavailable`,a.sandboxMessage=t.daytona?`Live sandbox ready`:`Start the sandbox runner to enable live execution.`}catch{a.sandboxAvailable=!1,a.sandboxStatus=`unavailable`,a.sandboxMessage=`Start npm run course:sandbox to enable live runs.`}}async function xe(){if(!C.value)return;d?.abort();let e=new AbortController;d=e,a.running=!0,a.runnerPanel=`console`,a.spinner=``,a.logs=[],a.workflowOutput=``;try{let t=await fetch(`/api/run`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({sandboxId:a.sandboxId||void 0,exerciseId:h.value.id,files:O()}),signal:e.signal});if(!t.ok||!t.body)throw Error(await t.text().catch(()=>``)||`HTTP ${t.status}`);await M(t.body)}catch(e){e.name!==`AbortError`&&(a.logs.push(`ERROR: ${e.message}`),a.runnerPanel=`console`)}finally{d===e&&(a.running=!1,d=null)}}async function M(e){let t=e.getReader(),n=new TextDecoder,r=``;for(;;){let{value:e,done:i}=await t.read();if(i)break;r+=n.decode(e,{stream:!0});let a;for(;(a=r.indexOf(`

`))!==-1;){let e=r.slice(0,a).trim();r=r.slice(a+2),e.startsWith(`data:`)&&Se(JSON.parse(e.slice(5).trim()))}}}function Se({kind:e,payload:t}){e===`log`?a.logs.push(t):e===`spinner`?a.spinner=t||``:e===`ui`?(a.sandboxId=t.sandboxId,a.temporalUiUrl=t.uiUrl,localStorage.setItem(`${ao}:sandbox-id`,t.sandboxId),localStorage.setItem(`${ao}:temporal-ui-url`,t.uiUrl)):e===`result`?(a.workflowOutput=t.workflowResult||`(no output)`,a.runnerPanel=`output`,g.value.forEach(e=>{D(e)!==E(e)&&localStorage.setItem(re(e.path),D(e))}),i(h.value.id,t.workflowResult)&&window.setTimeout(()=>{try{io()}catch{}},0)):e===`error`&&(a.logs.push(`ERROR: ${t}`),a.runnerPanel=`console`,/not found/i.test(String(t))&&N())}async function Ce(){if(!w.value)return;let e=a.sandboxId;try{let t=await fetch(`/api/stop`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({sandboxId:e})});if(!t.ok)throw Error(await t.text());a.logs.push(`Sandbox ${e} deleted.`),N(),fe(`Sandbox stopped`)}catch(e){a.logs.push(`Stop failed: ${e.message}`)}}function N(){a.sandboxId=``,a.temporalUiUrl=``,localStorage.removeItem(`${ao}:sandbox-id`),localStorage.removeItem(`${ao}:temporal-ui-url`)}return Tn(o,oe),Tn(()=>a.theme,me,{immediate:!0}),Tn(()=>h.value.id,()=>{let e=h.value;a.fileView=`exercise`;let t=localStorage.getItem(oo(`active-file`,e.id));a.activeFilePath=e.files.some(e=>e.path===t)?t:e.files[0]?.path??``,k()},{immediate:!0}),qn(()=>{window.launchConfetti=io,be(),ce(),window.addEventListener(`hashchange`,()=>{let e=window.location.hash.replace(/^#/,``),t=n.exercises.findIndex(t=>t.id===e);t>=0&&t!==a.exerciseIndex&&se(t)})}),Xn(()=>{d?.abort(),window.clearTimeout(u)}),(e,t)=>(Y(),X(q,null,[Z(`div`,go,[Z(`header`,_o,[t[6]||=Z(`div`,{class:`brand`},[Z(`img`,{class:`brand-image`,src:`/assets/course-visual-BuqVIFQF.png`,alt:`Temporal`}),Z(`div`,{class:`brand-copy`},[Z(`p`,{class:`eyebrow`},`Temporal TypeScript Training`),Z(`h2`,null,`Workflow Exercises`)])],-1),Z(`div`,vo,[Z(`button`,{class:`button button-secondary`,type:`button`,disabled:a.exerciseIndex===0,onClick:t[0]||=e=>se(a.exerciseIndex-1)},` Previous `,8,yo),Z(`label`,bo,[Z(`select`,{value:a.exerciseIndex,onChange:t[1]||=e=>se(Number(e.target.value))},[(Y(!0),X(q,null,rr(Vt(n).exercises,(e,t)=>(Y(),X(`option`,{key:e.id,value:t},` Exercise `+j(e.number)+`: `+j(e.title.replace(/^Exercise\s+\d+:\s*/,``)),9,So))),128))],40,xo)]),Z(`button`,{class:`button button-secondary`,type:`button`,disabled:a.exerciseIndex===Vt(n).exercises.length-1,onClick:t[2]||=e=>se(a.exerciseIndex+1)},` Next `,8,Co),Z(`button`,{class:`button button-secondary theme-toggle`,type:`button`,"aria-pressed":a.theme===`dark`,title:p.value,onClick:pe},j(a.theme===`dark`?`☀`:`☾`),9,wo)])]),Z(`main`,{class:`course-shell`,style:le({"--code-col":a.codeWidth||void 0})},[Z(`section`,To,[Z(`div`,Eo,[(Y(!0),X(q,null,rr(g.value,e=>(Y(),X(`button`,{key:e.path,class:A([`file-tab`,{active:e.path===a.activeFilePath,dirty:ie(e)}]),type:`button`,role:`tab`,title:e.path,onClick:t=>ae(e.path)},j(Vt(ho)(h.value,e.path)),11,Do))),128)),_.value?(Y(),X(`button`,{key:0,class:A([`view-tab`,{active:a.fileView===`solution`}]),type:`button`,title:m.value,onClick:de},j(m.value),11,Oo)):Ni(``,!0)]),Z(`div`,ko,[Z(`pre`,{ref_key:`highlightRef`,ref:l,class:`code-highlight`,"aria-hidden":`true`},[Z(`code`,{innerHTML:f.value},null,8,Ao)],512),yn(Z(`textarea`,{ref_key:`editorRef`,ref:c,"onUpdate:modelValue":t[3]||=e=>o.value=e,class:`code-editor`,spellcheck:`false`,autocomplete:`off`,autocorrect:`off`,autocapitalize:`off`,wrap:`off`,onKeydown:ye,onScroll:he},null,544),[[Za,o.value]])]),Z(`div`,{class:`dock-resizer`,"data-cursor":`row-resize`,role:`separator`,"aria-orientation":`horizontal`,"aria-label":`Resize runner panel`,onPointerdown:ve},null,32),Z(`div`,{class:`runner-dock`,style:le({height:a.dockHeight||void 0})},[Z(`div`,jo,[Z(`div`,null,[t[7]||=Z(`p`,{class:`panel-kicker`},`Live sandbox`,-1),Z(`strong`,null,j(a.sandboxMessage),1)]),Z(`div`,Mo,[Z(`button`,{class:`button button-primary`,type:`button`,disabled:!C.value,onClick:xe},` Run `,8,No),a.sandboxId&&a.temporalUiUrl?(Y(),X(`a`,{key:0,class:`button button-link button-cta`,href:a.temporalUiUrl,target:`_blank`,rel:`noopener`},`Temporal UI`,8,Po)):Ni(``,!0),Z(`button`,{class:`button`,type:`button`,onClick:ue},`Reset`),Z(`button`,{class:`button`,type:`button`,disabled:!w.value,onClick:Ce},`Stop`,8,Fo)])]),Z(`div`,Io,[Z(`button`,{class:A([`runner-tab`,{active:a.runnerPanel===`console`}]),type:`button`,onClick:t[4]||=e=>a.runnerPanel=`console`},`Console`,2),Z(`button`,{class:A([`runner-tab`,{active:a.runnerPanel===`output`}]),type:`button`,onClick:t[5]||=e=>a.runnerPanel=`output`},`Output`,2),a.sandboxId?(Y(),X(`span`,Lo,j(a.sandboxId),1)):Ni(``,!0)]),yn(Z(`pre`,Ro,[Mi(j(a.logs.length?a.logs.join(`
`):`Runner logs appear here once you launch.`),1),a.spinner?(Y(),X(q,{key:0},[Mi(j(`\n${a.spinner}`),1)],64)):Ni(``,!0)],512),[[va,a.runnerPanel===`console`]]),yn(Z(`pre`,{class:`runner-output`},j(a.workflowOutput||`Workflow output appears here after a successful run.`),513),[[va,a.runnerPanel===`output`]])],4),Z(`div`,zo,[Z(`span`,null,j(S.value),1),Z(`span`,null,j(ee.value),1)])]),Z(`div`,{class:`pane-resizer`,"data-cursor":`col-resize`,role:`separator`,"aria-orientation":`vertical`,"aria-label":`Resize panels`,onPointerdown:_e},null,32),Z(`section`,Bo,[t[8]||=Z(`div`,{class:`instruction-heading`},[Z(`p`,{class:`panel-kicker`},`Instructions`)],-1),Z(`div`,Vo,[y.value?(Y(),X(`div`,Ho,[Z(`div`,{innerHTML:y.value.intro},null,8,Uo),(Y(!0),X(q,null,rr(y.value.steps,e=>(Y(),X(q,{key:`${h.value.id}-${e.id}`},[e.checkable?(Y(),X(`div`,{key:0,class:A([`step-row`,{completed:b.value[e.id]}])},[Z(`input`,{type:`checkbox`,checked:b.value[e.id],"aria-label":e.title,onChange:t=>T(e.id,t.target.checked)},null,40,Wo),Z(`div`,{class:`step-body`,innerHTML:e.html},null,8,Go)],2)):(Y(),X(`div`,{key:1,class:`step-plain`,innerHTML:e.html},null,8,Ko))],64))),128))])):(Y(),X(`div`,{key:1,innerHTML:x.value},null,8,qo))])])],4)]),Z(`div`,{class:A([`toast`,{visible:a.toast}]),role:`status`,"aria-live":`polite`},j(a.toast),3)],64))}}).mount(`#app`);