<template>
  <detail-view :form-config="formConfig" />
</template>

<script setup>
  import DetailView from 'form/layouts/main/Detail-view.vue';

  const formConfig = [
    {
      type: 'text',
      key: 'text',
      label: '文本框',
      required: true,
      max: 25,
      inputType: 'phone',
      // readonly: true,
      value: '测试测试'
    },
    {
      type: 'select',
      key: 'type',
      label: '下拉框',
      itemText: 'label',
      options: [
        {
          label: '上海',
          value: 'sh'
        }
      ],
      change({ config, formConfigs, value, formData }) {
        console.log(formConfigs);
      }
    },
    {
      type: 'checkbox',
      key: 'selected',
      label: '复选框',
      allChecked: true,
      value: [],
      rules: [(value) => !!value?.length || '不得少于一项'],
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
      type: 'radio',
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
    },
    {
      type: 'test-custom-comp',
      key: 'action',
      label: '自定义组件',
      value: 321
    },
    {
      type: 'textarea',
      key: 'textArea',
      label: '文本域',
      itemText: 'label',
      options: [
        {
          label: '上海',
          value: 'sh'
        }
      ]
    }
  ];
</script>
