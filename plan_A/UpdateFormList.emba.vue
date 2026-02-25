<template>
  <div v-if="modelForm">
    <a-form
      ref="formRef"
      :colon="colon"
      :layout="layout"
      :model="modelFormList"
      :rules="rules"
      :scrollToFirstError="true"
    >
      <a-row :gutter="gutter">
        <a-col
          v-for="(record, index) in model"
          :key="`record-${record.key}-${index}`"
          :lg="initCol(record.block, span)"
          :md="24"
          :style="initStyle(record.data)"
          class="record-list"
        >
          <!--          短字符串 带重置按钮-->
          <a-form-item
            v-if="record.type === 'string_reset'"
            :key="'string' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>
              <CheckCircleTwoTone
                v-if="filterExtra(record.extra) == 'success'"
                twoToneColor="#bb133e"
              />
              <CloseCircleTwoTone
                v-if="filterExtra(record.extra) == 'fail'"
                twoToneColor="#bb133e"
              />
              {{ filterExtraString(record.extra) }}
            </template>
            <a-input
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :maxlength="filterInputMaxLength(record)"
              :placeholder="$t(record.message)"
              :prefix="record.prefix || ''"
              :size="size"
              :suffix="record.suffix || ''"
              style="width: 70%"
            ></a-input>
            <CheckCircleTwoTone
              v-if="record.disabled"
              style="margin-left: 1%"
              twoToneColor="#52c41a"
            />
            <a-popconfirm
              v-if="record.disabled"
              cancel-text="取消"
              ok-text="重置"
              title="确定重置当前手机号及其他数据？"
              @confirm="confirmReset"
            >
              <a-button style="width: 28%;margin-left: 1%" type="primary">重置</a-button>
            </a-popconfirm>
          </a-form-item>
          <a-form-item
            v-if="record.type === 'string_new'"
            :key="'string' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #help>
              {{ record.help || '' }}
            </template>
            <template #extra>
              <CheckCircleTwoTone
                v-if="filterExtra(record.extra) == 'success'"
                twoToneColor="#bb133e"
              />
              <CloseCircleTwoTone
                v-if="filterExtra(record.extra) == 'fail'"
                twoToneColor="#bb133e"
              />
              {{ record.extra ? $t(record.extra) : '' }}
            </template>
            <a-input
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :maxlength="filterInputMaxLength(record)"
              :placeholder="$t(record.message)"
              :prefix="record.prefix || ''"
              :size="size"
              :suffix="record.suffix || ''"
            ></a-input>
          </a-form-item>
          <!--        短字符串-->
          <a-form-item
            v-if="record.type === 'string'"
            :key="'string' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #help>
              {{ record.help || '' }}
            </template>
            <template #extra>
              <CheckCircleTwoTone
                v-if="filterExtra(record.extra) == 'success'"
                twoToneColor="#bb133e"
              />
              <CloseCircleTwoTone
                v-if="filterExtra(record.extra) == 'fail'"
                twoToneColor="#bb133e"
              />
              {{ record.extra }}
              {{ filterExtraString(record.extra) }}
              <!--              {{ $t(filterExtraString(record.extra)) }}-->
            </template>
            <a-input
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :maxlength="filterInputMaxLength(record)"
              :placeholder="$t(record.message)"
              :prefix="record.prefix || ''"
              :size="size"
              :suffix="record.suffix || ''"
            ></a-input>
          </a-form-item>
          <!--        短字符串-->
          <a-form-item
            v-if="record.type === 'number'"
            :key="'number' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>
              <CheckCircleTwoTone
                v-if="filterExtra(record.extra) == 'success'"
                twoToneColor="#bb133e"
              />
              <CloseCircleTwoTone
                v-if="filterExtra(record.extra) == 'fail'"
                twoToneColor="#bb133e"
              />
              {{ filterExtraString(record.extra) }}
            </template>
            <a-input-number
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :min="0"
              :placeholder="$t(record.message)"
              :size="size"
              style="width: 100%"
            ></a-input-number>
          </a-form-item>
          <a-form-item
            v-if="record.type === 'number_amount'"
            :key="'number_amount' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>
              <CheckCircleTwoTone
                v-if="filterExtra(record.extra) == 'success'"
                twoToneColor="#bb133e"
              />
              <CloseCircleTwoTone
                v-if="filterExtra(record.extra) == 'fail'"
                twoToneColor="#bb133e"
              />
              {{ filterExtraString(record.extra) }}
            </template>
            <a-input
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :placeholder="$t(record.message)"
              :size="size"
              prefix="￥"
              style="width: 100%"
              suffix="万元"
              type="number"
            ></a-input>
          </a-form-item>
          <!--          测试-->
          <a-form-item
            v-if="record.type === 'inputGroupString'"
            :key="'string' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <receiver-account
              v-model="modelFormList[record.key]"
              :disabled="record.disabled"
              :placeholder="$t(record.message)"
              :size="size"
            ></receiver-account>
          </a-form-item>
          <!--        自定义多级联动 cascaderCustom -->
          <a-form-item
            v-if="record.type === 'customDataCascader'"
            :key="'customDataCascader' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-cascader
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :options="record.data.cascader"
              :placeholder="$t(record.message)"
              :size="size"
              :style="record.data.style"
              :changeOnSelect="false"
            />
          </a-form-item>
          <a-form-item
            v-if="record.type === 'cascaderCustom'"
            :key="'cascaderCustom' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-cascader
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :options="COMPANY_INDUSTRY_OPTIONS_WIN"
              :placeholder="$t(record.message)"
              :size="size"
              :style="record.data.style"
              :changeOnSelect="false"
            />
          </a-form-item>
          <a-form-item
            v-if="record.type === 'cascader_new'"
            :key="'cascader_new' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-cascader
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :options="record.data.list"
              :placeholder="$t(record.message)"
              :size="size"
              :style="record.data.style"
              :changeOnSelect="false"
            />
          </a-form-item>
          <!--        省市区联动 cascader -->
          <a-form-item
            v-if="record.type === 'cascader'"
            :key="'cascader' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <!--            <a-cascader-->
            <!--              v-if="record.data.cascader"-->
            <!--              :size="size"-->
            <!--              :placeholder="$t(record.message)"-->
            <!--              v-model:value="modelFormList[record.key]"-->
            <!--              :options="record.data.cascader"-->
            <!--              :disabled="record.disabled"-->
            <!--            />-->
            <a-cascader
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :options="provinceCities"
              :placeholder="$t(record.message)"
              :size="size"
              :changeOnSelect="false"
            />
          </a-form-item>
          <!--          国家 省市区-->
          <a-form-item
            v-if="record.type === 'cascaderCountry'"
            :key="'cascaderCountry' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-cascader
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :options="countryOptions"
              :placeholder="$t(record.message)"
              :size="size"
              :changeOnSelect="false"
            />
          </a-form-item>

          <!--        select + input 输入-->
          <a-form-item
            v-if="record.type === 'inputGroupSelectInput'"
            :key="'selectInput' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-input-group compact>
              <template
                v-for="(inputGroupRecord, inputGroupRecordIndex) in record.children"
                :key="'inputGroupRecordIndex' + inputGroupRecordIndex"
              >
                <a-select
                  v-if="inputGroupRecord.type === 'select'"
                  v-model:value="modelFormList[record.key].children[inputGroupRecord.key]"
                  :disabled="record.disabled"
                  :placeholder="inputGroupRecord.message"
                  :size="size"
                  :style="inputGroupRecord.data.style"
                  @change="handleSelectFormList(record.key)"
                >
                  <a-select-option
                    v-for="inputGroupSelect in inputGroupRecord.data.list"
                    :key="inputGroupSelect"
                    :value="inputGroupSelect"
                  >
                    {{ inputGroupSelect }}
                  </a-select-option>
                </a-select>
                <!--              国内城市-->
                <a-cascader
                  v-if="inputGroupRecord.type === 'cascaderCities'"
                  v-model:value="modelFormList[record.key].children[inputGroupRecord.key]"
                  :disabled="record.disabled"
                  :options="provinceCities"
                  :placeholder="$t(record.message)"
                  :size="size"
                  :style="inputGroupRecord.data.style"
                  :changeOnSelect="false"
                />
                <a-select
                  v-if="inputGroupRecord.type === 'select_new'"
                  v-model:value="modelFormList[record.key].children[inputGroupRecord.key]"
                  :disabled="record.disabled"
                  :dropdownMatchSelectWidth="false"
                  :placeholder="$t(record.message)"
                  :size="size"
                  :style="inputGroupRecord.data.style"
                  :options="inputGroupRecord.data.list"
                  @change="handleSelectFormList([record.key])"
                >
                  <!--                  <a-select-option-->
                  <!--                    v-for="inputGroupSelect in inputGroupRecord.data.list"-->
                  <!--                    :key="inputGroupSelect.key"-->
                  <!--                  >-->
                  <!--                    {{ inputGroupSelect.value }}-->
                  <!--                  </a-select-option>-->
                </a-select>
                <a-select
                  v-if="inputGroupRecord.type === 'select_label'"
                  v-model:value="modelFormList[record.key].children[inputGroupRecord.key]"
                  :disabled="record.disabled"
                  :dropdownMatchSelectWidth="false"
                  :placeholder="$t(record.message)"
                  :size="size"
                  :style="inputGroupRecord.data.style"
                  :options="inputGroupRecord.data.list"
                  @change="handleSelectFormList([record.key])"
                >
                  <!--                  <template-->
                  <!--                    v-for="(inputGroupSelect, select_index) in inputGroupRecord.data.list"-->
                  <!--                    :key="`${select_index}-select-label`"-->
                  <!--                  >-->
                  <!--                    <a-select-option :value="inputGroupSelect.key">-->
                  <!--                      {{ inputGroupSelect.value }}-->
                  <!--                    </a-select-option>-->
                  <!--                  </template>-->
                </a-select>
                <!--                自定义多级级联选择-->
                <a-cascader
                  v-if="inputGroupRecord.type === 'customCascaderCountry'"
                  v-model:value="modelFormList[record.key].children[inputGroupRecord.key]"
                  :disabled="record.disabled"
                  :options="inputGroupRecord.data.cascader"
                  :placeholder="$t(record.message)"
                  :size="size"
                  :style="inputGroupRecord.data.style"
                  :changeOnSelect="false"
                />
                <!--              世界国家和城市-->
                <a-cascader
                  v-if="inputGroupRecord.type === 'cascaderCountry'"
                  v-model:value="modelFormList[record.key].children[inputGroupRecord.key]"
                  :disabled="record.disabled"
                  :options="countryOptions"
                  :placeholder="$t(record.message)"
                  :size="size"
                  :style="inputGroupRecord.data.style"
                  :changeOnSelect="false"
                />
                <!--              世界 国家 国籍-->
                <a-cascader
                  v-if="inputGroupRecord.type === 'cascaderNationality'"
                  v-model:value="modelFormList[record.key].children[inputGroupRecord.key]"
                  :disabled="record.disabled"
                  :options="nationalityOptions"
                  :placeholder="$t(record.message)"
                  :size="size"
                  :style="inputGroupRecord.data.style"
                  :changeOnSelect="false"
                />
                <!--                民族-->
                <a-cascader
                  v-if="inputGroupRecord.type === 'cascaderEthnicity'"
                  v-model:value="modelFormList[record.key].children[inputGroupRecord.key]"
                  :disabled="record.disabled"
                  :options="ethnicityOptions"
                  :placeholder="$t(record.message)"
                  :size="size"
                  :style="inputGroupRecord.data.style"
                  :changeOnSelect="false"
                />
                <!--                other 其他 label 和 value 的格式选择-->
                <a-cascader
                  v-if="inputGroupRecord.type === 'cascaderOther'"
                  v-model:value="modelFormList[record.key].children[inputGroupRecord.key]"
                  :disabled="record.disabled"
                  :options="inputGroupRecord.data.cascader"
                  :size="size"
                  :style="inputGroupRecord.data.style"
                  placeholder=""
                  :changeOnSelect="false"
                />
                <a-input
                  v-if="inputGroupRecord.type === 'string'"
                  v-model:value="modelFormList[record.key].children[inputGroupRecord.key]"
                  :disabled="record.disabled"
                  :placeholder="$t(inputGroupRecord.message)"
                  :size="size"
                  :style="'width: 100%;' + inputGroupRecord.data.style"
                ></a-input>
              </template>
            </a-input-group>
          </a-form-item>
          <!--        select 选择-->
          <a-form-item
            v-if="record.type === 'select'"
            :key="'select' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>
              {{ record.extra ? $t(record.extra) : '' }}
              <br />
              {{ record.sub_extra }}
            </template>
            <a-select
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :placeholder="$t(record.message)"
              :size="size"
            >
              <a-select-option
                v-for="recordSelect in record.data.list"
                :key="recordSelect"
                :value="recordSelect"
              >
                {{ recordSelect }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="record.type === 'select_options'"
            :key="'select_options' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>
              {{ record.extra ? $t(record.extra) : '' }}
              <br />
              {{ record.sub_extra }}
            </template>
            <a-select
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :options="record.data.list"
              :placeholder="$t(record.message)"
              :size="size"
              mode="multiple"
              option-label-prop="label"
            ></a-select>
          </a-form-item>
          <a-form-item
            v-if="record.type === 'select_new'"
            :key="'select_new' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>
              {{ record.extra ? $t(record.extra) : '' }}
              <br />
              {{ record.sub_extra }}
            </template>
            <a-select
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :dropdownMatchSelectWidth="false"
              :placeholder="$t(record.message)"
              :size="size"
              :options="record.data.list"
            >
              <!--              <a-select-option-->
              <!--                v-for="recordSelect in record.data.list"-->
              <!--                :key="recordSelect.key"-->
              <!--                :disabled="recordSelect.disabled"-->
              <!--              >-->
              <!--                {{ recordSelect.value }}-->
              <!--              </a-select-option>-->
            </a-select>
          </a-form-item>
          <!--        长文本-->
          <a-form-item
            v-if="record.type === 'text'"
            :key="'text' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <a-textarea
              v-model:value="modelFormList[record.key]"
              :auto-size="{ minRows: 4, maxRows: 100 }"
              :disabled="record.disabled"
              :maxlength="filterInputMaxLength(record)"
              :placeholder="$t(record.message)"
              :showCount="record.showCount == false ? false : true"
              :size="size"
            />
            <template #extra>
              {{ filterExtraString(record.extra) }}
            </template>
          </a-form-item>
          <!--        选择 单选-->
          <a-form-item
            v-if="record.type === 'radio'"
            :key="'text' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-radio-group v-model:value="modelFormList[record.key]" :disabled="record.disabled">
              <a-radio
                v-for="secondRecord in record.data.list"
                :key="secondRecord"
                :style="record.data.style"
                :value="secondRecord"
              >
                {{ secondRecord }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            v-if="record.type === 'radio_new'"
            :key="'text' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :style="record.data.style"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-radio-group v-model:value="modelFormList[record.key]" :disabled="record.disabled">
              <a-radio
                v-for="secondRecord in record.data.list"
                :key="secondRecord.key"
                :value="secondRecord.key"
              >
                {{ $t(secondRecord.value) }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            v-if="record.type === 'radioButton'"
            :key="'text' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-radio-group
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              button-style="solid"
            >
              <a-radio-button
                v-for="secondRecord in record.data.list"
                :key="secondRecord"
                :style="record.data.style"
                :value="secondRecord"
              >
                {{ secondRecord }}
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <!--        密码输入框-->
          <a-form-item
            v-if="record.type === 'password'"
            :key="'password' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-input-password
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :placeholder="$t(record.message)"
              :size="size"
            />
          </a-form-item>
          <!--        说明文案-->
          <a-form-item
            v-if="record.type === 'description'"
            :key="'description' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <slot :name="record.key">{{ modelFormList[record.key] }}</slot>
          </a-form-item>
          <!--        选择日期时间-->
          <a-form-item
            v-if="record.type === 'datePicker'"
            :key="'datePicket' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-date-picker
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :inputReadOnly="true"
              :placeholder="$t(record.message)"
              :size="size"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
              style="width: 100%"
              @change="DatePickerChange"
            />
          </a-form-item>
          <!--        选择月份时间-->
          <a-form-item
            v-if="record.type === 'monthPicker'"
            :key="'monthPicker' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-month-picker
              v-model:value="modelFormList[record.key]"
              :disabled="record.disabled"
              :disabled-date="record.data.disabledDate"
              :inputReadOnly="true"
              :locale="locale"
              :placeholder="$t(record.message)"
              :size="size"
              format="YYYY-MM"
              style="width: 100%"
              valueFormat="YYYY-MM"
              @change="DatePickerChange"
            />
          </a-form-item>
          <!--        验证码-->
          <a-form-item
            v-if="record.type === 'captcha'"
            :key="'slot' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-input
              v-model:value="modelFormList[record.key]"
              :maxlength="6"
              :placeholder="$t(record.message)"
              :size="size"
              style="width: 50%;margin-top: 5px"
            ></a-input>
            <a-button
              :disabled="!canClick"
              :size="size"
              style="width: 48.8%; margin-left: 1%;margin-top: 5px"
              type="primary"
              @click="handleOpenSlideVerify"
            >
              {{ $t(content) }}
            </a-button>
          </a-form-item>
          <!--      快速注册页面  验证码-->
          <a-form-item
            v-if="record.type === 'quickCaptcha'"
            :key="'quickcaptcha' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <a-input
              v-model:value="modelFormList[record.key]"
              :maxlength="6"
              :placeholder="$t(record.message)"
              :size="size"
              style="width: 50%;margin-top: 5px"
            ></a-input>
            <a-button
              :disabled="!canClick"
              :size="size"
              style="width: 48.8%; margin-left: 1%;margin-top: 5px"
              type="primary"
              @click="handleQuickCaptcha"
            >
              {{ content }}
            </a-button>
          </a-form-item>
          <!--        自定义插槽-->
          <a-form-item
            v-if="record.type === 'slot'"
            :key="'slot' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <slot :name="record.key" :record="record">{{ record.key }} 默认数据</slot>
          </a-form-item>
          <!--        自定义插槽 label 后自己编辑-->
          <a-form-item
            v-if="record.type === 'valueSlot'"
            :key="'valueSlot' + index"
            :label-col="{ span: labelCol }"
            :name="record.key"
            :wrapper-col="{ span: wrapperCol }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <slot :name="record.key">{{ record }} slot value</slot>
          </a-form-item>
          <!--        自定义插槽-->
          <a-form-item
            v-if="record.type === 'blockslot'"
            :key="'blockslot' + index"
            :label-col="{ span: 0 }"
            :name="record.key"
            :wrapper-col="{ span: 24 }"
            class="mb-0"
          >
            <template #label>
              <b v-if="record.active == true" class="update-form-list-label-active">*</b>
              <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
              <span v-if="colon">:</span>
            </template>
            <template #extra>{{ record.extra ? $t(record.extra) : '' }}</template>
            <slot :name="record.key">{{ record.key }} 独占一行</slot>
          </a-form-item>
          <div v-if="record.type === 'divslot'" :key="'divslot' + index" class="mb-0">
            <slot :name="record.key">{{ record.key }} div独占一行block</slot>
          </div>
          <div v-if="record.type === 'div'" :key="'div' + index" class="mb-0"></div>
        </a-col>
      </a-row>

      <div style="text-align: center; display: flex;justify-content: center">
        <!--        提交按钮左侧插槽-->
        <slot name="left"></slot>
        <a-button
          :block="buttonStyle ? (buttonStyle.onSubmit ? buttonStyle.onSubmit.block : false) : false"
          :disabled="buttonStyle ? buttonStyle.disabled : false"
          :size="!buttonStyle ? 'default' : !buttonStyle.size ? 'default' : buttonStyle.size"
          :style="!buttonStyle ? '' : !buttonStyle.style ? '' : buttonStyle.style"
          type="primary"
          @click="onSubmit"
        >
          <slot name="onSubmit">确定</slot>
        </a-button>
        <!--        提交按钮右侧插槽-->
        <slot name="right"></slot>
        <!--        <a-button @click="resetForm" block style="margin-left: 10%" type="primary">重 置</a-button>-->
      </div>
    </a-form>
  </div>
</template>

<script>
import { getMobileCaptcha } from '@/api/login';
import { EmailCaptcha, QuickCheck } from '@/api/enrollment';
import { message, Modal } from 'ant-design-vue';
// import { codeTimeDown } from '@/utils/util';
import moment from 'moment';
import { reactive, ref, onUnmounted, toRefs, nextTick } from 'vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import judge from '../../../tsinghua/sycamore-admission-client/src/common/js/judge';
// import provinceCities from '@/utils/cascader-address-options';
import countryOptions from '@/utils/cascader-country-options';
import { LOCATION_OPTIONS_EE_PFMP_QUICKAPPLY } from '@/utils/career-options';
import { nationalityOptions, ethnicityOptions } from '@/utils/cascader-nationality-options';
import ReceiverAccount from '../../../tsinghua/sycamore-admission-client/src/views/FormList/modules/receiver-account.vue';
import { useI18n } from 'vue-i18n';
import { debounce } from 'lodash';

export default {
  name: 'FormList',
  components: {
    ReceiverAccount,
  },
  props: {
    layout: {
      type: String,
      default: 'horizontal',
    },
    gutter: {
      type: Array,
      default: () => {
        return [10, { xs: 0, sm: 0, md: 0, lg: 0 }];
      },
    },
    customData: {
      type: Object,
      default: function() {
        return {};
      },
    },
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
    modelForm: {
      type: Object,
      default: null,
    },
    rules: {
      type: Object,
      default: () => {
        return {};
      },
    },
    labelCol: {
      type: Number,
      default: 6,
    },
    wrapperCol: {
      type: Number,
      default: 13,
    },
    size: {
      type: String,
      default: '',
    },
    formName: {
      type: String,
      default: '',
    },
    buttonStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    colon: {
      type: Boolean,
      default: true,
    },
    span: {
      type: Number,
      default: 3,
    },
  },
  // emits: ['update:handleSubmitFn'],
  emits: ['verifyCodeFn', 'quickApplyDataBus', 'handleSubmitFn'],
  setup(props, { emit }) {
    const { t } = useI18n(); // 获取 t 函数
    const state = reactive({
      content: t('EMBA.button.GetCaptcha'),
      canClick: true,
      SliderVerify: null,
      remainingTime: 60,
      totalTime: 60,
    });
    const formRef = ref();
    const modelFormList = reactive(props.modelForm);
    // const rules = props.rules;
    const updateCount = ref(0);
    const maxUpdates = 100;

    const countdownTimer = ref(null);
    // 停止倒计时
    const stopCountdown = () => {
      if (countdownTimer.value) {
        window.clearInterval(countdownTimer.value);
        countdownTimer.value = null;
      }

      state.content = t('EMBA.button.GetCaptcha');
      state.remainingTime = state.totalTime;
      state.canClick = true;
    };

    // 重置倒计时
    const resetCountdown = () => {
      stopCountdown();
    };
    // 改进的倒计时函数
    const startCountdown = () => {
      // 如果已经在倒计时中，直接返回
      if (!state.canClick || countdownTimer.value) return;

      state.canClick = false;
      state.remainingTime = state.totalTime;
      state.content = state.remainingTime + 's' + t('EMBA.button.CaptchaReset');

      countdownTimer.value = window.setInterval(() => {
        state.remainingTime--;
        state.content = state.remainingTime + 's' + t('EMBA.button.CaptchaReset');

        // 倒计时结束
        if (state.remainingTime <= 0) {
          stopCountdown();
        }
      }, 1000);
    };
    // let clock;

    const codeTimeDown = () => {
      startCountdown();
      // console.log('获取验证码', state.canClick);
      // if (!state.canClick) return;
      // state.canClick = false;
      // state.content = state.totalTime + 's' + t('EMBA.button.CaptchaReset');
      // window.setInterval(() => {
      //   state.totalTime--;
      //   state.content = state.totalTime + 's' + t('EMBA.button.CaptchaReset');
      //   if (state.totalTime < 0) {
      //     window.clearInterval(clock);
      //     state.content = t('EMBA.button.GetCaptcha');
      //     state.totalTime = 60;
      //     state.canClick = true; //这里重新开启
      //   }
      // }, 1000);
    };

    const safeUpdate = fn => {
      if (updateCount.value > maxUpdates) {
        console.warn('Exceeded maximum update limit');
        return;
      }
      updateCount.value++;
      fn();
      nextTick(() => {
        updateCount.value = 0;
      });
    };

    const onSubmit = () => {
      safeUpdate(() => {
        formRef.value
          .validate()
          .then(() => {
            emit('handleSubmitFn', modelFormList);
          })
          .catch(error => {
            console.log('error', error);
          });
      });
      // formRef.value
      //   .validate()
      //   .then(() => {
      //     // // console.log(moment(toRaw(modelFormList).monthPicker).format('YYYY-MM')); // 格式化当前选择日期
      //     // modelFormList.datePicker = moment(toRaw(modelFormList).datePicker).format('YYYY-MM-DD');
      //     // modelFormList.monthPicker = moment(toRaw(modelFormList).datePicker).format('YYYY-MM');
      //     emit('handleSubmitFn', modelFormList);
      //   })
      //   .catch(error => {
      //     console.log('error', error);
      //   });
    };
    const resetForm = () => {
      // formRef.value.resetFields();
      formRef.value.resetFields();
    };
    onUnmounted(() => {
      stopCountdown();
      // console.log('======组件 formlist 已经卸载 ======');
    });

    // 过滤 extra
    const filterExtra = data => {
      // console.log(data);
      const flag = ref('');
      const keySuccess = new RegExp(/success/g);
      const keyFail = new RegExp(/fail/g);
      if (keySuccess.test(data)) {
        flag.value = 'success';
      } else if (keyFail.test(data)) {
        flag.value = 'fail';
      } else {
        flag.value = '';
      }
      return flag.value;
    };
    const filterExtraString = data => {
      if (!data) {
        return;
      }
      // console.log(data);
      const str = ref('');
      str.value = data.replace(/success|fail/g, '');
      str.value = t(str.value);
      return str.value;
    };
    // 重置当前手机号 以及 数据
    const confirmReset = () => {
      location.reload();
    };
    // 创建防抖验证函数
    const debouncedValidate = debounce(field => {
      if (formRef.value) {
        formRef.value.validate(field);
      }
    }, 300);
    const validateArr = k => {
      debouncedValidate(k);
    };
    // select 单独校验制定项
    const handleSelectFormList = e => {
      validateArr(e);
    };
    /**
     * 过滤 配置文件中 text string 的 input maxlength
     */
    const filterInputMaxLength = re => {
      let length = undefined;
      if (re.data) {
        length = re.data.maxLength ? re.data.maxLength : undefined;
      } else {
        length = undefined;
      }
      return length;
    };
    const initStyle = data => {
      if (data) {
        return data.style ? data.style : '';
      }
      return '';
    };
    /**
     * 根据项目不同设置不同的展示列数
     * @params.block // 当前数据是否是单行 显示
     * @params.col // 当前数据分几列 展示
     */
    const initCol = (block, col) => {
      if (block === true || block == undefined) {
        return 24;
      } else {
        return col ? 24 / col : 8;
      }
    };
    /**
     * 获取手机哈验证码
     */
    const handleGetYZCode = () => {
      // 注册过的手机号才允许获取验证码
      codeTimeDown();
      const params = {
        mobile: modelFormList.mobile,
      };
      getMobileCaptcha(params)
        .then(res => {
          if (res.code == 200) {
            message.success(res.msg);
          } else {
            stopCountdown();
            message.warning(res.msg);
          }
        })
        .catch(err => {
          console.err(err);
          message.error('操作失败');
        });
    };
    const DatePickerChange = e => {
      if (e) {
        console.log(moment(e).format('YYYY-MM-DD'));
      }
    };

    const handlePostQuickCheck = () => {
      if (props.customData && props.customData.flag === 'email') {
        const email_params = {
          email: props.customData.email,
        };
        EmailCaptcha(email_params).then(res => {
          if (res.code === 200) {
            message.success(res.msg);
          } else {
            message.warn(res.msg);
          }
        });
      } else {
        const params = {
          mobile: modelFormList.mobile,
        };
        // params.mobile = this.modelFormList.mobile;
        getMobileCaptcha(params)
          .then(res => {
            message.success(res.msg);
          })
          .catch(() => {
            // console.log(err);
            // message.error(err.response.data.detail);
          });
      }
      // 注册过的手机号才允许获取验证码
      codeTimeDown();
      return false;
      const params = {
        mobile: modelFormList.mobile,
        // eslint-disable-next-line
        project_id: sessionStorage.getItem("PROJECT_ID"),
      };
      QuickCheck(params)
        .then(res => {
          emit('quickApplyDataBus', res);
          if (res.code == 200) {
            message.success(res.msg);
          } else if (res.code == 601) {
            Modal.confirm({
              title: '手机号状态',
              content: res.msg + '您可以直接前往登录！',
              okText: '去登录',
              onOk: () => {
                window.location.href = window.location.origin + '/login';
              },
            });
          } else if (res.code == 400) {
            message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          message.error(err.response.data.detail);
        });
    };
    const handleOpenSlideVerify = () => {
      if (props.customData && props.customData.flag === 'email') {
        if (!judge.email(props.customData.email)) {
          message.error(t('EMBA.quick.FormData.AccountEmailError'));
          return;
        }
      } else {
        if (!judge.phone(modelFormList.mobile)) {
          message.error(t('EMBA.quick.FormData.MobileError2'));
          return;
        }
      }
      // eslint-disable-next-line
      emit('verifyCodeFn', 0);
      // handleGetYZCode();
      handlePostQuickCheck();
    };
    /**
     * 快速注册页面 获取手机验证码  新接口
     */
    const handleQuickCaptcha = () => {
      if (props.customData && props.customData.flag === 'email') {
        if (!judge.email(props.customData.email)) {
          message.error('邮箱错误');
          return;
        }
      } else {
        if (!judge.phone(modelFormList.mobile)) {
          message.error('手机号错误');
          return;
        }
      }
      emit('verifyCodeFn', 0);
      handlePostQuickCheck();
    };
    return {
      handleQuickCaptcha,
      handlePostQuickCheck,
      handleGetYZCode,
      handleOpenSlideVerify,
      DatePickerChange,
      initCol,
      initStyle,
      filterInputMaxLength,
      ...toRefs(state),
      handleSelectFormList,
      validateArr,
      confirmReset,
      filterExtra,
      filterExtraString,
      formRef,
      modelFormList,
      // modelForm,
      // rules,
      onSubmit,
      resetForm,
      moment,
      locale, // 语言
      provinceCities: LOCATION_OPTIONS_EE_PFMP_QUICKAPPLY,
      countryOptions,
      nationalityOptions, // 国籍
      ethnicityOptions, // 民族
      COMPANY_INDUSTRY_OPTIONS_WIN: [
        {
          value: '金融',
          label: '金融',
          children: [
            { label: '银行', value: '银行' },
            { label: '证券公司', value: '证券公司' },
            { label: '期货公司', value: '期货公司' },
            { label: '公募 / 对冲基金', value: '公募 / 对冲基金' },
            { label: '信托公司', value: '信托公司' },
            { label: '财务公司', value: '财务公司' },
            { label: '风险投资', value: '风险投资' },
            { label: '金融服务', value: '金融服务' },
            { label: '其他', value: '其他' },
          ],
        },
        {
          value: '非金融',
          label: '非金融',
          children: [
            { label: '政府 / 非营利性', value: '政府 / 非营利性' },
            { label: '交通 / 运输物流', value: '交通 / 运输物流' },
            { label: '综合 / 多元经营', value: '综合 / 多元经营' },
            { label: '钢铁 / 矿业', value: '钢铁 / 矿业' },
            { label: '批发 / 零售 / 贸易', value: '批发 / 零售 / 贸易' },
            { label: '医药 / 生物 / 保健', value: '医药 / 生物 / 保健' },
            { label: '教育 / 培训 / 科研', value: '教育 / 培训 / 科研' },
            { label: '传媒 / 文化', value: '传媒 / 文化' },
            { label: '咨询 / 律师 / 会计 / 评估师', value: '咨询 / 律师 / 会计 / 评估师' },
            { label: '能源 / 化工', value: '能源 / 化工' },
            { label: '房地产 / 建筑', value: '房地产 / 建筑' },
            { label: '制造业', value: '制造业' },
            { label: '电信 / IT', value: '电信 / IT' },
            { label: '其他', value: '其他' },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.record-list {
  width: 100%;
}

.mb-0 {
  //margin-bottom: 0 !important;
}
.pt-5 {
  padding-top: 5px;
}

.update-form-list-label-active {
  color: #bb133e;
}
</style>
