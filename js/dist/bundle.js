!function(t){var r={};function e(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var a in t)e.d(n,a,function(r){return t[r]}.bind(null,a));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=1)}([function(t,r,e){var n=function(t){"use strict";var r=Object.prototype,e=r.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},a=n.iterator||"@@iterator",o=n.asyncIterator||"@@asyncIterator",c=n.toStringTag||"@@toStringTag";function u(t,r,e,n){var a=r&&r.prototype instanceof f?r:f,o=Object.create(a.prototype),c=new x(n||[]);return o._invoke=function(t,r,e){var n="suspendedStart";return function(a,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw o;return E()}for(e.method=a,e.arg=o;;){var c=e.delegate;if(c){var u=b(c,e);if(u){if(u===s)continue;return u}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===n)throw n="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n="executing";var f=i(t,r,e);if("normal"===f.type){if(n=e.done?"completed":"suspendedYield",f.arg===s)continue;return{value:f.arg,done:e.done}}"throw"===f.type&&(n="completed",e.method="throw",e.arg=f.arg)}}}(t,e,c),o}function i(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var s={};function f(){}function d(){}function l(){}var p={};p[a]=function(){return this};var h=Object.getPrototypeOf,m=h&&h(h(O([])));m&&m!==r&&e.call(m,a)&&(p=m);var v=l.prototype=f.prototype=Object.create(p);function g(t){["next","throw","return"].forEach((function(r){t[r]=function(t){return this._invoke(r,t)}}))}function y(t,r){var n;this._invoke=function(a,o){function c(){return new r((function(n,c){!function n(a,o,c,u){var s=i(t[a],t,o);if("throw"!==s.type){var f=s.arg,d=f.value;return d&&"object"==typeof d&&e.call(d,"__await")?r.resolve(d.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):r.resolve(d).then((function(t){f.value=t,c(f)}),(function(t){return n("throw",t,c,u)}))}u(s.arg)}(a,o,n,c)}))}return n=n?n.then(c,c):c()}}function b(t,r){var e=t.iterator[r.method];if(void 0===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=void 0,b(t,r),"throw"===r.method))return s;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var n=i(e,t.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,s;var a=n.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=void 0),r.delegate=null,s):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,s)}function w(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function j(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function x(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function O(t){if(t){var r=t[a];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function r(){for(;++n<t.length;)if(e.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=void 0,r.done=!0,r};return o.next=o}}return{next:E}}function E(){return{value:void 0,done:!0}}return d.prototype=v.constructor=l,l.constructor=d,l[c]=d.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===d||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,l):(t.__proto__=l,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},g(y.prototype),y.prototype[o]=function(){return this},t.AsyncIterator=y,t.async=function(r,e,n,a,o){void 0===o&&(o=Promise);var c=new y(u(r,e,n,a),o);return t.isGeneratorFunction(e)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},g(v),v[c]="Generator",v[a]=function(){return this},v.toString=function(){return"[object Generator]"},t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=O,x.prototype={constructor:x,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!t)for(var r in this)"t"===r.charAt(0)&&e.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(e,n){return c.type="throw",c.arg=t,r.next=e,n&&(r.method="next",r.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var u=e.call(o,"catchLoc"),i=e.call(o,"finallyLoc");if(u&&i){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!i)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,r){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&e.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=r&&r<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=t,c.arg=r,o?(this.method="next",this.next=o.finallyLoc,s):this.complete(c)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),s},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),j(e),s}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var a=n.arg;j(e)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:O(t),resultName:r,nextLoc:e},"next"===this.method&&(this.arg=void 0),s}},t}(t.exports);try{regeneratorRuntime=n}catch(t){Function("r","regeneratorRuntime = r")(n)}},function(t,r,e){"use strict";e.r(r);var n,a,o=e(0),c=e.n(o),u=["playerStore","managerStore","settingsStore"];function i(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function s(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?i(Object(e),!0).forEach((function(r){f(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):i(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}function f(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function d(t,r,e,n,a,o,c){try{var u=t[o](c),i=u.value}catch(t){return void e(t)}u.done?r(i):Promise.resolve(i).then(n,a)}function l(t){return function(){var r=this,e=arguments;return new Promise((function(n,a){var o=t.apply(r,e);function c(t){d(o,n,a,c,u,"next",t)}function u(t){d(o,n,a,c,u,"throw",t)}c(void 0)}))}}function p(t,r){return new Promise((function(e,o){if(t!==a&&(n=null),a=t,n)e();else{var c=""===t?"db":"db_".concat(t),u=indexedDB.open(c,1);u.onupgradeneeded=function(t){n=t.target.result,r.forEach((function(t){if(n.objectStoreNames.contains("".concat(t)))u.transaction.objectStore("".concat(t));else{var r=n.createObjectStore("".concat(t),{autoIncrement:!0});"playerStore"===t&&(r.createIndex("name","name",{unique:!1}),r.createIndex("drafted","drafted",{unique:!1}),r.createIndex("roundDrafted","roundDrafted",{unique:!1})),"managerStore"===t&&r.createIndex("managerNum","managerNum",{unique:!0}),"settingsStore"===t&&(r.createIndex("rounds","rounds",{unique:!1}),r.createIndex("currRound","currRound",{unique:!1}),r.createIndex("currManager","currManager",{unique:!1}),r.createIndex("numManagers","numManagers",{unique:!1}),r.createIndex("id","id",{unique:!1}))}}))},u.onsuccess=function(t){n=t.target.result,e(n)},u.onerror=function(t){o(new Error("err".concat(t.target.errorCode)))}}}))}function h(t,r,e){return m.apply(this,arguments)}function m(){return(m=l(regeneratorRuntime.mark((function t(r,e,a){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,o){var c=n.transaction(["".concat(r)],"readwrite").objectStore("".concat(r)).index("".concat(e)).get("".concat(a));c.onsuccess=function(){t(c.result)},c.onerror=function(t){o(new Error("error storing ".concat(a," ").concat(t.target.errorCode)))}})));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function v(t,r){return new Promise((function(e,a){var o=n.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)),c=[];o.openCursor().onsuccess=function(){var t=l(regeneratorRuntime.mark((function t(n){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(a=n.target.result)){t.next=7;break}return r.forEach((function(t,e){var n={};return n[r[e]]=a.value[t],c.push(n),n})),t.next=5,a.continue();case 5:t.next=9;break;case 7:console.log("All Managers Displayed"),e(c);case 9:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}(),o.onerror=function(r){a(console.error("error with cursor ".concat(t," ").concat(r.target.errorCode)))}}))}function g(t,r){return y.apply(this,arguments)}function y(){return(y=l(regeneratorRuntime.mark((function t(r,e){var n,a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e,a=[],t.next=4,v(r,n).then((function(t){t.forEach((function(r,e){return(e-1)%n.length&&n.forEach((function(o,c){console.log(c);var u=s({},r,{},t[e+c]);return c===n.length-1?a.push(u):u})),a}))}));case 4:return t.abrupt("return",a);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function b(t,r,e){return new Promise((function(a,o){var c=n.transaction(["".concat(t)],"readwrite"),u=c.objectStore("".concat(t));r&&r.forEach((function(t){return u.put(t)})),e&&u.put(e),c.oncomplete=a,c.onerror=function(t){o(new Error("error storing ".concat(r," ").concat(t.target.errorCode)))}}))}function w(){return j.apply(this,arguments)}function j(){return(j=l(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("./js/draft_data.json").then((function(t){return t.json()}));case 2:return r=t.sent,t.next=5,b("playerStore",r);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function x(t,r,e,n,a,o,c){try{var u=t[o](c),i=u.value}catch(t){return void e(t)}u.done?r(i):Promise.resolve(i).then(n,a)}function O(t){return function(){var r=this,e=arguments;return new Promise((function(n,a){var o=t.apply(r,e);function c(t){x(o,n,a,c,u,"next",t)}function u(t){x(o,n,a,c,u,"throw",t)}c(void 0)}))}}function E(t,r,e){e.innerHTML+=r(t)}function S(t){return"\n  <article data-manager=".concat(t.managerNum,">\n    <table data-manager=").concat(t.managerNum,">\n      <th>").concat(t.managerName,"</th>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='qb' data-js='drafted'>QB</td>\n        <td value='qb' data-js='drafted'></td>\n      </tr>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='rb' data-js='drafted'>RB</td>\n        <td value='rb' data-js='drafted'></td>\n      </tr>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='rb' data-js='drafted'>RB</td>\n        <td value='rb' data-js='drafted'></td>\n      </tr>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='wr' data-js='drafted'>WR</td>\n        <td value='wr' data-js='drafted'></td>\n      </tr>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='wr' data-js='drafted'>WR</td>\n        <td value='wr' data-js='drafted'></td>\n      </tr>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='te' data-js='drafted'>TE</td>\n        <td value='te' data-js='drafted'></td>\n      </tr>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='k' data-js='drafted'>K</td>\n        <td value='k' data-js='drafted'></td>\n      </tr>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='dst'>D/ST</td>\n        <td value='dst' data-js='drafted'></td>\n      </tr>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='bench'>BENCH</td>\n        <td value='bench' data-js='drafted'></td>\n      </tr>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='bench'>BENCH</td>\n        <td value='bench' data-js='drafted'></td>\n      </tr>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='bench'>BENCH</td>\n        <td value='bench' data-js='drafted'></td>\n      </tr>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='bench'>BENCH</td>\n        <td value='bench' data-js='drafted'></td>\n      </tr>\n      <tr data-manager=").concat(t.managerNum,">\n        <td value='bench'>BENCH</td>\n        <td value='bench' data-js='drafted'></td>\n      </tr>\n    </table>\n  </article>")}function P(){return N.apply(this,arguments)}function N(){return(N=O(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g("managerStore",["managerNum","managerName"]).then((function(t){t.forEach((function(r,e){E(t[e],S,document.querySelector('[data-js="managerContainer"]'))}))}));case 2:return t.next=4,g("playerStore",["manager","adp","name","pos","team"]).then((function(t){console.log(t)}));case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function L(t){return function(t){if(Array.isArray(t))return k(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,r){if(!t)return;if("string"==typeof t)return k(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return k(t,r)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function k(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function _(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function R(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?_(Object(e),!0).forEach((function(r){I(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):_(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}function I(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function q(t,r,e,n,a,o,c){try{var u=t[o](c),i=u.value}catch(t){return void e(t)}u.done?r(i):Promise.resolve(i).then(n,a)}function C(t){return function(){var r=this,e=arguments;return new Promise((function(n,a){var o=t.apply(r,e);function c(t){q(o,n,a,c,u,"next",t)}function u(t){q(o,n,a,c,u,"throw",t)}c(void 0)}))}}var A,D=document.querySelector('[data-js="settingsForm"]'),M=document.querySelector('[data-js="resetBtn"'),T=document.querySelector('[data-js="startDraft"'),B=[],G=function(){var t=[parseInt(document.querySelector('[data-js="numManagers"]').value,10),parseInt(document.querySelector('[data-js="numRounds"]').value,10)];return{managerCount:t[0],rounds:t[1]}};function F(){return new Promise((function(t){var r=G().managerCount,e=Array.from(Array(r)).map((function(t,r){return r})),n=[];e.forEach((function(t,r){var e=document.createElement("input"),a=document.querySelector('[data-js="managerInputContainer"]').appendChild(e);a.setAttribute("placeholder","Manager ".concat(r)),a.setAttribute("data-manager",r),a.setAttribute("data-js","managerInput"),n.push(e)})),t(n)}))}function H(){return W.apply(this,arguments)}function W(){return(W=C(c.a.mark((function t(){var r,e;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,G();case 2:return r=t.sent,t.next=5,F();case 5:return e=t.sent,t.next=8,b("settingsStore","",R({},r,{id:"tracker",currManager:0,currRound:0}));case 8:return t.next=10,h("settingsStore","id","tracker");case 10:return t.abrupt("return",[e,r]);case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Y(){return K.apply(this,arguments)}function K(){return(K=C(c.a.mark((function t(){var r,e,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=L(document.querySelectorAll('[data-js="managerInput"]')),e=Array.from(L(r.map((function(t){return t.value}))),(function(t,r){return t||"Manager ".concat(r)})),n=e.map((function(t,r){var e={};return e.managerNum=r,e.managerName=t,e})),t.next=5,b("managerStore",n);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}window.onload=C(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p("mockDraft",u).then((function(t){A=t}));case 2:case"end":return t.stop()}}),t)}))),D.addEventListener("submit",function(){var t=C(c.a.mark((function t(r){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r.preventDefault(),t.next=3,H(A).then((function(t){B=t}));case 3:return t.next=5,w();case 5:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}()),M.addEventListener("click",(function(){!function(t){var r=function(t){var r=n.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).clear();r.onsuccess=function(){console.log("".concat(t," cleared"))},r.onerror=function(t){console.error(new Error("error clearing store ".concat(t.target.errorCode)))}};t.forEach(function(){var t=l(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r(e);case 2:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())}(u),D.reset(),B[0].forEach((function(t){t.parentNode.removeChild(t)}))})),T.addEventListener("submit",function(){var t=C(c.a.mark((function t(r){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r.preventDefault(),t.next=3,Y(A);case 3:P();case 4:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())}]);
//# sourceMappingURL=bundle.js.map