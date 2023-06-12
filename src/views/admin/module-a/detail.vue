<template>
  <detail-view
    :form-config="formConfig"
    :pagination-options="{ confirm: true }"
    submit-text="确定"
  >
    <template #left_text="{ formData }">
      <i-select
        v-model="formData.slotType"
        :form-data="formData"
        :clearable="false"
        :config="{
          itemText: 'label',
          options: [
            {
              label: '上海',
              value: 'sh'
            },
            {
              label: '北京',
              value: 'bj'
            }
          ],
          change({ config, formConfigs, value, formData }) {
            formData.text = '';
          }
        }"
      />
    </template>
    <!--    <template #left-inner_text> </template>
    <template #right-inner_text> </template>
    <template #right_text> </template>-->
    <!--    <template #left-inner-text>
      <p>left-text</p>
    </template>
    <template #right-inner-text>
      <p>right-text</p>
    </template>
    &lt;!&ndash;    <template #right-text> </template>&ndash;&gt;
    <template #on-text>
      <p>aaa</p>
    </template>
    <template #under-text>
      <p>bbb</p>
    </template>
    <template #append-text>
      <p>apo</p>
    </template>-->
  </detail-view>
</template>

<script setup>
  import DetailView from 'form/layouts/main/Detail-view.vue';

  const formConfig = [
    [
      {
        control: 'IText',
        key: 'text',
        label: '文本框',
        required: true,
        max: 25,
        // ruleType: 'phone',
        // readonly: true,
        /*      slot: {
        left: {
          control: 'i-select',
          bind: {
            config: {
              items: [{ label: '上海', value: 'sh' }]
            }
          }
        }
      },*/
        useRef: true,
        change({ config, formConfigs, value, formData, refs }) {
          console.log(refs);
          refs['type-i-select'].config.options = [
            { label: '北京', value: 'bj' }
          ];
        },
        show: ({ type }) => type === 'sh',
        created() {
          // console.log('text-created');
        },
        mounted() {
          // console.log('text-mounted');
        }
      },
      {
        control: 'i-select',
        key: 'type',
        label: '下拉框',
        itemText: 'label',
        useRef: true,
        options: [
          {
            label: '上海',
            value: 'sh'
          }
        ],
        change({ config, formConfigs, value, formData, refs }) {
          !value && (formData.slotType = null);
        }
      }
    ],
    [
      {
        control: 'i-checkbox',
        key: 'selected',
        label: '复选框',
        allChecked: true,
        value: [],
        // rules: [(value) => !!value?.length || '不得少于一项'],
        change({ config, formConfigs, value, formData }) {
          formData.type = null;
        },
        options: [
          {
            label: '一',
            value: 1
          },
          {
            label: '二',
            value: 2
          }
        ]
      },
      {
        control: 'i-radio',
        key: 'gender',
        label: '选项',
        value: 1,
        options: [
          {
            label: '男',
            value: 1
          },
          {
            label: '女',
            value: 0
          }
        ]
      }
    ],
    [
      {
        control: 'i-textarea',
        key: 'textArea',
        label: '文本域',
        itemText: 'label',
        options: [
          {
            label: '上海',
            value: 'sh'
          }
        ]
      },
      {
        control: 'i-test-custom-comp',
        key: 'action',
        label: '自定义组件',
        value: 321
      }
    ]
  ];
</script>
