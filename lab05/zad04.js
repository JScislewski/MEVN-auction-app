async function fun1() {
  let result = 2 * 2;
  console.log(result);
  return result;
}
async function fun2() {
  let result = 3 * 3;
  console.log(result);
  return result;
}
function cb(wynik) {
  let result = wynik[0]+wynik[1];
  return result;
}
const razem = (fun1, fun2, cb) => {
  Promise.all([fun1(), fun2()]).then(function(wynik) {
    console.log(cb(wynik));
  });
};
razem(fun1, fun2, cb);
