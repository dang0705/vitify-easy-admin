<template>
  <v-data-table
    v-if="list"
    fixed-header
    calculate-widths
    hide-default-footer
    :headers="thead"
    :items="list"
    :disable-sort="!sort"
    :show-select="selected"
    :item-key="idKey"
    :checkbox-color="$primary"
    :loading="loading"
    :item-class="itemClass"
    :page="page"
    :server-items-length="total"
    class="list-view elevation-4 rounded-lg tw-w-full"
    @input="onSelect"
  >
    <template #top>
      <v-toolbar flat height="extended">
        <v-toolbar-items class="tw-w-full tw-flex-col tw-px-4 tw-items-start">
          <Form-view
            v-if="mergedSearchFormConfig.length"
            v-model="searchForm"
            :form-config="mergedSearchFormConfig"
            ref="formView"
            class="tw-w-full tw-mb-6 tw-pt-2"
            use-grid
            @search="getData"
          />
          <v-btn
            v-if="models[modelName]?.apis.create"
            class="tw-mt-6 tw-py-2 tw-h-8 tw-px-6 tw-rounded-3xl"
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
          @close-dialog="dialogAction = {}"
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
        :model="modelName"
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
      <v-pagination v-else :length="pages" v-model="page" />
    </template>
  </v-data-table>
</template>

<script setup>
  import TableRowActions from '@admin-minor/Table-row-actions.vue';
  import ActionDialog from '@controls/action-dialog/index.vue';
  import listViewProps from '@admin-main/table-view-props';
  import debounce from '@utils/debounce';
  import statusOptions from '@admin-utils/status-options';
  import { getModelList } from '@admin-utils/model-CRUD';
  import { useRoute } from 'vue-router/composables';
  import { useModelStore } from '@store/current-route-model-store';
  import { useBus } from '@bus';
  import { OPEN_ACTION_DIALOG } from '@/define/emit-event';

  const {
    proxy: {
      $vuetify: {
        breakpoint: { mobile }
      }
    }
  } = getCurrentInstance();

  const modelName = computed(() => props.model || currentModel.value);

  const {
    currentModel,
    currentMenuName,
    models,
    options: { value: { [modelName.value]: currentModelStatus = {} } = {} } = {}
  } = storeToRefs(useModelStore());

  const emits = defineEmits(['input', 'selected']);
  const props = defineProps(listViewProps);
  props.thead.forEach(
    (thead) => thead.fixed && (thead.cellClass = thead.class = 'td-fixed')
  );
  provide('keyName', props.idKey);
  provide('model', modelName.value);

  // Merge search form config start

  const mergedSearchFormConfig = ref([]);
  props.searchFormConfig.forEach((config) =>
    mergedSearchFormConfig.value.push(
      currentModelStatus.hasOwnProperty(config.key) && !config.options
        ? { ...config, options: statusOptions(currentModelStatus[config.key]) }
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
      } = await getModelList(modelName.value, {
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

  useBus.on(OPEN_ACTION_DIALOG, ({ type, action, data }) => {
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
    $router.push({ name: `${modelName.value}.detail` });
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
      .v-data-table__mobile-table-row {
        &:hover {
          background: none !important;
        }
      }
      .v-data-table__mobile-row {
        align-items: flex-start;
        padding-top: 6px;
        padding-bottom: 6px;
        .v-data-table__mobile-row__header {
          flex-shrink: 0;
        }
      }
      .text-start {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
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
