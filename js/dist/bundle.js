!function(t){var r={};function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)e.d(n,o,function(r){return t[r]}.bind(null,o));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=1)}([function(t,r,e){var n=function(t){"use strict";var r=Object.prototype,e=r.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",a=n.asyncIterator||"@@asyncIterator",i=n.toStringTag||"@@toStringTag";function c(t,r,e,n){var o=r&&r.prototype instanceof f?r:f,a=Object.create(o.prototype),i=new j(n||[]);return a._invoke=function(t,r,e){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return O()}for(e.method=o,e.arg=a;;){var i=e.delegate;if(i){var c=w(i,e);if(c){if(c===s)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===n)throw n="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n="executing";var f=u(t,r,e);if("normal"===f.type){if(n=e.done?"completed":"suspendedYield",f.arg===s)continue;return{value:f.arg,done:e.done}}"throw"===f.type&&(n="completed",e.method="throw",e.arg=f.arg)}}}(t,e,i),a}function u(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var s={};function f(){}function l(){}function p(){}var d={};d[o]=function(){return this};var h=Object.getPrototypeOf,v=h&&h(h(S([])));v&&v!==r&&e.call(v,o)&&(d=v);var y=p.prototype=f.prototype=Object.create(d);function m(t){["next","throw","return"].forEach((function(r){t[r]=function(t){return this._invoke(r,t)}}))}function g(t,r){var n;this._invoke=function(o,a){function i(){return new r((function(n,i){!function n(o,a,i,c){var s=u(t[o],t,a);if("throw"!==s.type){var f=s.arg,l=f.value;return l&&"object"==typeof l&&e.call(l,"__await")?r.resolve(l.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):r.resolve(l).then((function(t){f.value=t,i(f)}),(function(t){return n("throw",t,i,c)}))}c(s.arg)}(o,a,n,i)}))}return n=n?n.then(i,i):i()}}function w(t,r){var e=t.iterator[r.method];if(void 0===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=void 0,w(t,r),"throw"===r.method))return s;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var n=u(e,t.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,s;var o=n.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=void 0),r.delegate=null,s):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,s)}function b(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function x(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(b,this),this.reset(!0)}function S(t){if(t){var r=t[o];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function r(){for(;++n<t.length;)if(e.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=void 0,r.done=!0,r};return a.next=a}}return{next:O}}function O(){return{value:void 0,done:!0}}return l.prototype=y.constructor=p,p.constructor=l,p[i]=l.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===l||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,i in t||(t[i]="GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},m(g.prototype),g.prototype[a]=function(){return this},t.AsyncIterator=g,t.async=function(r,e,n,o,a){void 0===a&&(a=Promise);var i=new g(c(r,e,n,o),a);return t.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},m(y),y[i]="Generator",y[o]=function(){return this},y.toString=function(){return"[object Generator]"},t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=S,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var r in this)"t"===r.charAt(0)&&e.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(e,n){return i.type="throw",i.arg=t,r.next=e,n&&(r.method="next",r.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=e.call(a,"catchLoc"),u=e.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&e.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=r&&r<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=r,a?(this.method="next",this.next=a.finallyLoc,s):this.complete(i)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),s},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),x(e),s}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;x(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:S(t),resultName:r,nextLoc:e},"next"===this.method&&(this.arg=void 0),s}},t}(t.exports);try{regeneratorRuntime=n}catch(t){Function("r","regeneratorRuntime = r")(n)}},function(t,r,e){"use strict";e.r(r);var n,o,a=e(0),i=e.n(a),c=["playerStore","managerStore","settingsStore"];function u(t,r,e,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}function s(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var a=t.apply(r,e);function i(t){u(a,n,o,i,c,"next",t)}function c(t){u(a,n,o,i,c,"throw",t)}i(void 0)}))}}function f(t,r){return new Promise((function(e,a){if(t!==o&&(n=null),o=t,n)e();else{var i=""==t?"db":"db_"+t,c=indexedDB.open(i,1);c.onupgradeneeded=function(t){n=t.target.result,r.forEach((function(t){if(n.objectStoreNames.contains("".concat(t)))c.transaction.objectStore("".concat(t));else{var r=n.createObjectStore("".concat(t),{autoIncrement:!0});"playerStore"===t&&(r.createIndex("name","name",{unique:!1}),r.createIndex("drafted","drafted",{unique:!1}),r.createIndex("roundDrafted","roundDrafted",{unique:!1})),"managerStore"===t&&r.createIndex("managerNum","managerNum",{unique:!0}),"settingsStore"===t&&(r.createIndex("rounds","rounds",{unique:!1}),r.createIndex("currRound","currRound",{unique:!1}),r.createIndex("currManager","currManager",{unique:!1}),r.createIndex("numManagers","numManagers",{unique:!1}),r.createIndex("id","id",{unique:!1}))}}))},c.onsuccess=function(t){n=t.target.result,e(n)},c.onerror=function(t){a(new Error("err".concat(t.target.errorCode)))}}}))}function l(){return p.apply(this,arguments)}function p(){return(p=s(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("./js/draft_data.json");case 2:return r=t.sent,t.abrupt("return",r.json());case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function d(t,r,e){return h.apply(this,arguments)}function h(){return(h=s(regeneratorRuntime.mark((function t(r,e,o){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,a){var i=n.transaction(["".concat(r)],"readwrite").objectStore("".concat(r)).index("".concat(e)).get("".concat(o));i.onsuccess=function(){console.log("".concat(o," retrieved")),t(i.result)},i.onerror=function(t){a(new Error("error storing ".concat(o," ").concat(t.target.errorCode)))}})));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function v(t,r,e){return new Promise((function(o,a){var i=n.transaction(["".concat(t)],"readwrite"),c=i.objectStore("".concat(t));r&&r.forEach((function(t){return c.put(t)})),e&&c.put(e),i.oncomplete=o,i.onerror=function(t){a(new Error("error storing ".concat(r," ").concat(t.target.errorCode)))}}))}function y(){return m.apply(this,arguments)}function m(){return(m=s(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l();case 2:return r=t.sent,t.next=5,v("playerStore",r);case 5:t.sent;case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function g(t,r,e,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}var w=function(t,r,e,n){var o=t.transaction(["".concat(r)],"readwrite").objectStore("".concat(r)),a=n;o.openCursor().onsuccess=function(){var t,r=(t=regeneratorRuntime.mark((function t(r){var n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(n=r.target.result)?(o=e,a.innerHTML=o,n.continue()):console.log("All Managers Displayed");case 2:case"end":return t.stop()}}),t)})),function(){var r=this,e=arguments;return new Promise((function(n,o){var a=t.apply(r,e);function i(t){g(a,n,o,i,c,"next",t)}function c(t){g(a,n,o,i,c,"throw",t)}i(void 0)}))});return function(t){return r.apply(this,arguments)}}()};function b(t){return function(t){if(Array.isArray(t))return x(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,r){if(!t)return;if("string"==typeof t)return x(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return x(t,r)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function j(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function S(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?j(Object(e),!0).forEach((function(r){O(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):j(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}function O(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function E(t,r,e,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}function L(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var a=t.apply(r,e);function i(t){E(a,n,o,i,c,"next",t)}function c(t){E(a,n,o,i,c,"throw",t)}i(void 0)}))}}var P=function(){var t=[parseInt(document.querySelector('[data-js="numManagers"]').value,10),parseInt(document.querySelector('[data-js="numRounds"]').value,10)];return{managerCount:t[0],rounds:t[1]}};function k(){return new Promise((function(t){var r=P().managerCount,e=Array.from(Array(r)).map((function(t,r){return r})),n=[];e.forEach((function(t,r){var e=document.createElement("input"),o=document.querySelector('[data-js="managerInputContainer"]').appendChild(e);o.setAttribute("placeholder","Manager ".concat(r)),o.setAttribute("data-manager",r),o.setAttribute("data-js","managerInput"),n.push(e)})),t(n)}))}function _(){return I.apply(this,arguments)}function I(){return(I=L(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,P();case 2:return r=t.sent,t.next=5,k();case 5:return t.next=7,v("settingsStore","",S({},r,{id:"tracker",currManager:0,currRound:0}));case 7:return t.next=9,d("settingsStore","id","tracker");case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function R(t){return q.apply(this,arguments)}function q(){return(q=L(regeneratorRuntime.mark((function t(r){var e,n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=b(document.querySelectorAll('[data-js="managerInput"]')),n=b(e.map((function(t){return t.value}))),o=Array.from(n,(function(t,r){return t||"Manager ".concat(r)})),t.next=5,v("managerStore",o);case 5:return t.next=7,w(r,"managerStore",document.querySelector('[data-js="managerContainer"]'));case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function A(t,r,e,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}function M(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var a=t.apply(r,e);function i(t){A(a,n,o,i,c,"next",t)}function c(t){A(a,n,o,i,c,"throw",t)}i(void 0)}))}}var C,D=document.querySelector('[data-js="settingsForm"]'),N=document.querySelector('[data-js="resetBtn"'),T=document.querySelector('[data-js="startDraft"'),G=[];window.onload=M(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f("mockDraft",c).then((function(t){C=t}));case 2:case"end":return t.stop()}}),t)}))),D.addEventListener("submit",function(){var t=M(i.a.mark((function t(r){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r.preventDefault(),t.next=3,_(C).then((function(t){G=t}));case 3:return t.next=5,y();case 5:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}()),N.addEventListener("click",(function(){!function(t){var r=function(t){var r=n.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).clear();r.onsuccess=function(){console.log("".concat(t," cleared"))},r.onerror=function(t){console.error(new Error("error clearing store ".concat(t.target.errorCode)))}};t.forEach(function(){var t=s(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r(e);case 2:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())}(c),D.reset(),G[0].forEach((function(t){t.parentNode.removeChild(t)}))})),T.addEventListener("submit",function(){var t=M(i.a.mark((function t(r){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.preventDefault(),R(C);case 2:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())}]);
//# sourceMappingURL=bundle.js.map