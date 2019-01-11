define([], function() {
    var tool = {};
    var search = {};
    //表示全局唯一标识符 (GUID)。

function Guid(g) {
    var arr = new Array(); //存放32位数值的数组
    if (typeof(g) == "string") { //如果构造函数的参数为字符串
        InitByString(arr, g);
    } else {
        InitByOther(arr);
    } //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。
    this.Equals = function(o) {
            if (o && o.IsGuid) {
                return this.ToString() == o.ToString();
            } else {
                return false;
            }
        } //Guid对象的标记
    this.IsGuid = function() {} //返回 Guid 类的此实例值的 String 表示形式。
    this.ToString = function(format) {
            if (typeof(format) == "string") {
                if (format == "N" || format == "D" || format == "B" || format == "P") {
                    return ToStringWithFormat(arr, format);
                } else {
                    return ToStringWithFormat(arr, "D");
                }
            } else {
                return ToStringWithFormat(arr, "D");
            }
        } //由字符串加载
    function InitByString(arr, g) {
        g = g.replace(/\{|\(|\)|\}|-/g, "");
        g = g.toLowerCase();
        if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1) {
            InitByOther(arr);
        } else {
            for (var i = 0; i < g.length; i++) {
                arr.push(g[i]);
            }
        }
    } //由其他类型加载
    function InitByOther(arr) {
        var i = 32;
        while (i--) {
            arr.push("0");
        }
    }
    /*

    根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。
    N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}
    P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    */
    function ToStringWithFormat(arr, format) {
        switch (format) {
            case "N":
                return arr.toString().replace(/,/g, "");
            case "D":
                var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20, 32);
                str = str.replace(/,/g, "");
                return str;
            case "B":
                var str = ToStringWithFormat(arr, "D");
                str = "{" + str + "}";
                return str;
            case "P":
                var str = ToStringWithFormat(arr, "D");
                str = "(" + str + ")";
                return str;
            default:
                return new Guid();
        }
    }
} //Guid 类的默认实例，其值保证均为零。

// 判断是否微信环境
function isWeixin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    }
    return false
}
// search.replace=function(obj){
//     // 参数已存在就替换，不存在就增加
//     if(typeof obj!="object"){
//         console.log("search.replace方法接收到的不是一个object");
//         return;
//     }
//     var href=window.location.href;
//     for(var key in obj){
//         if(!href.match(/key/i)){
//         // 不存在，增加
//             if(href.match(/?/)){
//                 href=href+"&"+key+"="+obj[k];
//             }else{
//                 href=href+"?"+key+"="+obj[k]
//             }
//         }else{
//             // 存在，替换
//             href=href.replace(/(?![?&])(key)=\w+/gi,key+"="+obj[key]);
//         }

//     }
//     return href;

// }
search.replace = function(destiny, par, par_value) {
    {
        var pattern = par + '=([^&]*)';
        var replaceText = par + '=' + par_value;
        if (destiny.match(pattern)) {
            var tmp = '/\\' + par + '=[^&]*/';
            tmp = destiny.replace(eval(tmp), replaceText);
            return (tmp);
        } else {
            if (destiny.match('[\?]')) {
                return destiny + '&' + replaceText;
            } else {
                return destiny + '?' + replaceText;
            }
        }
        return destiny + '\n' + par + '\n' + par_value;
    }
}
search.remove = function(key) {
    var href = window.location.href;
    href = href.replace(/(?![?&])(key)=\w+/gi, "");
    return href;
}
search.get = function(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
return tool = {
    Guid: Guid,
    isWeixin: isWeixin,
    search: search
}
})
