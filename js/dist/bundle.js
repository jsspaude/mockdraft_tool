!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){var r=function(t){"use strict";var e=Object.prototype,n=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",o=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function c(t,e,n,r){var a=e&&e.prototype instanceof f?e:f,o=Object.create(a.prototype),i=new x(r||[]);return o._invoke=function(t,e,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return k()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var c=b(i,n);if(c){if(c===s)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var f=u(t,e,n);if("normal"===f.type){if(r=n.done?"completed":"suspendedYield",f.arg===s)continue;return{value:f.arg,done:n.done}}"throw"===f.type&&(r="completed",n.method="throw",n.arg=f.arg)}}}(t,n,i),o}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var s={};function f(){}function l(){}function d(){}var p={};p[a]=function(){return this};var h=Object.getPrototypeOf,m=h&&h(h(j([])));m&&m!==e&&n.call(m,a)&&(p=m);var v=d.prototype=f.prototype=Object.create(p);function y(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function g(t,e){var r;this._invoke=function(a,o){function i(){return new e((function(r,i){!function r(a,o,i,c){var s=u(t[a],t,o);if("throw"!==s.type){var f=s.arg,l=f.value;return l&&"object"==typeof l&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(l).then((function(t){f.value=t,i(f)}),(function(t){return r("throw",t,i,c)}))}c(s.arg)}(a,o,r,i)}))}return r=r?r.then(i,i):i()}}function b(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return s;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var r=u(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,s;var a=r.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,s):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,s)}function w(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function x(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function j(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:k}}function k(){return{value:void 0,done:!0}}return l.prototype=v.constructor=d,d.constructor=l,d[i]=l.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===l||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,i in t||(t[i]="GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},y(g.prototype),g.prototype[o]=function(){return this},t.AsyncIterator=g,t.async=function(e,n,r,a,o){void 0===o&&(o=Promise);var i=new g(c(e,n,r,a),o);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},y(v),v[i]="Generator",v[a]=function(){return this},v.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=j,x.prototype={constructor:x,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),u=n.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,s):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),s},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),S(n),s}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;S(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:j(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),s}},t}(t.exports);try{regeneratorRuntime=r}catch(t){Function("r","regeneratorRuntime = r")(r)}},function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r);var o="./js/draft_data.json",i=[{name:"playerStore",option:{autoIncrement:!0}},{name:"managerStore",option:{autoIncrement:!0}},{name:"settingsStore",option:{autoIncrement:!0}}];function c(t){return null!=t&&"function"==typeof t[Symbol.iterator]}function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t){return function(t){if(Array.isArray(t))return d(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return d(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function p(t,e,n,r,a,o,i){try{var c=t[o](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,a)}function h(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){p(o,r,a,i,c,"next",t)}function c(t){p(o,r,a,i,c,"throw",t)}i(void 0)}))}}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function v(t,e,n){return void 0===t.players||void 0===t.players[e]||void 0===this.data.players[e][n]?"":this.data.players[e][n].name}function y(t){var e=document.createElement("input"),n=document.querySelector('[data-js="managerInputContainer"]').appendChild(e);n.setAttribute("placeholder","Manager ".concat(t)),n.setAttribute("data-manager",t),n.setAttribute("data-js","managerInput")}var g=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.intInput=document.querySelector('[data-js="numRounds"]'),this.optionInput=parseInt(document.querySelector('[data-js="numManagers"]').value,10),this.inputContainer=document.querySelector('[data-js="managerInputContainer"]'),this.displayContainer1=document.querySelector('[data-js="playerTable"]'),this.displayContainer2=document.querySelector('[data-js="managerContainer"]'),this.displayContainer3=document.querySelector('[data-js="settingsContainer"]')}var e,n,r;return e=t,(n=[{key:"bindInputs",value:function(t){var e=this;document.querySelector('[data-js="settingsForm"]').addEventListener("submit",function(){var n=h(regeneratorRuntime.mark((function n(r){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r.preventDefault(),l(Array(e.optionInput)).forEach((function(t,e){return y(e)})),t([parseInt(e.intInput.value,10),e.optionInput]);case 3:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())}},{key:"bindReset",value:function(t){var e=this;document.querySelector('[data-js="resetBtn"]').addEventListener("click",function(){var n=h(regeneratorRuntime.mark((function n(r){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r.preventDefault(),e.inputContainer.innerHTML="",e.displayContainer1.innerHTML="",e.displayContainer2.innerHTML="",e.displayContainer3.innerHTML="",t();case 6:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())}},{key:"bindStart",value:function(t){var e=this;document.querySelector('[data-js="startDraft"]').addEventListener("submit",function(){var n=h(regeneratorRuntime.mark((function n(r){var a,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r.preventDefault(),e.inputText=l(document.querySelectorAll('[data-js="managerInput"]')),a=Array.from(l(e.inputText.map((function(t){return t.value}))),(function(t,e){return t||"Manager ".concat(e)})),o=a.map((function(t,e){var n={};return n.managerNum=e,n.managerName=t,n.players=void 0,n})),t(o);case 5:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())}},{key:"bindDraft",value:function(t){this.displayContainer1.addEventListener("click",function(){var e=h(regeneratorRuntime.mark((function e(n){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),"BUTTON"===n.target.tagName&&(r=n.target.dataset,t(s({},r))),n.stopPropagation();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),!1)}},{key:"displayMarkup",value:function(t,e,n,r){var a=n,o="";if("manager"===e){var i=function(t){if(void 0===t.players)return"";var e=[];return Object.entries({QB:1,RB:2,WR:2,TE:1,K:1,DST:1,FLEX:1}).forEach((function(n){void 0!==t.players["".concat(n[0])]&&t.players["".concat(n[0])].forEach((function(t,r){r+1>n[1]&&e.push(t)}))})),e}(t),c="";void 0===i||0===i.length?c="":i.forEach((function(t){c+="<li>".concat(t.name,"</li>")})),o="\n          <article id=".concat(t.managerName.replace(/\s+/g,"")," data-manager=").concat(t.managerNum,">\n            <table data-manager=").concat(t.managerNum,">\n              <th>").concat(t.managerName,"</th>\n              <tr>\n                <td>QB</td>\n                <td data-manager=").concat(t.managerNum,">").concat(v(t,"QB",0),"</td>\n              </tr>\n              <tr>\n                <td>RB</td>\n                <td data-manager=").concat(t.managerNum,">").concat(v(t,"RB",0),"</td>\n              </tr>\n              <tr>\n                <td>RB</td>\n                <td data-manager=").concat(t.managerNum,">").concat(v(t,"RB",1),"</td>\n              </tr>\n              <tr>\n                <td>WR</td>\n                <td data-manager=").concat(t.managerNum,">").concat(v(t,"WR",0),"</td>\n              </tr>\n              <tr>\n                <td>WR</td>\n                <td data-manager=").concat(t.managerNum,">").concat(v(t,"WR",1),"</td>\n              </tr>\n              <tr>\n                <td>TE</td>\n                <td data-manager=").concat(t.managerNum,">").concat(v(t,"TE",0),"</td>\n              </tr>\n              <tr>\n                <td>K</td>\n                <td data-manager=").concat(t.managerNum,">").concat(v(t,"K",0),"</td>\n              </tr>\n              <tr>\n                <td>D/ST</td>\n                <td data-manager=").concat(t.managerNum).concat(v(t,"DST",0),"></td>\n              </tr>\n              <tr>\n                <td>BENCH</td>\n                <td data-manager=").concat(t.managerNum,">\n                  <ul>\n                    ").concat(c,"\n                  </ul>\n                </td>\n              </tr>\n            </table>\n          </article>\n        ")}return"players"===e&&(o="\n        <tr>\n          <td data-name='".concat(t.name,"'>").concat(t.name,"</td>\n          <td>").concat(t.pos,"</td>\n          <td>").concat(t.adp,"</td>\n          <td>").concat(t.team,"</td>\n          <td> \n            <button data-key='").concat(t.primaryKey,"' data-manager='").concat(t.managerNum,"' data-adp='").concat(t.adp,"' data-name='").concat(t.name,"' data-team='").concat(t.team,"' data-pos='").concat(t.pos,"'>DRAFT</button> \n          </td>\n        </tr>")),"settings"===e&&(o="\n        <article data-js='settingsList'>\n          <h2>Round ".concat(t.currRound,"</h2>\n          <h3>Now Drafting: Manager ").concat(t.currManager,"</h3>\n        </article>\n        ")),r&&(a.innerHTML+=o),o}}])&&m(e.prototype,n),r&&m(e,r),t}();function b(t){return function(t){if(Array.isArray(t))return w(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return w(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return w(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function S(t,e,n,r,a,o,i){try{var c=t[o](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,a)}function x(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){S(o,r,a,i,c,"next",t)}function c(t){S(o,r,a,i,c,"throw",t)}i(void 0)}))}}function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var k=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.dbName=e,this.dbVersion=n,this.stores=r,this.players=fetch(o).then((function(t){return t.json()})).catch((function(t){console.log(t)}))}var e,n,r;return e=t,(n=[{key:"getDB",value:function(){return this.db}},{key:"bindDBChanged",value:function(t){this.DBChanged=t}},{key:"openDB",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};return new Promise((function(n,r){window.indexedDB||e({message:"Unsupported indexedDB"});var a=window.indexedDB.open(t.dbName,t.dbVersion);a.onsuccess=function(){t.db=a.result,n(t.db)},a.onerror=function(t){return r(e(t.target.error))},a.onupgradeneeded=function(n){t.db=n.target.result,t.stores.forEach((function(e){var n=t.db.createObjectStore(e.name,e.option);"playerStore"===e.name&&(n.createIndex("name","name",{unique:!1}),n.createIndex("drafted","drafted",{unique:!1}),n.createIndex("roundDrafted","roundDrafted",{unique:!1})),"managerStore"===e.name&&n.createIndex("managerNum","managerNum",{unique:!0}),"settingsStore"===e.name&&(n.createIndex("rounds","rounds",{unique:!1}),n.createIndex("currRound","currRound",{unique:!1}),n.createIndex("currManager","currManager",{unique:!1}),n.createIndex("numManagers","numManagers",{unique:!1}),n.createIndex("id","id",{unique:!1}))})),t.db.onabort=function(t){return e(t.target.error)},t.db.error=function(t){return e(t.target.error)}}}))}},{key:"testGet",value:function(t,e,n){var r=this;return new Promise((function(a,o){if(r.db&&e){var i=r.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).index("".concat(e)).getAll(n);i.onsuccess=function(){a(i.result)},i.onerror=function(t){o(new Error("error storing ".concat(n," ").concat(t.target.errorCode)))}}}))}},{key:"getData",value:function(t,e,n){var r=this;return new Promise((function(a,o){if(r.db&&e){var i=r.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).index("".concat(e)).get(n);i.onsuccess=function(){a(i.result)},i.onerror=function(t){o(new Error("error storing ".concat(n," ").concat(t.target.errorCode)))}}}))}},{key:"getAllData",value:function(t){var e=this;return new Promise((function(n,r){if(e.db){var a=e.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)),o=a.getAll();o.onsuccess=x(regeneratorRuntime.mark((function t(){var e,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.result;case 2:e=t.sent,(r=a.getAllKeys()).onsuccess=function(){var t=r.result,a=e.map((function(e,n){return e.primaryKey=t[n],a}));n(o.result)};case 5:case"end":return t.stop()}}),t)}))),o.onerror=function(){r()}}}))}},{key:"getAllKeys",value:function(t){var e=this;return new Promise((function(n,r){if(e.db){var a=e.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).getAllKeys();a.onsuccess=function(){n(a.result)},a.onerror=function(){r()}}}))}},{key:"getCursorData",value:function(t,e,n){var r=this;return new Promise((function(a,o){var i=r.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)),c=[];i.openCursor().onsuccess=function(){var t=x(regeneratorRuntime.mark((function t(r){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(o=r.target.result)){t.next=8;break}return void 0!==e&&e.forEach((function(t){var e={};return e[t]=o.value[t],c.push(e),e})),n&&c.push({primaryKey:o.primaryKey}),t.next=6,o.continue();case 6:t.next=9;break;case 8:a(c);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),i.onerror=function(){o()}}))}},{key:"addData",value:function(t,e,n){var r=this;return new Promise((function(a,o){if(r.db){var i=r.db.transaction(["".concat(t)],"readwrite"),c=i.objectStore("".concat(t));e&&e.forEach((function(t){return c.put(t)})),n&&c.put(n),i.oncomplete=a,i.onerror=function(t){o(new Error("error storing ".concat(e," ").concat(t.target.errorCode)))}}}))}},{key:"testPut",value:function(t,e){var n=this;return new Promise((function(r,a){var o=n.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).get(e);o.onerror=function(){a()},o.onsuccess=x(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=o.result,console.log(e);case 2:case"end":return t.stop()}}),t)})))}))}},{key:"putData",value:function(t,e,n,r){var a=this;return new Promise((function(o,i){var u=a.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)),s=u.get(parseInt(e,10));s.onerror=function(){i()},s.onsuccess=x(regeneratorRuntime.mark((function a(){var f,l,d,p;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:f=s.result,console.log(f),"settingsStore"!==t?void 0===f[n]?f[n]=r:c(f[n])?(l=[].concat(b(f[n]),[r]),f[n]=l):(d=[f[n],r],f[n]=d):f[n]=r,(p=u.put(f,parseInt(e,10))).onerror=function(){i()},p.onsuccess=function(){o(f)};case 6:case"end":return a.stop()}}),a)})))}))}},{key:"storeClear",value:function(t){var e=this,n=function(t){var n=e.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).clear();n.onsuccess=function(){console.log("".concat(t," cleared"))},n.onerror=function(t){console.error(new Error("error clearing store ".concat(t.target.errorCode)))}};t.forEach(function(){var t=x(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n(e);case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}])&&j(e.prototype,n),r&&j(e,r),t}();function E(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function O(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function D(t,e,n,r,a,o,i){try{var c=t[o](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,a)}function R(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){D(o,r,a,i,c,"next",t)}function c(t){D(o,r,a,i,c,"throw",t)}i(void 0)}))}}var I=function(){function t(e,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),O(this,"handleInputs",(function(t){var e={numManagers:t[0],rounds:t[1],currManager:0,currRound:0};r.model.addData("settingsStore",void 0,e)})),O(this,"handleStart",function(){var t=R(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.model.players.then((function(t){r.model.addData("playerStore",t,void 0)}));case 2:return r.model.getAllData("playerStore").then((function(t){t.forEach((function(t){r.view.displayMarkup(t,"players",document.querySelector('[data-js="playerTable"]'),!0)}))})),t.next=5,r.model.addData("managerStore",e);case 5:return t.next=7,r.model.getAllData("managerStore").then((function(t){t.forEach((function(t){r.view.displayMarkup(t,"manager",document.querySelector('[data-js="managerContainer"]'),!0)}))}));case 7:return t.next=9,r.model.getAllData("settingsStore").then((function(t){t.forEach((function(t){r.view.displayMarkup(t,"settings",document.querySelector('[data-js="settingsContainer"]'),!0)}))}));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),O(this,"handleReset",(function(){r.model.storeClear(["playerStore","managerStore","settingsStore"])})),O(this,"handleDraft",function(){var t=R(a.a.mark((function t(e){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(e),t.next=3,e.key;case 3:return n=t.sent,t.next=6,r.model.getAllData("settingsStore").then(function(){var t=R(a.a.mark((function t(e){var o,i,c,u;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e[0].primaryKey;case 2:return o=t.sent,t.next=5,e[0];case 5:return i=t.sent,c=i.currManager,document.querySelector('article[data-manager="'.concat(c,'"]')),t.next=10,r.model.getCursorData("managerStore",void 0,!0);case 10:return u=t.sent,r.model.putData("playerStore",parseInt(n,10),"manager",c),t.next=14,r.model.putData("settingsStore",parseInt(o,10),"currManager",c+1);case 14:r.model.putData("managerStore",u[c].primaryKey,"players","test").then((function(t){}));case 15:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),this.model=e,this.view=n,this.view.bindInputs(this.handleInputs),this.view.bindReset(this.handleReset),this.view.bindStart(this.handleStart),this.view.bindDraft(this.handleDraft)}var e,n,r,o;return e=t,(n=[{key:"init",value:(o=R(a.a.mark((function t(){var e=this;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.model.openDB();case 2:return t.next=4,this.model.getAllData("playerStore").then((function(t){t.forEach((function(t){e.view.displayMarkup(t,"players",document.querySelector('[data-js="playerTable"]'),!0)}))}));case 4:return t.next=6,this.model.getAllData("managerStore").then((function(t){t.forEach((function(t){e.view.displayMarkup(t,"manager",document.querySelector('[data-js="managerContainer"]'),!0)}))}));case 6:return t.next=8,this.model.getAllData("settingsStore").then((function(t){t.forEach((function(t){e.view.displayMarkup(t,"settings",document.querySelector('[data-js="settingsContainer"]'),!0)}))}));case 8:case"end":return t.stop()}}),t,this)}))),function(){return o.apply(this,arguments)})}])&&E(e.prototype,n),r&&E(e,r),t}();window.onload=function(){new I(new k("mock",1,i),new g).init()}}]);
//# sourceMappingURL=bundle.js.map