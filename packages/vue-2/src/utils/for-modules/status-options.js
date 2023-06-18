const all = {
  value: -1,
  text: '全部'
};
export default function (arg, hasAll = true) {
  const others = [];
  for (let key in arg) {
    others.push({ value: +key, text: arg[key] });
  }
  return [...(hasAll ? [all] : []), ...others];
}
