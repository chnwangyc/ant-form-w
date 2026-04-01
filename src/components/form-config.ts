import { Component, VNode } from 'vue';
import { FormItemProps } from '../types';

/**
 * 表单字段类型枚举
 * 基于 UpdateFormList.emba.vue 中的字段类型扩展
 */
export enum FormFieldType {
  // 文本输入类
  STRING = 'string',
  STRING_RESET = 'string_reset',
  STRING_NEW = 'string_new',
  NUMBER = 'number',
  NUMBER_AMOUNT = 'number_amount',
  PASSWORD = 'password',
  TEXT = 'text',
  
  // 选择器类
  SELECT = 'select',
  SELECT_NEW = 'select_new',
  SELECT_OPTIONS = 'select_options',
  SELECT_LABEL = 'select_label',
  
  // 级联选择类
  CASCADER = 'cascader',
  CASCADER_NEW = 'cascader_new',
  CASCADER_COUNTRY = 'cascaderCountry',
  CASCADER_NATIONALITY = 'cascaderNationality',
  CASCADER_ETHNICITY = 'cascaderEthnicity',
  CUSTOM_DATA_CASCADER = 'customDataCascader',
  CASCADER_CUSTOM = 'cascaderCustom',
  
  // 其他表单控件
  RADIO = 'radio',
  RADIO_NEW = 'radio_new',
  RADIO_BUTTON = 'radioButton',
  DATE_PICKER = 'datePicker',
  MONTH_PICKER = 'monthPicker',
  CAPTCHA = 'captcha',
  QUICK_CAPTCHA = 'quickCaptcha',
  
  // 特殊组件
  INPUT_GROUP_STRING = 'inputGroupString',
  INPUT_GROUP_SELECT_INPUT = 'inputGroupSelectInput',
  SLOT = 'slot',
  VALUE_SLOT = 'valueSlot',
  BLOCK_SLOT = 'blockslot',
  DIV_SLOT = 'divslot',
  DESCRIPTION = 'description',
  DIV = 'div',
  
  // 扩展类型
  CUSTOM = 'custom',
}

/**
 * 字段数据配置接口
 */
export interface FieldDataConfig {
  /** 级联选择器选项 */
  cascader?: any[];
  /** 下拉选择器选项 */
  list?: any[];
  /** 样式配置 */
  style?: Record<string, string | number>;
  /** 禁用日期函数 */
  disabledDate?: (currentDate: any) => boolean;
  /** 最大长度 */
  maxLength?: number;
  /** 其他自定义数据 */
  [key: string]: any;
}

/**
 * 表单项配置接口
 */
export interface FormItemConfig extends FormItemProps {
  /** 字段类型 */
  type: FormFieldType;
  /** 字段键名 */
  key: string;
  /** 标签文本（支持国际化key） */
  label: string;
  /** 是否必填 */
  required?: boolean;
  /** 字段提示信息 */
  message?: string;
  /** 占位符文本（支持国际化key） */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 额外信息显示 */
  extra?: string;
  /** 子额外信息 */
  sub_extra?: string;
  /** 帮助文本 */
  help?: string;
  /** 是否独占一行 */
  block?: boolean;
  /** 栅格列跨度（1-24），优先级高于 block */
  colSpan?: number;
  /** 前缀 */
  prefix?: string;
  /** 后缀 */
  suffix?: string;
  /** 字段是否激活（显示*号） */
  active?: boolean;
  /** 显示字符计数 */
  showCount?: boolean;
  /** 字段数据配置 */
  data?: FieldDataConfig;
  /** 子字段配置（用于组合字段） */
  children?: FormItemConfig[];
  /** 自定义组件（当 type 为 CUSTOM 时使用） */
  component?: Component | string;
  /** 自定义组件属性 */
  componentProps?: Record<string, any>;
  /** 自定义样式类 */
  className?: string;
  /** 自定义验证函数 */
  validator?: (value: any, rule: any) => Promise<void> | void;
  /** 字段变化回调 */
  onChange?: (value: any, field: FormItemConfig) => void;
  /** 字段失焦回调 */
  onBlur?: (value: any, field: FormItemConfig) => void;
  /** 字段聚焦回调 */
  onFocus?: (value: any, field: FormItemConfig) => void;
}

/**
 * 表单配置接口
 */
export interface FormConfig {
  /** 表单标题 */
  title?: string;
  /** 表单名称 */
  name?: string;
  /** 表单字段配置列表 */
  fields: FormItemConfig[];
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
  /** 自定义插槽配置 */
  slots?: {
    /** 提交按钮左侧插槽 */
    left?: VNode | string;
    /** 提交按钮右侧插槽 */
    right?: VNode | string;
    /** 提交按钮文本插槽 */
    onSubmit?: VNode | string;
    /** 自定义字段插槽映射 */
    [fieldKey: string]: VNode | string | undefined;
  };
  /** 表单验证规则 */
  rules?: Record<string, any[]>;
  /** 自定义表单属性 */
  formProps?: Record<string, any>;
}

/**
 * 默认表单配置
 */
export const DEFAULT_FORM_CONFIG: Partial<FormConfig> = {
  layout: 'horizontal',
  labelCol: { span: 6 },
  wrapperCol: { span: 13 },
  gutter: [10, { xs: 0, sm: 0, md: 0, lg: 0 }],
  size: 'middle',
  colon: true,
  span: 3,
  buttonStyle: {
    onSubmit: '确定',
    block: false,
    size: 'default',
    disabled: false,
  },
};

/**
 * 字段类型到组件名称的映射
 */
