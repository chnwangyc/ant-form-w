import { FormFieldType, FormItemConfig, FormConfig, createField, createFormConfig } from './form-config';

/**
 * 表单构建器类
 * 提供链式API创建表单配置
 */
export class FormBuilder {
  private fields: FormItemConfig[] = [];
  private configOptions: Partial<FormConfig> = {};

  /**
   * 添加文本输入字段
   */
  addTextField(key: string, label: string, options?: Partial<FormItemConfig>): this {
    this.fields.push(
      createField({
        type: FormFieldType.STRING,
        key,
        label,
        ...options,
      })
    );
    return this;
  }

  /**
   * 添加数字输入字段
   */
  addNumberField(key: string, label: string, options?: Partial<FormItemConfig>): this {
    this.fields.push(
      createField({
        type: FormFieldType.NUMBER,
        key,
        label,
        ...options,
      })
    );
    return this;
  }

  /**
   * 添加下拉选择字段
   */
  addSelectField(key: string, label: string, options: string[] | any[], optionsConfig?: Partial<FormItemConfig>): this {
    const isObjectOptions = options.length > 0 && typeof options[0] === 'object';
    
    this.fields.push(
      createField({
        type: isObjectOptions ? FormFieldType.SELECT_NEW : FormFieldType.SELECT,
        key,
        label,
        data: {
          list: options,
        },
        ...optionsConfig,
      })
    );
    return this;
  }

  /**
   * 添加多选下拉字段
   */
  addMultiSelectField(key: string, label: string, options: any[], optionsConfig?: Partial<FormItemConfig>): this {
    this.fields.push(
      createField({
        type: FormFieldType.SELECT_OPTIONS,
        key,
        label,
        data: {
          list: options,
        },
        ...optionsConfig,
      })
    );
    return this;
  }

  /**
   * 添加级联选择字段
   */
  addCascaderField(key: string, label: string, options: any[], optionsConfig?: Partial<FormItemConfig>): this {
    this.fields.push(
      createField({
        type: FormFieldType.CASCADER,
        key,
        label,
        data: {
          cascader: options,
        },
        ...optionsConfig,
      })
    );
    return this;
  }

  /**
   * 添加日期选择字段
   */
  addDateField(key: string, label: string, options?: Partial<FormItemConfig>): this {
    this.fields.push(
      createField({
        type: FormFieldType.DATE_PICKER,
        key,
        label,
        ...options,
      })
    );
    return this;
  }

  /**
   * 添加单选按钮字段
   */
  addRadioField(key: string, label: string, options: string[] | any[], optionsConfig?: Partial<FormItemConfig>): this {
    const isObjectOptions = options.length > 0 && typeof options[0] === 'object';
    
    this.fields.push(
      createField({
        type: isObjectOptions ? FormFieldType.RADIO_NEW : FormFieldType.RADIO,
        key,
        label,
        data: {
          list: options,
        },
        ...optionsConfig,
      })
    );
    return this;
  }

  /**
   * 添加按钮式单选字段
   */
  addRadioButtonField(key: string, label: string, options: string[], optionsConfig?: Partial<FormItemConfig>): this {
    this.fields.push(
      createField({
        type: FormFieldType.RADIO_BUTTON,
        key,
        label,
        data: {
          list: options,
        },
        ...optionsConfig,
      })
    );
    return this;
  }

  /**
   * 添加长文本字段
   */
  addTextareaField(key: string, label: string, options?: Partial<FormItemConfig>): this {
    this.fields.push(
      createField({
        type: FormFieldType.TEXT,
        key,
        label,
        ...options,
      })
    );
    return this;
  }

  /**
   * 添加密码字段
   */
  addPasswordField(key: string, label: string, options?: Partial<FormItemConfig>): this {
    this.fields.push(
      createField({
        type: FormFieldType.PASSWORD,
        key,
        label,
        ...options,
      })
    );
    return this;
  }

  /**
   * 添加验证码字段
   */
  addCaptchaField(key: string, label: string, options?: Partial<FormItemConfig>): this {
    this.fields.push(
      createField({
        type: FormFieldType.CAPTCHA,
        key,
        label,
        ...options,
      })
    );
    return this;
  }

  /**
   * 添加组合字段
   */
  addInputGroupField(
    key: string, 
    label: string, 
    children: FormItemConfig[], 
    options?: Partial<FormItemConfig>
  ): this {
    this.fields.push(
      createField({
        type: FormFieldType.INPUT_GROUP_SELECT_INPUT,
        key,
        label,
        children,
        ...options,
      })
    );
    return this;
  }

  /**
   * 添加插槽字段
   */
  addSlotField(key: string, label: string, type: 'slot' | 'valueSlot' | 'blockslot' = 'slot', options?: Partial<FormItemConfig>): this {
    let fieldType: FormFieldType;
    switch (type) {
      case 'valueSlot':
        fieldType = FormFieldType.VALUE_SLOT;
        break;
      case 'blockslot':
        fieldType = FormFieldType.BLOCK_SLOT;
        break;
      default:
        fieldType = FormFieldType.SLOT;
    }
    
    this.fields.push(
      createField({
        type: fieldType,
        key,
        label,
        ...options,
      })
    );
    return this;
  }

  /**
   * 添加描述字段
   */
  addDescriptionField(key: string, label: string, options?: Partial<FormItemConfig>): this {
    this.fields.push(
      createField({
        type: FormFieldType.DESCRIPTION,
        key,
        label,
        ...options,
      })
    );
    return this;
  }

