define(['zepto', 'util', "catch/roll", "catch/parabola", "catch/task", "template", "api", "plugins/tool"], function($, util, roll, parabola, task, template, api, tool) {
    var dollFt, dollStage, jsBetBtn;
    var trigger = "click";
    var bet = {};
    var tips = { onebet: null, currentChip: null, lotid: null, tipIndex: 1, tip: { 1: "差一点点，继续加油！", 2: "别灰心，再来一次！", 3: "换个姿势，感觉马上要中啦！" }, tipno: { 1: "没夹中，看准时机哦", 2: "没夹中，不扣欢乐豆呦" }, tipnoIndex: 1, randInt: 5 };

    function getEl() {
        dollFt = $(".doll-ft");
        dollStage = $(".doll-stage");
        jsBetBtn = $(".jsBetBtn")
    }

    function beginBet() {
        dollFt.on(trigger, ".jsBetBtn", beginClick);
        dollFt.on(trigger, ".bet-bean-item", beanItemClick);
        roll.getRank(function() {
            var index = util.store.get("gameType");
            var items = $(".doll-bet-bean").children(".bet-bean-item");
            if (index === undefined || index === null || index > items.length - 1) {
                index = 0;
            }
            items.eq(index).trigger(trigger);
        });

    }

    function pay() {

    }
    // 点击类型
    function beanItemClick() {
        if (jsBetBtn.attr("disabled")) return !1;
        var el = $(this);
        if (el.hasClass("current")) return !1;
        el.siblings().removeClass("current"),
            el.addClass("current"),
            tips.onebet = el.attr("data-money"),
            tips.currentChip = el;
        var index = el.index(),
            bodyEl = $("body"),
            jsTitLevel = $("#jsTitLevel");
        1 == index ? (bodyEl.attr("id", "doll-middle"), jsTitLevel.attr("class", "tit tit-middle")) : 2 == index ? (jsTitLevel.attr("class", "tit tit-high"), bodyEl.attr("id", "doll-high")) : (jsTitLevel.attr("class", "tit tit-primary"), bodyEl.removeAttr("id")), util.store.set("gameType", index), roll.rollProducts()
    }
    // 点击开始
    function beginClick() {
        var btn = $(this);
        var dollStage = $(".doll-stage");
        if (btn.attr("disabled")) {
            return !1;
        }
        btn.attr("disabled", "true");
        var dollMachine = $(".doll-machine"),
            machineBar = ($(".machine-handle"), $(".machine-bar")),
            machineBarWrap = (machineBar.get(0), $(".machine-bar-wrap")),
            d_machineBarWrap = machineBarWrap.get(0),
            leftArm = $(".machine-arm-left"),
            rightArm = $(".machine-arm-right"),
            _ = (dollMachine.css("height"), util.transformCss),
            event = util.whichTransitionEvent,
            B = null,
            jsHoldSuc = $(".jsHoldSuc"),
            d_jsHoldSuc = jsHoldSuc.get(0),
            armHeight = leftArm.height();
        if ($("#largeDollList").children().length < 6) return btn.removeAttr("disabled"), false;
        if (!tips.currentChip) return btn.removeAttr("disabled"), !1;
        // 判断是否登录
        if (util.cookie.get("IsLogin") != 1) return window.location.href = api.loginHref, false;
        // 判断是否够钱
        if ((dollStage.data("userinfo").money / 1 || 0) < tips.currentChip.attr("data-money")) {
            askEgg();
            return false;
        }
        var q = _.bezier,
            U = "all {{time}}s cubic-bezier(0.215, 0.61, 0.355, 1)",
            H = "all {{time}}s cubic-bezier(0.0, 0.0, 1.0, 1.0)",
            R = "all {{time}}s cubic-bezier(0.455, 0.03, 0.515, 0.955)",
            D = .8,
            O = 1.2,
            P = 1.2,
            S = .8;
        d_machineBarWrap.style[_.transition] = U.replace("{{time}}", D), d_machineBarWrap.style.height = "100%", leftArm.addClass("swing-left"), rightArm.addClass("swing-right");
        var largeLiItem = $(".doll-box").eq(0).find("li");
        // parseFloat(c.css("height"));
        event ? machineBarWrap.one(event, armCatch) : (clearTimeout(B), B = setTimeout(armCatch, 1e3 * D));

        function armCatch() {
            var f = null;
            judgeCatch(), f ? catchSuccess() : catchFail()
                // o判断是否抓取到商品
                // 抓取到商品执行d，发送请求询问中奖几率；抓不到执行c，给出安慰提示
            function judgeCatch() {
                var e = leftArm.offset(),
                    t = rightArm.offset(),
                    a = t.left + t.width;
                for (var n = 0; n < largeLiItem.length; n++) {
                    var i = largeLiItem.eq(n).find(".doll"),
                        r = i.offset(),
                        o = r.left + r.width,
                        l = r.top;
                    if (r.left + 20 >= e.left && o - 20 <= a) {
                        var s = leftArm.offset().top;
                        if (l < armHeight + s) {
                            f = i.parent(".doll-item");
                            break
                        }
                    }
                }
            }

            function catchSuccess() {
                function awardSuccess(data) {
                    function goodShrink() {
                        function flyToBox() {
                            var jsHoldFail = $(".jsHoldFail"),
                                goodItemHold = (jsHoldFail.get(0), jsHoldSuc.html());
                            jsHoldSuc.empty().attr("style", ""), jsHoldFail.html(goodItemHold), d_jsHoldSuc.style[_.transition] = "";
                            var u = new Parabola({
                                origin: ".jsHoldFail",
                                target: ".jsTarget",
                                scale: 10,
                                a: -.009,
                                element: ".jsHoldFail",
                                time: 800,
                                callback: function(c) {
                                    // 商品飞进奖品箱后的回调
                                    if (jsHoldFail.empty().attr("style", ""), 2 != ptype || ($(".reddot").show(), util.store.set("dollOrder", 1), $(".jsRecordItem").attr("href", "record.html?index=1")), jsHoldSuc.attr("style", "").empty(), "1" == ptype) {
                                        util.atips_center("success", "恭喜你！获得" + data.money + "欢乐豆", function() {
                                            var jsAdd = $(".jsAdd"),
                                                a = jsAdd.find("b"),
                                                n = data.money;
                                            a.html(n), jsAdd.removeClass("none"), window.setTimeout(function() { jsAdd.addClass("none"), jsBetBtn.removeAttr("disabled") }, 2e3)
                                        });
                                        var money = 1 * dollStage.data("userinfo").money + data.money;
                                        dollStage.data("userinfo").money = money, $(".jsBalance").text(money.toFixed(2))
                                    } else {
                                        // 如果商品类型为
                                        var awardSuccessTip = $(template("panelSuccTpl", { ptype: ptype, price: price, text: pname }));
                                        $("body").append(awardSuccessTip),
                                            awardSuccessTip.on(trigger, ".jsCheck", function() {
                                                window.setTimeout(function() {
                                                    var checkLocation, orderid = data.orderid;
                                                    checkLocation = 2 == ptype ? "record.html?index=1" : "/prizeclaw/todetail?orderid=" + orderid, window.location = checkLocation
                                                }, 500)
                                            }),
                                            awardSuccessTip.on(trigger, ".jsContinue", function() {
                                                awardSuccessTip.remove(), util.atips_center("success", "奖品30日内兑换有效哦~")
                                            }),
                                            awardSuccessTip.on(trigger, ".jsCancle", function() {
                                                awardSuccessTip.remove(), util.atips_center("success", "奖品30日内兑换有效哦~")
                                            }),
                                            awardSuccessTip.on(trigger, ".jsBackRecharge", function() {
                                                var rechargeBtn = $(this);
                                                if (rechargeBtn.attr("disabled")) return !1;
                                                // 检查是否登录
                                                // if (r.attr("disabled", 1), !a.cookie.get("Q")) return s.login(function() { s.getUser({ success: function() { r.trigger(b) } }) }), void r.removeAttr("disabled");
                                                var l = {
                                                    el: rechargeBtn,
                                                    data: { recordid: data.recordid, type: 3 },
                                                    success: function(a) {
                                                        // 兑换成功的回调
                                                        $(".reddot").hide(),
                                                            util.store.remove("dollOrder"),
                                                            $(".jsRecordItem").attr("href", "record.html?index=1");
                                                        var n = data.money,
                                                            jsAdd = $(".jsAdd"),
                                                            o = jsAdd.find("b");
                                                        o.html(n);
                                                        var l = $(template("award_bonus_tpl", { recharge: 1, bonus: n }));
                                                        awardSuccessTip.remove(),
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
                                                                                    var t = 1 * dollStage.data("userinfo").money + data.money;
                                                                                    dollStage.data("userinfo").money = t,
                                                                                        $(".jsBalance").text(t.toFixed(2)),
                                                                                        util.getUserInfo();
                                                                                }, 1200)
                                                                        }
                                                                    }));
                                                                $("#jsBeanImg").addClass("fadeOut"),
                                                                    $(".jsBean01").addClass("beanScale"),
                                                                    t.move()
                                                            }, 1e3)
                                                    },
                                                    fail: function(e) { util.ntips_center(re.msg || n.tips_text.net_err) }
                                                };
                                                exchange(l)
                                            }),
                                            jsBetBtn.removeAttr("disabled")
                                    }
                                    util.getUserInfo(),
                                        task.checkTask()
                                }
                            });
                            u.move()
                        }
                        dollStage.data("userinfo").money / 1 >= stake && (dollStage.data("userinfo").money -= stake,
                                $(".jsBalance").text((dollStage.data("userinfo").money / 1).toFixed(2))),
                            task.add(),
                            jsHoldSuc.find(".doll").attr("class", "doll doll-cy"),
                            $(".machine-arm-left").removeClass("swing-left"),
                            $(".machine-arm-right").removeClass("swing-right");
                        var dollItem = jsHoldSuc.find(".doll-item"),
                            d_dollItem = dollItem.get(0);
                        d_dollItem.style[_.transform] = "scale(.1)", d_dollItem.style[_.transition] = R.replace("{{time}}", S),
                            event ? dollItem.one(event, flyToBox) : (clearTimeout(I), I = setTimeout(flyToBox, 1e3 * S))
                    }
                    // 中奖成功
                    M = (new Date).getTime(),
                        Q = M - L;
                    var c = 1e3 * O - Q;
                    if (c = c > 30 ? c : 0, event) {
                        if (c > 0) return machineBarWrap.one(event, goodShrink), !1;
                        goodShrink()
                    } else clearTimeout(w), w = setTimeout(goodShrink, c)
                }
                //中奖失败，调用的函数
                function awardFail(t) {

                    function getUserInfoAgain() {
                        // 重新获取用户信息
                        function t() {
                            dollExit.addClass("none"),
                                jsHoldFail.empty().attr("style", ""),
                                util.getUserInfo(),
                                task.checkTask(),
                                jsBetBtn.removeAttr("disabled");
                        }

                        dollStage.data("userinfo").money / 1 >= stake && (dollStage.data("userinfo").money -= stake,
                                $(".jsBalance").text((dollStage.data("userinfo").money / 1).toFixed(2))),
                            task.add();
                        var holdFailContHeight = $(".doll-hold-fail-cont").height();
                        jsHoldSuc.find(".doll").attr("class", "doll doll-cry");
                        var jsHoldFail = $(".jsHoldFail"),
                            d_jsHoldFail = jsHoldFail.get(0),
                            dollExit = $(".doll-exit"),
                            goodItemHold = jsHoldSuc.html();
                        jsHoldFail.html(goodItemHold),
                            dollExit.removeClass("none"),
                            jsHoldSuc.empty(),
                            jsHoldSuc.attr("style", ""),
                            d_jsHoldFail.style.top = holdFailContHeight + "px",
                            d_jsHoldFail.style[_.transition] = q.replace("{{time}}", P),
                            tips.tipIndex || (tips.tipIndex = 1),
                            util.atips_center("fail", tips.tip[tips.tipIndex]),
                            tips.tipIndex < 3 ? tips.tipIndex++ : 3 == tips.tipIndex && (tips.tipIndex = 1),
                            $(".machine-arm-left").removeClass("swing-left"),
                            $(".machine-arm-right").removeClass("swing-right"),
                            event ? jsHoldFail.one(event, t) : (clearTimeout(T), T = setTimeout(t, 1e3 * P))
                    }
                    //中奖失败
                    M = (new Date).getTime(),
                        Q = M - L;
                    var n = 1e3 * O - Q;
                    if (n = n > 30 ? n : 0, event) {
                        if (n > 0) return machineBarWrap.one(event, getUserInfoAgain), !1;
                        getUserInfoAgain()
                    } else clearTimeout(C), C = setTimeout(getUserInfoAgain, n)
                }

                function netTip(t) { util.ntips_center("网络不通畅，请刷新页面后重试") }
                jsHoldSuc.empty().append(f.clone(!0)), f.css("visibility", "hidden"), d_machineBarWrap.style[_.transition] = H.replace("{{time}}", O), d_machineBarWrap.style.height = "0.96rem";
                var v = $("#largeDollList");
                v.data("doll", f);
                var pid = f.attr("data-pid"),
                    ptype = f.attr("data-ptype"),
                    pname = f.attr("data-pname"),
                    price = f.attr("data-price"),
                    stake = tips.currentChip.attr("data-money"),
                    data = { money: stake, pid: pid, ptype: ptype },
                    L = (new Date).getTime(),
                    M = 0,
                    Q = 0;
                requestAward(data, awardSuccess, awardFail, netTip)
                    // setTimeout(function(){

                // },5000)
                // 返回code==11011执行o抓取成功,返回11012执行d抓取失败,返回其他执行c网络不通畅
            }

            function catchFail() {
                $(".machine-arm-left").removeClass("swing-left"),
                    $(".machine-arm-right").removeClass("swing-right"),
                    tips.tipnoIndex || (tips.tipnoIndex = 1),
                    util.atips_center("fail", tips.tipno[tips.tipnoIndex]),
                    tips.tipnoIndex < 2 ? tips.tipnoIndex++ : 2 == tips.tipnoIndex && (tips.tipnoIndex = 1),
                    d_machineBarWrap.style[_.transition] = U.replace("{{time}}", P),
                    d_machineBarWrap.style.height = "0.96rem",
                    event ? machineBarWrap.one(event, function() { jsBetBtn.removeAttr("disabled") }) : (clearTimeout(j), j = setTimeout(function() { jsBetBtn.removeAttr("disabled") }, 1e3 * P))
            }
        }
    }


    // 询问中奖率
    function requestAward(data, awardSuccess, awardFail, netFail) {
        var data = { pid: data.pid, money: data.money, ptype: data.ptype };
        var success = function(res) {
            // var percent=20;
            // var ran= Math.random()*1;
            // if(data.ptype==1){
            //     awardSuccess&&awardSuccess(res.data);
            //     return;
            // }
            // ran<=percent/100?awardSuccess&&awardSuccess(res.data):awardFail&&awardFail(res.data);
            if (!res.state && res.code == -5) {
                util.ntips_center("您未登录，正准备跳到登录页面！", function() {}, function() {
                    window.location.href = api.loginHref;
                })
                return;
            } else if (!res.state && res.code == -6) {
                util.ntips_center("活动已暂停,请刷新页面！");
            } else if (!res.state) {
                util.ntips_center(res.msg);
                return;
            }
            res.data.get == true ? awardSuccess && awardSuccess(res.data) : awardFail && awardFail(res.data);
        }
        var fail = function(e, t) {
            netFail && netFail(e, t);
        }
        api.requestAward(success, data, fail);
        // e.code==11011，抓取成功
        // e.code==11012 抓取失败
        // e.code==其他 网络不通畅，请刷新页面后重试
    }

    function exchange(t) {
        var a = t.el;
        var cb = function(res) {
            if ("9999" == res.code) t.success && t.success(res);
            else {
                // if ("1003" == e.code) return s.login(function() { s.getUser({ success: function() { a.trigger(b) } }) }), !1;
                // util.ntips_center(e.msg || n.tips_text.net_err)
            }
        }
        var fail = function(err) {
            console.log(err);
            a.removeClass("disabled");
        }
        api.exchange(cb, t.data, fail)
            // $.ajax({ url: x.backRechargeApi, dataType: "json", type: "post", data: t.data }).done(function(e) {
            //     if ("9999" == e.code) t.success && t.success(e);
            //     else {
            //         if ("1003" == e.code) return s.login(function() { s.getUser({ success: function() { a.trigger(b) } }) }), !1;
            //         util.ntips_center(e.msg || n.tips_text.net_err)
            //     }
            // }).fail(function(e, t) { 
            //     util.ntips_center(n.tips_text.net_err) }).always(function() { a.removeAttr("disabled")
            //      })
    }
    // 询问是否砸蛋
    function askEgg() {
        var success = function(res) {
            if (!res.state && res.code == -5) {
                util.ntips_center("您未登录，正准备跳到登录页面！");
                window.location.href = api.loginHref;
                return;
            } else if (!res.state) {
                util.ntips_center(res.msg);
                return;
            }
            if (res.data.canGetExtraBean) {
                zadan();
                return;
            }
            // 跳到充值页面
            util.ntips_center("余额不足,准备跳到充值页面！", function() {}, function() {
                window.location.href = tool.search.replace(api.rechargeHref, "beanCount", $("#jsdollbetbean").children(".current").attr("data-money")), btn.removeAttr("disabled");
            })
        }
        api.askEgg(success);
    }
    // 砸蛋
    function zadan() {
        var eggContainer = $($("#eggContainer_tpl").html());
        eggContainer.find(".jsEggContainer").html(template("egg_tpl", { type: 0, data: [] }));
        $("body").append(eggContainer);
        var zhuizi = $(".zhuizi");
        var d_zhuizi = zhuizi.get(0);
        var content = $(".zadan .content");
        var zhuiziWidth = zhuizi.width();
        var contentWidth = content.width();
        var liWidth = parseInt(content.find("li").eq(0).width());
        var minLeft = zhuiziWidth / 3;
        var maxLeft = contentWidth - minLeft;
        var interval = null;
        var speed = 40;
        var step = zhuiziWidth / 18;
        var index = parseInt(Math.random() * 3);
        console.log(index);
        var ranDistance = parseInt(Math.random() * liWidth * 5) + liWidth;
        var distance = 0;
        $(".jsZadanBtn").on(trigger, move);
        // move();

        function move() {
            if ($(".jsZadanBtn").attr("disabled") == "true") return;
            $(".jsZadanBtn").attr("disabled", "true");
            if (interval) {
                clearInterval(interval);
            }
            var allArr = [];
            for (var i = 0; i < 3; i++) {
                var arr = [];
                arr.push((i + 0) * liWidth);
                arr.push((i + 2 / 3) * liWidth);
                allArr.push(arr);
            }
            var interval = setInterval(function() {
                var left = parseInt(zhuizi.css("left"));
                if (left <= minLeft) {
                    step = Math.abs(step);
                } else if (left >= maxLeft) {
                    step = -Math.abs(step);
                }
                left += step;
                zhuizi.css("left", left);
                distance += Math.abs(step);
                if (distance >= ranDistance && left >= allArr[index][0] && left <= allArr[index][1]) {
                    clearInterval(interval);
                    // 开始砸蛋
                    crush();
                }
            }, speed);
        }
        // 砸蛋动作
        var crush = function() {
                var top = "-.6rem";
                var bezier = "all {{time}}s cubic-bezier(1,-0.05,.7,.75)",
                    time = .4;
                var _ = util.transformCss,
                    event = util.whichTransitionEvent,
                    timeout = null;
                d_zhuizi.style[_.transition] = bezier.replace("{{time}}", time), d_zhuizi.style.top = top;
                zhuizi.addClass("rotate");
                event ? zhuizi.one(event, requestEgg) : (clearTimeout(timeout), timeout = setTimeout(requestEgg, 1e3 * time));
            }
            // 询问每个蛋的欢乐豆数量
        function requestEgg() {
            var data = { eggIndex: index };
            var success = function(res) {
                if (!res.state && res.code == -5) {
                    util.ntips_center("您未登录，正准备跳到登录页面！");
                    window.location.href = api.loginHref;
                    return;
                } else if (!res.state) {
                    util.ntips_center(res.msg);
                    return;
                }
                eggContainer.find(".jsEggContainer").html(template("egg_tpl", { type: 1, data: res.data.extraBeans }));
                setTimeout(eggAward, 1000);

                function eggAward() {
                    eggContainer.remove();
                    $(".jsEggContainer").html("");
                    var n = res.data.extraBean,
                        jsAdd = $(".jsAdd"),
                        o = jsAdd.find("b");
                    o.html(n);
                    var l = $(template("award_bonus_tpl", { recharge: 3, bonus: n }));
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
                                                var t = 1 * dollStage.data("userinfo").money + res.data.extraBean;
                                                dollStage.data("userinfo").money = t,
                                                $(".jsBalance").text(t.toFixed(2));
                                                util.getUserInfo();
                                                jsBetBtn.removeAttr("disabled");
                                            }, 1200)
                                    }
                                }));
                            $("#jsBeanImg").addClass("fadeOut"),
                                $(".jsBean01").addClass("beanScale"),
                                t.move()
                        }, 1e3);
                }
            }
            api.getEggBean(success, data);
        }

    }

    function init() {
        getEl();
        beginBet();
        // askEgg();
    }
    bet = {
        init: init
    }
    return bet;
})
