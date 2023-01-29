


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


// on first page load function splash() pulses .v-logo-wrapper starting from opacity 0 to opacity 1 ease in and 2 times in 1.5s and then fades out while fading out .v-splash and setting display to none

function splash() {

  document.querySelector("html").style.overflow = "hidden";
  
  let vSplash = document.querySelector(".v-splash");
  let vLogoWrapper = document.querySelector(".v-splash .v-logo-wrapper");
  let vLogo = document.querySelector(".v-splash .v-logo");

  // Add pulse effect to vLogo
  vLogo.style.animation = "pulse 2s ease-in-out infinite";

  vLogoWrapper.style.transition = "opacity 1.5s ease-in 2";
  vLogoWrapper.style.opacity = 1;
  vLogo.style.transition = "opacity 1.5s ease-in 1";
  vLogo.style.opacity = 1;

  setTimeout(() => {
    vSplash.style.transition = "opacity .03s ease-in";
    vSplash.style.opacity = 0;
    setTimeout(() => {
      vSplash.style.display = "none";
      document.querySelector(".Veras-surface").style.overflowY = "scroll";
      document.querySelector(".Veras-surface").style.overflow = "overlay";
      document.querySelector(".Veras-surface").style.overflowX = "hidden";
  

      document.querySelector("html").style.overflow = "auto";
      document.querySelector("html").style.overflowX = "hidden";
      
    }, 0);
  }, 200);

  
}

// Add keyframe animation for pulse effect
const pulseAnimation = document.createElement("style");
pulseAnimation.innerHTML = `
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}`;
document.head.appendChild(pulseAnimation);

// Call the function on page load
window.addEventListener("load", splash);



// function contactUS() unhides .contact-us-modal-wrapper in a fade anamation cubic-bezier(.3,.6,.13,1) by setting the display to flex on the touch or press of .nav-button lastly, if the.contact-us-modal-wrapper is already visible it hides it again.


$.event.special.touchpress = {
  setup: function() {
    $(this).bind("touchstart", $.event.special.touchpress.handler);
  },
  teardown: function() {
    $(this).unbind("touchstart", $.event.special.touchpress.handler);
  },
  handler: function(event) {
    event.type = "touchpress";
    $.event.handle.apply(this, arguments);
  }
};

const navButton = document.querySelector(".nav-button");
const vFormBtn = document.querySelector("#v-form-btn");
const contactUsModalWrapper = document.querySelector(".contact-us-modal-wrapper");
const contactUsModal = document.querySelector(".contact-us-modal");

function contactUS() {


  if (window.getComputedStyle(contactUsModalWrapper).display === "flex") {
    contactUsModalWrapper.style.transition = "opacity .05s cubic-bezier(0,.74,.51,1)";
    contactUsModalWrapper.style.opacity = 0;
    contactUsModal.style.transition = "opacity .01s cubic-bezier(0,.74,.51,1)";
    contactUsModal.style.opacity = 0;
    
  } else {
  
    contactUsModalWrapper.style.display = "flex";
    contactUsModalWrapper.style.transition = "opacity 2s cubic-bezier(0,.74,.51,1)";
    contactUsModalWrapper.style.opacity = 1;
    contactUsModal.style.transition = "opacity 2s cubic-bezier(0,.74,.51,1)";
    contactUsModal.style.opacity = 1;
    
    }
    }

    $(document).ready(function() {
      $(".nav-button, #v-form-btn").on("touchpress, touchend, click", contactUS);
    });


    contactUsModalWrapper.addEventListener("transitionend", function() {
    if (contactUsModalWrapper.style.opacity == 0) {
    contactUsModalWrapper.style.display = "none";
    }
    });




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


// function  CALLED waitlistPage() fadesout .home-page and sets its display to none and then sets .home-page-2 to flex and fades it in with a cubic-bezier fade in on the touch or press of .v-button-filled 



function waitlistPage() {
  $('.v-button-filled').on('click', function() {
    $('.home-page').fadeOut(100, function() {
      $(this).css('display', 'none');
      $('.home-page-2').css({'display': 'flex', 'transition': 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'}).fadeIn(100);
    });
  });
}

$(document).ready(function() {
  waitlistPage();
});

// function refreshhomePage() refreshes the page on the touch or press of .nav-logo

function refreshhomePage() {
  $('.nav-logo , .nav-title').on('mousedown, click', function() {
    location.reload();
  });
}

$(document).ready(function() {
  refreshhomePage();
});




// copy number

function copyToClipboard() {
  var phoneNumber = document.querySelector(".F-number-L p").innerHTML;
  var textArea = document.createElement("textarea");
  textArea.value = phoneNumber;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Copied the phone number to clipboard: " + phoneNumber);
}

document.querySelector('.F-number-L').addEventListener('touchend', copyToClipboard);
document.querySelector('.F-number-L').addEventListener('mouseup', copyToClipboard);

// copy email

function copyEmailToClipboard() {
  var email = document.querySelector(".F-mail-L p").innerHTML;
  var textArea = document.createElement("textarea");
  textArea.value = email;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Copied the email to clipboard: " + email);
}

document.querySelector('.F-mail-L').addEventListener('touchend', copyEmailToClipboard);
document.querySelector('.F-mail-L').addEventListener('mouseup', copyEmailToClipboard);




