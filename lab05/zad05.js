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
const poKoleiTab = (funTab, cb) => {
  funTab[0](1).then(function(value) {
    funTab[1](value).then(function(value) {
      console.log(cb(value));
    });
  });
};
poKoleiTab([fun1,fun2], cb);
