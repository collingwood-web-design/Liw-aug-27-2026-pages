(function () {
  var toggle = document.querySelector(".nav-toggle");
  var items = document.querySelectorAll(".nav-item");

  function closeAll() {
    items.forEach(function (item) {
      item.classList.remove("open");
      var button = item.querySelector("button");
      if (button) button.setAttribute("aria-expanded", "false");
    });
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) closeAll();
    });
  }

  items.forEach(function (item) {
    var button = item.querySelector("button");
    var dropdown = item.querySelector(".dropdown");
    if (!button || !dropdown) return;

    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-haspopup", "true");

    if (!dropdown.querySelector(".dropdown-close")) {
      var close = document.createElement("button");
      close.type = "button";
      close.className = "dropdown-close";
      close.setAttribute("aria-label", "Close menu");
      close.innerHTML = "&times;";
      close.addEventListener("click", function (event) {
        event.stopPropagation();
        item.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        button.focus();
      });
      dropdown.appendChild(close);
    }

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      var willOpen = !item.classList.contains("open");
      items.forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          var otherButton = other.querySelector("button");
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", willOpen);
      button.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    dropdown.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });

  document.addEventListener("click", function () {
    closeAll();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeAll();
  });

  // Soft scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
