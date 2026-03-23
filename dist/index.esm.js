import { openBlock as n, createElementBlock as s } from "vue";
const _ = (o, t) => {
  const c = o.__vccOpts || o;
  for (const [r, e] of t)
    c[r] = e;
  return c;
}, m = {}, a = { class: "custom-form-wrapper" };
function f(o, t) {
  return n(), s("div", a, " 这里是自定义表单 ");
}
const i = /* @__PURE__ */ _(m, [["render", f]]), l = "1.0.0";
export {
  i as CustomForm,
  l as version
};
