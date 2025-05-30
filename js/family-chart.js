// https://github.com/FauzanXDeveloper/family-tree
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("d3")) : "function" == typeof define && define.amd ? define(["d3"], e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).f3 = e(t.f3)
}(this, (function(t) {
    "use strict";

    function e(t) {
        if (t && t.__esModule) return t;
        var e = Object.create(null);
        return t && Object.keys(t).forEach((function(n) {
            if ("default" !== n) {
                var r = Object.getOwnPropertyDescriptor(t, n);
                Object.defineProperty(e, n, r.get ? r : {
                    enumerable: !0,
                    get: function() {
                        return t[n]
                    }
                })
            }
        })), e.default = t, Object.freeze(e)
    }
    var n = e(t),
        r = "object" == typeof window && window.d3 ? window.d3 : n;

    function i(t, e, n) {
        return n.find((n => n.id !== e.id && (n.id === t.rels.mother || n.id === t.rels.father)))
    }

    function a(t, e, n) {
        if (t.exiting = n, e) 0 !== t.depth || t.spouse ? t.spouse ? (t._x = t.spouse.x, t._y = t.spouse.y) : t.is_ancestry ? (t._x = t.parent.x, t._y = t.parent.y) : (t._x = t.psx, t._y = t.psy) : (t._x = t.x, t._y = t.y);
        else if (n) {
            const e = t.x > 0 ? 1 : -1,
                n = t.y > 0 ? 1 : -1;
            t._x = t.x + 400 * e, t._y = t.y + 400 * n
        }
    }

    function s(t, e) {
        const n = e ? "rels" : "_rels",
            r = e ? "_rels" : "rels";

        function i(e) {
            t.data[n] && t.data[n][e] && (t.data[r] || (t.data[r] = {}), t.data[r][e] = t.data[n][e], delete t.data[n][e])
        }
        t.is_ancestry || t.data.main ? (i("father"), i("mother")) : function() {
            if (!t.data[n] || !t.data[n].children) return;
            const e = t.data[n].children.slice(0),
                i = t.spouse ? [t.spouse] : t.spouses || [];
            [t, ...i].forEach((t => e.forEach((e => {
                t.data[n].children.includes(e) && (t.data[r] || (t.data[r] = {}), t.data[r].children || (t.data[r].children = []), t.data[r].children.push(e), t.data[n].children.splice(t.data[n].children.indexOf(e), 1))
            }))))
        }()
    }

    function o(t, e) {
        const n = t.rels,
            r = [n.father, n.mother, ...n.spouses || [], ...n.children || []].filter((t => !!t)),
            i = [];
        for (let n = 0; n < r.length; n++) {
            if (!a(e.find((t => t.id === r[n])), [t])) {
                i.push(r[n]);
                break
            }
        }
        return 0 === i.length;

        function a(t, n) {
            let r;
            return s(t) && (r = [t]),
                function t(i, a) {
                    if (r) return;
                    a = [...a, i], o((function(t) {
                        s(t) && (r = a)
                    })), r || o(d);

                    function o(t) {
                        const e = i.rels;
                        [e.father, e.mother, ...e.spouses || [], ...e.children || []].filter((t => t && ![...n, ...a].find((e => e.id === t)))).forEach((e => t(e)))
                    }

                    function d(n) {
                        const r = e.find((t => t.id === n));
                        t(r, a)
                    }
                }(t, [t]), r
        }

        function s(t) {
            return "object" == typeof t ? t.id === e[0].id : t === e[0].id
        }
    }

    function d(t, e) {
        return delete t.to_add, t
    }

    function l(t, e) {
        return c(t, e), !1
    }

    function c(t, e) {
        return o(t, e) ? (e.forEach((e => {
            for (let n in e.rels) e.rels.hasOwnProperty(n) && (e.rels[n] === t.id ? delete e.rels[n] : Array.isArray(e.rels[n]) && e.rels[n].includes(t.id) && e.rels[n].splice(e.rels[n].findIndex((e => e === t.id)), 1))
        })), e.splice(e.findIndex((e => e.id === t.id)), 1), e.forEach((t => {
            t.to_add && c(t, e)
        })), 0 === e.length && e.push(y({}).data[0]), {
            success: !0
        }) : {
            success: !1,
            error: "checkIfRelativesConnectedWithoutPerson"
        }
    }

    function h(t) {
        let e = JSON.parse(t);
        return e.forEach((t => t.to_add ? l(t, e) : t)), e.forEach((t => delete t.main)), e.forEach((t => delete t.hide_rels)), JSON.stringify(e, null, 2)
    }

    function u({
        datum: t,
        data_stash: e,
        rel_type: n,
        rel_datum: r
    }) {
        function i(t) {
            ! function() {
                if (!r.rels.spouses) return;
                r.rels.spouses.forEach((t => {
                    const n = e.find((e => e.id === t));
                    n.to_add && l(n, e)
                }))
            }(), r.rels.spouses || (r.rels.spouses = []), r.rels.spouses.push(t.id), t.rels.spouses = [r.id]
        }
        "daughter" === n || "son" === n ? function(t) {
            t.data.other_parent && (! function(n) {
                "_new" === n && (n = s().id);
                const a = e.find((t => t.id === n));
                t.rels["M" === a.data.gender ? "father" : "mother"] = a.id, a.rels.hasOwnProperty("children") || (a.rels.children = []);

                function s() {
                    const t = _({
                        rel_type: "spouse",
                        rel_datum: r
                    });
                    return i(t), m({
                        data_stash: e,
                        datum: t
                    }), t
                }
                a.rels.children.push(t.id)
            }(t.data.other_parent), delete t.data.other_parent);
            t.rels["M" === r.data.gender ? "father" : "mother"] = r.id, r.rels.children || (r.rels.children = []);
            r.rels.children.push(t.id)
        }(t) : "father" === n || "mother" === n ? function(t) {
            const n = "M" === t.data.gender,
                i = r.rels[n ? "father" : "mother"];
            i && l(e.find((t => t.id === i)), e);
            r.rels[n ? "father" : "mother"] = t.id,
                function() {
                    const i = r.rels[n ? "mother" : "father"];
                    if (!i) return;
                    const a = e.find((t => t.id === i));
                    t.rels.spouses = [i], a.rels.spouses || (a.rels.spouses = []), a.rels.spouses.push(t.id)
                }(), t.rels.children = [r.id]
        }(t) : "spouse" === n && i(t)
    }

    function p({
        datum: t,
        new_rel_datum: e,
        data_stash: n
    }) {
        const r = e._new_rel_data.rel_type;
        if (delete e._new_rel_data, e = JSON.parse(JSON.stringify(e)), "son" === r || "daughter" === r) {
            let t = n.find((t => t.id === e.rels.mother)),
                r = n.find((t => t.id === e.rels.father));
            e.rels = {}, r && (r.rels.children || (r.rels.children = []), r.rels.children.push(e.id), e.rels.father = r.id), t && (t.rels.children || (t.rels.children = []), t.rels.children.push(e.id), e.rels.mother = t.id)
        } else if ("spouse" === r) t.rels.spouses || (t.rels.spouses = []), t.rels.spouses.includes(e.id) || t.rels.spouses.push(e.id), e.rels.children = e.rels.children.filter((r => {
            const i = n.find((t => t.id === r));
            return !!i && (i.rels.mother !== t.id && (n.find((t => t.id === i.rels.mother)) && n.splice(n.findIndex((t => t.id === i.rels.mother)), 1), i.rels.mother = e.id), i.rels.father !== t.id && (n.find((t => t.id === i.rels.father)) && n.splice(n.findIndex((t => t.id === i.rels.father)), 1), i.rels.father = e.id), !0)
        })), e.rels = {
            spouses: [t.id],
            children: e.rels.children
        };
        else if ("father" === r) {
            if (t.rels.father = e.id, e.rels = {
                    children: [t.id]
                }, t.rels.mother) {
                e.rels.spouses = [t.rels.mother];
                const r = n.find((e => e.id === t.rels.mother));
                r.rels.spouses || (r.rels.spouses = []), r.rels.spouses.push(e.id)
            }
        } else if ("mother" === r && (t.rels.mother = e.id, e.rels = {
                children: [t.id]
            }, t.rels.father)) {
            e.rels.spouses = [t.rels.father];
            const r = n.find((e => e.id === t.rels.father));
            r.rels.spouses || (r.rels.spouses = []), r.rels.spouses.push(e.id)
        }
        n.push(e)
    }

    function f({
        data: t,
        rels: e
    }) {
        return {
            id: (n = (new Date).getTime(), r = performance && performance.now && 1e3 * performance.now() || 0, "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(t) {
                var e = 16 * Math.random();
                return n > 0 ? (e = (n + e) % 16 | 0, n = Math.floor(n / 16)) : (e = (r + e) % 16 | 0, r = Math.floor(r / 16)), ("x" === t ? e : 3 & e | 8).toString(16)
            }))),
            data: t || {},
            rels: e || {}
        };
        var n, r
    }

    function _({
        data: t,
        rel_type: e,
        rel_datum: n
    }) {
        const r = function(t, e) {
            return ["daughter", "mother"].includes(e) || "spouse" === e && "M" === t.data.gender ? "F" : "M"
        }(n, e);
        return f({
            data: t = Object.assign(t || {}, {
                gender: r
            })
        })
    }

    function m({
        data_stash: t,
        datum: e
    }) {
        t.push(e)
    }

    function y({
        data: t,
        version: e
    }) {
        return {
            data: [f({
                data: t
            })],
            version: e
        }
    }

    function g(t, e) {
        const n = t.data.rels;
        return [n.father, n.mother, ...n.spouses || [], ...n.children || []].filter((t => t)).every((t => e.some((e => e.data.id === t))))
    }

    function v({
        data: t,
        main_id: e = null,
        node_separation: n = 250,
        level_separation: a = 150,
        single_parent_empty_card: s = !0,
        is_horizontal: o = !1
    }) {
        if (!t || !t.length) return {
            data: [],
            data_stash: [],
            dim: {
                width: 0,
                height: 0
            },
            main_id: null
        };
        o && ([n, a] = [a, n]);
        const d = s ? function(t) {
            const e = [];
            for (let e = 0; e < t.length; e++) {
                const r = t[e];
                if (r.rels.children && r.rels.children.length > 0) {
                    r.rels.spouses || (r.rels.spouses = []);
                    const e = "M" === r.data.gender;
                    let i;
                    r.rels.children.forEach((a => {
                        const s = t.find((t => t.id === a));
                        s.rels[e ? "father" : "mother"] === r.id && (s.rels[e ? "mother" : "father"] || (i || (i = n(r), r.rels.spouses.push(i.id)), i.rels.children.push(s.id), s.rels[e ? "mother" : "father"] = i.id))
                    }))
                }
            }
            return e.forEach((e => t.push(e))), t;

            function n(t) {
                const n = f({
                    data: {
                        gender: "M" === t.data.gender ? "F" : "M"
                    },
                    rels: {
                        spouses: [t.id],
                        children: []
                    }
                });
                return n.to_add = !0, e.push(n), n
            }
        }(t) : t;
        ! function(t) {
            t.forEach((e => {
                if (!e.rels.children) return;
                const n = e.rels.spouses || [];
                e.rels.children.sort(((r, a) => {
                    const s = t.find((t => t.id === r)),
                        o = t.find((t => t.id === a)),
                        d = i(s, e, t) || {},
                        l = i(o, e, t) || {},
                        c = n.indexOf(d.id),
                        h = n.indexOf(l.id);
                    return "M" === e.data.gender ? c - h : h - c
                }))
            }))
        }(d);
        const l = null !== e && d.find((t => t.id === e)) || d[0],
            c = y(l, "children", !1),
            h = y(l, "parents", !0);
        d.forEach((t => t.main = t === l)),
            function(t, e) {
                const n = (t[0].x - e[0].x) / 2;
                t.forEach((t => t.x -= n)), e.forEach((t => t.x += n))
            }(h, c);
        const u = (_ = c, (p = h).forEach((t => {
            t.is_ancestry = !0
        })), p.forEach((t => 1 === t.depth ? t.parent = _[0] : null)), [..._, ...p.slice(1)]);
        var p, _;
        ! function({
            tree: t
        }) {
            t.forEach((e => {
                delete e.children, t.forEach((t => {
                    t.parent === e && (t.is_ancestry ? (e.parents || (e.parents = []), e.parents.push(t)) : (e.children || (e.children = []), e.children.push(t)))
                }))
            }))
        }({
            tree: u
        }),
        function({
            tree: t,
            node_separation: e
        }) {
            for (let n = t.length; n--;) {
                const r = t[n];
                if (!r.is_ancestry && r.data.rels.spouses && r.data.rels.spouses.length > 0) {
                    const n = "M" === r.data.data.gender ? -1 : 1;
                    r.x += r.data.rels.spouses.length / 2 * e * n, r.data.rels.spouses.forEach(((i, a) => {
                        const s = {
                            data: d.find((t => t.id === i)),
                            added: !0
                        };
                        s.x = r.x - e * (a + 1) * n, s.y = r.y, s.sx = a > 0 ? s.x : s.x + e / 2 * n, s.sy = a > 0 ? s.y : s.y + e / 2 * n, s.depth = r.depth, s.spouse = r, r.spouses || (r.spouses = []), r.spouses.push(s), t.push(s)
                    }))
                }
                if (r.parents && 2 === r.parents.length) {
                    const t = r.parents[0],
                        n = r.parents[1],
                        i = t.x - (t.x - n.x) / 2,
                        a = (t, n) => i + e / 2 * (t.x < n.x ? 1 : -1);
                    n.x = a(t, n), t.x = a(n, t)
                }
            }
        }({
            tree: u,
            node_separation: n
        }),
        function({
            tree: t
        }) {
            function e(e) {
                return e ? t.find((t => t.data.id === e)) : null
            }
            t.forEach((t => {
                if (t.is_ancestry) return;
                if (0 === t.depth) return;
                if (t.added) return;
                const n = e(t.data.rels.mother),
                    r = e(t.data.rels.father);
                if (n && r) {
                    n.added || r.added || console.error("no added spouse", n, r);
                    i(t, n.added ? n : r)
                } else if (n || r) {
                    const e = n || r;
                    e.sx = e.x, e.sy = e.y, i(t, e)
                }

                function i(t, e) {
                    t.psx = o ? e.y : e.sx, t.psy = o ? e.sx : e.y
                }
            }))
        }({
            tree: u
        }),
        function({
            tree: t
        }) {
            t.forEach((t => {
                if (t.y *= t.is_ancestry ? -1 : 1, o) {
                    const e = t.x;
                    t.x = t.y, t.y = e
                }
            }))
        }({
            tree: u
        }), u.forEach((t => t.all_rels_displayed = g(t, u)));
        const m = function(t, e, n) {
            o && ([e, n] = [n, e]);
            const i = r.extent(t, (t => t.x)),
                a = r.extent(t, (t => t.y));
            return {
                width: i[1] - i[0] + e,
                height: a[1] - a[0] + n,
                x_off: -i[0] + e / 2,
                y_off: -a[0] + n / 2
            }
        }(u, n, a);
        return {
            data: u,
            data_stash: d,
            dim: m,
            main_id: l.id,
            is_horizontal: o
        };

        function y(t, e, i) {
            const s = "children" === e ? function(t) {
                    return [...t.rels.children || []].map((t => d.find((e => e.id === t))))
                } : function(t) {
                    return [t.rels.father, t.rels.mother].filter((t => t)).map((t => d.find((e => e.id === t))))
                },
                o = r.tree().nodeSize([n, a]).separation((function(t, e) {
                    let n = 1;
                    i || (c(t, e) || (n += .25), function(t, e) {
                        return h(t) || h(e)
                    }(t, e) && (n += function(t, e) {
                        return .5 * ((t.data.rels.spouses || []).length + (e.data.rels.spouses || []).length)
                    }(t, e)), c(t, e) && ! function(t, e) {
                        return t.data.rels.father === e.data.rels.father && t.data.rels.mother === e.data.rels.mother
                    }(t, e) && (n += .125));
                    return n
                })),
                l = r.hierarchy(t, s);
            return o(l), l.descendants();

            function c(t, e) {
                return t.parent == e.parent
            }

            function h(t) {
                return t.data.rels.spouses && t.data.rels.spouses.length > 0
            }
        }
    }

    function x({
        t: t,
        svg: e,
        transition_time: n = 2e3
    }) {
        const i = e.__zoomObj ? e : e.parentNode,
            a = i.__zoomObj;
        r.select(i).transition().duration(n || 0).delay(n ? 100 : 0).call(a.transform, r.zoomIdentity.scale(t.k).translate(t.x, t.y))
    }

    function b({
        svg: t,
        svg_dim: e,
        tree_dim: n,
        with_transition: r,
        transition_time: i
    }) {
        x({
            t: C(e, n),
            svg: t,
            with_transition: r,
            transition_time: i
        })
    }

    function C(t, e) {
        let n = Math.min(t.width / e.width, t.height / e.height);
        n > 1 && (n = 1);
        return {
            k: n,
            x: e.x_off + (t.width - e.width * n) / n / 2,
            y: e.y_off + (t.height - e.height * n) / n / 2
        }
    }

    function w({
        datum: t,
        svg: e,
        svg_dim: n,
        scale: r,
        transition_time: i
    }) {
        const a = r || 1;
        x({
            t: {
                k: a,
                x: (n.width / 2 - t.x * a) / a,
                y: (n.height / 2 - t.y) / a
            },
            svg: e,
            with_transition: !0,
            transition_time: i
        })
    }

    function $({
        d: t,
        tree: e,
        is_horizontal: n = !1
    }) {
        const r = [];
        return t.data.rels.spouses && t.data.rels.spouses.length > 0 && function({
                d: t
            }) {
                t.data.rels.spouses.forEach((n => {
                    const i = d(t, e, (t => t.data.id === n));
                    i && !t.spouse && r.push({
                        d: [[t.x, t.y], [i.x, i.y]],
                        _d: () => [t.is_ancestry ? [a(t, "x") - 1e-4, a(t, "y")] : [t.x, t.y], t.is_ancestry ? [a(i, "x"), a(i, "y")] : [t.x - 1e-4, t.y]],
                        curve: !1,
                        id: o(t, i),
                        depth: t.depth,
                        spouse: !0,
                        is_ancestry: i.is_ancestry,
                        source: t,
                        target: i
                    })
                }))
            }({
                d: t
            }),
            function({
                d: t
            }) {
                if (!t.parents) return;
                const e = t.parents[0],
                    n = t.parents[1] || e,
                    a = {
                        x: i(e, n, "x"),
                        y: i(e, n, "y")
                    };
                r.push({
                    d: s(t, a),
                    _d: () => s({
                        x: t.x,
                        y: t.y
                    }, {
                        x: t.x,
                        y: t.y
                    }),
                    curve: !0,
                    id: o(t, e, n),
                    depth: t.depth + 1,
                    is_ancestry: !0,
                    source: t,
                    target: [e, n]
                })
            }({
                d: t
            }),
            function({
                d: t
            }) {
                if (!t.children || 0 === t.children.length) return;
                t.children.forEach(((i, l) => {
                    const c = function(t, e, n) {
                            return d(e, n, (n => n.data.id !== e.data.id && (n.data.id === t.data.rels.mother || n.data.id === t.data.rels.father)))
                        }(i, t, e) || t,
                        h = c.sx,
                        u = n ? {
                            x: t.x,
                            y: h
                        } : {
                            x: h,
                            y: t.y
                        };
                    r.push({
                        d: s(i, u),
                        _d: () => s(u, {
                            x: a(u, "x"),
                            y: a(u, "y")
                        }),
                        curve: !0,
                        id: o(i, t, c),
                        depth: t.depth + 1,
                        is_ancestry: !1,
                        source: [t, c],
                        target: i
                    })
                }))
            }({
                d: t
            }), r;

        function i(t, e, n, r) {
            return r ? a(t, n) - (a(t, n) - a(e, n)) / 2 : t[n] - (t[n] - e[n]) / 2
        }

        function a(t, e) {
            return t.hasOwnProperty("_" + e) ? t["_" + e] : t[e]
        }

        function s(t, e) {
            return n ? function(t, e) {
                const n = t.x + (e.x - t.x) / 2;
                return [[t.x, t.y], [n, t.y], [n, t.y], [n, e.y], [n, e.y], [e.x, e.y]]
            }(t, e) : function(t, e) {
                const n = t.y + (e.y - t.y) / 2;
                return [[t.x, t.y], [t.x, n], [t.x, n], [e.x, n], [e.x, n], [e.x, e.y]]
            }(t, e)
        }

        function o(...t) {
            return t.map((t => t.data.id)).sort().join(", ")
        }

        function d(t, e, n) {
            const r = e.filter(n),
                i = (t, e) => Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
            return r.length > 1 ? r.sort(((e, n) => i(e, t) - i(n, t)))[0] : r[0]
        }
    }

    function M(t, e) {
        const n = r.line().curve(r.curveMonotoneY),
            i = r.line().curve(r.curveBasis),
            a = e ? t._d() : t.d;
        return t.curve ? !0 === t.curve ? i(a) : void 0 : n(a)
    }

    function k(t, e) {
        const n = r.select(t).selectAll("div.card_cont_2fake").data(e, (t => t.data.id)),
            i = n.exit(),
            a = n.enter().append("div").attr("class", "card_cont_2fake").style("display", "none").attr("data-id", (() => Math.random())),
            s = a.merge(n);
        i.each((function(t) {
            t.unique_id = r.select(this).attr("data-id"), r.select(this).remove()
        })), a.each((function(t) {
            t.unique_id = r.select(this).attr("data-id")
        })), s.each((function(t) {
            t.unique_id = r.select(this).attr("data-id")
        }))
    }

    function S(t) {
        r.select(t()).append("div").attr("class", "cards_view_fake").style("display", "none")
    }

    function L(t) {
        return r.select(t()).select("div.cards_view_fake").node()
    }
    var I = Object.freeze({
        __proto__: null,
        assignUniqueIdToTreeData: k,
        setupHtmlSvg: S,
        getCardsViewFake: L,
        onZoomSetup: function(t, e) {
            return function(n) {
                const i = n.transform;
                r.select(t()).style("transform", `translate(${i.x}px, ${i.y}px) scale(${i.k}) `), r.select(e()).style("transform", `translate(${i.x}px, ${i.y}px) scale(${i.k}) `)
            }
        },
        setupReactiveTreeData: function(t) {
            let e = [];
            return function(n) {
                const r = function(t, e) {
                    return e.length > 0 ? e.filter((e => !t.find((t => t.data.id === e.data.id)))) : []
                }(n, e);
                return e = [...n, ...r], k(L(t), e), e
            }
        },
        createHtmlSvg: function(t) {
            const e = r.select(t).select("#f3Canvas").append("div").attr("id", "htmlSvg").attr("style", "position: absolute; width: 100%; height: 100%; z-index: 2; top: 0; left: 0");
            return e.append("div").attr("class", "cards_view").style("transform-origin", "0 0"), S((() => e.node())), e.node()
        },
        getUniqueId: function(t) {
            return t.unique_id
        }
    });

    function A(t, e, n) {
        const r = .4 * n,
            i = Math.max(...t.data.map((t => t.is_ancestry ? t.depth : 0)));
        let a = e.depth * r;
        return 0 === e.depth && !e.spouse || e.is_ancestry || (a += i * r, e.spouse && (a += r), a += e.depth * r), a
    }

    function H(t, {
        d: e
    }) {
        var n, r;
        return n = t.getTree().data, r = !1, n.forEach((t => {
            t.data.hide_rels = r, s(t, r)
        })), t.updateMainId(e.data.id), t.updateTree({
            tree_position: t.state.tree_fit_on_change
        }), !0
    }

    function D(t, {
        d: e,
        cardEditForm: n
    }) {
        const r = e.data;
        n({
            datum: r,
            postSubmit: e => {
                r.to_add && d(r, t.getData()), e && e.delete && (r.main && t.updateMainId(null), c(r, t.getData())), t.updateTree()
            },
            store: t
        })
    }

    function T(t, {
        d: e
    }) {
        e.data.hide_rels = !e.data.hide_rels, s(e, e.data.hide_rels), t.updateTree({
            tree_position: t.state.tree_fit_on_change
        })
    }

    function E() {
        return `\n    <g data-icon="user">\n      ${nt()}\n      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />\n    </g>\n  `
    }

    function R() {
        return `\n    <g data-icon="user-edit">\n      ${nt()}\n      <path d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,\n      12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,\n      18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />\n    </g>\n  `
    }

    function F() {
        return `\n    <g data-icon="user-plus">\n      ${nt()}\n      <path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />\n    </g>\n  `
    }

    function O() {
        return `\n    <g data-icon="user-plus-close">\n      ${nt()}\n      <path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />\n      <line x1="3" y1="3" x2="24" y2="24" stroke="currentColor" stroke-width="2" />\n    </g>\n  `
    }

    function z() {
        return `\n    <g data-icon="plus">\n      ${nt()}\n      <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />\n    </g>\n  `
    }

    function V() {
        return `\n    <g data-icon="pencil">\n      ${nt()}\n      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />\n    </g>\n  `
    }

    function j() {
        return `\n    <g data-icon="pencil-off">\n      ${nt()}\n      <path d="M18.66,2C18.4,2 18.16,2.09 17.97,2.28L16.13,4.13L19.88,7.88L21.72,6.03C22.11,5.64 22.11,5 21.72,4.63L19.38,2.28C19.18,2.09 18.91,2 18.66,2M3.28,4L2,5.28L8.5,11.75L4,16.25V20H7.75L12.25,15.5L18.72,22L20,20.72L13.5,14.25L9.75,10.5L3.28,4M15.06,5.19L11.03,9.22L14.78,12.97L18.81,8.94L15.06,5.19Z" />\n    </g>\n  `
    }

    function P() {
        return `\n    <g data-icon="trash">\n      ${nt()}\n      <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />\n    </g>\n  `
    }

    function q() {
        return `\n    <g data-icon="history-back">\n      ${nt()}\n      <path d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />\n    </g>\n  `
    }

    function U() {
        return `\n    <g data-icon="history-forward">\n      ${nt()}\n      <path d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />\n    </g>\n  `
    }

    function N() {
        return '\n    <g data-icon="person">\n      <path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 \n        64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 \n        0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z" />\n    </g>\n  '
    }

    function B() {
        return '\n    <g transform="translate(31,25)" data-icon="mini-tree">\n      <rect x="-31" y="-25" width="72" height="15" fill="rgba(0,0,0,0)"></rect>\n      <g>\n        <rect x="-31" y="-25" width="72" height="15" fill="rgba(0,0,0,0)"></rect>\n        <line y2="-17.5" stroke="#fff" />\n        <line x1="-20" x2="20" y1="-17.5" y2="-17.5" stroke="#fff" />\n        <rect x="-31" y="-25" width="25" height="15" rx="5" ry="5" class="card-male" />\n        <rect x="6" y="-25" width="25" height="15" rx="5" ry="5" class="card-female" />\n      </g>\n    </g>\n  '
    }

    function J() {
        return et(F())
    }

    function Z() {
        return et(O())
    }

    function W() {
        return et(z())
    }

    function G() {
        return et(V())
    }

    function Q() {
        return et(j())
    }

    function Y() {
        return et(q())
    }

    function K() {
        return et(U())
    }

    function X() {
        return et('\n    <g data-icon="person">\n      <path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 \n        64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 \n        0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z" />\n    </g>\n  ', "0 0 512 512")
    }

    function tt() {
        return et('\n    <g transform="translate(31,25)" data-icon="mini-tree">\n      <rect x="-31" y="-25" width="72" height="15" fill="rgba(0,0,0,0)"></rect>\n      <g>\n        <rect x="-31" y="-25" width="72" height="15" fill="rgba(0,0,0,0)"></rect>\n        <line y2="-17.5" stroke="#fff" />\n        <line x1="-20" x2="20" y1="-17.5" y2="-17.5" stroke="#fff" />\n        <rect x="-31" y="-25" width="25" height="15" rx="5" ry="5" class="card-male" />\n        <rect x="6" y="-25" width="25" height="15" rx="5" ry="5" class="card-female" />\n      </g>\n    </g>\n  ', "0 0 72 25")
    }

    function et(t, e = "0 0 24 24") {
        const n = t.match(/data-icon="([^"]+)"/);
        return `\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${e}" style="fill: currentColor" ${n?`data-icon="${n[1]}"`:""}>\n      ${t}\n    </svg>\n  `
    }

    function nt() {
        return '\n    <circle r="12" cx="12" cy="12" style="fill: rgba(0,0,0,0)" />\n  '
    }
    var rt = Object.freeze({
        __proto__: null,
        userIcon: E,
        userEditIcon: R,
        userPlusIcon: F,
        userPlusCloseIcon: O,
        plusIcon: z,
        pencilIcon: V,
        pencilOffIcon: j,
        trashIcon: P,
        historyBackIcon: q,
        historyForwardIcon: U,
        personIcon: N,
        miniTreeIcon: B,
        userSvgIcon: function() {
            return et(E())
        },
        userEditSvgIcon: function() {
            return et(R())
        },
        userPlusSvgIcon: J,
        userPlusCloseSvgIcon: Z,
        plusSvgIcon: W,
        pencilSvgIcon: G,
        pencilOffSvgIcon: Q,
        trashSvgIcon: function() {
            return et(P())
        },
        historyBackSvgIcon: Y,
        historyForwardSvgIcon: K,
        personSvgIcon: X,
        miniTreeSvgIcon: tt
    });
    var it = Object.freeze({
        __proto__: null,
        manualZoom: function({
            amount: t,
            svg: e,
            transition_time: n = 500
        }) {
            const i = e.__zoomObj;
            r.select(e).transition().duration(n || 0).delay(n ? 100 : 0).call(i.scaleBy, t)
        },
        isAllRelativeDisplayed: g,
        cardChangeMain: H,
        cardEdit: D,
        cardShowHideRels: T,
        handleRelsOfNewDatum: u,
        handleNewRel: p,
        createNewPerson: f,
        createNewPersonWithGenderFromRel: _,
        addNewPerson: m,
        createTreeDataWithMainNode: y,
        addNewPersonAndHandleRels: function({
            datum: t,
            data_stash: e,
            rel_type: n,
            rel_datum: r
        }) {
            m({
                data_stash: e,
                datum: t
            }), u({
                datum: t,
                data_stash: e,
                rel_type: n,
                rel_datum: r
            })
        },
        checkIfRelativesConnectedWithoutPerson: o,
        createForm: function({
            datum: t,
            store: e,
            fields: n,
            postSubmit: r,
            addRelative: i,
            deletePerson: a,
            onCancel: s,
            editFirst: d
        }) {
            const l = {
                fields: [],
                onSubmit: function(e) {
                    e.preventDefault();
                    new FormData(e.target).forEach(((e, n) => t.data[n] = e)), t.to_add && delete t.to_add;
                    r()
                }
            };
            return t._new_rel_data || (l.onDelete = function() {
                a(), r({
                    delete: !0
                })
            }, l.addRelative = () => i.activate(t), l.addRelativeCancel = () => i.onCancel(), l.addRelativeActive = i.is_active, l.editable = !1), t._new_rel_data && (l.title = t._new_rel_data.label, l.new_rel = !0, l.editable = !0, l.onCancel = s), l.onDelete && (l.can_delete = o(t, e.getData())), d && (l.editable = !0), l.gender_field = {
                id: "gender",
                type: "switch",
                label: "Gender",
                initial_value: t.data.gender,
                options: [{
                    value: "M",
                    label: "Male"
                }, {
                    value: "F",
                    label: "Female"
                }]
            }, n.forEach((e => {
                const n = {
                    id: e.id,
                    type: e.type,
                    label: e.label,
                    initial_value: t.data[e.id]
                };
                l.fields.push(n)
            })), l
        },
        moveToAddToAdded: d,
        removeToAdd: l,
        deletePerson: c,
        cleanupDataJson: h,
        removeToAddFromData: function(t) {
            return t.forEach((e => e.to_add ? l(e, t) : e)), t
        },
        formInfoSetup: function(t, e) {
            const n = document.createElement("div");
            return r(), n;

            function r() {
                const i = function(t) {
                    return ` \n    <form id="familyForm" class="f3-form ${t.editable?"":"non-editable"}">\n      ${o()}\n      ${t.title?`<h3 class="f3-form-title">${t.title}</h3>`:""}\n      <div style="text-align: right; display: ${t.new_rel?"none":"block"}">\n        ${t.addRelative&&!t.no_edit?n():""}\n        ${t.no_edit?d():r()}\n      </div>\n      ${i()}\n\n      ${a()}\n\n      ${t.other_parent_field?s():""}\n\n      ${t.onDelete?e():""}\n      \n      <div class="f3-form-buttons">\n        <button type="button" class="f3-cancel-btn">Cancel</button>\n        <button type="submit">Submit</button>\n      </div>\n    </form>\n  `;

                    function e() {
                        return `\n      <div>\n        <button type="button" class="f3-delete-btn" ${t.can_delete?"":"disabled"}>\n          Delete\n        </button>\n      </div>\n    `
                    }

                    function n() {
                        return `\n      <span class="f3-add-relative-btn">\n        ${t.addRelativeActive?Z():J()}\n      </span>\n    `
                    }

                    function r() {
                        return `\n      <span class="f3-edit-btn">\n        ${t.editable?Q():G()}\n      </span>\n    `
                    }

                    function i() {
                        return t.editable ? `\n      <div class="f3-radio-group">\n        ${t.gender_field.options.map((e=>`\n          <label>\n            <input type="radio" name="${t.gender_field.id}" \n              value="${e.value}" \n              ${e.value===t.gender_field.initial_value?"checked":""}\n            >\n            ${e.label}\n          </label>\n        `)).join("")}\n      </div>\n    ` : ""
                    }

                    function a() {
                        return t.editable ? t.fields.map((t => `\n      ${"text"===t.type?`\n        <div class="f3-form-field">\n          <label>${t.label}</label>\n          <input type="${t.type}" \n            name="${t.id}" \n            value="${t.initial_value||""}"\n            placeholder="${t.label}">\n        </div>\n      `:"textarea"===t.type?`\n        <div class="f3-form-field">\n          <label>${t.label}</label>\n          <textarea name="${t.id}" \n            placeholder="${t.label}">${t.initial_value||""}</textarea>\n        </div>\n      `:""}\n    `)).join("") : e();

                        function e() {
                            return t.fields.map((t => `\n        <div class="f3-info-field">\n          <span class="f3-info-field-label">${t.label}</span>\n          <span class="f3-info-field-value">${t.initial_value||""}</span>\n        </div>\n      `)).join("")
                        }
                    }

                    function s() {
                        return `\n      <div class="f3-form-field">\n        <label>${t.other_parent_field.label}</label>\n        <select name="${t.other_parent_field.id}">\n          ${t.other_parent_field.options.map((e=>`\n            <option value="${e.value}" \n              ${e.value===t.other_parent_field.initial_value?"selected":""}>\n              ${e.label}\n            </option>\n          `)).join("")}\n        </select>\n      </div>\n    `
                    }

                    function o() {
                        return '\n      <span class="f3-close-btn">\n        ×\n      </span>\n    '
                    }

                    function d() {
                        return '<div style="height: 24px;"></div>'
                    }
                }(t);
                return n.innerHTML = i,
                    function() {
                        const i = n.querySelector("form");
                        i.addEventListener("submit", t.onSubmit);
                        const a = i.querySelector(".f3-cancel-btn");
                        a.addEventListener("click", l);
                        const s = i.querySelector(".f3-edit-btn");
                        s && s.addEventListener("click", c);
                        const o = i.querySelector(".f3-delete-btn");
                        o && t.onDelete && o.addEventListener("click", t.onDelete);
                        const d = i.querySelector(".f3-add-relative-btn");
                        d && t.addRelative && d.addEventListener("click", (() => {
                            t.addRelativeActive ? t.addRelativeCancel() : t.addRelative(), t.addRelativeActive = !t.addRelativeActive, r()
                        }));
                        i.querySelector(".f3-close-btn").addEventListener("click", e), t.other_parent_field && (a.style.display = "none");

                        function l() {
                            t.editable = !1, t.onCancel && t.onCancel(), r()
                        }

                        function c() {
                            t.editable = !t.editable, r()
                        }
                    }(), n
            }
        },
        createHistory: function(t, e, n) {
            let r = [],
                i = -1;
            return {
                changed: function() {
                    i < r.length - 1 && (r = r.slice(0, i));
                    const n = JSON.parse(h(JSON.stringify(e())));
                    n.main_id = t.getMainId(), r.push(n), i++
                },
                back: function() {
                    if (!s()) return;
                    i--, o(r[i])
                },
                forward: function() {
                    if (!a()) return;
                    i++, o(r[i])
                },
                canForward: a,
                canBack: s
            };

            function a() {
                return i < r.length - 1
            }

            function s() {
                return i > 0
            }

            function o(e) {
                t.updateMainId(e.main_id), t.updateData(e), n()
            }
        },
        createHistoryControls: function(t, e, n = (() => {})) {
            const i = r.select(t).append("div").attr("class", "f3-history-controls"),
                a = i.append("button").attr("class", "f3-back-button").on("click", (() => {
                    e.back(), o(), n()
                })),
                s = i.append("button").attr("class", "f3-forward-button").on("click", (() => {
                    e.forward(), o(), n()
                }));
            return a.html(Y()), s.html(K()), {
                back_btn: a.node(),
                forward_btn: s.node(),
                updateButtons: o,
                destroy: function() {
                    e = null, r.select(t).select(".f3-history-controls").remove()
                }
            };

            function o() {
                a.classed("disabled", !e.canBack()), s.classed("disabled", !e.canForward()), i.style("display", e.canBack() || e.canForward() ? null : "none")
            }
        },
        treeFit: b,
        calculateTreeFit: C,
        cardToMiddle: w
    });

    function at({
        d: t,
        card_dim: e,
        card_display: n
    }) {
        return {
            template: `\n    <g>\n      <g class="card-text" clip-path="url(#card_text_clip)">\n        <g transform="translate(${e.text_x}, ${e.text_y})">\n          <text>\n            ${Array.isArray(n)?n.map((e=>`<tspan x="0" dy="14">${e(t.data)}</tspan>`)).join("\n"):n(t.data)}\n          </text>\n        </g>\n      </g>\n      <rect width="${e.w-10}" height="${e.h}" style="mask: url(#fade)" class="text-overflow-mask" /> \n    </g>\n  `
        }
    }

    function st({
        x: t,
        y: e,
        rt: n,
        closed: r
    }) {
        return {
            template: `\n    <g style="\n          transform: translate(-12.2px, -.5px);\n          cursor: pointer;\n        " \n        fill="currentColor" class="card_break_link${r?" closed":""}"\n      >\n      <g style="transform: translate(${t}px,${e}px)scale(.02)rotate(${n+"deg"})">\n        <rect width="1000" height="700" y="150" style="opacity: 0" />\n        <g class="link_upper">\n          <g>\n            <path d="M616.3,426.4c19,4.5,38.1-7.4,42.6-26.4c4.4-19-7.4-38-26.5-42.5L522.5,332c-18,11.1-53.9,33.4-53.9,33.4l80.4,18.6c-7.8,4.9-19.5,12.1-31.3,19.4L616.3,426.4L616.3,426.4z"/>\n            <path d="M727.4,244.2c-50.2-11.6-100.3,3.3-135.7,35.4c28.6,22.6,64.5,30.2,116.4,51.3l141,32.6c23.9,5.6,56.6,47.2,51.1,71l-4.1,17c-5.6,23.7-47.3,56.4-71.2,51l-143.4-33.2c-66.8-8.6-104.1-16.6-132.9-7.5c17.4,44.9,55.9,80.8,106.5,92.4L800.9,588c81.3,18.8,162.3-31.5,181.2-112.4l4-17c18.8-81.1-31.7-161.8-112.9-180.6L727.4,244.2z"/>\n          </g>\n        </g>\n        <g class="link_lower">\n          <path d="M421.2,384.9l-128,127.6c-13.9,13.8-13.9,36.2,0,50s36.3,13.8,50.2,0.1l136.2-135.8v-36.7l-58.4,58.1V384.9L421.2,384.9z"/>\n          <path d="M204.6,742.8c-17.4,17.3-63.3,17.2-80.6,0.1l-12.3-12.3c-17.3-17.3,0.6-81.2,17.9-98.5l100.2-99.9c12.5-14.9,45.8-40.8,66.1-103.7c-47.7-9.4-98.9,4.2-135.8,40.9L54.2,575c-58.9,58.8-58.9,154,0,212.8L66.6,800c58.9,58.8,154.5,58.8,213.4,0l105.8-105.6c38.4-38.3,51.3-91.9,39.7-141c-44,22.7-89,62.3-116,84.8L204.6,742.8z"/>\n        </g>\n        <g class="link_particles">\n          <path d="M351.9,248.4l-26.5,63.4l80.6,30.1L351.9,248.4z"/>\n          <path d="M529.3,208l-43,26.6l35.4,52.3L529.3,208z"/>\n          <path d="M426.6,158.8l-44-2.9l61.7,134.6L426.6,158.8z"/>\n        </g>\n      </g>\n    </g>\n  `
        }
    }
    const ot = {
        miniTree: function(t, e) {
            if (t.data.to_add) return;
            const n = e.card_dim;
            if (t.all_rels_displayed) return;
            const i = r.create("svg:g").html(function({
                d: t,
                card_dim: e
            }) {
                return {
                    template: `\n    <g class="card_family_tree" style="cursor: pointer">\n      <rect x="-31" y="-25" width="72" height="15" fill="rgba(0,0,0,0)"></rect>\n      <g transform="translate(${.8*e.w},6)scale(.9)">\n        <rect x="-31" y="-25" width="72" height="15" fill="rgba(0,0,0,0)"></rect>\n        <line y2="-17.5" stroke="#fff" />\n        <line x1="-20" x2="20" y1="-17.5" y2="-17.5" stroke="#fff" />\n        <rect x="-31" y="-25" width="25" height="15" rx="5" ry="5" class="card-male" />\n        <rect x="6" y="-25" width="25" height="15" rx="5" ry="5" class="card-female" />\n      </g>\n    </g>\n  `
                }
            }({
                d: t,
                card_dim: n
            }).template);
            return i.on("click", (function(n) {
                n.stopPropagation(), e.onMiniTreeClick ? e.onMiniTreeClick.call(this, n, t) : H(e.store, {
                    d: t
                })
            })), i.node()
        },
        lineBreak: function(t, e) {
            if (t.data.to_add) return;
            const n = e.card_dim,
                i = r.create("svg:g").html(function({
                    d: t,
                    card_dim: e
                }) {
                    let n = "",
                        r = t.data.rels,
                        i = t.data._rels || {},
                        a = t.data.hide_rels,
                        s = t => t.father || t.mother,
                        o = t => t.children && t.children.length > 0;
                    if ((t.is_ancestry || t.data.main) && (s(r) || s(i)) && (n += st({
                            x: e.w / 2,
                            y: 0,
                            rt: -45,
                            closed: a
                        }).template), !t.is_ancestry && t.added) {
                        const s = t.spouse,
                            d = s.data.rels,
                            l = s.data._rels || {};
                        (o(r) || o(i)) && (o(d) || o(l)) && (n += st({
                            x: t.sx - t.x + e.w / 2 + 24.4,
                            y: (t.x !== t.sx ? e.h / 2 : e.h) + 1,
                            rt: 135,
                            closed: a
                        }).template)
                    }
                    return {
                        template: n
                    }
                }({
                    d: t,
                    card_dim: n
                }).template);
            return i.on("click", (n => {
                n.stopPropagation(), T(e.store, {
                    d: t
                })
            })), i.node()
        },
        cardBody: function(t, e) {
            const n = e.cardEditForm ? "ADD" : "UNKNOWN",
                i = e.card_dim;
            let a;
            t.data.to_add ? (a = r.create("svg:g").html(function({
                d: t,
                card_dim: e,
                card_add: n,
                label: r
            }) {
                return {
                    template: `\n    <g class="card-body ${n?"card_add":"card-unknown"}">\n      <rect class="card-body-rect" width="${e.w}" height="${e.h}" fill="rgb(59, 85, 96)" />\n      <text transform="translate(${e.w/2}, ${e.h/2})" text-anchor="middle" fill="#fff">\n        <tspan font-size="18" dy="8">${r}</tspan>\n      </text>\n    </g>\n  `
                }
            }({
                d: t,
                card_dim: i,
                card_add: e.cardEditForm,
                label: n
            }).template), a.on("click", (n => {
                n.stopPropagation(), D(e.store, {
                    d: t,
                    cardEditForm: e.cardEditForm
                })
            }))) : (a = r.create("svg:g").html(function({
                d: t,
                card_dim: e,
                card_display: n
            }) {
                return {
                    template: `\n    <g class="card-body">\n      <rect width="${e.w}" height="${e.h}" class="card-body-rect" />\n      ${at({d:t,card_dim:e,card_display:n}).template}\n    </g>\n  `
                }
            }({
                d: t,
                card_dim: i,
                card_display: e.card_display
            }).template), a.on("click", (function(n) {
                n.stopPropagation(), e.onCardClick ? e.onCardClick.call(this, n, t) : H(e.store, {
                    d: t
                })
            })));
            return a.node()
        },
        cardImage: function(t, e) {
            if (t.data.to_add) return;
            const n = e.card_dim;
            return r.create("svg:g").html(function({
                d: t,
                image: e,
                card_dim: n,
                maleIcon: r,
                femaleIcon: i
            }) {
                return {
                    template: `\n    <g style="transform: translate(${n.img_x}px,${n.img_y}px);" class="card_image" clip-path="url(#card_image_clip)">\n      ${e?`<image href="${e}" height="${n.img_h}" width="${n.img_w}" preserveAspectRatio="xMidYMin slice" />`:"F"===t.data.data.gender&&i?i({card_dim:n}):"M"===t.data.data.gender&&r?r({card_dim:n}):`\
                    n < g class = "genderless-icon" > \n < rect height = "${n.img_h}"
                    width = "${n.img_w}"
                    fill = "rgb(59, 85, 96)" / > \n < g transform = "scale(${.001616*n.img_w})" > \n < path transform = "translate(50,40)"
                    fill = "lightgrey"
                    d = "M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 \n            64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 \n            0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z" / > \n < /g>\n      </g > \n `}      \n    </g>\n  `
                }
            }({
                d: t,
                image: t.data.data.avatar || null,
                card_dim: n,
                maleIcon: null,
                femaleIcon: null
            }).template).node()
        },
        cardEdit: function(t, e) {
            if (t.data.to_add) return;
            const n = e.card_dim,
                i = r.create("svg:g").html(function({
                    d: t,
                    card_dim: e,
                    x: n,
                    y: r
                }) {
                    return {
                        template: `\n    <g transform="translate(${n||e.w-20},${r||e.h-20})scale(.6)" style="cursor: pointer" class="card_edit pencil_icon">\n      <circle fill="rgba(0,0,0,0)" r="17" cx="8.5" cy="8.5" />\n      <path fill="currentColor" transform="translate(-1.5, -1.5)"\n         d="M19.082,2.123L17.749,0.79c-1.052-1.052-2.766-1.054-3.819,0L1.925,12.794c-0.06,0.06-0.104,0.135-0.127,0.216\n          l-1.778,6.224c-0.05,0.175-0.001,0.363,0.127,0.491c0.095,0.095,0.223,0.146,0.354,0.146c0.046,0,0.092-0.006,0.137-0.02\n          l6.224-1.778c0.082-0.023,0.156-0.066,0.216-0.127L19.082,5.942C20.134,4.89,20.134,3.176,19.082,2.123z M3.076,13.057l9.428-9.428\n          l3.738,3.739l-9.428,9.428L3.076,13.057z M2.566,13.961l3.345,3.344l-4.683,1.339L2.566,13.961z M18.375,5.235L16.95,6.66\n          l-3.738-3.739l1.425-1.425c0.664-0.663,1.741-0.664,2.405,0l1.333,1.333C19.038,3.493,19.038,4.572,18.375,5.235z"/>\n    </g>\n  `
                    }
                }({
                    card_dim: n,
                    x: n.w - 46,
                    y: n.h - 20
                }).template);
            return i.on("click", (n => {
                n.stopPropagation(), D(e.store, {
                    d: t,
                    cardEditForm: e.cardEditForm
                })
            })), i.node()
        },
        cardAdd: function(t, e) {
            if (t.data.to_add) return;
            const n = e.card_dim,
                i = r.create("svg:g").html(function({
                    d: t,
                    card_dim: e,
                    x: n,
                    y: r
                }) {
                    return {
                        template: `\n    <g class="card_add_relative">\n      <g transform="translate(${n||e.w/2},${r||e.h})scale(.13)">\n        <circle r="80" cx="40" cy="40" fill="rgba(0,0,0,0)" />\n        <g transform="translate(-10, -8)">\n          <line\n            x1="10" x2="90" y1="50" y2="50"\n            stroke="currentColor" stroke-width="15" stroke-linecap="round"\n          />\n          <line\n            x1="50" x2="50" y1="10" y2="90"\n            stroke="currentColor" stroke-width="15" stroke-linecap="round"\n          />\n        </g>\n      </g>\n    </g>\n  `
                    }
                }({
                    card_dim: n,
                    x: n.w - 26,
                    y: n.h - 20
                }).template);
            return i.on("click", (n => {
                n.stopPropagation(), e.addRelative({
                    d: t
                })
            })), i.node()
        }
    };

    function dt(t, e, n) {
        t && (n ? e.insertBefore(t, e.firstChild) : e.appendChild(t))
    }

    function lt(t, e) {
        function n(t, e, n) {
            const {
                w: r,
                h: i
            } = t, a = e, s = n || [], o = t => s.includes(t);
            return `${o("lx")?"M0,0":`M0,${a} Q 0,0 5,0`} ${o("rx")?`H${r}`:`H${r-a} Q ${r},0 ${r},5`} ${o("ry")?`V${i}`:`V${i-a} Q ${r},${i} ${r-a},${i}`} ${o("ly")?"H0":`H${a} Q 0,${i} 0,${i-a}`} z`
        }
        t.querySelector("defs#f3CardDef") || t.insertAdjacentHTML("afterbegin", `\n      <defs id="f3CardDef">\n        <linearGradient id="fadeGrad">\n          <stop offset="0.9" stop-color="white" stop-opacity="0"/>\n          <stop offset=".91" stop-color="white" stop-opacity=".5"/>\n          <stop offset="1" stop-color="white" stop-opacity="1"/>\n        </linearGradient>\n        <mask id="fade" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#fadeGrad)"/></mask>\n        <clipPath id="card_clip"><path d="${n({w:e.w,h:e.h},5)}"></clipPath>\n        <clipPath id="card_text_clip"><rect width="${e.w-10}" height="${e.h}"></rect></clipPath>\n        <clipPath id="card_image_clip"><path d="M0,0 Q 0,0 0,0 H${e.img_w} V${e.img_h} H0 Q 0,${e.img_h} 0,${e.img_h} z"></clipPath>\n        <clipPath id="card_image_clip_curved"><path d="${n({w:e.img_w,h:e.img_h},5,["rx","ry"])}"></clipPath>\n      </defs>\n    `)
    }
    var ct = Object.freeze({
        __proto__: null,
        appendElement: dt,
        Card: function(t) {
            return lt((t = function(t) {
                    const e = {
                        img: !0,
                        mini_tree: !0,
                        link_break: !1,
                        card_dim: {
                            w: 220,
                            h: 70,
                            text_x: 75,
                            text_y: 15,
                            img_w: 60,
                            img_h: 60,
                            img_x: 5,
                            img_y: 5
                        }
                    };
                    t || (t = {});
                    for (const n in e) void 0 === t[n] && (t[n] = e[n]);
                    return t
                }(t)).svg, t.card_dim),
                function(e) {
                    const n = "M" === e.data.data.gender ? "card-male" : "F" === e.data.data.gender ? "card-female" : "card-genderless",
                        i = t.card_dim,
                        a = r.create("svg:g").attr("class", `card ${n}`).attr("transform", `translate(${[-i.w/2,-i.h/2]})`);
                    a.append("g").attr("class", "card-inner").attr("clip-path", "url(#card_clip)"), this.innerHTML = "", this.appendChild(a.node()),
                        function(t, e, n) {
                            const r = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            r.innerHTML = t, n ? e.insertBefore(r, e.firstChild) : e.appendChild(r)
                        }(function({
                            d: t,
                            card_dim: e,
                            is_new: n
                        }) {
                            return {
                                template: `\n    <rect width="${e.w}" height="${e.h}" rx="4" ry="4" class="card-outline ${t.data.main&&!n?"card-main-outline":""} ${n?"card-new-outline":""}" />\n  `
                            }
                        }({
                            d: e,
                            card_dim: i,
                            is_new: e.data.to_add
                        }).template, a.node(), !0), dt(ot.cardBody(e, t), this.querySelector(".card-inner")), t.img && dt(ot.cardImage(e, t), this.querySelector(".card")), t.mini_tree && dt(ot.miniTree(e, t), this.querySelector(".card"), !0), t.link_break && dt(ot.lineBreak(e, t), this.querySelector(".card")), t.cardEditForm && (dt(ot.cardEdit(e, t), this.querySelector(".card-inner")), dt(ot.cardAdd(e, t), this.querySelector(".card-inner"))), t.onCardUpdates && t.onCardUpdates.map((t => t.call(this, e))), t.onCardUpdate && t.onCardUpdate.call(this, e)
                }
        },
        CardHtml: function(t) {
            const e = "default" === t.style ? a : "imageCircleRect" === t.style ? function(t) {
                return t.data.data.avatar ? s(t) : o(t)
            } : "imageCircle" === t.style ? s : "imageRect" === t.style ? function(t) {
                return n(t)
            } : "rect" === t.style ? o : a;
            return function(n) {
                this.innerHTML = `\n    <div class="card ${function(t){const e=[];"M"===t.data.data.gender?e.push("card-male"):"F"===t.data.data.gender?e.push("card-female"):e.push("card-genderless");t.data.main&&e.push("card-main");t.data._new_rel_data&&e.push("card-new-rel");t.data.to_add&&e.push("card-to-add");return e}(n).join(" ")}" data-id="${n.data.id}" style="transform: translate(-50%, -50%); pointer-events: auto;">\n      ${t.mini_tree?function(e){return t.mini_tree?e.data.to_add||e.data._new_rel_data||e.all_rels_displayed?"":`<div class="mini-tree">${tt()}</div>`:""}(n):""}\n      ${e(n)}\n    </div>\n    `, this.querySelector(".card").addEventListener("click", (e => t.onCardClick(e, n))), t.onCardUpdate && t.onCardUpdate.call(this, n), t.onCardMouseenter && r.select(this).select(".card").on("mouseenter", (e => t.onCardMouseenter(e, n))), t.onCardMouseleave && r.select(this).select(".card").on("mouseleave", (e => t.onCardMouseleave(e, n)))
            };

            function n(t) {
                return `\n    <div class="card-inner card-image-rect" ${d()}>\n      ${t.data.data.avatar?`<img src="${t.data.data.avatar}" ${l()}>`:c(t)}\n      <div class="card-label">${i(t)}</div>\n    </div>\n    `
            }

            function i(e) {
                return e.data._new_rel_data ? function(t) {
                    const e = [];
                    e.push(`data-rel-type="${t.data._new_rel_data.rel_type}"`), ["son", "daughter"].includes(t.data._new_rel_data.rel_type) && e.push(`data-other-parent-id="${t.data._new_rel_data.other_parent_id}"`);
                    return `<div ${e.join(" ")}>${t.data._new_rel_data.label}</div>`
                }(e) : e.data.to_add ? `<div>${t.empty_card_label||"ADD"}</div>` : `\n      ${t.card_display.map((t=>`<div>${t(e.data)}</div>`)).join("")}\n    `
            }

            function a(t) {
                return n(t)
            }

            function s(t) {
                return function(t) {
                    return `\n    <div class="card-inner card-image-circle" ${d()}>\n      ${t.data.data.avatar?`<img src="${t.data.data.avatar}" ${l()}>`:c(t)}\n      <div class="card-label">${i(t)}</div>\n    </div>\n    `
                }(t)
            }

            function o(t) {
                return function(t) {
                    return `\n    <div class="card-inner card-rect" ${d()}>\n      ${i(t)}\n    </div>\n    `
                }(t)
            }

            function d() {
                let e = 'style="';
                return t.card_dim.w || t.card_dim.h ? (e += `width: ${t.card_dim.w}px; min-height: ${t.card_dim.h}px;`, t.card_dim.height_auto ? e += "height: auto;" : e += `height: ${t.card_dim.h}px;`, e += '"', e) : ""
            }

            function l() {
                let e = 'style="position: relative;';
                return t.card_dim.img_w || t.card_dim.img_h || t.card_dim.img_x || t.card_dim.img_y ? (e += `width: ${t.card_dim.img_w}px; height: ${t.card_dim.img_h}px;`, e += `left: ${t.card_dim.img_x}px; top: ${t.card_dim.img_y}px;`, e += '"', e) : ""
            }

            function c(t) {
                return t.data._new_rel_data ? `<div class="person-icon" ${l()}>${W()}</div>` : `<div class="person-icon" ${l()}>${X()}</div>`
            }
        }
    });

    function ht(t, e, n) {
        return this.store = t, this.cancelCallback = e, this.onSubmitCallback = n, this.datum = null, this.onChange = null, this.onCancel = null, this.is_active = !1, this.store_data = null, this.addRelLabels = this.addRelLabelsDefault(), this
    }

    function ut(t, e) {
        return this.cont = t, this.store = e, this.fields = [{
            type: "text",
            label: "first name",
            id: "first name"
        }, {
            type: "text",
            label: "last name",
            id: "last name"
        }, {
            type: "text",
            label: "birthday",
            id: "birthday"
        }, {
            type: "text",
            label: "avatar",
            id: "avatar"
        }], this.form_cont = null, this.is_fixed = !0, this.history = null, this.no_edit = !1, this.onChange = null, this.editFirst = !1, this.init(), this
    }

    function pt(t, e) {
        return this.cont = null, this.store = null, this.svg = null, this.getCard = null, this.node_separation = 250, this.level_separation = 150, this.is_horizontal = !1, this.single_parent_empty_card = !0, this.transition_time = 2e3, this.is_card_html = !1, this.beforeUpdate = null, this.afterUpdate = null, this.init(t, e), this
    }

    function ft(t) {
        const e = [];
        return Array.isArray(t) ? t.forEach((t => {
            "function" == typeof t ? e.push(t) : "string" == typeof t ? e.push((e => e.data[t])) : Array.isArray(t) && e.push((e => t.map((t => e.data[t])).join(" ")))
        })) : "function" == typeof t ? e.push(t) : "string" == typeof t && e.push((e => e.data[t])), e
    }

    function _t(...t) {
        return new mt(...t)
    }

    function mt(t, e) {
        return this.cont = t, this.store = e, this.svg = null, this.getCard = null, this.card_dim = {
            w: 220,
            h: 70,
            text_x: 75,
            text_y: 15,
            img_w: 60,
            img_h: 60,
            img_x: 5,
            img_y: 5
        }, this.card_display = [t => `${t.data["first name"]} ${t.data["last name"]}`], this.mini_tree = !0, this.link_break = !1, this.onCardClick = this.onCardClickDefault, this.onCardUpdate = null, this.onCardUpdates = null, this.init(), this
    }

    function yt(...t) {
        return new gt(...t)
    }

    function gt(t, e) {
        return this.cont = t, this.store = e, this.getCard = null, this.card_display = [t => `${t.data["first name"]} ${t.data["last name"]}`], this.onCardClick = this.onCardClickDefault, this.style = "default", this.mini_tree = !1, this.onCardUpdate = null, this.card_dim = {}, this.init(), this
    }
    ht.prototype.activate = function(t) {
        this.is_active && this.onCancel(), this.is_active = !0;
        const e = this.store;
        this.store_data = e.getData(), this.datum = t;
        const n = function(t, e, n) {
            const r = function(t, e) {
                const n = [t];
                return Object.keys(t.rels).forEach((e => {
                    const n = t.rels[e];
                    Array.isArray(n) ? n.forEach((t => {
                        r(e, t)
                    })) : r(e, n)
                })), n;

                function r(t, r) {
                    const i = function(t, e) {
                        return JSON.parse(JSON.stringify(t.find((t => t.id === e))))
                    }(e, r);
                    "father" !== t && "mother" !== t || (delete i.rels.father, delete i.rels.mother), "children" === t && (i.rels.children = [], i.rels.spouses = []), n.push(i)
                }
            }(t, e);
            if (!t.rels.father) {
                const e = f({
                    data: {
                        gender: "M"
                    },
                    rels: {
                        children: [t.id]
                    }
                });
                e._new_rel_data = {
                    rel_type: "father",
                    label: n.father
                }, t.rels.father = e.id, r.push(e)
            }
            if (!t.rels.mother) {
                const e = f({
                    data: {
                        gender: "F"
                    },
                    rels: {
                        children: [t.id]
                    }
                });
                e._new_rel_data = {
                    rel_type: "mother",
                    label: n.mother
                }, t.rels.mother = e.id, r.push(e)
            }
            const i = r.find((e => e.id === t.rels.mother)),
                a = r.find((e => e.id === t.rels.father));
            i.rels.spouses = [a.id], a.rels.spouses = [i.id], i.rels.children = [t.id], a.rels.children = [t.id], t.rels.spouses || (t.rels.spouses = []);
            if (t.rels.children) {
                let e;
                t.rels.children.forEach((i => {
                    const a = r.find((t => t.id === i));
                    a.rels.mother || (e || (e = f({
                        data: {
                            gender: "F"
                        },
                        rels: {
                            spouses: [t.id],
                            children: []
                        }
                    })), e._new_rel_data = {
                        rel_type: "spouse",
                        label: n.spouse
                    }, e.rels.children.push(a.id), t.rels.spouses.push(e.id), a.rels.mother = e.id, r.push(e)), a.rels.father || (e || (e = f({
                        data: {
                            gender: "M"
                        },
                        rels: {
                            spouses: [t.id],
                            children: []
                        }
                    })), e._new_rel_data = {
                        rel_type: "spouse",
                        label: n.spouse
                    }, e.rels.children.push(a.id), t.rels.spouses.push(e.id), a.rels.father = e.id, r.push(e))
                }))
            }
            const s = f({
                data: {
                    gender: "F"
                },
                rels: {
                    spouses: [t.id]
                }
            });
            s._new_rel_data = {
                rel_type: "spouse",
                label: n.spouse
            }, t.rels.spouses.push(s.id), r.push(s), t.rels.children || (t.rels.children = []);
            return t.rels.spouses.forEach((e => {
                const i = r.find((t => t.id === e));
                i.rels.children || (i.rels.children = []), i.rels.children = i.rels.children.filter((e => t.rels.children.includes(e)));
                const a = f({
                    data: {
                        gender: "M"
                    },
                    rels: {
                        father: t.id,
                        mother: i.id
                    }
                });
                a._new_rel_data = {
                    rel_type: "son",
                    label: n.son,
                    other_parent_id: i.id
                }, i.rels.children.push(a.id), t.rels.children.push(a.id), r.push(a);
                const s = f({
                    data: {
                        gender: "F"
                    },
                    rels: {
                        mother: i.id,
                        father: t.id
                    }
                });
                s._new_rel_data = {
                    rel_type: "daughter",
                    label: n.daughter,
                    other_parent_id: i.id
                }, i.rels.children.push(s.id), t.rels.children.push(s.id), r.push(s)
            })), r
        }(t = JSON.parse(JSON.stringify(this.datum)), this.getStoreData(), this.addRelLabels);
        e.updateData(n), e.updateTree({}), this.onChange = function(t) {
            if (t?._new_rel_data) {
                const e = t;
                p({
                    datum: this.datum,
                    new_rel_datum: e,
                    data_stash: this.getStoreData()
                }), this.onSubmitCallback(this.datum, e)
            } else t.id === this.datum.id ? this.datum.data = t.data : console.error("Something went wrong")
        }.bind(this), this.onCancel = function() {
            if (!this.is_active) return;
            this.is_active = !1, e.updateData(this.getStoreData()), this.cancelCallback(this.datum), this.store_data = null, this.datum = null, this.onChange = null, this.onCancel = null
        }.bind(this)
    }, ht.prototype.setAddRelLabels = function(t) {
        if ("object" == typeof t) {
            for (let e in t) this.addRelLabels[e] = t[e];
            return this
        }
        console.error("add_rel_labels must be an object")
    }, ht.prototype.addRelLabelsDefault = function() {
        return {
            father: "Add Father",
            mother: "Add Mother",
            spouse: "Add Spouse",
            son: "Add Son",
            daughter: "Add Daughter"
        }
    }, ht.prototype.getStoreData = function() {
        return this.store_data
    }, ut.prototype.init = function() {
        this.form_cont = r.select(this.cont).append("div").classed("f3-form-cont", !0).node(), this.addRelativeInstance = this.setupAddRelative(), this.createHistory()
    }, ut.prototype.open = function(t) {
        t.data.data && (t = t.data), this.addRelativeInstance.is_active && !t._new_rel_data && (this.addRelativeInstance.onCancel(), t = this.store.getDatum(t.id)), this.cardEditForm(t)
    }, ut.prototype.openWithoutRelCancel = function(t) {
        t.data.data && (t = t.data), this.cardEditForm(t)
    }, ut.prototype.cardEditForm = function(t) {
        const e = {};
        t?._new_rel_data ? e.onCancel = () => this.addRelativeInstance.onCancel() : (e.addRelative = this.addRelativeInstance, e.deletePerson = () => {
            const e = this.store.getData();
            c(t, e), this.store.updateData(e), this.openFormWithId(this.store.getLastAvailableMainDatum().id), this.store.updateTree({})
        });
        const n = vt.handlers.createForm({
            store: this.store,
            datum: t,
            postSubmit: function(e) {
                this.addRelativeInstance.is_active ? this.addRelativeInstance.onChange(t) : e?.delete || this.openFormWithId(t.id);
                this.is_fixed || this.closeForm();
                this.store.updateTree({}), this.updateHistory()
            }.bind(this),
            fields: this.fields,
            card_display: this.card_display,
            addRelative: null,
            onCancel: () => {},
            editFirst: this.editFirst,
            ...e
        });
        n.no_edit = this.no_edit;
        const r = vt.handlers.formInfoSetup(n, this.closeForm.bind(this));
        this.form_cont.innerHTML = "", this.form_cont.appendChild(r), this.openForm()
    }, ut.prototype.openForm = function() {
        r.select(this.form_cont).classed("opened", !0)
    }, ut.prototype.closeForm = function() {
        r.select(this.form_cont).classed("opened", !1).html(""), this.store.updateTree({})
    }, ut.prototype.fixed = function() {
        return this.is_fixed = !0, r.select(this.form_cont).style("position", "relative"), this
    }, ut.prototype.absolute = function() {
        return this.is_fixed = !1, r.select(this.form_cont).style("position", "absolute"), this
    }, ut.prototype.setCardClickOpen = function(t) {
        return t.setOnCardClick(((t, e) => {
            this.addRelativeInstance.is_active ? this.open(e) : (this.open(e), this.store.updateMainId(e.data.id), this.store.updateTree({}))
        })), this
    }, ut.prototype.openFormWithId = function(t) {
        if (t) {
            const e = this.store.getDatum(t);
            this.openWithoutRelCancel({
                data: e
            })
        } else {
            const t = this.store.getMainDatum();
            this.openWithoutRelCancel({
                data: t
            })
        }
    }, ut.prototype.createHistory = function() {
        return this.history = vt.handlers.createHistory(this.store, this.getStoreData.bind(this), function() {
            this.addRelativeInstance.is_active && this.addRelativeInstance.onCancel();
            this.store.updateTree({
                initial: !1
            }), this.history.controls.updateButtons(), this.openFormWithId(this.store.getMainDatum()?.id)
        }.bind(this)), this.history.controls = vt.handlers.createHistoryControls(this.cont, this.history), this.history.changed(), this.history.controls.updateButtons(), this
    }, ut.prototype.setNoEdit = function() {
        return this.no_edit = !0, this
    }, ut.prototype.setEdit = function() {
        return this.no_edit = !1, this
    }, ut.prototype.setFields = function(t) {
        const e = [];
        if (!Array.isArray(t)) return console.error("fields must be an array"), this;
        for (const n of t) "string" == typeof n ? e.push({
            type: "text",
            label: n,
            id: n
        }) : "object" == typeof n ? n.id ? e.push(n) : console.error("fields must be an array of objects with id property") : console.error("fields must be an array of strings or objects");
        return this.fields = e, this
    }, ut.prototype.setOnChange = function(t) {
        return this.onChange = t, this
    }, ut.prototype.addRelative = function(t) {
        return t || (t = this.store.getMainDatum()), this.addRelativeInstance.activate(t), this
    }, ut.prototype.setupAddRelative = function() {
        return ((...t) => new ht(...t))(this.store, function(t) {
            this.store.updateMainId(t.id), this.store.updateTree({}), this.openFormWithId(t.id)
        }.bind(this), function(t, e) {
            this.store.updateMainId(t.id), this.openFormWithId(t.id)
        }.bind(this))
    }, ut.prototype.setEditFirst = function(t) {
        return this.editFirst = t, this
    }, ut.prototype.isAddingRelative = function() {
        return this.addRelativeInstance.is_active
    }, ut.prototype.setAddRelLabels = function(t) {
        return this.addRelativeInstance.setAddRelLabels(t), this
    }, ut.prototype.getStoreData = function() {
        return this.addRelativeInstance.is_active ? this.addRelativeInstance.getStoreData() : this.store.getData()
    }, ut.prototype.getDataJson = function(t) {
        const e = this.getStoreData();
        return vt.handlers.cleanupDataJson(JSON.stringify(e))
    }, ut.prototype.updateHistory = function() {
        this.history && (this.history.changed(), this.history.controls.updateButtons()), this.onChange && this.onChange()
    }, ut.prototype.destroy = function() {
        return this.history.controls.destroy(), this.history = null, r.select(this.cont).select(".f3-form-cont").remove(), this.addRelativeInstance.onCancel && this.addRelativeInstance.onCancel(), this.store.updateTree({}), this
    }, pt.prototype.init = function(t, e) {
        this.cont = t = function(t) {
            "string" == typeof t && (t = document.querySelector(t));
            return t
        }(t);
        this.svg = vt.createSvg(t, {
            onZoom: vt.htmlHandlers.onZoomSetup((() => t.querySelector("svg .view")), (() => t.querySelector("#htmlSvg .cards_view")))
        }), vt.htmlHandlers.createHtmlSvg(t), this.store = vt.createStore({
            data: e,
            node_separation: this.node_separation,
            level_separation: this.level_separation,
            single_parent_empty_card: this.single_parent_empty_card,
            is_horizontal: this.is_horizontal
        }), this.setCard(vt.CardSvg), this.store.setOnUpdate((e => {
            this.beforeUpdate && this.beforeUpdate(e), e = Object.assign({
                transition_time: this.transition_time
            }, e || {}), this.is_card_html && (e = Object.assign({}, e || {}, {
                cardHtml: t.querySelector("#htmlSvg")
            })), vt.view(this.store.getTree(), this.svg, this.getCard(), e || {}), this.afterUpdate && this.afterUpdate(e)
        }))
    }, pt.prototype.updateTree = function(t = {
        initial: !1
    }) {
        return this.store.updateTree(t), this
    }, pt.prototype.updateData = function(t) {
        return this.store.updateData(t), this
    }, pt.prototype.setCardYSpacing = function(t) {
        return "number" != typeof t ? (console.error("card_y_spacing must be a number"), this) : (this.level_separation = t, this.store.state.level_separation = t, this)
    }, pt.prototype.setCardXSpacing = function(t) {
        return "number" != typeof t ? (console.error("card_x_spacing must be a number"), this) : (this.node_separation = t, this.store.state.node_separation = t, this)
    }, pt.prototype.setOrientationVertical = function() {
        return this.is_horizontal = !1, this.store.state.is_horizontal = !1, this
    }, pt.prototype.setOrientationHorizontal = function() {
        return this.is_horizontal = !0, this.store.state.is_horizontal = !0, this
    }, pt.prototype.setSingleParentEmptyCard = function(t, {
        label: e = "Unknown"
    } = {}) {
        return this.single_parent_empty_card = t, this.store.state.single_parent_empty_card = t, this.store.state.single_parent_empty_card_label = e, this.editTreeInstance && this.editTreeInstance.addRelativeInstance.is_active && this.editTreeInstance.addRelativeInstance.onCancel(), vt.handlers.removeToAddFromData(this.store.getData() || []), this
    }, pt.prototype.setCard = function(t) {
        this.is_card_html = t.is_html, this.is_card_html ? (this.svg.querySelector(".cards_view").innerHTML = "", this.cont.querySelector("#htmlSvg").style.display = "block") : (this.cont.querySelector("#htmlSvg .cards_view").innerHTML = "", this.cont.querySelector("#htmlSvg").style.display = "none");
        const e = t(this.cont, this.store);
        return this.getCard = () => e.getCard(), e
    }, pt.prototype.setTransitionTime = function(t) {
        return this.transition_time = t, this
    }, pt.prototype.editTree = function() {
        return this.editTreeInstance = function(...t) {
            return new ut(...t)
        }(this.cont, this.store)
    }, pt.prototype.updateMain = function(t) {
        return this.store.updateMainId(t.data.id), this.store.updateTree({}), this
    }, pt.prototype.updateMainId = function(t) {
        return this.store.updateMainId(t), this
    }, pt.prototype.getMainDatum = function() {
        return this.store.getMainDatum()
    }, pt.prototype.getDataJson = function(t) {
        const e = this.store.getData();
        return vt.handlers.cleanupDataJson(JSON.stringify(e))
    }, pt.prototype.updateData = function(t) {
        this.store.updateData(t)
    }, pt.prototype.setBeforeUpdate = function(t) {
        return this.beforeUpdate = t, this
    }, pt.prototype.setAfterUpdate = function(t) {
        return this.afterUpdate = t, this
    }, _t.is_html = !1, mt.prototype.init = function() {
        this.svg = this.cont.querySelector("svg.main_svg"), this.getCard = () => vt.elements.Card({
            store: this.store,
            svg: this.svg,
            card_dim: this.card_dim,
            card_display: this.card_display,
            mini_tree: this.mini_tree,
            link_break: this.link_break,
            onCardClick: this.onCardClick,
            onCardUpdate: this.onCardUpdate,
            onCardUpdates: this.onCardUpdates
        })
    }, mt.prototype.setCardDisplay = function(t) {
        return this.card_display = ft(t), this
    }, mt.prototype.setCardDim = function(t) {
        if ("object" != typeof t) return console.error("card_dim must be an object"), this;
        for (let e in t) {
            const n = t[e];
            if ("number" != typeof n) return console.error(`card_dim.${e} must be a number`), this;
            "width" === e && (e = "w"), "height" === e && (e = "h"), this.card_dim[e] = n
        }
        return function(t, e) {
            t.querySelector("defs#f3CardDef") && t.querySelector("defs#f3CardDef").remove(), lt(t, e)
        }(this.svg, this.card_dim), this
    }, mt.prototype.setMiniTree = function(t) {
        return this.mini_tree = t, this
    }, mt.prototype.setLinkBreak = function(t) {
        return this.link_break = t, this
    }, mt.prototype.setCardTextSvg = function(t) {
        function e(e) {
            r.select(this).select(".card-text text").node().parentNode.innerHTML = t(e.data)
        }
        return e.id = "setCardTextSvg", this.onCardUpdates || (this.onCardUpdates = []), this.onCardUpdates = this.onCardUpdates.filter((t => "setCardTextSvg" !== t.id)), this.onCardUpdates.push(e), this
    }, mt.prototype.onCardClickDefault = function(t, e) {
        this.store.updateMainId(e.data.id), this.store.updateTree({})
    }, mt.prototype.setOnCardClick = function(t) {
        return this.onCardClick = t, this
    }, yt.is_html = !0, gt.prototype.is_html = !0, gt.prototype.init = function() {
        this.svg = this.cont.querySelector("svg.main_svg"), this.getCard = () => vt.elements.CardHtml({
            store: this.store,
            card_display: this.card_display,
            onCardClick: this.onCardClick,
            style: this.style,
            mini_tree: this.mini_tree,
            onCardUpdate: this.onCardUpdate,
            card_dim: this.card_dim,
            empty_card_label: this.store.state.single_parent_empty_card_label,
            onCardMouseenter: this.onCardMouseenter ? this.onCardMouseenter.bind(this) : null,
            onCardMouseleave: this.onCardMouseleave ? this.onCardMouseleave.bind(this) : null
        })
    }, gt.prototype.setCardDisplay = function(t) {
        return this.card_display = ft(t), this
    }, gt.prototype.setOnCardClick = function(t) {
        return this.onCardClick = t, this
    }, gt.prototype.onCardClickDefault = function(t, e) {
        this.store.updateMainId(e.data.id), this.store.updateTree({})
    }, gt.prototype.setStyle = function(t) {
        return this.style = t, this
    }, gt.prototype.setMiniTree = function(t) {
        return this.mini_tree = t, this
    }, gt.prototype.setOnCardUpdate = function(t) {
        return this.onCardUpdate = t, this
    }, gt.prototype.setCardDim = function(t) {
        if ("object" != typeof t) return console.error("card_dim must be an object"), this;
        for (let e in t) {
            const n = t[e];
            if ("number" != typeof n && "boolean" != typeof n) return console.error(`card_dim.${e} must be a number or boolean`), this;
            "width" === e && (e = "w"), "height" === e && (e = "h"), "img_width" === e && (e = "img_w"), "img_height" === e && (e = "img_h"), "img_x" === e && (e = "img_x"), "img_y" === e && (e = "img_y"), this.card_dim[e] = n
        }
        return this
    }, gt.prototype.resetCardDim = function() {
        return this.card_dim = {}, this
    }, gt.prototype.setOnHoverPathToMain = function() {
        return this.onCardMouseenter = this.onEnterPathToMain.bind(this), this.onCardMouseleave = this.onLeavePathToMain.bind(this), this
    }, gt.prototype.unsetOnHoverPathToMain = function() {
        return this.onCardMouseenter = null, this.onCardMouseleave = null, this
    }, gt.prototype.onEnterPathToMain = function(t, e) {
        this.to_transition = e.data.id;
        const n = this.store.getTreeMainDatum(),
            i = r.select(this.cont).select("div.cards_view").selectAll(".card_cont"),
            a = r.select(this.cont).select("svg.main_svg .links_view").selectAll(".link"),
            [s, o] = function(t, e, n, r) {
                const i = n.is_ancestry,
                    a = e.data();
                let s = [],
                    o = [];
                if (i) {
                    const i = [];
                    let l = n,
                        c = 0;
                    for (; l !== r.data && c < 100;) {
                        c++;
                        const t = a.find((t => !0 === t.spouse && (t.source === l || t.target === l)));
                        if (t) {
                            const e = a.find((e => Array.isArray(e.target) && e.target.includes(t.source) && e.target.includes(t.target)));
                            if (!e) break;
                            i.push(t), i.push(e), l = e.source
                        } else {
                            const t = a.find((t => Array.isArray(t.target) && t.target.includes(l)));
                            if (!t) break;
                            i.push(t), l = t.source
                        }
                    }
                    e.each((function(t) {
                        i.includes(t) && s.push({
                            link: t,
                            node: this
                        })
                    }));
                    const h = d(n, i);
                    t.each((function(t) {
                        h.includes(t) && o.push({
                            card: t,
                            node: this
                        })
                    }))
                } else if (n.spouse && n.spouse.data === r.data) {
                    e.each((function(t) {
                        t.target === n && s.push({
                            link: t,
                            node: this
                        })
                    }));
                    const i = [r, n];
                    t.each((function(t) {
                        i.includes(t) && o.push({
                            card: t,
                            node: this
                        })
                    }))
                } else {
                    let i = [],
                        l = n,
                        c = 0;
                    for (; l !== r.data && c < 100;) {
                        c++;
                        const t = a.find((t => t.target === l && Array.isArray(t.source)));
                        if (t) {
                            const e = a.find((e => {
                                return !0 === e.spouse && (n = [e.source, e.target], r = t.source, n.every((t => r.some((e => t === e)))));
                                var n, r
                            }));
                            i.push(t), i.push(e), l = e ? e.source : t.source[0]
                        } else {
                            const t = a.find((t => t.target === l && !Array.isArray(t.source)));
                            if (!t) break;
                            i.push(t), l = t.source
                        }
                    }
                    e.each((function(t) {
                        i.includes(t) && s.push({
                            link: t,
                            node: this
                        })
                    }));
                    const h = d(r, i);
                    t.each((function(t) {
                        h.includes(t) && o.push({
                            card: t,
                            node: this
                        })
                    }))
                }
                return [o, s];

                function d(t, e) {
                    const i = e.filter((t => t)).reduce(((t, e) => (Array.isArray(e.target) ? t.push(...e.target) : t.push(e.target), Array.isArray(e.source) ? t.push(...e.source) : t.push(e.source), t)), []),
                        a = [r, n];
                    return function t(e) {
                        e.data.rels.children && e.data.rels.children.forEach((e => {
                            const n = i.find((t => t.data.id === e));
                            n && (a.push(n), t(n))
                        }))
                    }(t), a
                }
            }(i, a, e, n);
        return s.forEach((t => {
            const n = 200 * Math.abs(e.depth - t.card.depth);
            r.select(t.node.querySelector("div.card-inner")).transition().duration(0).delay(n).on("end", (() => this.to_transition === e.data.id && r.select(t.node.querySelector("div.card-inner")).classed("f3-path-to-main", !0)))
        })), o.forEach((t => {
            const n = 200 * Math.abs(e.depth - t.link.depth);
            r.select(t.node).transition().duration(0).delay(n).on("end", (() => this.to_transition === e.data.id && r.select(t.node).classed("f3-path-to-main", !0)))
        })), this
    }, gt.prototype.onLeavePathToMain = function(t, e) {
        return this.to_transition = !1, r.select(this.cont).select("div.cards_view").selectAll("div.card-inner").classed("f3-path-to-main", !1), r.select(this.cont).select("svg.main_svg .links_view").selectAll(".link").classed("f3-path-to-main", !1), this
    };
    var vt = {
        CalculateTree: v,
        createStore: function(t) {
            let e;
            const n = t;
            return n.main_id_history = [], {
                state: n,
                updateTree: t => {
                    n.tree = v({
                        data: n.data,
                        main_id: n.main_id,
                        node_separation: n.node_separation,
                        level_separation: n.level_separation,
                        single_parent_empty_card: n.single_parent_empty_card,
                        is_horizontal: n.is_horizontal
                    }), n.main_id || i(n.tree.main_id), e && e(t)
                },
                updateData: t => n.data = t,
                updateMainId: i,
                getMainId: () => n.main_id,
                getData: () => n.data,
                getTree: () => n.tree,
                setOnUpdate: t => e = t,
                getMainDatum: function() {
                    return n.data.find((t => t.id === n.main_id))
                },
                getDatum: r,
                getTreeMainDatum: function() {
                    return n.tree ? n.tree.data.find((t => t.data.id === n.main_id)) : null
                },
                getTreeDatum: function(t) {
                    return n.tree ? n.tree.data.find((e => e.id === t)) : null
                },
                getLastAvailableMainDatum: function() {
                    let t = n.main_id_history.slice(0).reverse().find((t => r(t)));
                    t || (t = n.data[0].id);
                    t !== n.main_id && i(t);
                    return r(t)
                },
                methods: {}
            };

            function r(t) {
                return n.data.find((e => e.id === t))
            }

            function i(t) {
                t !== n.main_id && (n.main_id_history = n.main_id_history.filter((e => e !== t)).slice(-10), n.main_id_history.push(t), n.main_id = t)
            }
        },
        view: function(t, e, n, i = {}) {
            i.initial = i.hasOwnProperty("initial") ? i.initial : !r.select(e.parentNode).select(".card_cont").node(), i.transition_time = i.hasOwnProperty("transition_time") ? i.transition_time : 2e3, i.cardComponent ? function(t, e, n, i = {}) {
                    const s = r.select(L((() => t))).selectAll("div.card_cont_fake").data(e.data, (t => t.data.id)),
                        o = s.exit(),
                        d = s.enter().append("div").attr("class", "card_cont_fake").style("display", "none"),
                        l = d.merge(s);
                    o.each((t => a(t, !1, !0))), d.each((t => a(t, !0, !1))), o.each((function(t) {
                        const e = r.select(n(t)),
                            a = r.select(this);
                        e.transition().duration(i.transition_time).style("opacity", 0).style("transform", `translate(${t._x}px, ${t._y}px)`).on("end", (() => a.remove()))
                    })), s.each((function(t) {})), d.each((function(t) {
                        r.select(n(t)).style("position", "absolute").style("top", "0").style("left", "0").style("opacity", 0).style("transform", `translate(${t._x}px, ${t._y}px)`)
                    })), l.each((function(t) {
                        const a = r.select(n(t)),
                            s = i.initial ? A(e, t, i.transition_time) : 0;
                        a.transition().duration(i.transition_time).delay(s).style("transform", `translate(${t.x}px, ${t.y}px)`).style("opacity", 1)
                    }))
                }(i.cardComponent, t, n, i) : i.cardHtml ? function(t, e, n, i = {}) {
                    const s = r.select(t).select(".cards_view").selectAll("div.card_cont").data(e.data, (t => t.data.id)),
                        o = s.exit(),
                        d = s.enter().append("div").attr("class", "card_cont").style("pointer-events", "none"),
                        l = d.merge(s);
                    o.each((t => a(t, !1, !0))), d.each((t => a(t, !0, !1))), o.each((function(t) {
                        const e = r.select(this);
                        e.transition().duration(i.transition_time).style("opacity", 0).style("transform", `translate(${t._x}px, ${t._y}px)`).on("end", (() => e.remove()))
                    })), s.each((function(t) {})), d.each((function(t) {
                        r.select(this).style("position", "absolute").style("top", "0").style("left", "0").style("transform", `translate(${t._x}px, ${t._y}px)`).style("opacity", 0), n.call(this, t)
                    })), l.each((function(t) {
                        n.call(this, t);
                        const a = i.initial ? A(e, t, i.transition_time) : 0;
                        r.select(this).transition().duration(i.transition_time).delay(a).style("transform", `translate(${t.x}px, ${t.y}px)`).style("opacity", 1)
                    }))
                }(i.cardHtml, t, n, i) : function(t, e, n, i = {}) {
                    const s = r.select(t).select(".cards_view").selectAll("g.card_cont").data(e.data, (t => t.data.id)),
                        o = s.exit(),
                        d = s.enter().append("g").attr("class", "card_cont"),
                        l = d.merge(s);
                    o.each((t => a(t, !1, !0))), d.each((t => a(t, !0, !1))), o.each((function(t) {
                        const e = r.select(this);
                        e.transition().duration(i.transition_time).style("opacity", 0).attr("transform", `translate(${t._x}, ${t._y})`).on("end", (() => e.remove()))
                    })), s.each((function(t) {})), d.each((function(t) {
                        r.select(this).attr("transform", `translate(${t._x}, ${t._y})`).style("opacity", 0), n.call(this, t)
                    })), l.each((function(t) {
                        n.call(this, t);
                        const a = i.initial ? A(e, t, i.transition_time) : 0;
                        r.select(this).transition().duration(i.transition_time).delay(a).attr("transform", `translate(${t.x}, ${t.y})`).style("opacity", 1)
                    }))
                }(e, t, n, i),
                function(t, e, n = {}) {
                    const i = e.data.reduce(((t, n) => ($({
                            d: n,
                            tree: e.data,
                            is_horizontal: e.is_horizontal
                        }).forEach((e => t[e.id] = e)), t)), {}),
                        a = Object.values(i),
                        s = r.select(t).select(".links_view").selectAll("path.link").data(a, (t => t.id)),
                        o = s.exit(),
                        d = s.enter().append("path").attr("class", "link"),
                        l = d.merge(s);
                    o.each((function(t) {
                        const e = r.select(this);
                        e.transition("op").duration(800).style("opacity", 0), e.transition("path").duration(n.transition_time).attr("d", M(t, !0)).on("end", (() => e.remove()))
                    })), d.each((function(t) {
                        r.select(this).attr("fill", "none").attr("stroke", "#fff").attr("stroke-width", 1).style("opacity", 0).attr("d", M(t, !0))
                    })), l.each((function(t) {
                        const i = r.select(this),
                            a = n.initial ? A(e, t, n.transition_time) : 0;
                        i.transition("path").duration(n.transition_time).delay(a).attr("d", M(t)).style("opacity", 1)
                    }))
                }(e, t, i);
            const s = i.tree_position || "fit";
            return i.initial ? b({
                svg: e,
                svg_dim: e.getBoundingClientRect(),
                tree_dim: t.dim,
                transition_time: 0
            }) : "fit" === s ? b({
                svg: e,
                svg_dim: e.getBoundingClientRect(),
                tree_dim: t.dim,
                transition_time: i.transition_time
            }) : "main_to_middle" === s && w({
                datum: t.data[0],
                svg: e,
                svg_dim: e.getBoundingClientRect(),
                scale: i.scale,
                transition_time: i.transition_time
            }), !0
        },
        createSvg: function(t, e = {}) {
            const n = t.getBoundingClientRect(),
                i = `\n    <svg class="main_svg">\n      <rect width="${n.width}" height="${n.height}" fill="transparent" />\n      <g class="view">\n        <g class="links_view"></g>\n        <g class="cards_view"></g>\n      </g>\n      <g style="transform: translate(100%, 100%)">\n        <g class="fit_screen_icon cursor-pointer" style="transform: translate(-50px, -50px); display: none">\n          <rect width="27" height="27" stroke-dasharray="13.5" stroke-dashoffset="6.75" \n            style="stroke:#fff;stroke-width:4px;fill:transparent;"/>\n          <circle r="5" cx="13.5" cy="13.5" style="fill:#fff" />          \n        </g>\n      </g>\n    </svg>\n  `,
                a = function(t) {
                    let e = t.querySelector("#f3Canvas");
                    e || (e = r.create("div").attr("id", "f3Canvas").attr("style", "position: relative; overflow: hidden; width: 100%; height: 100%;").node());
                    return e
                }(t),
                s = r.create("div").node();
            s.innerHTML = i;
            const o = s.querySelector("svg");
            return a.appendChild(o), t.appendChild(a),
                function(t, e = {}) {
                    if (t.__zoom) return;
                    const n = t.querySelector(".view"),
                        i = r.zoom().on("zoom", e.onZoom || a);
                    r.select(t).call(i), t.__zoomObj = i, e.zoom_polite && i.filter(s);

                    function a(t) {
                        r.select(n).attr("transform", t.transform)
                    }

                    function s(t) {
                        return !("wheel" === t.type && !t.ctrlKey) && !(t.touches && t.touches.length < 2)
                    }
                }(a, e), o
        },
        handlers: it,
        elements: ct,
        htmlHandlers: I,
        icons: rt,
        createChart: function(...t) {
            return new pt(...t)
        },
        CardSvg: _t,
        CardHtml: yt
    };
    return vt
}));
