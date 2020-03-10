let numbers = [3, 2, 4, 4, 3, 3, 9, 8, 1]
function generatePhoneNumber(numbers) {
    if (numbers.length != 9 || !Array.isArray(numbers) || numbers.some(isNaN)) {
        throw new Error("Blad")
    }
    let result = numbers.join("");
    let splited = result.match(/.{1,3}/g);
    result = splited.join("-")
    result = "+48 " + result
    return result;
}
const telefon = generatePhoneNumber(numbers);
console.log(telefon);

