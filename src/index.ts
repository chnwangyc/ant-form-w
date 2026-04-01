// 导出组件
export { default as CustomForm } from './components/CustomForm.vue';
export { default as FieldRenderer } from './components/FieldRenderer.vue';
export { default as ChildFieldRenderer } from './components/ChildFieldRenderer.vue';

// 导出类型
export type {
  CustomFormProps,
  CustomFormExpose,
  FormContext,
  FieldRendererProps,
  FormConfigOptions,
  FieldCreateOptions,
} from './types';

// 导出表单配置
export {
  FormFieldType,
  DEFAULT_FORM_CONFIG,
  FIELD_TYPE_COMPONENT_MAP,
  getFieldComponentProps,
  getFieldOptions,
  createFormConfig,
  createField,
} from './components/form-config';
export type {
  FieldDataConfig,
  FormItemConfig,
  FormConfig,
} from './components/form-config';

// 导出表单构建器
export {
  FormBuilder,
  createFormBuilder,
  createContactForm,
  createLoginForm,
  createRegisterForm,
} from './components/form-builder';

// 导出版本信息
export const version = '1.0.0';
