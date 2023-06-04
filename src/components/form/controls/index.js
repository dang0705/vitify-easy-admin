import Vue, { defineAsyncComponent } from 'vue';
import cfl from 'utils/capitalize-the-first-letter';
import kebab2Camel from 'utils/kebab-2-camel';
const components = import.meta.glob('/src/components/form/controls/*.vue');

for (let component in components) {
  const name = component.substring(
    component.lastIndexOf('/') + 1,
    component.lastIndexOf('.')
  );
  Vue.component(
    `Input${cfl(kebab2Camel(name))}`,
    defineAsyncComponent(components[component])
  );
}
