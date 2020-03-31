const groupBy = (tab, key, fun) => {
  let map = new Map();
  tab.forEach(element => {
    if (map.get(key(fun(element))) == null) {
      map.set(key(fun(element)), new Array());
    }
    map.get(key(fun(element))).push(fun(element));
  });
  return map;
};
console.log(
  groupBy(
    [3, 2, 4, 4, 3],
    n => n % 2 === 0,
    n => n + 1
  )
);