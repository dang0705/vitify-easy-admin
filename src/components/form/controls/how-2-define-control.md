## 定义表单控件( form-config )

### 1、控件命名规范: ' i-control-name ', 'control-name' 请以实际控件的用途为前提命名

### 2、控件的配置将以 formConfig 的属性 props 进入 Detail-view、Form-view 及 Table-view，并会自动生成一份最终的用以提交请求的表单对象 formData。每个配置项的 key 即请求 payload 的 field 字段

### 3、在每个控件内部，都有一份来自于 formConfig 遍历之后得到的单份 config 属性，可内部使用 config.XXX 作为自定义属性的占位符，并在 formConfig 对应的控件配置中声明

```js
[
  {
    /*控件基本属性*/
    control: 'i-select',
    label: '下拉框',
    key: 'selection',
    required: true,
    max: 10,
    useRef: true,
    change: ({ config, formConfigs, value, formData, refs }) => {},
    show: (formData, refs) => {},
    created() {},
    mounted() {},
    beforeDestroyed() {},
    destroyed() {},
    options: [{ text: 'foo', value: 'bar' }],

    /*vuetify控件属性 https://v2.vuetifyjs.com/zh-Hans/components/selects/*/
    ...vuetifyProps,

    /*可扩展自定义属性*/
    ...otherExtraProps
  }
];
```
