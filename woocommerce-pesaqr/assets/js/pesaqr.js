/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = globalThis, Mt = _t.ShadowRoot && (_t.ShadyCSS === void 0 || _t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tt = Symbol(), Lt = /* @__PURE__ */ new WeakMap();
let Wt = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== Tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Mt && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = Lt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Lt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ae = (o) => new Wt(typeof o == "string" ? o : o + "", void 0, Tt), oe = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((n, i, _) => n + ((d) => {
    if (d._$cssResult$ === !0) return d.cssText;
    if (typeof d == "number") return d;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + d + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[_ + 1], o[0]);
  return new Wt(e, o, Tt);
}, he = (o, t) => {
  if (Mt) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), i = _t.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = e.cssText, o.appendChild(n);
  }
}, Ot = Mt ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return ae(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ue, defineProperty: fe, getOwnPropertyDescriptor: le, getOwnPropertyNames: ce, getOwnPropertySymbols: de, getPrototypeOf: ve } = Object, Z = globalThis, Rt = Z.trustedTypes, pe = Rt ? Rt.emptyScript : "", mt = Z.reactiveElementPolyfillSupport, ut = (o, t) => o, yt = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? pe : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, Bt = (o, t) => !ue(o, t), It = { attribute: !0, type: String, converter: yt, reflect: !1, useDefault: !1, hasChanged: Bt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Z.litPropertyMetadata ?? (Z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let st = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = It) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, e);
      i !== void 0 && fe(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: i, set: _ } = le(this.prototype, t) ?? { get() {
      return this[e];
    }, set(d) {
      this[e] = d;
    } };
    return { get: i, set(d) {
      const E = i == null ? void 0 : i.call(this);
      _ == null || _.call(this, d), this.requestUpdate(t, E, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? It;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ut("elementProperties"))) return;
    const t = ve(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ut("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ut("properties"))) {
      const e = this.properties, n = [...ce(e), ...de(e)];
      for (const i of n) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [n, i] of e) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const i = this._$Eu(e, n);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n) e.unshift(Ot(i));
    } else t !== void 0 && e.push(Ot(t));
    return e;
  }
  static _$Eu(t, e) {
    const n = e.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const n of e.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return he(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var n;
      return (n = e.hostConnected) == null ? void 0 : n.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var n;
      return (n = e.hostDisconnected) == null ? void 0 : n.call(e);
    });
  }
  attributeChangedCallback(t, e, n) {
    this._$AK(t, n);
  }
  _$ET(t, e) {
    var _;
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const d = (((_ = n.converter) == null ? void 0 : _.toAttribute) !== void 0 ? n.converter : yt).toAttribute(e, n.type);
      this._$Em = t, d == null ? this.removeAttribute(i) : this.setAttribute(i, d), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var _, d;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const E = n.getPropertyOptions(i), b = typeof E.converter == "function" ? { fromAttribute: E.converter } : ((_ = E.converter) == null ? void 0 : _.fromAttribute) !== void 0 ? E.converter : yt;
      this._$Em = i;
      const N = b.fromAttribute(e, E.type);
      this[i] = N ?? ((d = this._$Ej) == null ? void 0 : d.get(i)) ?? N, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, i = !1, _) {
    var d;
    if (t !== void 0) {
      const E = this.constructor;
      if (i === !1 && (_ = this[t]), n ?? (n = E.getPropertyOptions(t)), !((n.hasChanged ?? Bt)(_, e) || n.useDefault && n.reflect && _ === ((d = this._$Ej) == null ? void 0 : d.get(t)) && !this.hasAttribute(E._$Eu(t, n)))) return;
      this.C(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: n, reflect: i, wrapped: _ }, d) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, d ?? e ?? this[t]), _ !== !0 || d !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var n;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [_, d] of this._$Ep) this[_] = d;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [_, d] of i) {
        const { wrapped: E } = d, b = this[_];
        E !== !0 || this._$AL.has(_) || b === void 0 || this.C(_, void 0, d, b);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (n = this._$EO) == null || n.forEach((i) => {
        var _;
        return (_ = i.hostUpdate) == null ? void 0 : _.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((n) => {
      var i;
      return (i = n.hostUpdated) == null ? void 0 : i.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
st.elementStyles = [], st.shadowRootOptions = { mode: "open" }, st[ut("elementProperties")] = /* @__PURE__ */ new Map(), st[ut("finalized")] = /* @__PURE__ */ new Map(), mt == null || mt({ ReactiveElement: st }), (Z.reactiveElementVersions ?? (Z.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = globalThis, Ut = (o) => o, At = ft.trustedTypes, Ht = At ? At.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Vt = "$lit$", G = `lit$${Math.random().toFixed(9).slice(2)}$`, Jt = "?" + G, ge = `<${Jt}>`, et = document, ct = () => et.createComment(""), dt = (o) => o === null || typeof o != "object" && typeof o != "function", Pt = Array.isArray, _e = (o) => Pt(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", wt = `[ 	
\f\r]`, ht = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qt = /-->/g, jt = />/g, X = RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ft = /'/g, Kt = /"/g, Gt = /^(?:script|style|textarea|title)$/i, ye = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), Ae = ye(1), at = Symbol.for("lit-noChange"), I = Symbol.for("lit-nothing"), Qt = /* @__PURE__ */ new WeakMap(), z = et.createTreeWalker(et, 129);
function Zt(o, t) {
  if (!Pt(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ht !== void 0 ? Ht.createHTML(t) : t;
}
const $e = (o, t) => {
  const e = o.length - 1, n = [];
  let i, _ = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", d = ht;
  for (let E = 0; E < e; E++) {
    const b = o[E];
    let N, O, S = -1, F = 0;
    for (; F < b.length && (d.lastIndex = F, O = d.exec(b), O !== null); ) F = d.lastIndex, d === ht ? O[1] === "!--" ? d = qt : O[1] !== void 0 ? d = jt : O[2] !== void 0 ? (Gt.test(O[2]) && (i = RegExp("</" + O[2], "g")), d = X) : O[3] !== void 0 && (d = X) : d === X ? O[0] === ">" ? (d = i ?? ht, S = -1) : O[1] === void 0 ? S = -2 : (S = d.lastIndex - O[2].length, N = O[1], d = O[3] === void 0 ? X : O[3] === '"' ? Kt : Ft) : d === Kt || d === Ft ? d = X : d === qt || d === jt ? d = ht : (d = X, i = void 0);
    const Q = d === X && o[E + 1].startsWith("/>") ? " " : "";
    _ += d === ht ? b + ge : S >= 0 ? (n.push(N), b.slice(0, S) + Vt + b.slice(S) + G + Q) : b + G + (S === -2 ? E : Q);
  }
  return [Zt(o, _ + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class vt {
  constructor({ strings: t, _$litType$: e }, n) {
    let i;
    this.parts = [];
    let _ = 0, d = 0;
    const E = t.length - 1, b = this.parts, [N, O] = $e(t, e);
    if (this.el = vt.createElement(N, n), z.currentNode = this.el.content, e === 2 || e === 3) {
      const S = this.el.content.firstChild;
      S.replaceWith(...S.childNodes);
    }
    for (; (i = z.nextNode()) !== null && b.length < E; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const S of i.getAttributeNames()) if (S.endsWith(Vt)) {
          const F = O[d++], Q = i.getAttribute(S).split(G), rt = /([.?@])?(.*)/.exec(F);
          b.push({ type: 1, index: _, name: rt[2], strings: Q, ctor: rt[1] === "." ? me : rt[1] === "?" ? we : rt[1] === "@" ? xe : $t }), i.removeAttribute(S);
        } else S.startsWith(G) && (b.push({ type: 6, index: _ }), i.removeAttribute(S));
        if (Gt.test(i.tagName)) {
          const S = i.textContent.split(G), F = S.length - 1;
          if (F > 0) {
            i.textContent = At ? At.emptyScript : "";
            for (let Q = 0; Q < F; Q++) i.append(S[Q], ct()), z.nextNode(), b.push({ type: 2, index: ++_ });
            i.append(S[F], ct());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Jt) b.push({ type: 2, index: _ });
      else {
        let S = -1;
        for (; (S = i.data.indexOf(G, S + 1)) !== -1; ) b.push({ type: 7, index: _ }), S += G.length - 1;
      }
      _++;
    }
  }
  static createElement(t, e) {
    const n = et.createElement("template");
    return n.innerHTML = t, n;
  }
}
function ot(o, t, e = o, n) {
  var d, E;
  if (t === at) return t;
  let i = n !== void 0 ? (d = e._$Co) == null ? void 0 : d[n] : e._$Cl;
  const _ = dt(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== _ && ((E = i == null ? void 0 : i._$AO) == null || E.call(i, !1), _ === void 0 ? i = void 0 : (i = new _(o), i._$AT(o, e, n)), n !== void 0 ? (e._$Co ?? (e._$Co = []))[n] = i : e._$Cl = i), i !== void 0 && (t = ot(o, i._$AS(o, t.values), i, n)), t;
}
class be {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: n } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? et).importNode(e, !0);
    z.currentNode = i;
    let _ = z.nextNode(), d = 0, E = 0, b = n[0];
    for (; b !== void 0; ) {
      if (d === b.index) {
        let N;
        b.type === 2 ? N = new pt(_, _.nextSibling, this, t) : b.type === 1 ? N = new b.ctor(_, b.name, b.strings, this, t) : b.type === 6 && (N = new Ee(_, this, t)), this._$AV.push(N), b = n[++E];
      }
      d !== (b == null ? void 0 : b.index) && (_ = z.nextNode(), d++);
    }
    return z.currentNode = et, i;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class pt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, n, i) {
    this.type = 2, this._$AH = I, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = ot(this, t, e), dt(t) ? t === I || t == null || t === "" ? (this._$AH !== I && this._$AR(), this._$AH = I) : t !== this._$AH && t !== at && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : _e(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== I && dt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(et.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var _;
    const { values: e, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = vt.createElement(Zt(n.h, n.h[0]), this.options)), n);
    if (((_ = this._$AH) == null ? void 0 : _._$AD) === i) this._$AH.p(e);
    else {
      const d = new be(i, this), E = d.u(this.options);
      d.p(e), this.T(E), this._$AH = d;
    }
  }
  _$AC(t) {
    let e = Qt.get(t.strings);
    return e === void 0 && Qt.set(t.strings, e = new vt(t)), e;
  }
  k(t) {
    Pt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, i = 0;
    for (const _ of t) i === e.length ? e.push(n = new pt(this.O(ct()), this.O(ct()), this, this.options)) : n = e[i], n._$AI(_), i++;
    i < e.length && (this._$AR(n && n._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = Ut(t).nextSibling;
      Ut(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class $t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, i, _) {
    this.type = 1, this._$AH = I, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = _, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = I;
  }
  _$AI(t, e = this, n, i) {
    const _ = this.strings;
    let d = !1;
    if (_ === void 0) t = ot(this, t, e, 0), d = !dt(t) || t !== this._$AH && t !== at, d && (this._$AH = t);
    else {
      const E = t;
      let b, N;
      for (t = _[0], b = 0; b < _.length - 1; b++) N = ot(this, E[n + b], e, b), N === at && (N = this._$AH[b]), d || (d = !dt(N) || N !== this._$AH[b]), N === I ? t = I : t !== I && (t += (N ?? "") + _[b + 1]), this._$AH[b] = N;
    }
    d && !i && this.j(t);
  }
  j(t) {
    t === I ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class me extends $t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === I ? void 0 : t;
  }
}
class we extends $t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== I);
  }
}
class xe extends $t {
  constructor(t, e, n, i, _) {
    super(t, e, n, i, _), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = ot(this, t, e, 0) ?? I) === at) return;
    const n = this._$AH, i = t === I && n !== I || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, _ = t !== I && (n === I || i);
    i && this.element.removeEventListener(this.name, this, n), _ && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ee {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ot(this, t);
  }
}
const xt = ft.litHtmlPolyfillSupport;
xt == null || xt(vt, pt), (ft.litHtmlVersions ?? (ft.litHtmlVersions = [])).push("3.3.2");
const Ce = (o, t, e) => {
  const n = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const _ = (e == null ? void 0 : e.renderBefore) ?? null;
    n._$litPart$ = i = new pt(t.insertBefore(ct(), _), _, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis;
class lt extends st {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ce(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return at;
  }
}
var Yt;
lt._$litElement$ = !0, lt.finalized = !0, (Yt = tt.litElementHydrateSupport) == null || Yt.call(tt, { LitElement: lt });
const Et = tt.litElementPolyfillSupport;
Et == null || Et({ LitElement: lt });
(tt.litElementVersions ?? (tt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Me = (o) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(o, t);
  }) : customElements.define(o, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = { attribute: !0, type: String, converter: yt, reflect: !1, hasChanged: Bt }, Be = (o = Te, t, e) => {
  const { kind: n, metadata: i } = e;
  let _ = globalThis.litPropertyMetadata.get(i);
  if (_ === void 0 && globalThis.litPropertyMetadata.set(i, _ = /* @__PURE__ */ new Map()), n === "setter" && ((o = Object.create(o)).wrapped = !0), _.set(e.name, o), n === "accessor") {
    const { name: d } = e;
    return { set(E) {
      const b = t.get.call(this);
      t.set.call(this, E), this.requestUpdate(d, b, o, !0, E);
    }, init(E) {
      return E !== void 0 && this.C(d, void 0, o, E), E;
    } };
  }
  if (n === "setter") {
    const { name: d } = e;
    return function(E) {
      const b = this[d];
      t.call(this, E), this.requestUpdate(d, b, o, !0, E);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function W(o) {
  return (t, e) => typeof e == "object" ? Be(o, t, e) : ((n, i, _) => {
    const d = i.hasOwnProperty(_);
    return i.constructor.createProperty(_, n), d ? Object.getOwnPropertyDescriptor(i, _) : void 0;
  })(o, t, e);
}
function Pe(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var Xt = { exports: {} };
(function(o, t) {
  var e = function() {
    var n = function(w, x) {
      var p = 236, $ = 17, h = w, y = _[x], s = null, r = 0, A = null, v = [], g = {}, B = function(u, f) {
        r = h * 4 + 17, s = function(a) {
          for (var l = new Array(a), c = 0; c < a; c += 1) {
            l[c] = new Array(a);
            for (var m = 0; m < a; m += 1)
              l[c][m] = null;
          }
          return l;
        }(r), P(0, 0), P(r - 7, 0), P(0, r - 7), U(), L(), V(u, f), h >= 7 && Y(u), A == null && (A = ie(h, y, v)), J(A, f);
      }, P = function(u, f) {
        for (var a = -1; a <= 7; a += 1)
          if (!(u + a <= -1 || r <= u + a))
            for (var l = -1; l <= 7; l += 1)
              f + l <= -1 || r <= f + l || (0 <= a && a <= 6 && (l == 0 || l == 6) || 0 <= l && l <= 6 && (a == 0 || a == 6) || 2 <= a && a <= 4 && 2 <= l && l <= 4 ? s[u + a][f + l] = !0 : s[u + a][f + l] = !1);
      }, D = function() {
        for (var u = 0, f = 0, a = 0; a < 8; a += 1) {
          B(!0, a);
          var l = E.getLostPoint(g);
          (a == 0 || u > l) && (u = l, f = a);
        }
        return f;
      }, L = function() {
        for (var u = 8; u < r - 8; u += 1)
          s[u][6] == null && (s[u][6] = u % 2 == 0);
        for (var f = 8; f < r - 8; f += 1)
          s[6][f] == null && (s[6][f] = f % 2 == 0);
      }, U = function() {
        for (var u = E.getPatternPosition(h), f = 0; f < u.length; f += 1)
          for (var a = 0; a < u.length; a += 1) {
            var l = u[f], c = u[a];
            if (s[l][c] == null)
              for (var m = -2; m <= 2; m += 1)
                for (var M = -2; M <= 2; M += 1)
                  m == -2 || m == 2 || M == -2 || M == 2 || m == 0 && M == 0 ? s[l + m][c + M] = !0 : s[l + m][c + M] = !1;
          }
      }, Y = function(u) {
        for (var f = E.getBCHTypeNumber(h), a = 0; a < 18; a += 1) {
          var l = !u && (f >> a & 1) == 1;
          s[Math.floor(a / 3)][a % 3 + r - 8 - 3] = l;
        }
        for (var a = 0; a < 18; a += 1) {
          var l = !u && (f >> a & 1) == 1;
          s[a % 3 + r - 8 - 3][Math.floor(a / 3)] = l;
        }
      }, V = function(u, f) {
        for (var a = y << 3 | f, l = E.getBCHTypeInfo(a), c = 0; c < 15; c += 1) {
          var m = !u && (l >> c & 1) == 1;
          c < 6 ? s[c][8] = m : c < 8 ? s[c + 1][8] = m : s[r - 15 + c][8] = m;
        }
        for (var c = 0; c < 15; c += 1) {
          var m = !u && (l >> c & 1) == 1;
          c < 8 ? s[8][r - c - 1] = m : c < 9 ? s[8][15 - c - 1 + 1] = m : s[8][15 - c - 1] = m;
        }
        s[r - 8][8] = !u;
      }, J = function(u, f) {
        for (var a = -1, l = r - 1, c = 7, m = 0, M = E.getMaskFunction(f), C = r - 1; C > 0; C -= 2)
          for (C == 6 && (C -= 1); ; ) {
            for (var k = 0; k < 2; k += 1)
              if (s[l][C - k] == null) {
                var R = !1;
                m < u.length && (R = (u[m] >>> c & 1) == 1);
                var T = M(l, C - k);
                T && (R = !R), s[l][C - k] = R, c -= 1, c == -1 && (m += 1, c = 7);
              }
            if (l += a, l < 0 || r <= l) {
              l -= a, a = -a;
              break;
            }
          }
      }, nt = function(u, f) {
        for (var a = 0, l = 0, c = 0, m = new Array(f.length), M = new Array(f.length), C = 0; C < f.length; C += 1) {
          var k = f[C].dataCount, R = f[C].totalCount - k;
          l = Math.max(l, k), c = Math.max(c, R), m[C] = new Array(k);
          for (var T = 0; T < m[C].length; T += 1)
            m[C][T] = 255 & u.getBuffer()[T + a];
          a += k;
          var q = E.getErrorCorrectPolynomial(R), j = N(m[C], q.getLength() - 1), St = j.mod(q);
          M[C] = new Array(q.getLength() - 1);
          for (var T = 0; T < M[C].length; T += 1) {
            var Dt = T + St.getLength() - M[C].length;
            M[C][T] = Dt >= 0 ? St.getAt(Dt) : 0;
          }
        }
        for (var kt = 0, T = 0; T < f.length; T += 1)
          kt += f[T].totalCount;
        for (var bt = new Array(kt), gt = 0, T = 0; T < l; T += 1)
          for (var C = 0; C < f.length; C += 1)
            T < m[C].length && (bt[gt] = m[C][T], gt += 1);
        for (var T = 0; T < c; T += 1)
          for (var C = 0; C < f.length; C += 1)
            T < M[C].length && (bt[gt] = M[C][T], gt += 1);
        return bt;
      }, ie = function(u, f, a) {
        for (var l = O.getRSBlocks(u, f), c = S(), m = 0; m < a.length; m += 1) {
          var M = a[m];
          c.put(M.getMode(), 4), c.put(M.getLength(), E.getLengthInBits(M.getMode(), u)), M.write(c);
        }
        for (var C = 0, m = 0; m < l.length; m += 1)
          C += l[m].dataCount;
        if (c.getLengthInBits() > C * 8)
          throw "code length overflow. (" + c.getLengthInBits() + ">" + C * 8 + ")";
        for (c.getLengthInBits() + 4 <= C * 8 && c.put(0, 4); c.getLengthInBits() % 8 != 0; )
          c.putBit(!1);
        for (; !(c.getLengthInBits() >= C * 8 || (c.put(p, 8), c.getLengthInBits() >= C * 8)); )
          c.put($, 8);
        return nt(c, l);
      };
      g.addData = function(u, f) {
        f = f || "Byte";
        var a = null;
        switch (f) {
          case "Numeric":
            a = F(u);
            break;
          case "Alphanumeric":
            a = Q(u);
            break;
          case "Byte":
            a = rt(u);
            break;
          case "Kanji":
            a = zt(u);
            break;
          default:
            throw "mode:" + f;
        }
        v.push(a), A = null;
      }, g.isDark = function(u, f) {
        if (u < 0 || r <= u || f < 0 || r <= f)
          throw u + "," + f;
        return s[u][f];
      }, g.getModuleCount = function() {
        return r;
      }, g.make = function() {
        if (h < 1) {
          for (var u = 1; u < 40; u++) {
            for (var f = O.getRSBlocks(u, y), a = S(), l = 0; l < v.length; l++) {
              var c = v[l];
              a.put(c.getMode(), 4), a.put(c.getLength(), E.getLengthInBits(c.getMode(), u)), c.write(a);
            }
            for (var m = 0, l = 0; l < f.length; l++)
              m += f[l].dataCount;
            if (a.getLengthInBits() <= m * 8)
              break;
          }
          h = u;
        }
        B(!1, D());
      }, g.createTableTag = function(u, f) {
        u = u || 2, f = typeof f > "u" ? u * 4 : f;
        var a = "";
        a += '<table style="', a += " border-width: 0px; border-style: none;", a += " border-collapse: collapse;", a += " padding: 0px; margin: " + f + "px;", a += '">', a += "<tbody>";
        for (var l = 0; l < g.getModuleCount(); l += 1) {
          a += "<tr>";
          for (var c = 0; c < g.getModuleCount(); c += 1)
            a += '<td style="', a += " border-width: 0px; border-style: none;", a += " border-collapse: collapse;", a += " padding: 0px; margin: 0px;", a += " width: " + u + "px;", a += " height: " + u + "px;", a += " background-color: ", a += g.isDark(l, c) ? "#000000" : "#ffffff", a += ";", a += '"/>';
          a += "</tr>";
        }
        return a += "</tbody>", a += "</table>", a;
      }, g.createSvgTag = function(u, f, a, l) {
        var c = {};
        typeof arguments[0] == "object" && (c = arguments[0], u = c.cellSize, f = c.margin, a = c.alt, l = c.title), u = u || 2, f = typeof f > "u" ? u * 4 : f, a = typeof a == "string" ? { text: a } : a || {}, a.text = a.text || null, a.id = a.text ? a.id || "qrcode-description" : null, l = typeof l == "string" ? { text: l } : l || {}, l.text = l.text || null, l.id = l.text ? l.id || "qrcode-title" : null;
        var m = g.getModuleCount() * u + f * 2, M, C, k, R, T = "", q;
        for (q = "l" + u + ",0 0," + u + " -" + u + ",0 0,-" + u + "z ", T += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"', T += c.scalable ? "" : ' width="' + m + 'px" height="' + m + 'px"', T += ' viewBox="0 0 ' + m + " " + m + '" ', T += ' preserveAspectRatio="xMinYMin meet"', T += l.text || a.text ? ' role="img" aria-labelledby="' + it([l.id, a.id].join(" ").trim()) + '"' : "", T += ">", T += l.text ? '<title id="' + it(l.id) + '">' + it(l.text) + "</title>" : "", T += a.text ? '<description id="' + it(a.id) + '">' + it(a.text) + "</description>" : "", T += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>', T += '<path d="', k = 0; k < g.getModuleCount(); k += 1)
          for (R = k * u + f, M = 0; M < g.getModuleCount(); M += 1)
            g.isDark(k, M) && (C = M * u + f, T += "M" + C + "," + R + q);
        return T += '" stroke="transparent" fill="black"/>', T += "</svg>", T;
      }, g.createDataURL = function(u, f) {
        u = u || 2, f = typeof f > "u" ? u * 4 : f;
        var a = g.getModuleCount() * u + f * 2, l = f, c = a - f;
        return ne(a, a, function(m, M) {
          if (l <= m && m < c && l <= M && M < c) {
            var C = Math.floor((m - l) / u), k = Math.floor((M - l) / u);
            return g.isDark(k, C) ? 0 : 1;
          } else
            return 1;
        });
      }, g.createImgTag = function(u, f, a) {
        u = u || 2, f = typeof f > "u" ? u * 4 : f;
        var l = g.getModuleCount() * u + f * 2, c = "";
        return c += "<img", c += ' src="', c += g.createDataURL(u, f), c += '"', c += ' width="', c += l, c += '"', c += ' height="', c += l, c += '"', a && (c += ' alt="', c += it(a), c += '"'), c += "/>", c;
      };
      var it = function(u) {
        for (var f = "", a = 0; a < u.length; a += 1) {
          var l = u.charAt(a);
          switch (l) {
            case "<":
              f += "&lt;";
              break;
            case ">":
              f += "&gt;";
              break;
            case "&":
              f += "&amp;";
              break;
            case '"':
              f += "&quot;";
              break;
            default:
              f += l;
              break;
          }
        }
        return f;
      }, se = function(u) {
        var f = 1;
        u = typeof u > "u" ? f * 2 : u;
        var a = g.getModuleCount() * f + u * 2, l = u, c = a - u, m, M, C, k, R, T = {
          "██": "█",
          "█ ": "▀",
          " █": "▄",
          "  ": " "
        }, q = {
          "██": "▀",
          "█ ": "▀",
          " █": " ",
          "  ": " "
        }, j = "";
        for (m = 0; m < a; m += 2) {
          for (C = Math.floor((m - l) / f), k = Math.floor((m + 1 - l) / f), M = 0; M < a; M += 1)
            R = "█", l <= M && M < c && l <= m && m < c && g.isDark(C, Math.floor((M - l) / f)) && (R = " "), l <= M && M < c && l <= m + 1 && m + 1 < c && g.isDark(k, Math.floor((M - l) / f)) ? R += " " : R += "█", j += u < 1 && m + 1 >= c ? q[R] : T[R];
          j += `
`;
        }
        return a % 2 && u > 0 ? j.substring(0, j.length - a - 1) + Array(a + 1).join("▀") : j.substring(0, j.length - 1);
      };
      return g.createASCII = function(u, f) {
        if (u = u || 1, u < 2)
          return se(f);
        u -= 1, f = typeof f > "u" ? u * 2 : f;
        var a = g.getModuleCount() * u + f * 2, l = f, c = a - f, m, M, C, k, R = Array(u + 1).join("██"), T = Array(u + 1).join("  "), q = "", j = "";
        for (m = 0; m < a; m += 1) {
          for (C = Math.floor((m - l) / u), j = "", M = 0; M < a; M += 1)
            k = 1, l <= M && M < c && l <= m && m < c && g.isDark(C, Math.floor((M - l) / u)) && (k = 0), j += k ? R : T;
          for (C = 0; C < u; C += 1)
            q += j + `
`;
        }
        return q.substring(0, q.length - 1);
      }, g.renderTo2dContext = function(u, f) {
        f = f || 2;
        for (var a = g.getModuleCount(), l = 0; l < a; l++)
          for (var c = 0; c < a; c++)
            u.fillStyle = g.isDark(l, c) ? "black" : "white", u.fillRect(l * f, c * f, f, f);
      }, g;
    };
    n.stringToBytesFuncs = {
      default: function(w) {
        for (var x = [], p = 0; p < w.length; p += 1) {
          var $ = w.charCodeAt(p);
          x.push($ & 255);
        }
        return x;
      }
    }, n.stringToBytes = n.stringToBytesFuncs.default, n.createStringToBytes = function(w, x) {
      var p = function() {
        for (var h = ee(w), y = function() {
          var L = h.read();
          if (L == -1) throw "eof";
          return L;
        }, s = 0, r = {}; ; ) {
          var A = h.read();
          if (A == -1) break;
          var v = y(), g = y(), B = y(), P = String.fromCharCode(A << 8 | v), D = g << 8 | B;
          r[P] = D, s += 1;
        }
        if (s != x)
          throw s + " != " + x;
        return r;
      }(), $ = 63;
      return function(h) {
        for (var y = [], s = 0; s < h.length; s += 1) {
          var r = h.charCodeAt(s);
          if (r < 128)
            y.push(r);
          else {
            var A = p[h.charAt(s)];
            typeof A == "number" ? (A & 255) == A ? y.push(A) : (y.push(A >>> 8), y.push(A & 255)) : y.push($);
          }
        }
        return y;
      };
    };
    var i = {
      MODE_NUMBER: 1,
      MODE_ALPHA_NUM: 2,
      MODE_8BIT_BYTE: 4,
      MODE_KANJI: 8
    }, _ = {
      L: 1,
      M: 0,
      Q: 3,
      H: 2
    }, d = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    }, E = function() {
      var w = [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
      ], x = 1335, p = 7973, $ = 21522, h = {}, y = function(s) {
        for (var r = 0; s != 0; )
          r += 1, s >>>= 1;
        return r;
      };
      return h.getBCHTypeInfo = function(s) {
        for (var r = s << 10; y(r) - y(x) >= 0; )
          r ^= x << y(r) - y(x);
        return (s << 10 | r) ^ $;
      }, h.getBCHTypeNumber = function(s) {
        for (var r = s << 12; y(r) - y(p) >= 0; )
          r ^= p << y(r) - y(p);
        return s << 12 | r;
      }, h.getPatternPosition = function(s) {
        return w[s - 1];
      }, h.getMaskFunction = function(s) {
        switch (s) {
          case d.PATTERN000:
            return function(r, A) {
              return (r + A) % 2 == 0;
            };
          case d.PATTERN001:
            return function(r, A) {
              return r % 2 == 0;
            };
          case d.PATTERN010:
            return function(r, A) {
              return A % 3 == 0;
            };
          case d.PATTERN011:
            return function(r, A) {
              return (r + A) % 3 == 0;
            };
          case d.PATTERN100:
            return function(r, A) {
              return (Math.floor(r / 2) + Math.floor(A / 3)) % 2 == 0;
            };
          case d.PATTERN101:
            return function(r, A) {
              return r * A % 2 + r * A % 3 == 0;
            };
          case d.PATTERN110:
            return function(r, A) {
              return (r * A % 2 + r * A % 3) % 2 == 0;
            };
          case d.PATTERN111:
            return function(r, A) {
              return (r * A % 3 + (r + A) % 2) % 2 == 0;
            };
          default:
            throw "bad maskPattern:" + s;
        }
      }, h.getErrorCorrectPolynomial = function(s) {
        for (var r = N([1], 0), A = 0; A < s; A += 1)
          r = r.multiply(N([1, b.gexp(A)], 0));
        return r;
      }, h.getLengthInBits = function(s, r) {
        if (1 <= r && r < 10)
          switch (s) {
            case i.MODE_NUMBER:
              return 10;
            case i.MODE_ALPHA_NUM:
              return 9;
            case i.MODE_8BIT_BYTE:
              return 8;
            case i.MODE_KANJI:
              return 8;
            default:
              throw "mode:" + s;
          }
        else if (r < 27)
          switch (s) {
            case i.MODE_NUMBER:
              return 12;
            case i.MODE_ALPHA_NUM:
              return 11;
            case i.MODE_8BIT_BYTE:
              return 16;
            case i.MODE_KANJI:
              return 10;
            default:
              throw "mode:" + s;
          }
        else if (r < 41)
          switch (s) {
            case i.MODE_NUMBER:
              return 14;
            case i.MODE_ALPHA_NUM:
              return 13;
            case i.MODE_8BIT_BYTE:
              return 16;
            case i.MODE_KANJI:
              return 12;
            default:
              throw "mode:" + s;
          }
        else
          throw "type:" + r;
      }, h.getLostPoint = function(s) {
        for (var r = s.getModuleCount(), A = 0, v = 0; v < r; v += 1)
          for (var g = 0; g < r; g += 1) {
            for (var B = 0, P = s.isDark(v, g), D = -1; D <= 1; D += 1)
              if (!(v + D < 0 || r <= v + D))
                for (var L = -1; L <= 1; L += 1)
                  g + L < 0 || r <= g + L || D == 0 && L == 0 || P == s.isDark(v + D, g + L) && (B += 1);
            B > 5 && (A += 3 + B - 5);
          }
        for (var v = 0; v < r - 1; v += 1)
          for (var g = 0; g < r - 1; g += 1) {
            var U = 0;
            s.isDark(v, g) && (U += 1), s.isDark(v + 1, g) && (U += 1), s.isDark(v, g + 1) && (U += 1), s.isDark(v + 1, g + 1) && (U += 1), (U == 0 || U == 4) && (A += 3);
          }
        for (var v = 0; v < r; v += 1)
          for (var g = 0; g < r - 6; g += 1)
            s.isDark(v, g) && !s.isDark(v, g + 1) && s.isDark(v, g + 2) && s.isDark(v, g + 3) && s.isDark(v, g + 4) && !s.isDark(v, g + 5) && s.isDark(v, g + 6) && (A += 40);
        for (var g = 0; g < r; g += 1)
          for (var v = 0; v < r - 6; v += 1)
            s.isDark(v, g) && !s.isDark(v + 1, g) && s.isDark(v + 2, g) && s.isDark(v + 3, g) && s.isDark(v + 4, g) && !s.isDark(v + 5, g) && s.isDark(v + 6, g) && (A += 40);
        for (var Y = 0, g = 0; g < r; g += 1)
          for (var v = 0; v < r; v += 1)
            s.isDark(v, g) && (Y += 1);
        var V = Math.abs(100 * Y / r / r - 50) / 5;
        return A += V * 10, A;
      }, h;
    }(), b = function() {
      for (var w = new Array(256), x = new Array(256), p = 0; p < 8; p += 1)
        w[p] = 1 << p;
      for (var p = 8; p < 256; p += 1)
        w[p] = w[p - 4] ^ w[p - 5] ^ w[p - 6] ^ w[p - 8];
      for (var p = 0; p < 255; p += 1)
        x[w[p]] = p;
      var $ = {};
      return $.glog = function(h) {
        if (h < 1)
          throw "glog(" + h + ")";
        return x[h];
      }, $.gexp = function(h) {
        for (; h < 0; )
          h += 255;
        for (; h >= 256; )
          h -= 255;
        return w[h];
      }, $;
    }();
    function N(w, x) {
      if (typeof w.length > "u")
        throw w.length + "/" + x;
      var p = function() {
        for (var h = 0; h < w.length && w[h] == 0; )
          h += 1;
        for (var y = new Array(w.length - h + x), s = 0; s < w.length - h; s += 1)
          y[s] = w[s + h];
        return y;
      }(), $ = {};
      return $.getAt = function(h) {
        return p[h];
      }, $.getLength = function() {
        return p.length;
      }, $.multiply = function(h) {
        for (var y = new Array($.getLength() + h.getLength() - 1), s = 0; s < $.getLength(); s += 1)
          for (var r = 0; r < h.getLength(); r += 1)
            y[s + r] ^= b.gexp(b.glog($.getAt(s)) + b.glog(h.getAt(r)));
        return N(y, 0);
      }, $.mod = function(h) {
        if ($.getLength() - h.getLength() < 0)
          return $;
        for (var y = b.glog($.getAt(0)) - b.glog(h.getAt(0)), s = new Array($.getLength()), r = 0; r < $.getLength(); r += 1)
          s[r] = $.getAt(r);
        for (var r = 0; r < h.getLength(); r += 1)
          s[r] ^= b.gexp(b.glog(h.getAt(r)) + y);
        return N(s, 0).mod(h);
      }, $;
    }
    var O = function() {
      var w = [
        // L
        // M
        // Q
        // H
        // 1
        [1, 26, 19],
        [1, 26, 16],
        [1, 26, 13],
        [1, 26, 9],
        // 2
        [1, 44, 34],
        [1, 44, 28],
        [1, 44, 22],
        [1, 44, 16],
        // 3
        [1, 70, 55],
        [1, 70, 44],
        [2, 35, 17],
        [2, 35, 13],
        // 4
        [1, 100, 80],
        [2, 50, 32],
        [2, 50, 24],
        [4, 25, 9],
        // 5
        [1, 134, 108],
        [2, 67, 43],
        [2, 33, 15, 2, 34, 16],
        [2, 33, 11, 2, 34, 12],
        // 6
        [2, 86, 68],
        [4, 43, 27],
        [4, 43, 19],
        [4, 43, 15],
        // 7
        [2, 98, 78],
        [4, 49, 31],
        [2, 32, 14, 4, 33, 15],
        [4, 39, 13, 1, 40, 14],
        // 8
        [2, 121, 97],
        [2, 60, 38, 2, 61, 39],
        [4, 40, 18, 2, 41, 19],
        [4, 40, 14, 2, 41, 15],
        // 9
        [2, 146, 116],
        [3, 58, 36, 2, 59, 37],
        [4, 36, 16, 4, 37, 17],
        [4, 36, 12, 4, 37, 13],
        // 10
        [2, 86, 68, 2, 87, 69],
        [4, 69, 43, 1, 70, 44],
        [6, 43, 19, 2, 44, 20],
        [6, 43, 15, 2, 44, 16],
        // 11
        [4, 101, 81],
        [1, 80, 50, 4, 81, 51],
        [4, 50, 22, 4, 51, 23],
        [3, 36, 12, 8, 37, 13],
        // 12
        [2, 116, 92, 2, 117, 93],
        [6, 58, 36, 2, 59, 37],
        [4, 46, 20, 6, 47, 21],
        [7, 42, 14, 4, 43, 15],
        // 13
        [4, 133, 107],
        [8, 59, 37, 1, 60, 38],
        [8, 44, 20, 4, 45, 21],
        [12, 33, 11, 4, 34, 12],
        // 14
        [3, 145, 115, 1, 146, 116],
        [4, 64, 40, 5, 65, 41],
        [11, 36, 16, 5, 37, 17],
        [11, 36, 12, 5, 37, 13],
        // 15
        [5, 109, 87, 1, 110, 88],
        [5, 65, 41, 5, 66, 42],
        [5, 54, 24, 7, 55, 25],
        [11, 36, 12, 7, 37, 13],
        // 16
        [5, 122, 98, 1, 123, 99],
        [7, 73, 45, 3, 74, 46],
        [15, 43, 19, 2, 44, 20],
        [3, 45, 15, 13, 46, 16],
        // 17
        [1, 135, 107, 5, 136, 108],
        [10, 74, 46, 1, 75, 47],
        [1, 50, 22, 15, 51, 23],
        [2, 42, 14, 17, 43, 15],
        // 18
        [5, 150, 120, 1, 151, 121],
        [9, 69, 43, 4, 70, 44],
        [17, 50, 22, 1, 51, 23],
        [2, 42, 14, 19, 43, 15],
        // 19
        [3, 141, 113, 4, 142, 114],
        [3, 70, 44, 11, 71, 45],
        [17, 47, 21, 4, 48, 22],
        [9, 39, 13, 16, 40, 14],
        // 20
        [3, 135, 107, 5, 136, 108],
        [3, 67, 41, 13, 68, 42],
        [15, 54, 24, 5, 55, 25],
        [15, 43, 15, 10, 44, 16],
        // 21
        [4, 144, 116, 4, 145, 117],
        [17, 68, 42],
        [17, 50, 22, 6, 51, 23],
        [19, 46, 16, 6, 47, 17],
        // 22
        [2, 139, 111, 7, 140, 112],
        [17, 74, 46],
        [7, 54, 24, 16, 55, 25],
        [34, 37, 13],
        // 23
        [4, 151, 121, 5, 152, 122],
        [4, 75, 47, 14, 76, 48],
        [11, 54, 24, 14, 55, 25],
        [16, 45, 15, 14, 46, 16],
        // 24
        [6, 147, 117, 4, 148, 118],
        [6, 73, 45, 14, 74, 46],
        [11, 54, 24, 16, 55, 25],
        [30, 46, 16, 2, 47, 17],
        // 25
        [8, 132, 106, 4, 133, 107],
        [8, 75, 47, 13, 76, 48],
        [7, 54, 24, 22, 55, 25],
        [22, 45, 15, 13, 46, 16],
        // 26
        [10, 142, 114, 2, 143, 115],
        [19, 74, 46, 4, 75, 47],
        [28, 50, 22, 6, 51, 23],
        [33, 46, 16, 4, 47, 17],
        // 27
        [8, 152, 122, 4, 153, 123],
        [22, 73, 45, 3, 74, 46],
        [8, 53, 23, 26, 54, 24],
        [12, 45, 15, 28, 46, 16],
        // 28
        [3, 147, 117, 10, 148, 118],
        [3, 73, 45, 23, 74, 46],
        [4, 54, 24, 31, 55, 25],
        [11, 45, 15, 31, 46, 16],
        // 29
        [7, 146, 116, 7, 147, 117],
        [21, 73, 45, 7, 74, 46],
        [1, 53, 23, 37, 54, 24],
        [19, 45, 15, 26, 46, 16],
        // 30
        [5, 145, 115, 10, 146, 116],
        [19, 75, 47, 10, 76, 48],
        [15, 54, 24, 25, 55, 25],
        [23, 45, 15, 25, 46, 16],
        // 31
        [13, 145, 115, 3, 146, 116],
        [2, 74, 46, 29, 75, 47],
        [42, 54, 24, 1, 55, 25],
        [23, 45, 15, 28, 46, 16],
        // 32
        [17, 145, 115],
        [10, 74, 46, 23, 75, 47],
        [10, 54, 24, 35, 55, 25],
        [19, 45, 15, 35, 46, 16],
        // 33
        [17, 145, 115, 1, 146, 116],
        [14, 74, 46, 21, 75, 47],
        [29, 54, 24, 19, 55, 25],
        [11, 45, 15, 46, 46, 16],
        // 34
        [13, 145, 115, 6, 146, 116],
        [14, 74, 46, 23, 75, 47],
        [44, 54, 24, 7, 55, 25],
        [59, 46, 16, 1, 47, 17],
        // 35
        [12, 151, 121, 7, 152, 122],
        [12, 75, 47, 26, 76, 48],
        [39, 54, 24, 14, 55, 25],
        [22, 45, 15, 41, 46, 16],
        // 36
        [6, 151, 121, 14, 152, 122],
        [6, 75, 47, 34, 76, 48],
        [46, 54, 24, 10, 55, 25],
        [2, 45, 15, 64, 46, 16],
        // 37
        [17, 152, 122, 4, 153, 123],
        [29, 74, 46, 14, 75, 47],
        [49, 54, 24, 10, 55, 25],
        [24, 45, 15, 46, 46, 16],
        // 38
        [4, 152, 122, 18, 153, 123],
        [13, 74, 46, 32, 75, 47],
        [48, 54, 24, 14, 55, 25],
        [42, 45, 15, 32, 46, 16],
        // 39
        [20, 147, 117, 4, 148, 118],
        [40, 75, 47, 7, 76, 48],
        [43, 54, 24, 22, 55, 25],
        [10, 45, 15, 67, 46, 16],
        // 40
        [19, 148, 118, 6, 149, 119],
        [18, 75, 47, 31, 76, 48],
        [34, 54, 24, 34, 55, 25],
        [20, 45, 15, 61, 46, 16]
      ], x = function(h, y) {
        var s = {};
        return s.totalCount = h, s.dataCount = y, s;
      }, p = {}, $ = function(h, y) {
        switch (y) {
          case _.L:
            return w[(h - 1) * 4 + 0];
          case _.M:
            return w[(h - 1) * 4 + 1];
          case _.Q:
            return w[(h - 1) * 4 + 2];
          case _.H:
            return w[(h - 1) * 4 + 3];
          default:
            return;
        }
      };
      return p.getRSBlocks = function(h, y) {
        var s = $(h, y);
        if (typeof s > "u")
          throw "bad rs block @ typeNumber:" + h + "/errorCorrectionLevel:" + y;
        for (var r = s.length / 3, A = [], v = 0; v < r; v += 1)
          for (var g = s[v * 3 + 0], B = s[v * 3 + 1], P = s[v * 3 + 2], D = 0; D < g; D += 1)
            A.push(x(B, P));
        return A;
      }, p;
    }(), S = function() {
      var w = [], x = 0, p = {};
      return p.getBuffer = function() {
        return w;
      }, p.getAt = function($) {
        var h = Math.floor($ / 8);
        return (w[h] >>> 7 - $ % 8 & 1) == 1;
      }, p.put = function($, h) {
        for (var y = 0; y < h; y += 1)
          p.putBit(($ >>> h - y - 1 & 1) == 1);
      }, p.getLengthInBits = function() {
        return x;
      }, p.putBit = function($) {
        var h = Math.floor(x / 8);
        w.length <= h && w.push(0), $ && (w[h] |= 128 >>> x % 8), x += 1;
      }, p;
    }, F = function(w) {
      var x = i.MODE_NUMBER, p = w, $ = {};
      $.getMode = function() {
        return x;
      }, $.getLength = function(s) {
        return p.length;
      }, $.write = function(s) {
        for (var r = p, A = 0; A + 2 < r.length; )
          s.put(h(r.substring(A, A + 3)), 10), A += 3;
        A < r.length && (r.length - A == 1 ? s.put(h(r.substring(A, A + 1)), 4) : r.length - A == 2 && s.put(h(r.substring(A, A + 2)), 7));
      };
      var h = function(s) {
        for (var r = 0, A = 0; A < s.length; A += 1)
          r = r * 10 + y(s.charAt(A));
        return r;
      }, y = function(s) {
        if ("0" <= s && s <= "9")
          return s.charCodeAt(0) - 48;
        throw "illegal char :" + s;
      };
      return $;
    }, Q = function(w) {
      var x = i.MODE_ALPHA_NUM, p = w, $ = {};
      $.getMode = function() {
        return x;
      }, $.getLength = function(y) {
        return p.length;
      }, $.write = function(y) {
        for (var s = p, r = 0; r + 1 < s.length; )
          y.put(
            h(s.charAt(r)) * 45 + h(s.charAt(r + 1)),
            11
          ), r += 2;
        r < s.length && y.put(h(s.charAt(r)), 6);
      };
      var h = function(y) {
        if ("0" <= y && y <= "9")
          return y.charCodeAt(0) - 48;
        if ("A" <= y && y <= "Z")
          return y.charCodeAt(0) - 65 + 10;
        switch (y) {
          case " ":
            return 36;
          case "$":
            return 37;
          case "%":
            return 38;
          case "*":
            return 39;
          case "+":
            return 40;
          case "-":
            return 41;
          case ".":
            return 42;
          case "/":
            return 43;
          case ":":
            return 44;
          default:
            throw "illegal char :" + y;
        }
      };
      return $;
    }, rt = function(w) {
      var x = i.MODE_8BIT_BYTE, p = n.stringToBytes(w), $ = {};
      return $.getMode = function() {
        return x;
      }, $.getLength = function(h) {
        return p.length;
      }, $.write = function(h) {
        for (var y = 0; y < p.length; y += 1)
          h.put(p[y], 8);
      }, $;
    }, zt = function(w) {
      var x = i.MODE_KANJI, p = n.stringToBytesFuncs.SJIS;
      if (!p)
        throw "sjis not supported.";
      (function(y, s) {
        var r = p(y);
        if (r.length != 2 || (r[0] << 8 | r[1]) != s)
          throw "sjis not supported.";
      })("友", 38726);
      var $ = p(w), h = {};
      return h.getMode = function() {
        return x;
      }, h.getLength = function(y) {
        return ~~($.length / 2);
      }, h.write = function(y) {
        for (var s = $, r = 0; r + 1 < s.length; ) {
          var A = (255 & s[r]) << 8 | 255 & s[r + 1];
          if (33088 <= A && A <= 40956)
            A -= 33088;
          else if (57408 <= A && A <= 60351)
            A -= 49472;
          else
            throw "illegal char at " + (r + 1) + "/" + A;
          A = (A >>> 8 & 255) * 192 + (A & 255), y.put(A, 13), r += 2;
        }
        if (r < s.length)
          throw "illegal char at " + (r + 1);
      }, h;
    }, Nt = function() {
      var w = [], x = {};
      return x.writeByte = function(p) {
        w.push(p & 255);
      }, x.writeShort = function(p) {
        x.writeByte(p), x.writeByte(p >>> 8);
      }, x.writeBytes = function(p, $, h) {
        $ = $ || 0, h = h || p.length;
        for (var y = 0; y < h; y += 1)
          x.writeByte(p[y + $]);
      }, x.writeString = function(p) {
        for (var $ = 0; $ < p.length; $ += 1)
          x.writeByte(p.charCodeAt($));
      }, x.toByteArray = function() {
        return w;
      }, x.toString = function() {
        var p = "";
        p += "[";
        for (var $ = 0; $ < w.length; $ += 1)
          $ > 0 && (p += ","), p += w[$];
        return p += "]", p;
      }, x;
    }, te = function() {
      var w = 0, x = 0, p = 0, $ = "", h = {}, y = function(r) {
        $ += String.fromCharCode(s(r & 63));
      }, s = function(r) {
        if (!(r < 0)) {
          if (r < 26)
            return 65 + r;
          if (r < 52)
            return 97 + (r - 26);
          if (r < 62)
            return 48 + (r - 52);
          if (r == 62)
            return 43;
          if (r == 63)
            return 47;
        }
        throw "n:" + r;
      };
      return h.writeByte = function(r) {
        for (w = w << 8 | r & 255, x += 8, p += 1; x >= 6; )
          y(w >>> x - 6), x -= 6;
      }, h.flush = function() {
        if (x > 0 && (y(w << 6 - x), w = 0, x = 0), p % 3 != 0)
          for (var r = 3 - p % 3, A = 0; A < r; A += 1)
            $ += "=";
      }, h.toString = function() {
        return $;
      }, h;
    }, ee = function(w) {
      var x = w, p = 0, $ = 0, h = 0, y = {};
      y.read = function() {
        for (; h < 8; ) {
          if (p >= x.length) {
            if (h == 0)
              return -1;
            throw "unexpected end of file./" + h;
          }
          var r = x.charAt(p);
          if (p += 1, r == "=")
            return h = 0, -1;
          if (r.match(/^\s$/))
            continue;
          $ = $ << 6 | s(r.charCodeAt(0)), h += 6;
        }
        var A = $ >>> h - 8 & 255;
        return h -= 8, A;
      };
      var s = function(r) {
        if (65 <= r && r <= 90)
          return r - 65;
        if (97 <= r && r <= 122)
          return r - 97 + 26;
        if (48 <= r && r <= 57)
          return r - 48 + 52;
        if (r == 43)
          return 62;
        if (r == 47)
          return 63;
        throw "c:" + r;
      };
      return y;
    }, re = function(w, x) {
      var p = w, $ = x, h = new Array(w * x), y = {};
      y.setPixel = function(v, g, B) {
        h[g * p + v] = B;
      }, y.write = function(v) {
        v.writeString("GIF87a"), v.writeShort(p), v.writeShort($), v.writeByte(128), v.writeByte(0), v.writeByte(0), v.writeByte(0), v.writeByte(0), v.writeByte(0), v.writeByte(255), v.writeByte(255), v.writeByte(255), v.writeString(","), v.writeShort(0), v.writeShort(0), v.writeShort(p), v.writeShort($), v.writeByte(0);
        var g = 2, B = r(g);
        v.writeByte(g);
        for (var P = 0; B.length - P > 255; )
          v.writeByte(255), v.writeBytes(B, P, 255), P += 255;
        v.writeByte(B.length - P), v.writeBytes(B, P, B.length - P), v.writeByte(0), v.writeString(";");
      };
      var s = function(v) {
        var g = v, B = 0, P = 0, D = {};
        return D.write = function(L, U) {
          if (L >>> U)
            throw "length over";
          for (; B + U >= 8; )
            g.writeByte(255 & (L << B | P)), U -= 8 - B, L >>>= 8 - B, P = 0, B = 0;
          P = L << B | P, B = B + U;
        }, D.flush = function() {
          B > 0 && g.writeByte(P);
        }, D;
      }, r = function(v) {
        for (var g = 1 << v, B = (1 << v) + 1, P = v + 1, D = A(), L = 0; L < g; L += 1)
          D.add(String.fromCharCode(L));
        D.add(String.fromCharCode(g)), D.add(String.fromCharCode(B));
        var U = Nt(), Y = s(U);
        Y.write(g, P);
        var V = 0, J = String.fromCharCode(h[V]);
        for (V += 1; V < h.length; ) {
          var nt = String.fromCharCode(h[V]);
          V += 1, D.contains(J + nt) ? J = J + nt : (Y.write(D.indexOf(J), P), D.size() < 4095 && (D.size() == 1 << P && (P += 1), D.add(J + nt)), J = nt);
        }
        return Y.write(D.indexOf(J), P), Y.write(B, P), Y.flush(), U.toByteArray();
      }, A = function() {
        var v = {}, g = 0, B = {};
        return B.add = function(P) {
          if (B.contains(P))
            throw "dup key:" + P;
          v[P] = g, g += 1;
        }, B.size = function() {
          return g;
        }, B.indexOf = function(P) {
          return v[P];
        }, B.contains = function(P) {
          return typeof v[P] < "u";
        }, B;
      };
      return y;
    }, ne = function(w, x, p) {
      for (var $ = re(w, x), h = 0; h < x; h += 1)
        for (var y = 0; y < w; y += 1)
          $.setPixel(y, h, p(y, h));
      var s = Nt();
      $.write(s);
      for (var r = te(), A = s.toByteArray(), v = 0; v < A.length; v += 1)
        r.writeByte(A[v]);
      return r.flush(), "data:image/gif;base64," + r;
    };
    return n;
  }();
  (function() {
    e.stringToBytesFuncs["UTF-8"] = function(n) {
      function i(_) {
        for (var d = [], E = 0; E < _.length; E++) {
          var b = _.charCodeAt(E);
          b < 128 ? d.push(b) : b < 2048 ? d.push(
            192 | b >> 6,
            128 | b & 63
          ) : b < 55296 || b >= 57344 ? d.push(
            224 | b >> 12,
            128 | b >> 6 & 63,
            128 | b & 63
          ) : (E++, b = 65536 + ((b & 1023) << 10 | _.charCodeAt(E) & 1023), d.push(
            240 | b >> 18,
            128 | b >> 12 & 63,
            128 | b >> 6 & 63,
            128 | b & 63
          ));
        }
        return d;
      }
      return i(n);
    };
  })(), function(n) {
    o.exports = n();
  }(function() {
    return e;
  });
})(Xt);
var Ne = Xt.exports;
const Se = /* @__PURE__ */ Pe(Ne);
var De = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, K = (o, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? ke(t, e) : t, _ = o.length - 1, d; _ >= 0; _--)
    (d = o[_]) && (i = (n ? d(t, e, i) : d(i)) || i);
  return n && i && De(t, e, i), i;
};
const Ct = {
  TILL_NUMBER: "till",
  PAYBILL: "paybill",
  SEND_MONEY: "phone"
};
let H = class extends lt {
  constructor() {
    super(), this.type = "till", this.tillNumber = "", this.paybillNumber = "", this.accountNumber = "", this.phoneNumber = "", this.amount = "", this.width = null, this.theme = "light", this.loading = !1, this.error = null, this.type = "till", this.tillNumber = "", this.paybillNumber = "", this.accountNumber = "", this.phoneNumber = "", this.amount = "", this.width = null;
  }
  render() {
    return Ae`
      <div class="pesaqr">
        <div class="qr-header">SCAN WITH M-PESA</div>
        <div id="qrcode"></div>
      </div>
    `;
  }
  updated(o) {
    (o.has("type") || o.has("tillNumber") || o.has("paybillNumber") || o.has("accountNumber") || o.has("phoneNumber") || o.has("amount")) && this.generateQRCode(), o.has("width") && this.width && this.style.setProperty("--qr-width", `${this.width}px`);
  }
  generateQRCode() {
    var t;
    let o = "";
    switch (this.type) {
      case Ct.TILL_NUMBER:
        this.tillNumber && (o = `BG|${this.tillNumber}|${this.amount}`);
        break;
      case Ct.PAYBILL:
        this.paybillNumber && this.accountNumber && (o = `PB|${this.paybillNumber}|${this.amount}|${this.accountNumber}`);
        break;
      case Ct.SEND_MONEY:
        this.phoneNumber && (o = `SM|${this.phoneNumber}|${this.amount}`);
        break;
      default:
        console.error("Invalid transaction type");
        return;
    }
    if (o) {
      const e = Se(0, "L");
      e.addData(o), e.make();
      const n = (t = this.shadowRoot) == null ? void 0 : t.getElementById("qrcode");
      n && (n.innerHTML = e.createImgTag(20));
    }
  }
};
H.styles = oe`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --qr-size: calc(var(--qr-width, 600px) * 0.35);
      --header-padding: calc(var(--qr-size) * 0.025);
      --border-radius: calc(var(--qr-size) * 0.05);
      --font-size: calc(var(--qr-size) * 0.05);

      /* Theme Variables */
      --qr-primary-color: var(--pesaqr-primary-color, #16a34a);
      --qr-background: var(--pesaqr-background, white);
      --qr-text-color: var(--pesaqr-text-color, white);
      --qr-border-color: var(--pesaqr-border-color, #16a34a);
    }

    /* Dark theme */
    :host([theme="dark"]) {
      --qr-primary-color: var(--pesaqr-primary-color, #22c55e);
      --qr-background: var(--pesaqr-background, #1f2937);
      --qr-text-color: var(--pesaqr-text-color, #f3f4f6);
      --qr-border-color: var(--pesaqr-border-color, #22c55e);
    }

    .pesaqr {
      position: relative;
      border: calc(var(--qr-size) * 0.02) solid var(--qr-border-color);
      border-radius: var(--border-radius);
      overflow: visible;
      width: fit-content;
      background: var(--qr-background);
      margin-top: calc(var(--header-padding) * 2);
    }

    .qr-header {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--qr-primary-color);
      color: var(--qr-text-color);
      padding: var(--header-padding) calc(var(--header-padding) * 2);
      text-align: center;
      user-select: none;
      font-weight: bold;
      border-radius: calc(var(--border-radius) * 0.35);
      font-size: var(--font-size);
      white-space: nowrap;
      border: calc(var(--qr-size) * 0.02) solid var(--qr-border-color);
    }

    #qrcode {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #qrcode img {
      width: var(--qr-size) !important;
      height: var(--qr-size) !important;
      border-radius: calc(var(--border-radius) * 0.75);
    }
  `;
K([
  W({ type: String })
], H.prototype, "type", 2);
K([
  W({ type: String })
], H.prototype, "tillNumber", 2);
K([
  W({ type: String })
], H.prototype, "paybillNumber", 2);
K([
  W({ type: String })
], H.prototype, "accountNumber", 2);
K([
  W({ type: String })
], H.prototype, "phoneNumber", 2);
K([
  W({ type: String })
], H.prototype, "amount", 2);
K([
  W({ type: Number })
], H.prototype, "width", 2);
K([
  W({ type: String })
], H.prototype, "theme", 2);
K([
  W({ type: Boolean })
], H.prototype, "loading", 2);
K([
  W({ type: String })
], H.prototype, "error", 2);
H = K([
  Me("pesa-qr")
], H);
export {
  H as PesaQR
};
