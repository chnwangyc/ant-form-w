<template>
  <div class="personal-info">
    <SaveModal ref="saveModalRef"></SaveModal>
    <cms-tab-header :kidsConfig="Config" />
    <a-row :gutter="20">
      <a-col :lg="24" :md="24" :xl="24">
        <!-- 填写个人信息 form -->
        <div v-if="!!personalData" class="personal-info-form">
          <div class="form">
            <!--        ======= NEW ======-->
            <form-list
              ref="customFormList"
              :buttonStyle="personalForm.buttonStyle"
              :colon="personalForm.colon"
              :gutter="personalForm.gutter"
              :labelCol="personalForm.labelCol"
              :layout="personalForm.layout"
              :model="personalForm.model"
              :modelForm="personalForm.modelForm"
              :rules="personalForm.rules"
              :size="personalForm.size"
              :span="personalForm.span"
              :wrapperCol="personalForm.wrapperCol"
              @handleSubmitFn="handleSubmitFn"
            ></form-list>
            <!--        ======= end ======-->
          </div>

          <!-- 确认提交按钮 -->
          <div class="detail-btn">
            <a-row :gutter="20">
              <a-col :lg="5" :md="3" :sm="3" :xl="6" :xs="0" :xxl="7"></a-col>
              <a-col :lg="5" :md="6" :sm="6" :xl="4" :xs="24" :xxl="3" style="margin-top: 15px;">
                <a-button block class="navi-button" size="large" type="primary" @click="oldNav">
                  <!--              <a-icon type="left" />-->
                  {{ $t('EMBA.button.Back') }}
                </a-button>
              </a-col>
              <a-col :lg="5" :md="6" :sm="6" :xl="4" :xs="24" :xxl="3" style="margin-top: 15px;">
                <a-button
                  :disabled="submitDisable"
                  block
                  class="navi-button"
                  size="large"
                  type="primary"
                  @click="save"
                >
                 {{ $t('EMBA.button.Save') }}
                </a-button>
              </a-col>
              <a-col :lg="5" :md="6" :sm="6" :xl="4" :xs="24" :xxl="3" style="margin-top: 15px;">
                <a-button block class="navi-button" size="large" type="primary" @click="nextNav">
                  {{ $t('EMBA.button.Next') }}
                  <!--              <a-icon type="right" />-->
                </a-button>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
      <!--      <a-col :xl="6" :lg="8" :md="0">-->
      <!--        <ApplyAccount></ApplyAccount>-->
      <!--      </a-col>-->
    </a-row>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'; // 需要引入

