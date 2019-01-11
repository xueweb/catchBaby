require(["zepto", "api","util"], function($, api,util) {
    var rate = 10;
    var bean = 0;
    var coin = 0;
    var changeCoin=0;
    getBalance();
    $(".jsBeanInput").on("input propertychnage", checkInput);
    $(".jsChangeBtn").on("click", change);
    $(".jsrrcs").on("click",function(){
    	window.location.href=api.getHost().rrcs;
    })
    // 获取用户欢乐豆
    function getBalance() {
        var url = api.getHost().host + "/PrizeActivity/PrizeActivity/GetUserBalance";
        var success = function(res) {
            if (!res.state) {
                if (res.code == -5) {
                    window.location.href = api.exchangeLoginHref;
                }
                return;
            }
            var data = res.data;
            $(".jsBean").html(data.joyBeans);
            $(".jsCoin").html(data.joyCoin);
            bean = data.joyBeans;
            coin = data.joyCoin;
            if (bean >= 1) {
                $(".jsNoBean").addClass("hidden");
                $(".jsMount").removeClass("hidden");
            }else{
            	$(".jsNoBean").removeClass("hidden");
                $(".jsMount").addClass("hidden");
            }
        }
        api.request(url, success, "", "get", "jsonp");
    }
    // 检查input的输入，输入必须为正整数，并且大于0并且小于或等于bean
    function checkInput() {
        var val = $(".jsBeanInput").val();
        max = bean,
        min = 1,
        realVal = val.replace(/^\D+$/g, "").replace(/^\D*0*(\d+(\d{0,0})?).*$/, "$1") || "";
        realVal = realVal > max ? max : realVal,
        val && realVal != val && $(this).val(realVal),
        rrealVal = (realVal + "").replace(/\.$/g, "");
        if(rrealVal.length>=2&&rrealVal<1){
            rrealVal = realVal < 1 * min ? min : realVal;  
        }
        $(".jsBeanInput").val(rrealVal);
        $(".jsChangeCoin").html(rrealVal*rate);
        changeCoin=rrealVal*rate;
    }

    function change(){
    	var beanVal=$(".jsBeanInput").val();
    	if(beanVal<1||changeCoin<=0){
    		util.ntips_center("输入欢乐豆必须大于等于1");
    		return;
    	}
    	var url=api.getHost().host + "/PrizeActivity/PrizeActivity/ExchangeBeanToCoin";
    	var data={"changeCount":beanVal};
    	var success=function(res){
    		changeCoin=0;
    		$(".jsBeanInput").val("");
    		$(".jsChangeCoin").html("");
    		if(!res.state){
    			util.ntips_center(res.msg);
    			return;
    		}
    		var msg="成功兑换"+res.data.exchangeJoyCoin+"个欢乐币";
    		util.ntips_center(msg);
    		getBalance();
    	}
    	api.request(url,success,data,"get","jsonp");
    }
})
