import { defineComponent as p, ref as w, reactive as x, computed as s, resolveComponent as i, openBlock as m, createBlock as f, normalizeClass as S, withCtx as u, renderSlot as _, createVNode as R, createTextVNode as V, toDisplayString as k, createCommentVNode as N, mergeProps as $ } from "vue";
const I = /* @__PURE__ */ p({
  __name: "CustomForm",
  props: {
    loading: { type: Boolean, default: !1 },
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
    model: {},
    rules: {},
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
  emits: ["finish", "finishFailed"],
  setup(e, { expose: o, emit: n }) {
    const l = e, a = n, r = w(), d = x({}), v = s(() => l.layout === "vertical" ? { span: 24 } : { span: 6 }), b = s(() => l.layout === "vertical" ? { span: 24 } : { span: 14 }), h = s(() => l.layout === "vertical" ? { span: 24, offset: 0 } : { span: 14, offset: 6 }), g = (t) => {
      var c;
      a("finish", t), (c = l.onSubmit) == null || c.call(l, t);
    }, F = (t) => {
      a("finishFailed", t);
    };
    return o({
      formRef: r,
      validate: () => {
        var t;
        return (t = r.value) == null ? void 0 : t.validate();
      },
      resetFields: () => {
        var t;
        return (t = r.value) == null ? void 0 : t.resetFields();
      },
      clearValidate: () => {
        var t;
        return (t = r.value) == null ? void 0 : t.clearValidate();
      }
    }), (t, c) => {
      const C = i("a-button"), q = i("a-form-item"), B = i("a-form");
      return m(), f(B, {
        model: d,
        layout: e.layout,
        "label-col": v.value,
        "wrapper-col": b.value,
        onFinish: g,
        onFinishFailed: F,
        class: S(["custom-form", `custom-form-${e.layout}`, e.className]),
        ref_key: "formRef",
        ref: r
      }, {
        default: u(() => [
          _(t.$slots, "default", {}, void 0, !0),
          e.showSubmitButton ? (m(), f(q, {
            key: 0,
            "wrapper-col": h.value
          }, {
            default: u(() => [
              R(C, {
                type: "primary",
                "html-type": "submit",
                loading: e.loading,
                class: "custom-form-submit-btn"
              }, {
                default: u(() => [
                  V(k(e.submitText), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ]),
            _: 1
          }, 8, ["wrapper-col"])) : N("", !0)
        ]),
        _: 3
      }, 8, ["model", "layout", "label-col", "wrapper-col", "class"]);
    };
  }
});
const y = (e, o) => {
  const n = e.__vccOpts || e;
  for (const [l, a] of o)
    n[l] = a;
  return n;
}, M = /* @__PURE__ */ y(I, [["__scopeId", "data-v-d6f3c7a7"]]), T = /* @__PURE__ */ p({
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
    const o = e, n = s(() => {
      var a;
      return o.required && !((a = o.rules) != null && a.some((r) => r.required)) ? [{
        required: !0,
        message: typeof o.label == "string" ? `请输入${o.label}` : "此项为必填项"
      }, ...o.rules || []] : o.rules || [];
    }), l = s(() => o.required || n.value.some((a) => a.required));
    return (a, r) => {
      const d = i("a-form-item");
      return m(), f(d, $({
        label: e.label,
        name: e.name,
        rules: n.value,
        required: l.value,
        class: e.className
      }, a.$attrs), {
        default: u(() => [
          _(a.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["label", "name", "rules", "required", "class"]);
    };
  }
});
const O = /* @__PURE__ */ y(T, [["__scopeId", "data-v-508d6646"]]), A = "1.0.0";
export {
  M as CustomForm,
  O as FormItem,
  A as version
};
