function zad1() {
  var ul = document.getElementById("lista");
  var li = document.createElement("li");
  var button = document.createElement("button");
  button.innerHTML = "Spec";
  button.addEventListener("click", zad1);
  li.className = "spec";
  li.innerHTML = "nowy ";
  li.appendChild(button);
  ul.appendChild(li);
  event.target.parentNode.insertBefore(li, event.target.nextSibling);
}
