let tekst = 'Ala i As poszli w las';
function nbsp(tekst) {
    let result = tekst.replace(/ i /);
    return result;
}
let result = nbsp(tekst);
console.log(result);