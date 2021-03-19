
/*!
 * type-hangul v0.2.4
 * https://github.com/SDuck4/type-hangul
 * 
 * MIT License
 * Copyright (c) 2020 Chae SeungWoo
 * es6 > es5 version 20201-03-19
 */
 
 // ie 11 CustomEvent
 (function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
};
! function(t) {
    var n = {};

    function e(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports
    }
    e.m = t, e.c = n, e.d = function(t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, {
            enumerable: !0,
            get: r
        })
    }, e.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, e.t = function(t, n) {
        if (1 & n && (t = e(t)), 8 & n) return t;
        if (4 & n && "object" == (void 0 === t ? "undefined" : _typeof(t)) && t && t.__esModule) return t;
        var r = Object.create(null);
        if (e.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & n && "string" != typeof t)
            for (var o in t) e.d(r, o, function(n) {
                return t[n]
            }.bind(null, o));
        return r
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function(t, n) {
        return Object.prototype.hasOwnProperty.call(t, n)
    }, e.p = "", e(e.s = 1)
}([function(t, n, e) {
    var r;
    ! function() {
        var o, i, u, f, a, c, s = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
            l = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", ["ㅗ", "ㅏ"],
                ["ㅗ", "ㅐ"],
                ["ㅗ", "ㅣ"], "ㅛ", "ㅜ", ["ㅜ", "ㅓ"],
                ["ㅜ", "ㅔ"],
                ["ㅜ", "ㅣ"], "ㅠ", "ㅡ", ["ㅡ", "ㅣ"], "ㅣ"
            ],
            h = ["", "ㄱ", "ㄲ", ["ㄱ", "ㅅ"], "ㄴ", ["ㄴ", "ㅈ"],
                ["ㄴ", "ㅎ"], "ㄷ", "ㄹ", ["ㄹ", "ㄱ"],
                ["ㄹ", "ㅁ"],
                ["ㄹ", "ㅂ"],
                ["ㄹ", "ㅅ"],
                ["ㄹ", "ㅌ"],
                ["ㄹ", "ㅍ"],
                ["ㄹ", "ㅎ"], "ㅁ", "ㅂ", ["ㅂ", "ㅅ"], "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
            ];

        function d(t) {
            for (var n = t.length, e = {
                    0: 0
                }, r = 0; r < n; r++) t[r] && (e[t[r].charCodeAt(0)] = r);
            return e
        }

        function p(t) {
            for (var n, e, r = t.length, o = {}, i = 0; i < r; i++) n = t[i][0].charCodeAt(0), e = t[i][1].charCodeAt(0), void 0 === o[n] && (o[n] = {}), o[n][e] = t[i][2].charCodeAt(0);
            return o
        }

        function v(t) {
            return void 0 !== o[t]
        }

        function g(t) {
            return void 0 !== i[t]
        }

        function y(t) {
            return void 0 !== u[t]
        }

        function C(t) {
            return void 0 !== f[t]
        }

        function m(t) {
            return 44032 <= t && t <= 55203
        }

        function b(t, n) {
            return !(!c[t] || !c[t][n]) && c[t][n]
        }

        function A(t, n) {
            return !(!a[t] || !a[t][n]) && a[t][n]
        }
        o = d(["ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄸ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅃ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]), i = d(["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]), u = d(["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"]), f = d(["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]), a = p([
            ["ㄱ", "ㅅ", "ㄳ"],
            ["ㄴ", "ㅈ", "ㄵ"],
            ["ㄴ", "ㅎ", "ㄶ"],
            ["ㄹ", "ㄱ", "ㄺ"],
            ["ㄹ", "ㅁ", "ㄻ"],
            ["ㄹ", "ㅂ", "ㄼ"],
            ["ㄹ", "ㅅ", "ㄽ"],
            ["ㄹ", "ㅌ", "ㄾ"],
            ["ㄹ", "ㅍ", "ㄿ"],
            ["ㄹ", "ㅎ", "ㅀ"],
            ["ㅂ", "ㅅ", "ㅄ"]
        ]), c = p([
            ["ㅗ", "ㅏ", "ㅘ"],
            ["ㅗ", "ㅐ", "ㅙ"],
            ["ㅗ", "ㅣ", "ㅚ"],
            ["ㅜ", "ㅓ", "ㅝ"],
            ["ㅜ", "ㅔ", "ㅞ"],
            ["ㅜ", "ㅣ", "ㅟ"],
            ["ㅡ", "ㅣ", "ㅢ"]
        ]);
        var j = function(t, n) {
                if (null === t) throw new Error("Arguments cannot be null");
                "object" == (void 0 === t ? "undefined" : _typeof(t)) && (t = t.join(""));
                for (var e, r, o, a, c, d = [], p = t.length, C = 0; C < p; C++) {
                    var b = [];
                    m(a = t.charCodeAt(C)) ? (r = ((a -= 44032) - (o = a % 28)) / 28 % 21, e = parseInt((a - o) / 28 / 21), b.push(s[e]), "object" == _typeof(l[r]) ? b = b.concat(l[r]) : b.push(l[r]), o > 0 && ("object" == _typeof(h[o]) ? b = b.concat(h[o]) : b.push(h[o]))) : v(a) ? "string" == typeof(c = g(a) ? s[i[a]] : h[f[a]]) ? b.push(c) : b = b.concat(c) : y(a) ? "string" == typeof(c = l[u[a]]) ? b.push(c) : b = b.concat(c) : b.push(t.charAt(C)), n ? d.push(b) : d = d.concat(b)
                }
                return d
            },
            S = function(t) {
                return "string" != typeof t ? "" : (t = j(t)).join("")
            },
            w = function(t) {
                "string" == typeof t && (t = j(t));
                var n, e, r = [],
                    o = t.length,
                    a = 0,
                    c = -1,
                    s = !1;

                function l(n) {
                    var e, o, a, l, h = 0,
                        d = "";
                    if (s = !1, !(c + 1 > n))
                        for (var p = 1;; p++) {
                            if (1 === p) {
                                if (y(e = t[c + p].charCodeAt(0))) return c + p + 1 <= n && y(o = t[c + p + 1].charCodeAt(0)) ? (r.push(String.fromCharCode(b(e, o))), void(c = n)) : (r.push(t[c + p]), void(c = n));
                                if (!g(e)) return r.push(t[c + p]), void(c = n);
                                d = t[c + p]
                            } else if (2 === p) {
                                if (g(o = t[c + p].charCodeAt(0))) return e = A(e, o), d = String.fromCharCode(e), r.push(d), void(c = n);
                                d = String.fromCharCode(28 * (21 * i[e] + u[o]) + 44032)
                            } else 3 === p ? (b(o, a = t[c + p].charCodeAt(0)) ? o = b(o, a) : h = a, d = String.fromCharCode(28 * (21 * i[e] + u[o]) + f[h] + 44032)) : 4 === p ? (h = A(h, l = t[c + p].charCodeAt(0)) ? A(h, l) : l, d = String.fromCharCode(28 * (21 * i[e] + u[o]) + f[h] + 44032)) : 5 === p && (h = A(h, l = t[c + p].charCodeAt(0)), d = String.fromCharCode(28 * (21 * i[e] + u[o]) + f[h] + 44032));
                            if (c + p >= n) return r.push(d), void(c = n)
                        }
                }
                for (var h = 0; h < o; h++) g(n = t[h].charCodeAt(0)) || y(n) || C(n) ? (0 === a ? g(n) ? a = 1 : y(n) && (a = 4) : 1 == a ? y(n) ? a = 2 : A(e, n) ? a = 5 : l(h - 1) : 2 == a ? C(n) ? a = 3 : y(n) ? b(e, n) || (l(h - 1), a = 4) : (l(h - 1), a = 1) : 3 == a ? C(n) ? !s && A(e, n) ? s = !0 : (l(h - 1), a = 1) : g(n) ? (l(h - 1), a = 1) : y(n) && (l(h - 2), a = 2) : 4 == a ? y(n) ? b(e, n) ? (l(h), a = 0) : l(h - 1) : (l(h - 1), a = 1) : 5 == a && (y(n) ? (l(h - 2), a = 2) : (l(h - 1), a = 1)), e = n) : (l(h - 1), l(h), a = 0);
                return l(h - 1), r.join("")
            };

        function x(t) {
            this.string = t, this.disassembled = j(t).join("")
        }
        x.prototype.search = function(t) {
            return j(t).join("").indexOf(this.disassembled)
        };
        var T = {
            disassemble: j,
            d: j,
            disassembleToString: S,
            ds: S,
            assemble: w,
            a: w,
            search: function(t, n) {
                var e = j(t).join(""),
                    r = j(n).join("");
                return e.indexOf(r)
            },
            rangeSearch: function(t, n) {
                var e, r = j(t).join(""),
                    o = j(n).join(""),
                    i = j(t, !0),
                    u = new RegExp(o, "gi"),
                    f = [];
                if (!n.length) return [];
                for (; e = u.exec(r);) f.push(e.index);

                function a(t) {
                    for (var n = 0, e = 0; n < i.length; ++n)
                        if (t < (e += i[n].length)) return n
                }

                function c(t) {
                    for (var n = 0, e = 0; n < i.length; ++n)
                        if (e += i[n].length, t + o.length <= e) return n
                }
                return f.map(function(t) {
                    return [a(t), c(t)]
                })
            },
            Searcher: x,
            endsWithConsonant: function(t) {
                "object" == (void 0 === t ? "undefined" : _typeof(t)) && (t = t.join(""));
                var n = t.charCodeAt(t.length - 1);
                if (m(n)) {
                    if ((n -= 44032) % 28 > 0) return !0
                } else if (v(n)) return !0;
                return !1
            },
            endsWith: function(t, n) {
                return j(t).pop() === n
            },
            isHangul: function(t) {
                return "string" == typeof t && (t = t.charCodeAt(0)), m(t)
            },
            isComplete: function(t) {
                return "string" == typeof t && (t = t.charCodeAt(0)), m(t)
            },
            isConsonant: function(t) {
                return "string" == typeof t && (t = t.charCodeAt(0)), v(t)
            },
            isVowel: function(t) {
                return "string" == typeof t && (t = t.charCodeAt(0)), y(t)
            },
            isCho: function(t) {
                return "string" == typeof t && (t = t.charCodeAt(0)), g(t)
            },
            isJong: function(t) {
                return "string" == typeof t && (t = t.charCodeAt(0)), C(t)
            },
            isHangulAll: function(t) {
                if ("string" != typeof t) return !1;
                for (var n = 0; n < t.length; n++)
                    if (!m(t.charCodeAt(n))) return !1;
                return !0
            },
            isCompleteAll: function(t) {
                if ("string" != typeof t) return !1;
                for (var n = 0; n < t.length; n++)
                    if (!m(t.charCodeAt(n))) return !1;
                return !0
            },
            isConsonantAll: function(t) {
                if ("string" != typeof t) return !1;
                for (var n = 0; n < t.length; n++)
                    if (!v(t.charCodeAt(n))) return !1;
                return !0
            },
            isVowelAll: function(t) {
                if ("string" != typeof t) return !1;
                for (var n = 0; n < t.length; n++)
                    if (!y(t.charCodeAt(n))) return !1;
                return !0
            },
            isChoAll: function(t) {
                if ("string" != typeof t) return !1;
                for (var n = 0; n < t.length; n++)
                    if (!g(t.charCodeAt(n))) return !1;
                return !0
            },
            isJongAll: function(t) {
                if ("string" != typeof t) return !1;
                for (var n = 0; n < t.length; n++)
                    if (!C(t.charCodeAt(n))) return !1;
                return !0
            }
        };
        void 0 === (r = function() {
            return T
        }.call(n, e, n, t)) || (t.exports = r)
    }()
}, function(t, n, e) {
    e.r(n);
    var r = e(0),
        o = {
            text: null,
            append: !1,
            intervalType: 120,
            humanize: null
        };

    function i(t, n) {
        null === (n = function(t, n) {
            var e = JSON.parse(JSON.stringify(t));
            for (var r in n) e[r] = n[r];
            return e
        }(o, n)).text && (n.text = u(t));
        var e = void 0,
            i = function(t) {
                var n = Object(r.d)(t, !0),
                    e = [],
                    o = [];
                for (var i in n) {
                    var u = n[i];
                    u.length > 1 ? o = o.concat(u) : (o.length > 0 && (e.push(o), o = []), e.push(u))
                }
                return o.length > 0 && e.push(o), e
            }(n.text),
            f = 0,
            a = 0,
            c = n.append ? u(t) : "",
            s = c;

        function l() {
            if (null === n.humanize) return n.intervalType;
            if ("number" == typeof n.humanize) return function(t, n) {
                var e = t - t * n,
                    r = t + t * n;
                return Math.round(Math.random() * (r - e) + e)
            }(n.intervalType, n.humanize);
            if ("function" == typeof n.humanize) return n.humanize(n.intervalType);
            throw new Error("'humanize' cannnot be " + _typeof(n.humanize))
        }
        var h = new CustomEvent("th.startType", {
            detail: {
                target: t,
                options: n
            }
        });
        t.dispatchEvent(h),
            function o() {
                var h = i[f];
                if (a >= h.length) {
                    if (f += 1, a = 0, c = u(t), f >= i.length) {
                        var d = new CustomEvent("th.endType", {
                            detail: {
                                target: t,
                                options: n
                            }
                        });
                        return void t.dispatchEvent(d)
                    }
                    return e = l(), void setTimeout(o, e)
                }
                var p = Object(r.a)(h.slice(0, a + 1)),
                    v = h[a],
                    g = new CustomEvent("th.beforeType", {
                        detail: {
                            target: t,
                            options: n,
                            progress: s,
                            typeChar: v
                        }
                    });
                t.dispatchEvent(g),
                    function(t, n) {
                        "INPUT" === t.nodeName ? t.value = n : t.textContent = n
                    }(t, s = c + p), a += 1;
                var y = new CustomEvent("th.afterType", {
                    detail: {
                        target: t,
                        options: n,
                        progress: s,
                        typeChar: v
                    }
                });
                t.dispatchEvent(y), e = l(), setTimeout(o, e)
            }()
    }

    function u(t) {
        return "INPUT" === t.nodeName ? t.value : t.textContent
    }
    var f = {
        type: function(t, n) {
            if (void 0 === t) throw new Error("'selector' cannnot be undefined");
            if (null === t) throw new Error("'selector' cannnot be null");
            for (var e = document.querySelectorAll(t), r = 0; r < e.length; r++) i(e[r], n)
        }
    };
    window.TypeHangul = f, n.default = f
}]);