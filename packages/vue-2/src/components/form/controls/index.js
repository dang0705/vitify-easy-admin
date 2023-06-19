import Vue, { defineAsyncComponent } from 'vue';
import loadingComponent from 'form/controls/loading-component.vue';
const components = import.meta.glob(
  '/src/components/form/controls/{i,I}-*.vue'
);
for (let component in components) {
  const name = component.substring(
    component.lastIndexOf('/') + 1,
    component.lastIndexOf('.')
  );
  const loader = components[component];
  Vue.component(
    name,
    defineAsyncComponent({
      loader,
      loadingComponent
    })
  );
}
