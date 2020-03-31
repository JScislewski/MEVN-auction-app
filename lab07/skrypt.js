const zadanie1 = () => {
  var ul = document
    .getElementsByClassName("card-body")[0]
    .getElementsByTagName("ul");
  var node = document.createElement("li");
  var textnode = document.createTextNode("Wsparcie telefoniczne 24/7");
  node.appendChild(textnode);
  ul[0].appendChild(node);
};
const zadanie2 = () => {
  document
    .getElementById("basic-plan")
    .parentNode.insertBefore(
      document.getElementById("basic-plan"),
      document.getElementById("pro-plan")
    );
};
const zadanie3 = () => {
  var pro = document.getElementById("pro-plan");
  var button = pro.getElementsByTagName("button")[0];
  button.style.background = "red";
  button.style.color = "white";
  button.innerHTML = "KUP TERAZ";
};
const zadanie4 = () => {
  var newBasicCapacity =
    document
      .getElementById("basic-plan")
      .getElementsByClassName("list-unstyled")[0]
      .firstElementChild.textContent.split(" ")[1] * 1.25;
  document
    .getElementById("basic-plan")
    .getElementsByClassName(
      "list-unstyled"
    )[0].firstElementChild.textContent = document
    .getElementById("basic-plan")
    .getElementsByClassName("list-unstyled")[0]
    .firstElementChild.textContent.replace(10, newBasicCapacity);
  var newProCapacity =
    document
      .getElementById("pro-plan")
      .getElementsByClassName("list-unstyled")[0]
      .firstElementChild.textContent.split(" ")[1] * 1.25;
  document
    .getElementById("pro-plan")
    .getElementsByClassName(
      "list-unstyled"
    )[0].firstElementChild.textContent = document
    .getElementById("pro-plan")
    .getElementsByClassName("list-unstyled")[0]
    .firstElementChild.textContent.replace(100, newProCapacity);
};
const runDom = () => {
  zadanie1();
  zadanie2();
  zadanie3();
  zadanie4();
};
