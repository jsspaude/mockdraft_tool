!function(t){var n={};function e(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)e.d(r,a,function(n){return t[n]}.bind(null,a));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=1)}([function(t,n,e){var r=function(t){"use strict";var n=Object.prototype,e=n.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",o=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function c(t,n,e,r){var a=n&&n.prototype instanceof f?n:f,o=Object.create(a.prototype),i=new x(r||[]);return o._invoke=function(t,n,e){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return E()}for(e.method=a,e.arg=o;;){var i=e.delegate;if(i){var c=b(i,e);if(c){if(c===s)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===r)throw r="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);r="executing";var f=u(t,n,e);if("normal"===f.type){if(r=e.done?"completed":"suspendedYield",f.arg===s)continue;return{value:f.arg,done:e.done}}"throw"===f.type&&(r="completed",e.method="throw",e.arg=f.arg)}}}(t,e,i),o}function u(t,n,e){try{return{type:"normal",arg:t.call(n,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var s={};function f(){}function d(){}function l(){}var p={};p[a]=function(){return this};var h=Object.getPrototypeOf,m=h&&h(h(j([])));m&&m!==n&&e.call(m,a)&&(p=m);var v=l.prototype=f.prototype=Object.create(p);function y(t){["next","throw","return"].forEach((function(n){t[n]=function(t){return this._invoke(n,t)}}))}function g(t,n){var r;this._invoke=function(a,o){function i(){return new n((function(r,i){!function r(a,o,i,c){var s=u(t[a],t,o);if("throw"!==s.type){var f=s.arg,d=f.value;return d&&"object"==typeof d&&e.call(d,"__await")?n.resolve(d.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):n.resolve(d).then((function(t){f.value=t,i(f)}),(function(t){return r("throw",t,i,c)}))}c(s.arg)}(a,o,r,i)}))}return r=r?r.then(i,i):i()}}function b(t,n){var e=t.iterator[n.method];if(void 0===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=void 0,b(t,n),"throw"===n.method))return s;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var r=u(e,t.iterator,n.arg);if("throw"===r.type)return n.method="throw",n.arg=r.arg,n.delegate=null,s;var a=r.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=void 0),n.delegate=null,s):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,s)}function w(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function S(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function x(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function j(t){if(t){var n=t[a];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function n(){for(;++r<t.length;)if(e.call(t,r))return n.value=t[r],n.done=!1,n;return n.value=void 0,n.done=!0,n};return o.next=o}}return{next:E}}function E(){return{value:void 0,done:!0}}return d.prototype=v.constructor=l,l.constructor=d,l[i]=d.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===d||"GeneratorFunction"===(n.displayName||n.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,l):(t.__proto__=l,i in t||(t[i]="GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},y(g.prototype),g.prototype[o]=function(){return this},t.AsyncIterator=g,t.async=function(n,e,r,a,o){void 0===o&&(o=Promise);var i=new g(c(n,e,r,a),o);return t.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},y(v),v[i]="Generator",v[a]=function(){return this},v.toString=function(){return"[object Generator]"},t.keys=function(t){var n=[];for(var e in t)n.push(e);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=j,x.prototype={constructor:x,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var n in this)"t"===n.charAt(0)&&e.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function r(e,r){return i.type="throw",i.arg=t,n.next=e,r&&(n.method="next",n.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=e.call(o,"catchLoc"),u=e.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,n){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&e.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=n&&n<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=n,o?(this.method="next",this.next=o.finallyLoc,s):this.complete(i)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),s},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),S(e),s}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var a=r.arg;S(e)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,e){return this.delegate={iterator:j(t),resultName:n,nextLoc:e},"next"===this.method&&(this.arg=void 0),s}},t}(t.exports);try{regeneratorRuntime=r}catch(t){Function("r","regeneratorRuntime = r")(r)}},function(t,n,e){"use strict";e.r(n);var r=e(0),a=e.n(r);var o="./js/draft_data.json",i=[{name:"playerStore",option:{autoIncrement:!0}},{name:"managerStore",option:{autoIncrement:!0}},{name:"settingsStore",option:{autoIncrement:!0}}];function c(t){return function(t){if(Array.isArray(t))return u(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return u(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return u(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function s(t,n,e,r,a,o,i){try{var c=t[o](i),u=c.value}catch(t){return void e(t)}c.done?n(u):Promise.resolve(u).then(r,a)}function f(t){return function(){var n=this,e=arguments;return new Promise((function(r,a){var o=t.apply(n,e);function i(t){s(o,r,a,i,c,"next",t)}function c(t){s(o,r,a,i,c,"throw",t)}i(void 0)}))}}function d(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,n,e){return void 0===t.players||void 0===t.players[n]||void 0===this.data.players[n][e]?"":this.data.players[n][e].name}function p(t){var n=document.createElement("input"),e=document.querySelector('[data-js="managerInputContainer"]').appendChild(n);e.setAttribute("placeholder","Manager ".concat(t)),e.setAttribute("data-manager",t),e.setAttribute("data-js","managerInput")}var h=function(){function t(){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.intInput=document.querySelector('[data-js="numRounds"]'),this.optionInput=parseInt(document.querySelector('[data-js="numManagers"]').value,10),this.inputContainer=document.querySelector('[data-js="managerInputContainer"]'),this.displayContainer1=document.querySelector('[data-js="playerTable"]'),this.displayContainer2=document.querySelector('[data-js="managerContainer"]'),this.displayContainer3=document.querySelector('[data-js="settingsContainer"]')}var n,e,r;return n=t,(e=[{key:"bindInputs",value:function(t){var n=this;document.querySelector('[data-js="settingsForm"]').addEventListener("submit",function(){var e=f(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.preventDefault(),c(Array(n.optionInput)).forEach((function(t,n){return p(n)})),t([parseInt(n.intInput.value,10),n.optionInput]);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"bindReset",value:function(t){var n=this;document.querySelector('[data-js="resetBtn"]').addEventListener("click",function(){var e=f(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.preventDefault(),n.inputContainer.innerHTML="",n.displayContainer1.innerHTML="",n.displayContainer2.innerHTML="",n.displayContainer3.innerHTML="",t();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"bindStart",value:function(t){var n=this;document.querySelector('[data-js="startDraft"]').addEventListener("submit",function(){var e=f(regeneratorRuntime.mark((function e(r){var a,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.preventDefault(),n.inputText=c(document.querySelectorAll('[data-js="managerInput"]')),a=Array.from(c(n.inputText.map((function(t){return t.value}))),(function(t,n){return t||"Manager ".concat(n)})),o=a.map((function(t,n){var e={};return e.managerNum=n,e.managerName=t,e})),t(o);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"bindDraft",value:function(t){this.displayContainer1.addEventListener("click",function(){var n=f(regeneratorRuntime.mark((function n(e){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e.preventDefault(),"BUTTON"===e.target.tagName&&t(e.target.dataset),e.stopPropagation();case 3:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),!1)}},{key:"displayMarkup",value:function(t,n,e,r){var a=e,o="";if("manager"===n){var i=function(t){if(void 0===t.players)return"";var n=[];return Object.entries({QB:1,RB:2,WR:2,TE:1,K:1,DST:1,FLEX:1}).forEach((function(e){void 0!==t.players["".concat(e[0])]&&t.players["".concat(e[0])].forEach((function(t,r){r+1>e[1]&&n.push(t)}))})),n}(t),c="";void 0===i||0===i.length?c="":i.forEach((function(t){c+="<li>".concat(t.name,"</li>")})),o="\n          <article id=".concat(t.managerName.replace(/\s+/g,"")," data-manager=").concat(t.managerNum,">\n            <table data-manager=").concat(t.managerNum,">\n              <th>").concat(t.managerName,"</th>\n              <tr>\n                <td>QB</td>\n                <td data-manager=").concat(t.managerNum,">").concat(l(t,"QB",0),"</td>\n              </tr>\n              <tr>\n                <td>RB</td>\n                <td data-manager=").concat(t.managerNum,">").concat(l(t,"RB",0),"</td>\n              </tr>\n              <tr>\n                <td>RB</td>\n                <td data-manager=").concat(t.managerNum,">").concat(l(t,"RB",1),"</td>\n              </tr>\n              <tr>\n                <td>WR</td>\n                <td data-manager=").concat(t.managerNum,">").concat(l(t,"WR",0),"</td>\n              </tr>\n              <tr>\n                <td>WR</td>\n                <td data-manager=").concat(t.managerNum,">").concat(l(t,"WR",1),"</td>\n              </tr>\n              <tr>\n                <td>TE</td>\n                <td data-manager=").concat(t.managerNum,">").concat(l(t,"TE",0),"</td>\n              </tr>\n              <tr>\n                <td>K</td>\n                <td data-manager=").concat(t.managerNum,">").concat(l(t,"K",0),"</td>\n              </tr>\n              <tr>\n                <td>D/ST</td>\n                <td data-manager=").concat(t.managerNum).concat(l(t,"DST",0),"></td>\n              </tr>\n              <tr>\n                <td>BENCH</td>\n                <td data-manager=").concat(t.managerNum,">\n                  <ul>\n                    ").concat(c,"\n                  </ul>\n                </td>\n              </tr>\n            </table>\n          </article>\n        ")}return"players"===n&&(o="\n        <tr>\n          <td data-name='".concat(t.name,"'>").concat(t.name,"</td>\n          <td>").concat(t.pos,"</td>\n          <td>").concat(t.adp,"</td>\n          <td>").concat(t.team,"</td>\n          <td> \n            <button data-js='draftBtn' data-key='").concat(t.primaryKey,"' data-manager='").concat(t.managerNum,"' data-adp='").concat(t.adp,"' data-name='").concat(t.name,"' data-team='").concat(t.team,"' data-pos='").concat(t.pos,"'>DRAFT</button> \n          </td>\n        </tr>")),"settings"===n&&(o="\n        <article data-js='settingsList'>\n          <h2>Round ".concat(t.currRound,"</h2>\n          <h3>Now Drafting: Manager ").concat(t.currManager,"</h3>\n        </article>\n        ")),r&&(a.innerHTML+=o),o}}])&&d(n.prototype,e),r&&d(n,r),t}();function m(t){return function(t){if(Array.isArray(t))return v(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return v(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return v(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function y(t,n,e,r,a,o,i){try{var c=t[o](i),u=c.value}catch(t){return void e(t)}c.done?n(u):Promise.resolve(u).then(r,a)}function g(t){return function(){var n=this,e=arguments;return new Promise((function(r,a){var o=t.apply(n,e);function i(t){y(o,r,a,i,c,"next",t)}function c(t){y(o,r,a,i,c,"throw",t)}i(void 0)}))}}function b(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var w=function(){function t(n,e,r){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.dbName=n,this.dbVersion=e,this.stores=r,this.players=fetch(o).then((function(t){return t.json()})).catch((function(t){console.log(t)}))}var n,e,r;return n=t,(e=[{key:"getDB",value:function(){return this.db}},{key:"bindDBChanged",value:function(t){this.DBChanged=t}},{key:"openDB",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};return new Promise((function(e,r){window.indexedDB||n({message:"Unsupported indexedDB"});var a=window.indexedDB.open(t.dbName,t.dbVersion);a.onsuccess=function(){t.db=a.result,e(t.db)},a.onerror=function(t){return r(n(t.target.error))},a.onupgradeneeded=function(e){t.db=e.target.result,t.stores.forEach((function(n){var e=t.db.createObjectStore(n.name,n.option);"playerStore"===n.name&&(e.createIndex("name","name",{unique:!1}),e.createIndex("drafted","drafted",{unique:!1}),e.createIndex("roundDrafted","roundDrafted",{unique:!1})),"managerStore"===n.name&&e.createIndex("managerNum","managerNum",{unique:!0}),"settingsStore"===n.name&&(e.createIndex("rounds","rounds",{unique:!1}),e.createIndex("currRound","currRound",{unique:!1}),e.createIndex("currManager","currManager",{unique:!1}),e.createIndex("numManagers","numManagers",{unique:!1}),e.createIndex("id","id",{unique:!1}))})),t.db.onabort=function(t){return n(t.target.error)},t.db.error=function(t){return n(t.target.error)}}}))}},{key:"getData",value:function(t,n,e){var r=this;return new Promise((function(a,o){if(r.db&&n){var i=r.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).index("".concat(n)).get(e);i.onsuccess=function(){a(i.result)},i.onerror=function(t){o(new Error("error storing ".concat(e," ").concat(t.target.errorCode)))}}}))}},{key:"getAllData",value:function(t){var n=this;return new Promise((function(e,r){if(n.db){var a=n.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).getAll();a.onsuccess=function(){e(a.result)},a.onerror=function(){r()}}}))}},{key:"getCursorData",value:function(t,n,e){var r=this;return new Promise((function(a,o){var i=r.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)),c=[];i.openCursor().onsuccess=function(){var t=g(regeneratorRuntime.mark((function t(r){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(o=r.target.result)){t.next=8;break}return void 0!==n&&n.forEach((function(t){var n={};return n[t]=o.value[t],c.push(n),n})),e&&c.push({primaryKey:o.primaryKey}),t.next=6,o.continue();case 6:t.next=9;break;case 8:a(c);case 9:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),i.onerror=function(){o()}}))}},{key:"addData",value:function(t,n,e){var r=this;return new Promise((function(a,o){if(r.db){var i=r.db.transaction(["".concat(t)],"readwrite"),c=i.objectStore("".concat(t));n&&n.forEach((function(t){return c.put(t)})),e&&c.put(e),i.oncomplete=a,i.onerror=function(t){o(new Error("error storing ".concat(n," ").concat(t.target.errorCode)))}}}))}},{key:"putData",value:function(t,n,e,r){var a=this;return new Promise((function(o,i){var c=a.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)),u=c.get(parseInt(n,10));u.onerror=function(){i()},u.onsuccess=function(){var a=g(regeneratorRuntime.mark((function a(u){var s,f,d,l;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:s=u.target.result,"settingsStore"!==t?void 0===s[e]?s[e]=r:isIterable(s[e])?(f=[].concat(m(s[e]),[r]),s[e]=f):(d=[s[e],r],s[e]=d):s[e]=r,(l=c.put(s,parseInt(n,10))).onerror=function(){i()},l.onsuccess=function(){o(s)};case 5:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}()}))}},{key:"storeClear",value:function(t){var n=this,e=function(t){var e=n.db.transaction(["".concat(t)],"readwrite").objectStore("".concat(t)).clear();e.onsuccess=function(){console.log("".concat(t," cleared"))},e.onerror=function(t){console.error(new Error("error clearing store ".concat(t.target.errorCode)))}};t.forEach(function(){var t=g(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e(n);case 2:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}())}}])&&b(n.prototype,e),r&&b(n,r),t}();function S(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function x(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function j(t,n,e,r,a,o,i){try{var c=t[o](i),u=c.value}catch(t){return void e(t)}c.done?n(u):Promise.resolve(u).then(r,a)}function E(t){return function(){var n=this,e=arguments;return new Promise((function(r,a){var o=t.apply(n,e);function i(t){j(o,r,a,i,c,"next",t)}function c(t){j(o,r,a,i,c,"throw",t)}i(void 0)}))}}var k=function(){function t(n,e){var r=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),x(this,"handleInputs",(function(t){var n={numManagers:t[0],rounds:t[1],currManager:0,currRound:0};r.model.addData("settingsStore",void 0,n)})),x(this,"handleStart",function(){var t=E(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r.model.players.then((function(t){t.forEach((function(t){r.view.displayMarkup(t,"players",document.querySelector('[data-js="playerTable"]'),!0)})),r.model.addData("playerStore",t,void 0)})),t.next=3,r.model.addData("managerStore",n);case 3:return t.next=5,r.model.getAllData("managerStore").then((function(t){t.forEach((function(t){r.view.displayMarkup(t,"manager",document.querySelector('[data-js="managerContainer"]'),!0)}))}));case 5:return t.next=7,r.model.getAllData("settingsStore").then((function(t){t.forEach((function(t){r.view.displayMarkup(t,"settings",document.querySelector('[data-js="settingsContainer"]'),!0)}))}));case 7:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}()),x(this,"handleReset",(function(){r.model.storeClear(["playerStore","managerStore","settingsStore"])})),x(this,"handleDraft",(function(t){console.log(t)})),this.model=n,this.view=e,this.view.bindInputs(this.handleInputs),this.view.bindReset(this.handleReset),this.view.bindStart(this.handleStart),this.view.bindDraft(this.handleDraft)}var n,e,r,o;return n=t,(e=[{key:"init",value:(o=E(a.a.mark((function t(){var n=this;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.model.openDB();case 2:return t.next=4,this.model.getAllData("playerStore").then((function(t){t.forEach((function(t){n.view.displayMarkup(t,"players",document.querySelector('[data-js="playerTable"]'),!0)}))}));case 4:return t.next=6,this.model.getAllData("managerStore").then((function(t){t.forEach((function(t){n.view.displayMarkup(t,"manager",document.querySelector('[data-js="managerContainer"]'),!0)}))}));case 6:return t.next=8,this.model.getAllData("settingsStore").then((function(t){t.forEach((function(t){n.view.displayMarkup(t,"settings",document.querySelector('[data-js="settingsContainer"]'),!0)}))}));case 8:case"end":return t.stop()}}),t,this)}))),function(){return o.apply(this,arguments)})}])&&S(n.prototype,e),r&&S(n,r),t}();window.onload=function(){new k(new w("mock",1,i),new h).init()}}]);
//# sourceMappingURL=bundle.js.map