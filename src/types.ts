import { Component, VNode, Ref } from 'vue';
import { FormFieldType, FormItemConfig, FormConfig } from './components/form-config';

/** FormInstance 最小类型定义，避免依赖 ant-design-vue */
export interface FormInstance {
  validate: (names?: string | string[]) => Promise<Record<string, any>>;
  validateField: (names?: string | string[]) => Promise<Record<string, any>>;
  resetFields: (names?: string | string[]) => void;
  clearValidate: (names?: string | string[]) => void;
  scrollToField: (name: string, options?: any) => void;
  [key: string]: any;
}

// 基础表单属性接口（不依赖 ant-design-vue 的 FormProps，避免模块解析失败）
export interface BaseFormProps {
  /** 表单名称 */
  name?: string;
  /** 表单布局 */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right';
  /** 是否显示冒号 */
  colon?: boolean;
  /** 标签宽度 */
  labelCol?: { span: number; offset?: number } | number;
  /** 内容宽度 */
  wrapperCol?: { span: number; offset?: number } | number;
  /** 表单尺寸 */
  size?: 'small' | 'middle' | 'large';
  /** 是否禁用整个表单 */
  disabled?: boolean;
  /** 自定义样式类 */
  class?: string;
  /** 自定义样式 */
  style?: Record<string, string | number>;
  [key: string]: any;
}

// 自定义表单项属性
export interface FormItemProps {
  /** 标签 */
  label?: string | VNode;
  /** 字段名 */
  name?: string;
  /** 验证规则 */
  rules?: any[];
  /** 自定义样式类名 */
  className?: string;
  [key: string]: any;
}

// 自定义表单组件属性
export interface CustomFormProps extends BaseFormProps {
  /** 表单配置 */
  config?: FormConfig;
  /** 表单数据 */
  modelValue?: Record<string, any>;
  /** 提交回调 */
  onSubmit?: (values: any) => void | Promise<void>;
  /** 表单布局 */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 是否显示提交按钮 */
  showSubmitButton?: boolean;
  /** 提交按钮文本 */
  submitText?: string;
  /** 自定义样式类名 */
  className?: string;
  /** 加载状态 */
  loading?: boolean;
  /** 标签列配置 */
  labelCol?: any;
  /** 包装列配置 */
  wrapperCol?: any;
  /** 表单项间隔 */
  gutter?: any[];
  /** 表单尺寸 */
  size?: 'small' | 'middle' | 'large';
  /** 是否显示冒号 */
  colon?: boolean;
  /** 每行显示列数 */
  span?: number;
  /** 按钮样式配置 */
  buttonStyle?: {
    /** 提交按钮文本 */
    onSubmit?: string;
    /** 提交按钮是否块级显示 */
    block?: boolean;
    /** 按钮尺寸 */
    size?: 'small' | 'middle' | 'large' | 'default';
    /** 按钮样式 */
    style?: Record<string, string | number>;
    /** 是否禁用 */
    disabled?: boolean;
  };
  /** 是否启用自动验证 */
  autoValidate?: boolean;
  /** 是否启用防抖验证 */
  debounceValidate?: boolean;
  /** 防抖延迟（毫秒） */
  debounceDelay?: number;
}

// 自定义表单暴露的方法
export interface CustomFormExpose {
  /** 表单实例引用 */
  formRef: Ref<FormInstance | undefined>;
  /** 表单数据 */
  formData: Record<string, any>;
  /** 提交表单 */
  submit: () => Promise<void>;
  /** 重置表单 */
  reset: () => void;
  /** 验证表单 */
  validate: () => Promise<Record<string, any>>;
  /** 验证指定字段 */
  validateField: (fieldNames: string | string[]) => Promise<Record<string, any>>;
  /** 获取表单字段值 */
  getFieldValue: (fieldName: string) => any;
  /** 设置表单字段值 */
  setFieldValue: (fieldName: string, value: any) => void;
  /** 设置表单字段值（批量） */
  setFieldsValue: (values: Record<string, any>) => void;
  /** 重置指定字段 */
  resetField: (fieldName: string | string[]) => void;
  /** 清除表单验证状态 */
  clearValidate: (fieldName?: string | string[]) => void;
  /** 检查表单是否被修改 */
  isModified: () => boolean;
  /** 获取表单修改的字段 */
  getModifiedFields: () => string[];
}

// 表单上下文类型
export interface FormContext {
  /** 表单配置 */
  config: FormConfig;
  /** 表单数据 */
  formData: Record<string, any>;
  /** 表单实例 */
  formRef: Ref<FormInstance | undefined>;
  /** 表单字段映射 */
  fieldMap: Map<string, FormItemConfig>;
  /** 更新表单数据 */
  updateFormData: (key: string, value: any) => void;
  /** 触发字段验证 */
  triggerFieldValidate: (fieldName: string) => Promise<void>;
}

// 字段渲染器属性
export interface FieldRendererProps {
  /** 字段配置 */
  field: FormItemConfig;
  /** 字段值 */
  value: any;
  /** 字段索引 */
  index: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 栅格列跨度 */
  colSpan?: number;
  /** 字段变化回调 */
  onChange?: (value: any) => void;
  /** 字段失焦回调 */
  onBlur?: (value: any) => void;
  /** 字段聚焦回调 */
  onFocus?: (value: any) => void;
}

// 表单配置创建选项
export interface FormConfigOptions {
  /** 表单标题 */
  title?: string;
  /** 表单名称 */
  name?: string;
  /** 表单布局方式 */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 标签列配置 */
  labelCol?: { span: number };
  /** 包装列配置 */
  wrapperCol?: { span: number };
  /** 表单项间隔 */
  gutter?: any[];
  /** 表单尺寸 */
  size?: 'small' | 'middle' | 'large';
  /** 是否显示冒号 */
  colon?: boolean;
  /** 每行显示列数 */
  span?: number;
  /** 按钮样式配置 */
  buttonStyle?: {
    /** 提交按钮文本 */
    onSubmit?: string;
    /** 提交按钮是否块级显示 */
    block?: boolean;
    /** 按钮尺寸 */
    size?: 'small' | 'middle' | 'large' | 'default';
    /** 按钮样式 */
    style?: Record<string, string | number>;
    /** 是否禁用 */
    disabled?: boolean;
  };
  /** 表单验证规则 */
  rules?: Record<string, any[]>;
  /** 自定义表单属性 */
  formProps?: Record<string, any>;
}

// 字段创建选项
export interface FieldCreateOptions {
  /** 字段类型 */
  type: FormFieldType;
  /** 字段键名 */
  key: string;
  /** 标签文本 */
  label: string;
  /** 是否必填 */
  required?: boolean;
  /** 字段提示信息 */
  message?: string;
  /** 占位符文本 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 额外信息显示 */
  extra?: string;
  /** 帮助文本 */
  help?: string;
  /** 是否独占一行 */
  block?: boolean;
  /** 前缀 */
  prefix?: string;
  /** 后缀 */
  suffix?: string;
  /** 字段是否激活（显示*号） */
  active?: boolean;
  /** 显示字符计数 */
  showCount?: boolean;
  /** 字段数据配置 */
  data?: Record<string, any>;
  /** 自定义组件 */
  component?: Component | string;
  /** 自定义组件属性 */
  componentProps?: Record<string, any>;
  /** 自定义验证函数 */
  validator?: (value: any, rule: any) => Promise<void> | void;
  /** 字段变化回调 */
  onChange?: (value: any) => void;
}