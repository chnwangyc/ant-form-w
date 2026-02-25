import { reactive } from 'vue';
import fmbaBatch from '@/utils/fmba.batch';
import moment from 'moment';
import { getTranslation } from '@/utils/translate';
// eslint-disable-next-line
const getBirth_date = function(idCard) {
  let birthday = '';
  if (idCard != null && idCard != '') {
    if (idCard.length == 15) {
      birthday = '19' + idCard.substr(6, 6);
    } else if (idCard.length == 18) {
      birthday = idCard.substr(6, 8);
    }
    birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-');
  }
  // console.log(birthday);
  return birthday;
};

const batchList = fmbaBatch;
const format_batchList = fmbaBatch.map(item => {
  return {
    disabled: moment().unix() > moment(item.format_end_date).unix(),
    date: item.format_end_date,
    key: item.batch.replace(/次/, ''),
    value: item.extra
      ? item.batch + '：' + item.end_date + '截止（仅对中国港澳台地区及国际考生开放）'
      : item.batch + '：' + item.end_date + '截止',
  };
});
import store from '@/store';
import judge from '@/common/js/judge';
// 籍贯数据
import { FULL_ADDRESS } from '@/utils/career-options';
// import { nationality } from '@/utils/national';
import { keyEthnicityOptions, keyNationalityOptions } from '@/utils/cascader-nationality-options';

// console.log(ethnicityOptions, '===ethnicityOptions===');

