define(["zepto", "api", "plugins/tool", "catch/parabola", "template"], function($, api, tool, parabola, template) {

    var util = {};
    var store = {};
    var cookie = {};
    store.set = function(key, value) {
        localStorage.setItem(key, value);
    }
    store.get = function(key) {
        return localStorage.getItem(key);
    }
    store.remove = function(key) {
        localStorage.removeItem(key);
    }
    cookie.get = function(e, r) {
        var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;])*", "gi")),
            n = t ? t[0].split(e + "=")[1] : "";
        return r ? n : decodeURIComponent(n)
    }
    cookie.set = function() {

        }
        // 请求

    var request = function(url, success, data, type, dataType, fail) {
            var data = arguments[2] ? arguments[2] : {};
            var type = arguments[3] ? arguments[3] : "post";
            var dataType = arguments[4] ? arguments[4] : "json";
            var fail = arguments[5] ? arguments[5] : function() {};
            data.activityId = activityId;
            $.ajax({
                url: url,
                dataType: dataType,
                jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                //jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
                type: type,
                data: data,
                headers: {
                    accept: "application/json",
                    // guid: getGuid(),
                },
                success: function(res) {
                    if (typeof res != "object") {
                        res = JSON.parse(res);
                    }
                    success(res);
                },
                error: function(err) {
                    fail(err);
                }
            })
        }
        // 是否catch到的提示
    var atips_center = function(type, tip, a, f) {
            var o = null;
            o = $("success" == type ? "#dollTipSuc" : "#dollTipfail"),
                this.tips_center_ttl && (this.tips_ele.hide(),
                    clearTimeout(this.tips_center_ttl)),
                o.find(".js-doll-cont").html(tip),
                o.fadeIn(500, function() { a && a(), o.attr("disabled", "true") }),
                clearTimeout(this.tips_center_ttl),
                this.tips_ele = o,
                this.tips_center_ttl = setTimeout(function() { o.find(".js-doll-cont").html(tip), o.fadeOut(500, function() { f && f() }) }, 1500)
        }
        // 平常的提示，比如网络错误
    var ntips_center = function(t, n, out) {
        $("#tips_center").html(t).fadeIn(500, function() { n && n() }),
            clearTimeout(this.tips_center_ttl),
            this.tips_center_ttl = setTimeout(function() { $("#tips_center").html(t).fadeOut(500, function() { out && out() }) }, 2e3)
    }
    var getUserInfo = function(t) {
        t = t || {};
        var el = t.box || $(".doll-stage");
        var data = {};
        var cb = function(res) {

            t.checkLogin && t.checkLogin(res);
            if (res.state && res.code == 0 && res.data.isNewUser) {
                var n = res.data.money,
                    jsAdd = $(".jsAdd"),
                    o = jsAdd.find("b");
                o.html(n);
                var l = $(template("award_bonus_tpl", { recharge: 2, bonus: n }));
                $("body").append(l);
                var d = $(".panel-bonus-beans"),
                    c = d.offset(),
                    u = d.width(),
                    m = d.height(),
                    h = c.left + u,
                    g = c.top + m;
                $("#jsBeanImg").css({ left: h + "px", top: g + "px" }),
                    setTimeout(function() {
                        $("#jsBeanImg").parent().css("background", "none"),
                            $("#jsBeanImg").fadeIn();
                        var t = ($(".doll-bean-total"),
                            $(".jsbeanImg"),
                            new Parabola({
                                origin: ".panel-bonus-beans",
                                target: ".jsBeanTarget",
                                a: -.06,
                                element: "#jsBeanImg",
                                time: 200,
                                callback: function(t) {
                                    jsAdd.removeClass("none"),
                                        l.fadeOut(),
                                        setTimeout(function() {
                                            l.remove(),
                                                jsAdd.addClass("none");
                                            var t = res.data.money;
                                            dollStage.data("userinfo", res.data);
                                            $(".jsBalance").text(t.toFixed(2));
                                        }, 1200)
                                }
                            }));
                        $("#jsBeanImg").addClass("fadeOut"),
                            $(".jsBean01").addClass("beanScale"),
                            t.move()
                    }, 1e3);
            } else {
                true == res.state && res.code == 0 ? (el.find(".jsBalance").text((1 * res.data.money).toFixed(2)), indexShare(res.data), el.data("userinfo", res.data), t.success && t.success(res)) : false == res.state ? (el.find(".jsBalance").text("**"), el.data("userinfo", {})) : t.error && t.error(res);
            }

        }
        api.getUserInfo(cb, data, function(err) {
            console.log("fail in getUserinfo");
            t.error && t.error(err);
        });
    }
    var transformCss = function() {
        function n(n) {
            if ("undefined" != typeof a[n]) return a[n];
            if ("undefined" != typeof e[n]) return a[n] = n, n;
            for (var t, o = n[0].toUpperCase() + n.slice(1), i = ["webkit", "moz", "Moz", "ms", "o"], r = 0, l = i.length; r < l; r++)
                if (t = i[r] + o, "undefined" != typeof e[t]) return a[n] = t, t
        }

        function t(n, t, e) {
            return e = e || 0, r ? "translate3d(" + n + ", " + t + ", " + e + ")" : "translate(" + n + ", " + t + ")"
        }
        var e = document.createElement("p").style,
            a = {},
            o = n("transform"),
            i = document.createElement("p");
        document.body.appendChild(i), i.style[o] = "translate3d(1px,1px,1px)";
        var r = i.style[o];
        return r = null != r && r.length && "none" !== r, document.body.removeChild(i), { prefix: n, has3d: r, translate: t, transform: n("transform"), transition: n("transition"), bezier: "all {{time}}s cubic-bezier(0.645, 0.045, 0.355, 1.000)" }
    }()
    var whichTransitionEvent = function() {
        var n, t = document.createElement("p"),
            e = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };
        for (n in e)
            if (void 0 !== t.style[n]) return e[n]
    }()


    function indexShare(obj) {
        var title = "赚大啦！没花钱夹到IPONE7，还有红包等你来啊！";
        var name = obj.nickName ? obj.nickName : "朋友";
        var desc = "兄弟姐妹一起来吧，赚到了分我一点就好，哈哈！";
        var link = tool.search.replace(window.location.href, "presenterId", obj.Id);
        if (api.environment == 0) {
            // 测试环境
            var img = window.location.protocol + "//" + window.location.host + "/catchBaby/src/images/iphone.png";
        } else if (api.environment == 1) {
            // 正式环境
            var img = window.location.protocol + "//" + window.location.host + "/Prize/images/iphone.png";
        }

        // var img="./images/iphone.png";
        wxInitShare(title, desc, link, img);
    }
    //初始化自定义分享
    function wxInitShare(shareTitle, shareDesc, shareLink, shareImgUrl) {
        var url = api.getHost().host + "/Wechat/Sdk/GetWeiXinJsSdkConfig";
        var datas = { url: location.protocol + '//' + location.host + location.pathname + location.search, timestamp: new Date().valueOf() };
        var cb = function(data) {
            if (typeof data != 'object') {
                var data = JSON.parse(data);
            }
            if (data.state == false) {
                console.log(data.msg);
                return;
            }
            var apilist = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems'];
            wx.config({
                debug: false,
                appId: data.data['appId'],
                timestamp: data.data['timeStamp'],
                nonceStr: data.data['nonceStr'],
                signature: data.data['signature'],
                jsApiList: apilist
            });
            wx.ready(function() {
                var initData = {
                    title: shareTitle,
                    desc: shareDesc,
                    link: shareLink,
                    imgUrl: shareImgUrl,
                    success: function() {

                    },
                    fail: function() {

                    }
                };
                wx.onMenuShareAppMessage(initData);
                wx.onMenuShareTimeline(initData);
                wx.onMenuShareQQ(initData);
                wx.onMenuShareWeibo(initData);
            });
        };
        require(['api'], function(api) {
            api.request(url, cb, datas);
        })

    }

    util = {
        store: store,
        cookie: cookie,
        atips_center: atips_center,
        ntips_center: ntips_center,
        getUserInfo: getUserInfo,
        transformCss: transformCss,
        whichTransitionEvent: whichTransitionEvent,
        wxInitShare: wxInitShare,
    };
    return util;
})
