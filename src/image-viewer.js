"use strict";angular.module("imageViewerApp",["templates-main"]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!0).hashPrefix("!"),a.when("/",{templateUrl:"../../scripts/imageviewer/app/views/imageViewer.tpl.html",controller:"imageViewerCtrl"}).otherwise({templateUrl:"../../scripts/imageviewer/app/views/imageViewer.tpl.html",controller:"imageViewerCtrl"})}]),angular.module("imageViewerApp").controller("imageViewerCtrl",["$scope","thumbsService","scopeHelper","constants",function(a,b,c,d){a.thumbImages=[],a.imageLoaded=!1,a.thumbDataLoaded=!1,a.selectedThumb={},a.thumbsPerPage=12,a.currentPageIndex=0,a.currentItemIndex=0,a.loadingImageId=d.loadingImageId,a.templateBaseUrl=d.templateBaseUrl,a.getCurrentIndex=function(){return a.thumbImages.indexOf(a.selectedThumb)},a.selectFirstOnPage=function(){var b=a.currentPageIndex*a.thumbsPerPage;a.selectedThumb=a.thumbImages[b],a.selectedThumb.isSelected=!0,a.currentItemIndex=a.getCurrentIndex()},a.gotoPreviousPage=function(){return 0===a.currentPageIndex?!1:(a.selectedThumb.isSelected=!1,a.currentPageIndex=a.currentPageIndex-1,c.safeApply(a,function(){a.selectFirstOnPage()}),!1)},a.gotoNextPage=function(){return a.currentPageIndex>=a.thumbImages.length/a.thumbsPerPage-1?!1:(a.selectedThumb.isSelected=!1,a.currentPageIndex=a.currentPageIndex+1,void c.safeApply(a,function(){a.selectFirstOnPage()}))},a.selectThumb=function(b){a.selectedThumb.isSelected=!1,b.isSelected=!0,c.safeApply(a,function(){a.selectedThumb=b}),a.currentItemIndex=a.getCurrentIndex()},a.thumbClass=function(a){return a.isSelected?"thumb selected":"thumb"},a.gotoPreviousItem=function(){var b=a.getCurrentIndex()-1;b>=0&&((b+1)%a.thumbsPerPage===0&&a.gotoPreviousPage(),a.selectThumbByIndex(b))},a.gotoNextItem=function(){var b=a.getCurrentIndex()+1;b<a.thumbImages.length&&(b%a.thumbsPerPage===0&&a.gotoNextPage(),a.selectThumbByIndex(b))},a.gotoFirstItem=function(){a.currentPageIndex=0,a.selectedThumb.isSelected=!1,a.selectedThumb=a.thumbImages[0],a.selectedThumb.isSelected=!0},a.gotoLastItem=function(){a.currentPageIndex=Math.ceil(a.thumbImages.length/a.thumbsPerPage)-1,a.selectedThumb.isSelected=!1,a.selectedThumb=a.thumbImages[a.thumbImages.length-1],a.selectedThumb.isSelected=!0},a.selectThumbByIndex=function(b){a.selectedThumb.isSelected=!1,a.selectedThumb=a.thumbImages[b],a.selectedThumb.isSelected=!0,a.currentItemIndex=a.getCurrentIndex()},a.setThumbsPerPage=function(b){var c=a.getCurrentIndex()+1,d=Math.ceil(c/b)-1;a.thumbsPerPage=b,a.currentPageIndex=0>d?0:d},a.getTotalPages=function(){return Math.ceil(a.thumbImages.length/a.thumbsPerPage)},a.updateImageSelect=function(){return a.selectThumbByIndex(a.currentItemIndex),a.currentPageIndex=Math.ceil(a.currentItemIndex/a.thumbsPerPage)-1,this.selectedThumb.isSelected=!1,!1},a.loadThumbData=function(b){a.thumbImages=b.data||b||[],a.thumbImages.length>0&&(a.selectedThumb=a.thumbImages[0],a.selectedThumb.isSelected=!0,a.thumbDataLoaded=!0)},a.selectedThumb.imageUrl=d.templateBaseUrl+"images/blank.png",a.supportsDataUri=d.supportsUri,b.getThumbs().then(function(b){a.loadThumbData(b)})}]),angular.module("imageViewerApp").directive("imageViewer",["scopeHelper","$window",function(a,b){return{restrict:"A",link:function(c){var d={188:function(){c.gotoPreviousItem&&a.safeApply(c,function(){c.gotoPreviousItem()})},190:function(){c.gotoPreviousItem&&a.safeApply(c,function(){c.gotoNextItem()})}};angular.element(b).bind("keydown keypress",function(a){d[a.which]&&(d[a.which](),a.preventDefault())})}}}]),angular.module("imageViewerApp").directive("subjectImage",["cssHelper","$window","scopeHelper","constants",function(a,b,c,d){var e=function(a){var c=b.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,d=480>c?65:768>c?90:110,e=a-80;return Math.floor(e/d)};return{restrict:"A",link:function(f,g){var h=g.parent(),i=angular.element('<img id="'+d.loadingImageId+'" class="loading-image" src="'+d.templateBaseUrl+'images/ajax-loader.gif" alt="Loading image ..."/>');f.$watch("selectedThumb.imageUrl",function(b,c){b!==c&&(a.opacity&&(g.css(a.propTransitionDuration,"0s"),g.css({opacity:"0"})),g.css({visibility:"hidden"}),angular.element(document.getElementById(d.loadingImageId)).remove(),angular.element(document.getElementById(d.imageErrorId)).remove(),h.append(i))});var j=function(){f.setThumbsPerPage(e(g.parent()[0].offsetWidth))};c.safeApply(f,j),angular.element(b).bind("resize",function(){c.safeApply(f,j)})}}}]),angular.module("imageViewerApp").directive("thumbItem",function(){return{restrict:"A",link:function(a,b){b.css({visibility:"hidden"}),a.setThumbLoaded=function(){a.$apply(function(){b.css({visibility:"visible"})})},b[0].src&&b[0].complete&&a.setThumbLoaded(),b.bind("load",function(){a.setThumbLoaded()})}}}),angular.module("imageViewerApp").directive("thumbList",function(){return{restrict:"A",link:function(a,b){var c=Hammer(b[0],{transform_always_block:!0}),d=function(b){switch(b.type){case"swipeleft":a.gotoPreviousPage();break;case"swiperight":a.gotoNextPage()}};c.on("swipeleft swiperight",function(a){a.gesture.preventDefault(),a.stopPropagation(),d(a)})}}}),angular.module("imageViewerApp").directive("zoomPanImage",["zoomPan","zoomPanDom","$window","cssHelper","$templateCache","$compile","gestureHandler","scopeHelper","$http","constants","$timeout",function(a,b,c,d,e,f,g,h,i,j,k){var l=function(){var a=document.fullScreenElement||document.msFullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement;return document.fallbackFullscreenElement?!0:!!a},m=function(a){return angular.isDefined(a.preventDefault)?void a.preventDefault():void(a.returnValue=!1)},n=function(a,b){a.addEventListener?(a.addEventListener("mousewheel",b,!1),a.addEventListener("DOMMouseScroll",b,!1)):a.attachEvent("onmousewheel",b)},o=function(a){if(angular.isDefined(a.naturalWidth))return{width:a.naturalWidth,height:a.naturalHeight};var b=new Image;return b.src=a.src,{width:b.width,height:b.height}},p=function(a){var b=window.open("Document image print","_blank"),c='<html><head><style>body {margin:0;padding:0}  #printImage {width:100%;border:none 0px transparent}</style><body onload="window.print()"><img id="printImage" src="'+a+'" alt="Image for printing" /></body></html>';b.document.open(),b.document.write(c),b.document.close(),k(b.close,1e3)};return{restrict:"A",controller:["$scope",function(c){c.imageLoaded=!1,c.btnClicked="",c.imageEl={},c.fullScreenMode=!1,c.fullScreen=function(){l()?c.exitFullscreen():c.launchFullScreen()},c.launchFullScreen=function(){var a=c.parentEl[0],b=a.requestFullscreen||a.msRequestFullscreen||a.mozRequestFullScreen||a.webkitRequestFullscreen||a.msRequestFullscreen;if(angular.isDefined(b))return b.apply(a),c.fullScreenMode=!0,void c.loadImage(c.imageEl);var d=angular.element("<div></div>");d.css({position:"fixed",width:"100%",height:"100%","z-index":"4000",top:"0",left:"0","background-color":"white"}),c.containerParentEl=c.containerEl.parent().parent(),d.append(c.containerEl.parent()),c.overlayEl=d,angular.element(document.body).append(d),document.fallbackFullscreenElement=d[0],c.fullScreenMode=!0,c.loadImage(c.imageEl)},c.exitFullscreen=function(){var a=document.exitFullscreen||document.msExitFullscreen||document.mozCancelFullScreen||document.webkitExitFullscreen;return angular.isDefined(a)?(a.apply(document),void(c.fullScreenMode=!1)):(document.fallbackFullscreenElement=void 0,c.fullScreenMode=!1,c.containerParentEl.append(c.containerEl.parent()),angular.isDefined(c.overlayEl)&&c.overlayEl.remove(),void c.loadImage(c.imageEl))},c.loadImage=function(e){var f=e.parent()[0],g=b.window.width<480?j.defaultViewerMobileHeight:j.defaultViewerHeight,h=b.getWindowOffset(f),i=o(e[0]);b.toggleOpacity({el:e,onOff:!0,isImageLoaded:c.imageLoaded,supportsOpacity:d.opacity}),b.toggleTransitions(e,!0),a.loadImage({naturalWidth:i.width,naturalHeight:i.height,containerWidth:f.offsetWidth,containerHeight:l()?b.window.height-c.containerMargin:g,containerTopMargin:h.top,containerLeftMargin:l()?0:h.left}),b.renderInitialImageDimensions(e),b.renderImage(e,a),b.setContainerHeight(angular.element(f)),c.removeLoadingImage()},c.zoomIn=function(){b.zoomIn()},c.zoomOut=function(){b.zoomOut()},c.up=function(){b.up()},c.right=function(){b.right()},c.down=function(){b.down()},c.left=function(){b.left()},c.reset=function(){c.loadImage(c.imageEl)},c.print=function(){p(c.imageEl[0].src)},c.viewerControlsHandler=function(a){c.btnClicked=a;var b=setInterval(function(){h.safeApply(c,function(){c[a]()}),c.btnClicked!==a&&(clearInterval(b),b=null)},400)},c.removeLoadingImage=function(){angular.element(document.getElementById(j.loadingImageId)).remove()}}],link:function(k,o){b.setWindowDimensions(),k.imageEl=b.el=o,o.css({cursor:"move",display:"block"}),b.setPositionAttribute(o),o.wrap('<div id="zoomWrap"></div>');var p=k.containerEl=o.parent();k.parentEl=k.containerEl.parent(),p.css({position:"relative",overflow:"hidden",zoom:"1"});var q={};i.get(j.templateBaseUrl+"views/viewerControls.tpl.html",{cache:e}).success(function(a){p.parent().prepend(f(a)(k)),q=p.parent().children().eq(0),q.find("span").bind("mouseup mouseout",function(){k.btnClicked=""})}),b.toggleOpacity({el:o,onOff:!1,isImageLoaded:k.imageLoaded,supportsOpacity:d.opacity}),o[0].src&&o[0].complete&&h.safeApply(k,function(){k.loadImage(o),k.imageLoaded=!0}),angular.element(document).bind("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange",function(){h.safeApply(k,function(){k.fullScreenMode=l()})}),o.bind("load",function(){parseInt(o.css("height"),10)>1&&(h.safeApply(k,function(){k.containerMargin=k.containerEl.parent()[0].offsetHeight-k.containerEl[0].offsetHeight,k.loadImage(o),k.imageLoaded=!0}),g.resetScale())}),o.bind("error",function(){k.removeLoadingImage(),o.attr("src",j.templateBaseUrl+"images/blank.png"),document.getElementById(j.imageErrorId)||p.append(angular.element('<p id="'+j.imageErrorId+'">'+j.imageErrorMessage+"</p>"))}),angular.element(c).bind("resize",function(){var a=c.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,d=c.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;(a!==b.window.height||d!==b.window.width)&&(b.setWindowDimensions(),k.loadImage(k.imageEl))});var r={36:function(){h.safeApply(k,function(){k.reset()})},37:function(){h.safeApply(k,function(){k.left()})},38:function(){h.safeApply(k,function(){k.up()})},39:function(){h.safeApply(k,function(){k.right()})},40:function(){h.safeApply(k,function(){k.down()})},187:function(a){a&&h.safeApply(k,function(){k.zoomIn()})},189:function(a){a&&h.safeApply(k,function(){k.zoomOut()})}};if(angular.element(c).bind("keydown keypress",function(a){var b=a.altKey?!0:!1;r[a.which]&&(r[a.which](b),a.preventDefault())}),o.bind("contextmenu",function(){return!1}),n(o[0],function(a){a=window.event||a,m(a);var c=a.pageX,d=a.pageY;angular.isUndefined(c)&&(c=a.clientX||a.x,d=a.clientY||a.y,d+=b.getScrollTop()),b.zoomImage({pageX:c,pageY:d,delta:Math.max(-1,Math.min(1,a.wheelDelta||-a.detail))})}),o.bind("mousedown",function(c){m(c),b.toggleTransitions(o,!1),angular.extend(a.mouseDragging,{active:!0,lastX:c.clientX,lastY:c.clientY})}),o.bind("dblclick",function(a){m(a),b.zoomIn()}),o.bind("mouseup",function(b){m(b),a.mouseDragging.active=!1,k.btnClicked=""}),o.bind("mouseout",function(b){m(b),a.mouseDragging.active=!1}),o.bind("mousemove",function(c){var d=c.clientX,e=c.clientY;m(c),a.mouseDragging.active&&(b.panImage(angular.extend(a.mouseDragging,{x:d,y:e})),angular.extend(a.mouseDragging,{lastX:d,lastY:e}))}),d.touch&&angular.isDefined(window.Hammer)){var s=Hammer(p[0],{transform_always_block:!0,transform_min_scale:1,drag_block_horizontal:!0,drag_block_vertical:!0,drag_min_distance:5});s.on("touch drag dragend transformstart transform transformend doubletap",function(a){g[a.type](a,o,q)})}}}}]),angular.module("imageViewerApp").filter("range",function(){return function(a,b){b=parseInt(b);for(var c=0;b>c;c++)a.push(c);return a}}),angular.module("imageViewerApp").filter("startFrom",function(){return function(a,b){return b=+b,a.slice(b)}}),angular.module("imageViewerApp").provider("constants",function(){var a={animationDuration:.6,animationFrequency:16,scaleUnit:.8,scaleLimit:8,defaultViewerHeight:500,defaultViewerMobileHeight:400,loadingImageId:"loadingImage",imageErrorId:"imageLoadError",imageErrorMessage:"The requested image either could not be found or your network is not currently connected to the internet. Please refresh the page to try again.",templateBaseUrl:"../../scripts/imageviewer/app/",iaid:"D1234",thumbServiceUrl:"http://localhost:81/image/getthumbnaildata/",supportsUri:!0,fakeJsonResponseUrl:"../../scripts/imageviewer/app/scripts/json/test.json",useFakeJsonResponse:!1};return{set:function(b){angular.extend(a,b)},$get:function(){return a}}}),angular.module("imageViewerApp").factory("cssHelper",["Modernizr",function(a){var b=function(a){return a.toString().replace(/([A-Z])/g,function(a,b){return"-"+b.toLowerCase()}).replace(/^ms-/,"-ms-")};return{propTransform:b(a.prefixed("transform")),propTransition:b(a.prefixed("transition")),propTransitionDuration:b(a.prefixed("transitionDuration")),propOrigin:b(a.prefixed("transformOrigin")),propTouchCallout:b(a.prefixed("transform")),isWebkit:"-webkit-transform"===b(a.prefixed("transform"))?!0:!1,csstransforms3d:a.csstransforms3d,csstransitions:a.csstransitions,csstransforms:a.csstransforms,opacity:a.opacity,touch:a.touch}}]),angular.module("imageViewerApp").factory("gestureHandler",["zoomPan","zoomPanDom","$timeout",function(a,b,c){var d=1,e=0,f=!1,g=0;return{resetScale:function(){d=1},touch:function(){},doubletap:function(a){a.gesture.preventDefault(),a.stopPropagation(),b.zoomIn()},dragstart:function(a,c,d){f=!0,b.toggleTransitions(c,!1),b.toggleOpacity(d,!0,!0)},drag:function(c){if(c.gesture.preventDefault(),c.stopPropagation(),!f){var d=c.gesture.deltaX,h=c.gesture.deltaY;a.pan(d-e,h-g),b.renderImage(a),e=d,g=h}},dragend:function(){e=0,g=0},transformstart:function(){d=a.image.scale},transform:function(c){var e=c.gesture.scale,g=1,h=0,i=a.container.width/2;c.gesture.preventDefault(),c.stopPropagation(),f=!0,1>e?(g=-1,h=a.image.scale-d-(d-1)*(e-1)):h=d-a.image.scale+(a.scaleLimit-d)*((e-1)/10),a.zoom({x:i,y:a.container.height/2,delta:g,unit:h}),b.renderImage(a)},transformend:function(){c(function(){f=!1},100)}}}]),angular.module("imageViewerApp").factory("Modernizr",function(){return window.Modernizr||{prefixed:function(a){return a},csstransitions:!0,csstransforms:!0,csstransforms3d:!0,opacity:!0,touch:!1}}),angular.module("imageViewerApp").factory("scopeHelper",function(){return{safeApply:function(a,b){var c=a.$root.$$phase;"$apply"===c||"$digest"===c?b&&angular.isFunction(b)&&b():a.$apply(b)}}}),angular.module("imageViewerApp").service("thumbsService",["$http","constants",function(a,b){return{getThumbs:function(c){return c=c||{},a.get(b.useFakeJsonResponse?b.fakeJsonResponseUrl:b.thumbServiceUrl+b.iaid)}}}]),angular.module("imageViewerApp").factory("zoomPan",["constants",function(a){var b=a.scaleUnit,c=a.scaleLimit,d=function(){return this.container={width:0,height:0,topMargin:0,leftMargin:0},this.image={width:0,height:0,naturalWidth:0,naturalHeight:0,ratio:1,scale:1,left:0,top:0,rotation:0},this.scaleUnit=b,this.scaleLimit=c,this.mouseDragging={active:!1,lastX:0,lastY:0},this.loadImage=function(a){var b=a.naturalWidth||500,c=a.naturalHeight||500,d=a.containerWidth||500,e=a.containerHeight||500,f=a.containerTopMargin||0,g=a.containerLeftMargin||0;angular.extend(this.container,{width:d,height:e,topMargin:f,leftMargin:g}),angular.extend(this.image,{naturalWidth:b,naturalHeight:c,ratio:b/c,scale:1}),this.image.ratio>d/e?angular.extend(this.image,{width:d,height:d/this.image.ratio}):angular.extend(this.image,{width:e*this.image.ratio,height:e}),angular.extend(this.image,{left:.5*(d-this.image.width),top:e>this.image.height?this.image.top=.5*(e-this.image.height):0})},this.pan=function(a,b){var c=50,d=this.image.width,e=this.image.height,f=this.image.left,g=this.image.top,h=this.container.height,i=this.container.width;return this.image.left=c-d>f+a?c-d:f+a+c>i?i-c:f+a,c-e>g+b?void(this.image.top=c-e):void(this.image.top=g+b-c>h?h-c:g+b)},this.zoom=function(a){var b=a.delta||1,c=a.x||0,d=a.y||0,e=a.unit||this.scaleUnit,f=a.limit||this.scaleLimit,g={height:0,width:0,scale:1},h=1;return g.scale=this.image.scale+b*e,g.scale>f||g.scale<1?void 0:(this.image.ratio<this.container.width/this.container.height?(g.width=g.scale*this.container.height*this.image.ratio,g.height=g.width/this.image.ratio):(g.height=g.scale*(this.container.width/this.image.ratio),g.width=g.height*this.image.ratio),h=g.width/this.image.width,angular.extend(this.image,g,{left:c-h*(c-this.image.left),top:this.image.top=d-h*(d-this.image.top)}),!1)},this};return new d}]),angular.module("imageViewerApp").factory("zoomPanDom",["cssHelper","zoomPan","zoomPanStrategy","$window","constants",function(a,b,c,d,e){for(var f=0,g=["webkit","moz","o"],h=!!d.requestAnimationFrame,i=0;i<g.length&&!d.requestAnimationFrame;++i)d.requestAnimationFrame=d[g[i]+"RequestAnimationFrame"],d.cancelAnimationFrame=d[g[i]+"CancelAnimationFrame"]||d[g[i]+"CancelRequestAnimationFrame"],h=!0;d.requestAnimationFrame||(d.requestAnimationFrame=function(a){var b=(new Date).getTime(),c=Math.max(0,16-(b-f)),e=d.setTimeout(function(){a(b+c)},c);return f=b+c,e}),d.cancelAnimationFrame||(d.cancelAnimationFrame=function(a){clearTimeout(a)});var j={el:{},window:{},getScrollTop:function(){var a=document.body,b=document.documentElement;return b=b.clientHeight?b:a,window.pageYOffset||b.scrollTop},setWindowDimensions:function(){this.window.height=d.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,this.window.width=d.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},renderInitialImageDimensions:function(a){a.css({height:b.image.height+"px",width:b.image.width+"px"})},setContainerTopMargin:function(){b.container.topMargin=this.getWindowOffset(this.el.parent()[0]).top},getWindowOffset:function(a){var b={top:0,left:0},c=a&&a.ownerDocument,d=c.documentElement,e=this;return angular.isDefined(a.getBoundingClientRect)&&(b=a.getBoundingClientRect()),{top:b.top-d.clientTop+e.getScrollTop(),left:b.left-d.clientLeft}},linearAnimation:function(b){b=b||{};var c=b.stepSize||0,f=b.startVal||0,g=f+c,i=b.stepCompleteFn||angular.noop,j=f,k=this,l=c*(e.animationFrequency/(600*e.animationDuration));h||a.opacity||(l=2*l),this.isAnimating=!0;var m=function(){return j+=l,j>=g&&c>0||g>=j&&0>c?(l=j-g,d.cancelAnimationFrame(m),k.isAnimating=!1,void i.call(this,l)):(i.call(this,l),void d.requestAnimationFrame(m))};d.requestAnimationFrame(m)},zoomIn:function(){var a=b.container.width/2+b.container.leftMargin;this.zoomImage({pageX:a,pageY:b.container.height/2+b.container.topMargin,delta:1})},zoomOut:function(){var a=b.container.width/2+b.container.leftMargin;this.zoomImage({pageX:a,pageY:b.container.height/2+b.container.topMargin,delta:-1})},panImage:function(c){var d=c.x||0,e=c.y||0,f=c.lastX||0,g=c.lastY||0,h=d-f,i=e-g,j=c.animate||!1;this.toggleTransitions(this.el,j),j&&this.applyTransition(this.el,a.propTransform),b.pan(h,i),this.renderImage()}};return angular.extend(j,c),j}]),angular.module("imageViewerApp").factory("zoomPanStrategy",["zoomPan","cssHelper","constants",function(a,b,c){var d=function(a,b){return b=b||1,Number(a.toFixed(b))},e=function(){return this.isAnimating=!1,this.toggleOpacity=function(a){a=a||{};var b=a.el||{};b.css({visibility:"visible"}),this.applyTransition(b,"opacity"),b.css({opacity:a.onOff?"1":"0"})},this.zoomImage=function(c){c=c||{};var d=c.pageX||0,e=c.pageY||0;this.setContainerTopMargin();var f=d-a.container.leftMargin,g=e-a.container.topMargin;this.toggleTransitions(this.el,!0),this.applyTransition(this.el,b.propTransform),a.zoom({x:f,y:g,delta:c.delta||1}),this.renderImage()},this.renderImage=function(){this.el.css(b.propOrigin,"0% 0%"),b.csstransforms3d?this.el.css(b.propTransform,(a.image.rotation>0?"rotate("+a.image.rotation+"deg)":"")+" translate3d("+d(a.image.left,1)+"px, "+d(a.image.top,1)+"px, 0) scale("+d(a.image.scale,2)+")"):this.el.css(b.propTransform,(a.image.rotation>0?"rotate("+a.image.rotation+"deg)":"")+" translate("+d(a.image.left,1)+"px, "+d(a.image.top,1)+"px) scale("+d(a.image.scale,2)+")")},this.applyTransition=function(a,d){a.css(b.propTransition,d+" "+c.animationDuration+"s linear")},this.toggleTransitions=function(a,d){var e=d?c.animationDuration+"s":"0s";a.css(b.propTransitionDuration,e)},this.setContainerHeight=function(b){b.css({"min-height":a.container.height+"px",height:"auto"})},this.setPositionAttribute=angular.noop,this.up=function(){this.panImage({lastX:0,x:0,lastY:0,y:a.container.height/4,animate:!0})},this.right=function(){this.panImage({lastX:a.container.width/4,x:0,lastY:0,y:0,animate:!0})},this.down=function(){this.panImage({lastX:0,x:0,lastY:a.container.height/4,y:0,animate:!0})},this.left=function(){this.panImage({lastX:0,x:a.container.width/4,lastY:0,y:0,animate:!0})},this},f=function(){return this.isAnimating=!1,this.toggleOpacity=function(a){a=a||{};var b=a.el||{},c=!!a.onOff,d=c?0:1;a.supportsOpacity&&(b.css("opacity")<.5||!a.isImageLoaded?this.linearAnimation({stepSize:1,startVal:0,stepCompleteFn:function(a){d+=a,b.css({opacity:d})}}):c||b.css({opacity:"0"})),b.css({visibility:c?"visible":"hidden"})},this.zoomImage=function(b){b=b||{};var c=b.pageX||0,d=b.pageY||0,e=b.delta||1,f=c-a.container.leftMargin,g=d-a.container.topMargin,h=a.image.scale,i=this,j=0>e?-1:1;this.setContainerTopMargin(),this.isAnimating||this.linearAnimation({stepSize:a.scaleUnit*e,startVal:h,stepCompleteFn:function(b){a.zoom({x:f,y:g,delta:e,unit:j*b}),i.renderImage()}})},this.renderImage=function(){this.el.css({width:Math.ceil(a.image.width)+"px",height:Math.ceil(a.image.height)+"px",left:Math.ceil(a.image.left)+"px",top:Math.ceil(a.image.top)+"px"})},this.applyTransition=angular.noop,this.toggleTransitions=angular.noop,this.setContainerHeight=function(b){b.css({height:a.container.height+"px","min-height":"0"})},this.setPositionAttribute=function(a){a.css({position:"absolute"})},this.up=function(){var b=this;this.linearAnimation({stepSize:a.container.height/4,startVal:0,stepCompleteFn:function(c){a.pan(0,c),b.renderImage(a)}})},this.right=function(){var b=this;this.linearAnimation({stepSize:-a.container.width/4,startVal:0,stepCompleteFn:function(c){a.pan(c,0),b.renderImage(a)}})},this.down=function(){var b=this;this.linearAnimation({stepSize:-a.container.height/4,startVal:0,stepCompleteFn:function(c){a.pan(0,c),b.renderImage(a)}})},this.left=function(){var b=this;this.linearAnimation({stepSize:a.container.width/4,startVal:0,stepCompleteFn:function(c){a.pan(c,0),b.renderImage(a)}})},this};return b.csstransitions&&!b.isWebkit?new e:new f}]),angular.module("templates-main",["views/imageViewer.tpl.html","views/viewerControls.tpl.html"]),angular.module("views/imageViewer.tpl.html",[]).run(["$templateCache",function(a){a.put("views/imageViewer.tpl.html",'<div class="ng-cloak" ng-cloak>\n	<div id="imageViewer" ng-controller="imageViewerCtrl" image-viewer>\n		<img id="subjectImage"  subject-image zoom-pan-image class="subject-image" ng-src="{{selectedThumb.imageUrl}}"  alt="Subject image"/>\n		<a class="first-item item-navigation" title="View first image" ng-click="$event.preventDefault();gotoFirstItem()"></a>\n		<a title="View previous image" class="previous-item item-navigation" ng-click="$event.preventDefault();gotoPreviousItem()"></a>\n		<a title="View next image" class="next-item item-navigation" ng-click="$event.preventDefault();gotoNextItem()"></a>\n		<a class="last-item item-navigation" title="View last image" ng-click="$event.preventDefault();gotoLastItem()"></a>\n		<div class="clr"></div>\n		<div id="thumbPanel" thumb-list>\n			<div class="lipped">\n				<div class="thumb-item" ng-repeat="thumb in thumbImages | startFrom:currentPageIndex*thumbsPerPage | limitTo:thumbsPerPage">\n					<a title="View full size image" href="{{thumb.id}}" ng-click="$event.preventDefault()">\n						<img alt="Thumb item {{thumb.id}}" class="thumb" thumb-item ng-click="selectThumb(thumb)" ng-class="{selected : thumb.isSelected}"  ng-src="{{supportsDataUri ? \'data:image/jpg;base64,\' + thumb.thumbStream : thumb.thumbUrl }}" />\n					</a>\n				</div>\n\n				<span ng-show="thumbDataLoaded && getTotalPages() > 1" class="pagination-label">\n					Image&nbsp;\n                    <select ng-options="n as n + 1 for n in [] | range:thumbImages.length" ng-change="updateImageSelect()" ng-model="currentItemIndex"></select>\n					 &nbsp;of {{thumbImages.length}}\n				</span>\n				<a title="Go to previous page"  ng-click="$event.preventDefault();gotoPreviousPage()" class="prev-page pagination" ng-class="{disabled: thumbImages.length > thumbsPerPage && currentPageIndex === 0 }" ng-hide="thumbImages.length <= thumbsPerPage"></a>\n				<a title="Go to next page" ng-click="$event.preventDefault();gotoNextPage()" class="next-page pagination" ng-hide="currentPageIndex >= thumbImages.length/thumbsPerPage - 1"></a>\n			</div>\n		</div>\n		<img id="{{loadingImageId}}" class="loading-image" ng-src="{{templateBaseUrl}}images/ajax-loader.gif" alt="Loading image ..."  />\n	</div>\n</div>\n')}]),angular.module("views/viewerControls.tpl.html",[]).run(["$templateCache",function(a){a.put("views/viewerControls.tpl.html",'<div id="viewerControls" ng-show="imageLoaded">\n	<div class="controls-wrap">\n		<div class="control-buttons">\n			<span title="Zoom in" class="zoomIn" ng-mousedown="viewerControlsHandler(\'zoomIn\')">Zoom In</span>\n			<span class="zoomOut" title="Zoom out" ng-mousedown="viewerControlsHandler(\'zoomOut\')">Zoom out</span>\n			<span class="left" title="Pan left" ng-mousedown="viewerControlsHandler(\'left\')">Left</span>\n			<span class="right" title="Pan right" ng-mousedown="viewerControlsHandler(\'right\')">Right</span>\n			<span class="up" title="Pan up" ng-mousedown="viewerControlsHandler(\'up\')">Up</span>\n			<span class="down" title="Pan down" ng-mousedown="viewerControlsHandler(\'down\')">Down</span>\n			<span class="reset" title="Reset" ng-mousedown="reset()">Reset</span>\n			<span ng-class="{goFullScreen:!fullScreenMode, exitFullScreen:fullScreenMode}" title="{{fullScreenMode ? \'Exit full screen mode\' : \'Enter full screen mode\'}}"  ng-click="$event.preventDefault();fullScreen()">Fullscreen</span>\n			<span class="print" title="Print" ng-mousedown="print()">Print</span>\n		</div>\n		<!-- <div ng-show="$thumbScope" class="select-image">\n			<input id="selectForDownload" type="checkbox" class="select-for-download" ng-model="$thumbScope.isChecked" />\n			<label for="selectForDownload">Select for download</label>\n		</div> -->\n	</div>\n</div>')}]);