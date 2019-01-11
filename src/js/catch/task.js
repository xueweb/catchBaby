define(["zepto", "api", "template", "catch/parabola", "util"], function($, api, template, parabola, util) {
    function getEl() {
        dollStage = $(".doll-stage");
        dollFt = $(".doll-ft");
        dollPowerBar = $(".doll-power-bar");
        dollGift = dollPowerBar.find(".doll-gift");
        trigger = "click";
    }

    function r(e) { $.ajax({ url: e.url, type: "post", dataType: "json", data: e.data || { _: Math.random() } }).done(function(a) { e.success && e.success(a) }).fail(function() { e.error && e.error({}) }) }
    var task = {};
    var add = function() {
        var task = dollStage.data("task");
        task < 5 && task++,
            dollStage.data("task", task),
            dollPowerBar.attr("class", "doll-power-bar doll-power-" + task),
            task < 5 ? dollGift.attr("class", "doll-gift doll-gift-gray") : (dollGift.attr("class", "doll-gift doll-gift-full pulse"), $(".doll-power-tips").html("点击礼包领取奖励哦"))
    }
    var eventInit = function() {
        $(".doll-stage").on(trigger, ".doll-power", function() {
            var dollPower = $(this);
            if ("true" == dollPower.attr("disabled")) return !1;
            dollPower.attr("disabled", !0);
            var task = dollStage.data("task");
            if (task >= 5) getAward();
        })
    }
    var checkTask = function() {
        var data = {};
        var cb = function(res) {
            if (!res.state) {
                // util.ntips_center(res.msg);
                return;
            }
            var data = res.data;
            var num = 1 * data.num;
            return "number" == typeof num && !isNaN(num) && (num < 5 ? dollGift.attr("class", "doll-gift doll-gift-gray") : ($(".doll-power-tips").html("点击礼包领取奖励哦"), dollGift.attr("class", "doll-gift doll-gift-full pulse")), dollStage.data("task", num), void dollPowerBar.attr("class", "doll-power-bar doll-power-" + num))
        }
        api.checkTask(cb, data);
    }
    var getAward = function() {
        var data = {};
        var success = function(res) {
            $(".doll-power").removeAttr("disabled");
            if (!res.state) {
                util.ntips_center(res.msg);
                return;
            }
            var data = res.data;
            if (data.remainCount == 0) {
                $(".doll-power").removeAttr("disabled"),
                    checkTask();
                if (data.money != 0) {
                    var l = data.money,
                        jsAdd = $(".jsAdd"),
                        r = jsAdd.find("b");
                    r.html(l);
                    var n = $(template("award_bonus_tpl", { bonus: l }));
                    $("body").append(n);
                    var d = $(".panel-bonus-beans"),
                        i = d.offset(),
                        c = d.width(),
                        u = d.height(),
                        p = i.left + c,
                        g = i.top + u;
                    $("#jsBeanImg").css({ left: p + "px", top: g + "px" }),
                        setTimeout(function() {
                            $("#jsBeanImg").parent().css("background", "none"),
                                $("#jsBeanImg").fadeIn();
                            var e = ($(".doll-bean-total"), $(".jsbeanImg"), new Parabola({ origin: ".panel-bonus-beans", target: ".jsBeanTarget", a: -.06, element: "#jsBeanImg", time: 200, callback: function(e) { jsAdd.removeClass("none"), n.fadeOut(), setTimeout(function() { $(".doll-power-tips").html('夹满<em class="yellow">5次</em>获随机奖励'), n.remove(), jsAdd.addClass("none"), util.getUserInfo(), checkTask() }, 1200) } }));
                            $("#jsBeanImg").addClass("fadeOut"), $(".jsBean01").addClass("beanScale"), e.move()
                        }, 1e3)
                } else
                if (data.money == 0) {
                    util.atips_center("fail","哎呀！运气实在太差，此次赚得欢乐豆数量为0！再接再厉哦！",function(){},function(){});
                }

            } else if (data.remainCount > 0) {
                $(".doll-power").removeAttr("disabled");
                var msg = "您还差" + data.remainCount + "次才能获得额外奖励";
                util.ntips_center(msg);
                util.getUserInfo(),
                    checkTask()
            }

        }
        var fail = function(err) {
            $(".doll-power").removeAttr("disabled");
            util.ntips_center("网络错误");
        }
        api.getAward(success, data, fail);
    }

    function init() {
        getEl();
        checkTask();
        eventInit();
    }
    task = {
        init: init,
        add: add,
        checkTask: checkTask
    }
    return task;
})
