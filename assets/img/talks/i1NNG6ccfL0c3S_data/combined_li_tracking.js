!function(e,t){"object"==typeof exports?module.exports=t():"function"==typeof define&&define.amd?define("liTrackClient",[],t):e.liTrackClient=t()}(this,function(){var e={AJAX_METHOD:"POST",DEFAULT_PAGE_TYPE:"ajax",globalTrackingUrl:null,globalTrackingAppId:"no.app.id",lastDisplayMetric:null,lastActionMetric:null,queue:[],maxQueueSize:1,queueTimeout:1e3,timeoutId:null,csrfToken:"",setProperty:function(e,t){if(t)return void(this[e]=t);var i=this.getMetaTag(e);return i?void(this[e]=i.content):void 0},setTrackingUrl:function(e){this.setProperty("globalTrackingUrl",e)},setAppId:function(e){this.setProperty("globalTrackingAppId",e)},setCsrfToken:function(e){this.setProperty("csrfToken",e)},getCookieString:function(){return document.cookie},getCsrfToken:function(){for(var e="JSESSIONID=",t=this.getCookieString().split(";"),i=0;i<t.length;i++){for(var r=t[i];" "===r.charAt(0);)r=r.substring(1);if(-1!==r.indexOf(e)){var n=r.substring(e.length,r.length);return'"'===n[0]&&'"'===n[n.length-1]&&(n=n.substring(1,n.length-1)),n}}return""},createXmlHttpObject:function(){try{return new XMLHttpRequest}catch(e){}return null},ajax:function(e,t,i){var r;return this.globalTrackingUrl?(r=this.createXmlHttpObject(),void(r&&(r.open(this.AJAX_METHOD,this.globalTrackingUrl,!0),r.withCredentials=!0,r.setRequestHeader("Content-type","application/json"),this.csrfToken?r.setRequestHeader("Csrf-Token",this.csrfToken):r.setRequestHeader("Csrf-Token",this.getCsrfToken()),r.onreadystatechange=function(){return 4===r.readyState?200!==r.status&&304!==r.status?void(i&&i("Request returned "+r.status)):void("function"==typeof t&&t(r)):void 0},4!==r.readyState&&r.send(e)))):void(i&&i("Tracking url is not defined"))},flush:function(){var e=this;this.ajax(JSON.stringify(this.queue),null,e.logError),this.queue=[],clearTimeout(this.timeoutId),this.timeoutId=null},addToQueue:function(e){if(this.queue.push(e),this.queue.length>=this.maxQueueSize)return this.flush();if(!this.timeoutId){var t=this;this.timeoutId=setTimeout(function(){t.flush()},this.queueTimeout)}},track:function(e){return"object"!=typeof e?void this.logError("Track data must be an object"):(e=this.fillMissingData(e),void this.addToQueue(e))},trackWithCallback:function(e,t){var i=this;if("object"!=typeof e)return void this.logError("Track data must be an object");e=this.fillMissingData(e);var r=JSON.stringify(e);this.ajax(r,function(e){"function"==typeof t&&t(null,e.responseText)},function(e){i.logError(e),"function"==typeof t&&t(e)})},getTimestamp:function(){return Math.round((new Date).getTime()/1e3)},getTrackingCode:function(e){return e.eventBody.trackingCode?e.eventBody.trackingCode:"PageViewEvent"===e.eventInfo.eventName?"full"===e.eventBody.pageType?(this.lastDisplayMetric=e.eventBody.requestHeader.pageKey,this.lastActionMetric):(this.lastActionMetric=e.eventBody.requestHeader.pageKey,this.lastDisplayMetric):null},fillMissingData:function(e){if(!e.eventInfo)return this.logError("You must specify eventInfo");if(e.eventInfo.appId||(e.eventInfo.appId=this.globalTrackingAppId),!e.eventBody)return this.logError("You must specify eventBody");e.eventBody.trackingCode=this.getTrackingCode(e);var t=e.eventBody.trackingInfo||{};t.clientTimestamp||(t.clientTimestamp=this.getTimestamp()),e.eventBody.trackingInfo=t;var i=e.eventBody.requestHeader||{};return i.pageKey||(i.pageKey=this.lastDisplayMetric),e.eventBody.requestHeader=i,e},trackPageView:function(e){var t,i,r,n;"string"==typeof e?(t=e,n=this.DEFAULT_PAGE_TYPE):(t=e.pageKey,n=e.pageType||this.DEFAULT_PAGE_TYPE,i=e.trackingCode,r=e.trackingInfo);var o={eventInfo:{eventName:"PageViewEvent"},eventBody:{requestHeader:{pageKey:t},pageType:n}};return i&&(o.eventBody.trackingCode=i),r&&(o.eventBody.trackingInfo=r),t?void this.track(o):this.logError("You must provide a pageKey")},trackUnifiedAction:function(e){if(!e.action)return this.logError("You must provide action");if(!e.sponsoredFlag)return this.logError("You must provide sponsoredFlag");var t={eventInfo:{eventName:"UnifiedActionEvent"},eventBody:e};this.track(t)},trackArticleView:function(e){if(!e.articleId)return this.logError("You must provide articleId");var t={eventInfo:{eventName:"ArticleViewEvent"},eventBody:e};this.track(t)},trackUnifiedImpression:function(e){if(!e.results)return this.logError("You must provide results");var t={eventInfo:{eventName:"UnifiedImpressionEvent"},eventBody:e};this.track(t)},logError:function(e){var t=window.console;t&&t.error&&t.error(e)},getMetaTag:function(e){var t,i,r,n=document.getElementById(e)||document.querySelector&&document.querySelector("meta[name="+e+"]");if(n)return n;for(t=document.getElementsByTagName("meta"),r=t.length,i=0;r>i;i++)if(t[i].getAttribute("name")===e)return t[i];return null},init:function(){this.setTrackingUrl(),this.setAppId()}};return e.init(),e}),function(e){function t(){var e;this.APP_BASE="slideshare.js.tracking",this._bodyDefaults={},r.user&&r.user.id&&(e={header:{applicationViewerUrn:this.getUrn("User",r.user.id)}},this._bodyDefaults=$.extend({},this._bodyDefaults,e)),"undefined"!==o&&(o.setTrackingUrl(),o.setAppId(this.APP_BASE))}var i,r=e.slideshare_object,n=r.utils,o=window.liTrackClient;n&&!n.imports("tracking.TrackingUtils")&&(i={Clip:"urn:li:slideShareClip:",Clipboard:"urn:li:slideShareClipboard:",Guest:"urn:li:slideShareGuest:",LyndaCategory:"urn:li:lyndaCategory:",LyndaCourse:"urn:li:lyndaCourse:",LyndaVideo:"urn:li:lyndaVideo:",LeadCampaign:"urn:li:slideShareLeadCampaign:",Slideshow:"urn:li:slideShareSlideshow:",User:"urn:li:slideShareUser:"},t.prototype={constructor:t,getAppId:function(e){return e?this.APP_BASE+"."+e:this.APP_BASE},recordTrackingEvent:function(e,t,i,r){var n;if(i=$.extend({},this._bodyDefaults,i),!window.liTrackClient)throw new Error("liTrackClient is not initialized");n={eventInfo:{eventName:t,appId:e},eventBody:i},r?o.trackWithCallback(n,r):o.track(n)},generateTrackingID:function(e){var t,i="",n="0000";for(e=e||16,"undefined"!=typeof r&&"undefined"!=typeof r.slideshow&&null!==r.slideshow.id&&(t=parseInt(r.slideshow.id).toString(16).slice(-4),i+=(n+t).slice(-n.length)),null!==cookie("_uv_id")&&(t=parseInt(cookie("_uv_id")).toString(16).slice(-4),i+=(n+t).slice(-n.length)),e-=i.length;e--;)i+=Math.floor(16*Math.random()).toString(16).toUpperCase();return i},getUrn:function(e,t){return t?i[e]?i[e]+t:"urn:li:slideShare"+e+":"+t:null},getPageKey:function(){var e=/^pagekey-(.+)$/.exec(document.body.id);if(e)return e[1]},getSlideShareGuest:function(){return cookie("_uv_id")}},n.exports("tracking.TrackingUtils",t))}(window),function(e){function t(e){var t=slideshare_object.utils.imports("tracking.TrackingUtils");this.utils=new t,this.pageKey=this.utils.getPageKey(),this.trackingId=e.trackingId||this.utils.generateTrackingID(),this.referrerParam=e.referrerParam||"rftp",this.userIsOwner=e.userIsOwner,this.appId=e.appId||this.utils.getAppId("clipping"),this.bodyDefaults={clippingSessionId:this.trackingId,requestHeader:{pageKey:this.pageKey,path:window.document.location.pathname,userAgent:navigator&&navigator.userAgent,referer:document.referrer}}}var i={single:"SINGLE",bulk:"BATCH"},r={add:"ADD",copy:"COPY",reclip:"RECLIP",move:"MOVE",remove:"REMOVE",reorder:"REORDER"},n={SlideShareClipActionEvent:"SlideShareClipActionEvent",SlideShareClipOrganizeActionEvent:"SlideShareClipOrganizeActionEvent",SlideShareClipboardActionEvent:"SlideShareClipboardActionEvent",SlideShareClippingClickEvent:"SlideShareClippingClickEvent",SlideShareClippingShareEvent:"SlideShareClippingShareEvent",SlideShareClippingViewEvent:"SlideShareClippingViewEvent"},o={addSingleClip:{quantityType:i.single,actionType:r.add},copySingleClip:{quantityType:i.single,actionType:r.copy},reclipSingleClip:{quantityType:i.single,actionType:r.reclip},moveSingleClip:{quantityType:i.single,actionType:r.move},removeSingleClip:{quantityType:i.single,actionType:r.remove},reorderSingleClip:{quantityType:i.single,actionType:r.reorder},addMultipleClips:{quantityType:i.bulk,actionType:r.add},copyMultipleClips:{quantityType:i.bulk,actionType:r.copy},reclipMultipleClips:{quantityType:i.bulk,actionType:r.reclip},moveMultipleClips:{quantityType:i.bulk,actionType:r.move},removeMultipleClips:{quantityType:i.bulk,actionType:r.remove},reorderMultipleClips:{quantityType:i.bulk,actionType:r.reorder}},a={clickClipButton:"CLIP",clickViewToGrid:"CHANGE_VIEW_TO_GRID",clickViewToList:"CHANGE_VIEW_TO_LIST",clickTopNavMyClipboards:"CLIPBOARDS_NAV",clickClipThumbnail:"CLIP_THUMBNAIL",clickProfileMyClipboards:"PROFILE_DROPDOWN",clickShareClip:"SHARE_CLIP",clickShareClipboard:"SHARE_CLIPBOARD",clickSharePrompt:"SHARE_PROMPT_CTA",clickSlideviewTopClipboardsOpen:"SLIDEVIEW_TOP_CLIPBOARDS_OPEN",clickTopClipboardsClipboardOwner:"TOP_CLIPBOARDS_MODAL_CLIPBOARD_OWNER",clickTopClipboardsClipboardThumb:"TOP_CLIPBOARDS_MODAL_CLIPBOARD_THUMBNAIL",clickTopClipboardsClipboardTitle:"TOP_CLIPBOARDS_MODAL_CLIPBOARD_TITLE"},l={clip:"Clip",clipboard:"Clipboard",slideshow:"Slideshow"},s={directlink:"DIRECT_LINK",email:"EMAIL",facebook:"FACEBOOK",linkedin:"LINKEDIN",pinterest:"PINTEREST",twitter:"TWITTER"};t.prototype.track=function(e,t){var t=$.extend({},this.bodyDefaults,t);this.utils.recordTrackingEvent(this.appId,e,t)},t.prototype.clipAction=function(e){var t=e.clip;return this.track(n.SlideShareClipActionEvent,{actionType:e.actionType,clipboardUrn:this.utils.getUrn(l.clipboard,e.clipboardId||e.clipboard_id),clipUrn:this.utils.getUrn(l.clip,t.id),slideshowUrn:this.utils.getUrn(l.slideshow,t.slideshowId||t.slideshow_id),position:t.position})},t.prototype.createClip=function(e,t){return this.clipAction({actionType:"CREATE",clip:e,clipboardId:t})},t.prototype.deleteClip=function(e){return this.clipAction({actionType:"DELETE",clip:e})},t.prototype.clipboardAction=function(e){var t=e.clipboard;return this.track(n.SlideShareClipboardActionEvent,{actionType:e.actionType,clipboardUrn:this.utils.getUrn(l.clipboard,t.id),title:t.title,isPrivate:t["private"]})},t.prototype.createClipboard=function(e){return this.clipboardAction({actionType:"CREATE",clipboard:e})},t.prototype.deleteClipboard=function(e){return this.clipboardAction({actionType:"DELETE",clipboard:e})},t.prototype.editClipboard=function(e,t){var i={id:e.id};return Object.keys(e).forEach(function(r){e[r]!==t[r]&&(i[r]=e[r])}),this.clipboardAction({actionType:"EDIT",clipboard:i})},t.prototype.pageView=function(e){return this.track(n.SlideShareClippingViewEvent,{clipboardUrn:this.utils.getUrn(l.clipboard,e),isOwner:this.userIsOwner,referrerType:(window.getUrlVar(this.referrerParam)||"").toUpperCase()})},t.prototype.clipOrganizeAction=function(e){return this.track(n.SlideShareClipOrganizeActionEvent,{actionType:e.actionType,quantityType:e.quantityType,clipUrns:e.clipIds.map(this.utils.getUrn.bind(null,l.clip)),sourceClipboardUrn:this.utils.getUrn(l.clipboard,e.sourceClipboardId),targetClipboardUrn:this.utils.getUrn(l.clipboard,e.targetClipboardId)})},[l.clip,l.clipboard].forEach(function(e){t.prototype["share"+e]=function(t,i){return this.track(n.SlideShareClippingShareEvent,{entityUrn:this.utils.getUrn(e,t),shareType:s[i]||i,isOwner:this.userIsOwner})}}),Object.keys(o).forEach(function(e){var i=o[e];t.prototype[e]=function(e,t,r){return this.clipOrganizeAction({actionType:i.actionType,quantityType:i.quantityType,clipIds:$.isArray(e)?e:[e],sourceClipboardId:t,targetClipboardId:r})}}),Object.keys(a).forEach(function(e){var i=a[e];t.prototype[e]=function(e,t){return this.track(n.SlideShareClippingClickEvent,{actionType:i,clipUrn:this.utils.getUrn(l.clip,t),clipboardUrn:this.utils.getUrn(l.clipboard,e),isOwner:this.userIsOwner})}}),e.ClippingTracker=t}(window.slideshare_object);