const colStyle = judge.isMobileClient();
const col = {
  labelCol: colStyle ? 24 : 24,
  wrapperCol: colStyle ? 24 : 24,
};
const oldFormList = reactive({
  gutter: [16, { xs: 0, sm: 0, md: 0, lg: 0 }], // 参考 https://2x.antdv.com/components/grid-cn 水平间距和垂直间距
  layout: 'vertical', // 'horizontal'|'vertical'|'inline'
  colon: true, // 是否显示 label后边的 冒号， 只有在horizontal状态下才可用
  size: colStyle ? 'large' : 'default', // pc&移动端 input 等组件size大小设置
  span: 2, // 单行几列展示
  labelCol: col.labelCol, // form label 占比 【24为占领整行】
  wrapperCol: col.wrapperCol, // form value 占比 【24为占领整行】
  // 底部自带确定按钮组合 设置
  buttonStyle: {
    size: 'large',
    style: 'margin:15px 20px;display:none;', // 底部自带按钮样式
    left: {}, // 左侧 slot 部分设置
    onSubmit: {
      block: true,
    },
    right: {}, // 右侧 slot 部分设置
  },
  model: [
    // {
    //   active: false, // 该项是否是必填项 展示label前的 * 号
    //   block: false, // 该项输入是否独占一行显示 这里不填写 默认是 true
    //   type: 'string', // 该项 输入框类别【string、text、radio、checkout、select】 类别
    //   key: 'name', // 该项 key
    //   value: '', // 初始状态下的 数据
    //   message: '请填写姓名', // placeholder & 校验未通过 提示语
    //   label: '姓名',
    //   disabled: false, // 该项 input 是否禁用
    //   // 配置 多个input 只有在 type = inputGroupSelectInput 才生效
    //   // children: [
    //   //   {
    //   //     type: 'select',
    //   //     key: 'id_card_type',
    //   //     value: '大陆居民身份证',
    //   //     message: '',
    //   //     data: {
    //   //       list: ['大陆居民身份证', '外籍护照', '港澳台回乡证', '华侨身份证'],
    //   //       style: 'width:40%;',
    //   //     },
    //   //   },
    //   //   {
    //   //     type: 'string',
    //   //     key: 'id_card_no',
    //   //     value: '',
    //   //     message: '请填写证件号码',
    //   //     data: {
    //   //       style: 'width:60%;',
    //   //     },
    //   //   },
    //   // ],
    //   data: {
    //     style: '',
    //     maxLength: '', // 适用于string、text 等组件
    //     cascader: [], // 适用于 cascader 级联选择 组件
    //     list: [], // 适用于 select、radio、checkout 等组件
    //   }, // 其他配置项目
    // },
    // start ======
    // {
    //   active: true,
    //   block: false,
    //   disabled: false,
    //   type: "select",
    //   key: "direction",
    //   label: "报考方向",
    //   value: "2024级金融MBA十期班",
    //   message: "请选择报考方向",
    //   extra: "开学时间：2024年9月",
    //   data: {
    //     list: ["2024级金融MBA十期班"],
    //   },
    // },
    // {
    //   active: true,
    //   block: false,
    //   disabled: false,
    //   type: "select_new",
    //   key: "batch",
    //   label: "申请批次",
    //   value: "",
    //   message: "请选择批次",
    //   data: {
    //     list: format_batchList,
    //   },
    // },
    {
      active: true,
      block: false,
      disabled: false,
      type: 'string_new',
      key: 'name',
      label: 'EMBA.personalInfo.Name',
      value: '',
      message: 'EMBA.personalInfo.NameMessage',
      extra: 'EMBA.personalInfo.NameExtra',
      data: {},
    },
    {
      active: true,
      block: false,
      disabled: false,
      type: 'radio_new',
      key: 'gender',
      label: 'EMBA.personalInfo.Gender',
      value: '',
      message: 'EMBA.quick.FormData.GenderMessage',
      data: {
        list: [
          { key: '1', tr_label: 'EMBA.quick.FormData.Male', value: 'EMBA.quick.FormData.Male' },
          { key: '2', tr_label: 'EMBA.quick.FormData.FeMale', value: 'EMBA.quick.FormData.FeMale' },
        ],
      },
    },
    {
      active: true,
      block: false,
      type: 'inputGroupSelectInput',
      key: 'id_card',
      value: undefined,
      message: '',
      label: 'EMBA.personalInfo.IdCard',
      disabled: false,
      data: {},
      children: [
        {
          type: 'select_new',
          key: 'id_card_type',
          // value: initIdCardData(store.getters.userInfo.id_card_type, 'key'),
          value: '0',
          message: '',
          data: {
            list: [
              { value: '0', tr_label: 'EMBA.quick.FormData.PrcResidentIdentityCard', label:getTranslation('EMBA.quick.FormData.PrcResidentIdentityCard'),},
              { value: '1', tr_label: 'EMBA.quick.FormData.PrcPassport', label:getTranslation('EMBA.quick.FormData.PrcPassport'),},
              { value: '2', tr_label: 'EMBA.quick.FormData.HongKongMacaoPermanentIdentityCard', label:getTranslation('EMBA.quick.FormData.HongKongMacaoPermanentIdentityCard'),},
              { value: '5', tr_label: 'EMBA.quick.FormData.HongKongMacaoEntryExitPermit', label:getTranslation('EMBA.quick.FormData.HongKongMacaoEntryExitPermit'),},
              { value: '6', tr_label: 'EMBA.quick.FormData.HongKongMacaoResidencePermit', label:getTranslation('EMBA.quick.FormData.HongKongMacaoResidencePermit'),},
              { value: '7', tr_label: 'EMBA.quick.FormData.TaiwanValidIdentityDocument', label:getTranslation('EMBA.quick.FormData.TaiwanValidIdentityDocument'),},
              { value: '4', tr_label: 'EMBA.quick.FormData.TaiwanEntryExitPermit', label:getTranslation('EMBA.quick.FormData.TaiwanEntryExitPermit'),},
              { value: '8', tr_label: 'EMBA.quick.FormData.TaiwanResidencePermit', label:getTranslation('EMBA.quick.FormData.TaiwanResidencePermit'),},
            ],
            style: 'width:50%;',
          },
        },
        {
          type: 'string',
          key: 'id_card_no',
          value: store.getters.userInfo.id_card_no,
          message: '请填写证件号码',
          data: {
            style: 'width:50%;',
          },
        },
      ],
    },

    {
      active: true,
      block: false,
      disabled: false,
      type: 'select_new',
      key: 'nationality',
      label: 'EMBA.personalInfo.Nationality',
      value: undefined,
      message: 'EMBA.personalInfo.NationalityMessage',
      data: {
        list: keyNationalityOptions,
      },
    },
    {
      active: true,
      block: false,
      disabled: false,
      type: 'select_new',
      key: 'ethnicity',
      label: 'EMBA.personalInfo.Ethnicity',
      value: undefined,
      message: 'EMBA.personalInfo.EthnicityMessage',
      data: {
        list: keyEthnicityOptions,
      },
    },
    {
      active: true,
      block: false,
      disabled: false,
      type: 'datePicker',
      key: 'birthday',
      label: 'EMBA.personalInfo.Birthday',
      value: getBirth_date(store.getters.userInfo.id_card_no),
      message: 'EMBA.personalInfo.BirthdayMessage',
      data: {},
    },
    {
      active: false,
      block: false,
      disabled: false,
      type: 'radio_new',
      key: 'marital',
      label: 'EMBA.personalInfo.Marital',
      value: undefined,
      message: 'EMBA.personalInfo.MaritalMessage',
      data: {
        list: [
          { key: '0', value: 'EMBA.personalInfo.Marital0' },
          { key: '1', value: 'EMBA.personalInfo.Marital1' },
          { key: '2', value: 'EMBA.personalInfo.Marital2' },
          { key: '3', value: 'EMBA.personalInfo.Marital3' },
          { key: '4', value: 'EMBA.personalInfo.Marital4' },
        ],
      },
    },

    {
      active: false,
      block: false,
      disabled: false,
      type: 'customDataCascader',
      key: 'native_province',
      label: 'EMBA.personalInfo.NativeProvince',
      value: undefined,
      message: 'EMBA.personalInfo.NativeProvinceMessage',
      data: {
        // cascader: LOCATION_OPTIONS_FMP,
        cascader: FULL_ADDRESS,
      },
    },
    {
      active: false,
      block: false,
      disabled: false,
      type: 'select_new',
      key: 'politics',
      label: 'EMBA.personalInfo.Politics',
      value: undefined,
      message: 'EMBA.personalInfo.Politics',
      data: {
        list: [
          { key: '0', value: '0', label: '中国共产党党员' },
          { key: '1', value: '1', label: '中国共产党预备党员' },
          { key: '2', value: '2', label: '中国共产主义青年团团员' },
          { key: '3', value: '3', label: '中国国民党革命委员会会员' },
          { key: '4', value: '4', label: '中国民主同盟盟员' },
          { key: '5', value: '5', label: '中国民主建国会会员' },
          { key: '6', value: '6', label: '中国民主促进会会员' },
          { key: '7', value: '7', label: '中国农工民主党党员' },
          { key: '8', value: '8', label: '中国致公党党员' },
          { key: '9', value: '9', label: '九三学社社员' },
          { key: '10', value: '10', label: '台湾民主自治同盟盟员' },
          { key: '11', value: '11', label: '无党派人士' },
          { key: '12', value: '12', label: '群众' },
          { key: '13', value: '13', label: '民主党派' },
        ],
      },
    },
    {
      active: false,
      block: false,
      disabled: false,
      type: 'string_new',
      key: 'office_phone',
      label: 'EMBA.personalInfo.OfficePhone',
      value: '',
      extra: 'EMBA.personalInfo.OfficePhoneExtra',
      message: 'EMBA.personalInfo.OfficePhoneMessage',
      data: {},
    },
    {
      active: true,
      block: false,
      disabled: false,
      type: 'string_new',
      key: 'mobile',
      label: 'EMBA.personalInfo.Mobile',
      value: '',
      message: 'EMBA.personalInfo.MobileMessage',
      data: {
        maxLength: 16,
      },
    },
    {
      active: true,
      block: false,
      disabled: false,
      type: 'string_new',
      key: 'email',
      label: 'EMBA.personalInfo.Email',
      value: '',
      message: 'EMBA.personalInfo.EmailMessage',
      data: {},
    },
    {
      active: true,
      block: false,
      type: 'inputGroupSelectInput',
      key: 'postal_address',
      value: undefined,
      message: 'EMBA.personalInfo.PostalAddressMessage',
      label: 'EMBA.personalInfo.PostalAddress',
      disabled: false,
      extra: 'EMBA.personalInfo.PostalAddressExtra',
      data: {},
      children: [
        {
          type: 'cascaderCities',
          key: 'cascader',
          value: undefined,
          message: 'EMBA.personalInfo.PostalAddressMessage',
          data: {
            style: 'width:40%;',
            cascader: [],
          },
        },
        {
          type: 'string',
          key: 'address',
          value: '',
          message: 'EMBA.personalInfo.AddressMessage',
          data: {
            style: 'width:60%;',
          },
        },
      ],
    },
    {
      active: true,
      block: false,
      disabled: false,
      type: 'string_new',
      key: 'postal_code',
      label: 'EMBA.personalInfo.PostalCode',
      value: '',
      message: 'EMBA.personalInfo.PostalCodeMessage',
      data: {},
    },
    {
      active: true,
      block: false,
      type: 'inputGroupSelectInput',
      key: 'location_address',
      value: undefined,
      message: 'EMBA.personalInfo.LocationAddressMessage',
      label: 'EMBA.personalInfo.LocationAddress',
      disabled: false,
      data: {},
      children: [
        {
          type: 'cascaderCities',
          key: 'cascader',
          value: undefined,
          message: 'EMBA.personalInfo.LocationAddressMessage',
          data: {
            style: 'width:100%;',
          },
        },
        // {
        //   type: "string",
        //   key: "address",
        //   value: "",
        //   message: "请填写详细地址",
        //   data: {
        //     style: "width:60%;",
        //   },
        // },
      ],
    },
    // {
    //   active: true,
    //   block: false,
    //   type: "inputGroupSelectInput",
    //   key: "residency_address",
    //   value: undefined,
    //   message: "请选择地址",
    //   label: "户籍所在地",
    //   disabled: false,
    //   data: {},
    //   children: [
    //     {
    //       type: "cascaderCities",
    //       key: "cascader",
    //       value: undefined,
    //       message: "请选择地址",
    //       data: {
    //         style: "width:40%;",
    //       },
    //     },
    //     {
    //       type: "string",
    //       key: "address",
    //       value: "",
    //       message: "请填写详细地址",
    //       data: {
    //         style: "width:60%;",
    //       },
    //     },
    //   ],
    // },
    // {
    //   active: false,
    //   block: false,
    //   disabled: false,
    //   type: "divslot",
    //   key: "empty_placeholder",
    //   label: "",
    //   value: "",
    //   message: "",
    //   data: {},
    // },
    {
      active: true,
      block: false,
      type: 'inputGroupSelectInput',
      key: 'emergency',
      value: undefined,
      message: 'EMBA.personalInfo.EmergencyMessage',
      label: 'EMBA.personalInfo.Emergency',
      disabled: false,
      data: {},
      children: [
        {
          type: 'select_new',
          key: 'relationship',
          value: '',
          message: 'EMBA.personalInfo.RelationShipMessage',
          data: {
            style: 'width:40%;',
            list: [
              { key: '0', value: '0', label: '父母' },
              { key: '1', value: '1', label: '配偶' },
              { key: '2', value: '2', label: '子女' },
              { key: '3', value: '3', label: '其他' },
            ],
          },
        },
        {
          type: 'string',
          key: 'name',
          value: '',
          message: 'EMBA.personalInfo.RelationShipMessage',
          data: {
            style: 'width:60%;',
          },
        },
      ],
    },
    {
      active: true,
      block: false,
      disabled: false,
      type: 'string_new',
      key: 'emergency_mobile',
      label: 'EMBA.personalInfo.EmergencyMobile',
      value: '',
      message: 'EMBA.personalInfo.EmergencyMobileMessage',
      data: {
        maxLength: 16,
      },
    },
    // end   ======
  ],
  modelForm: {},
  rules: {},
});

