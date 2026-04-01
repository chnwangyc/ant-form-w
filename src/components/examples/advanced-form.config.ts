import { FormFieldType, createField, createFormConfig } from '../form-config';

/**
 * 高级表单配置示例
 * 包含复杂的字段组合和联动逻辑
 */
export const advancedFormConfig = createFormConfig([
  // 个人信息部分
  createField({
    type: FormFieldType.STRING,
    key: 'fullName',
    label: 'EMBA.form.FullName',
    placeholder: '请输入您的全名',
    required: true,
    active: true,
    block: true,
    data: {
      maxLength: 100,
      style: 'width: 100%',
    },
  }),

  createField({
    type: FormFieldType.STRING_NEW,
    key: 'idCard',
    label: 'EMBA.form.IDCard',
    placeholder: '请输入身份证号码',
    required: true,
    active: true,
    block: true,
    data: {
      maxLength: 18,
    },
    validator: (value, rule) => {
      const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}[0-9Xx]$/;
      if (!idCardRegex.test(value)) {
        return Promise.reject('请输入正确的身份证号码');
      }
      return Promise.resolve();
    },
  }),

  // 联系方式组合
  createField({
    type: FormFieldType.INPUT_GROUP_SELECT_INPUT,
    key: 'contactInfo',
    label: 'EMBA.form.ContactInfo',
    required: true,
    active: true,
    block: true,
    children: [
      createField({
        type: FormFieldType.SELECT_NEW,
        key: 'contactType',
        label: '联系类型',
        message: '请选择联系类型',
        data: {
          list: [
            { label: '手机', value: 'mobile' },
            { label: '电话', value: 'phone' },
            { label: '邮箱', value: 'email' },
          ],
          style: 'width: 120px',
        },
      }),
      createField({
        type: FormFieldType.STRING,
        key: 'contactValue',
        label: '联系方式',
        message: '请输入联系方式',
        data: {
          style: 'flex: 1',
        },
      }),
    ],
  }),

  // 地址信息（多级联动）
  createField({
    type: FormFieldType.CUSTOM_DATA_CASCADER,
    key: 'detailedAddress',
    label: 'EMBA.form.DetailedAddress',
    placeholder: '请选择详细地址',
    required: true,
    active: true,
    block: true,
    data: {
      cascader: [
        {
          value: 'zhejiang',
          label: '浙江省',
          children: [
            {
              value: 'hangzhou',
              label: '杭州市',
              children: [
                { value: 'xihu', label: '西湖区' },
                { value: 'gongshu', label: '拱墅区' },
                { value: 'shangcheng', label: '上城区' },
              ],
            },
            {
              value: 'ningbo',
              label: '宁波市',
              children: [
                { value: 'haishu', label: '海曙区' },
                { value: 'jiangbei', label: '江北区' },
                { value: 'yinzhou', label: '鄞州区' },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: '江苏省',
          children: [
            {
              value: 'nanjing',
              label: '南京市',
              children: [
                { value: 'xuanwu', label: '玄武区' },
                { value: 'qinhuai', label: '秦淮区' },
                { value: 'jianye', label: '建邺区' },
              ],
            },
          ],
        },
      ],
      style: 'width: 100%',
    },
  }),

  // 教育背景（动态表格）
  createField({
    type: FormFieldType.BLOCK_SLOT,
    key: 'educationBackground',
    label: 'EMBA.form.EducationBackground',
  }),

  // 工作经历（组合字段）
  createField({
    type: FormFieldType.INPUT_GROUP_SELECT_INPUT,
    key: 'currentJob',
    label: 'EMBA.form.CurrentJob',
    block: true,
    children: [
      createField({
        type: FormFieldType.STRING,
        key: 'company',
        label: '公司名称',
        message: '请输入公司名称',
        data: {
          style: 'width: 40%',
        },
      }),
      createField({
        type: FormFieldType.STRING,
        key: 'position',
        label: '职位',
        message: '请输入职位',
        data: {
          style: 'width: 30%',
        },
      }),
      createField({
        type: FormFieldType.NUMBER,
        key: 'workYears',
        label: '工作年限',
        message: '请输入工作年限',
        data: {
          style: 'width: 30%',
        },
      }),
    ],
  }),

  // 行业选择（自定义级联）
  createField({
    type: FormFieldType.CASCADER_CUSTOM,
    key: 'industry',
    label: 'EMBA.form.Industry',
    placeholder: '请选择所属行业',
    required: true,
    active: true,
    block: true,
    data: {
      style: 'width: 100%',
    },
  }),

  // 收入信息
  createField({
    type: FormFieldType.NUMBER_AMOUNT,
    key: 'annualIncome',
    label: 'EMBA.form.AnnualIncome',
    placeholder: '请输入年收入',
    required: true,
    active: true,
    block: true,
  }),

  // 紧急联系人
  createField({
    type: FormFieldType.INPUT_GROUP_SELECT_INPUT,
    key: 'emergencyContact',
    label: 'EMBA.form.EmergencyContact',
    block: true,
    children: [
      createField({
        type: FormFieldType.SELECT,
        key: 'relationship',
        label: '关系',
        message: '请选择关系',
        data: {
          list: ['父母', '配偶', '子女', '兄弟姐妹', '朋友', '其他'],
          style: 'width: 120px',
        },
      }),
      createField({
        type: FormFieldType.STRING,
        key: 'name',
        label: '姓名',
        message: '请输入联系人姓名',
        data: {
          style: 'width: 30%',
        },
      }),
      createField({
        type: FormFieldType.STRING,
        key: 'phone',
        label: '电话',
        message: '请输入联系人电话',
        data: {
          style: 'width: 40%',
        },
        validator: (value, rule) => {
          const phoneRegex = /^1[3-9]\d{9}$/;
          if (value && !phoneRegex.test(value)) {
            return Promise.reject('请输入正确的手机号码');
          }
          return Promise.resolve();
        },
      }),
    ],
  }),

  // 特殊需求（多行文本）
  createField({
    type: FormFieldType.TEXT,
    key: 'specialRequirements',
    label: 'EMBA.form.SpecialRequirements',
    placeholder: '如有特殊需求请在此说明',
    block: true,
    data: {
      maxLength: 1000,
    },
    showCount: true,
  }),

  // 协议确认（单选）
  createField({
    type: FormFieldType.RADIO,
    key: 'agreement',
    label: 'EMBA.form.Agreement',
    required: true,
    active: true,
    block: true,
    data: {
      list: ['我已阅读并同意相关协议'],
      style: 'display: flex; gap: 8px;',
    },
  }),

  // 验证码（快速注册）
  createField({
    type: FormFieldType.QUICK_CAPTCHA,
    key: 'verificationCode',
    label: 'EMBA.form.VerificationCode',
    placeholder: '请输入验证码',
    required: true,
    active: true,
    block: true,
  }),

  // 分割线
  createField({
    type: FormFieldType.DIV,
    key: 'divider1',
  }),

  // 自定义插槽区域
  createField({
    type: FormFieldType.DIV_SLOT,
    key: 'customSection',
  }),
], {
  title: '高级信息登记表',
  name: 'advanced-form',
  layout: 'vertical',
  size: 'large',
  colon: false,
  buttonStyle: {
    onSubmit: '提交申请',
    block: true,
    size: 'large',
    style: {
      height: '48px',
      fontSize: '16px',
      marginTop: '24px',
    },
  },
  rules: {
    fullName: [
      { required: true, message: '请输入全名', trigger: 'blur' },
      { min: 2, max: 50, message: '姓名长度为2-50个字符', trigger: 'blur' },
    ],
    idCard: [
      { required: true, message: '请输入身份证号码', trigger: 'blur' },
    ],
    annualIncome: [
      { required: true, message: '请输入年收入', trigger: 'blur' },
      { type: 'number', min: 0, message: '年收入必须大于0', trigger: 'blur' },
    ],
    agreement: [
      { required: true, message: '请阅读并同意相关协议', trigger: 'change' },
    ],
  },
});