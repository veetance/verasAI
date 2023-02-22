
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





// dispatch the SHOW_LOGIN action when the login button is clicked:?//
const loginButton = document.querySelector('.login-button');
loginButton.addEventListener('click', () => {
  store.dispatch({ type: 'SHOW_LOGIN' });

  // Fetch the login HTML and store it in the Redux store
  fetch('pages/login.html')
    .then(response => response.text())
    .then(html => {
      store.dispatch({ type: 'SET_LOGIN_CONTENT', payload: html });
    });
});


//  update the UI based on the Redux store state:

store.subscribe(() => {
  const state = store.getState();

  // Update the UI based on the state
  if (state.loginVisible) {
    // Show the login space
    let loginSpace = document.querySelector('.login-Space');
    if (!loginSpace) {
      loginSpace = document.createElement('div');
      loginSpace.classList.add('login-Space');
      const surfaceView = document.querySelector('.surface-view');
      surfaceView.insertBefore(loginSpace, surfaceView.firstChild);
    }
    loginSpace.innerHTML = state.loginContent;

    // Update the page title
    document.title = 'Login';

    // Hide other content in surface view
    const surfaceView = document.querySelector('.surface-view');
    while (surfaceView.firstChild) {
      surfaceView.removeChild(surfaceView.firstChild);
    }
    surfaceView.appendChild(loginSpace);
  } else {
    // Hide the login space
    const loginSpace = document.querySelector('.login-Space');
    if (loginSpace) {
      loginSpace.remove();
    }

    // Show other content in surface view
    const homePage = document.querySelector('.home-page');
    const surfaceView = document.querySelector('.surface-view');
    while (surfaceView.firstChild) {
      surfaceView.removeChild(surfaceView.firstChild);
    }
    surfaceView.appendChild(homePage);

    // Reset the page title
    document.title = 'Veras.ca | AI Key Theme Synthesis';
  }
});


//handle the browser back button:

window.addEventListener('popstate', () => {
  const currentPage = window.location.pathname.replace('/', '');
  store.dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage });
});


//  handle page refresh and redirect to index.html if the login space is visible:

window.addEventListener('load', () => {
  const state = store.getState();
  if (state.loginVisible) {
    // If login space is visible, redirect to index.html
    window.location.href = '/index.html';
  } else {
    const currentPage = window.location.pathname.replace('/', '');
    store.dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage });
  }
});















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




