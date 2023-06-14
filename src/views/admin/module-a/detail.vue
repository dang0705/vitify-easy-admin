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
          useRef: true,
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
          change({ config, formConfig, value, formData, refs }) {
            formData.text = '';
          }
        }"
      />
    </template>
  </detail-view>
</template>
<script setup>
  import DetailView from 'form/layouts/main/Detail-view.vue';

  const formConfig = [
    [
      {
        control: 'i-text',
        key: 'text',
        label: '文本框',
        required: true,
        max: 25,
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
        change({ config, formConfig, value, formData, refs }) {
          // console.log(refs);
          refs['type-input'].show = false;
          // console.log((formConfig[1].label = 'changed-label'));
        },
        /*   show: ({ type }, refs) => {
          return type === 'sh';
        },*/
        created() {
          // console.log('text-created');
        },
        mounted() {
          // console.log('text-mounted');
        }
      },
      {
        control: 'i-date-picker',
        key: 'date',
        label: '时间选择器'
      },
      {
        control: 'i-editor',
        key: 'html',
        label: '富文本',
        required: true
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
        mounted() {
          console.log('mounted');
        },
        change({ config, formConfig, value, formData, refs }) {
          // !value && (formData.slotType = null);
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
        change({ config, formConfig, value, formData }) {
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
