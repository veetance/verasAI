var app = new Framework7({
  // App root element
  el: "#app",
  // other parameters

  routes: [
    {
      path: "/",
      url: "index.html",
    },

    {
      path: "/page3/",
      url: "pages/page3.html",
    },

    {
      path: "/",
      url: "index.html",
    },

    {
      path: "/index/",
      url: "index.html",
    },
  ],
});
var mainView = app.views.create(".view-main");








function lazyLOAD() {
  // Select all elements with the class of .lazy
  let lazyElements = document.querySelectorAll(".lazy");

  // Set the opacity of each lazy element to 0
  lazyElements.forEach((element) => {
    element.style.opacity = 0;
  });

  // Animate the opacity of each lazy element to 1 on page load
  window.addEventListener("load", () => {
    lazyElements.forEach((element) => {
      element.style.transition = "opacity 1s cubic-bezier(.3,.6,.13,1)";
      element.style.opacity = 1;
    });
  });
}

// call the function on page load
lazyLOAD();

// responsive nnavTitle
function navTitle() {
  let navTitle = document.querySelector(".nav-title");
  let navBar = document.querySelector(".nav-bar");
  let navL = document.querySelector(".nav-L");

  if (navBar.offsetWidth < 500) {
    navL.insertBefore(navTitle, navL.childNodes[2]);
  } else {
    navBar.insertBefore(navTitle, navBar.childNodes[2]);
  }
}
window.addEventListener("resize", navTitle);
navTitle();