import { getEnrollment, updateEnrollment, getProject } from '@/api/enrollment';
import judge from '@/common/js/judge';
import CmsTabHeader from '@/components/CmsTagHeader/CmsTabHeader';
import moment from 'moment';
// import { eventBus } from '@ai-zen/event-bus';
// ======
import { useRouter } from 'vue-router';
import store from '@/store';
import { onMounted, ref, reactive, watch, provide, toRefs } from 'vue';
import { formarFormListModel as personalFormModel, refreshFormTranslations } from './js/PersonalInfo';
import FormList from '@/views/FormList/UpdateFormList.emba';
import { message } from 'ant-design-vue';
import { projectId } from '@/common/js/common';
// ======
export default {
  components: {
    FormList,
    CmsTabHeader,
  },
  async setup() {
    const { t, locale } = useI18n(); // 获取 t 函数
    const saveModalRef = ref();
    provide('videoUrl', 'https://www.pbcsf.tsinghua.edu.cn/upload/default/20210422/ymzyfw.mp4');
    const state = reactive({
      rules: {
        relationship: [{ required: true, message: ' ' }],
        name: [{ required: true, message: ' ' }],
      },
      wapStatus: store.state.wap.Wap_Status,
      Config: {
        title: t('EMBA.personalInfo.Title'),
      },
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
      nextName: undefined,
      submitData: undefined,
    });
    // 监听语言变化
    watch(locale, () => {
      // 重新获取翻译文本
      state.Config.title = t('EMBA.personalInfo.Title');
      refreshFormTranslations();
    });
    const router = useRouter();
    const document = ref('');
    const source = ref('');
    const enrollment_no = store.getters.enrollment_no;
    if (!enrollment_no) {
      router.push({
        name: store.getters.project_name + 'home',
      });
      return;
    }
    const customFormList = ref();
    const userInfo = reactive(store.getters.userInfo);
    let personalData = reactive({});
    const submitDisable = ref(false);
    const nativeCascade = reactive([]);
    const postalCascade = reactive([]);
    const residencyCascade = reactive([]);
    const currentCascade = reactive([]);
    const p_m = personalFormModel();
    const personalForm = reactive(p_m);
    // 统一跳转
    const redirectTo = name => {
      router.push({ name: store.getters.project_name + name });
    };

    function initSubmitDisableModel() {
      // 判断当前是否已经 提交报名表 disabled 状态修改
      for (const i in personalForm.model) {
        if (submitDisable.value) {
          personalForm.model[i].disabled = true;
        } else {
          personalForm.model[i].disabled = false;
        }
      }
    }

    /**
     * 格式化通讯地址信息
     */
    function initPostalCascadeData(data) {
      let v = reactive([]);
      const country_reg = new RegExp(/海外/g);
      if (!data['postal_country']) {
        return undefined;
      }
      if (data['postal_country'] === '中国') {
        v = [data['postal_province'] || '', data['postal_city'] || ''];
      } else {
        // 同步以前数据
        if (data['postal_province'] === '中国' || country_reg.test(data['postal_country'])) {
          v = ['海外'];
        } else {
          v = ['海外', data['postal_country']];
        }
      }
      return v;
    }

    /**
     * 格式化 目前居住地
     */
    function initCurrentCascadeData(data) {
      let v = reactive([]);
      const country_reg = new RegExp(/海外/);
      if (!data['location_country']) {
        return undefined;
      }
      if (data['location_country'] === '中国') {
        if (data['location_province'] == '') {
          v = undefined;
        } else {
          v = [data['location_province'] || '', data['location_city'] || ''];
        }
      } else {
        // 同步以前数据
        if (data['location_province'] === '中国' || country_reg.test(data['location_country'])) {
          v = ['海外'];
        } else {
          v = ['海外', data['location_country']];
        }
      }
      return v;
    }

    const endTimeDisabled = ref(false);

    function handleUserUnInstall() {
      // 获取当前 项目截止时间
      const project_id = projectId();
      getProject(project_id).then(res => {
        // console.log('====== 获取当前 项目截止时间======', res);
        const nowTimeDate = new Date().getTime() / 1000,
          endTimeDate = res.data.end_date,
          startTimeDate = res.data.start_date;

        endTimeDisabled.value = nowTimeDate < startTimeDate ? true : false;
        endTimeDisabled.value = nowTimeDate > endTimeDate ? true : false;
        if (nowTimeDate > endTimeDate) {
          // 当前 报名已截止
          // applyBtnText.value = '报名已截止';
          endTimeDisabled.value = true;
        } else if (nowTimeDate < startTimeDate) {
          // applyBtnText.value = '尚未开始';
          endTimeDisabled.value = true;
        }
      });
    }

    watch(submitDisable, () => {
      if (submitDisable.value) {
        initSubmitDisableModel();
      }
    });

    /**
     * 初始化用户已填写的信息
     */
    function getEnrollmentFn() {
      getEnrollment(enrollment_no).then(res => {
        if (res.code == 200) {
          if (!res.data.supplement) {
            // 是否开启 补充材料功能
            submitDisable.value = res.data.status > 0;
          }
          if (!judge.isEmpty(res.data.personal)) {
            personalData = res.data.personal;
            if (res.data.personal) {
              source.value = !res.data.personal.source ? '' : res.data.personal.source;
            }
            for (const i in personalForm.modelForm) {
              if (i == 'birthday') {
                personalForm.modelForm[i] =
                  !personalData['birthday'] || personalData['birthday'] == 'Invalid date'
                    ? ''
                    : personalData['birthday'];
              } else if (i == 'id_card') {
                // eslint-disable-next-line
                personalForm.modelForm.id_card = {
                  children: {
                    // eslint-disable-next-line
                    id_card_type: personalData["id_card_type"] || "0", // eslint-disable-next-line
                    id_card_no: personalData["id_card_no"] || userInfo.id_card_no,
                  },
                };
              } else if (i == 'emergency') {
                personalForm.modelForm[i] = {
                  children: {
                    relationship: personalData['emergency_relationship'],
                    name: personalData['emergency_name'],
                  },
                };
              } else if (i == 'residency_address') {
                // 户籍所在地
                personalForm.modelForm[i] = {
                  children: {
                    cascader: !personalData['residency_province']
                      ? undefined
                      : [personalData['residency_province'], personalData['residency_city']],
                    // cascader: [personalData['residency_province'], personalData['residency_city']],
                    address: personalData['residency_address'] || '',
                  },
                };
              } else if (i == 'native_province') {
                personalForm.modelForm[i] = !personalData['native_province']
                  ? undefined
                  : [personalData['native_province'], personalData['native_city']];
              } else if (i == 'postal_address') {
                personalForm.modelForm[i] = {
                  children: {
                    cascader: initPostalCascadeData(personalData, 'init'),
                    address: personalData['postal_address'] || '',
                  },
                };
              } else if (i === 'location_address') {
                personalForm.modelForm[i] = {
                  children: {
                    cascader: !personalData['location_country']
                      ? undefined
                      : initCurrentCascadeData(personalData, 'init'),
                  },
                };
              } else if (i == 'direction') {
                console.log('direction');
              } else {
                personalForm.modelForm[i] = !personalData[i] ? undefined : personalData[i];
              }
            }
          }
        }
      });
    }

    function handleInitUserInfo() {
      personalForm.modelForm.name = personalData.name || userInfo.name;
      personalForm.modelForm.mobile = personalData.mobile || userInfo.mobile;
      personalForm.modelForm.email = personalData.email || userInfo.email;
      // console.log(personalForm.modelForm.mobile, personalData.mobile || userInfo.mobile);
    }

    function backtop() {
      // console.log('????????????????????????????????');
      window.scrollTo(0, 0);
    }

    /**
     * 提交信息
     */
    const handleSubmit = nextName => {
      console.timeEnd(nextName);
      if (!enrollment_no) {
        message.warning('您尚未确认申请须知，请您确认申请须知再填写！');
        setTimeout(() => {
          redirectTo('instruction');
        }, 1000);
        return false;
      }
      if (submitDisable.value) {
        if (state.nextName) {
          redirectTo(state.nextName);
        }
        return false;
      }
      const enrollment_data = personalData;
      const params = {
        key: 'personal',
        value: enrollment_data,
        should_validate: false,
      };
      updateEnrollment(enrollment_no, params)
        .then(res => {
          if (res.code === 200) {
            console.log('=====', state.nextName);
            if (state.nextName) {
              // redirectTo(state.nextName);
              saveModalRef.value.validateDetail(state.nextName);
            } else {
              saveModalRef.value.validateDetail(undefined);
              message.success(res.msg);
            }

            // 更新路由icon
            if (res.data) {
              store.commit('SET_ROUTE_ICON_MAP', res.data);
            } else {
              store.dispatch('GetEnrollmentValidation', enrollment_no);
            }
          } else {
            message.warning('保存失败，请稍后再试！');
          }
        })
        .catch(() => {
          // console.log('保存异常', err);
          message.warning('保存失败，请稍后再试！');
        });
    };
    // 通用信息
    const handleSubmitFn = e => {
      state.submitData = e;
      // const country_reg = new RegExp(/海外/g);
      const d = {
        // source: source.value,
        birthday:
          !e.birthday || e.birthday == 'Invalid date'
            ? ''
            : moment(e.birthday).format('YYYY-MM-DD'),
        email: e.email,
        // batch: e.batch,
        // 紧急联系人
        emergency_name: e.emergency.children.name,
        emergency_relationship: e.emergency.children.relationship,
        emergency_mobile: e.emergency_mobile,

        marital: e.marital,
        office_phone: e.office_phone,
        // first_name: e.first_name,
        // last_name: e.last_name,

        gender: e.gender,
        id_card_no: e.id_card.children.id_card_no,
        id_card_type: e.id_card.children.id_card_type,
        mobile: e.mobile,
        name: e.name,
        // name_en: e.name_en,
        // wechat: e.wechat,
        nationality: e.nationality,
        ethnicity: e.ethnicity,
        // invite_code: e.invite_code,
        // invite_alumni: e.invite_alumni,
        // 籍贯
        native_province: e.native_province ? e.native_province[0] : '',
        native_city: e.native_province ? e.native_province[1] : '',
        politics: e.politics,

        postal_code: e.postal_code,
        // 户籍所在地
        // residency_country: e.residency_address.children.cascader[0] || '',
      };
      if (e.residency_address && e.residency_address.children.cascader) {
        d.residency_province = e.residency_address.children.cascader[0] || '';
        d.residency_city = e.residency_address.children.cascader[1] || '';
        d.residency_address = e.residency_address.children.address;
      }
      if (e.postal_address && e.postal_address.children.cascader) {
        d.postal_country =
          e.postal_address.children.cascader[0] === '海外'
            ? e.postal_address.children.cascader[1]
            : '中国';
        d.postal_province =
          e.postal_address.children.cascader[0] === '海外'
            ? ''
            : e.postal_address.children.cascader[0] || '';
        d.postal_city =
          e.postal_address.children.cascader[0] === '海外'
            ? ''
            : e.postal_address.children.cascader[1] || '';
        d.postal_address = e.postal_address.children.address;
      }
      // 常住地
      if (e.location_address && e.location_address.children.cascader) {
        d.location_country =
          e.location_address.children.cascader[0] === '海外'
            ? e.location_address.children.cascader[1]
            : '中国';
        d.location_province =
          e.location_address.children.cascader[0] === '海外'
            ? ''
            : e.location_address.children.cascader[0] || '';
        d.location_city =
          e.location_address.children.cascader[0] === '海外'
            ? ''
            : e.location_address.children.cascader[1] || '';
      }
      personalData = d;
      setTimeout(() => {
        handleSubmit('');
      }, 800);
    };
    const oldNav = () => {
      state.nextName = 'instruction';
      customFormList.value.onSubmit();
      // setTimeout(() => {
      // handleSubmit('instruction');
      // }, 500);
    };
    const nextNav = () => {
      state.nextName = 'education';
      customFormList.value.onSubmit();
      // setTimeout(() => {
      // handleSubmit('education');
      // }, 500);
    };
    const save = () => {
      // console.log('===== SAVE ======');
      if (!enrollment_no) {
        message.warning('您尚未确认申请须知，请您确认申请须知再填写！');
        setTimeout(() => {
          redirectTo('home');
        }, 1000);
        return false;
      }
      state.nextName = undefined;
      customFormList.value.onSubmit();
      // console.log(this.personalData);
    };
    onMounted(() => {
      setTimeout(() => {
        backtop(); // works
      }, 1000);
    });
    await handleUserUnInstall();
    await getEnrollmentFn();
    await handleInitUserInfo();
    return {
      saveModalRef,
      save,
      oldNav,
      nextNav,
      state,
      ...toRefs(state),
      handleSubmit,
      handleSubmitFn,
      redirectTo,
      source,
      endTimeDisabled,
      customFormList,
      document,
      personalForm,
      userInfo,
      personalData,
      enrollment_no,
      project_name: store.getters.project_name,
      nativeCascade,
      postalCascade,
      residencyCascade,
      currentCascade,
      submitDisable,
    };
  },
};
</script>

