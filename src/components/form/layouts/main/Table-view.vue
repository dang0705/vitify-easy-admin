<template>
  <v-data-table
    fixed-header
    calculate-widths
    hide-default-footer
    checkbox-color="primary"
    :hide-default-header="!loading && !list.length"
    :headers="thead"
    :items="list"
    :disable-sort="!sort"
    :show-select="selected"
    :item-key="idKey"
    :loading="loading"
    :item-class="itemClass"
    :page="page"
    :server-items-length="total"
    class="list-view elevation-4 rounded-lg tw-w-full"
    @input="onSelect"
  >
    <template #top>
      <v-toolbar flat height="extended">
        <v-toolbar-items class="tw-w-full tw-flex-col tw-items-start tw-px-4">
          <Form-view
            v-if="mergedSearchFormConfig.length"
            v-model="searchForm"
            :form-config="mergedSearchFormConfig"
            ref="formView"
            class="tw-mb-6 tw-w-full tw-pt-2"
            use-grid
            @reset="getData"
          />
          <v-btn
            v-if="modules[moduleName]?.apis.create"
            class="tw-mt-6 tw-h-8 tw-rounded-3xl tw-px-6 tw-py-2"
            elevation="2"
            color="primary"
            min-width="100"
            @click="onCreate"
          >
            <v-icon> mdi-plus</v-icon>
            {{ createBtnText || `创建${currentMenuName}` }}
          </v-btn>
          <template v-for="action in topBarActions"> </template>
        </v-toolbar-items>
        <v-spacer />
        <!--    table-row/detail action dialog-->
        <Action-dialog
          v-if="showDialog !== null"
          v-model="showDialog"
          v-bind="dialogAction"
          :feedback="feedback"
        />
      </v-toolbar>
    </template>
    <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
    <template #item.actions="{ item }">
      <TableRowActions
        ref="tableRowActionsComp"
        :action-config="rowActions"
        :model="moduleName"
        :data="item"
        :refresh-data="getData"
      />
    </template>
    <template #footer>
      <div v-if="mobile" class="tw-flex tw-justify-center">
        <v-progress-circular
          v-show="mobile2Bottom && loading"
          indeterminate
          bottom
          color="primary"
        />
        <p
          v-if="pages && page === pages && !loading"
          class="tw-text-sm tw-text-gray-500"
        >
          没有更多了哦
        </p>
      </div>
      <v-pagination v-else-if="pages > 1" :length="pages" v-model="page" />
    </template>
  </v-data-table>
</template>

<script setup>
  import ActionDialog from 'components/controls/action-dialog/index.vue';
  import tableViewProps from 'form/layouts/main/table-view-props';
  import TableRowActions from 'form/layouts/minor/Table-row-actions.vue';
  import debounce from 'utils/debounce';
  import statusOptions from 'module-utils/status-options';
  import { READ_LIST } from 'module-utils/CRUD';
  import { useRoute } from 'vue-router/composables';
  import { useModuleStore } from 'store/modules-store';
  import { useModuleName } from 'form/layouts/composables';
  import { useVuetify } from 'composables';

  const { mobile } = useVuetify();
  const props = defineProps(tableViewProps);
  const moduleName = useModuleName(props);
  provide('module', moduleName.value);
  provide('idField', props.idKey);

  const {
    currentModule,
    currentMenuName,
    modules,
    options: {
      value: { [moduleName.value]: currentModuleStatus = {} } = {}
    } = {}
  } = storeToRefs(useModuleStore());

  const emits = defineEmits(['input', 'selected']);

  props.thead.forEach(
    (thead) => thead.fixed && (thead.cellClass = thead.class = 'td-fixed')
  );

  // Merge search form config start

  const mergedSearchFormConfig = ref([]);
  props.formConfig.forEach((config) =>
    mergedSearchFormConfig.value.push(
      currentModuleStatus.hasOwnProperty(config.key) && !config.options
        ? { ...config, options: statusOptions(currentModuleStatus[config.key]) }
        : config
    )
  );
  // Merge search form config end

  // Read list -- start
  const size = 10;
  const searchForm = ref({});
  const loading = ref(false);
  const total = ref(0);
  const page = ref(1);
  const topBarActions = ref([]);
  const pages = computed(() => Math.ceil(total.value / size));
  const list = ref([]);
  let mobile2Bottom = ref(false);
  const scroll = ([
    {
      target: {
        scrollingElement: { offsetHeight, scrollTop, scrollHeight }
      }
    }
  ]) => (mobile2Bottom.value = offsetHeight + scrollTop + 2 >= scrollHeight);

  const onScrColl = (e) => debounce(scroll, 100)(e);
  const getData = async () => {
    loading.value = true;
    try {
      const {
        topbarActions = [],
        list: l = [],
        total: t
      } = await READ_LIST(moduleName.value, {
        ...searchForm.value,
        page: page.value,
        size
      });
      topBarActions.value = topbarActions;
      total.value = t;
      list.value = mobile ? list.value.concat(l) : l;
    } catch (e) {
    } finally {
      await nextTick();
      loading.value = false;
    }
  };
  provide('refreshData', getData);
  watch(
    () => useRoute().name,
    (model) => console.log(model)
  );
  watch(() => page.value, getData);
  watch(
    () => mobile2Bottom.value,
    (bottom) => bottom && page.value < pages.value && page.value++
  );
  // Read list -- end

  // Operate dialog -- start
  const tableRowActionsComp = ref(null);
  const formView = ref(null);
  let showDialog = ref(null);
  let dialogAction = ref({});
  let feedback = ref(false);

  useBus.on('open-action-dialog', ({ type, action, data }) => {
    showDialog.value = true;
    const isDetail = type === 'detail';
    feedback.value = isDetail;
    dialogAction.value = {
      ...action,
      ...(isDetail ? { title: `编辑${currentMenuName.value}` } : {}),
      data
    };
  });
  const onCreate = () => {
    if (props.useDetailDialog) {
      const { ele } =
        tableRowActionsComp.value?.actions.find(
          ({ type }) => type === 'detail'
        ) || {};
      const formConfigs = ele || props.dialogDetailFormConfig;

      dialogAction.value = {
        ele: formConfigs,
        title: `创建${currentMenuName.value}`,
        data: formView.value.initFormDataByConfig(formConfigs)
      };
      showDialog.value = feedback.value = true;
      return;
    }
    $router.push({ name: `${moduleName.value}.detail` });
  };
  // Operate dialog -- end

  const onSelect = (arr) =>
    emits(
      'input',
      arr.map(({ [props.idKey]: id }) => id)
    );

  onMounted(() => {
    mobile && window.addEventListener('scroll', onScrColl);
    getData();
  });
  onUnmounted(() => mobile && window.removeEventListener('scroll', onScrColl));
</script>

<style lang="scss" scoped>
  .list-view {
    ::v-deep {
      .v-data-table__mobile-row {
        align-items: flex-start;
        padding-top: 6px;
        padding-bottom: 6px;
        .v-data-table__mobile-row__header {
          flex-shrink: 0;
        }
      }
      .v-tr:has(.td-fixed) {
        &:hover {
          background: none !important;
        }
      }
      .td-fixed {
        background-color: #fff;
        position: sticky;
        right: 0;
        left: 0;
      }
    }
  }
</style>
