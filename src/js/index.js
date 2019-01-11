require(["zepto", "template", "catch/bet", "catch/roll", "util", "catch/task", "api", "plugins/tool"], function($, template, bet, roll, util, task, api, tool) {
    dollStage = $(".doll-stage"),
        footer = $(".doll-ft"),
        panalContainer = $(".jsRecordList"),
        helpBtn = $(".jsHelpBtn"),
        j = $(".reddot"),
        betBtn = $(".jsBetBtn");
    shareBtn = $(".jsShareBtn");
    trigger = "click";

    function init() {
        // 点击查看帮助
        helpBtn.on(trigger, function() {
            var helpHtml = $(template("dollRuleTpl", {}));
            $("body").append(helpHtml);
            helpHtml.on(trigger, ".jsClose", function() {
                helpHtml.remove();
            })
        })
        $(".jsRecordBtn").on(trigger, function(e) {
            panalContainer.toggleClass("active");
            e.stopPropagation();

        })
        $(".jsRecordItem").on(trigger, function() {
            if (util.cookie.get("IsLogin") != 1) {
                window.location.href = api.recordLoginHref;
                return false;
            } else {
                window.location.href = api.recordHref;
            }
        })
        $(".jsExchangeItem").on(trigger, function() {
            if (util.cookie.get("IsLogin") != 1) {
                window.location.href = api.exchangeLoginHref;
                return false;
            } else {
                window.location.href = api.exchangeHref;
            }
        })

        $(".jsPay").on(trigger, function() {
            if (util.cookie.get("IsLogin") != 1) {
                window.location.href = api.loginHref;
            } else {
                window.location.href = tool.search.replace(api.rechargeHref, "beanCount", $("#jsdollbetbean").children(".current").attr("data-money"));
            }
        })
        $("body").on(trigger, function() {
            panalContainer.hasClass("active") && panalContainer.removeClass("active");
        });
        $(".jsEarnBtn").on(trigger, function() {
                var success = function(res) {
                    if (!res.state) {
                        util.ntips_center(res.state);
                        return;
                    }
                    var shareHtml = $(template("tpl_wxguide",res.data));
                    $("body").append(shareHtml);
                    shareHtml.on(trigger, function() {
                        shareHtml.remove();
                    })
                }
                    api.getRank(success, {});

            })
            // $(".jsEarnBtn").on(trigger,function(){
            // 	$("#share-declare").css("display","block");
            // });
            // $("#share-declare").on(trigger,function(){
            // 	$("#share-declare").css("display","none");
            // })	

    }
    $(function() {
        util.getUserInfo({
            checkLogin: function(res) {
                // 在微信端，如果返回state==false&&code==-5，进行静默登录
                if (tool.isWeixin() && !res.state && res.code == -5) return window.location.href = api.loginHref;
            }
        });
        init();
        roll.init();
        bet.init();
        task.init();
    })
});
