import debounce from '@utils/debounce';
import { getModelList } from '@admin-utils/model-CRUD';
import { useRoute } from 'vue-router/composables';
import { computed, ref, watch, provide } from 'vue';

const size = 10;
const searchForm = ref({});
const loading = ref(false);
const total = ref(0);
const page = ref(1);
const topBarActions = ref([]);
const pages = computed(() => Math.ceil(total.value / size));
const list = ref([]);
const mobile2Bottom = ref(false);
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
    } = await getModelList(moduleName.value, {
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

export {
  searchForm,
  loading,
  total,
  page,
  topBarActions,
  pages,
  list,
  mobile2Bottom,
  scroll,
  onScrColl,
  getData
};
