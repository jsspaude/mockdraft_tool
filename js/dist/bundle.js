!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){var r=function(t){"use strict";var e=Object.prototype,n=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",o=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function u(t,e,n,r){var a=e&&e.prototype instanceof f?e:f,o=Object.create(a.prototype),i=new S(r||[]);return o._invoke=function(t,e,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return k()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var u=b(i,n);if(u){if(u===s)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var f=c(t,e,n);if("normal"===f.type){if(r=n.done?"completed":"suspendedYield",f.arg===s)continue;return{value:f.arg,done:n.done}}"throw"===f.type&&(r="completed",n.method="throw",n.arg=f.arg)}}}(t,n,i),o}function c(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var s={};function f(){}function l(){}function p(){}var d={};d[a]=function(){return this};var h=Object.getPrototypeOf,m=h&&h(h(j([])));m&&m!==e&&n.call(m,a)&&(d=m);var y=p.prototype=f.prototype=Object.create(d);function v(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function g(t,e){var r;this._invoke=function(a,o){function i(){return new e((function(r,i){!function r(a,o,i,u){var s=c(t[a],t,o);if("throw"!==s.type){var f=s.arg,l=f.value;return l&&"object"==typeof l&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,i,u)}),(function(t){r("throw",t,i,u)})):e.resolve(l).then((function(t){f.value=t,i(f)}),(function(t){return r("throw",t,i,u)}))}u(s.arg)}(a,o,r,i)}))}return r=r?r.then(i,i):i()}}function b(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return s;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var r=c(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,s;var a=r.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,s):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,s)}function w(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function j(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:k}}function k(){return{value:void 0,done:!0}}return l.prototype=y.constructor=p,p.constructor=l,p[i]=l.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===l||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,i in t||(t[i]="GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},v(g.prototype),g.prototype[o]=function(){return this},t.AsyncIterator=g,t.async=function(e,n,r,a,o){void 0===o&&(o=Promise);var i=new g(u(e,n,r,a),o);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},v(y),y[i]="Generator",y[a]=function(){return this},y.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=j,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var u=n.call(o,"catchLoc"),c=n.call(o,"finallyLoc");if(u&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,s):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),s},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),x(n),s}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;x(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:j(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),s}},t}(t.exports);try{regeneratorRuntime=r}catch(t){Function("r","regeneratorRuntime = r")(r)}},function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r);function o(t){return function(t){if(Array.isArray(t))return i(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var u=[{name:"playerStore",option:{autoIncrement:!0}},{name:"managerStore",option:{autoIncrement:!0}},{name:"settingsStore",option:{autoIncrement:!0}}],c={QB:1,RB:2,WR:2,TE:1,PK:1,DST:1,FLEX:1};function s(t,e){return void 0===t.length?function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}({},t[e],[t]):t.reduce((function(t,n){var r=n[e];return t[r]||(t[r]=[]),t[r].push(n),t}),{})}function f(t,e,n){return new Promise((function(r){var a,o;n%2==0?(a=t-1,0===t?r({curr:t,round:o=n+1}):o=n):(a=t+1)>e-1?r({curr:t,round:o=n+1}):o=n,r({curr:a,round:o})}))}function l(t){return function(t){if(Array.isArray(t))return p(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return p(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function d(t,e,n,r,a,o,i){try{var u=t[o](i),c=u.value}catch(t){return void n(t)}u.done?e(c):Promise.resolve(c).then(r,a)}function h(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){d(o,r,a,i,u,"next",t)}function u(t){d(o,r,a,i,u,"throw",t)}i(void 0)}))}}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(t){var e=document.createElement("input"),n=document.querySelector('[data-js="managerInputContainer"]').appendChild(e);n.setAttribute("placeholder","Manager ".concat(t)),n.setAttribute("data-manager",t),n.setAttribute("data-js","managerInput")}var v=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.optionInput1=document.querySelector('[data-js="numRounds"]'),this.optionInput2=document.querySelector('[data-js="numManagers"]'),this.optionInput3=document.querySelector('[data-js="numAuto"]'),this.positions=c,this.inputContainer=document.querySelector('[data-js="managerInputContainer"]'),this.displayContainer1=document.querySelector('[data-js="playerTable"]'),this.displayContainer2=document.querySelector('[data-js="managerContainer"]'),this.displayContainer3=document.querySelector('[data-js="settingsContainer"]')}var e,n,r,a,i;return e=t,(n=[{key:"bindInputs",value:function(t){var e=this;document.querySelector('[data-js="settingsForm"]').addEventListener("submit",function(){var n=h(regeneratorRuntime.mark((function n(r){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r.preventDefault(),l(Array(parseInt(e.optionInput2.value,10))).forEach((function(t,e){return y(e)})),t([parseInt(e.optionInput1.value,10),parseInt(e.optionInput2.value,10)]);case 3:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())}},{key:"bindAuto",value:function(t){var e=this;document.querySelector('[data-js="autoForm"]').addEventListener("submit",function(){var n=h(regeneratorRuntime.mark((function n(r){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r.preventDefault(),t(parseInt(e.optionInput3.value,10));case 2:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())}},{key:"bindReset",value:function(t){var e=this;document.querySelector('[data-js="resetBtn"]').addEventListener("click",function(){var n=h(regeneratorRuntime.mark((function n(r){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r.preventDefault(),e.inputContainer.innerHTML="",e.displayContainer1.innerHTML="",e.displayContainer2.innerHTML="",e.displayContainer3.innerHTML="",t();case 6:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())}},{key:"bindStart",value:function(t){var e=this;document.querySelector('[data-js="startDraft"]').addEventListener("submit",function(){var n=h(regeneratorRuntime.mark((function n(r){var a,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r.preventDefault(),e.inputText=l(document.querySelectorAll('[data-js="managerInput"]')),a=Array.from(l(e.inputText.map((function(t){return t.value}))),(function(t,e){return t||"Manager ".concat(e)})),o=a.map((function(t,e){var n={};return n.managerNum=e,n.managerName=t,n.players=void 0,n})),t(o);case 5:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())}},{key:"bindDraft",value:function(t){this.displayContainer1.addEventListener("click",function(){var e=h(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),"BUTTON"===n.target.tagName&&t(n.target),n.stopPropagation();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),!1)}},{key:"displayMarkup",value:function(t,e){var n,r="";return"players"===e&&(n=this.displayContainer1,r="\n        <tr data-js='".concat(t.drafted,"'>\n          <td data-name='").concat(t.name,"'>").concat(t.name,"</td>\n          <td>").concat(t.pos,"</td>\n          <td>").concat(t.adp,"</td>\n          <td>").concat(t.team,"</td>\n          <td> \n            <button class='' data-key='").concat(t.primaryKey,"' data-manager='").concat(t.managerNum,"' data-adp='").concat(t.adp,"' data-name='").concat(t.name,"' data-team='").concat(t.team,"' data-pos='").concat(t.pos,"'>DRAFT</button> \n          </td>\n        </tr>"),n.innerHTML+=r),"manager"===e&&(n=this.displayContainer2,r="\n          <article id=".concat(t.managerName.replace(/\s+/g,"")," data-manager=").concat(t.managerNum,">\n            <table data-manager=").concat(t.managerNum,">\n              <th>").concat(t.managerName,"</th>\n            </table>\n          </article>\n        "),n.innerHTML+=r),"settings"===e&&(n=this.displayContainer3,r="\n        <article data-js='settingsList'>\n          <h2>Round ".concat(t.currRound,"</h2>\n          <h3>Now Drafting: Manager ").concat(t.currManager,"</h3>\n        </article>\n        "),n.innerHTML=r),r}},{key:"createTables",value:(i=h(regeneratorRuntime.mark((function t(e){var n=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){var e,r,a=[];(e=n.positions,r=[],Object.entries(e).forEach((function(t){var e="".concat(t[0]," ").repeat(t[1]).split(" ").filter((function(t){return""!==t}));r.push.apply(r,o(e))})),r).forEach((function(t){var e=document.createElement("tr"),n=document.createElement("td");n.innerHTML=t,e.append(n),e.dataset.pos=t,a.push(e)})),t(a)})).then((function(t){var n;return(n=document.querySelector('table[data-manager="'.concat(e.managerNum,'"]'))).append.apply(n,l(t)),document.querySelector('table[data-manager="'.concat(e.managerNum,'"]'))})));case 1:case"end":return t.stop()}}),t)}))),function(t){return i.apply(this,arguments)})},{key:"populateTables",value:function(t,e){var n=this.displayContainer2.querySelector('table[data-manager="'.concat(e,'"]')),r=s(t,"pos");return Object.keys(r).forEach((function(t){n.querySelectorAll('tr[data-pos="'.concat(t,'"]')).forEach((function(e,n){var a=document.createElement("td");void 0!==r[t][n]&&1===e.children.length&&(a.innerHTML=r[t][n].name,e.append(a))}))})),t}},{key:"populateBench",value:(a=h(regeneratorRuntime.mark((function t(e,n){var r,a,o,i,u,c,s,f,l,p,d=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.length){t.next=29;break}if(r=this.displayContainer2.querySelector('table[data-manager="'.concat(n,'"]')),a=r.querySelector('tr[data-pos="FLEX"]'),o=e.findIndex((function(t){return"QB"!==t.pos}),"K","DST"),i=Object.keys(this.positions).map((function(t){return e.filter((function(e,n){return e.pos===t&&n-1>d.positions[t]}))})).flat(),u=e.filter((function(t){return-1!==i.indexOf(t)})),!i.length){t.next=29;break}if(1!==a.children.length){t.next=15;break}(c=document.createElement("td")).innerHTML="".concat(e[o].name,", ").concat(e[o].pos," - ").concat(e[o].team),a.append(c),e.splice(o,1),u&&u.forEach((function(t){var e=document.createElement("tr"),n=document.createElement("td"),a=document.createElement("td");n.innerHTML="BENCH",n.setAttribute("data-js","bench"),a.innerHTML="".concat(t.name,", ").concat(t.pos," - ").concat(t.team),e.append(n),e.append(a),r.append(e)})),t.next=29;break;case 15:return t.next=17,u.splice(o,1);case 17:return t.next=19,e[e.length-1];case 19:s=t.sent,f=document.createElement("tr"),l=document.createElement("td"),p=document.createElement("td"),l.innerHTML="BENCH",l.setAttribute("data-js","bench"),p.innerHTML="".concat(s.name,", ").concat(s.pos," - ").concat(s.team),f.append(l),f.append(p),r.append(f);case 29:case"end":return t.stop()}}),t,this)}))),function(t,e){return a.apply(this,arguments)})}])&&m(e.prototype,n),r&&m(e,r),t}();function g(t){return function(t){if(Array.isArray(t))return b(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return b(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return b(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function w(t,e,n,r,a,o,i){try{var u=t[o](i),c=u.value}catch(t){return void n(t)}u.done?e(c):Promise.resolve(c).then(r,a)}function x(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){w(o,r,a,i,u,"next",t)}function u(t){w(o,r,a,i,u,"throw",t)}i(void 0)}))}}function S(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var j=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.dbName=e,this.dbVersion=n,this.stores=r,this.players=fetch("./js/draft_data.json").then((function(t){return t.json()})).catch((function(t){console.log(t)}))}var e,n,r;return e=t,(n=[{key:"getDB",value:function(){return this.db}},{key:"bindDBChanged",value:function(t){this.DBChanged=t}},{key:"openDB",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};return new Promise((function(n,r){window.indexedDB||e({message:"Unsupported indexedDB"});var a=window.indexedDB.open(t.dbName,t.dbVersion);a.onsuccess=function(){t.db=a.result,n(t.db)},a.onerror=function(t){return r(e(t.target.error))},a.onupgradeneeded=function(n){t.db=n.target.result,t.stores.forEach((function(e){var n=t.db.createObjectStore(e.name,e.option);"playerStore"===e.name&&(n.createIndex("name","name",{unique:!1}),n.createIndex("drafted","drafted",{unique:!1}),n.createIndex("roundDrafted","roundDrafted",{unique:!1})),"managerStore"===e.name&&n.createIndex("managerNum","managerNum",{unique:!0}),"settingsStore"===e.name&&(n.createIndex("rounds","rounds",{unique:!1}),n.createIndex("currRound","currRound",{unique:!1}),n.createIndex("currManager","currManager",{unique:!1}),n.createIndex("numManagers","numManagers",{unique:!1}),n.createIndex("id","id",{unique:!1}))})),t.db.onabort=function(t){return e(t.target.error)},t.db.error=function(t){return e(t.target.error)}}}))}},{key:"getData",value:function(t,e,n){var r=this;return new Promise((function(a,o){if(r.db&&e){var i=r.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).index("".concat(e)).get(n);i.onsuccess=function(){a(i.result)},i.onerror=function(t){o(new Error("error storing ".concat(n," ").concat(t.target.errorCode)))}}}))}},{key:"getKey",value:function(t,e,n){var r=this;return new Promise((function(a,o){var i=r.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).getKey(e);i.onsuccess=function(){a(i.result)},i.onerror=function(t){o(new Error("error storing ".concat(n," ").concat(t.target.errorCode)))}}))}},{key:"getAllData",value:function(t){var e=this;return new Promise((function(n,r){if(e.db){var a=e.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)),o=a.getAll();o.onsuccess=x(regeneratorRuntime.mark((function t(){var e,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.result;case 2:e=t.sent,(r=a.getAllKeys()).onsuccess=function(){var t=r.result,a=e.map((function(e,n){return e.primaryKey=t[n],a}));n(o.result)};case 5:case"end":return t.stop()}}),t)}))),o.onerror=function(){r()}}}))}},{key:"getAllKeys",value:function(t){var e=this;return new Promise((function(n,r){if(e.db){var a=e.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).getAllKeys();a.onsuccess=function(){n(a.result)},a.onerror=function(){r()}}}))}},{key:"getByPrimary",value:function(t,e){var n=this;return new Promise((function(r,a){var o=n.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t));o.openCursor().onsuccess=function(){var t=x(regeneratorRuntime.mark((function t(n){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if((a=n.target.result).primaryKey!==e){t.next=5;break}r(a.value),t.next=7;break;case 5:return t.next=7,a.continue();case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),o.onerror=function(){a()}}))}},{key:"getCursorData",value:function(t,e,n){var r=this;return new Promise((function(a,o){var i=r.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)),u=[];i.openCursor().onsuccess=function(){var t=x(regeneratorRuntime.mark((function t(r){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(o=r.target.result)){t.next=8;break}return void 0!==e&&e.forEach((function(t){var e={};return e[t]=o.value[t],u.push(e),e})),n&&u.push({primaryKey:o.primaryKey}),t.next=6,o.continue();case 6:t.next=9;break;case 8:a(u);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),i.onerror=function(){o()}}))}},{key:"addData",value:function(t,e,n){var r=this;return new Promise((function(a,o){if(r.db){var i=r.db.transaction(["".concat(t)],"readwrite"),u=i.objectStore("".concat(t));e&&e.forEach((function(t){return u.put(t)})),n&&u.put(n),i.oncomplete=a,i.onerror=function(t){o(new Error("error storing ".concat(e," ").concat(t.target.errorCode)))}}}))}},{key:"putData",value:function(t,e,n,r){var a=this;return new Promise((function(o,i){var u=a.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)),c=u.get(parseInt(e,10));c.onerror=function(){i()},c.onsuccess=x(regeneratorRuntime.mark((function a(){var s,f,l,p;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:s=c.result,"settingsStore"!==t?void 0===s[n]?s[n]=r:s[n].length?(f=[].concat(g(s[n]),[r]),s[n]=f):(l=[s[n],r],s[n]=l):s[n]=r,(p=u.put(s,parseInt(e,10))).onerror=function(){i()},p.onsuccess=function(){o(s)};case 5:case"end":return a.stop()}}),a)})))}))}},{key:"storeClear",value:function(t){var e=this,n=function(t){e.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).clear().onsuccess=function(){console.log("".concat(t," cleared"))}};t.forEach(function(){var t=x(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n(e);case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}])&&S(e.prototype,n),r&&S(e,r),t}();function k(t){if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=A(t))){var e=0,n=function(){};return{s:n,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,o=!0,i=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return o=t.done,t},e:function(t){i=!0,a=t},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw a}}}}function E(t){return function(t){if(Array.isArray(t))return O(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||A(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(t,e){if(t){if("string"==typeof t)return O(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?O(t,e):void 0}}function O(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function I(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function D(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?I(Object(n),!0).forEach((function(e){T(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function L(t,e,n,r,a,o,i){try{var u=t[o](i),c=u.value}catch(t){return void n(t)}u.done?e(c):Promise.resolve(c).then(r,a)}function M(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){L(o,r,a,i,u,"next",t)}function u(t){L(o,r,a,i,u,"throw",t)}i(void 0)}))}}function P(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function T(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var R=function(){function t(e,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),T(this,"handleInputs",(function(t){var e={numManagers:t[1],rounds:t[0],currManager:0,currRound:1};r.model.addData("settingsStore",void 0,e)})),T(this,"handleStart",function(){var t=M(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.model.players.then((function(t){r.model.addData("playerStore",t,void 0)}));case 2:return r.model.getAllData("playerStore").then((function(t){t.forEach((function(t){r.view.displayMarkup(t,"players")}))})),t.next=5,r.model.addData("managerStore",e);case 5:return t.next=7,r.model.getAllData("managerStore").then((function(t){t.forEach((function(t){r.view.displayMarkup(t,"manager")})),t.forEach((function(t){r.view.createTables(t)}))}));case 7:return t.next=9,r.model.getAllData("settingsStore").then((function(t){t.forEach((function(t){r.view.displayMarkup(t,"settings")}))}));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),T(this,"handleReset",(function(){r.model.storeClear(["playerStore","managerStore","settingsStore"])})),T(this,"handleDraft",function(){var t=M(a.a.mark((function t(e){var n,o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r.target=e,n=D({},e.dataset),o=parseInt(n.key,10),t.next=5,r.model.getAllData("settingsStore").then(function(){var t=M(a.a.mark((function t(e){var n,i,u,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e[0].primaryKey;case 2:return n=t.sent,t.next=5,e[0];case 5:return i=t.sent,u=i.currManager,t.next=9,r.model.getCursorData("managerStore",void 0,!0);case 9:return c=t.sent,t.next=12,f(u,e[0].numManagers,e[0].currRound).then((function(t){r.model.putData("settingsStore",parseInt(n,10),"currManager",t.curr),r.model.putData("settingsStore",parseInt(n,10),"currRound",t.round),r.model.putData("playerStore",parseInt(o,10),"drafted",!0)}));case 12:return t.next=14,r.model.getByPrimary("playerStore",o).then((function(t){return r.model.putData("managerStore",c[u].primaryKey,"players",t)}));case 14:return t.next=16,r.model.getAllData("settingsStore").then((function(t){return t.forEach((function(t){return r.view.displayMarkup(t,"settings")}))}));case 16:return t.next=18,r.model.getAllData("managerStore").then((function(t){return t.find((function(t){return t.managerNum===u}))})).then((function(t){t.players&&(r.view.populateTables(t.players,t.managerNum),r.view.populateBench(t.players,t.managerNum))}));case 18:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 5:r.target.parentElement.parentElement.style.display="none";case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),T(this,"handleAuto",function(){var t=M(a.a.mark((function t(e){var n,o,i,u,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=document.querySelectorAll("button[data-key]"),o=E(Array(e)).map((function(t,e){return n[e]})),i=k(o),t.prev=3,i.s();case 5:if((u=i.n()).done){t.next=11;break}return c=u.value,t.next=9,r.handleDraft(c);case 9:t.next=5;break;case 11:t.next=16;break;case 13:t.prev=13,t.t0=t.catch(3),i.e(t.t0);case 16:return t.prev=16,i.f(),t.finish(16);case 19:case"end":return t.stop()}}),t,null,[[3,13,16,19]])})));return function(e){return t.apply(this,arguments)}}()),this.model=e,this.view=n,this.view.bindInputs(this.handleInputs),this.view.bindReset(this.handleReset),this.view.bindStart(this.handleStart),this.view.bindDraft(this.handleDraft),this.view.bindAuto(this.handleAuto)}var e,n,r,o;return e=t,(n=[{key:"init",value:(o=M(a.a.mark((function t(){var e=this;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.model.openDB();case 2:return t.next=4,this.model.getAllData("playerStore").then((function(t){t.forEach((function(t){e.view.displayMarkup(t,"players")})),document.querySelectorAll('[data-js="true"').forEach((function(t){var e=t;console.log(e),e.style.display="none"}))}));case 4:return t.next=6,this.model.getAllData("managerStore").then((function(t){t.forEach(function(){var t=M(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.view.displayMarkup(n,"manager");case 2:return t.next=4,e.view.createTables(n);case 4:if(!n.players){t.next=9;break}return t.next=7,e.view.populateTables(n.players,n.managerNum);case 7:return t.next=9,e.view.populateBench(n.players,n.managerNum);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}));case 6:return t.next=8,this.model.getAllData("settingsStore").then((function(t){t.forEach((function(t){e.view.displayMarkup(t,"settings")}))}));case 8:case"end":return t.stop()}}),t,this)}))),function(){return o.apply(this,arguments)})}])&&P(e.prototype,n),r&&P(e,r),t}();window.onload=function(){new R(new j("mock",1,u),new v).init()}}]);
//# sourceMappingURL=bundle.js.map