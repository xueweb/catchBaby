!function (t, e) {
    "function" == typeof define && (define.amd || define.cmd) ? define("zepto", function (n) {
        return e(t, n)
    }) : t.$ = e(t, {})
}(this, function (t, e) {
    var n = function () {
        function t(t) {
            return null == t ? String(t) : X[Y.call(t)] || "object"
        }

        function e(e) {
            return "function" == t(e)
        }

        function n(t) {
            return null != t && t == t.window
        }

        function i(t) {
            return null != t && t.nodeType == t.DOCUMENT_NODE
        }

        function r(e) {
            return "object" == t(e)
        }

        function o(t) {
            return r(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
        }

        function a(t) {
            return "number" == typeof t.length
        }

        function s(t) {
            return M.call(t, function (t) {
                return null != t
            })
        }

        function c(t) {
            return t.length > 0 ? S.fn.concat.apply([], t) : t
        }

        function u(t) {
            return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }

        function l(t) {
            return t in L ? L[t] : L[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
        }

        function f(t, e) {
            return "number" != typeof e || $[u(t)] ? e : e + "px"
        }

        function h(t) {
            var e, n;
            return D[t] || (e = A.createElement(t), A.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), D[t] = n), D[t]
        }

        function p(t) {
            return "children" in t ? k.call(t.children) : S.map(t.childNodes, function (t) {
                if (1 == t.nodeType)return t
            })
        }

        function d(t, e) {
            var n, i = t ? t.length : 0;
            for (n = 0; n < i; n++)this[n] = t[n];
            this.length = i, this.selector = e || ""
        }

        function m(t, e, n) {
            for (T in e)n && (o(e[T]) || Q(e[T])) ? (o(e[T]) && !o(t[T]) && (t[T] = {}), Q(e[T]) && !Q(t[T]) && (t[T] = []), m(t[T], e[T], n)) : e[T] !== E && (t[T] = e[T])
        }

        function v(t, e) {
            return null == e ? S(t) : S(t).filter(e)
        }

        function g(t, n, i, r) {
            return e(n) ? n.call(t, i, r) : n
        }

        function y(t, e, n) {
            null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
        }

        function b(t, e) {
            var n = t.className || "", i = n && n.baseVal !== E;
            return e === E ? i ? n.baseVal : n : void(i ? n.baseVal = e : t.className = e)
        }

        function w(t) {
            try {
                return t ? "true" == t || "false" != t && ("null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? S.parseJSON(t) : t) : t
            } catch (e) {
                return t
            }
        }

        function x(t, e) {
            e(t);
            for (var n = 0, i = t.childNodes.length; n < i; n++)x(t.childNodes[n], e)
        }

        var E, T, S, P, C, j, O = [], N = O.concat, M = O.filter, k = O.slice, A = window.document, D = {}, L = {},
            $ = {"column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1},
            F = /^\s*<(\w+|!)[^>]*>/, _ = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            R = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, z = /^(?:body|html)$/i,
            q = /([A-Z])/g, I = ["val", "css", "html", "text", "data", "width", "height", "offset"],
            W = ["after", "prepend", "before", "append"], Z = A.createElement("table"), B = A.createElement("tr"),
            U = {tr: A.createElement("tbody"), tbody: Z, thead: Z, tfoot: Z, td: B, th: B, "*": A.createElement("div")},
            V = /complete|loaded|interactive/, H = /^[\w-]*$/, X = {}, Y = X.toString, J = {},
            G = A.createElement("div"), K = {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            }, Q = Array.isArray || function (t) {
                    return t instanceof Array
                };
        return J.matches = function (t, e) {
            if (!e || !t || 1 !== t.nodeType)return !1;
            var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
            if (n)return n.call(t, e);
            var i, r = t.parentNode, o = !r;
            return o && (r = G).appendChild(t), i = ~J.qsa(r, e).indexOf(t), o && G.removeChild(t), i
        }, C = function (t) {
            return t.replace(/-+(.)?/g, function (t, e) {
                return e ? e.toUpperCase() : ""
            })
        }, j = function (t) {
            return M.call(t, function (e, n) {
                return t.indexOf(e) == n
            })
        }, J.fragment = function (t, e, n) {
            var i, r, a;
            return _.test(t) && (i = S(A.createElement(RegExp.$1))), i || (t.replace && (t = t.replace(R, "<$1></$2>")), e === E && (e = F.test(t) && RegExp.$1), e in U || (e = "*"), a = U[e], a.innerHTML = "" + t, i = S.each(k.call(a.childNodes), function () {
                a.removeChild(this)
            })), o(n) && (r = S(i), S.each(n, function (t, e) {
                I.indexOf(t) > -1 ? r[t](e) : r.attr(t, e)
            })), i
        }, J.Z = function (t, e) {
            return new d(t, e)
        }, J.isZ = function (t) {
            return t instanceof J.Z
        }, J.init = function (t, n) {
            var i;
            if (!t)return J.Z();
            if ("string" == typeof t)if (t = t.trim(), "<" == t[0] && F.test(t)) i = J.fragment(t, RegExp.$1, n), t = null; else {
                if (n !== E)return S(n).find(t);
                i = J.qsa(A, t)
            } else {
                if (e(t))return S(A).ready(t);
                if (J.isZ(t))return t;
                if (Q(t)) i = s(t); else if (r(t)) i = [t], t = null; else if (F.test(t)) i = J.fragment(t.trim(), RegExp.$1, n), t = null; else {
                    if (n !== E)return S(n).find(t);
                    i = J.qsa(A, t)
                }
            }
            return J.Z(i, t)
        }, S = function (t, e) {
            return J.init(t, e)
        }, S.extend = function (t) {
            var e, n = k.call(arguments, 1);
            return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
                m(t, n, e)
            }), t
        }, J.qsa = function (t, e) {
            var n, i = "#" == e[0], r = !i && "." == e[0], o = i || r ? e.slice(1) : e, a = H.test(o);
            return t.getElementById && a && i ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : k.call(a && !i && t.getElementsByClassName ? r ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
        }, S.contains = A.documentElement.contains ? function (t, e) {
            return t !== e && t.contains(e)
        } : function (t, e) {
            for (; e && (e = e.parentNode);)if (e === t)return !0;
            return !1
        }, S.type = t, S.isFunction = e, S.isWindow = n, S.isArray = Q, S.isPlainObject = o, S.isEmptyObject = function (t) {
            var e;
            for (e in t)return !1;
            return !0
        }, S.inArray = function (t, e, n) {
            return O.indexOf.call(e, t, n)
        }, S.camelCase = C, S.trim = function (t) {
            return null == t ? "" : String.prototype.trim.call(t)
        }, S.uuid = 0, S.support = {}, S.expr = {}, S.noop = function () {
        }, S.map = function (t, e) {
            var n, i, r, o = [];
            if (a(t))for (i = 0; i < t.length; i++)n = e(t[i], i), null != n && o.push(n); else for (r in t)n = e(t[r], r), null != n && o.push(n);
            return c(o)
        }, S.each = function (t, e) {
            var n, i;
            if (a(t)) {
                for (n = 0; n < t.length; n++)if (e.call(t[n], n, t[n]) === !1)return t
            } else for (i in t)if (e.call(t[i], i, t[i]) === !1)return t;
            return t
        }, S.grep = function (t, e) {
            return M.call(t, e)
        }, window.JSON && (S.parseJSON = JSON.parse), S.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
            X["[object " + e + "]"] = e.toLowerCase()
        }), S.fn = {
            constructor: J.Z,
            length: 0,
            forEach: O.forEach,
            reduce: O.reduce,
            push: O.push,
            sort: O.sort,
            splice: O.splice,
            indexOf: O.indexOf,
            concat: function () {
                var t, e, n = [];
                for (t = 0; t < arguments.length; t++)e = arguments[t], n[t] = J.isZ(e) ? e.toArray() : e;
                return N.apply(J.isZ(this) ? this.toArray() : this, n)
            },
            map: function (t) {
                return S(S.map(this, function (e, n) {
                    return t.call(e, n, e)
                }))
            },
            slice: function () {
                return S(k.apply(this, arguments))
            },
            ready: function (t) {
                return V.test(A.readyState) && A.body ? t(S) : A.addEventListener("DOMContentLoaded", function () {
                    t(S)
                }, !1), this
            },
            get: function (t) {
                return t === E ? k.call(this) : this[t >= 0 ? t : t + this.length]
            },
            toArray: function () {
                return this.get()
            },
            size: function () {
                return this.length
            },
            remove: function () {
                return this.each(function () {
                    null != this.parentNode && this.parentNode.removeChild(this)
                })
            },
            each: function (t) {
                return O.every.call(this, function (e, n) {
                    return t.call(e, n, e) !== !1
                }), this
            },
            filter: function (t) {
                return e(t) ? this.not(this.not(t)) : S(M.call(this, function (e) {
                    return J.matches(e, t)
                }))
            },
            add: function (t, e) {
                return S(j(this.concat(S(t, e))))
            },
            is: function (t) {
                return this.length > 0 && J.matches(this[0], t)
            },
            not: function (t) {
                var n = [];
                if (e(t) && t.call !== E) this.each(function (e) {
                    t.call(this, e) || n.push(this)
                }); else {
                    var i = "string" == typeof t ? this.filter(t) : a(t) && e(t.item) ? k.call(t) : S(t);
                    this.forEach(function (t) {
                        i.indexOf(t) < 0 && n.push(t)
                    })
                }
                return S(n)
            },
            has: function (t) {
                return this.filter(function () {
                    return r(t) ? S.contains(this, t) : S(this).find(t).size()
                })
            },
            eq: function (t) {
                return t === -1 ? this.slice(t) : this.slice(t, +t + 1)
            },
            first: function () {
                var t = this[0];
                return t && !r(t) ? t : S(t)
            },
            last: function () {
                var t = this[this.length - 1];
                return t && !r(t) ? t : S(t)
            },
            find: function (t) {
                var e, n = this;
                return e = t ? "object" == typeof t ? S(t).filter(function () {
                    var t = this;
                    return O.some.call(n, function (e) {
                        return S.contains(e, t)
                    })
                }) : 1 == this.length ? S(J.qsa(this[0], t)) : this.map(function () {
                    return J.qsa(this, t)
                }) : S()
            },
            closest: function (t, e) {
                var n = this[0], r = !1;
                for ("object" == typeof t && (r = S(t)); n && !(r ? r.indexOf(n) >= 0 : J.matches(n, t));)n = n !== e && !i(n) && n.parentNode;
                return S(n)
            },
            parents: function (t) {
                for (var e = [], n = this; n.length > 0;)n = S.map(n, function (t) {
                    if ((t = t.parentNode) && !i(t) && e.indexOf(t) < 0)return e.push(t), t
                });
                return v(e, t)
            },
            parent: function (t) {
                return v(j(this.pluck("parentNode")), t)
            },
            children: function (t) {
                return v(this.map(function () {
                    return p(this)
                }), t)
            },
            contents: function () {
                return this.map(function () {
                    return this.contentDocument || k.call(this.childNodes)
                })
            },
            siblings: function (t) {
                return v(this.map(function (t, e) {
                    return M.call(p(e.parentNode), function (t) {
                        return t !== e
                    })
                }), t)
            },
            empty: function () {
                return this.each(function () {
                    this.innerHTML = ""
                })
            },
            pluck: function (t) {
                return S.map(this, function (e) {
                    return e[t]
                })
            },
            show: function () {
                return this.each(function () {
                    "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
                })
            },
            replaceWith: function (t) {
                return this.before(t).remove()
            },
            wrap: function (t) {
                var n = e(t);
                if (this[0] && !n)var i = S(t).get(0), r = i.parentNode || this.length > 1;
                return this.each(function (e) {
                    S(this).wrapAll(n ? t.call(this, e) : r ? i.cloneNode(!0) : i)
                })
            },
            wrapAll: function (t) {
                if (this[0]) {
                    S(this[0]).before(t = S(t));
                    for (var e; (e = t.children()).length;)t = e.first();
                    S(t).append(this)
                }
                return this
            },
            wrapInner: function (t) {
                var n = e(t);
                return this.each(function (e) {
                    var i = S(this), r = i.contents(), o = n ? t.call(this, e) : t;
                    r.length ? r.wrapAll(o) : i.append(o)
                })
            },
            unwrap: function () {
                return this.parent().each(function () {
                    S(this).replaceWith(S(this).children())
                }), this
            },
            clone: function () {
                return this.map(function () {
                    return this.cloneNode(!0)
                })
            },
            hide: function () {
                return this.css("display", "none")
            },
            toggle: function (t) {
                return this.each(function () {
                    var e = S(this);
                    (t === E ? "none" == e.css("display") : t) ? e.show() : e.hide()
                })
            },
            prev: function (t) {
                return S(this.pluck("previousElementSibling")).filter(t || "*")
            },
            next: function (t) {
                return S(this.pluck("nextElementSibling")).filter(t || "*")
            },
            html: function (t) {
                return 0 in arguments ? this.each(function (e) {
                    var n = this.innerHTML;
                    S(this).empty().append(g(this, t, e, n))
                }) : 0 in this ? this[0].innerHTML : null
            },
            text: function (t) {
                return 0 in arguments ? this.each(function (e) {
                    var n = g(this, t, e, this.textContent);
                    this.textContent = null == n ? "" : "" + n
                }) : 0 in this ? this[0].textContent : null
            },
            attr: function (t, e) {
                var n;
                return "string" != typeof t || 1 in arguments ? this.each(function (n) {
                    if (1 === this.nodeType)if (r(t))for (T in t)y(this, T, t[T]); else y(this, t, g(this, e, n, this.getAttribute(t)))
                }) : this.length && 1 === this[0].nodeType ? !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : E
            },
            removeAttr: function (t) {
                return this.each(function () {
                    1 === this.nodeType && t.split(" ").forEach(function (t) {
                        y(this, t)
                    }, this)
                })
            },
            prop: function (t, e) {
                return t = K[t] || t, 1 in arguments ? this.each(function (n) {
                    this[t] = g(this, e, n, this[t])
                }) : this[0] && this[0][t]
            },
            data: function (t, e) {
                var n = "data-" + t.replace(q, "-$1").toLowerCase(),
                    i = 1 in arguments ? this.attr(n, e) : this.attr(n);
                return null !== i ? w(i) : E
            },
            val: function (t) {
                return 0 in arguments ? this.each(function (e) {
                    this.value = g(this, t, e, this.value)
                }) : this[0] && (this[0].multiple ? S(this[0]).find("option").filter(function () {
                        return this.selected
                    }).pluck("value") : this[0].value)
            },
            offset: function (t) {
                if (t)return this.each(function (e) {
                    var n = S(this), i = g(this, t, e, n.offset()), r = n.offsetParent().offset(),
                        o = {top: i.top - r.top, left: i.left - r.left};
                    "static" == n.css("position") && (o.position = "relative"), n.css(o)
                });
                if (!this.length)return null;
                if (!S.contains(A.documentElement, this[0]))return {top: 0, left: 0};
                var e = this[0].getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    width: Math.round(e.width),
                    height: Math.round(e.height)
                }
            },
            css: function (e, n) {
                if (arguments.length < 2) {
                    var i, r = this[0];
                    if (!r)return;
                    if (i = getComputedStyle(r, ""), "string" == typeof e)return r.style[C(e)] || i.getPropertyValue(e);
                    if (Q(e)) {
                        var o = {};
                        return S.each(e, function (t, e) {
                            o[e] = r.style[C(e)] || i.getPropertyValue(e)
                        }), o
                    }
                }
                var a = "";
                if ("string" == t(e)) n || 0 === n ? a = u(e) + ":" + f(e, n) : this.each(function () {
                    this.style.removeProperty(u(e))
                }); else for (T in e)e[T] || 0 === e[T] ? a += u(T) + ":" + f(T, e[T]) + ";" : this.each(function () {
                    this.style.removeProperty(u(T))
                });
                return this.each(function () {
                    this.style.cssText += ";" + a
                })
            },
            index: function (t) {
                return t ? this.indexOf(S(t)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function (t) {
                return !!t && O.some.call(this, function (t) {
                        return this.test(b(t))
                    }, l(t))
            },
            addClass: function (t) {
                return t ? this.each(function (e) {
                    if ("className" in this) {
                        P = [];
                        var n = b(this), i = g(this, t, e, n);
                        i.split(/\s+/g).forEach(function (t) {
                            S(this).hasClass(t) || P.push(t)
                        }, this), P.length && b(this, n + (n ? " " : "") + P.join(" "))
                    }
                }) : this
            },
            removeClass: function (t) {
                return this.each(function (e) {
                    if ("className" in this) {
                        if (t === E)return b(this, "");
                        P = b(this), g(this, t, e, P).split(/\s+/g).forEach(function (t) {
                            P = P.replace(l(t), " ")
                        }), b(this, P.trim())
                    }
                })
            },
            toggleClass: function (t, e) {
                return t ? this.each(function (n) {
                    var i = S(this), r = g(this, t, n, b(this));
                    r.split(/\s+/g).forEach(function (t) {
                        (e === E ? !i.hasClass(t) : e) ? i.addClass(t) : i.removeClass(t)
                    })
                }) : this
            },
            scrollTop: function (t) {
                if (this.length) {
                    var e = "scrollTop" in this[0];
                    return t === E ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function () {
                        this.scrollTop = t
                    } : function () {
                        this.scrollTo(this.scrollX, t)
                    })
                }
            },
            scrollLeft: function (t) {
                if (this.length) {
                    var e = "scrollLeft" in this[0];
                    return t === E ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function () {
                        this.scrollLeft = t
                    } : function () {
                        this.scrollTo(t, this.scrollY)
                    })
                }
            },
            position: function () {
                if (this.length) {
                    var t = this[0], e = this.offsetParent(), n = this.offset(),
                        i = z.test(e[0].nodeName) ? {top: 0, left: 0} : e.offset();
                    return n.top -= parseFloat(S(t).css("margin-top")) || 0, n.left -= parseFloat(S(t).css("margin-left")) || 0, i.top += parseFloat(S(e[0]).css("border-top-width")) || 0, i.left += parseFloat(S(e[0]).css("border-left-width")) || 0, {
                        top: n.top - i.top,
                        left: n.left - i.left
                    }
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var t = this.offsetParent || A.body; t && !z.test(t.nodeName) && "static" == S(t).css("position");)t = t.offsetParent;
                    return t
                })
            }
        }, S.fn.detach = S.fn.remove, ["width", "height"].forEach(function (t) {
            var e = t.replace(/./, function (t) {
                return t[0].toUpperCase()
            });
            S.fn[t] = function (r) {
                var o, a = this[0];
                return r === E ? n(a) ? a["inner" + e] : i(a) ? a.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function (e) {
                    a = S(this), a.css(t, g(this, r, e, a[t]()))
                })
            }
        }), W.forEach(function (e, n) {
            var i = n % 2;
            S.fn[e] = function () {
                var e, r, o = S.map(arguments, function (n) {
                    return e = t(n), "object" == e || "array" == e || null == n ? n : J.fragment(n)
                }), a = this.length > 1;
                return o.length < 1 ? this : this.each(function (t, e) {
                    r = i ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null;
                    var s = S.contains(A.documentElement, r);
                    o.forEach(function (t) {
                        if (a) t = t.cloneNode(!0); else if (!r)return S(t).remove();
                        r.insertBefore(t, e), s && x(t, function (t) {
                            null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                        })
                    })
                })
            }, S.fn[i ? e + "To" : "insert" + (n ? "Before" : "After")] = function (t) {
                return S(t)[e](this), this
            }
        }), J.Z.prototype = d.prototype = S.fn, J.uniq = j, J.deserializeValue = w, S.zepto = J, S
    }();
    return window.Zepto = n, void 0 === window.$ && (window.$ = n), function (t) {
        function e(e, n, i) {
            var r = t.Event(n);
            return t(e).trigger(r, i), !r.isDefaultPrevented()
        }

        function n(t, n, i, r) {
            if (t.global)return e(n || y, i, r)
        }

        function i(e) {
            e.global && 0 === t.active++ && n(e, null, "ajaxStart")
        }

        function r(e) {
            e.global && !--t.active && n(e, null, "ajaxStop")
        }

        function o(t, e) {
            var i = e.context;
            return e.beforeSend.call(i, t, e) !== !1 && n(e, i, "ajaxBeforeSend", [t, e]) !== !1 && void n(e, i, "ajaxSend", [t, e])
        }

        function a(t, e, i, r) {
            var o = i.context, a = "success";
            i.success.call(o, t, a, e), r && r.resolveWith(o, [t, a, e]), n(i, o, "ajaxSuccess", [e, i, t]), c(a, e, i)
        }

        function s(t, e, i, r, o) {
            var a = r.context;
            r.error.call(a, i, e, t), o && o.rejectWith(a, [i, e, t]), n(r, a, "ajaxError", [i, r, t || e]), c(e, i, r)
        }

        function c(t, e, i) {
            var o = i.context;
            i.complete.call(o, e, t), n(i, o, "ajaxComplete", [e, i]), r(i)
        }

        function u() {
        }

        function l(t) {
            return t && (t = t.split(";", 2)[0]), t && (t == T ? "html" : t == E ? "json" : w.test(t) ? "script" : x.test(t) && "xml") || "text"
        }

        function f(t, e) {
            return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
        }

        function h(e) {
            e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data), e.data = void 0)
        }

        function p(e, n, i, r) {
            return t.isFunction(n) && (r = i, i = n, n = void 0), t.isFunction(i) || (r = i, i = void 0), {
                url: e,
                data: n,
                success: i,
                dataType: r
            }
        }

        function d(e, n, i, r) {
            var o, a = t.isArray(n), s = t.isPlainObject(n);
            t.each(n, function (n, c) {
                o = t.type(c), r && (n = i ? r : r + "[" + (s || "object" == o || "array" == o ? n : "") + "]"), !r && a ? e.add(c.name, c.value) : "array" == o || !i && "object" == o ? d(e, c, i, n) : e.add(n, c)
            })
        }

        var m, v, g = 0, y = window.document, b = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            w = /^(?:text|application)\/javascript/i, x = /^(?:text|application)\/xml/i, E = "application/json",
            T = "text/html", S = /^\s*$/, P = y.createElement("a");
        P.href = window.location.href, t.active = 0, t.ajaxJSONP = function (e, n) {
            if (!("type" in e))return t.ajax(e);
            var i, r, c = e.jsonpCallback, u = (t.isFunction(c) ? c() : c) || "jsonp" + ++g,
                l = y.createElement("script"), f = window[u], h = function (e) {
                    t(l).triggerHandler("error", e || "abort")
                }, p = {abort: h};
            return n && n.promise(p), t(l).on("load error", function (o, c) {
                clearTimeout(r), t(l).off().remove(), "error" != o.type && i ? a(i[0], p, e, n) : s(null, c || "error", p, e, n), window[u] = f, i && t.isFunction(f) && f(i[0]), f = i = void 0
            }), o(p, e) === !1 ? (h("abort"), p) : (window[u] = function () {
                i = arguments
            }, l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + u), y.head.appendChild(l), e.timeout > 0 && (r = setTimeout(function () {
                h("timeout")
            }, e.timeout)), p)
        }, t.ajaxSettings = {
            type: "GET",
            beforeSend: u,
            success: u,
            error: u,
            complete: u,
            context: null,
            global: !0,
            xhr: function () {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: E,
                xml: "application/xml, text/xml",
                html: T,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0
        }, t.ajax = function (e) {
            var n, r, c = t.extend({}, e || {}), p = t.Deferred && t.Deferred();
            for (m in t.ajaxSettings)void 0 === c[m] && (c[m] = t.ajaxSettings[m]);
            i(c), c.crossDomain || (n = y.createElement("a"), n.href = c.url, n.href = n.href, c.crossDomain = P.protocol + "//" + P.host != n.protocol + "//" + n.host), c.url || (c.url = window.location.toString()), (r = c.url.indexOf("#")) > -1 && (c.url = c.url.slice(0, r)), h(c);
            var d = c.dataType, g = /\?.+=\?/.test(c.url);
            if (g && (d = "jsonp"), c.cache !== !1 && (e && e.cache === !0 || "script" != d && "jsonp" != d) || (c.url = f(c.url, "_=" + Date.now())), "jsonp" == d)return g || (c.url = f(c.url, c.jsonp ? c.jsonp + "=?" : c.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(c, p);
            var b, w = c.accepts[d], x = {}, E = function (t, e) {
                    x[t.toLowerCase()] = [t, e]
                }, T = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1 : window.location.protocol, C = c.xhr(),
                j = C.setRequestHeader;
            if (p && p.promise(C), c.crossDomain || E("X-Requested-With", "XMLHttpRequest"), E("Accept", w || "*/*"), (w = c.mimeType || w) && (w.indexOf(",") > -1 && (w = w.split(",", 2)[0]), C.overrideMimeType && C.overrideMimeType(w)), (c.contentType || c.contentType !== !1 && c.data && "GET" != c.type.toUpperCase()) && E("Content-Type", c.contentType || "application/x-www-form-urlencoded"), c.headers)for (v in c.headers)E(v, c.headers[v]);
            if (C.setRequestHeader = E, C.onreadystatechange = function () {
                    if (4 == C.readyState) {
                        C.onreadystatechange = u, clearTimeout(b);
                        var e, n = !1;
                        if (C.status >= 200 && C.status < 300 || 304 == C.status || 0 == C.status && "file:" == T) {
                            d = d || l(c.mimeType || C.getResponseHeader("content-type")), e = C.responseText;
                            try {
                                "script" == d ? (0, eval)(e) : "xml" == d ? e = C.responseXML : "json" == d && (e = S.test(e) ? null : t.parseJSON(e))
                            } catch (i) {
                                n = i
                            }
                            n ? s(n, "parsererror", C, c, p) : a(e, C, c, p)
                        } else s(C.statusText || null, C.status ? "error" : "abort", C, c, p)
                    }
                }, o(C, c) === !1)return C.abort(), s(null, "abort", C, c, p), C;
            if (c.xhrFields)for (v in c.xhrFields)C[v] = c.xhrFields[v];
            var O = !("async" in c) || c.async;
            C.open(c.type, c.url, O, c.username, c.password);
            for (v in x)j.apply(C, x[v]);
            return c.timeout > 0 && (b = setTimeout(function () {
                C.onreadystatechange = u, C.abort(), s(null, "timeout", C, c, p)
            }, c.timeout)), C.send(c.data ? c.data : null), C
        }, t.get = function () {
            return t.ajax(p.apply(null, arguments))
        }, t.post = function () {
            var e = p.apply(null, arguments);
            return e.type = "POST", t.ajax(e)
        }, t.getJSON = function () {
            var e = p.apply(null, arguments);
            return e.dataType = "json", t.ajax(e)
        }, t.fn.load = function (e, n, i) {
            if (!this.length)return this;
            var r, o = this, a = e.split(/\s/), s = p(e, n, i), c = s.success;
            return a.length > 1 && (s.url = a[0], r = a[1]), s.success = function (e) {
                o.html(r ? t("<div>").html(e.replace(b, "")).find(r) : e), c && c.apply(o, arguments)
            }, t.ajax(s), this
        };
        var C = encodeURIComponent;
        t.param = function (e, n) {
            var i = [];
            return i.add = function (e, n) {
                t.isFunction(n) && (n = n()), null == n && (n = ""), this.push(C(e) + "=" + C(n))
            }, d(i, e, n), i.join("&").replace(/%20/g, "+")
        }
    }(n), function (t) {
        t.Callbacks = function (e) {
            e = t.extend({}, e);
            var n, i, r, o, a, s, c = [], u = !e.once && [], l = function (t) {
                for (n = e.memory && t, i = !0, s = o || 0, o = 0, a = c.length, r = !0; c && s < a; ++s)if (c[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                    n = !1;
                    break
                }
                r = !1, c && (u ? u.length && l(u.shift()) : n ? c.length = 0 : f.disable())
            }, f = {
                add: function () {
                    if (c) {
                        var i = c.length, s = function (n) {
                            t.each(n, function (t, n) {
                                "function" == typeof n ? e.unique && f.has(n) || c.push(n) : n && n.length && "string" != typeof n && s(n)
                            })
                        };
                        s(arguments), r ? a = c.length : n && (o = i, l(n))
                    }
                    return this
                }, remove: function () {
                    return c && t.each(arguments, function (e, n) {
                        for (var i; (i = t.inArray(n, c, i)) > -1;)c.splice(i, 1), r && (i <= a && --a, i <= s && --s)
                    }), this
                }, has: function (e) {
                    return !(!c || !(e ? t.inArray(e, c) > -1 : c.length))
                }, empty: function () {
                    return a = c.length = 0, this
                }, disable: function () {
                    return c = u = n = void 0, this
                }, disabled: function () {
                    return !c
                }, lock: function () {
                    return u = void 0, n || f.disable(), this
                }, locked: function () {
                    return !u
                }, fireWith: function (t, e) {
                    return !c || i && !u || (e = e || [], e = [t, e.slice ? e.slice() : e], r ? u.push(e) : l(e)), this
                }, fire: function () {
                    return f.fireWith(this, arguments)
                }, fired: function () {
                    return !!i
                }
            };
            return f
        }
    }(n), function (t) {
        function e(e, i) {
            var c = e[s], u = c && r[c];
            if (void 0 === i)return u || n(e);
            if (u) {
                if (i in u)return u[i];
                var l = a(i);
                if (l in u)return u[l]
            }
            return o.call(t(e), i)
        }

        function n(e, n, o) {
            var c = e[s] || (e[s] = ++t.uuid), u = r[c] || (r[c] = i(e));
            return void 0 !== n && (u[a(n)] = o), u
        }

        function i(e) {
            var n = {};
            return t.each(e.attributes || c, function (e, i) {
                0 == i.name.indexOf("data-") && (n[a(i.name.replace("data-", ""))] = t.zepto.deserializeValue(i.value))
            }), n
        }

        var r = {}, o = t.fn.data, a = t.camelCase, s = t.expando = "Zepto" + +new Date, c = [];
        t.fn.data = function (i, r) {
            return void 0 === r ? t.isPlainObject(i) ? this.each(function (e, r) {
                t.each(i, function (t, e) {
                    n(r, t, e)
                })
            }) : 0 in this ? e(this[0], i) : void 0 : this.each(function () {
                n(this, i, r)
            })
        }, t.fn.removeData = function (e) {
            return "string" == typeof e && (e = e.split(/\s+/)), this.each(function () {
                var n = this[s], i = n && r[n];
                i && t.each(e || i, function (t) {
                    delete i[e ? a(this) : t]
                })
            })
        }, ["remove", "empty"].forEach(function (e) {
            var n = t.fn[e];
            t.fn[e] = function () {
                var t = this.find("*");
                return "remove" === e && (t = t.add(this)), t.removeData(), n.call(this)
            }
        })
    }(n), function (t) {
        function e(n) {
            var i = [["resolve", "done", t.Callbacks({
                once: 1,
                memory: 1
            }), "resolved"], ["reject", "fail", t.Callbacks({
                once: 1,
                memory: 1
            }), "rejected"], ["notify", "progress", t.Callbacks({memory: 1})]], r = "pending", o = {
                state: function () {
                    return r
                }, always: function () {
                    return a.done(arguments).fail(arguments), this
                }, then: function () {
                    var n = arguments;
                    return e(function (e) {
                        t.each(i, function (i, r) {
                            var s = t.isFunction(n[i]) && n[i];
                            a[r[1]](function () {
                                var n = s && s.apply(this, arguments);
                                if (n && t.isFunction(n.promise)) n.promise().done(e.resolve).fail(e.reject).progress(e.notify); else {
                                    var i = this === o ? e.promise() : this, a = s ? [n] : arguments;
                                    e[r[0] + "With"](i, a)
                                }
                            })
                        }), n = null
                    }).promise()
                }, promise: function (e) {
                    return null != e ? t.extend(e, o) : o
                }
            }, a = {};
            return t.each(i, function (t, e) {
                var n = e[2], s = e[3];
                o[e[1]] = n.add, s && n.add(function () {
                    r = s
                }, i[1 ^ t][2].disable, i[2][2].lock), a[e[0]] = function () {
                    return a[e[0] + "With"](this === a ? o : this, arguments), this
                }, a[e[0] + "With"] = n.fireWith
            }), o.promise(a), n && n.call(a, a), a
        }

        var n = Array.prototype.slice;
        t.when = function (i) {
            var r, o, a, s = n.call(arguments), c = s.length, u = 0,
                l = 1 !== c || i && t.isFunction(i.promise) ? c : 0, f = 1 === l ? i : e(), h = function (t, e, i) {
                    return function (o) {
                        e[t] = this, i[t] = arguments.length > 1 ? n.call(arguments) : o, i === r ? f.notifyWith(e, i) : --l || f.resolveWith(e, i)
                    }
                };
            if (c > 1)for (r = new Array(c), o = new Array(c), a = new Array(c); u < c; ++u)s[u] && t.isFunction(s[u].promise) ? s[u].promise().done(h(u, a, s)).fail(f.reject).progress(h(u, o, r)) : --l;
            return l || f.resolveWith(a, s), f.promise()
        }, t.Deferred = e
    }(n), function (t) {
        function e(t, e) {
            var n = this.os = {}, i = this.browser = {}, r = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
                o = t.match(/(Android);?[\s\/]+([\d.]+)?/), a = !!t.match(/\(Macintosh\; Intel /),
                s = t.match(/(iPad).*OS\s([\d_]+)/), c = t.match(/(iPod)(.*OS\s([\d_]+))?/),
                u = !s && t.match(/(iPhone\sOS)\s([\d_]+)/), l = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
                f = /Win\d{2}|Windows/.test(e), h = t.match(/Windows Phone ([\d.]+)/), p = l && t.match(/TouchPad/),
                d = t.match(/Kindle\/([\d.]+)/), m = t.match(/Silk\/([\d._]+)/),
                v = t.match(/(BlackBerry).*Version\/([\d.]+)/), g = t.match(/(BB10).*Version\/([\d.]+)/),
                y = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/), b = t.match(/PlayBook/),
                w = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/), x = t.match(/Firefox\/([\d.]+)/),
                E = t.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
                T = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
                S = !w && t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
                P = S || t.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
            (i.webkit = !!r) && (i.version = r[1]), o && (n.android = !0, n.version = o[2]), u && !c && (n.ios = n.iphone = !0, n.version = u[2].replace(/_/g, ".")), s && (n.ios = n.ipad = !0, n.version = s[2].replace(/_/g, ".")), c && (n.ios = n.ipod = !0, n.version = c[3] ? c[3].replace(/_/g, ".") : null), h && (n.wp = !0, n.version = h[1]), l && (n.webos = !0, n.version = l[2]), p && (n.touchpad = !0), v && (n.blackberry = !0, n.version = v[2]), g && (n.bb10 = !0, n.version = g[2]), y && (n.rimtabletos = !0, n.version = y[2]), b && (i.playbook = !0), d && (n.kindle = !0, n.version = d[1]), m && (i.silk = !0, i.version = m[1]), !m && n.android && t.match(/Kindle Fire/) && (i.silk = !0), w && (i.chrome = !0, i.version = w[1]), x && (i.firefox = !0, i.version = x[1]), E && (n.firefoxos = !0, n.version = E[1]), T && (i.ie = !0, i.version = T[1]), P && (a || n.ios || f) && (i.safari = !0, n.ios || (i.version = P[1])), S && (i.webview = !0), n.tablet = !!(s || b || o && !t.match(/Mobile/) || x && t.match(/Tablet/) || T && !t.match(/Phone/) && t.match(/Touch/)), n.phone = !(n.tablet || n.ipod || !(o || u || l || v || g || w && t.match(/Android/) || w && t.match(/CriOS\/([\d.]+)/) || x && t.match(/Mobile/) || T && t.match(/Touch/)))
        }

        e.call(t, navigator.userAgent, navigator.platform), t.__detect = e
    }(n), function (t) {
        function e(t) {
            return t._zid || (t._zid = h++)
        }

        function n(t, n, o, a) {
            if (n = i(n), n.ns)var s = r(n.ns);
            return (v[e(t)] || []).filter(function (t) {
                return t && (!n.e || t.e == n.e) && (!n.ns || s.test(t.ns)) && (!o || e(t.fn) === e(o)) && (!a || t.sel == a)
            })
        }

        function i(t) {
            var e = ("" + t).split(".");
            return {e: e[0], ns: e.slice(1).sort().join(" ")}
        }

        function r(t) {
            return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
        }

        function o(t, e) {
            return t.del && !y && t.e in b || !!e
        }

        function a(t) {
            return w[t] || y && b[t] || t
        }

        function s(n, r, s, c, l, h, p) {
            var d = e(n), m = v[d] || (v[d] = []);
            r.split(/\s/).forEach(function (e) {
                if ("ready" == e)return t(document).ready(s);
                var r = i(e);
                r.fn = s, r.sel = l, r.e in w && (s = function (e) {
                    var n = e.relatedTarget;
                    if (!n || n !== this && !t.contains(this, n))return r.fn.apply(this, arguments)
                }), r.del = h;
                var d = h || s;
                r.proxy = function (t) {
                    if (t = u(t), !t.isImmediatePropagationStopped()) {
                        t.data = c;
                        var e = d.apply(n, t._args == f ? [t] : [t].concat(t._args));
                        return e === !1 && (t.preventDefault(), t.stopPropagation()), e
                    }
                }, r.i = m.length, m.push(r), "addEventListener" in n && n.addEventListener(a(r.e), r.proxy, o(r, p))
            })
        }

        function c(t, i, r, s, c) {
            var u = e(t);
            (i || "").split(/\s/).forEach(function (e) {
                n(t, e, r, s).forEach(function (e) {
                    delete v[u][e.i], "removeEventListener" in t && t.removeEventListener(a(e.e), e.proxy, o(e, c))
                })
            })
        }

        function u(e, n) {
            return !n && e.isDefaultPrevented || (n || (n = e), t.each(S, function (t, i) {
                var r = n[t];
                e[t] = function () {
                    return this[i] = x, r && r.apply(n, arguments)
                }, e[i] = E
            }), (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = x)), e
        }

        function l(t) {
            var e, n = {originalEvent: t};
            for (e in t)T.test(e) || t[e] === f || (n[e] = t[e]);
            return u(n, t)
        }

        var f, h = 1, p = Array.prototype.slice, d = t.isFunction, m = function (t) {
                return "string" == typeof t
            }, v = {}, g = {}, y = "onfocusin" in window, b = {focus: "focusin", blur: "focusout"},
            w = {mouseenter: "mouseover", mouseleave: "mouseout"};
        g.click = g.mousedown = g.mouseup = g.mousemove = "MouseEvents", t.event = {
            add: s,
            remove: c
        }, t.proxy = function (n, i) {
            var r = 2 in arguments && p.call(arguments, 2);
            if (d(n)) {
                var o = function () {
                    return n.apply(i, r ? r.concat(p.call(arguments)) : arguments)
                };
                return o._zid = e(n), o
            }
            if (m(i))return r ? (r.unshift(n[i], n), t.proxy.apply(null, r)) : t.proxy(n[i], n);
            throw new TypeError("expected function")
        }, t.fn.bind = function (t, e, n) {
            return this.on(t, e, n)
        }, t.fn.unbind = function (t, e) {
            return this.off(t, e)
        }, t.fn.one = function (t, e, n, i) {
            return this.on(t, e, n, i, 1)
        };
        var x = function () {
            return !0
        }, E = function () {
            return !1
        }, T = /^([A-Z]|returnValue$|layer[XY]$)/, S = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        t.fn.delegate = function (t, e, n) {
            return this.on(e, t, n)
        }, t.fn.undelegate = function (t, e, n) {
            return this.off(e, t, n)
        }, t.fn.live = function (e, n) {
            return t(document.body).delegate(this.selector, e, n), this
        }, t.fn.die = function (e, n) {
            return t(document.body).undelegate(this.selector, e, n), this
        }, t.fn.on = function (e, n, i, r, o) {
            var a, u, h = this;
            return e && !m(e) ? (t.each(e, function (t, e) {
                h.on(t, n, i, e, o)
            }), h) : (m(n) || d(r) || r === !1 || (r = i, i = n, n = f), r !== f && i !== !1 || (r = i, i = f), r === !1 && (r = E), h.each(function (f, h) {
                o && (a = function (t) {
                    return c(h, t.type, r), r.apply(this, arguments)
                }), n && (u = function (e) {
                    var i, o = t(e.target).closest(n, h).get(0);
                    if (o && o !== h)return i = t.extend(l(e), {
                        currentTarget: o,
                        liveFired: h
                    }), (a || r).apply(o, [i].concat(p.call(arguments, 1)))
                }), s(h, e, r, i, n, u || a)
            }))
        }, t.fn.off = function (e, n, i) {
            var r = this;
            return e && !m(e) ? (t.each(e, function (t, e) {
                r.off(t, n, e)
            }), r) : (m(n) || d(i) || i === !1 || (i = n, n = f), i === !1 && (i = E), r.each(function () {
                c(this, e, i, n)
            }))
        }, t.fn.trigger = function (e, n) {
            return e = m(e) || t.isPlainObject(e) ? t.Event(e) : u(e), e._args = n, this.each(function () {
                e.type in b && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
            })
        }, t.fn.triggerHandler = function (e, i) {
            var r, o;
            return this.each(function (a, s) {
                r = l(m(e) ? t.Event(e) : e), r._args = i, r.target = s, t.each(n(s, e.type || e), function (t, e) {
                    if (o = e.proxy(r), r.isImmediatePropagationStopped())return !1
                })
            }), o
        }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (e) {
            t.fn[e] = function (t) {
                return 0 in arguments ? this.bind(e, t) : this.trigger(e)
            }
        }), t.Event = function (t, e) {
            m(t) || (e = t, t = e.type);
            var n = document.createEvent(g[t] || "Events"), i = !0;
            if (e)for (var r in e)"bubbles" == r ? i = !!e[r] : n[r] = e[r];
            return n.initEvent(t, i, !0), u(n)
        }
    }(n), function (t) {
        t.fn.serializeArray = function () {
            var e, n, i = [], r = function (t) {
                return t.forEach ? t.forEach(r) : void i.push({name: e, value: t})
            };
            return this[0] && t.each(this[0].elements, function (i, o) {
                n = o.type, e = o.name, e && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || o.checked) && r(t(o).val())
            }), i
        }, t.fn.serialize = function () {
            var t = [];
            return this.serializeArray().forEach(function (e) {
                t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
            }), t.join("&")
        }, t.fn.submit = function (e) {
            if (0 in arguments) this.bind("submit", e); else if (this.length) {
                var n = t.Event("submit");
                this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
            }
            return this
        }
    }(n), function (t, e) {
        function n(t) {
            return t.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
        }

        function i(t) {
            return r ? r + t : t.toLowerCase()
        }

        var r, o, a, s, c, u, l, f, h, p, d = "", m = {Webkit: "webkit", Moz: "", O: "o"},
            v = document.createElement("div"),
            g = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, y = {};
        t.each(m, function (t, n) {
            if (v.style[t + "TransitionProperty"] !== e)return d = "-" + t.toLowerCase() + "-", r = n, !1
        }), o = d + "transform", y[a = d + "transition-property"] = y[s = d + "transition-duration"] = y[u = d + "transition-delay"] = y[c = d + "transition-timing-function"] = y[l = d + "animation-name"] = y[f = d + "animation-duration"] = y[p = d + "animation-delay"] = y[h = d + "animation-timing-function"] = "", t.fx = {
            off: r === e && v.style.transitionProperty === e,
            speeds: {_default: 400, fast: 200, slow: 600},
            cssPrefix: d,
            transitionEnd: i("TransitionEnd"),
            animationEnd: i("AnimationEnd")
        }, t.fn.animate = function (n, i, r, o, a) {
            return t.isFunction(i) && (o = i, r = e, i = e), t.isFunction(r) && (o = r, r = e), t.isPlainObject(i) && (r = i.easing, o = i.complete, a = i.delay, i = i.duration), i && (i = ("number" == typeof i ? i : t.fx.speeds[i] || t.fx.speeds._default) / 1e3),
            a && (a = parseFloat(a) / 1e3), this.anim(n, i, r, o, a)
        }, t.fn.anim = function (i, r, d, m, v) {
            var b, w, x, E = {}, T = "", S = this, P = t.fx.transitionEnd, C = !1;
            if (r === e && (r = t.fx.speeds._default / 1e3), v === e && (v = 0), t.fx.off && (r = 0), "string" == typeof i) E[l] = i, E[f] = r + "s", E[p] = v + "s", E[h] = d || "linear", P = t.fx.animationEnd; else {
                w = [];
                for (b in i)g.test(b) ? T += b + "(" + i[b] + ") " : (E[b] = i[b], w.push(n(b)));
                T && (E[o] = T, w.push(o)), r > 0 && "object" == typeof i && (E[a] = w.join(", "), E[s] = r + "s", E[u] = v + "s", E[c] = d || "linear")
            }
            return x = function (e) {
                if ("undefined" != typeof e) {
                    if (e.target !== e.currentTarget)return;
                    t(e.target).unbind(P, x)
                } else t(this).unbind(P, x);
                C = !0, t(this).css(y), m && m.call(this)
            }, r > 0 && (this.bind(P, x), setTimeout(function () {
                C || x.call(S)
            }, 1e3 * (r + v) + 25)), this.size() && this.get(0).clientLeft, this.css(E), r <= 0 && setTimeout(function () {
                S.each(function () {
                    x.call(this)
                })
            }, 0), this
        }, v = null
    }(n), function (t, e) {
        function n(n, i, r, o, a) {
            "function" != typeof i || a || (a = i, i = e);
            var s = {opacity: r};
            return o && (s.scale = o, n.css(t.fx.cssPrefix + "transform-origin", "0 0")), n.animate(s, i, null, a)
        }

        function i(e, i, r, o) {
            return n(e, i, 0, r, function () {
                a.call(t(this)), o && o.call(this)
            })
        }

        var r = window.document, o = (r.documentElement, t.fn.show), a = t.fn.hide, s = t.fn.toggle;
        t.fn.show = function (t, i) {
            return o.call(this), t === e ? t = 0 : this.css("opacity", 0), n(this, t, 1, "1,1", i)
        }, t.fn.hide = function (t, n) {
            return t === e ? a.call(this) : i(this, t, "0,0", n)
        }, t.fn.toggle = function (n, i) {
            return n === e || "boolean" == typeof n ? s.call(this, n) : this.each(function () {
                var e = t(this);
                e["none" == e.css("display") ? "show" : "hide"](n, i)
            })
        }, t.fn.fadeTo = function (t, e, i) {
            return n(this, t, e, null, i)
        }, t.fn.fadeIn = function (t, e) {
            var n = this.css("opacity");
            return n > 0 ? this.css("opacity", 0) : n = 1, o.call(this).fadeTo(t, n, e)
        }, t.fn.fadeOut = function (t, e) {
            return i(this, t, null, e)
        }, t.fn.fadeToggle = function (e, n) {
            return this.each(function () {
                var i = t(this);
                i[0 == i.css("opacity") || "none" == i.css("display") ? "fadeIn" : "fadeOut"](e, n)
            })
        }
    }(n), function (t) {
        function e(t) {
            return "tagName" in t ? t : t.parentNode
        }

        if (t.os.ios) {
            var n, i = {};
            t(document).bind("gesturestart", function (t) {
                var r = Date.now();
                r - (i.last || r);
                i.target = e(t.target), n && clearTimeout(n), i.e1 = t.scale, i.last = r
            }).bind("gesturechange", function (t) {
                i.e2 = t.scale
            }).bind("gestureend", function (e) {
                i.e2 > 0 ? (0 != Math.abs(i.e1 - i.e2) && t(i.target).trigger("pinch") && t(i.target).trigger("pinch" + (i.e1 - i.e2 > 0 ? "In" : "Out")), i.e1 = i.e2 = i.last = 0) : "last" in i && (i = {})
            }), ["pinch", "pinchIn", "pinchOut"].forEach(function (e) {
                t.fn[e] = function (t) {
                    return this.bind(e, t)
                }
            })
        }
    }(n), function () {
        try {
            getComputedStyle(void 0)
        } catch (t) {
            var e = getComputedStyle;
            window.getComputedStyle = function (t) {
                try {
                    return e(t)
                } catch (n) {
                    return null
                }
            }
        }
    }(), function (t) {
        function e(e) {
            return e = t(e), !(!e.width() && !e.height()) && "none" !== e.css("display")
        }

        function n(t, e) {
            t = t.replace(/=#\]/g, '="#"]');
            var n, i, r = s.exec(t);
            if (r && r[2] in a && (n = a[r[2]], i = r[3], t = r[1], i)) {
                var o = Number(i);
                i = isNaN(o) ? i.replace(/^["']|["']$/g, "") : o
            }
            return e(t, n, i)
        }

        var i = t.zepto, r = i.qsa, o = i.matches, a = t.expr[":"] = {
            visible: function () {
                if (e(this))return this
            }, hidden: function () {
                if (!e(this))return this
            }, selected: function () {
                if (this.selected)return this
            }, checked: function () {
                if (this.checked)return this
            }, parent: function () {
                return this.parentNode
            }, first: function (t) {
                if (0 === t)return this
            }, last: function (t, e) {
                if (t === e.length - 1)return this
            }, eq: function (t, e, n) {
                if (t === n)return this
            }, contains: function (e, n, i) {
                if (t(this).text().indexOf(i) > -1)return this
            }, has: function (t, e, n) {
                if (i.qsa(this, n).length)return this
            }
        }, s = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"), c = /^\s*>/, u = "Zepto" + +new Date;
        i.qsa = function (e, o) {
            return n(o, function (n, a, s) {
                try {
                    var l;
                    !n && a ? n = "*" : c.test(n) && (l = t(e).addClass(u), n = "." + u + " " + n);
                    var f = r(e, n)
                } catch (h) {
                    throw console.error("error performing selector: %o", o), h
                } finally {
                    l && l.removeClass(u)
                }
                return a ? i.uniq(t.map(f, function (t, e) {
                    return a.call(t, e, f, s)
                })) : f
            })
        }, i.matches = function (t, e) {
            return n(e, function (e, n, i) {
                return (!e || o(t, e)) && (!n || n.call(t, null, i) === t)
            })
        }
    }(n), function (t) {
        function e(t, e, n, i) {
            return Math.abs(t - e) >= Math.abs(n - i) ? t - e > 0 ? "Left" : "Right" : n - i > 0 ? "Up" : "Down"
        }

        function n() {
            l = null, h.last && (h.el.trigger("longTap"), h = {})
        }

        function i() {
            l && clearTimeout(l), l = null
        }

        function r() {
            s && clearTimeout(s), c && clearTimeout(c), u && clearTimeout(u), l && clearTimeout(l), s = c = u = l = null, h = {}
        }

        function o(t) {
            return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
        }

        function a(t, e) {
            return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
        }

        var s, c, u, l, f, h = {}, p = 750, d = function () {
            return "ontouchstart" in document ? {
                down: "touchstart",
                up: "touchend",
                move: "touchmove",
                cancel: "touchcancel"
            } : "onponinterdown" in document ? {
                down: "pointerdown",
                up: "pointerup",
                move: "pointermove",
                cancel: "pointercancel"
            } : "onmspointerdown" in document ? {
                down: "MSPointerDown",
                up: "MSPointerUP",
                move: "MSPointerMove",
                cancel: "MSPointerCancel"
            } : {down: "MSPointerDown", up: "MSPointerUP", move: "MSPointerMove", cancel: "MSPointerCancel"}
        }();
        t(document).ready(function () {
            var m, v, g, y, b = 0, w = 0;
            "MSGesture" in window && (f = new MSGesture, f.target = document.body), t(document).bind("MSGestureEnd", function (t) {
                var e = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
                e && (h.el.trigger("swipe"), h.el.trigger("swipe" + e))
            }).on(d.down, function (e) {
                (y = a(e, "down")) && !o(e) || (g = y ? e : e.touches[0], e.touches && 1 === e.touches.length && h.x2 && (h.x2 = void 0, h.y2 = void 0), m = Date.now(), v = m - (h.last || m), h.el = t("tagName" in g.target ? g.target : g.target.parentNode), s && clearTimeout(s), h.x1 = g.pageX, h.y1 = g.pageY, v > 0 && v <= 250 && (h.isDoubleTap = !0), h.last = m, l = setTimeout(n, p), f && y && f.addPointer(e.pointerId))
            }).on(d.move, function (t) {
                (y = a(t, "move")) && !o(t) || (g = y ? t : t.touches[0], i(), h.x2 = g.pageX, h.y2 = g.pageY, b += Math.abs(h.x1 - h.x2), w += Math.abs(h.y1 - h.y2))
            }).on(d.up, function (n) {
                (y = a(n, "up")) && !o(n) || (i(), h.x2 && Math.abs(h.x1 - h.x2) > 30 || h.y2 && Math.abs(h.y1 - h.y2) > 30 ? u = setTimeout(function () {
                    h.el.trigger("swipe"), h.el.trigger("swipe" + e(h.x1, h.x2, h.y1, h.y2)), h = {}
                }, 0) : "last" in h && (b < 30 && w < 30 ? c = setTimeout(function () {
                        var e = t.Event("tap");
                        e.cancelTouch = r, h.el.trigger(e), h.isDoubleTap ? (h.el && h.el.trigger("doubleTap"), h = {}) : s = setTimeout(function () {
                            s = null, h.el && h.el.trigger("singleTap"), h = {}
                        }, 250)
                    }, 0) : h = {}), b = w = 0)
            }).on("touchcancel MSPointerCancel pointercancel", r), t(window).on("scroll", r)
        }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (e) {
            t.fn[e] = function (t) {
                return this.on(e, t)
            }
        })
    }(n), t.Zepto = n, n
});