// 选择时间
// const validateDatePicker = rule => {
//   rule.message = '请选择时间';
//   if (oldFormList.modelForm[rule.field] == '') {
//     return Promise.resolve();
//   } else {
//     if (!oldFormList.modelForm[rule.field]) {
//       return Promise.reject(new Error());
//     } else {
//       return Promise.resolve();
//     }
//   }
// };

function checkIDCard(idcode) {
  // 加权因子
  // eslint-disable-next-line
  const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码
  // eslint-disable-next-line
  const check_code = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
  const code = idcode + '';
  const last = idcode[17]; //最后一位
  const seventeen = code.substring(0, 17);
  // ISO 7064:1983.MOD 11-2
  // 判断最后一位校验码是否正确
  const arr = seventeen.split('');
  const len = arr.length;
  let num = 0;
  for (let i = 0; i < len; i++) {
    // eslint-disable-next-line
    num = num + arr[i] * weight_factor[i];
  }
  // 获取余数
  const resisue = num % 11;
  // eslint-disable-next-line
  const last_no = check_code[resisue];
  // 格式的正则
  // 正则思路
  /*
  第一位不可能是0
  第二位到第六位可以是0-9
  第七位到第十位是年份，所以七八位为19或者20
  十一位和十二位是月份，这两位是01-12之间的数值
  十三位和十四位是日期，是从01-31之间的数值
  十五，十六，十七都是数字0-9
  十八位可能是数字0-9，也可能是X
  */
  // eslint-disable-next-line
  const idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
  // 判断格式是否正确
  // eslint-disable-next-line
  const format = idcard_patter.test(idcode);
  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  // eslint-disable-next-line
  return last === last_no && format ? true : false;
}

