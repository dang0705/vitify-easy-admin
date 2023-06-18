## Defines a form control( formConfig )

### 1、Control naming conventions: ' i-[control-name] ', Please name it on the premise that the actual control is used, and the vue file name must be the same as the control name, otherwise the automatic install cannot be completed

### 2、Pass the formConfig into Detail-view or Table-view, and then internally it will continue to Form-view, and a copy of the form object formData will be automatically generated to finally submit the request. The key of each configuration item is the field of the request payload

### 3、Inside each control, there is a single copy of the config property from the formConfig traversal, which can be internally used with config.XXX as a placeholder for the custom property and custom extended in the formConfig

```vue
<template>
  <DetailView :form-config="formConfig" />
</template>
<script setup>
  import DetailView from './Detail-view.vue';

  const formConfig = [
    {
      /*The basic properties of the control*/
      control: 'i-select',
      label: 'foo',
      key: 'selection',
      required: true,
      useRef: true,
      rules: [],
      change: ({ config, formConfig, value, formData, refs }) => {},
      show: (formData, refs) => {},
      created() {},
      mounted() {},
      beforeDestroyed() {},
      destroyed() {},
      options: [{ text: 'foo', value: 'bar' }],

      /*Extensible custom properties*/
      ...extraProps
    }
  ];
</script>
```

| Properties                                | ILLUSTRATE                                                                                                                                                                  | DATA TYPE | Return parameters                       |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------- |
| control                                   | THE NAME OF THE CONTROL                                                                                                                                                     | String    |                                         |
| label                                     | label                                                                                                                                                                       | String    |                                         |
| key                                       | The payload field name corresponding to the request                                                                                                                         | String    |                                         |
| required                                  | Whether it is required                                                                                                                                                      | Boolean   |                                         |
| max                                       | Text maximum                                                                                                                                                                | Number    |                                         |
| useRef                                    | Must be enabled for sibling controls as well as their own ref queries                                                                                                       | Boolean   |                                         |
| rules                                     | Form validation rules https://v2.vuetifyjs.com/zh-Hans/api/v-input/#props-rules https://v2.vuetifyjs.com/zh-Hans/components/forms/#section-63d04ea44e0e9a8c8bc1-26-6e059664 | []        |                                         |
| change                                    | change event                                                                                                                                                                | Function  | {config,formConfig,value,formData,refs} |
| show                                      | show hooks                                                                                                                                                                  | Function  | {formData,refs}                         |
| created/mounted/beforeDestroyed/destroyed | The additional control lifecycle, executed after the corresponding lifecycle function of the control itself, can be used internally                                         | Function  |                                         |
| options                                   | Data source                                                                                                                                                                 |           |                                         |

## An explanation of the format of the internal fields of the refs object returned by the change event and the show function:

```js
// The wrapper of control  ui-inout
`${key}-input`;
// All properties and methods under this ref can be used, such as refs['${key}-input'].show=false then the control will be hidden

// The control itself
`${key}-${control}`;
```
