export function useInstance() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(`useInstance should be called in setup().`);
  }
  return instance.proxy;
}

export function useVuetify() {
  const instance = useInstance();
  const { $vuetify } = instance;
  return {
    $vuetify,
    breakpoint: $vuetify.breakpoint,
    theme: $vuetify.theme,
    mobile: $vuetify.breakpoint.mobile
  };
}