// 校验身份证件信息
const validateInputGroupIdCard = rule => {
  // console.log('===checkout id_card');
  let data = null;
  for (const i in oldFormList.model) {
    if (oldFormList.model[i].key === rule.field) {
      data = oldFormList.modelForm[rule.field];
    }
  }
  if (data.children['id_card_type'] == 0) {
    // console.log(data.children['id_card_no']);
    if (!data.children['id_card_no']) {
      rule.message = '请检查身份证号码填写是否正确';
      return Promise.reject(new Error());
    } else if (!checkIDCard(data.children['id_card_no'])) {
      rule.message = '请检查身份证号码填写是否正确';
      return Promise.reject(new Error());
    } else {
      // console.log('===身份证信息填写无误====');
      for (const i in oldFormList.model) {
        if (oldFormList.model[i].key === 'birthday') {
          // console.log('出生日期');
          oldFormList.modelForm['birthday'] = getBirth_date(data.children['id_card_no']);
          return Promise.resolve();
        }
      }
    }
  } else if (data.children['id_card_type'] == '' || data.children['id_card_no'] == '') {
    rule.message = '请检查身份证件填写是否正确';
    return Promise.reject(new Error());
  } else {
    return Promise.resolve();
  }
};
const validateAddress = (rule, value) => {
  if (!value.children.cascader && !value.children.address) {
    return Promise.resolve();
  } else if (value.children.cascader.length == 0 && !value.children.address) {
    return Promise.resolve();
  } else if (value.children.cascader.length < 2) {
    rule.message = '请检查地址区域是否选择正确';
    return Promise.reject(new Error());
  } else if (!value.children.cascader[0] || !value.children.cascader[1]) {
    rule.message = '请检查地址区域是否选择正确';
    return Promise.reject(new Error());
  } else if (!value.children.address) {
    rule.message = '请检查地址是否填写';
    return Promise.reject(new Error());
  } else {
    return Promise.resolve();
  }
};

