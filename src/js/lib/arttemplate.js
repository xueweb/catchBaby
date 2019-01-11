!function () {
    function e(e) {
        return e.replace(y, "").replace(b, ",").replace(w, "").replace(x, "").replace(j, "").split(T)
    }

    function n(e) {
        return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }

    function r(r, t) {
        function a(e) {
            return p += e.split(/\n/).length - 1, u && (e = e.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), e && (e = m[1] + n(e) + m[2] + "\n"), e
        }

        function i(n) {
            var r = p;
            if (s ? n = s(n, t) : o && (n = n.replace(/\n/g, function () {
                        return p++, "$line=" + p + ";"
                    })), 0 === n.indexOf("=")) {
                var a = f && !/^=[=#]/.test(n);
                if (n = n.replace(/^=[=#]?|[\s;]*$/g, ""), a) {
                    var i = n.replace(/\s*\([^\)]+\)/, "");
                    $[i] || /^(include|print)$/.test(i) || (n = "$escape(" + n + ")")
                } else n = "$string(" + n + ")";
                n = m[1] + n + m[2]
            }
            return o && (n = "$line=" + r + ";" + n), v(e(n), function (e) {
                if (e && !g[e]) {
                    var n;
                    n = "print" === e ? b : "include" === e ? w : $[e] ? "$utils." + e : d[e] ? "$helpers." + e : "$data." + e, x += e + "=" + n + ",", g[e] = !0
                }
            }), n + "\n"
        }

        var o = t.debug, c = t.openTag, l = t.closeTag, s = t.parser, u = t.compress, f = t.escape, p = 1,
            g = {$data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1}, h = "".trim,
            m = h ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
            y = h ? "$out+=text;return $out;" : "$out.push(text);",
            b = "function(){var text=''.concat.apply('',arguments);" + y + "}",
            w = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + y + "}",
            x = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (o ? "$line=0," : ""), j = m[0],
            T = "return new String(" + m[3] + ");";
        v(r.split(c), function (e) {
            e = e.split(l);
            var n = e[0], r = e[1];
            1 === e.length ? j += a(n) : (j += i(n), r && (j += a(r)))
        });
        var k = x + j + T;
        o && (k = "try{" + k + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + n(r) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var E = new Function("$data", "$filename", k);
            return E.prototype = $, E
        } catch (S) {
            throw S.temp = "function anonymous($data,$filename) {" + k + "}", S
        }
    }

    var t = function (e, n) {
        return "string" == typeof n ? h(n, {filename: e}) : o(e, n)
    };
    t.version = "3.0.0", t.config = function (e, n) {
        a[e] = n
    };
    var a = t.defaults = {openTag: "<%", closeTag: "%>", escape: !0, cache: !0, compress: !1, parser: null},
        i = t.cache = {};
    t.render = function (e, n) {
        return h(e, n)
    };
    var o = t.renderFile = function (e, n) {
        var r = t.get(e) || g({filename: e, name: "Render Error", message: "Template not found"});
        return n ? r(n) : r
    };
    t.get = function (e) {
        var n;
        if (i[e]) n = i[e]; else if ("object" == typeof document) {
            var r = document.getElementById(e);
            if (r) {
                var t = (r.value || r.innerHTML).replace(/^\s*|\s*$/g, "");
                n = h(t, {filename: e})
            }
        }
        return n
    };
    var c = function (e, n) {
        return "string" != typeof e && (n = typeof e, "number" === n ? e += "" : e = "function" === n ? c(e.call(e)) : ""), e
    }, l = {"<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;"}, s = function (e) {
        return l[e]
    }, u = function (e) {
        return c(e).replace(/&(?![\w#]+;)|[<>"']/g, s)
    }, f = Array.isArray || function (e) {
            return "[object Array]" === {}.toString.call(e)
        }, p = function (e, n) {
        var r, t;
        if (f(e))for (r = 0, t = e.length; t > r; r++)n.call(e, e[r], r, e); else for (r in e)n.call(e, e[r], r)
    }, $ = t.utils = {$helpers: {}, $include: o, $string: c, $escape: u, $each: p};
    t.helper = function (e, n) {
        d[e] = n
    };
    var d = t.helpers = $.$helpers;
    t.onerror = function (e) {
        var n = "Template Error\n\n";
        for (var r in e)n += "<" + r + ">\n" + e[r] + "\n\n";
        "object" == typeof console && console.error(n)
    };
    var g = function (e) {
            return t.onerror(e), function () {
                return "{Template Error}"
            }
        }, h = t.compile = function (e, n) {
            function t(r) {
                try {
                    return new l(r, c) + ""
                } catch (t) {
                    return n.debug ? g(t)() : (n.debug = !0, h(e, n)(r))
                }
            }

            n = n || {};
            for (var o in a)void 0 === n[o] && (n[o] = a[o]);
            var c = n.filename;
            try {
                var l = r(e, n)
            } catch (s) {
                return s.filename = c || "anonymous", s.name = "Syntax Error", g(s)
            }
            return t.prototype = l.prototype, t.toString = function () {
                return l.toString()
            }, c && n.cache && (i[c] = t), t
        }, v = $.$each,
        m = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
        y = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
        b = /[^\w$]+/g, w = new RegExp(["\\b" + m.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
        x = /^\d[^,]*|,\d[^,]*/g, j = /^,+|,+$/g, T = /^$|,+/;
    a.openTag = "{{", a.closeTag = "}}";
    var k = function (e, n) {
        var r = n.split(":"), t = r.shift(), a = r.join(":") || "";
        return a && (a = ", " + a), "$helpers." + t + "(" + e + a + ")"
    };
    a.parser = function (e) {
        e = e.replace(/^\s/, "");
        var n = e.split(" "), r = n.shift(), a = n.join(" ");
        switch (r) {
            case"if":
                e = "if(" + a + "){";
                break;
            case"else":
                n = "if" === n.shift() ? " if(" + n.join(" ") + ")" : "", e = "}else" + n + "{";
                break;
            case"/if":
                e = "}";
                break;
            case"each":
                var i = n[0] || "$data", o = n[1] || "as", c = n[2] || "$value", l = n[3] || "$index", s = c + "," + l;
                "as" !== o && (i = "[]"), e = "$each(" + i + ",function(" + s + "){";
                break;
            case"/each":
                e = "});";
                break;
            case"echo":
                e = "print(" + a + ");";
                break;
            case"print":
            case"include":
                e = r + "(" + n.join(",") + ");";
                break;
            default:
                if (/^\s*\|\s*[\w\$]/.test(a)) {
                    var u = !0;
                    0 === e.indexOf("#") && (e = e.substr(1), u = !1);
                    for (var f = 0, p = e.split("|"), $ = p.length, d = p[f++]; $ > f; f++)d = k(d, p[f]);
                    e = (u ? "=" : "=#") + d
                } else e = t.helpers[r] ? "=#" + r + "(" + n.join(",") + ");" : "=" + e
        }
        return e
    }, "function" == typeof define ? define(function () {
        return t
    }) : "undefined" != typeof exports ? module.exports = t : this.template = t
}();