export const FIELD_TYPE_COMPONENT_MAP: Record<FormFieldType, string> = {
  // 文本输入类
  [FormFieldType.STRING]: 'AInput',
  [FormFieldType.STRING_RESET]: 'AInput',
  [FormFieldType.STRING_NEW]: 'AInput',
  [FormFieldType.NUMBER]: 'AInputNumber',
  [FormFieldType.NUMBER_AMOUNT]: 'AInput',
  [FormFieldType.PASSWORD]: 'AInputPassword',
  [FormFieldType.TEXT]: 'ATextarea',
  
  // 选择器类
  [FormFieldType.SELECT]: 'ASelect',
  [FormFieldType.SELECT_NEW]: 'ASelect',
  [FormFieldType.SELECT_OPTIONS]: 'ASelect',
  [FormFieldType.SELECT_LABEL]: 'ASelect',
  
  // 级联选择类
  [FormFieldType.CASCADER]: 'ACascader',
  [FormFieldType.CASCADER_NEW]: 'ACascader',
  [FormFieldType.CASCADER_COUNTRY]: 'ACascader',
  [FormFieldType.CASCADER_NATIONALITY]: 'ACascader',
  [FormFieldType.CASCADER_ETHNICITY]: 'ACascader',
  [FormFieldType.CUSTOM_DATA_CASCADER]: 'ACascader',
  [FormFieldType.CASCADER_CUSTOM]: 'ACascader',
  
  // 其他表单控件
  [FormFieldType.RADIO]: 'ARadioGroup',
  [FormFieldType.RADIO_NEW]: 'ARadioGroup',
  [FormFieldType.RADIO_BUTTON]: 'ARadioGroup',
  [FormFieldType.DATE_PICKER]: 'ADatePicker',
  [FormFieldType.MONTH_PICKER]: 'AMonthPicker',
  [FormFieldType.CAPTCHA]: 'AInput',
  [FormFieldType.QUICK_CAPTCHA]: 'AInput',
  
  // 特殊组件
  [FormFieldType.INPUT_GROUP_STRING]: 'ReceiverAccount',
  [FormFieldType.INPUT_GROUP_SELECT_INPUT]: 'AInputGroup',
  [FormFieldType.SLOT]: 'slot',
  [FormFieldType.VALUE_SLOT]: 'slot',
  [FormFieldType.BLOCK_SLOT]: 'slot',
  [FormFieldType.DIV_SLOT]: 'div',
  [FormFieldType.DESCRIPTION]: 'slot',
  [FormFieldType.DIV]: 'div',
  [FormFieldType.CUSTOM]: 'custom',
};

/**
 * 根据字段类型获取组件额外属性
 */
export function getFieldComponentProps(field: FormItemConfig): Record<string, any> {
  const props: Record<string, any> = {
    disabled: field.disabled,
    placeholder: field.placeholder || field.message,
    size: field.data?.size || 'middle',
  };

  switch (field.type) {
    case FormFieldType.NUMBER:
      props.formatter = (value: string) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      props.min = 0;
      break;
    
    case FormFieldType.NUMBER_AMOUNT:
      props.formatter = (value: string) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      props.prefix = '￥';
      props.suffix = '万元';
      props.type = 'number';
      break;
    
    case FormFieldType.TEXT:
      props.autoSize = { minRows: 4, maxRows: 100 };
      props.showCount = field.showCount !== false;
      break;
    
    case FormFieldType.DATE_PICKER:
      props.format = 'YYYY-MM-DD';
      props.valueFormat = 'YYYY-MM-DD';
      props.inputReadOnly = true;
      break;
    
    case FormFieldType.MONTH_PICKER:
      props.format = 'YYYY-MM';
      props.valueFormat = 'YYYY-MM';
      props.inputReadOnly = true;
      props.disabledDate = field.data?.disabledDate;
      break;
    
    case FormFieldType.CAPTCHA:
    case FormFieldType.QUICK_CAPTCHA:
      props.maxlength = 6;
      break;
    
    case FormFieldType.CASCADER:
    case FormFieldType.CASCADER_NEW:
    case FormFieldType.CASCADER_COUNTRY:
    case FormFieldType.CASCADER_NATIONALITY:
    case FormFieldType.CASCADER_ETHNICITY:
    case FormFieldType.CUSTOM_DATA_CASCADER:
    case FormFieldType.CASCADER_CUSTOM:
      props.options = getFieldOptions(field);
      props.changeOnSelect = false;
      break;
    
    case FormFieldType.SELECT:
    case FormFieldType.SELECT_NEW:
    case FormFieldType.SELECT_OPTIONS:
    case FormFieldType.SELECT_LABEL:
      props.options = getFieldOptions(field);
      if (field.type === FormFieldType.SELECT_OPTIONS) {
        props.mode = 'multiple';
        props.optionLabelProp = 'label';
      }
      break;
    
    case FormFieldType.RADIO_BUTTON:
      props.buttonStyle = 'solid';
      break;
  }

  // 合并自定义组件属性
  if (field.componentProps) {
    Object.assign(props, field.componentProps);
  }

  return props;
}

/**
 * 获取字段选项数据
 */
export function getFieldOptions(field: FormItemConfig): any[] {
  if (field.data?.list) {
    return field.data.list;
  }
  if (field.data?.cascader) {
    return field.data.cascader;
  }
  return [];
}

/**
 * 创建表单配置的工具函数
 */
export function createFormConfig(fields: FormItemConfig[], options?: Partial<FormConfig>): FormConfig {
  return {
    fields,
    ...DEFAULT_FORM_CONFIG,
    ...options,
  };
}

/**
 * 创建表单项配置的工具函数
 */
export function createField(config: Partial<FormItemConfig> & { type: FormFieldType; key: string; label: string }): FormItemConfig {
  return {
    required: false,
    disabled: false,
    active: false,
    block: false,
    showCount: true,
    data: {},
    ...config,
  };
}