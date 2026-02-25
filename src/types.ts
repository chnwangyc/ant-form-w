import { FormProps } from 'ant-design-vue';
import { VNode } from 'vue';

// 基础表单属性接口
export interface BaseFormProps extends FormProps {
  // 可以在这里添加自定义的基础表单属性
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
}