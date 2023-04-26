//address bar theme color
const darkModeQuery = window.matchMedia("not all and (prefers-color-scheme)");
function updateThemeColor(event) {
  if (event.matches) {
    // Dark mode is enabled
    document
      .querySelector("meta[name=theme-color]")
      .setAttribute("content", "#5e50b2");
  } else {
    // Dark mode is disabled
    document
      .querySelector("meta[name=theme-color]")
      .setAttribute("content", "#FFFFFF");
  }
}
darkModeQuery.addEventListener("change", updateThemeColor);



document.addEventListener("DOMContentLoaded", () => {
  // Action creators
  const setCurrentPage = (page) => ({ type: "SET_CURRENT_PAGE",payload: page,});
  const showLogin = () => ({ type: "SHOW_LOGIN" });
  const hideLogin = () => ({ type: "HIDE_LOGIN" });
  const logout = () => ({ type: "LOGOUT" });
  const setLoginContent = (html) => ({ type: "SET_LOGIN_CONTENT",payload: html,});
  const showNewsfeed = () => ({ type: "SHOW_NEWSFEED" });
  const setNewsfeedContent = (html) => ({type: "SET_NEWSFEED_CONTENT",payload: html,});

  // New action creators for insights and create pages
  const showInsights = () => ({ type: "SHOW_INSIGHTS" });
  const hideInsights = () => ({type: "HIDE_INSIGHTS"})
  const setInsightsContent = (html) => ({ type: "SET_INSIGHTS_CONTENT",payload: html,});

  const showCreate = () => ({ type: "SHOW_CREATE" });
  const hideCreate = () => ({ type: "HIDE_CREATE" });
  const setCreateContent = (html) => ({type: "SET_CREATE_CONTENT",payload: html,});

  // Query the DOM elements
  const loginButton = document.querySelector(".login-button");
  const surfaceView = document.querySelector(".surface-view");
  const footer = document.querySelector(".footer-Contents");
  const feedScroll = document.querySelector(".feed-scroll");
  const feedWrapper = document.querySelector(".feed-wrapper");
  const insightsButton = document.querySelector(".lnk-ico .insights-btn");
  const createButton = document.querySelector(".lnk-ico .create-btn");


  // Event listener for the login button
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      if (loginButton.classList.contains("logout-button")) {
        store.dispatch(logout());
      } else {
        store.dispatch(showLogin());
        fetch("pages/login.html")
          .then((response) => response.text())
          .then((html) => {
            store.dispatch(setLoginContent(html));
          });
      }
    });
  }


  // Event listener for the insights button to dispatch the new action creators for insights and create pages

  if (insightsButton) {
    insightsButton.addEventListener("click", () => {
      store.dispatch(showInsights());
      store.dispatch(hideCreate());
      fetch("../pages/insights.html")
        .then((response) => response.text())
        .then((html) => {
          store.dispatch(setInsightsContent(html));
        });
    });
  }

  if (createButton) {
    createButton.addEventListener("click", () => {
      store.dispatch(showCreate());
      store.dispatch(hideInsights());
      fetch("../pages/create.html")
        .then((response) => response.text())
        .then((html) => {
          store.dispatch(setCreateContent(html));
        });
    });
  }
  
  store.subscribe(() => {
    const state = store.getState();
  
    // If the login form should be visible
    if (state.loginVisible) {
      let loginSpace = document.querySelector(".login-Space");
  
      if (!loginSpace) {
        loginSpace = document.createElement("div");
        loginSpace.classList.add("login-Space", "fade-in");
        surfaceView.insertBefore(loginSpace, surfaceView.firstChild);
      }
  
      loginSpace.innerHTML = state.loginContent;
      document.title = "Login";
      surfaceView.style.opacity = 0;
      surfaceView.innerHTML = "";
      surfaceView.appendChild(loginSpace);
      footer.style.display = "none";
  
      setTimeout(() => {
        loginSpace.classList.add("active");
        surfaceView.style.opacity = 1;
      }, 100);
  
      // Add event listener for form submission, only if it hasn't been added before
      if (!loginSpace.dataset.formEventAttached) {
     
  
        loginSpace.dataset.formEventAttached = "true";
  
        setTimeout(() => {
          const loginForm = document.querySelector(".form");
          loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
  
            const loginNumberInput = document.querySelector("#login-number");
            const passwordInput = document.querySelector("#password");
  
            // Fetch the newsfeed.html content and set it to the state
            fetch("pages/newsfeed.html")
              .then((response) => response.text())
              .then((html) => {
                store.dispatch(setNewsfeedContent(html));
                window.location.href = "pages/newsfeed.html";
              });
  
            if (loginNumberInput.value === "1" && passwordInput.value === "1") {
              store.dispatch(hideLogin());
              store.dispatch(showNewsfeed());
            }
          });
        }, 100);
      }
  
    } else if (state.newsfeedVisible) {
      // If the newsfeed should be visible
      let newsfeedSpace = document.querySelector(".newsfeed-Space");
  
      if (!newsfeedSpace) {
        newsfeedSpace = document.createElement("div");
        newsfeedSpace.classList.add("newsfeed-Space", "fade-in");
        surfaceView.insertBefore(newsfeedSpace, surfaceView.firstChild);
      }
  
      newsfeedSpace.innerHTML = state.newsfeedContent;
      document.title = "Newsfeed";
      surfaceView.style.opacity = 0;
      surfaceView.innerHTML = "";
      surfaceView.appendChild(newsfeedSpace);
      footer.style.display = "block";
  
      setTimeout(() => {
        surfaceView.style.opacity = 1;
      }, 100);
  
    } else {

      // insights and create page
      // insights and create page
    let insightsSpace = document.querySelector(".insights-Space");
    let createSpace = document.querySelector(".create-Space");
    let feedWrapper = document.querySelector(".feed-wrapper");
    let feedScroll = document.querySelector(".feed-scroll");

    if (state.insightsVisible) {
      if (!insightsSpace) {
        insightsSpace = document.createElement("div");
        insightsSpace.classList.add("insights-Space");
        feedScroll.appendChild(insightsSpace);

        fetch("../pages/insights.html")
          .then((response) => response.text())
          .then((html) => {
            insightsSpace.innerHTML = html;
          });
      } else {
        insightsSpace.style.display = "block";
      }

      if (createSpace) {
        createSpace.style.display = "none";
      }

      feedWrapper.style.display = "none";
    } else if (state.createVisible) {
      if (!createSpace) {
        createSpace = document.createElement("div");
        createSpace.classList.add("create-Space");
        feedScroll.appendChild(createSpace);

        fetch("../pages/create.html")
          .then((response) => response.text())
          .then((html) => {
            createSpace.innerHTML = html;
          });
      } else {
        createSpace.style.display = "block";
      }

      if (insightsSpace) {
        insightsSpace.style.display = "none";
      }

      feedWrapper.style.display = "none";
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        feedWrapper.style.display = "flex";
      });
    }
  }
      


});

  window.addEventListener("popstate", () => {
    const currentPage = window.location.pathname.replace("/", "");
    store.dispatch(setCurrentPage(currentPage));
  });
});
  
   

  
   


