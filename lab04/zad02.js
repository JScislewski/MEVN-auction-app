let sentence = "Dzik jest dziki, dzik jest zły. Dzik ma bardzo ostre kły.";
function reverseSentence(sentence) {
    let result = sentence.split(" ").map(function (currentValue) {
        if (currentValue.length > 4) {
            return currentValue.split("").reverse().join("");
        }
        else return currentValue;
    })
    return result;
}
let reversed = reverseSentence(sentence);
console.log(reversed);