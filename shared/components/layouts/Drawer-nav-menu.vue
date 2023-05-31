<template>
  <v-navigation-drawer
    v-model="show"
    :color="color"
    :app="app"
    :temporary="temporary"
    :fixed="fixed"
    :right="right"
    :class="[{ 'tw-z-50': mobile }, 'tw-flex-shrink-0']"
  >
    <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>

    <v-list :shaped="shaped && !mobile" :nav="mobile" subheader>
      <v-list-item-group
        v-model="group"
        active-class="tw-bg-primary tw-font-bold tw-text-white"
      >
        <v-list-item
          v-for="{ name, key, title, meta: { menuName } = {} } in menus"
          :key="key || name"
          v-bind="
            router
              ? {
                  to: { name: key || name },
                  exactPath: maybeFunctional({
                    data: exactPath,
                    params: [key || menuName, name, title]
                  })
                }
              : {}
          "
        >
          <v-list-item-icon>
            <slot name="list-icon" v-bind="{ name, key, title }" />
          </v-list-item-icon>
          <v-list-item-content>
            <slot name="list-Name" v-bind="{ name: title || menuName }">
              <v-list-item-title v-text="title || menuName" />
            </slot>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup inherit-attrs="false">
  import maybeFunctional from '@utils/maybe-functional';

  const props = defineProps({
    app: {
      type: Boolean,
      default: false
    },
    expend: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'white'
    },
    defaultTextColor: {
      type: String,
      default: 'black'
    },
    static: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array,
      default: () => []
    },
    router: {
      type: Boolean,
      default: true
    },
    right: {
      type: Boolean,
      default: false
    },
    temporary: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    shaped: {
      type: Boolean,
      default: false
    },
    exactPath: {
      type: [Boolean, Function],
      default: false
    }
  });

  defineOptions({
    model: {
      prop: 'expend',
      event: 'item-click'
    }
  });
  const emit = defineEmits(['item-click']);

  const show = computed({
    get: () => props.expend,
    set: (value) => emit('item-click', value)
  });

  const {
    proxy: {
      $vuetify: {
        breakpoint: { mobile }
      }
    }
  } = getCurrentInstance();

  let group = ref(0);

  watch(
    () => group.value,
    () => !props.static && emit('item-click', false)
  );
</script>
