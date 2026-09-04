(function () {
  var toggle = document.querySelector(".nav-toggle");
  var items = document.querySelectorAll(".nav-item");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  items.forEach(function (item) {
    var button = item.querySelector("button");
    if (!button) return;
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      items.forEach(function (other) {
        if (other !== item) other.classList.remove("open");
      });
      item.classList.toggle("open");
    });
  });

  document.addEventListener("click", function () {
    items.forEach(function (item) {
      item.classList.remove("open");
    });
  });
})();
