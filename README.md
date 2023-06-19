## advanced

### 1. models-2-modules

### why?

Because backend development often lacks professional knowledge of vue-router, and they also do not know how to map the views corresponding to front-end routing, a model can be agreed upon between the front-end and back-end, and the front-end can produce modules based on the model, and then generate available routing tables through the modules

```js
// router/before-each.js

import models2Modules from 'vue-router-tools/models-2-modules';

const { modelOptions, models } = models2Modules(await fetch('/get-models'));
```

```js
// What should models look like

[
  {
    model: 'course',
    name: '课程',
    includes: ['list'],
    options: {
      status: {
        0: '未完成',
        1: '进行中',
        2: '已完成'
      }
    },
    actions: {
      read: 'read'
    },
    children: [
      {
        model: 'my-group-child',
        name: '我的课程',
        actions: {
          enable: 'enable'
        }
      }
    ]
  }
];
```

|          | required |                                                         desc                                                          | 默认值                                       |
| -------- | -------- | :-------------------------------------------------------------------------------------------------------------------: | -------------------------------------------- |
| model    | Y        |                                                     define model                                                      |                                              |
| name     | Y        |                                                   description model                                                   |                                              |
| children | N        |                                                       children                                                        |                                              |
| options  | N        | the option data source for each control in the list query must be specified internally before storing the option data |                                              |
| actions  | N        |         the operations in the table row, where key is used by the front-end and value is the interface suffix         |                                              |
| includes | N        |                      define the functional modules for adding, deleting, modifying, and querying                      | ['list','detail','create','update','delete'] |
