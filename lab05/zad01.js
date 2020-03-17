const groupBy = (tab, key) => {
  let map = new Map();
  tab.forEach(element => {
    if (map.get(key(element)) == null) {
      map.set(key(element), new Array());
    }
    map.get(key(element)).push(element);
  });
  return map;
};
console.log(groupBy([3, 2, 4, 4, 3], n => n % 2 === 0));
