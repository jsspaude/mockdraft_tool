(this["webpackJsonpmock-draft-tool"]=this["webpackJsonpmock-draft-tool"]||[]).push([[0],{40:function(e,t,a){e.exports=a(63)},62:function(e,t,a){},63:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(34),l=a.n(c),u=a(12),o=a(5),s=a(4),i=Object(n.createContext)(""),m=function(e){var t=e.children,a=Object(n.useState)(!1),c=Object(s.a)(a,2),l=c[0],u=c[1];return r.a.createElement(i.Provider,{uid:l,value:[l,u]},t)},p=a(3),d=a(6),f=a.n(d),E=a(13),v=a(35),b=a(36),h=a(37),g=a.n(h),O=a(20),y=a.n(O),j=(a(47),a(49),y.a.initializeApp({apiKey:"AIzaSyB8zX55zSbxsyWNl_Nio1QHOANIK5U5T6k",authDomain:"sweatalus-mock-draft.firebaseapp.com",databaseURL:"https://sweatalus-mock-draft.firebaseio.com"})),S=g.a.createClass(j.database()),x=new(function(){function e(){var t=this;Object(v.a)(this,e),this.authenticate=function(e){var a=new(y.a.auth["".concat(e,"AuthProvider")]);j.auth().signInWithPopup(a).then(t.authHandler)},this.authHandler=function(){var e=Object(E.a)(f.a.mark((function e(a){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.fetch(a.user.uid,{context:t});case 2:if(e.sent.owner){e.next=6;break}return e.next=6,S.post("".concat(a.user.uid,"/owner"),{data:a.user.uid});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.getData=function(e){t.base.fetch("".concat(e,"/data"),{context:t,then:e=>e})},this.dataRef=function(e){return y.a.database().ref("".concat(e,"/data"))},this.collectData=function(e){return t.dataRef(e).once("value").then((function(e){return e.val()}))},this.updateUserData=function(e,a,n){var r={};return r["/".concat(n)]=a,t.dataRef(e).update(r)},this.updateResultsData=function(e,a,n){return new Promise((function(r,c){var l={};l["/".concat(n)]=a,t.database.ref("".concat(e,"/results")).update(l).then((function(){return r()})).catch((function(e){console.log(e),c()}))}))},this.removeData=function(e,a){return new Promise((function(n,r){t.database.ref("".concat(e,"/").concat(a)).remove().then((function(){return n()})).catch((function(e){console.log(e),r()}))}))},this.auth=j.auth(),this.base=S,this.database=y.a.database()}return Object(b.a)(e,[{key:"login",value:function(e,t){return this.auth.signInWithEmailAndPassword(e,t)}},{key:"createUser",value:function(){var e=Object(E.a)(f.a.mark((function e(t,a){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.auth.createUserWithEmailAndPassword(t,a);case 2:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"logout",value:function(){return this.auth.signOut()}},{key:"getCurrentUsername",value:function(){return this.auth.currentUser&&this.auth.currentUser.displayName}},{key:"setUserData",value:function(e,t,a){this.database.ref("".concat(e,"/").concat(a)).set(Object(p.a)({},t))}},{key:"moveRecord",value:function(e,t){var a=this;return new Promise((function(n,r){a.database.ref(e).once("value").then((function(e){return a.database.ref(t).set(e.val())})).then((function(){return a.database.ref(e).set(null)})).then((function(){n()})).catch((function(e){console.log(e.message),r()}))}))}},{key:"copyRecord",value:function(e,t){var a=this;this.database.ref(e).once("value",(function(e){a.database.ref(t).set(e.val(),(function(e){e&&"undefined"!==typeof console&&console.error&&console.error(e)}))}))}}]),e}()),N=function(e){var t=Object(n.useContext)(i),a=Object(s.a)(t,2),c=a[0],l=a[1];return r.a.createElement("ul",{className:"nav"},e.routes.map((function(e,t){return r.a.createElement("li",{key:t},r.a.createElement(u.b,{to:e.path},e.name))})),c&&r.a.createElement("div",null,r.a.createElement("li",null,r.a.createElement(u.b,{to:"/draft/".concat(c)},"Draft Room")),r.a.createElement("li",null,r.a.createElement(u.b,{to:"/",className:"logout",onClick:function(e){return x.logout(),void l(!1)}},"LOGOUT"))))},C=a(21),R=a.n(C),D=Object(o.g)((function(e){var t=e.history,a=Object(n.useState)(""),c=Object(s.a)(a,2),l=c[0],o=c[1],m=Object(n.useState)(""),p=Object(s.a)(m,2),d=p[0],f=p[1],E=Object(n.useState)(""),v=Object(s.a)(E,2),b=v[0],h=(v[1],Object(n.useContext)(i)),g=Object(s.a)(h,2),O=(g[0],g[1]);return Object(n.useLayoutEffect)((function(){R.a.auth().onAuthStateChanged((function(e){e&&(O(e.uid),t.push("/".concat(e.uid)))}))})),r.a.createElement("div",null,r.a.createElement("h1",null,"Login"),r.a.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault(),j.auth().setPersistence(R.a.auth.Auth.Persistence.LOCAL).then((function(){x.login(l,d).then((function(e){e.user&&O(e.user.uid),t.push("/".concat(e.user.uid))}))}))}(e)}},r.a.createElement("input",{value:l,onChange:function(e){return o(e.target.value)},name:"email",type:"email",placeholder:"email",autoComplete:"email"}),r.a.createElement("input",{onChange:function(e){return f(e.target.value)},name:"password",value:d,type:"password",placeholder:"password",autoComplete:"password"}),r.a.createElement("button",{type:"submit"},"Login"),r.a.createElement("span",null,b),r.a.createElement("p",{className:""},"Need to sign up?"," ",r.a.createElement(u.b,{to:"/signup",className:""},"Join here"))),r.a.createElement("nav",{className:"login"},r.a.createElement("button",{className:"google",onClick:function(){return x.authenticate("Google")}},"Login With Google"),r.a.createElement("button",{className:"facebook",onClick:function(){return x.authenticate("Twitter")}},"Login With facebook")))})),k=Object(o.g)((function(e){var t=e.history,a=Object(n.useState)(""),c=Object(s.a)(a,2),l=c[0],u=c[1],o=Object(n.useState)(""),m=Object(s.a)(o,2),p=m[0],d=m[1],f=Object(n.useState)(""),E=Object(s.a)(f,2),v=E[0],b=(E[1],Object(n.useContext)(i)),h=Object(s.a)(b,2),g=(h[0],h[1]);return Object(n.useLayoutEffect)((function(){R.a.auth().onAuthStateChanged((function(e){e&&(g(e.uid),t.push("/".concat(e.uid)))}))})),r.a.createElement("div",null,r.a.createElement("h1",null,"Join"),r.a.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault(),j.auth().setPersistence(R.a.auth.Auth.Persistence.LOCAL).then((function(){x.createUser(l,p).then((function(e){e.user&&g(e.user.uid),t.push("/".concat(e.user.uid))}))}))}(e)}},r.a.createElement("input",{value:l,onChange:function(e){return u(e.target.value)},name:"email",type:"email",placeholder:"email"}),r.a.createElement("input",{onChange:function(e){return d(e.target.value)},name:"password",value:p,type:"password",placeholder:"password"}),r.a.createElement("button",{type:"submit"},"Login"),r.a.createElement("span",null,v)),r.a.createElement("nav",{className:"login"},r.a.createElement("button",{className:"google",onClick:function(){return x.authenticate("Google")}},"Login With Google"),r.a.createElement("button",{className:"facebook",onClick:function(){return x.authenticate("Twitter")}},"Login With facebook")))})),w=[{name:"SignUp",path:"/signup",exact:!0,main:function(){return r.a.createElement(k,null)}},{name:"Login",path:"/",exact:!0,main:function(e){return r.a.createElement(D,e)}}],B=a(39),P=a.n(B),T=a(17),A=a.n(T),_=function(){var e=Object(E.a)(f.a.mark((function e(){var t,a,n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("../api/raw_data.csv");case 2:return t=e.sent,a=t.body.getReader(),n=new TextDecoder("utf-8"),e.next=7,a.read();case 7:return r=e.sent,e.abrupt("return",n.decode(r.value));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),W=function(){var e=Object(E.a)(f.a.mark((function e(t){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_();case 2:return a=e.sent,W.propTypes={complete:A.a.any},e.t0=P.a,e.t1=a,e.t2=t,e.t3={complete:e.t2,header:!0,dynamicTyping:!0,transformHeader:e=>e.replace(/[^A-Z0-9]+/gi,"_").toLowerCase()},e.abrupt("return",e.t0.parse.call(e.t0,e.t1,e.t3));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(){return W().then((function(e){return e.data.map((function(e){var t=Object(p.a)({},e);return t.drafted=!1,t}))})).then((function(e){return Object(p.a)({},e)}))},U=r.a.createContext(null),M={playerData:{},userSettings:{currStatus:1,positions:Object(p.a)({},{QB:1,RB:2,WR:2,TE:1,WR_RB_TE:2,DST:1,K:1,BENCH:5,WR_RB:0,WR_TE:0,RB_TE:0,QB_WR_RB_TE:0}),names:""},inProgress:!1},V=function(e,t){switch(t.type){case"storeSettings":return Object(p.a)(Object(p.a)({},e),{},{userSettings:Object(p.a)(Object(p.a)({},e.userSettings),t.payload),inProgress:!0});case"managerNames":return Object(p.a)(Object(p.a)({},e),{},{userSettings:Object(p.a)(Object(p.a)({},e.userSettings),{},{names:Object(p.a)(Object(p.a)({},e.userSettings.names),{},{[t.index]:t.payload})})});case"positions":return Object(p.a)(Object(p.a)({},e),{},{userSettings:Object(p.a)(Object(p.a)({},e.userSettings),{},{positions:Object(p.a)(Object(p.a)({},e.userSettings.positions),{},{[t.label]:t.payload})})});case"managerInput":return Object(p.a)(Object(p.a)({},e),{},{userSettings:Object(p.a)(Object(p.a)({},e.userSettings),{},{managers:t.payload})});case"loadSettings":return Object(p.a)(Object(p.a)({},M),t.payload);default:return null}},I=function(e){var t=Object(n.useReducer)(V,M),a=Object(s.a)(t,2),c=a[0],l=a[1];return Object(n.useLayoutEffect)((function(){function t(){return(t=Object(E.a)(f.a.mark((function t(){var a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x.collectData(e.uid);case 2:if(a=t.sent,l({type:"loadSettings",payload:a}),a){t.next=7;break}return t.next=7,L(e.uid).then((function(t){return x.setUserData(e.uid,Object(p.a)(Object(p.a)({},M),{},{playerData:t}),"data"),l({type:"loadSettings",payload:{playerData:t}})}));case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e.uid]),r.a.createElement(U.Provider,{value:{state:c,dispatch:l}},e.children)},H=function(e){var t=Object(n.useContext)(U),a=t.state,c=t.dispatch,l=Object(n.useState)(10),u=Object(s.a)(l,2),o=u[0],i=u[1],m=function(){var t=Object(E.a)(f.a.mark((function t(n){var r;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,Object.values(a.userSettings.positions).reduce((function(e,t){return e+t}),0);case 3:return r=t.sent,t.next=6,c({type:"storeSettings",payload:{managers:o,rounds:r}});case 6:x.updateUserData(e.uid,Object(p.a)(Object(p.a)({},a.userSettings),{},{managers:o,rounds:r}),"userSettings"),x.updateUserData(e.uid,!0,"inProgress");case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),d=function(e,t){var a=parseInt(e,10);c({type:"positions",label:t,payload:a})};return r.a.createElement("div",null,r.a.createElement("form",{className:"user-settings",onSubmit:function(e){return m(e)}},r.a.createElement("select",{defaultValue:"10",onChange:function(e){return function(e){i(parseInt(e,10))}(e.target.value)}},r.a.createElement("option",{value:"10"},"10 Managers"),r.a.createElement("option",{value:"4"},"4 Managers"),r.a.createElement("option",{value:"12"},"12 Managers"),r.a.createElement("option",{value:"14"},"14 Managers"),r.a.createElement("option",{value:"16"},"16 Managers")),r.a.createElement("div",null,r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("div",{className:"label"},"QB"),r.a.createElement("div",{className:"selector"},r.a.createElement("select",{defaultValue:"1",onChange:function(e){return d(e.target.value,"QB")}},r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4")))),r.a.createElement("td",null,r.a.createElement("div",{className:"label"},"WR/RB"),r.a.createElement("div",{className:"selector"},r.a.createElement("select",{defaultValue:"0",onChange:function(e){return d(e.target.value,"WR_RB")}},r.a.createElement("option",{value:"0"},"0"),r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4"),r.a.createElement("option",{value:"5"},"5"),r.a.createElement("option",{value:"6"},"6"),r.a.createElement("option",{value:"7"},"7"),r.a.createElement("option",{value:"8"},"8"),r.a.createElement("option",{value:"9"},"9"),r.a.createElement("option",{value:"10"},"10")))),r.a.createElement("td",null,r.a.createElement("div",{className:"label"},"DST"),r.a.createElement("div",{className:"selector"},r.a.createElement("select",{defaultValue:"1",onChange:function(e){return d(e.target.value,"DST")}},r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4"))))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("div",{className:"label"},"RB"),r.a.createElement("div",{className:"selector"},r.a.createElement("select",{defaultValue:"2",onChange:function(e){return d(e.target.value,"RB")}},r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4"),r.a.createElement("option",{value:"5"},"5"),r.a.createElement("option",{value:"6"},"6")))),r.a.createElement("td",null,r.a.createElement("div",{className:"label"},"WR/TE"),r.a.createElement("div",{className:"selector"},r.a.createElement("select",{defaultValue:"0",onChange:function(e){return d(e.target.value,"WR_TE")}},r.a.createElement("option",{value:"0"},"0"),r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4"),r.a.createElement("option",{value:"5"},"5"),r.a.createElement("option",{value:"6"},"6"),r.a.createElement("option",{value:"7"},"7"),r.a.createElement("option",{value:"8"},"8"),r.a.createElement("option",{value:"9"},"9"),r.a.createElement("option",{value:"10"},"10")))),r.a.createElement("td",null,r.a.createElement("div",{className:"label"},"K"),r.a.createElement("div",{className:"selector"},r.a.createElement("select",{defaultValue:"1",onChange:function(e){return d(e.target.value,"K")}},r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4"))))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("div",{className:"label"},"WR"),r.a.createElement("div",{className:"selector"},r.a.createElement("select",{defaultValue:"2",onChange:function(e){return d(e.target.value,"WR")}},r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4"),r.a.createElement("option",{value:"5"},"5"),r.a.createElement("option",{value:"6"},"6")))),r.a.createElement("td",null,r.a.createElement("div",{className:"label"},"RB/TE"),r.a.createElement("div",{className:"selector"},r.a.createElement("select",{defaultValue:"0",onChange:function(e){return d(e.target.value,"RB_TE")}},r.a.createElement("option",{value:"0"},"0"),r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4")))),r.a.createElement("td",null,r.a.createElement("div",{className:"label"},"BENCH"),r.a.createElement("div",{className:"selector"},r.a.createElement("select",{defaultValue:"5",onChange:function(e){return d(e.target.value,"K")}},r.a.createElement("option",{value:"0"},"0"),r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4"),r.a.createElement("option",{value:"5"},"5"),r.a.createElement("option",{value:"6"},"6"),r.a.createElement("option",{value:"7"},"7"),r.a.createElement("option",{value:"8"},"8"),r.a.createElement("option",{value:"9"},"9"),r.a.createElement("option",{value:"10"},"10"))))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("div",{className:"label"},"TE"),r.a.createElement("div",{className:"selector"},r.a.createElement("select",{defaultValue:"1",onChange:function(e){return d(e.target.value,"TE")}},r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4")))),r.a.createElement("td",null,r.a.createElement("div",{className:"label"},"WR/RB/TE"),r.a.createElement("div",{className:"selector"},r.a.createElement("select",{defaultValue:"2",onChange:function(e){return d(e.target.value,"WR_RB_TE")}},r.a.createElement("option",{value:"0"},"0"),r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4"),r.a.createElement("option",{value:"5"},"5"),r.a.createElement("option",{value:"6"},"6"),r.a.createElement("option",{value:"7"},"7"),r.a.createElement("option",{value:"8"},"8"),r.a.createElement("option",{value:"9"},"9"),r.a.createElement("option",{value:"10"},"10")))),r.a.createElement("td",null,r.a.createElement("div",{className:"label"},"QB/WR/RB/TE"),r.a.createElement("div",{className:"selector"},r.a.createElement("select",{defaultValue:"0",onChange:function(e){return d(e.target.value,"QB_WR_RB_TE")}},r.a.createElement("option",{value:"0"},"0"),r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4"),r.a.createElement("option",{value:"5"},"5"),r.a.createElement("option",{value:"6"},"6"),r.a.createElement("option",{value:"7"},"7"),r.a.createElement("option",{value:"8"},"8"),r.a.createElement("option",{value:"9"},"9"),r.a.createElement("option",{value:"10"},"10")))))))),r.a.createElement("button",{type:"submit"},"Start Draft")))},Q=(a(62),a(18)),F=Object(n.createContext)(""),K=function(e){var t=Object(n.useState)(e.userSettings.currStatus),a=Object(s.a)(t,2),c=a[0],l=a[1];return r.a.createElement(F.Provider,{value:{currStatus:c,setCurrStatus:l}},e.children)};var G=function(e){var t=e.index,a=Object(n.useState)(e.data.playerData[t]),c=Object(s.a)(a,2),l=c[0],u=c[1],o=Object(n.useState)(!1),i=Object(s.a)(o,2),m=i[0],d=i[1],v=Object(n.useContext)(F),b=(v.currStatus,v.setCurrStatus),h=e.details,g=h.overall,O=h.pos,y=h.team,j=O.replace(/[0-9]/g,""),S=function(){var a=Object(E.a)(f.a.mark((function a(n){return f.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:x.updateUserData(e.user,e.newCurrStatus,"userSettings/currStatus"),u(Object(p.a)(Object(p.a)({},l),{},{drafted:e.currStatus})),b(e.newCurrStatus),d(!0),e.handlePlayer(Object(p.a)(Object(p.a)({},l),{},{drafted:e.currStatus})),e.draftedPlayers(),x.updateUserData(e.user,Object(p.a)(Object(p.a)({},l),{},{drafted:e.currStatus}),"playerData/".concat(t));case 7:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return Object(n.useLayoutEffect)((function(){e.status&&d(!0)}),[e.status]),r.a.createElement("tr",{className:"player-data ".concat(m)},r.a.createElement("td",{className:"name"},g),r.a.createElement("td",{className:"pos"},j),r.a.createElement("td",{className:"team"},y),r.a.createElement("td",null,r.a.createElement("button",{onClick:S},"DRAFT")))},z=function(e){var t=Object(n.useContext)(U),a=t.state,c=(t.dispatch,Object(n.useContext)(F)),l=c.currStatus,u=(c.setCurrStatus,function(e,t){var a,n,r=.01*parseInt(t,10),c=parseInt(e,10),l=Number((e-parseInt(e,10)).toFixed(2));return c%2===0?(a=l-.01,0===l?(n=c+1,Number((n+l).toFixed(2))):(n=c,Number((n+a).toFixed(2)))):(a=l+.01)>r-.01?(n=c+1,Number((n+l).toFixed(2))):(n=c,Number((n+a).toFixed(2)))}(l,a.userSettings.managers));return r.a.createElement("div",{className:"player-list"},r.a.createElement("table",{className:"players"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Position"),r.a.createElement("th",null,"Team"))),r.a.createElement("tbody",null,Object.keys(a.playerData).map((function(t){return r.a.createElement(G,{key:t,index:parseInt(t,10),details:a.playerData[t],draftedPlayers:e.draftedPlayers,handlePlayer:e.handlePlayer,user:e.uid,currStatus:l,newCurrStatus:u,data:a,status:!!a.playerData[t].drafted})})))))},J=a(26),X=function(e){var t=e.pos,a=e.playerData,n=t.split(/([0-9]+)/).filter((function(e){return""!==e}));return function(){if(e.playerData){var t=a.find((function(e){return e.pos===n[0]}));if(t&&t.players[n[1]])return r.a.createElement("td",null,t.players[n[1]].overall);if(n[0].includes("_")){var c=a.find((function(e){return"FLEX"===e.pos}));if(c&&c.players[n[1]])return r.a.createElement("td",null,c.players[n[1]].overall)}if("BENCH"===n[0]){var l=a.find((function(e){return"BENCH"===e.pos}));if(l&&l.players[n[1]])return r.a.createElement("td",null,l.players[n[1]].overall)}return r.a.createElement("td",null)}return r.a.createElement("td",null)}()},Y=function(e){var t=Object(n.useState)(""),a=Object(s.a)(t,2),c=a[0],l=a[1];return Object(n.useLayoutEffect)((function(){var t=e.playerAssign.reduce((function(e,t){var a=t;return a.pos=a.pos.replace(/[0-9]/g,""),e.concat(a)}),[]);new Promise((function(a,n){try{var r={},c={pos:"FLEX",players:[]},l={pos:"BENCH",players:[]};t.forEach((function(t,a){var n=t.pos,u=Object(J.a)(t,["pos"]);r[n]=r[n]||{pos:n,players:[]},r[n].players.length<e.posSettings[n]?r[n].players.push(u):c.players.length<e.flexCount&&e.flexPosArray.includes(n)?c.players.push(u):l.players.push(u)})),a([].concat(Object(Q.a)(Object.values(r)),[l]))}catch(u){n(console.log(u))}})).then((function(e){return l(e)}))}),[e]),e.posStringArray.map((function(t,a){return r.a.createElement("tr",{key:a,index:a,poscount:t.replace(/\D/g,"")},r.a.createElement("td",null,t.replace(/[0-9]/g,"")),r.a.createElement(X,Object.assign({pos:t,playerData:c},e)))}))},Z=function(e){var t=Object(n.useContext)(U),a=t.state,c=t.dispatch,l=a.userSettings.names,u=Object(n.useState)(l[e.index]?l[e.index]:""),o=Object(s.a)(u,2),i=o[0],m=o[1],d=Object(p.a)(Object(p.a)({},a.userSettings),{},{names:Object(p.a)(Object(p.a)({},a.userSettings.names),{},{[e.index]:i})});return r.a.createElement("div",{className:"Manager".concat(e.index)},r.a.createElement("input",{type:"text",name:"name",onChange:function(e){return function(e){m(e)}(e.target.value)},onBlur:function(t){return function(t){m(t),c({type:"managerNames",payload:i,index:e.index}),x.updateUserData(e.uid,d,"userSettings/")}(t.target.value)},placeholder:i&&i||!i&&"Manager-".concat(e.index),value:i&&"".concat(i)}),r.a.createElement("table",{className:"players"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"POS"),r.a.createElement("th",null,"NAME"),r.a.createElement("th",null,"TEAM"),r.a.createElement("th",null,"ROUND")),r.a.createElement(Y,{index:e.index,data:e.data,posStringArray:e.posStringArray,posSettings:e.posSettings,flexPosArray:e.flexPosArray,flexCount:e.flexCount,playerAssign:e.playerAssign}))))},q=function(e){var t=Object(n.useContext)(U),a=t.state,c=(t.dispatch,a.userSettings.positions),l=function(t){return e.draftedPlayers.map((function(e){return function(e,t){var a=e[t];return Math.round(100*(a-Math.round(a)))}(e,"drafted")===t?e:null})).filter((function(e){return null!=e}))},u=["QB","RB","WR","TE","QB_WR_RB_TE","WR_RB_TE","WR_RB","WR_TE","RB_TE","K","DST","BENCH"],o=function e(t){return Object.keys(t).reduce((function(a,n){return"object"===typeof t[n]?Object.assign(a,e(t[n])):a[n]=t[n],a}),{})}(Object(p.a)({},Object.keys(c).sort((function(e,t){return u.indexOf(e)-u.indexOf(t)})).map((function(e){return{[e]:c[e]}})))),s=Object.keys(c).sort((function(e,t){return u.indexOf(e)-u.indexOf(t)})).map((function(e){return Array(c[e]).fill(e).map((function(e,t){return"".concat(e).concat(t)}))})).flat(),i=Object.keys(o).map((function(e){return e.includes("_")?e:void 0})).map((function(e){return o[e]>0?{[e]:o[e]}:void 0})).filter((function(e){return void 0!==e})),m=Object.keys.apply(Object,Object(Q.a)(i)).map((function(e){return e.split("_")})).flat(),d=Object.values.apply(Object,Object(Q.a)(i)).reduce((function(e,t){return e+t}));return r.a.createElement("div",{className:"managers"},Array.from(Array(a.userSettings.managers)).map((function(t,n){return r.a.createElement(Z,{key:n,uid:e.uid,index:n,data:a,posStringArray:s,posSettings:o,flexPosArray:m,flexCount:d,playerAssign:l(n)})})))},$=function(e){var t=Object(n.useContext)(U),a=t.state,c=(t.dispatch,function(){if(a.playerData){return(Array.isArray(a.playerData)?a.playerData:[a.playerData]).map((function(e){return!1!==e.drafted?e:null})).filter((function(e){return null!=e}))}return null}),l=c(),u=Object(n.useState)(l),o=Object(s.a)(u,2),i=o[0],m=o[1];return r.a.createElement("div",{className:"draft-main"},r.a.createElement(K,{userSettings:a.userSettings},r.a.createElement(z,Object.assign({},e,{draftedPlayers:c,handlePlayer:function(e){var t=[].concat(Object(Q.a)(i),[e]);m(t)}}))),r.a.createElement(q,Object.assign({draftedPlayers:i},e)))},ee=new Date,te=[ee.getYear(),ee.getMonth(),ee.getDate(),ee.getHours(),ee.getMinutes(),ee.getSeconds(),ee.getMilliseconds()].join(""),ae=function(e){var t=Object(n.useContext)(U),a=t.state,c=(t.dispatch,Object(n.useState)(!1)),l=Object(s.a)(c,2),o=l[0],i=l[1];return Object(n.useEffect)((function(){a&&i(a.inProgress)}),[a]),r.a.createElement("div",{className:"mock-draft"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(u.b,{to:"/",className:"reset",onClick:function(t){return function(t){var n={playerData:a.playerData,posData:a.userSettings.positions};x.updateResultsData(e.uid,n,te).then((function(){return x.removeData(e.uid,"/data").then((function(){L(e.uid).then((function(t){x.setUserData(e.uid,Object(p.a)(Object(p.a)({},M),{},{playerData:t}),"data")}))}))}))}()}},"RESET"))),!o&&r.a.createElement(H,e),o&&r.a.createElement($,Object.assign({data:a},e)))},ne=[{name:"draft",exact:!0,path:"/:uid",main:function(e){return r.a.createElement(I,e,r.a.createElement(ae,e))},public:!1}],re=Object(o.g)((function(e){var t=e.component,a=Object(J.a)(e,["component"]),c=Object(n.useContext)(i),l=Object(s.a)(c,2),u=l[0];l[1];return u||a.public?r.a.createElement(o.b,Object.assign({},a,{render:function(e){return r.a.createElement(t,Object.assign({uid:u},e))}})):r.a.createElement(o.a,{to:{pathname:"/"}})})),ce=function(){return r.a.createElement(m,null,r.a.createElement(u.a,null,r.a.createElement(N,{routes:w}),r.a.createElement(o.d,null,ne.map((function(e){return r.a.createElement(re,{key:e.path,path:e.path,component:e.main,exact:e.exact,public:e.public})})),w.map((function(e){return r.a.createElement(o.b,{key:e.path,uid:e.uid,path:e.path,exact:e.exact,component:e.main})})))))},le=document.getElementById("main");l.a.render(r.a.createElement(ce,null),le)}},[[40,1,2]]]);
//# sourceMappingURL=main.e0691ac0.chunk.js.map