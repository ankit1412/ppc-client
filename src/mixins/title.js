function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title;
  }
  return '';
}

export default {
  mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  },
};