const validateBatch = (rule, value) => {
  console.log(value);
  const reg = new RegExp(value);
  for (const i in oldFormList.model) {
    // console.log(value, oldFormList.model[i].key);
    if (oldFormList.model[i].key === 'batch') {
      for (const j in batchList) {
        if (reg.test(batchList[j].batch)) {
          oldFormList.model[i].extra = '面试时间：' + batchList[j].interview_date;
          oldFormList.model[i].sub_extra = batchList[j].extra;
        }
      }
    }
  }
  return Promise.resolve();
};
oldFormList.rules = {
  batch: [
    {
      required: false,
      message: '请正确选择地址区域',
      trigger: 'change',
      validator: validateBatch,
    },
  ],
  current_address: [
    {
      required: false,
      message: '请正确选择地址区域',
      trigger: 'change',
      validator: validateAddress,
    },
  ],
  residency_address: [
    {
      required: false,
      message: '请正确选择地址区域',
      trigger: 'change',
      validator: validateAddress,
    },
  ],
  postal_address: [
    {
      required: false,
      message: '请正确选择地址区域',
      trigger: 'change',
      validator: validateAddress,
    },
  ],
  id_card: [
    {
      required: false,
      message: '请正确填写证件信息',
      trigger: 'change',
      type: 'string',
      validator: validateInputGroupIdCard,
    },
  ],
  // datePicker: [
  //   {
  //     required: false,
  //     message: '请选择时间',
  //     trigger: 'blur',
  //     type: 'string',
  //     validator: validateDatePicker,
  //   },
  // ],
};
// 简化版的翻译更新函数
function refreshFormTranslations() {
  try {
    // 遍历所有表单字段
    oldFormList.model.forEach(field => {
      // 处理字段本身的 data.list
      if (field.data && field.data.list && Array.isArray(field.data.list)) {
        field.data.list.forEach((item, index) => {
          if (item.tr_label && typeof item.tr_label === 'string' && item.tr_label.startsWith('EMBA.')) {
            field.data.list[index].label = getTranslation(item.tr_label);
          }
        });
      }

      // 处理字段的子元素
      if (field.children && Array.isArray(field.children)) {
        field.children.forEach(child => {
          if (child.data && child.data.list && Array.isArray(child.data.list)) {
            child.data.list.forEach((item, index) => {
              if (item.tr_label && typeof item.tr_label === 'string' && item.tr_label.startsWith('EMBA.')) {
                child.data.list[index].label = getTranslation(item.tr_label);
              }
            });
          }
        });
      }
    });

    // 可以在这里添加其他需要更新的字段
    console.log('Form translations refreshed');
  } catch (error) {
    console.error('Failed to refresh form translations:', error);
  }
}

function formarFormListModel() {
  const f = oldFormList.modelForm;
  const masterModel = oldFormList.model;
  for (const i in masterModel) {
    if (masterModel[i].children) {
      f[masterModel[i].key] = {
        children: {},
      };
      for (const p in masterModel[i].children) {
        f[masterModel[i].key].children[masterModel[i].children[p].key] =
          masterModel[i].children[p].value;
      }
    } else {
      f[masterModel[i].key] = masterModel[i].value;
    }
  }
  oldFormList.modelForm = f;
  // console.log(oldFormList, '////////////////////////oldFormList==================');
  return oldFormList;
}

export { formarFormListModel, refreshFormTranslations };
