require(["zepto","plugins/tabview","lib/iscroll-probe","template","api","plugins/tool"],function($,e,a,o,n,r){function t(e){if(1==e.state){p.changeIndicator(e.indicator,"loading");var a=n.getHost().host+"/PrizeActivity/PrizeActivity/GetRecordList",o={type:e.type,page:e.page,pageSize:e.pageSize},r=function(a){if(a.state){if(a.state){var o=a.data;o.length<e.pageSize?(e.state=-1,p.changeIndicator(e.indicator,"nomore")):(e.state=1,p.changeIndicator(e.indicator,"ready")),e.contentWrapper.append(i(o,e)),e.page++}e.scroll.refresh()}else if(-5==a.code)return window.location.href=n.recordLoginHref};n.request(a,r,o,"get","jsonp")}}function i(e,a){for(var t=[],i=0,s=e.length;i<s;i++){var l=e[i];a.num++,l.sort=a.num;var c="javascript:void(0)",d="",u="";if(l.url){var p=n.getHost().sourceId;c=r.search.replace(l.url,"sourceId",p),d=l.linkName,u="checkBtn"}l.href=c,l.btnText=d,l.btnClass=u;var g=o("list-tmpl",e[i]);t.push(g)}return t.join("")}function s(){return{changeIndicator:function(e,a){switch(a){case"nomore":e.removeClass("loading"),e.removeClass("normal"),e.removeClass("ready"),e.addClass("nomore");break;case"normal":e.removeClass("loading"),e.removeClass("ready"),e.removeClass("nomore"),e.addClass("normal");break;case"ready":e.removeClass("loading"),e.removeClass("normal"),e.removeClass("nomore"),e.addClass("ready");break;case"loading":e.removeClass("nomore"),e.removeClass("normal"),e.removeClass("ready"),e.addClass("loading")}}}}function l(e){var a=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),o=window.location.search.substr(1).match(a);return null!=o?unescape(o[2]):null}var c,d,u,p;$(function(){p=new s,u=[],d=$(".tabview .content");for(var o={probeType:2,scrollbars:!1,click:"knock",fadeScrollbars:!0},r=0;r<3;r++){var i,g=d.children().eq(r),v=g.find(".text_more");i=0==r?1:1==r?3:null;var m={page:1,state:1,pageSize:10,num:0,type:i};m.scroll=new a(g.get(0),o),m.contentWrapper=g.find(".lists"),m.indicator=v,u.push(m),function(e){e.scroll.on("scrollEnd",function(){1==this.directionY&&1==m.state&&t(e)})}(m)}var f=[0,1,2],h=l("index"),h=f[h];h=isNaN(h)?0:h,c=new e(".jstabview",{defaultIndex:h,onchange:function(e,a){1==u[e].page&&t(u[e])}}),t(u[h]),$(".footer .btn").on("click",function(){window.location.href="index.html?sourceId="+n.getHost().sourceId+"&activityId="+n.getHost().activityId}),$(".lists").on("click",".jsguide",function(e){e.stopPropagation(),window.location.href="guide.html"})})});