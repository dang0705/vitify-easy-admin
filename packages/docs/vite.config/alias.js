import path from "node:path";
const workspace = path.join(__dirname, "../");
const vue2WorkSpace = path.join(__dirname, "../../../packages/vue-2/");
const resolvePath = (dir) => path.join(workspace, dir);
const resolveVue2Path = (dir) => path.join(vue2WorkSpace, dir);

export default {
  resolve: {
    alias: {
      "@": resolvePath("src"),
      "module-utils": resolveVue2Path("src/utils/for-modules"),
      components: resolveVue2Path("src/components"),
      composables: resolveVue2Path("src/composables"),
      configuration: resolveVue2Path("src/configuration"),
      definition: resolveVue2Path("src/definition"),
      form: resolveVue2Path("src/components/form"),
      plugins: resolveVue2Path("src/plugins"),
      router: resolveVue2Path("src/router"),
      regexp: resolveVue2Path("src/regexp"),
      store: resolveVue2Path("src/store"),
      styles: resolveVue2Path("src/styles"),
      utils: resolveVue2Path("src/utils"),
      views: resolveVue2Path("src/views"),
      mock: resolvePath("mock"),
    },
    dedupe: ["vue", "vuetify"],
  },
};