// main code section for landing page
document.addEventListener("DOMContentLoaded", () => {
  // function showContactUS()
  const vFormBtn = document.querySelector(".v-form-btn");
  const vFormBtn2 = document.querySelector(".v-form-btn-2");
  const contactUsModalWrapper = document.querySelector(
    ".contact-us-modal-wrapper"
  );
  const vForminner = document.querySelector(".v-form-inner-wrapper");
  const vFormClose = document.querySelector("#v-form-close ");
  const navbarWrapper = document.querySelector(".navbar-wrapper");

  function showContactUS() {
    contactUsModalWrapper.style.display = "flex";

    vForminner.style.transition = "all .5s cubic-bezier(0,1.21,0.56,0.96)";
    vForminner.style.maxHeight = "0px";
    vForminner.style.height = "auto";
    vForminner.style.opacity = "-10";

    setTimeout(function () {
      vForminner.style.maxHeight = "1000px";
      vForminner.style.opacity = "1";
    }, 10);
  }

  function closeContactUs() {
    vForminner.style.transition = "all .5s cubic-bezier(0,1.21,0.56,0.96)";
    vForminner.style.maxHeight = "0px";

    setTimeout(function () {
      vForminner.style.height = "0px";
      vForminner.style.opacity = "0";
    }, 500);
  }

  function closeNavWrapper() {
    navbarWrapper.style.transition = "max-height 0.5s";
    navbarWrapper.style.maxHeight = "100%";

    setTimeout(function () {
      contactUsModalWrapper.style.display = "none";
      navbarWrapper.style.height = "auto";
    }, 300);
  }

  // Event listener for vFormBtn
  if (vFormBtn) {
    vFormBtn.addEventListener("click", function () {
      showContactUS();
    });
  }

  // Event listener for vFormBtn2
  if (vFormBtn2) {
    vFormBtn2.addEventListener("click", function () {
      showContactUS();
    });
  }

  // Event listener for vFormClose
  if (vFormClose) {
    vFormClose.addEventListener("click", function () {
      closeContactUs();
      closeNavWrapper();
    });
  }

  // responsive nnavTitle
  function navTitle() {
    let navTitle = document.querySelector(".nav-title");
    let navBar = document.querySelector(".nav-bar");
    let navL = document.querySelector(".nav-L");

    if (navTitle && navBar && navL) {
      if (navBar.offsetWidth < 708) {
        // it's actually 720
        navL.insertBefore(navTitle, navL.childNodes[2]);
      } else {
        navBar.insertBefore(navTitle, navBar.childNodes[2]);
      }
    }
  }

  window.addEventListener("resize", navTitle);
  navTitle();

  // function refreshhomePage() refreshes the page on the touch or press of .nav-logo
  function refreshhomePage() {
    $(".nav-logo, .nav-title, .VLOGO-wrapper").on(
      "mousedown click",
      function () {
        if (window.location.pathname === "/pages/login.html ") {
          location.href = "/index.html";
        } else {
          location.reload();
        }
      }
    );
  }
  $(document).ready(function () {
    refreshhomePage();
  });

  // Copy number
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

  const FNumberL = document.querySelector(".F-number-L");
  if (FNumberL) {
    FNumberL.addEventListener("touchend", copyToClipboard);
    FNumberL.addEventListener("mouseup", copyToClipboard);
  }

  // Copy email
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

  const FMailL = document.querySelector(".F-mail-L");
  if (FMailL) {
    FMailL.addEventListener("touchend", copyEmailToClipboard);
    FMailL.addEventListener("mouseup", copyEmailToClipboard);
  }

  // Fade in the body element on load
  window.addEventListener("load", () => {
    var body = document.querySelector("body");
    body.style.opacity = 1;
  });
});
