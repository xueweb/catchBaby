    define(["zepto"], function($) {
        var TabView = function(ele, setting) {
            var defaultSetting = {
                onchange: function() {},
                trigger: "click",
                defaultIndex: 0,
            };
            var that = this;
            this._container = $(ele);
            this._tabs = this._container.children().children(".tab-item");
            this._tabs.each(function(index, item) {
                $(item).data("tab-index", index);
            });
            this._items = this._container.children().children(".tab-content");
            // this._setting = oop.mixin(defaultSetting, setting, true);
            this._setting = $.extend({}, defaultSetting, setting);
            this._currentIndex = this._setting.defaultIndex;

            if (this._container.data("w-" + this._constructor + "initialized")) {
                this.bind({
                    onchange: this._setting.onchange
                });
                return this;
            }
            this._init();
        };
        TabView.prototype = {
            _className: "tabView",
            _constructor: "TabView",
            _check: function() {
                if (typeof log != "undefined") {
                    if (this._container.selector == "." + this._className) {
                        if (typeof log.useDefaultSelector != "undefined") {

                            log.useDefaultSelector(this._className);
                        }
                    } else {
                        if (this._container.size() == 0) {
                            if (typeof log.noNode != "undefined") {

                                log.noNode(this._constructor);
                            }
                        } else if (this._container.size() > 1) {
                            this._container = this._container.eq(1);
                            if (typeof log.noNode != "undefined") {

                                log.notSingleNode(this._constructor);
                            }
                        }
                    }
                }

            },
            _init: function(data) {
                this._check();
                var that = this;
                this._tabs.each(function(index, item) {
                    $(item).data("tab-index", index);
                });
                this._items.each(function(index, item) {
                    item = $(item);
                    if (index != that._currentIndex) {
                        item.addClass("hidden");
                    }
                });

                // 如果tab-item的数量有变化时，需要重新调用这个方法
                // this.updateParam();
                that.bind(that._setting);
                console.log(this._container.children()[0]);
                $(this._container.children()[0]).on(that._setting.trigger, ".tab-item", function(e) {
                    var current = $(this).data("tab-index");
                    console.log(current);
                    that.switchTo(current);
                });
                this._tabs.removeClass("active");
                var currentTab = this._tabs.eq(this._currentIndex);
                currentTab.addClass("active");
                this._container.data("w-" + this._constructor + "initialized", true);
            },
            bind: function(setting) {
                var that = this;
                setting.onchange && this._container.on("switch.widget", function(e) {
                    setting.onchange.call(that, e.current, e.last);
                    e.stopPropagation();
                });
                return this;
            },
            off: function() {
                this._container.off("switch.widget");
            },
            switchTo: function(current) {
                var last = +this._currentIndex;
                console.log(current);
                console.log(last);
                current = +current;
                if (last == current) {
                    return;
                }

                // 切換標籤
                this._switchTab(last, current);

                // 切換內容
                var lastItem = this._items.eq(last);
                // this._items.addClass("hidden");
                var currentItem = this._items.eq(current);
                currentItem.removeClass("hidden");
                lastItem.addClass("hidden");
                var event = $.Event("switch");
                event.current = current;
                event.last = last;
                this._currentIndex = current;
                this._container.trigger(event);
                return this;
            },
            _switchTab: function(lastIndx, currentIndx) {
                var lastTab = this._tabs.eq(lastIndx);
                var currentTab = this._tabs.eq(currentIndx);
                lastTab.removeClass("active");
                // this._tabs.removeClass("active");
                currentTab.addClass("active");
            },
            updateParam: function() {
                var that = this;
                this._tabs = this._container.children().children(".tab-item");
                this._items = this._container.children().children(".tab-content");
                this._currentIndex = this._tabs.length - 1;
                this._tabs.each(function(index, item) {
                    $(item).data("tab-index", index);
                    $(item).children(".btn-refresh, .btn-delete").addClass("hidden");
                });
                this._items.removeClass("hidden");
                this._items.each(function(index, item) {
                    item = $(item);
                    if (index != that._currentIndex) {
                        item.addClass("hidden");
                    }
                });
                this._tabs.removeClass("active");
                var currentTab = this._tabs.eq(this._currentIndex);
                currentTab.addClass("active");
                currentTab.children(".btn-refresh, .btn-delete").removeClass("hidden");
                // window.location.hash=$(this._tabs.hasClass("active")).data("id");
            }
        };
        return TabView;
    })
