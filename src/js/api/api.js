define(["zepto", "plugins/tool"], function($, tool) {
    var api = {};
    var activityId = 1;
    var sourceId=0;
    var environment =1; //environment为0时是测试环境，environment为1时是正式环境
    function getHost() {
        var obj = {};
        obj.rrmHost = "http://test.m.renrenma.cn";
        obj.busId = 5;
        switch (environment) {
            case 0:
                obj.rrmHost="http://test.m.renrenma.cn";
                obj.host = window.location.protocol+"//test.m."+window.location.host.substring(7);
                obj.busId = 5;
                obj.rrcs="http://attest.renrenma.cn/mallhome/";
                break;
            case 1:
                obj.rrmHost="http://m.renrenma.com";
                obj.host = window.location.protocol+"//m."+window.location.host.substring(2);
                obj.busId = 10110;
                obj.rrcs="http://m.renrenma.com/shop/10110";
                break;
        }
        var activityIdSearch=tool.search.get("activityId");
        var sourceIdSearch=tool.search.get("sourceId");
        if(activityIdSearch!=null&&activityIdSearch!=undefined){
            obj.activityId=activityIdSearch;
        }else{
            obj.activityId=activityId;
        }
        if(sourceIdSearch!=null&&sourceIdSearch!=undefined){
            obj.sourceId=sourceIdSearch;
        }else{
            obj.sourceId=sourceId;
        }
        return obj;
    }
    var request = function(url, success, data, type, dataType, fail) {
        var  success = arguments[1]?arguments[1]:function(){};
        var data = arguments[2] ? arguments[2] : {};
        var type = arguments[3] ? arguments[3] : "post";
        var dataType = arguments[4] ? arguments[4] : "json";
        var fail = arguments[5] ? arguments[5] : function() {};
        data.activityId = getHost().activityId;
        data.sourceId=getHost().sourceId;
        data.presenterId = tool.search.get("presenterId");
        $.ajax({
            url: url,
            dataType: dataType,
            jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            //jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
            type: type,
            data: data,
            headers: {
                Accept: "application/json",
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
    // var get = getGuid();

    function getGuid() {
        var guid = "";
        var Guid = {};
        Guid.Empty = new tool.Guid(); //初始化 Guid 类的一个新实例。
        Guid.NewGuid = function() {
            var g = "";
            var i = 32;
            while (i--) {
                g += Math.floor(Math.random() * 16.0).toString(16);
            }
            return new tool.Guid(g);
        }
        guid = Guid.NewGuid().ToString("D");
        return guid;
    }
    var getRank = function(success, data, fail) {
        request(getHost().host + "/PrizeActivity/PrizeActivity/GetBeanCost", success, data, "post", "", fail);
    }

    var getGoodList = function(success, data, fail) {
        request(getHost().host + "/PrizeActivity/PrizeActivity/GetPrizeItems", success, data, "post", "", fail);
    }
    var getWins = function(success, data, fail) {
        request(getHost().host + "/PrizeActivity/PrizeActivity/GetBroadcastInfo", success, data, "post", "", fail);
    }
    var getUserInfo = function(success, data, fail) {
        request(getHost().host + "/PrizeActivity/PrizeActivity/GetUserInfo", success, data, "get", "jsonp", fail);
    }
    var requestAward = function(success, data, fail) {
        request(getHost().host + "/PrizeActivity/PrizeActivity/ClawPrize", success, data, "get", "jsonp", fail);
    }
    var checkTask = function(success, data, fail) {
            request(getHost().host + "/PrizeActivity/PrizeActivity/QueryCurAddup", success, data, "get", "jsonp", fail);
        }
        // 目前没有兑换这个环节
    var exchange = function(success, data, fail) {
        request(getHost().host + "/PrizeActivity/PrizeActivity/exchange", success, data, "get", "jsonp", fail);
    }
    var g56etAward = function(success, data, fail) {
        request(getHost().host + "/PrizeActivity/PrizeActivity/GetExtraPrize", success, data, "get", "jsonp", fail);
    }
    // 询问是否能砸蛋
    var askEgg=function(success,data,fail){
        request(getHost().host + "/PrizeActivity/PrizeActivity/CanGetExtraBean",success,data,"get","jsonp",fail);
    }
    // 砸蛋后询问蛋的欢乐豆数量
    var getEggBean=function(success,data,fail){
        request(getHost().host + "/PrizeActivity/PrizeActivity/GetExtraBean",success,data,"get","jsonp",fail)
    }
    return api = {
        getRank: getRank,
        getGoodList: getGoodList,
        getWins: getWins,
        getUserInfo: getUserInfo,
        requestAward: requestAward,
        checkTask: checkTask,
        exchange: exchange,
        getAward: getAward,
        askEgg:askEgg,
        getEggBean:getEggBean,
        getHost: getHost,
        loginHref: getHost().host + "/WxUser/Login/Login?returnurl=" + encodeURIComponent(window.location.href),
        recordHref:"record.html?index=1&sourceId="+getHost().sourceId+"&activityId="+getHost().activityId,
        //登录页面登录后跳转回游戏记录页面
        recordLoginHref: getHost().host + "/WxUser/Login/Login?returnurl=" + encodeURIComponent(window.location.href.replace("index", "record")),
        //跳转到充值页面
        rechargeHref: getHost().rrmHost + "/PrizeActivity/PrizeActivity/recharge?activityId=" + getHost().activityId+"&sourceId="+getHost().sourceId + "&returnurl=" + encodeURIComponent(window.location.href),
        // 兑换页面跳转到登录再跳回来
        exchangeLoginHref:getHost().host+"/WxUser/Login/Login?returnurl="+encodeURIComponent(window.location.href.replace("index", "exchange")),
        exchangeHref:"exchange.html?sourceId="+getHost().sourceId+"&activityId="+getHost().activityId,
        request: request,
        environment:environment
    };
})
