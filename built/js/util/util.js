define(["zepto","api","plugins/tool","catch/parabola","template"],function($,e,t,n,o){function a(n){var o=(n.nickName&&n.nickName,t.search.replace(window.location.href,"presenterId",n.Id));if(0==e.environment)var a=window.location.protocol+"//"+window.location.host+"/catchBaby/src/images/iphone.png";else if(1==e.environment)var a=window.location.protocol+"//"+window.location.host+"/Prize/images/iphone.png";i("赚大啦！没花钱夹到IPONE7，还有红包等你来啊！","兄弟姐妹一起来吧，赚到了分我一点就好，哈哈！",o,a)}function i(t,n,o,a){var i=e.getHost().host+"/Wechat/Sdk/GetWeiXinJsSdkConfig",r={url:location.protocol+"//"+location.host+location.pathname+location.search,timestamp:(new Date).valueOf()},s=function(e){if("object"!=typeof e)var e=JSON.parse(e);if(0==e.state)return void console.log(e.msg);var i=["onMenuShareAppMessage","onMenuShareTimeline","onMenuShareQQ","onMenuShareWeibo","hideMenuItems"];wx.config({debug:!1,appId:e.data.appId,timestamp:e.data.timeStamp,nonceStr:e.data.nonceStr,signature:e.data.signature,jsApiList:i}),wx.ready(function(){var e={title:t,desc:n,link:o,imgUrl:a,success:function(){},fail:function(){}};wx.onMenuShareAppMessage(e),wx.onMenuShareTimeline(e),wx.onMenuShareQQ(e),wx.onMenuShareWeibo(e)})};require(["api"],function(e){e.request(i,s,r)})}var r={},s={};r.set=function(e,t){localStorage.setItem(e,t)},r.get=function(e){return localStorage.getItem(e)},r.remove=function(e){localStorage.removeItem(e)},s.get=function(e,t){var n=document.cookie.match(new RegExp("(^| )"+e+"=([^;])*","gi")),o=n?n[0].split(e+"=")[1]:"";return t?o:decodeURIComponent(o)},s.set=function(){};return{store:r,cookie:s,atips_center:function(e,t,n,o){var a=null;a=$("success"==e?"#dollTipSuc":"#dollTipfail"),this.tips_center_ttl&&(this.tips_ele.hide(),clearTimeout(this.tips_center_ttl)),a.find(".js-doll-cont").html(t),a.fadeIn(500,function(){n&&n(),a.attr("disabled","true")}),clearTimeout(this.tips_center_ttl),this.tips_ele=a,this.tips_center_ttl=setTimeout(function(){a.find(".js-doll-cont").html(t),a.fadeOut(500,function(){o&&o()})},1500)},ntips_center:function(e,t,n){$("#tips_center").html(e).fadeIn(500,function(){t&&t()}),clearTimeout(this.tips_center_ttl),this.tips_center_ttl=setTimeout(function(){$("#tips_center").html(e).fadeOut(500,function(){n&&n()})},2e3)},getUserInfo:function(t){t=t||{};var n=t.box||$(".doll-stage"),i={},r=function(e){if(t.checkLogin&&t.checkLogin(e),e.state&&0==e.code&&e.data.isNewUser){var i=e.data.money,r=$(".jsAdd");r.find("b").html(i);var s=$(o("award_bonus_tpl",{recharge:2,bonus:i}));$("body").append(s);var c=$(".panel-bonus-beans"),l=c.offset(),d=c.width(),u=c.height(),f=l.left+d,m=l.top+u;$("#jsBeanImg").css({left:f+"px",top:m+"px"}),setTimeout(function(){$("#jsBeanImg").parent().css("background","none"),$("#jsBeanImg").fadeIn();var t=($(".doll-bean-total"),$(".jsbeanImg"),new Parabola({origin:".panel-bonus-beans",target:".jsBeanTarget",a:-.06,element:"#jsBeanImg",time:200,callback:function(t){r.removeClass("none"),s.fadeOut(),setTimeout(function(){s.remove(),r.addClass("none");var t=e.data.money;dollStage.data("userinfo",e.data),$(".jsBalance").text(t.toFixed(2))},1200)}}));$("#jsBeanImg").addClass("fadeOut"),$(".jsBean01").addClass("beanScale"),t.move()},1e3)}else 1==e.state&&0==e.code?(n.find(".jsBalance").text((1*e.data.money).toFixed(2)),a(e.data),n.data("userinfo",e.data),t.success&&t.success(e)):0==e.state?(n.find(".jsBalance").text("**"),n.data("userinfo",{})):t.error&&t.error(e)};e.getUserInfo(r,i,function(e){console.log("fail in getUserinfo"),t.error&&t.error(e)})},transformCss:function(){function e(e){if(void 0!==o[e])return o[e];if(void 0!==n[e])return o[e]=e,e;for(var t,a=e[0].toUpperCase()+e.slice(1),i=["webkit","moz","Moz","ms","o"],r=0,s=i.length;r<s;r++)if(t=i[r]+a,void 0!==n[t])return o[e]=t,t}function t(e,t,n){return n=n||0,r?"translate3d("+e+", "+t+", "+n+")":"translate("+e+", "+t+")"}var n=document.createElement("p").style,o={},a=e("transform"),i=document.createElement("p");document.body.appendChild(i),i.style[a]="translate3d(1px,1px,1px)";var r=i.style[a];return r=null!=r&&r.length&&"none"!==r,document.body.removeChild(i),{prefix:e,has3d:r,translate:t,transform:e("transform"),transition:e("transition"),bezier:"all {{time}}s cubic-bezier(0.645, 0.045, 0.355, 1.000)"}}(),whichTransitionEvent:function(){var e,t=document.createElement("p"),n={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in n)if(void 0!==t.style[e])return n[e]}(),wxInitShare:i}});