import { inject as Qe, ref as $, h as me, getCurrentInstance as Ye, nextTick as _e, reactive as Ie, defineComponent as H, createVNode as v, resolveComponent as O, openBlock as y, createBlock as P, withCtx as C, createElementBlock as K, createCommentVNode as S, createElementVNode as $e, normalizeClass as Pe, toDisplayString as q, createTextVNode as ee, unref as ge, watch as Ze, computed as M, renderSlot as T, mergeProps as Je } from "vue";
import { message as U } from "ant-design-vue";
function m(e, r) {
  Xe(e) && (e = "100%");
  var t = Ke(e);
  return e = r === 360 ? e : Math.min(r, Math.max(0, parseFloat(e))), t && (e = parseInt(String(e * r), 10) / 100), Math.abs(e - r) < 1e-6 ? 1 : (r === 360 ? e = (e < 0 ? e % r + r : e % r) / parseFloat(String(r)) : e = e % r / parseFloat(String(r)), e);
}
function Xe(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function Ke(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function et(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function B(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function G(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function tt(e, r, t) {
  return {
    r: m(e, 255) * 255,
    g: m(r, 255) * 255,
    b: m(t, 255) * 255
  };
}
function Q(e, r, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? e + (r - e) * (6 * t) : t < 1 / 2 ? r : t < 2 / 3 ? e + (r - e) * (2 / 3 - t) * 6 : e;
}
function rt(e, r, t) {
  var n, a, o;
  if (e = m(e, 360), r = m(r, 100), t = m(t, 100), r === 0)
    a = t, o = t, n = t;
  else {
    var l = t < 0.5 ? t * (1 + r) : t + r - t * r, i = 2 * t - l;
    n = Q(i, l, e + 1 / 3), a = Q(i, l, e), o = Q(i, l, e - 1 / 3);
  }
  return { r: n * 255, g: a * 255, b: o * 255 };
}
function nt(e, r, t) {
  e = m(e, 255), r = m(r, 255), t = m(t, 255);
  var n = Math.max(e, r, t), a = Math.min(e, r, t), o = 0, l = n, i = n - a, u = n === 0 ? 0 : i / n;
  if (n === a)
    o = 0;
  else {
    switch (n) {
      case e:
        o = (r - t) / i + (r < t ? 6 : 0);
        break;
      case r:
        o = (t - e) / i + 2;
        break;
      case t:
        o = (e - r) / i + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s: u, v: l };
}
function at(e, r, t) {
  e = m(e, 360) * 6, r = m(r, 100), t = m(t, 100);
  var n = Math.floor(e), a = e - n, o = t * (1 - r), l = t * (1 - a * r), i = t * (1 - (1 - a) * r), u = n % 6, f = [t, l, o, o, i, t][u], b = [i, t, t, l, o, o][u], h = [o, o, i, t, t, l][u];
  return { r: f * 255, g: b * 255, b: h * 255 };
}
function ot(e, r, t, n) {
  var a = [
    G(Math.round(e).toString(16)),
    G(Math.round(r).toString(16)),
    G(Math.round(t).toString(16))
  ];
  return n && a[0].startsWith(a[0].charAt(1)) && a[1].startsWith(a[1].charAt(1)) && a[2].startsWith(a[2].charAt(1)) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) : a.join("");
}
function be(e) {
  return d(e) / 255;
}
function d(e) {
  return parseInt(e, 16);
}
var pe = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function _(e) {
  var r = { r: 0, g: 0, b: 0 }, t = 1, n = null, a = null, o = null, l = !1, i = !1;
  return typeof e == "string" && (e = ct(e)), typeof e == "object" && (p(e.r) && p(e.g) && p(e.b) ? (r = tt(e.r, e.g, e.b), l = !0, i = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : p(e.h) && p(e.s) && p(e.v) ? (n = B(e.s), a = B(e.v), r = at(e.h, n, a), l = !0, i = "hsv") : p(e.h) && p(e.s) && p(e.l) && (n = B(e.s), o = B(e.l), r = rt(e.h, n, o), l = !0, i = "hsl"), Object.prototype.hasOwnProperty.call(e, "a") && (t = e.a)), t = et(t), {
    ok: l,
    format: e.format || i,
    r: Math.min(255, Math.max(r.r, 0)),
    g: Math.min(255, Math.max(r.g, 0)),
    b: Math.min(255, Math.max(r.b, 0)),
    a: t
  };
}
var it = "[-\\+]?\\d+%?", lt = "[-\\+]?\\d*\\.\\d+%?", w = "(?:".concat(lt, ")|(?:").concat(it, ")"), Y = "[\\s|\\(]+(".concat(w, ")[,|\\s]+(").concat(w, ")[,|\\s]+(").concat(w, ")\\s*\\)?"), Z = "[\\s|\\(]+(".concat(w, ")[,|\\s]+(").concat(w, ")[,|\\s]+(").concat(w, ")[,|\\s]+(").concat(w, ")\\s*\\)?"), g = {
  CSS_UNIT: new RegExp(w),
  rgb: new RegExp("rgb" + Y),
  rgba: new RegExp("rgba" + Z),
  hsl: new RegExp("hsl" + Y),
  hsla: new RegExp("hsla" + Z),
  hsv: new RegExp("hsv" + Y),
  hsva: new RegExp("hsva" + Z),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function ct(e) {
  if (e = e.trim().toLowerCase(), e.length === 0)
    return !1;
  var r = !1;
  if (pe[e])
    e = pe[e], r = !0;
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var t = g.rgb.exec(e);
  return t ? { r: t[1], g: t[2], b: t[3] } : (t = g.rgba.exec(e), t ? { r: t[1], g: t[2], b: t[3], a: t[4] } : (t = g.hsl.exec(e), t ? { h: t[1], s: t[2], l: t[3] } : (t = g.hsla.exec(e), t ? { h: t[1], s: t[2], l: t[3], a: t[4] } : (t = g.hsv.exec(e), t ? { h: t[1], s: t[2], v: t[3] } : (t = g.hsva.exec(e), t ? { h: t[1], s: t[2], v: t[3], a: t[4] } : (t = g.hex8.exec(e), t ? {
    r: d(t[1]),
    g: d(t[2]),
    b: d(t[3]),
    a: be(t[4]),
    format: r ? "name" : "hex8"
  } : (t = g.hex6.exec(e), t ? {
    r: d(t[1]),
    g: d(t[2]),
    b: d(t[3]),
    format: r ? "name" : "hex"
  } : (t = g.hex4.exec(e), t ? {
    r: d(t[1] + t[1]),
    g: d(t[2] + t[2]),
    b: d(t[3] + t[3]),
    a: be(t[4] + t[4]),
    format: r ? "name" : "hex8"
  } : (t = g.hex3.exec(e), t ? {
    r: d(t[1] + t[1]),
    g: d(t[2] + t[2]),
    b: d(t[3] + t[3]),
    format: r ? "name" : "hex"
  } : !1)))))))));
}
function p(e) {
  return !!g.CSS_UNIT.exec(String(e));
}
var z = 2, ve = 0.16, ut = 0.05, st = 0.05, ft = 0.15, Me = 5, Ee = 4, dt = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}];
function he(e) {
  var r = e.r, t = e.g, n = e.b, a = nt(r, t, n);
  return {
    h: a.h * 360,
    s: a.s,
    v: a.v
  };
}
function L(e) {
  var r = e.r, t = e.g, n = e.b;
  return "#".concat(ot(r, t, n, !1));
}
function mt(e, r, t) {
  var n = t / 100, a = {
    r: (r.r - e.r) * n + e.r,
    g: (r.g - e.g) * n + e.g,
    b: (r.b - e.b) * n + e.b
  };
  return a;
}
function ye(e, r, t) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = t ? Math.round(e.h) - z * r : Math.round(e.h) + z * r : n = t ? Math.round(e.h) + z * r : Math.round(e.h) - z * r, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function Ce(e, r, t) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return t ? n = e.s - ve * r : r === Ee ? n = e.s + ve : n = e.s + ut * r, n > 1 && (n = 1), t && r === Me && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Number(n.toFixed(2));
}
function we(e, r, t) {
  var n;
  return t ? n = e.v + st * r : n = e.v - ft * r, n > 1 && (n = 1), Number(n.toFixed(2));
}
function te(e) {
  for (var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = [], n = _(e), a = Me; a > 0; a -= 1) {
    var o = he(n), l = L(_({
      h: ye(o, a, !0),
      s: Ce(o, a, !0),
      v: we(o, a, !0)
    }));
    t.push(l);
  }
  t.push(L(n));
  for (var i = 1; i <= Ee; i += 1) {
    var u = he(n), f = L(_({
      h: ye(u, i),
      s: Ce(u, i),
      v: we(u, i)
    }));
    t.push(f);
  }
  return r.theme === "dark" ? dt.map(function(b) {
    var h = b.index, A = b.opacity, x = L(mt(_(r.backgroundColor || "#141414"), _(t[h]), A * 100));
    return x;
  }) : t;
}
var J = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1890FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
}, V = {}, X = {};
Object.keys(J).forEach(function(e) {
  V[e] = te(J[e]), V[e].primary = V[e][5], X[e] = te(J[e], {
    theme: "dark",
    backgroundColor: "#141414"
  }), X[e].primary = X[e][5];
});
var gt = V.blue, bt = Symbol("iconContext"), Ne = function() {
  return Qe(bt, {
    prefixCls: $("anticon"),
    rootClassName: $(""),
    csp: $()
  });
};
function ae() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function pt(e, r) {
  return e && e.contains ? e.contains(r) : !1;
}
var xe = "data-vc-order", vt = "vc-icon-key", re = /* @__PURE__ */ new Map();
function Re() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = e.mark;
  return r ? r.startsWith("data-") ? r : "data-".concat(r) : vt;
}
function oe(e) {
  if (e.attachTo)
    return e.attachTo;
  var r = document.querySelector("head");
  return r || document.body;
}
function ht(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function Be(e) {
  return Array.from((re.get(e) || e).children).filter(function(r) {
    return r.tagName === "STYLE";
  });
}
function ze(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!ae())
    return null;
  var t = r.csp, n = r.prepend, a = document.createElement("style");
  a.setAttribute(xe, ht(n)), t && t.nonce && (a.nonce = t.nonce), a.innerHTML = e;
  var o = oe(r), l = o.firstChild;
  if (n) {
    if (n === "queue") {
      var i = Be(o).filter(function(u) {
        return ["prepend", "prependQueue"].includes(u.getAttribute(xe));
      });
      if (i.length)
        return o.insertBefore(a, i[i.length - 1].nextSibling), a;
    }
    o.insertBefore(a, l);
  } else
    o.appendChild(a);
  return a;
}
function yt(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = oe(r);
  return Be(t).find(function(n) {
    return n.getAttribute(Re(r)) === e;
  });
}
function Ct(e, r) {
  var t = re.get(e);
  if (!t || !pt(document, t)) {
    var n = ze("", r), a = n.parentNode;
    re.set(e, a), e.removeChild(n);
  }
}
function wt(e, r) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = oe(t);
  Ct(n, t);
  var a = yt(r, t);
  if (a)
    return t.csp && t.csp.nonce && a.nonce !== t.csp.nonce && (a.nonce = t.csp.nonce), a.innerHTML !== e && (a.innerHTML = e), a;
  var o = ze(e, t);
  return o.setAttribute(Re(t), r), o;
}
function Se(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? Object(arguments[r]) : {}, n = Object.keys(t);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(t).filter(function(a) {
      return Object.getOwnPropertyDescriptor(t, a).enumerable;
    }))), n.forEach(function(a) {
      xt(e, a, t[a]);
    });
  }
  return e;
}
function xt(e, r, t) {
  return r in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function St(e, r) {
  process.env.NODE_ENV !== "production" && !e && console !== void 0 && console.error("Warning: ".concat(r));
}
function Tt(e, r) {
  St(e, "[@ant-design/icons-vue] ".concat(r));
}
function Te(e) {
  return typeof e == "object" && typeof e.name == "string" && typeof e.theme == "string" && (typeof e.icon == "object" || typeof e.icon == "function");
}
function ne(e, r, t) {
  return t ? me(e.tag, Se({
    key: r
  }, t, e.attrs), (e.children || []).map(function(n, a) {
    return ne(n, "".concat(r, "-").concat(e.tag, "-").concat(a));
  })) : me(e.tag, Se({
    key: r
  }, e.attrs), (e.children || []).map(function(n, a) {
    return ne(n, "".concat(r, "-").concat(e.tag, "-").concat(a));
  }));
}
function Le(e) {
  return te(e)[0];
}
function qe(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
var Ot = `
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;
function Ve(e) {
  return e && e.getRootNode && e.getRootNode();
}
function kt(e) {
  return ae() ? Ve(e) instanceof ShadowRoot : !1;
}
function Ft(e) {
  return kt(e) ? Ve(e) : null;
}
var At = function() {
  var r = Ne(), t = r.prefixCls, n = r.csp, a = Ye(), o = Ot;
  t && (o = o.replace(/anticon/g, t.value)), _e(function() {
    if (ae()) {
      var l = a.vnode.el, i = Ft(l);
      wt(o, "@ant-design-vue-icons", {
        prepend: !0,
        csp: n.value,
        attachTo: i
      });
    }
  });
}, jt = ["icon", "primaryColor", "secondaryColor"];
function _t(e, r) {
  if (e == null)
    return {};
  var t = It(e, r), n, a;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      n = o[a], !(r.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (t[n] = e[n]);
  }
  return t;
}
function It(e, r) {
  if (e == null)
    return {};
  var t = {}, n = Object.keys(e), a, o;
  for (o = 0; o < n.length; o++)
    a = n[o], !(r.indexOf(a) >= 0) && (t[a] = e[a]);
  return t;
}
function D(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? Object(arguments[r]) : {}, n = Object.keys(t);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(t).filter(function(a) {
      return Object.getOwnPropertyDescriptor(t, a).enumerable;
    }))), n.forEach(function(a) {
      $t(e, a, t[a]);
    });
  }
  return e;
}
function $t(e, r, t) {
  return r in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
var E = Ie({
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
});
function Pt(e) {
  var r = e.primaryColor, t = e.secondaryColor;
  E.primaryColor = r, E.secondaryColor = t || Le(r), E.calculated = !!t;
}
function Mt() {
  return D({}, E);
}
var k = function(r, t) {
  var n = D({}, r, t.attrs), a = n.icon, o = n.primaryColor, l = n.secondaryColor, i = _t(n, jt), u = E;
  if (o && (u = {
    primaryColor: o,
    secondaryColor: l || Le(o)
  }), Tt(Te(a), "icon should be icon definiton, but got ".concat(a)), !Te(a))
    return null;
  var f = a;
  return f && typeof f.icon == "function" && (f = D({}, f, {
    icon: f.icon(u.primaryColor, u.secondaryColor)
  })), ne(f.icon, "svg-".concat(f.name), D({}, i, {
    "data-icon": f.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }));
};
k.props = {
  icon: Object,
  primaryColor: String,
  secondaryColor: String,
  focusable: String
};
k.inheritAttrs = !1;
k.displayName = "IconBase";
k.getTwoToneColors = Mt;
k.setTwoToneColors = Pt;
const ie = k;
function Et(e, r) {
  return zt(e) || Bt(e, r) || Rt(e, r) || Nt();
}
function Nt() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Rt(e, r) {
  if (e) {
    if (typeof e == "string")
      return Oe(e, r);
    var t = Object.prototype.toString.call(e).slice(8, -1);
    if (t === "Object" && e.constructor && (t = e.constructor.name), t === "Map" || t === "Set")
      return Array.from(e);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return Oe(e, r);
  }
}
function Oe(e, r) {
  (r == null || r > e.length) && (r = e.length);
  for (var t = 0, n = new Array(r); t < r; t++)
    n[t] = e[t];
  return n;
}
function Bt(e, r) {
  var t = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (t != null) {
    var n = [], a = !0, o = !1, l, i;
    try {
      for (t = t.call(e); !(a = (l = t.next()).done) && (n.push(l.value), !(r && n.length === r)); a = !0)
        ;
    } catch (u) {
      o = !0, i = u;
    } finally {
      try {
        !a && t.return != null && t.return();
      } finally {
        if (o)
          throw i;
      }
    }
    return n;
  }
}
function zt(e) {
  if (Array.isArray(e))
    return e;
}
function De(e) {
  var r = qe(e), t = Et(r, 2), n = t[0], a = t[1];
  return ie.setTwoToneColors({
    primaryColor: n,
    secondaryColor: a
  });
}
function Lt() {
  var e = ie.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var qt = H({
  name: "InsertStyles",
  setup: function() {
    return At(), function() {
      return null;
    };
  }
}), Vt = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];
function Dt(e, r) {
  return Gt(e) || Ut(e, r) || Wt(e, r) || Ht();
}
function Ht() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Wt(e, r) {
  if (e) {
    if (typeof e == "string")
      return ke(e, r);
    var t = Object.prototype.toString.call(e).slice(8, -1);
    if (t === "Object" && e.constructor && (t = e.constructor.name), t === "Map" || t === "Set")
      return Array.from(e);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return ke(e, r);
  }
}
function ke(e, r) {
  (r == null || r > e.length) && (r = e.length);
  for (var t = 0, n = new Array(r); t < r; t++)
    n[t] = e[t];
  return n;
}
function Ut(e, r) {
  var t = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (t != null) {
    var n = [], a = !0, o = !1, l, i;
    try {
      for (t = t.call(e); !(a = (l = t.next()).done) && (n.push(l.value), !(r && n.length === r)); a = !0)
        ;
    } catch (u) {
      o = !0, i = u;
    } finally {
      try {
        !a && t.return != null && t.return();
      } finally {
        if (o)
          throw i;
      }
    }
    return n;
  }
}
function Gt(e) {
  if (Array.isArray(e))
    return e;
}
function Fe(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? Object(arguments[r]) : {}, n = Object.keys(t);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(t).filter(function(a) {
      return Object.getOwnPropertyDescriptor(t, a).enumerable;
    }))), n.forEach(function(a) {
      I(e, a, t[a]);
    });
  }
  return e;
}
function I(e, r, t) {
  return r in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function Qt(e, r) {
  if (e == null)
    return {};
  var t = Yt(e, r), n, a;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      n = o[a], !(r.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (t[n] = e[n]);
  }
  return t;
}
function Yt(e, r) {
  if (e == null)
    return {};
  var t = {}, n = Object.keys(e), a, o;
  for (o = 0; o < n.length; o++)
    a = n[o], !(r.indexOf(a) >= 0) && (t[a] = e[a]);
  return t;
}
De(gt.primary);
var F = function(r, t) {
  var n, a = Fe({}, r, t.attrs), o = a.class, l = a.icon, i = a.spin, u = a.rotate, f = a.tabindex, b = a.twoToneColor, h = a.onClick, A = Qt(a, Vt), x = Ne(), j = x.prefixCls, N = x.rootClassName, se = (n = {}, I(n, N.value, !!N.value), I(n, j.value, !0), I(n, "".concat(j.value, "-").concat(l.name), !!l.name), I(n, "".concat(j.value, "-spin"), !!i || l.name === "loading"), n), R = f;
  R === void 0 && h && (R = -1);
  var fe = u ? {
    msTransform: "rotate(".concat(u, "deg)"),
    transform: "rotate(".concat(u, "deg)")
  } : void 0, de = qe(b), W = Dt(de, 2), c = W[0], s = W[1];
  return v("span", Fe({
    role: "img",
    "aria-label": l.name
  }, A, {
    onClick: h,
    class: [se, o],
    tabindex: R
  }), [v(ie, {
    icon: l,
    primaryColor: c,
    secondaryColor: s,
    style: fe
  }, null), v(qt, null, null)]);
};
F.props = {
  spin: Boolean,
  rotate: Number,
  icon: Object,
  twoToneColor: [String, Array]
};
F.displayName = "AntdIcon";
F.inheritAttrs = !1;
F.getTwoToneColor = Lt;
F.setTwoToneColor = De;
const He = F;
var Zt = { icon: function(r, t) {
  return { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z", fill: r } }, { tag: "path", attrs: { d: "M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm193.4 225.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.3 0 19.9 5 25.9 13.3l71.2 98.8 157.2-218c6-8.4 15.7-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.4 12.7z", fill: t } }, { tag: "path", attrs: { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z", fill: r } }] };
}, name: "check-circle", theme: "twotone" };
const Jt = Zt;
function Ae(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? Object(arguments[r]) : {}, n = Object.keys(t);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(t).filter(function(a) {
      return Object.getOwnPropertyDescriptor(t, a).enumerable;
    }))), n.forEach(function(a) {
      Xt(e, a, t[a]);
    });
  }
  return e;
}
function Xt(e, r, t) {
  return r in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
var le = function(r, t) {
  var n = Ae({}, r, t.attrs);
  return v(He, Ae({}, n, {
    icon: Jt
  }), null);
};
le.displayName = "CheckCircleTwoTone";
le.inheritAttrs = !1;
const Kt = le;
var er = { icon: function(r, t) {
  return { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z", fill: r } }, { tag: "path", attrs: { d: "M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm171.8 527.1c1.2 1.5 1.9 3.3 1.9 5.2 0 4.5-3.6 8-8 8l-66-.3-99.3-118.4-99.3 118.5-66.1.3c-4.4 0-8-3.6-8-8 0-1.9.7-3.7 1.9-5.2L471 512.3l-130.1-155a8.32 8.32 0 01-1.9-5.2c0-4.5 3.6-8 8-8l66.1.3 99.3 118.4 99.4-118.5 66-.3c4.4 0 8 3.6 8 8 0 1.9-.6 3.8-1.8 5.2l-130.1 155 129.9 154.9z", fill: t } }, { tag: "path", attrs: { d: "M685.8 352c0-4.4-3.6-8-8-8l-66 .3-99.4 118.5-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155-130.1 154.9a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3 99.3-118.5L611.7 680l66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.9 512.2l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z", fill: r } }] };
}, name: "close-circle", theme: "twotone" };
const tr = er;
function je(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? Object(arguments[r]) : {}, n = Object.keys(t);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(t).filter(function(a) {
      return Object.getOwnPropertyDescriptor(t, a).enumerable;
    }))), n.forEach(function(a) {
      rr(e, a, t[a]);
    });
  }
  return e;
}
function rr(e, r, t) {
  return r in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
var ce = function(r, t) {
  var n = je({}, r, t.attrs);
  return v(He, je({}, n, {
    icon: tr
  }), null);
};
ce.displayName = "CloseCircleTwoTone";
ce.inheritAttrs = !1;
const nr = ce, ar = {
  key: 0,
  class: "update-form-list-label-active"
}, or = { key: 1 }, ir = /* @__PURE__ */ H({
  __name: "ItemString",
  props: {
    // 表单项记录
    record: {
      type: Object,
      required: !0
    },
    // 索引
    index: {
      type: Number,
      required: !0
    },
    // 表单数据模型
    modelFormList: {
      type: Object,
      required: !0
    },
    // 标签列配置
    labelCol: {
      type: Number,
      default: 6
    },
    // 包装列配置
    wrapperCol: {
      type: Number,
      default: 18
    },
    // 尺寸
    size: {
      type: String,
      default: "default"
    },
    // 是否显示冒号
    colon: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["update:modelFormList", "change"],
  setup(e, { emit: r }) {
    const t = e, n = r, a = (i) => {
      const u = { ...t.modelFormList };
      u[t.record.key] = i, n("update:modelFormList", u), n("change", t.record.key, i, t.index);
    }, o = (i) => i ? i.toLowerCase().includes("success") || i.toLowerCase().includes("成功") ? "success" : i.toLowerCase().includes("fail") || i.toLowerCase().includes("失败") ? "fail" : "" : "", l = (i) => {
      if (!i.maxlength)
        return;
      const u = parseInt(i.maxlength);
      return isNaN(u) ? void 0 : u;
    };
    return (i, u) => {
      const f = O("a-input"), b = O("a-form-item");
      return e.record.type === "string_new" ? (y(), P(b, {
        key: "string" + e.index,
        "label-col": { span: e.labelCol },
        name: e.record.key,
        "wrapper-col": { span: e.wrapperCol },
        class: "mb-0"
      }, {
        label: C(() => [
          e.record.active == !0 ? (y(), K("b", ar, "*")) : S("", !0),
          $e("span", {
            class: Pe(e.size === "large" ? "pt-5" : "")
          }, q(i.$t(e.record.label)), 3),
          e.colon ? (y(), K("span", or, ":")) : S("", !0)
        ]),
        help: C(() => [
          ee(q(e.record.help || ""), 1)
        ]),
        extra: C(() => [
          o(e.record.extra) == "success" ? (y(), P(ge(Kt), {
            key: 0,
            twoToneColor: "#bb133e"
          })) : S("", !0),
          o(e.record.extra) == "fail" ? (y(), P(ge(nr), {
            key: 1,
            twoToneColor: "#bb133e"
          })) : S("", !0),
          ee(" " + q(e.record.extra ? i.$t(e.record.extra) : ""), 1)
        ]),
        default: C(() => [
          v(f, {
            value: e.modelFormList[e.record.key],
            disabled: e.record.disabled,
            maxlength: l(e.record),
            placeholder: i.$t(e.record.message),
            prefix: e.record.prefix || "",
            size: e.size,
            suffix: e.record.suffix || "",
            "onUpdate:value": a,
            onChange: a
          }, null, 8, ["value", "disabled", "maxlength", "placeholder", "prefix", "size", "suffix"])
        ]),
        _: 1
      }, 8, ["label-col", "name", "wrapper-col"])) : S("", !0);
    };
  }
});
const ue = (e, r) => {
  const t = e.__vccOpts || e;
  for (const [n, a] of r)
    t[n] = a;
  return t;
}, lr = /* @__PURE__ */ ue(ir, [["__scopeId", "data-v-578fc4e7"]]), cr = { class: "custom-form-wrapper" }, ur = { class: "custom-form-actions" }, sr = /* @__PURE__ */ H({
  __name: "CustomForm",
  props: {
    loading: { type: Boolean, default: !1 },
    rules: {},
    model: {},
    buttonSize: { default: "middle" },
    showActions: { type: Boolean, default: !0 },
    modelValue: {},
    onSubmit: {},
    layout: { default: "horizontal" },
    showSubmitButton: { type: Boolean, default: !0 },
    submitText: { default: "提交" },
    className: {},
    labelCol: {},
    wrapperCol: {},
    colon: { type: Boolean },
    labelAlign: {},
    labelWrap: { type: Boolean },
    prefixCls: {},
    requiredMark: {},
    hideRequiredMark: { type: Boolean },
    validateMessages: {},
    validateOnRuleChange: { type: Boolean },
    scrollToFirstError: {},
    name: {},
    validateTrigger: {},
    size: {},
    disabled: { type: Boolean },
    onValuesChange: {},
    onFieldsChange: {},
    onFinish: {},
    onFinishFailed: {},
    onValidate: {}
  },
  emits: ["finish", "finishFailed", "validateField", "reset", "valuesChange"],
  setup(e, { expose: r, emit: t }) {
    const n = e, a = t, o = $(), l = Ie({}), i = $({});
    Ze(() => n.model, (c) => {
      c && Object.assign(i.value, c);
    }, { immediate: !0, deep: !0 });
    const u = (c, s) => {
      a("valuesChange", c, s), Object.assign(l, s);
    }, f = async (c) => {
      if (o.value)
        try {
          return await o.value.validateFields([c]), a("validateField", c, null), { success: !0, errors: null };
        } catch (s) {
          return a("validateField", c, s), { success: !1, errors: s };
        }
    }, b = async (c) => {
      if (!o.value)
        return { success: !1, errors: [] };
      try {
        return { success: !0, values: await o.value.validateFields(c), errors: null };
      } catch (s) {
        return { success: !1, values: null, errors: s };
      }
    }, h = M(() => n.layout === "vertical" ? { span: 24 } : { span: 6 }), A = M(() => n.layout === "vertical" ? { span: 24 } : { span: 14 }), x = M(() => n.layout === "vertical" ? { span: 24, offset: 0 } : { span: 14, offset: 6 }), j = (c) => {
      var s;
      a("finish", c), (s = n.onSubmit) == null || s.call(n, c), n.loading || U.success("提交成功");
    }, N = (c) => {
      a("finishFailed", c), n.loading || U.error("请检查表单填写是否正确");
    };
    return r({
      formRef: o,
      validate: () => {
        var c;
        return (c = o.value) == null ? void 0 : c.validate();
      },
      resetFields: () => {
        var c;
        (c = o.value) == null || c.resetFields(), a("reset", l), U.info("表单已重置");
      },
      clearValidate: (c) => {
        var s;
        (s = o.value) == null || s.clearValidate(c);
      },
      validateField: f,
      validateFields: b,
      submit: () => {
        var c;
        (c = o.value) == null || c.validateFields();
      },
      getFormInstance: () => o.value,
      scrollToField: (c) => {
        _e(() => {
          const s = document.querySelector(`[name="${c}"]`);
          s && s.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      },
      // 表单数据访问
      getValues: () => ({ ...l }),
      setValues: (c) => {
        Object.assign(l, c), Object.assign(i.value, c);
      }
    }), (c, s) => {
      const We = O("a-button"), Ue = O("a-form-item"), Ge = O("a-form");
      return y(), K("div", cr, [
        v(Ge, {
          model: l,
          layout: e.layout,
          "label-col": h.value,
          "wrapper-col": A.value,
          rules: e.rules,
          onFinish: j,
          onFinishFailed: N,
          onValuesChange: u,
          class: Pe(["custom-form", `custom-form-${e.layout}`, e.className]),
          ref_key: "formRef",
          ref: o,
          scrollToFirstError: !0
        }, {
          default: C(() => [
            T(c.$slots, "default", {}, void 0, !0),
            v(lr),
            e.showSubmitButton ? (y(), P(Ue, {
              key: 0,
              "wrapper-col": x.value
            }, {
              default: C(() => [
                $e("div", ur, [
                  T(c.$slots, "actions", {}, () => [
                    v(We, {
                      type: "primary",
                      "html-type": "submit",
                      loading: e.loading,
                      class: "custom-form-submit-btn",
                      size: e.buttonSize
                    }, {
                      default: C(() => [
                        ee(q(e.submitText), 1)
                      ]),
                      _: 1
                    }, 8, ["loading", "size"])
                  ], !0),
                  T(c.$slots, "actions-left", {}, void 0, !0),
                  T(c.$slots, "actions-right", {}, void 0, !0)
                ])
              ]),
              _: 3
            }, 8, ["wrapper-col"])) : S("", !0)
          ]),
          _: 3
        }, 8, ["model", "layout", "label-col", "wrapper-col", "rules", "class"]),
        T(c.$slots, "extra", {}, void 0, !0)
      ]);
    };
  }
});
const gr = /* @__PURE__ */ ue(sr, [["__scopeId", "data-v-6a8fdfbb"]]), fr = /* @__PURE__ */ H({
  __name: "FormItem",
  props: {
    // 标签
    label: {
      type: [String, Object],
      default: void 0
    },
    // 字段名
    name: {
      type: String,
      default: void 0
    },
    // 验证规则
    rules: {
      type: Array,
      default: () => []
    },
    // 是否必填
    required: {
      type: Boolean,
      default: !1
    },
    // 自定义样式类名
    className: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const r = e, t = M(() => {
      var a;
      return r.required && !((a = r.rules) != null && a.some((o) => o.required)) ? [{
        required: !0,
        message: typeof r.label == "string" ? `请输入${r.label}` : "此项为必填项"
      }, ...r.rules || []] : r.rules || [];
    }), n = M(() => r.required || t.value.some((a) => a.required));
    return (a, o) => {
      const l = O("a-form-item");
      return y(), P(l, Je({
        label: e.label,
        name: e.name,
        rules: t.value,
        required: n.value,
        class: e.className
      }, a.$attrs), {
        default: C(() => [
          T(a.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["label", "name", "rules", "required", "class"]);
    };
  }
});
const br = /* @__PURE__ */ ue(fr, [["__scopeId", "data-v-508d6646"]]), pr = "1.0.0";
export {
  gr as CustomForm,
  br as FormItem,
  pr as version
};
