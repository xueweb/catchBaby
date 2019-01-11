require(['zepto', 'plugins/tabview', 'lib/iscroll-probe', "template","api","plugins/tool"], function($, TabView, IScroll, template,api,tool) {
    var tab,
        tabContentWrapper,
        a_scrolls,
        data,
        NewTools;
    $(function() {
        NewTools = new Indicator();
        a_scrolls = [];
        tabContentWrapper = $(".tabview .content");
        var options = {
                probeType: 2,
                scrollbars: false,
                click: "knock",
                fadeScrollbars: true,
            }
            // 循环实例化iscroll
        for (var i = 0; i < 3; i++) {
            var scrollWrapper = tabContentWrapper.children().eq(i);
            var indicator = scrollWrapper.find(".text_more")
            var type;
            i == 0 ? type = 1 : i == 1 ? type = 3 : type = null;
            var o_scroll = {
                page: 1,
                state: 1,
                pageSize: 10,
                num: 0,
                type: type
            };
            o_scroll.scroll = new IScroll(scrollWrapper.get(0), options);
            o_scroll.contentWrapper = scrollWrapper.find(".lists");
            o_scroll.indicator = indicator;
            a_scrolls.push(o_scroll);
            //    o_scroll.scroll.on("scrollEnd", function() {
            //        if (this.directionY == 1 && o_scroll.state == 1) {
            //            getLists(o_scroll);
            //        }
            // })
            (function(scroll) {
                scroll.scroll.on("scrollEnd", function() {
                    if (this.directionY == 1 && o_scroll.state == 1) {
                        getLists(scroll);
                    }
                })
            })(o_scroll)

        }
        var a_index=[0,1,2];
        var defaultIndex=getQueryString("index");
        var defaultIndex=a_index[defaultIndex];
        defaultIndex=isNaN(defaultIndex)?0:defaultIndex;
        tab = new TabView(".jstabview", {
            defaultIndex: defaultIndex,
            onchange: function(current, last) {
                if (a_scrolls[current].page == 1) {
                    getLists(a_scrolls[current]);
                }
            }
        });
        // 初始化获取一个tab的数据
        getLists(a_scrolls[defaultIndex]);
        // 点击返回娃娃机
        $(".footer .btn").on("click",function(){
            window.location.href="index.html?sourceId="+api.getHost().sourceId+"&activityId="+api.getHost().activityId;
        });
        $(".lists").on("click",".jsguide",function(e){
            e.stopPropagation();
            window.location.href="guide.html";
        })
    });

    function getLists(scroll) {
        // state==-1代表已没有数据，state==2代表正在发送请求，state==1代表可以发送请求
        if (scroll.state != 1) return;
        NewTools.changeIndicator(scroll.indicator, "loading");
        var url = api.getHost().host+"/PrizeActivity/PrizeActivity/GetRecordList";
        var datas = {
            type: scroll.type,
            page: scroll.page,
            pageSize: scroll.pageSize
        }
        var success = function(res) {
            if(!res.state){
                if(res.code==-5) return window.location.href=api.recordLoginHref;
                return;
            }
            if (res.state) {
                var data = res.data;
                data.length < scroll.pageSize ? (scroll.state = -1, NewTools.changeIndicator(scroll.indicator, "nomore")) : (scroll.state = 1, NewTools.changeIndicator(scroll.indicator, "ready"));
                scroll.contentWrapper.append(sethtml(data,scroll));
                scroll.page++;
            }
            scroll.scroll.refresh();
        }
        api.request(url, success, datas,"get","jsonp");
    }

    function sethtml(arr, scroll) {
        var a_text = [];
        for (var i = 0, length = arr.length; i < length; i++) {
            var obj = arr[i];
            scroll.num++;
            obj.sort = scroll.num;
            var href='javascript:void(0)',btnText="",className="";
            // if(obj.state==1){
            //     href=obj.url,btnText="领取",className="checkBtn"
            // }else if(obj.state==2||obj.state==3){
            //     href=obj.url,btnText="查看",className="checkBtn"
            // }
            if(obj.url){
                var sourceId=api.getHost().sourceId;
                href=tool.search.replace(obj.url,"sourceId",sourceId);
                btnText=obj.linkName,className="checkBtn";
            }
            obj.href=href,obj.btnText=btnText,obj.btnClass=className
            var text = template("list-tmpl", arr[i]);
            a_text.push(text);
        }
        var html = a_text.join("");
        return html;
    }
    // 这个方法暂时没用
    function initTab() {
        var tabs = $(".tab-header").children(".tab-item");
        var items = $(".content").children(".tab-content");
        $(".tab-header").on("click", ".tab-item", function() {
            if ($(this).hasClass("active")) return;
            $(this).addClass("active").siblings(".tab-item").removeClass("active");
            var index = $(this).index();
            items.eq(index).removeClass("hidden").siblings(".tab-content").addClass("hidden");
        })
        tabs.eq(0).trigger("click");
    }
    // 加载提示
    function Indicator() {
        var NewTools = {
            // 下拉提示
            changeIndicator: function(indicator, state) {
                switch (state) {
                    case "nomore":
                        indicator.removeClass("loading");
                        indicator.removeClass("normal");
                        indicator.removeClass("ready");
                        indicator.addClass("nomore");
                        break;

                    case "normal":
                        indicator.removeClass("loading");
                        indicator.removeClass("ready");
                        indicator.removeClass("nomore");
                        indicator.addClass("normal");
                        break;

                    case "ready":
                        indicator.removeClass("loading");
                        indicator.removeClass("normal");
                        indicator.removeClass("nomore");
                        indicator.addClass("ready");
                        break;

                    case "loading":
                        indicator.removeClass("nomore");
                        indicator.removeClass("normal");
                        indicator.removeClass("ready");
                        indicator.addClass("loading");
                        break;
                }
            }
        };
        return NewTools;
    }
  
    // 获取地址栏参数的方法
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

})
