(function(t){function e(e){for(var i,a,s=e[0],l=e[1],c=e[2],u=0,h=[];u<s.length;u++)a=s[u],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&h.push(r[a][0]),r[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);d&&d(e);while(h.length)h.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],i=!0,s=1;s<n.length;s++){var l=n[s];0!==r[l]&&(i=!1)}i&&(o.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},r={app:0},o=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/masonryjs/dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var d=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("f0a0")},"56d7":function(t,e,n){"use strict";n.r(e);var i={};n.r(i),n.d(i,"Container",(function(){return y}));var r={};n.r(r),n.d(r,"Wrapper",(function(){return m}));n("c9ba"),n("e6f5"),n("5bda"),n("85ea");var o,a,s=n("a593"),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("masonry-editor",{staticStyle:{height:"100%",width:"100%"}})},c=[],d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{height:"100%",width:"100%",padding:"10px",overflow:"hidden"}},[n("button",{on:{click:t.add}},[t._v("新增")]),n("Container",{ref:"container",staticStyle:{"overflow-x":"hidden"}},t._l(t.key,(function(t){return n("ItemWrapper",{key:t})})),1)],1)},u=[],h=n("6abc"),f=n("1eff"),p=n("f5b8"),y=Object(p["a"])("div",{})(o||(o=Object(f["a"])(["\n  position:relative;\n  background:gray;\n  width:100%;\n  height:100%;\n  overflow:auto;\n"]))),x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Wrapper",{style:Object.assign({},t.styles)},[n("div",[t._v("test")])])},v=[],m=Object(p["a"])("div",{})(a||(a=Object(f["a"])(["\n  position:absolute;\n  background:white;\n  transform:tranlate(0px,0px);\n"]))),g={components:Object(h["a"])({},r),props:{styles:{type:Object,defaule:function(){return{}}}}},b=g,I=n("5d22"),w=Object(I["a"])(b,x,v,!1,null,null,null),A=w.exports,M=n("a293");n("3e71"),n("186d"),n("c447"),n("9208"),n("a92d"),n("15ee"),n("9719"),n("6390"),n("9b20"),n("aa0d"),n("b566"),n("b0da"),n("f0b3");function O(t){return t.getClientRects().length>0?t.getClientRects()[0]:{width:parseFloat(t.style.width),height:parseFloat(t.style.height)}}function j(t,e,n){return t.addEventListener?(t.addEventListener(e,n,!1),{remove:function(){t.removeEventListener(e,n,!1)}}):t.attachEvent?(t.attachEvent("on".concat(e),n),{remove:function(){t.detachEvent("on".concat(e),n)}}):null}function k(t,e){var n,i=Object(M["a"])(t);try{for(i.s();!(n=i.n()).done;){var r=n.value;if(r instanceof HTMLElement&&null!==r&&void 0!==r&&r.getAttribute(e))return{dom:r,value:r.getAttribute(e)}}}catch(o){i.e(o)}finally{i.f()}return{value:-1,dom:null}}var E=new Map,R=new Map,W=new Map,S=new Map,G=new Map,T=new Map,Y=null,_=!1,L={},C={el:null,client:{},orderArr:[],clone:null,minWidth:100,minHeight:90,events:[],config:{multiColumn:12,columnGap:10,draggable:!1,classList:[]},yGap:50,left:0,right:0,create:function(t,e){var n,i=this;if(!t instanceof HTMLElement)throw"el 必须为HTMLElement";(this.events.length>0&&(this.events.map((function(t){return t.remove})),this.events.splice(0)),this.el=t,this.el.style.position="relactive",this.client=O(this.el),this.left=.25*this.client.width+"px",this.right=.75*this.client.width+"px",t.childNodes.forEach((function(t,e){E.set(e,t)})),e.draggable)&&(n=this.events).push.apply(n,[j(this.el,"mousemove",(function(e){if(_){var n=E.get(Y),r=e.clientX+t.scrollLeft,o=e.clientY+t.scrollTop;console.info(r,L.x,n);var a=r-L.x,s=o-L.y;if(a<2*i.minWidth||s<i.minHeight)return;(null===n||void 0===n?void 0:n.style)&&(n.style.width="".concat(a,"px"),n.style.height="".concat(s,"px")),(Math.abs(r-L.beforeX)>=i.minWidth/2||Math.abs(o-L.beforeY)>=i.yGap/2)&&(L.beforeX=r,L.beforeY=o,i.drop(n,{x:L.x,y:L.y},Y,!1),i.Mounting(),i.draw())}else if(Y>-1){var l=E.get(Y),c=e.clientX+t.scrollLeft,d=e.clientY+t.scrollTop;(null===l||void 0===l?void 0:l.style)&&(l.style.transform="translate(".concat(c-L.x,"px,").concat(d-L.y,"px)")),(Math.abs(c-L.beforeX)>=i.minWidth/2||Math.abs(d-L.beforeY)>=i.yGap/2)&&(L.beforeX=c,L.beforeY=d,i.drop(l,{x:c-L.x,y:d-L.y},Y),i.Mounting(),i.draw())}})),j(this.el,"mouseup",(function(e){var n=E.get(Y);e.clientX,t.scrollLeft,e.clientY,t.scrollTop;_&&i.drop(n,{x:L.x,y:L.y},Y),Y=null,_=!1,i.draw()})),j(this.el,"mousedown",(function(e){var n=k(e.path,"data-key"),i=n.value,r=n.dom,o=k(e.path,"data-scale"),a=o.value;if(i=parseInt(i),-1!==a){_=!0,r.style.transition="",Y=parseInt(i);var s=O(r),l=s.left,c=s.top,d=e.clientX+t.scrollLeft,u=e.clientY+t.scrollTop;L={beforeX:d,beforeY:u,x:l,y:c+t.scrollTop}}else if(i>-1){var h,f=E.get(i),p=null===(h=f.style.transform)||void 0===h?void 0:h.match(/translate\((.*), (.*)\)/),y=e.layerX,x=e.layerY,v=e.clientX+t.scrollLeft,m=e.clientY+t.scrollTop;f.style.transition="",Y=parseInt(i),L={x:y-p[1].match(/^[-+]?[0-9]*\.?[0-9]+/)[0],y:x-p[2].match(/^[-+]?[0-9]*\.?[0-9]+/)[0],beforeX:v,beforeY:m}}else Y=null}))]);return this.init(e),this},update:function(){this.create(this.el,this.config)},sortRect:function(){var t=Array.from(S);t.sort((function(t,e){return t[1].yAxis-e[1].yAxis})),this.orderArr=t.map((function(t){return t[0]}))},Mounting:function(){var t=this;this.sortRect(),this.orderArr.map((function(e){var n=t.getRect(e),i=t.getRealYAxis({startIndex:n.startIndex,endIndex:n.endIndex,yAxisIndex:n.yAxis},e);t.setElmPoint(e,{startIndex:n.startIndex,endIndex:n.endIndex,yAxis:i,len:n.len})}))},parseStyle:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(t&&t.style){var n=O(t),i=n.width,r=n.height;return""===t.style.width?i=this.config.multiColumn/2*this.minWidth:Math.floor(i/this.minWidth)<2&&(i=2*this.minWidth),""===t.style.width?r=6*this.yGap:r<this.minHeight&&(r=2*this.yGap),i=Math.round(i/this.minWidth)*this.minWidth-this.config.columnGap,r=Math.round(r/this.yGap)*this.yGap-this.config.columnGap,e&&(t.style.width=i+"px",t.style.height=r+"px"),{width:i,height:r}}},init:function(t){var e=this,n=t.multiColumn,i=void 0===n?12:n,r=t.draggable,o=t.classList;this.config=Object(h["a"])(Object(h["a"])({},this.config),t);for(var a=0;a<i;a++){var s=W.get(a);s||W.set(a,[])}this.multiColumn=i,console.info(this.el.style,this.el.offsetWidth,this.client.width),this.minWidth=this.client.width/i,Array.from(E).forEach((function(t){var n,i=t[0],a=t[1],s=null===(n=a.style.transform)||void 0===n?void 0:n.match(/translate\((.*), (.*)\)/);if(r&&(a.style["cursor"]="move",a.dataset.key=i),e.config.scaleable&&!R.get(i)){var l=document.createElement("div");l.dataset.scale=!0,a.appendChild(l),l.style.cssText="\n          position: absolute;\n          bottom: 3px;\n          width:8px;\n          height:8px;\n          right: 3px;\n          cursor: se-resize;\n          border-right: 2px solid rgba(0,0,0,.4);\n          border-bottom: 2px solid rgba(0,0,0,.4);\n        "}if(o&&o.map((function(t){a.classList.add(t)})),3===(null===s||void 0===s?void 0:s.length))e.drop(a,{x:s[1].match(/^[-+]?[0-9]*\.?[0-9]+/)[0],y:s[2].match(/^[-+]?[0-9]*\.?[0-9]+/)[0]},i);else{var c=e.parseStyle(a),d=c.width;e.drop(a,{x:parseInt((i+1)%2!==0?e.left:e.right)-d/2,y:1e16},i)}})),this.draw()},add:function(t,e){},remove:function(t){var e=E.get(t);this.el.removeChild(e),E.remove(t),this.update()},draw:function(){var t=this;console.info(G,T),Array.from(E).forEach((function(e){var n=e[0],i=e[1],r=t.getRect(n),o=r.startIndex,a=r.yAxis;i.style.visibility="initial",i.style["user-select"]="none",t.getRect(n)&&n!==Y&&(i.style.transition="all .2s",i.style.transform="translate(".concat(o*t.minWidth,"px,").concat(a*t.yGap,"px)"))}))},getRect:function(t){return S.get(t)},doOverlap:function(t,e,n,i){if(Array.prototype.forEach.call(arguments,(function(t){if(isNaN(t.x)||isNaN(t.y))throw"存在不是数字的类型".concat(t.x," ").concat(t.y)})),t.x===e.x||t.y===e.y||n.x===i.x||n.y===i.y)throw"当前非矩形";return t.x<i.x&&t.y<i.y&&n.x<e.x&&n.y<e.y},getRealYAxis:function(t,e){var n,i=t.startIndex,r=t.endIndex,o=t.yAxisIndex,a=0,s=Object(M["a"])(S);try{for(s.s();!(n=s.n()).done;){var l=n.value,c=l[1],d=c.startIndex,u=c.endIndex,h=c.yAxis,f=c.len,p=l[0];p!==e&&((i>d&&i<u||r>d&&r<u||d>i&&d<r||u>i&&u<r||d===i&&u===r)&&a<h+f&&h+f<=o&&(a=h+f))}}catch(y){s.e(y)}finally{s.f()}return o>a?a:o},fillRect:function(t){var e=t.startIndex,n=t.endIndex,i=t.yAxis,r=t.key,o=t.len;console.info(r,"fillRect");var a=this.getRealYAxis({startIndex:e,endIndex:n,yAxisIndex:i},r);this.setElmPoint(r,{startIndex:e,endIndex:n,yAxis:a,len:o}),this.loopDrop({startIndex:e,endIndex:n,yAxis:a,key:r,len:o})},setElmPoint:function(t,e){var n=e.startIndex,i=e.endIndex,r=e.yAxis,o=e.len;S.set(t,{startIndex:n,endIndex:i,yAxis:r,len:o})},filterNode:function(t){return t},loopDrop:function(t){var e=this,n=t.startIndex,i=t.endIndex,r=t.yAxis,o=t.key,a=t.len,s=[],l=Array.from(S);if(l.map((function(t){var l=t[0],c=t[1];if(l!==o){var d,u={x:n,y:r},h={x:i,y:r+a},f={x:c.startIndex,y:c.yAxis},p={x:c.endIndex,y:c.yAxis+c.len};try{d=e.doOverlap(u,h,f,p)}catch(y){return}d&&s.push(l)}})),s=s.filter((function(t){return t!==o})),s.some((function(t){var n=e.getRect(t),i=r-n.yAxis;return i<=n.len/2&&i>0}))){var c=s.find((function(t){var n=e.getRect(t),i=r-n.yAxis;return i<=n.len/2&&i>0})),d=this.getRect(c);this.fillRect({startIndex:n,endIndex:i,yAxis:d.yAxis,key:o,len:a})}else s.filter((function(t){return t!==o})).map((function(t){var n=e.getRect(t);e.fillRect({startIndex:n.startIndex,endIndex:n.endIndex,yAxis:r+a,key:t,len:n.len})}))},insertRect:function(t){t.el;var e=t.startIndex,n=t.endIndex,i=t.yAxisIndex,r=t.hight,o=t.key,a=i;this.fillRect({key:o,startIndex:e,endIndex:n,yAxis:a,len:r})},drop:function(t,e,n){var i=e.x,r=e.y,o=e.start,a=e.yAxis,s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];if(t){var l=this.parseStyle(t,s),c=l.width,d=l.height,u=o||Math.floor(i/this.minWidth),h=u+Math.round(c/this.minWidth),f=a||Math.round(r/this.yGap),p=Math.round(d/this.yGap);u<0&&(h-=u,u=0),h>this.multiColumn&&(u-=h-this.multiColumn,h=this.multiColumn),f<0&&(f=0),this.insertRect({el:t,startIndex:u,endIndex:h,yAxisIndex:f,hight:p,key:n})}}},X=C,P={components:Object(h["a"])(Object(h["a"])({},i),{},{ItemWrapper:A}),name:"masonryEditor",data:function(){return{styles:[],key:10,Masonry:null}},props:{msg:String},mounted:function(){for(var t=this,e=0;e<this.key;e++)this.randomSize(e);this.$nextTick((function(){t.registerMasonry(t.$refs["container"].$el,{autoSort:!0,columnGap:10,rowGap:10,draggable:!0,scaleable:!0})}))},methods:{randomSize:function(){var t=parseInt(1e4*Math.random()%500)+100+"px",e=parseInt(1e4*Math.random()%500)+100+"px",n="hidden";this.styles.push({width:t,height:e,visibility:n})},add:function(){var t=this;++this.key,this.$nextTick((function(){t.Masonry.update()}))},registerMasonry:function(t,e){this.Masonry=X.create(t,e)}}},$=P,H=Object(I["a"])($,d,u,!1,null,"bdcdb064",null),N=H.exports,z={name:"App",components:{masonryEditor:N}},D=z,F=(n("034f"),Object(I["a"])(D,l,c,!1,null,null,null)),J=F.exports,q=n("7736");s["a"].use(q["a"]);var B=new q["a"].Store({state:{},mutations:{},actions:{},modules:{}});s["a"].config.productionTip=!1,new s["a"]({store:B,render:function(t){return t(J)}}).$mount("#app")},f0a0:function(t,e,n){}});
//# sourceMappingURL=app.a22be948.js.map