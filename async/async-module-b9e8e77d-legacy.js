!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */e=function(){return r};var r={},n=Object.prototype,o=n.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},u=i.iterator||"@@iterator",l=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(D){s=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof y?e:y,i=Object.create(o.prototype),u=new E(n||[]);return a(i,"_invoke",{value:_(t,r,u)}),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(D){return{type:"throw",arg:D}}}r.wrap=f;var p={};function y(){}function v(){}function m(){}var d={};s(d,u,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(k([])));b&&b!==n&&o.call(b,u)&&(d=b);var w=m.prototype=y.prototype=Object.create(d);function x(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function j(e,r){function n(a,i,u,l){var c=h(e[a],e,i);if("throw"!==c.type){var s=c.arg,f=s.value;return f&&"object"==t(f)&&o.call(f,"__await")?r.resolve(f.__await).then((function(t){n("next",t,u,l)}),(function(t){n("throw",t,u,l)})):r.resolve(f).then((function(t){s.value=t,u(s)}),(function(t){return n("throw",t,u,l)}))}l(c.arg)}var i;a(this,"_invoke",{value:function(t,e){function o(){return new r((function(r,o){n(t,e,r,o)}))}return i=i?i.then(o,o):o()}})}function _(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return S()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var u=O(i,r);if(u){if(u===p)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var l=h(t,e,r);if("normal"===l.type){if(n=r.done?"completed":"suspendedYield",l.arg===p)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n="completed",r.method="throw",r.arg=l.arg)}}}function O(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,O(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),p;var o=h(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,p;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function k(t){if(t){var e=t[u];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:S}}function S(){return{value:void 0,done:!0}}return v.prototype=m,a(w,"constructor",{value:m,configurable:!0}),a(m,"constructor",{value:v,configurable:!0}),v.displayName=s(m,c,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,s(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},r.awrap=function(t){return{__await:t}},x(j.prototype),s(j.prototype,l,(function(){return this})),r.AsyncIterator=j,r.async=function(t,e,n,o,a){void 0===a&&(a=Promise);var i=new j(f(t,e,n,o),a);return r.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(w),s(w,c,"Generator"),s(w,u,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=k,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(P),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),l=o.call(a,"finallyLoc");if(u&&l){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;P(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},r}function r(t,e,r,n,o,a,i){try{var u=t[a](i),l=u.value}catch(c){return void r(c)}u.done?e(l):Promise.resolve(l).then(n,o)}function n(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function a(e,r,n){return(r=function(e){var r=function(e,r){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,r||"default");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(e,"string");return"symbol"===t(r)?r:String(r)}(r))in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}System.register(["./async-module-9d17f205-legacy.js","./async-module-b81df90c-legacy.js","./async-module-8dd18fbb-legacy.js","../main/index-legacy-0cea8e4c.js","./async-module-93ddb242-legacy.js","./async-module-cb6b1e93-legacy.js","./async-module-c2b56d70-legacy.js","./async-module-4fc7c6d6-legacy.js","./async-module-b7d2faf6-legacy.js","./async-module-805302dc-legacy.js","./async-module-6081ce88-legacy.js","./async-module-de4fde3b-legacy.js"],(function(t,n){"use strict";var a,i,u,l,c,s,f,h,p,y,v,m,d,g;return{setters:[function(t){a=t.u,i=t.b,u=t.a,l=t.c},function(t){c=t.p,s=t.h,f=t.r,h=t.w},function(t){p=t.a,y=t.u},function(t){v=t.a},function(t){m=t.s},function(t){d=t.n},function(t){g=t.d},null,null,null,null,null],execute:function(){var n={__name:"Detail-view",props:o({title:{type:String,default:""},labelWidth:{type:[String,Number],default:100}},a()),setup:function(t){var n=t,a=m(v()),d=a.currentModule,g=a.currentMenuName,b=p(),w=y(),x=i(n.formConfig);c("formConfig",x);var j=u(n.module),_=s((function(){return w.params})),O=s((function(){return o(o({},_.value),n.extraRequestParams)})),L=s((function(){return w.params.edit})),P=s((function(){var t=!_.value||!Object.keys(_.value).some((function(t){return _.value[t]}));return!(L.value||!t)})),E=s((function(){return(P.value?"创建":"编辑")+(n.title||g.value)})),k=f({}),S=function(){var t,n=(t=e().mark((function t(){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l(d.value,O.value);case 2:k.value=t.sent;case 3:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(o,a){var i=t.apply(e,n);function u(t){r(i,o,a,u,l,"next",t)}function l(t){r(i,o,a,u,l,"throw",t)}u(void 0)}))});return function(){return n.apply(this,arguments)}}(),D=function(){return!P.value&&S()};return h((function(){return d.value}),D),!P.value&&S(),{__sfc:!0,currentModule:d,currentMenuName:g,$router:b,$route:w,props:n,configs:x,moduleName:j,routeParams:_,queryParams:O,useEdit:L,isNew:P,formedTitle:E,formData:k,getData:S,init:D}}},b=d(n,(function(){var t=this,e=t._self._c,r=t._self._setupProxy;return e("div",{class:["page--".concat(r.moduleName||"common","-detail"),"tw-flex","tw-flex-col","tw-h-full"]},[e("h2",{staticClass:"title tw-py-4 tw-font-bold",domProps:{textContent:t._s(r.formedTitle)}}),e(g,{staticClass:"tw-pb-4"}),t._t("nav"),r.configs.length||Object.keys(r.configs).length?e("form-view",t._b({attrs:{module:r.moduleName,"extra-request-params":r.queryParams,"use-grid":t.$attrs.useGrid,"is-new":r.isNew},scopedSlots:t._u([t._l(t.$scopedSlots,(function(e,n){return{key:n,fn:function(e){return[t._t(n,null,null,o(o({},e),{},{formConfig:t.formConfig,formData:r.formData,refreshData:r.getData}))]}}}))],null,!0),model:{value:r.formData,callback:function(t){r.formData=t},expression:"formData"}},"form-view",t.$attrs,!1)):t._e()],2)}),[],!1,null,null,null,null).exports;t("default",d({__name:"detail",setup:function(t){return{__sfc:!0,formConfig:[[{control:"IText",key:"text",label:"文本框",required:!0,max:25,useRef:!0,change:function(t){t.config,t.formConfig,t.value,t.formData;t.refs["type-i-select"].config.options=[{label:"北京",value:"bj"}]},created:function(){},mounted:function(){}},{control:"i-select",key:"type",label:"下拉框",itemText:"label",useRef:!0,options:[{label:"上海",value:"sh"}],change:function(t){t.config,t.formConfig;var e=t.value,r=t.formData;t.refs;!e&&(r.slotType=null)}}],[{control:"i-checkbox",key:"selected",label:"复选框",allChecked:!0,value:[],rules:[function(t){return!(null==t||!t.length)||"不得少于一项"}],change:function(t){t.config,t.formConfig,t.value;t.formData.type=null},options:[{label:"一",value:1},{label:"二",value:2}]},{control:"i-radio",key:"gender",label:"选项",value:1,options:[{label:"男",value:1},{label:"女",value:0}]}],[{control:"i-textarea",key:"textArea",label:"文本域",itemText:"label",options:[{label:"上海",value:"sh"}]},{control:"i-test-custom-comp",key:"action",label:"自定义组件",value:321}]],DetailView:b}}},(function(){var t=this,e=t._self._c,r=t._self._setupProxy;return e(r.DetailView,{attrs:{"form-config":r.formConfig,"pagination-options":{save:!0}},scopedSlots:t._u([{key:"left_text",fn:function(r){var n=r.formData,o=r.className;r.test;return[e("i-select",{class:o,attrs:{"form-data":n,clearable:!1,config:{itemText:"label",options:[{label:"上海",value:"sh"},{label:"北京",value:"bj"}],change:function(t){t.config,t.formConfig,t.value;t.formData.text=""}}},model:{value:n.slotType,callback:function(e){t.$set(n,"slotType",e)},expression:"formData.slotType"}})]}}])})}),[],!1,null,null,null,null).exports)}}}))}();