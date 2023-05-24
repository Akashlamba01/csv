function search_files() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName("data");

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      //   x[i].style.display = "none";
      x[i].innerHTML = "";
    } else {
      x[i].style.display = "list-item";
    }
  }
}
