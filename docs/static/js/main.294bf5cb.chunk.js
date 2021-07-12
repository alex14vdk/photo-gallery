(this["webpackJsonpphoto-gallery"]=this["webpackJsonpphoto-gallery"]||[]).push([[0],{26:function(e,t,a){e.exports=a(59)},31:function(e,t,a){},36:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){},54:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(19),l=a.n(r),o=(a(31),a(14)),c=a(6),s=a.n(c),u=a(9),m=a(13),d=a(3),h=a(5),g=a(2),p=a(15);a(60),a(33);p.initializeApp({apiKey:"AIzaSyCWb3EI_lV_lcrgzS3KQuhhTyc1rhv4A-Y",authDomain:"photo-gallery-d03d4.firebaseapp.com",projectId:"photo-gallery-d03d4",storageBucket:"photo-gallery-d03d4.appspot.com",messagingSenderId:"7093717672",appId:"1:7093717672:web:1dd80d077cf0ce3810909d"});var f=p.storage(),b=p.firestore().collection("images"),w={getData:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Function();b.orderBy("timestamp","asc").onSnapshot((function(a){var n=[];a.forEach((function(e){n.push(Object(g.a)(Object(g.a)({},e.data()),{},{id:e.id}))})),e(n),t(!0)}))},addFile:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Function(),n=Date.now()+e.name,i=f.ref(n);i.put(e).then(Object(u.a)(s.a.mark((function e(){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.getDownloadURL();case 2:n=e.sent,r=Date.now(),b.add({url:n,timestamp:r,width:t.width,height:t.height}).then((function(){a(!0)}));case 5:case"end":return e.stop()}}),e)}))))},deleteFile:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Function();setTimeout((function(){b.doc(e).delete().then((function(){f.refFromURL(t).delete().then((function(){a(!0)}))}))}),300)}},v=Object(h.a)("uploadAsFile"),E=Object(h.a)("uploadByUrl"),j=Object(h.a)("getDataFromJson"),O=Object(h.a)("uploadImgFile"),y=function e(t,a){var n=this;Object(m.a)(this,e),this.upload=function(e){x.identifyUploadType(e,(function(){Object(d.a)(n,v)[v](e)}),(function(){Object(d.a)(n,E)[E](e)}))},Object.defineProperty(this,v,{writable:!0,value:function(e){e.map((function(e){x.checkFile(e,Object(u.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("application/json"!==e.type){t.next=9;break}return t.t0=Object(d.a)(n,j),t.t1=j,t.next=5,x.convertFiletoJson(e);case 5:t.t2=t.sent,t.t0[t.t1].call(t.t0,t.t2),t.next=10;break;case 9:Object(d.a)(n,O)[O](e);case 10:case"end":return t.stop()}}),t)}))),(function(e){return n.errorCallback(e)}))}))}}),Object.defineProperty(this,E,{writable:!0,value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};x.checkUrl(e,(function(){var a=x.getFileTypeByUrl(e);fetch(e).then((function(e){return"json"!==a?e.blob():e.json()})).then((function(i){i.name=x.getFileNameByUrl(e),"json"!==a?Object(d.a)(n,O)[O](i,t):Object(d.a)(n,j)[j](i)}))}),(function(e){return n.errorCallback(e)}))}}),Object.defineProperty(this,j,{writable:!0,value:function(e){x.checkJSON(e,(function(){e[x.jsonImageArrName].map((function(e){var t=e.url,a=e.width,i=e.height;Object(d.a)(n,E)[E](t,{width:a,height:i})}))}),(function(e){return n.errorCallback(e)}))}}),Object.defineProperty(this,O,{writable:!0,value:function(){var e=Object(u.a)(s.a.mark((function e(t){var a,i,r=arguments;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!((a=r.length>1&&void 0!==r[1]?r[1]:{}).width>0&&a.height>0)){e.next=5;break}i=a,e.next=8;break;case 5:return e.next=7,x.getImageFileSize(t);case 7:i=e.sent;case 8:w.addFile(t,i,(function(e){return n.successCallback(e)}));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),this.errorCallback=t,this.successCallback=a},x={allowedDropTypes:["image/png","image/jpeg","application/json"],allowedUrlTypes:["json","png","jpg","jpeg"],maxFileSizeInMb:5,jsonImageArrName:"galleryImages",identifyUploadType:function(e,t,a){x.isFile(e[0])?t():a()},checkUrl:function(e,t,a){var n=!1;this.isCorrectUrl(e)||(n="Incorrect URL. Allowed types: ".concat(this.allowedUrlTypes.join(", "))),n?a(n):t()},checkFile:function(e,t,a){var n=!1;this.allowedDropTypes.includes(e.type)?e.size>1024*this.maxFileSizeInMb*1024&&(n="Max File Size: ".concat(this.maxFileSizeInMb,"mb")):n="Allowed types: ".concat(this.allowedUrlTypes.join(", ")),n?a(n):t()},checkJSON:function(e,t,a){var n=!1;this.isCorrectJsonFormat(e)||(n="Incorrect JSON Format"),n?a(n):t()},getImageFileSize:function(e){var t=new Image,a=(window.URL||window.webkitURL).createObjectURL(e),n=new Promise((function(e,a){t.onload=function(){var a=t.naturalWidth,n=t.naturalHeight;e({width:a,height:n})},t.onerror=a}));return t.src=a,n},convertFiletoJson:function(e){var t=new FileReader;return new Promise((function(a,n){t.onload=function(e){var t=e.target.result,n=JSON.parse(t);a(n)},t.onerror=n,t.readAsText(e)}))},isCorrectJsonFormat:function(e){if(e[this.jsonImageArrName].length&&e[this.jsonImageArrName][0].width>0&&e[this.jsonImageArrName][0].height>0&&e[this.jsonImageArrName][0].url)return!0},isFile:function(e){if("object"==typeof e&&e.name&&e.size>0)return!0},isCorrectUrl:function(e){var t=new RegExp(this.allowedUrlTypes.join("|"));return new RegExp("(http)?s?:?(//[^\"']*.(?:".concat(t.source,"))"),"i").test(e)},getFileNameByUrl:function(e){return e.substring(e.lastIndexOf("/")+1)},getFileTypeByUrl:function(e){return e.split(/[#?]/)[0].split(".").pop().trim()}},_=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Function(),a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Function(),n=new y(t,a);n.upload(e)},k=(a(36),i.a.createContext()),R=function(){var e=Object(n.useContext)(k),t=e.uploadData,a=e.stopLoading,r=e.errorShow,l=Object(n.useState)(""),c=Object(o.a)(l,2),s=c[0],u=c[1];return i.a.createElement("form",{className:"upload-form"},i.a.createElement("input",{className:"upload-form__element",type:"text",onChange:function(e){return u(e.target.value)},value:s,placeholder:"\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 URL \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u0438\u043b\u0438 json-\u0444\u0430\u0439\u043b \u0441 \u0434\u0430\u043d\u043d\u044b\u043c\u0438"}),i.a.createElement("button",{className:"upload-form__element",onClick:function(e){return function(e){e.preventDefault(),s&&(t(),_(s,r,a)),u("")}(e)}},"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c"))},D=a(25),N=a(20),S=(a(39),Object(h.a)("rowEdit")),T=Object(h.a)("reStyleElements"),F=Object(h.a)("imgOnLoad"),A=Object(h.a)("resetRow"),I=Object(h.a)("getCurMaxRowHeight"),H=function e(t,a){Object(m.a)(this,e),this.init=function(){var e=this,t=this.gallery.querySelectorAll(this.selectorElement);this.gallery.classList.add("flexible-gallery"),this.maxRowHeight=Object(d.a)(this,I)[I](this.allGalleryWidth);var a=this.preparedSizing;this.preparedSizing||(a=Object(N.a)(t)),a.map((function(a,n){t[n].classList.add("flexible-gallery__item");var i=a;e.preparedSizing||(i=a.querySelectorAll("img")[0]);var r=i.width/i.height;e.preparedSizing||(r=i.naturalWidth/i.naturalHeight),e.row.widthWithoutMargin=e.allGalleryWidth-(e.row.elements.length-1)*e.marginElement-e.marginElement,e.row.elements.push(i),e.row.ratio+=r,e.maxRowHeight>e.row.widthWithoutMargin/e.row.ratio?Object(d.a)(e,S)[S]():t.length-1===n&&e.row.elements.length&&Object(d.a)(e,S)[S](!0)})),Object(d.a)(this,T)[T](t),Object(d.a)(this,F)[F](t)},Object.defineProperty(this,S,{writable:!0,value:function(){var e,t,a=this,n=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=0;this.row.height=n?this.maxRowHeight:this.row.widthWithoutMargin/this.row.ratio,this.row.elements.map((function(r,l){var o=r.width/r.height;a.preparedSizing||(o=r.naturalWidth/r.naturalHeight),n?(e=a.maxRowHeight*o,t=a.maxRowHeight):(e=a.row.height*o,t=a.row.height),a.imgData.push({imgElement:r,imgWidthNew:e,imgHeightNew:t,imgPositionLeft:i,imgPositionTop:a.imgPositionTop}),i+=e+a.marginElement})),this.imgPositionTop+=this.row.height+this.marginElement,this.allGalleryHeight+=this.row.height+this.marginElement,Object(d.a)(this,A)[A]()}}),Object.defineProperty(this,T,{writable:!0,value:function(e){this.gallery.style.height=this.allGalleryHeight+"px",this.imgData.map((function(t,a){e[a].style.width=t.imgWidthNew+"px",e[a].style.height=t.imgHeightNew+"px",e[a].style.left=t.imgPositionLeft+"px",e[a].style.top=t.imgPositionTop+"px"}))}}),Object.defineProperty(this,F,{writable:!0,value:function(e){Object(N.a)(e).map((function(e,t){e.querySelectorAll("img")[0].onload=function(){e.classList.add("flexible-gallery__item--active")}}))}}),Object.defineProperty(this,A,{writable:!0,value:function(){this.row.elements=[],this.row.ratio=0}}),Object.defineProperty(this,I,{writable:!0,value:function(e){for(var t=Object.keys(this.mediaMaxRowHeight),a=0;a<t.length;a++)if(t[a]>e)return this.mediaMaxRowHeight[t[a]];return this.maxRowHeight}}),this.allGalleryWidth=t.clientWidth,this.allGalleryHeight=0,this.maxRowHeight=a.maxRowHeight,this.marginElement=a.marginElement,this.selectorElement=a.selectorElement,this.gallery=t,this.row={elements:[],height:0,ratio:0,widthWithoutMargin:0},this.mediaMaxRowHeight=a.mediaMaxRowHeight,this.imgPositionTop=0,this.preparedSizing=a.preparedSizing,this.imgData=[]};H.defaultParams={maxRowHeight:200,mediaMaxRowHeight:{320:428,480:640},marginElement:10,selectorElement:"a",preparedSizing:!1};var L=function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(t=function(){if(!e)return!1;a=Object.assign(H.defaultParams,a),new H(e,a).init()})(),["resize"].map((function(e){window.addEventListener(e,(function(){t()}))}))},P=(a(40),function(){return i.a.createElement("div",{className:"loading"},i.a.createElement("div",{className:"loading__points-block"},i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null)))}),C=(a(41),a(10)),z=a(24),U=function(e){var t=e.id,a=e.url,r=e.index,l=Object(n.useContext)(k),o=l.deleteData,c=l.selectItem,s=l.stopLoading,u=l.state.selected,m=Object(C.useLightgallery)().openGallery,d=Object(z.a)((function(){c(null)}));return i.a.createElement("div",{className:"images-block__item item",onClick:function(e){return function(e,t){e.preventDefault(),c(t)}(e,t)},ref:d},i.a.createElement(P,null),i.a.createElement("div",{className:"item__select-panel \n                ".concat(u===t?"item__select-panel--active":"")},i.a.createElement("div",{className:"item__delete",onClick:function(){o(),w.deleteFile(t,a,s)}},"\xa0"),i.a.createElement("div",{onClick:function(){m("group",r)},className:"item__show"},"\xa0"),i.a.createElement(C.LightgalleryItem,{group:"group",src:a},"\xa0")),i.a.createElement("img",{src:a,alt:"uploaded pic"}))},M=(a(54),a(55),function(){var e=Object(n.useContext)(k),t=e.uploadData,a=e.getData,r=e.stopLoading,l=e.errorShow,o=e.state,c=o.data,s=o.load,u=Object(n.useRef)(null),m=Object(n.useCallback)((function(e){t(),_(e,l,r)}),[]),d=Object(D.a)({onDrop:m}).getRootProps;return Object(n.useEffect)((function(){return w.getData(a,r)}),[]),Object(n.useEffect)((function(){L(u.current,{preparedSizing:c,selectorElement:"div.images-block__item",marginElement:7,maxRowHeight:240,mediaMaxRowHeight:{320:480,420:568,480:680}})}),[c]),i.a.createElement("div",Object.assign({},d(),{className:"images-block",ref:u}),!c.length&&!s&&i.a.createElement("div",{className:"images-block__drop-area drop-zone"},i.a.createElement("span",{className:"drop-zone__icon"},"\xa0"),i.a.createElement("span",{className:"drop-zone__descr"},"Drag & Drop files here")),i.a.createElement(C.LightgalleryProvider,{lightgallerySettings:{loop:!0,escKey:!0,keyPress:!0}},c&&c.map((function(e,t){return i.a.createElement(U,Object.assign({index:t,key:e.id},e))}))))}),W=(a(56),function(){var e=Object(n.useContext)(k),t=e.errorHide,a=e.state.error,r=a.text,l=a.show;return i.a.createElement("div",{className:"error-block ".concat(l&&"error-block--show")},i.a.createElement("div",{className:"error-block__window"},i.a.createElement("p",{className:"error-block__text"},r),i.a.createElement("button",{className:"error-block__btn",onClick:function(){return t()}},"Ok")))}),G=(a(57),function(){return i.a.createElement("div",{className:"loading-main"},i.a.createElement("div",{className:"loading-main__anim"},i.a.createElement("div",{className:"loading-main__pulse"},i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null))))}),J=(a(58),function(){var e=Object(n.useContext)(k).state.load;return i.a.createElement("main",null,i.a.createElement(R,null),i.a.createElement(M,null),i.a.createElement(W,null),e&&i.a.createElement(G,null))}),B={error:{show:!1,text:""},load:!0,data:[],selected:null},q=function(e,t){switch(t.type){case"ERROR_SHOW":return Object(g.a)(Object(g.a)({},e),{},{load:!1,error:{show:!0,text:t.payload}});case"ERROR_HIDE":return Object(g.a)(Object(g.a)({},e),{},{error:{show:!1,text:B.error.text}});case"DATA_GET":return Object(g.a)(Object(g.a)({},e),{},{data:t.payload,load:!1});case"DATA_UPLOAD":case"DATA_DELETE":return Object(g.a)(Object(g.a)({},e),{},{load:!0});case"STOP_LOADING":return Object(g.a)(Object(g.a)({},e),{},{load:!1});case"SELECT_ITEM":return Object(g.a)(Object(g.a)({},e),{},{selected:t.payload});default:return e}},K=function(e){var t=e.children,a=Object(n.useReducer)(q,B),r=Object(o.a)(a,2),l=r[0],c=r[1];return i.a.createElement(k.Provider,{value:{errorShow:function(e){c({type:"ERROR_SHOW",payload:e})},errorHide:function(){c({type:"ERROR_HIDE"})},stopLoading:function(){c({type:"STOP_LOADING"})},getData:function(e){c({type:"DATA_GET",payload:e})},uploadData:function(){c({type:"DATA_UPLOAD"})},deleteData:function(){c({type:"DATA_DELETE"})},selectItem:function(e){c({type:"SELECT_ITEM",payload:e})},state:l}},t)};l.a.render(i.a.createElement(K,null,i.a.createElement(J,null)),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.294bf5cb.chunk.js.map