  /**
   * 添加分割线
   */
  addDivider(key: string = 'divider'): this {
    this.fields.push(
      createField({
        type: FormFieldType.DIV,
        key,
        label: '',
      })
    );
    return this;
  }

  /**
   * 添加自定义字段
   */
  addCustomField(key: string, label: string, component: any, componentProps?: Record<string, any>, options?: Partial<FormItemConfig>): this {
    this.fields.push(
      createField({
        type: FormFieldType.CUSTOM,
        key,
        label,
        component,
        componentProps,
        ...options,
      })
    );
    return this;
  }

  /**
   * 设置表单标题
   */
  setTitle(title: string): this {
    this.configOptions.title = title;
    return this;
  }

  /**
   * 设置表单布局
   */
  setLayout(layout: 'horizontal' | 'vertical' | 'inline'): this {
    this.configOptions.layout = layout;
    return this;
  }

  /**
   * 设置标签列配置
   */
  setLabelCol(span: number): this {
    this.configOptions.labelCol = { span };
    return this;
  }

  /**
   * 设置包装列配置
   */
  setWrapperCol(span: number): this {
    this.configOptions.wrapperCol = { span };
    return this;
  }

  /**
   * 设置表单尺寸
   */
  setSize(size: 'small' | 'middle' | 'large'): this {
    this.configOptions.size = size;
    return this;
  }

  /**
   * 设置是否显示冒号
   */
  setColon(colon: boolean): this {
    this.configOptions.colon = colon;
    return this;
  }

  /**
   * 设置每行列数
   */
  setSpan(span: number): this {
    this.configOptions.span = span;
    return this;
  }

  /**
   * 设置按钮样式
   */
  setButtonStyle(buttonStyle: FormConfig['buttonStyle']): this {
    this.configOptions.buttonStyle = buttonStyle;
    return this;
  }

  /**
   * 设置验证规则
   */
  setRules(rules: Record<string, any[]>): this {
    this.configOptions.rules = rules;
    return this;
  }

  /**
   * 构建表单配置
   */
  build(): FormConfig {
    return createFormConfig(this.fields, this.configOptions);
  }

  /**
   * 重置构建器
   */
  reset(): this {
    this.fields = [];
    this.configOptions = {};
    return this;
  }
}

/**
 * 快速创建表单构建器实例
 */
export function createFormBuilder(): FormBuilder {
  return new FormBuilder();
}

/**
 * 创建简单联系表单的快捷函数
 */
export function createContactForm(): FormConfig {
  const builder = createFormBuilder();
  
  return builder
    .setTitle('联系方式')
    .setLayout('horizontal')
    .setLabelCol(6)
    .setWrapperCol(13)
    .addTextField('name', 'EMBA.form.Name', {
      required: true,
      active: true,
      placeholder: '请输入您的姓名',
    })
    .addTextField('mobile', 'EMBA.form.Mobile', {
      required: true,
      active: true,
      placeholder: '请输入手机号码',
    })
    .addTextField('email', 'EMBA.form.Email', {
      required: true,
      active: true,
      placeholder: '请输入电子邮箱',
    })
    .addCascaderField('address', 'EMBA.form.Address', [], {
      placeholder: '请选择地址',
    })
    .addTextareaField('message', 'EMBA.form.Message', {
      placeholder: '请输入留言内容',
      data: { maxLength: 500 },
      showCount: true,
    })
    .setButtonStyle({
      onSubmit: '提交联系信息',
      block: false,
      size: 'default',
    })
    .build();
}

/**
 * 创建登录表单的快捷函数
 */
export function createLoginForm(): FormConfig {
  const builder = createFormBuilder();
  
  return builder
    .setLayout('vertical')
    .setLabelCol(0)
    .setWrapperCol(24)
    .addTextField('username', 'EMBA.form.Username', {
      required: true,
      placeholder: '请输入用户名或手机号',
      block: true,
    })
    .addPasswordField('password', 'EMBA.form.Password', {
      required: true,
      placeholder: '请输入密码',
      block: true,
    })
    .addInputGroupField('captcha', 'EMBA.form.Captcha', [
      createField({
        type: FormFieldType.STRING,
        key: 'code',
        label: '验证码',
        placeholder: '请输入验证码',
        data: { style: 'flex: 1' },
      }),
      createField({
        type: FormFieldType.SLOT,
        key: 'captchaImage',
        label: '验证码图片',
      }),
    ], {
      block: true,
    })
    .setButtonStyle({
      onSubmit: '登录',
      block: true,
      size: 'large',
    })
    .build();
}

/**
 * 创建注册表单的快捷函数
 */
export function createRegisterForm(): FormConfig {
  const builder = createFormBuilder();
  
  return builder
    .setTitle('用户注册')
    .setLayout('vertical')
    .addTextField('mobile', 'EMBA.form.Mobile', {
      required: true,
      active: true,
      placeholder: '请输入手机号码',
      block: true,
    })
    .addCaptchaField('captcha', 'EMBA.form.Captcha', {
      required: true,
      active: true,
      placeholder: '请输入验证码',
      block: true,
    })
    .addPasswordField('password', 'EMBA.form.Password', {
      required: true,
      active: true,
      placeholder: '请设置密码',
      block: true,
    })
    .addPasswordField('confirmPassword', 'EMBA.form.ConfirmPassword', {
      required: true,
      active: true,
      placeholder: '请确认密码',
      block: true,
    })
    .addRadioField('agreement', 'EMBA.form.Agreement', ['我已阅读并同意用户协议'], {
      required: true,
      active: true,
      block: true,
    })
    .setButtonStyle({
      onSubmit: '立即注册',
      block: true,
      size: 'large',
    })
    .build();
}