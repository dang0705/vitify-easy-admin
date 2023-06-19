<template>
  <div>
    {{ value }}
    <v-btn @click="onClick">保存</v-btn>
  </div>
</template>

<script>
  import defineInputControl from 'form/controls/mixins/define-input-control';
  import { computed } from 'vue';

  export default defineInputControl({
    name: 'test-custom-comp',
    data() {
      return {
        testData: 1
      };
    },
    computed: {
      testConfig() {
        return this.config;
      }
    },
    methods: {
      onClick() {
        // This will trigger the setter of the computed "value", internally using emit to update the external data
        this.value = 123;
      }
    },
    setup(_, { emit }) {
      const testSetup = computed(() => 'testSetUp');
      return {
        testSetup
      };
    }
  });
</script>
