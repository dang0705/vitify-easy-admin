export function useVuetify() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(`useVuetify should be called in setup().`);
  }
  const { $vuetify } = instance.proxy;
  return {
    $vuetify,
    breakpoint: $vuetify.breakpoint,
    theme: $vuetify.theme
  };
}
