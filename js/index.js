
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


// Action creators
const setCurrentPage = (page) => ({ type: 'SET_CURRENT_PAGE', payload: page });
const showLogin = () => ({ type: 'SHOW_LOGIN' });
const setLoginContent = (html) => ({ type: 'SET_LOGIN_CONTENT', payload: html });
const showNewsfeed = () => ({ type: 'SHOW_NEWSFEED' });
const setNewsfeedContent = (html) => ({ type: 'SET_NEWSFEED_CONTENT', payload: html });

// Event listener for the login button
const loginButton = document.querySelector('.login-button');
loginButton.addEventListener('click', () => {
  store.dispatch(showLogin());
  fetch('pages/login.html')
    .then(response => response.text())
    .then(html => {
      store.dispatch(setLoginContent(html));
    });
});

const surfaceView = document.querySelector('.surface-view');
const homePage = document.querySelector('.home-page');
const footer = document.querySelector('.footer-Contents');

store.subscribe(() => {
  const state = store.getState();

  if (state.loginVisible) {
    let loginSpace = document.querySelector('.login-Space');
    if (!loginSpace) {
      loginSpace = document.createElement('div');
      loginSpace.classList.add('login-Space', 'fade-in');
      surfaceView.insertBefore(loginSpace, surfaceView.firstChild);
    }
    loginSpace.innerHTML = state.loginContent;

    document.title = 'Login';
    surfaceView.style.opacity = 0;
    surfaceView.innerHTML = '';
    surfaceView.appendChild(loginSpace);
    footer.style.display = 'none';
    setTimeout(() => {
      loginSpace.classList.add('active');
      surfaceView.style.opacity = 1;
    }, 100);

    // Add this check to ensure the event listener is added only once
    if (!loginSpace.dataset.formEventAttached) {
      loginSpace.dataset.formEventAttached = 'true';

      // Add this code to handle form submission and input validation
      setTimeout(() => {
        const loginForm = document.querySelector('.form');
        loginForm.addEventListener('submit', (event) => {
          event.preventDefault();

          const loginNumberInput = document.querySelector('#login-number');
          const passwordInput = document.querySelector('#password');

          if (loginNumberInput.value === '55515' && passwordInput.value === 'veras@ai') {
            store.dispatch(hideLogin()); // Add this line to hide the login space
            store.dispatch(showNewsfeed());
      
            fetch('pages/newsfeed.html')
              .then(response => response.text())
              .then(html => {
                store.dispatch(setNewsfeedContent(html));
              });
          }

        });
      }, 100);
    }

  } else if (state.newsfeedVisible) {
    let newsfeedSpace = document.querySelector('.newsfeed-Space');
    if (!newsfeedSpace) {
      newsfeedSpace = document.createElement('div');
      newsfeedSpace.classList.add('newsfeed-Space', 'fade-in');
      surfaceView.insertBefore(newsfeedSpace, surfaceView.firstChild);
    }
    newsfeedSpace.innerHTML = state.newsfeedContent;
    document.title = 'Newsfeed';
    surfaceView.style.opacity = 0;
    surfaceView.innerHTML = '';
    surfaceView.appendChild(newsfeedSpace);
    footer.style.display = 'block';
    setTimeout(() => {
      newsfeedSpace.classList.add('active');
      surfaceView.style.opacity = 1;
    }, 100);

  } else {
    const loginSpace = document.querySelector('.login-Space');
    if (loginSpace) {
      loginSpace.remove();
    }
    const newsfeedSpace = document.querySelector('.newsfeed-Space');
    if (newsfeedSpace) {
      newsfeedSpace.remove();
    }
    surfaceView.innerHTML = '';
    surfaceView.appendChild(homePage);
    document.title = 'Veras.ca | AI Key Theme Synthesis';
  }
});

window.addEventListener('popstate', () => {
  const currentPage = window.location.pathname.replace('/', '');
  store.dispatch(setCurrentPage(currentPage));
});

















// function showContactUS() makes contactUsModalWrapper display to be flex on the touch or press of vFormBtn and when vFormClose is pressed the function closeContactUs() makes the contactUsModalWrapper display is turned to none

const vFormBtn = document.querySelector('.v-form-btn');
const vFormBtn2 = document.querySelector('.v-form-btn-2');
const contactUsModalWrapper = document.querySelector('.contact-us-modal-wrapper');
const vForminner = document.querySelector('.v-form-inner-wrapper')
const vFormClose = document.querySelector('#v-form-close ');
const navbarWrapper = document.querySelector('.navbar-wrapper');


function showContactUS() {
  contactUsModalWrapper.style.display = 'flex';

  vForminner.style.transition = 'all .5s cubic-bezier(0,1.21,0.56,0.96)';
  vForminner.style.maxHeight = '0px';
  vForminner.style.height = 'auto';
  vForminner.style.opacity = '-10';

  setTimeout(function() {
    vForminner.style.maxHeight = '1000px';
    vForminner.style.opacity = '1';
  }, 10);
}

function closeContactUs() {
  vForminner.style.transition = 'all .5s cubic-bezier(0,1.21,0.56,0.96)';
  vForminner.style.maxHeight = '0px';

  setTimeout(function() {
    vForminner.style.height = '0px';
    vForminner.style.opacity = '0';
  }, 500);

 
}

function closeNavWrapper() {
  navbarWrapper.style.transition = 'max-height 0.5s';
  navbarWrapper.style.maxHeight = '100%';

  setTimeout(function() {
    contactUsModalWrapper.style.display = 'none';
    navbarWrapper.style.height = 'auto';
  }, 300);
}

vFormBtn.addEventListener('click', showContactUS);

vFormBtn2.addEventListener('click', function() {
  showContactUS();
});

vFormClose.addEventListener('click', function() {
  closeContactUs();
  closeNavWrapper();
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


// Fade in the body element on load
window.addEventListener('load', () => {
  var body = document.querySelector('body');
  body.style.opacity = 1;
});

