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


const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function updateThemeColor(event) {
  if (event.matches) {
    // Dark mode is enabled
    document.querySelector('meta[name=theme-color]').setAttribute('content', '#FF0000');
  } else {
    // Dark mode is disabled
    document.querySelector('meta[name=theme-color]').setAttribute('content', '#00FF00');
  }
}

darkModeQuery.addEventListener('change', updateThemeColor);


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

  if (navBar.offsetWidth < 708) {// its actually 720
    navL.insertBefore(navTitle, navL.childNodes[2]);
  } else {
    navBar.insertBefore(navTitle, navBar.childNodes[2]);
  }
}
window.addEventListener("resize", navTitle);
navTitle();
