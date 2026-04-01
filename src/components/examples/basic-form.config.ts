import { FormFieldType, createField, createFormConfig } from '../form-config';

/**
 * 基础表单配置示例
 * 包含常见的表单字段类型
 */
export const basicFormConfig = createFormConfig([
  // 文本输入字段
  createField({
    type: FormFieldType.STRING,
    key: 'name',
    label: 'EMBA.form.Name',
    placeholder: 'EMBA.form.NamePlaceholder',
    required: true,
    active: true,
    data: {
      maxLength: 50,
    },
  }),

  createField({
    type: FormFieldType.STRING_NEW,
    key: 'mobile',
    label: 'EMBA.form.Mobile',
    placeholder: 'EMBA.form.MobilePlaceholder',
    required: true,
    active: true,
    data: {
      maxLength: 11,
    },
    validator: (value, rule) => {
      const mobileRegex = /^1[3-9]\d{9}$/;
      if (!mobileRegex.test(value)) {
        return Promise.reject('请输入正确的手机号码');
      }
      return Promise.resolve();
    },
  }),

  createField({
    type: FormFieldType.STRING_RESET,
    key: 'email',
    label: 'EMBA.form.Email',
    placeholder: 'EMBA.form.EmailPlaceholder',
    required: true,
    active: true,
    disabled: false,
    data: {
      maxLength: 100,
    },
  }),

  // 数字输入字段
  createField({
    type: FormFieldType.NUMBER,
    key: 'age',
    label: 'EMBA.form.Age',
    placeholder: 'EMBA.form.AgePlaceholder',
    required: true,
    active: true,
    data: {
      min: 18,
      max: 100,
    },
  }),

  createField({
    type: FormFieldType.NUMBER_AMOUNT,
    key: 'salary',
    label: 'EMBA.form.Salary',
    placeholder: 'EMBA.form.SalaryPlaceholder',
    required: true,
    active: true,
  }),

  // 选择字段
  createField({
    type: FormFieldType.SELECT,
    key: 'gender',
    label: 'EMBA.form.Gender',
    placeholder: 'EMBA.form.GenderPlaceholder',
    required: true,
    active: true,
    data: {
      list: ['男', '女', '其他'],
    },
  }),

  createField({
    type: FormFieldType.SELECT_NEW,
    key: 'education',
    label: 'EMBA.form.Education',
    placeholder: 'EMBA.form.EducationPlaceholder',
    required: true,
    active: true,
    data: {
      list: [
        { label: '本科', value: 'bachelor', key: 'bachelor' },
        { label: '硕士', value: 'master', key: 'master' },
        { label: '博士', value: 'phd', key: 'phd' },
        { label: '其他', value: 'other', key: 'other' },
      ],
    },
  }),

  createField({
    type: FormFieldType.SELECT_OPTIONS,
    key: 'hobbies',
    label: 'EMBA.form.Hobbies',
    placeholder: 'EMBA.form.HobbiesPlaceholder',
    data: {
      list: [
        { label: '阅读', value: 'reading' },
        { label: '运动', value: 'sports' },
        { label: '音乐', value: 'music' },
        { label: '旅行', value: 'travel' },
        { label: '美食', value: 'food' },
      ],
    },
  }),

  // 级联选择字段
  createField({
    type: FormFieldType.CASCADER,
    key: 'address',
    label: 'EMBA.form.Address',
    placeholder: 'EMBA.form.AddressPlaceholder',
    required: true,
    active: true,
  }),

  createField({
    type: FormFieldType.CASCADER_COUNTRY,
    key: 'country',
    label: 'EMBA.form.Country',
    placeholder: 'EMBA.form.CountryPlaceholder',
    data: {
      style: 'width: 100%',
    },
  }),

  // 日期选择字段
  createField({
    type: FormFieldType.DATE_PICKER,
    key: 'birthday',
    label: 'EMBA.form.Birthday',
    placeholder: 'EMBA.form.BirthdayPlaceholder',
    required: true,
    active: true,
  }),

  createField({
    type: FormFieldType.MONTH_PICKER,
    key: 'joinDate',
    label: 'EMBA.form.JoinDate',
    placeholder: 'EMBA.form.JoinDatePlaceholder',
    data: {
      disabledDate: (current: any) => {
        return current && current > new Date();
      },
    },
  }),

  // 单选按钮
  createField({
    type: FormFieldType.RADIO,
    key: 'maritalStatus',
    label: 'EMBA.form.MaritalStatus',
    data: {
      list: ['已婚', '未婚', '离异'],
      style: 'display: flex; gap: 16px;',
    },
  }),

  createField({
    type: FormFieldType.RADIO_NEW,
    key: 'workStatus',
    label: 'EMBA.form.WorkStatus',
    data: {
      list: [
        { key: 'fulltime', value: '全职' },
        { key: 'parttime', value: '兼职' },
        { key: 'freelance', value: '自由职业' },
        { key: 'unemployed', value: '待业' },
      ],
    },
  }),

  createField({
    type: FormFieldType.RADIO_BUTTON,
    key: 'experienceLevel',
    label: 'EMBA.form.ExperienceLevel',
    data: {
      list: ['初级', '中级', '高级', '专家'],
    },
  }),

  // 长文本字段
  createField({
    type: FormFieldType.TEXT,
    key: 'introduction',
    label: 'EMBA.form.Introduction',
    placeholder: 'EMBA.form.IntroductionPlaceholder',
    data: {
      maxLength: 500,
    },
    showCount: true,
  }),

  // 密码字段
  createField({
    type: FormFieldType.PASSWORD,
    key: 'password',
    label: 'EMBA.form.Password',
    placeholder: 'EMBA.form.PasswordPlaceholder',
    required: true,
    active: true,
  }),

  // 验证码字段
  createField({
    type: FormFieldType.CAPTCHA,
    key: 'captcha',
    label: 'EMBA.form.Captcha',
    placeholder: 'EMBA.form.CaptchaPlaceholder',
    required: true,
    active: true,
  }),

  // 描述字段（插槽）
  createField({
    type: FormFieldType.DESCRIPTION,
    key: 'description',
    label: 'EMBA.form.Description',
  }),

  // 插槽字段
  createField({
    type: FormFieldType.SLOT,
    key: 'customSlot',
    label: 'EMBA.form.CustomSlot',
  }),

  // 独占行插槽
  createField({
    type: FormFieldType.BLOCK_SLOT,
    key: 'blockContent',
    label: 'EMBA.form.BlockContent',
  }),

  // 独立div插槽
  createField({
    type: FormFieldType.DIV_SLOT,
    key: 'divider',
  }),

  // 空div占位
  createField({
    type: FormFieldType.DIV,
    key: 'spacer',
  }),
], {
  title: '基础信息表单',
  name: 'basic-form',
  layout: 'horizontal',
  labelCol: { span: 6 },
  wrapperCol: { span: 13 },
  size: 'middle',
  colon: true,
  span: 3,
  buttonStyle: {
    onSubmit: '提交信息',
    block: false,
    size: 'default',
    style: {
      minWidth: '120px',
    },
  },
});