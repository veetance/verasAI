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


//address bar theme color
const darkModeQuery = window.matchMedia('not all and (prefers-color-scheme)');
function updateThemeColor(event) {
  if (event.matches) {
    // Dark mode is enabled
    document.querySelector('meta[name=theme-color]').setAttribute('content', '#5e50b2');
  } else {
    // Dark mode is disabled
    document.querySelector('meta[name=theme-color]').setAttribute('content', '#FFFFFF');
  }
}
darkModeQuery.addEventListener('change', updateThemeColor);


//reveal animation
$(document).ready(function() {
  // get the button element
  var vBtni = $('.v-btn-i');

  // add mouseenter and mouseleave event listeners to the button
  vBtni.mouseenter(function() {
    // check if the width of the screen is less than 580px
    if ($(window).width() < 580) {
      // if the width is less than 580px, do not show the div
      return;
    }

    // reveal the div by changing the display to flex and animating the opacity
    $('#').css({
      'display': 'flex',
      'opacity': 0
    }).animate({
      'opacity': 1
    }, 200);
  });
  vBtni.mouseleave(function() {
    // check if the width of the screen is less than 580px
    if ($(window).width() < 580) {
      // if the width is less than 580px, do not hide the div
      return;
    }

    // hide the div by animating the opacity to 0
    $('#').animate({
      'opacity': 0
    }, 200, function() {
      // after the animation, change the display back to none
      $(this).css('display', 'none');
    });
  });
});



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


