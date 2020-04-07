function ready() {
  const headerList = document.querySelectorAll(".hd");
  console.log(headerList);
  for (const element of headerList) {
    element.addEventListener("click", hideUnhideDiv);
  }
}
function hideUnhideDiv(event) {
  if (event.target.nextElementSibling.style.display === "none") {
    event.target.nextElementSibling.style.display = "block";
  } else event.target.nextElementSibling.style.display = "none";
}
document.addEventListener("DOMContentLoaded", ready);
