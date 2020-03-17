async function fun1(n) {
  let result = n * 2;
  console.log(result);
  return result;
}
async function fun2(n) {
  let result = n * 3;
  console.log(result);
  return result;
}
function cb(n) {
  let result = n * 4;
  console.log(result);
  return result;
}
const poKolei = (n, fun1, fun2, cb) => {
  fun1(n).then(function(value) {
    fun2(value).then(function(value) {
      console.log(cb(value));
    });
  });
};
poKolei(2, fun1, fun2, cb);