<style lang="less" scoped="scoped">
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navi-button {
  height: 45px;
  margin: 20px auto 0;
  padding: 0 20px;
  display: block;
}

.personal-info {
  .personal-info-form {
    padding: 20px 0;

    .form {
      width: 100%;

      .item {
        .flex;
        margin: 25px 0;

        .label {
          display: block;
          width: 200px;
          text-align: left;
          padding: 0 0 0 20px;
          position: relative;
        }

        .active {
          &::before {
            content: '*';
            color: #b1193b;
            font-size: 20px;
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
          }
        }

        .detail {
          font-size: 14px;
          width: 300px;
        }

        .double-detail {
          font-size: 14px;
          width: 550px;
        }

        // 家庭成员情况表
        .detail-list {
          width: 545px;
          box-sizing: border-box;

          .list-ul {
            width: 100%;
            margin: 0;
            padding: 0;

            .list {
              .flex;
              flex-wrap: nowrap;

              div {
                padding: 0 5px 0 0;
                line-height: 2;
                width: 20%;

                .input {
                  width: 100%;
                  border: 1px solid #ddd;
                  border-radius: 0.13rem;
                  margin-top: 5px;
                }
              }

              .column3 {
                width: 50%;
              }
            }
          }

          .add-btn {
            width: 100px;
            padding: 0 20px;
            border-radius: 5px;
            line-height: 2.5;
            background-color: #bb133e;
            color: #ffffff;
            margin-top: 20px;
          }
        }

        .warning {
          width: 250px;
          font-size: 12px;
          color: #ff6767;
          padding-left: 30px;
        }

        .double-warning {
          width: 0;
          font-size: 12px;
          color: #ff6767;
          padding-left: 30px;
        }
      }
    }

    // 保存按钮
    // 保存按钮
    .detail-btn {
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        margin: 20px;
        padding: 0 20px;
        width: 120px;
        line-height: 35px;
        font-size: 16px;
        background-color: #bb133e;
        color: #ffffff;
        border-radius: 9px;
      }

      .submit-disable {
        background-color: #999999 !important;
      }
    }
  }

  .clickable {
    cursor: pointer;
  }
}
</style>
