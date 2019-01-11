define(["api", "template","util"], function(api, template,util) {
    function getType(t) {
        var e = "",
            a = "";
        switch (1 * t) {
            case 1:
                e = "ka", a = "bean"
                break;
            case 2:
                e = "cy", a = "gift";
                break;
            case 3:
                e = "wx", a = "phonecard";
                break;
            case 4:
                e = "wx", a = "paycard";
                break;
            case 5:
               e = "wx", a = "paycard"; 
        }
        return { emotion: e, branch: a }
    }
    var roll = {};
    // 获取等级消耗的欢乐豆
    var getRank = function(cb){
        var success=function(res){
            if(!res.state){
                return;
            }
            var data=res.data;
            $("#jsdollbetbean").html(template("doll_bet_bean_tpl",data));
            cb();
        }
        api.getRank(success);
    }
    // 获取抓取商品
    var rollProducts = function() {
        api.getGoodList(function(res) {
            if(!res.state&&res.code==-6){
                util.ntips_center("活动已暂停!");
                return;
            }else if(!res.state){
                return;
            }
            var data = res.data;
            var historyType = util.store.get("gameType");
            if (historyType == undefined || historyType == null) historyType = 0;
            var typeArr = ["low","middle", "high"];
            var type = typeArr[historyType];
            var typeData = data[type];
            if (!typeData || typeData.length == 0) {
                $("#largeDollList").empty();
                $("#smallDollList").empty();
                return false;
            }
            var small = [];
            var large = [];
            for (var i = 0, length = typeData.length; i < length; i++) {
                var item = typeData[i];
                var m = getType(item.ptype);
                item.emotion = m.emotion, item.branch = m.branch
                var shtml = template("small_product_tpl", item);
                var lhtml = template("large_product_tpl", item);
                small.push(shtml);
                large.push(lhtml);
            }
            var text_shtml = small.join("");
            var text_lhtml = large.join("");
            var largeContainer=$(".doll-box-large");
            var smallContainer=$(".doll-box-small");
            $("#smallDollList").html(text_shtml);
            $("#largeDollList").html(text_lhtml);
            clearInterval(largeContainer.attr("timer"));
            clearInterval(smallContainer.attr("timer"));
            largeContainer.eq(0).marquee({ direct: "right",cb:rollCb});
            smallContainer.eq(0).marquee({ direct: "left" });

            function rollCb() {
                var y = $("#largeDollList");
                var largeBoxContainerWidth=parseFloat($(".doll-box").eq(0).css("width"));
                var t = y.find("li"),
                    e = (t.eq(0).width(), t.length / 2),
                    a = y.data("doll"),
                    l = y.data("dolls");
                l || (l = []);
                var r, i;
                a && "hidden" == a.css("visibility") && (l.push(a), y.removeData("doll"), a = null);
                var n = parseFloat(y.css("left"));
                if (n >= 0) {
                    if (l && l.length > 0) {
                        for (var s = 0; s < l.length; s++) {
                            var o = l[s],
                                c = o.offset().left;
                            if (c < largeBoxContainerWidth && c > 0) {
                                r = o.index(), i = r < e ? r + e : e - r;
                                var d = t.eq(i);
                                d.css("visibility", "hidden"), o.attr("style", ""), l.splice(s, 1, d)
                            }
                        }
                        y.data("dolls", l)
                    }
                } else {
                    for (var f, p, u = 0; u < l.length; u++) f = l[u], p = f.offset().left, p >= largeBoxContainerWidth && (f.attr("style", ""), l.splice(u, 1), u--);
                    y.data("dolls", l)
                }
            }
        }, {}, function(err) {
            console.log(err);
        })
    }
    // 获取中奖名单
    var rollWins = function(){
        api.getWins(function(res){
            if (!res.state) return false;
            var data=res.data;
            var l, winsContainer = $(".doll-notice"),
                i = { record: data };
            data.length > 0 && (l = template("wins_tpl", i)), winsContainer.find(".hidden-list").html(l), 
            winsContainer.attr("data-index") || winsRoll({ el: winsContainer,interval:1500})
        },{pageSize:10},function(err){
            console.log(err);
        });
    }
    var marquee = function() {
        $.fn.marquee = function(options) {
            var a = { speed: 20, direct: "right", cb: function() {} };
            return options = $.extend(a, options), this.each(function() {
                function a() { 
                	"right" == options.direct ? (options.cb && options.cb(), parseFloat(r.css("left")) >= 0 ? d.style.left = -r.width() / 2 + "px" : d.style.left = parseFloat(r.css("left")) + 1 + "px") : "left" == options.direct && (options.cb && options.cb(), parseFloat(r.css("left")) <= parseFloat(-r.width() / 2) ? d.style.left = "0px" : d.style.left = parseFloat(r.css("left")) - 1 + "px") 
                }
                var l = $(this),
                    r = l.find("ul");
                if (r.find("li").length < 3) return void r.attr("style", "");
                var i = r.html();
                r.append(i);
                var n = r.find("li"),
                    s = parseFloat(n.eq(0).css("margin-left")),
                    o = parseFloat(n.eq(0).css("width")),
                    c = (o + s) * n.length;
                r.css("width", c + "px");
                var d = r.get(0);
                "right" == options.direct && (d.style.left = -r.width() / 2 + "px");
                var f = setInterval(a, options.speed);
                l.attr("timer", f)
            })
        }
    }
    var winsRoll=function(t) {
        var e = t.el,
            a = e.find(".notice-list"),
            l = e.find(".hidden-list"),
            r = l.find("li");
            f=null;
        a.html(r.first().clone()), r.length <= 1 || (f && clearInterval(f), f = setInterval(function() {
            r = l.find("li");
            var i = ((1 * e.attr("data-index") || 0) + 1) % r.length,
                n = r.eq(i),
                s = n.clone();
            a.append(s);
            var o = a.children().first(),
                c = 0 - o.height();
            a.animate({ marginTop: c + "px" }, t.time || 500, function() { o.remove(), a.css("marginTop", "0px"), e.attr("data-index", i) })
        }, t.interval || 1500))
    }
    var init = function() {
        marquee();
        rollWins();
        setInterval(function(){
            rollWins();
        },60*1000);
    }
    roll = {
        getRank:getRank,
        rollProducts: rollProducts,
        rollWins:rollWins,
        init: init
    }
    return roll;
})