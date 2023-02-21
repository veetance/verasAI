
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



// on first page load function splash() pulses .v-logo-wrapper starting from opacity 0 to opacity 1 ease in and 2 times in 1.5s and then fades out while fading out .v-splash and setting display to none






// go to login page

const loadPage = (pageUrl, pageTitle) => {
  fetch(pageUrl)
    .then(response => response.text())
    .then(data => {
      const surfaceView = document.querySelector('.surface-view');
      surfaceView.innerHTML = data;
      document.title = pageTitle;

      // Re-attach event listener to login button
      const loginButton = document.querySelector('.login-button');
      if (loginButton) {
        loginButton.addEventListener('click', () => {
          const pageUrl = 'pages/login.html';
          const pageTitle = 'Login';
          loadPage(pageUrl, pageTitle);
          history.pushState({ page: 'login', title: pageTitle }, pageTitle, pageUrl);
        });
      }
    })
    .catch(error => console.error(error));
};

const onPopState = (event) => {
  const pageUrl = (event.state && event.state.page) ? event.state.page + '.html' : 'index.html';
  const pageTitle = (event.state && event.state.title) ? event.state.title : 'Home';

  if (pageUrl === 'index.html') {
    // If returning to the index page, reload the page
    location.reload();
  } else {
    // Load the page content into the surface view
    loadPage(pageUrl, pageTitle);
    // Clear the surface view except for the home page
    const surfaceView = document.querySelector('.surface-view');
    surfaceView.querySelectorAll(':not(.home-page)').forEach(element => element.remove());
  }
};

const loginButton = document.querySelector('.login-button');
loginButton.addEventListener('click', () => {
  const pageUrl = 'pages/login.html';
  const pageTitle = 'Login';
  loadPage(pageUrl, pageTitle);
  history.pushState({ page: 'login', title: pageTitle }, pageTitle, pageUrl);
});

window.addEventListener('popstate', onPopState);









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




// function refreshhomePage() refreshes the page on the touch or press of .nav-logo

function refreshhomePage() {
  $('.nav-logo, .nav-title').on('mousedown click', function() {
    if (window.location.pathname === '/pages/login.html') {
      location.href = '/index.html';
    } else {
      location.reload();
    }
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




