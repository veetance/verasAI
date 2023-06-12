

const darkModeQuery = window.matchMedia("not all and (prefers-color-scheme)");
darkModeQuery.addEventListener("change", updateThemeColor);
function updateThemeColor(event) {
  if (event.matches) {
    document
      .querySelector("meta[name=theme-color]")
      .setAttribute("content", "#5e50b2");
  } else {
    document
      .querySelector("meta[name=theme-color]")
      .setAttribute("content", "#FFFFFF");
  }
  }

   // Action Creators
   const actions = {
    setCurrentPage: (page) => {
      history.pushState({ page: page }, "", `#${page}`);
      return { type: SET_CURRENT_PAGE, payload: page };
    },
    showLogin: () => {
      history.pushState({ page: "login" }, "", "#login.html");
      return { type: SHOW_LOGIN };
    },
    hideLogin: () => {
      history.pushState({ page: "home" }, "", "index.html");
      return { type: HIDE_LOGIN };
    },
    logout: () => {
      history.pushState({ page: "logout" }, "", "#logout");
      return { type: LOGOUT };
    },
    setLoginContent: (html) => ({
      type: SET_LOGIN_CONTENT,
      payload: html,
    }),
    showNewsfeed: () => {
      history.pushState({ page: "newsfeed" }, "", "pages/newsfeed.html#");
      return { type: SHOW_NEWSFEED };
    },
    setNewsfeedContent: (html) => ({
      type: SET_NEWSFEED_CONTENT,
      payload: html,
    }),
    showInsights: () => {
      history.pushState({ page: "insights" }, "", "#insights");
      return { type: SHOW_INSIGHTS };
    },
    hideInsights: () => {
      history.pushState({ page: "home" }, "", "#home");
      return { type: HIDE_INSIGHTS };
    },
    setInsightsContent: (html) => ({
      type: SET_INSIGHTS_CONTENT,
      payload: html,
    }),
    showCreate: () => {
      history.pushState({ page: "create" }, "", "#create");
      return { type: SHOW_CREATE };
    },
    hideCreate: () => {
      history.pushState({ page: "home" }, "", "#home");
      return { type: HIDE_CREATE };
    },
    setCreateContent: (html) => ({
      type: SET_CREATE_CONTENT,
      payload: html,
    }),
    setOnboardingContent: (html) => ({
      type: SET_ONBOARDING_CONTENT,
      payload: html,
    }),
    showOnboarding: () => {
      history.pushState({ page: "onboarding" }, "", "pages/onboarding.html#");
      return { type: SHOW_ONBOARDING };
    },
    hideOnboarding: () => {
      history.pushState({ page: "home" }, "", "#home");
      return { type: HIDE_ONBOARDING };
    },
    setOnboardingStepsContent: (html) => ({
      type: SET_ONBOARDING_STEPS_CONTENT,
      payload: html,
    }),
    showOnboardingSteps: () => {
      history.pushState({ page: "onboardingSteps" }, "", "pages/onboardingSteps.html#");
      return { type: SHOW_ONBOARDING_STEPS };
    },
    hideOnboardingSteps: () => {
      history.pushState({ page: "home" }, "", "#home");
      localStorage.removeItem("onboardingStepsVisible");
      return { type: HIDE_ONBOARDING_STEPS };
    },
  };  


document.addEventListener("DOMContentLoaded", () => {

  let Loadsplash = document.querySelector(".v-splash");
  let navbarAndSurface = document.querySelectorAll(".navbar-wrapper, .Veras-surface");
  displayLoadSplash();
  function displayLoadSplash() {
  // If the flag is set, display the splash screen and remove the flag
  if (!Loadsplash) return;
  Loadsplash.style.display = "flex";
  const hideSplashTime = Date.now() + 1000;
  
  const remainingTime = Math.max(0, hideSplashTime - Date.now());
  setTimeout(() => {
    Loadsplash.style.display = "none";
    navbarAndSurface.forEach(element => {
      element.style.opacity = "1"; // Show the content of the page
    });
  }, remainingTime);
  }

 

  // redirrect and dispatch state
  const url = new URL(window.location.href);
  if (url.hash) {
  // history.replaceState({}, document.title, url.pathname );
  history.replaceState({}, document.title, `${url.pathname}`);

  if (url.hash === "#login.html") {
    store.dispatch(actions.showLogin());
    loadPage("login", actions.showLogin, actions.setLoginContent).then(() => {

      let loginSpace = document.querySelector(".login-Space");
      handleLoginFormSubmission(loginSpace);

      let waitListButton = document.querySelector("#waitList");
      waitListButton.addEventListener("click", () => {
        window.location.href = "/index.html";  
      }
      );

    });
  } 
  }


  //Triggerers for app
  window.addEventListener('load', function() {

    if (elements.loginButton) {
      elements.loginButton.addEventListener("click", eventHandlers.handleLoginButtonClick);
    }
    if (elements.logoutButton) {
      elements.logoutButton.addEventListener("click", eventHandlers.handleLogoutButtonClick);
    }
    if (elements.onboardingButton) {
      elements.onboardingButton.addEventListener("click", eventHandlers.handleToStepsButtonClick);
    }
    if (elements.insightsButton) {
      elements.insightsButton.addEventListener("click", eventHandlers.handleInsightsButtonClick);
    }
    if (elements.createButton) {
      elements.createButton.addEventListener("click", eventHandlers.handleCreateButtonClick);
    }
    if (elements.refreshButtons) {
      elements.refreshButtons.forEach(button => button.addEventListener("click", eventHandlers.handleRefreshButtonClick));
    }
  });

  // Query the DOM elements
  const elements = {
  loginButton: document.querySelector(".login-button"),
  logoutButton: document.querySelector(".logout-button"),
  onboardingButton: document.querySelector("#toFeed-button"),
  surfaceView: document.querySelector(".surface-view"),
  footer: document.querySelector(".footer-Contents"),
  insightsButton: document.querySelector(".lnk-ico .insights-btn"),
  createButton: document.querySelector(".lnk-ico .create-btn"),
  upNav: document.querySelector(".navbar-wrapper"),
  splash: document.querySelector(".v-splash"),
  refreshButtons: document.querySelectorAll(
    ".nav-logo, .nav-title, .VLOGO-wrapper"),
  };


  // Event Handlers
  const eventHandlers = {
    handleLoginButtonClick: () => {
      store.dispatch(actions.showLogin());

      loadPage("login", actions.showLogin, actions.setLoginContent).then(() => {

        let loginSpace = document.querySelector(".login-Space");
        handleLoginFormSubmission(loginSpace);


        let waitListButton = document.querySelector("#waitList");
        waitListButton.addEventListener("click", () => {
          window.location.href = "/index.html";  
        }
        );

      });
    },
    handleNewsfeedButtonClick: () => {
      store.dispatch(actions.showNewsfeed());
    },
    handleInsightsButtonClick: () => {
      store.dispatch(actions.hideCreate());
      loadPage("insights", actions.showInsights, actions.setInsightsContent);
    },
    handleCreateButtonClick: () => {
      store.dispatch(actions.hideInsights());
      loadPage("create", actions.showCreate, actions.setCreateContent);
    },
    handleToStepsButtonClick: async () => {
      const loginNumber = document.getElementById("login-number").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const nickname = document.getElementById("nickname").value;

      const onboardUserData = eventHandlers.validateForm(
        loginNumber,
        password,
        confirmPassword,
        nickname
      );

      async function postUserData(onboardUserData) {
        const response = await fetch("http://study.veras.ca/home.phps", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(onboardUserData),
        });

        if (!response.ok) {
          alert(onboardUserData); // onboardUserData contains the error message
          throw new Error("Network response was not ok");
        }

        return await response.text();
      }

      // Handle input field errors
      if (typeof onboardUserData === "string") {
        console.log(onboardUserData);
        return; // Stop the function here if there are validation errors
      }

      try {
        // Handle posting errors
        const data = await postUserData(onboardUserData);
        console.log("postUserData", postUserData);

        if (data.error) {
          // Show the error message returned by postUserData()/ after saeed links it properly
        }
      } catch (error) {
        if (error.message.includes("NetworkError")) {
          alert("Network Error: Failed to reach the server.");
        } else {
          // Handle prototype error

          if (
            onboardUserData &&
            onboardUserData.loginNumber &&
            onboardUserData.password
          ) {
            alert(
              "This is a prototype, data not connected. Please press OK to proceed."
            );
            eventHandlers.onboardSuccess(loginNumber, password, nickname);

            console.log("onboardUserData", onboardUserData);
          }
        }
      }
    },
    handleLogoutButtonClick: () => {
      store.dispatch(actions.logout());
      window.location.href = "/index.html";
    },
    handleNavSlideUpClick: () => {
    },
    handleRefreshButtonClick: () => {
      window.location.href = "/index.html";
    },
 

    //curicial eevent handlers
    successfulLogin: (loginNumberInput, passwordInput) => {
      // Clear the input fields
      loginNumberInput.value = "";
      passwordInput.value = "";

      // Display the splash screen
      displayLongSplash();

      // Update the UI based on the login status
      updateLoginUI(true);

      setTimeout(() => {
        elements.splash.style.display = "none";
      }, 2000);
    },
    onboardSuccess: () => {
      loadPage(
        "onboardingSteps",
        actions.showOnboardingSteps,
        actions.setOnboardingStepsContent
      );
      // Add any additional code specific to onboardSuccess here
    },
    onboardingIsComplete: () => {
      loadPage("newsfeed", actions.showNewsfeed, actions.setNewsfeedContent);
      // Add any additional code specific to onboardingIsComplete here
    },
    validateForm: (loginNumber, password, confirmPassword, nickname) => {
      if (!/^\d{2,9}$/.test(loginNumber)) {
        alert("Login Number should be between 2 and 9 digits.");
        return false;
      }
      if (!/^\d{2,9}$/.test(password)) {
        alert("Password should be between 2 and 9 digits.");
        return false;
      }
      if (password !== confirmPassword) {
        alert("Confirm Password should match Password.");
        return false;
      }
      if (nickname && !/^[a-zA-Z0-9._-]*$/.test(nickname)) {
        alert(
          "Nickname should be alphanumeric and may contain periods, dashes and underscores."
        );
        return false;
      }
      return {
        loginNumber,
        password,
        nickname,
      };
    },
    validateLoginForm: (loginNumber, password) => {
      if (!/^\d{2,9}$/.test(loginNumber)) {
        alert("Login Number should be between 2 and 9 digits.");
        return false;
      }
      if (!/^\d{2,9}$/.test(password)) {
        alert("Password should be between 2 and 9 digits.");
        return false;
      }
      return {
        loginNumber,
        password,
      };
    },
    addStepButtonListeners: () => {
      document
        .querySelectorAll(".onboarding-steps .nav-button.next")
        .forEach((button) => {
          button.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            updateStep(1);
          });
        });

      document
        .querySelectorAll(".onboarding-steps .nav-button.back")
        .forEach((button) => {
          button.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            updateStep(-1);
          });
        });
    },
    updateStep: (increment) => {
      let steps = Array.from(
        document.querySelector(".onboarding-steps").querySelectorAll(".step")
      );

      let currentStep = steps.find((step) => step.classList.contains("active"));

      if (!currentStep) {
        steps.find((step) => step.dataset.step == "0").classList.add("active");
        return;
      }

      let currentStepNumber = parseInt(currentStep.dataset.step);
      let nextStepNumber = currentStepNumber + increment;

      let nextStep = steps.find(
        (step) => parseInt(step.dataset.step) === nextStepNumber
      );

      if (nextStep) {
        currentStep.classList.remove("active");
        nextStep.classList.add("active");

        if (parseInt(nextStep.dataset.step) === 5) {
          const stepFinishButton = nextStep.querySelector(".step-finish");
          if (stepFinishButton) {
            stepFinishButton.addEventListener("click", function () {
              alert(
                "Prototype: Data is not connected. Proceeding to news feed..."
              );
              onboardingIsComplete();
            });
          }
        }
      }
    },
  };

  //crucial base scope functions
  function displayLongSplash() {
  
    if (!elements.splash) return;
    elements.splash.style.display = "flex";
    let logo = document.querySelector(".v-logo");
    let rotationSpeed = 5;
    logo.style.animation = `rotate ${rotationSpeed}s linear infinite`;
    const hideSplashTime = Date.now() + 5000;
    window.onload = function () {
      const remainingTime = Math.max(0, hideSplashTime - Date.now());

      setTimeout(() => {
        elements.splash.style.display = "none";
        logo.style.animation = "";
      }, remainingTime);
    };
  };
  function loadPage(pageName, actionToShow, actionToSetContent) {
    
    store.dispatch(displayLoadSplash,actionToShow);
    // Return the Promise from fetch
    return fetch(`../pages/${pageName}.html`)
      .then((response) => response.text())
      .then((html) => {
        store.dispatch(actionToSetContent(html));
        let pageSpace = document.querySelector(`.${pageName}-Space`);
  
        if (!pageSpace) {
          pageSpace = document.createElement("div");
          pageSpace.classList.add(`${pageName}-Space`, "fade-in");
          elements.surfaceView.insertBefore(pageSpace, elements.surfaceView.firstChild);
        }

        pageSpace.innerHTML = html;
        document.title = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        elements.surfaceView.style.opacity = 0;
        elements.footer.style.display = "none";
        elements.surfaceView.innerHTML = "";
        elements.surfaceView.appendChild(pageSpace);
    
        setTimeout(() => {
          pageSpace.classList.add("active");
          elements.surfaceView.style.opacity = 1;
          elements.splash.style.display = "none";
        }, 100);
      });
  };
  function updateLoginUI(isLoggedIn) {
   
    const formTitle = document.querySelector(".form-title");
    const ToFeedbtn = document.querySelector("#toFeed-button");
    const title = document.querySelector(".title h1");
    const buttonWrap = document.querySelector(".button-wrap");

    
    const loginNumberInput = document.querySelector("#login-number");
    const passwordInput = document.querySelector("#password");

    const onboardingButtonInner = document.querySelector("#onboarding-button");
    const centerComp  = document.querySelector(".login-Space .content");

    if (isLoggedIn) {
      onboardingButtonInner.style.display = "flex";
      centerComp.style.paddingTop = "64px";
      formTitle.textContent = "Login Success";
      ToFeedbtn.style.display = "none";
      title.innerHTML = "Veras<span>Authentication</span>";

      loginNumberInput.style.display = "none";
      passwordInput.style.display = "none";

      const PMemo = document.createElement("p");
      PMemo.textContent = "Please change your password.";
      PMemo.style.whiteSpace = "pre-wrap";
      PMemo.style.marginBottom = "20px";
      PMemo.style.color = "var(--f7-theme-color)";
      buttonWrap.parentNode.insertBefore(PMemo, buttonWrap);
    } else {
      onboardingButtonInner.style.display = "none";
    }
  };
  function updatePageContent(stateProperty, className, title) {
  const state = store.getState();
  if (state[stateProperty]) {
    window.location.hash = stateProperty;
    let pageSpace = document.querySelector(`.${className}`);

    if (!pageSpace) {
      pageSpace = document.createElement("div");
      pageSpace.classList.add(className, "fade-in");
      elements.surfaceView.insertBefore(pageSpace, elements.surfaceView.firstChild);
    }

    pageSpace.innerHTML = state[`${stateProperty}Content`];
    document.title = title;
    elements.surfaceView.style.opacity = 0;
    elements.surfaceView.innerHTML = "";
    elements.surfaceView.appendChild(pageSpace);

    setTimeout(() => {
      pageSpace.classList.add("active");
      elements.surfaceView.style.opacity = 1;
    }, 100);
  }

  };
  function handleLoginFormSubmission(loginSpace) {
    if (!loginSpace.dataset.formEventAttached) {
      loginSpace.dataset.formEventAttached = "true";
  
      setTimeout(() => {
        const loginForm = document.querySelector(".form");
  
        if (loginForm) {
          loginForm.addEventListener("submit", (event) => {
            // Prevent form submission at the start of the event handler
            event.preventDefault();
  
            const loginNumberInput = document.querySelector("#login-number");
            const passwordInput = document.querySelector("#password");
  
            // Validate login number and password
            const loginNumber = loginNumberInput.value;
            const password = passwordInput.value;
  
            const formData = eventHandlers.validateLoginForm(loginNumber, password);
            if (!formData) {
              // If form data is invalid, return early
              return;
            }
  
            // Prepare the userLoginData object
            const userLoginData = {
              loginNumber: formData.loginNumber,
              password: formData.password,
            };
  
            // Send a POST request to login.phps
            fetch("http://study.veras.ca/logins.phps", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userLoginData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.text();
              })
              .then((data) => {
                //do something with the data
              })
              .catch((error) => {
                // Handle errors here
                if (error.message.includes("NetworkError")) {
                  alert("Network Error: Failed to reach the server.");
                } else if (error.message.includes("TypeError")) {
                  alert(
                    "Type Error: There was a problem with the type of the input."
                  );
                } else {
                  // Handle prototype error
                  alert(
                    "This is a prototype, data not connected. Please press OK to proceed."
                  );
                  eventHandlers.successfulLogin(loginNumberInput, passwordInput);
                }
              });
          });
        }
      }, 100);
    }
  };

  
  store.subscribe(() => {

   
    const state = store.getState();
    
  
    if (state.loginVisible) {
      updatePageContent("stateProperty", "login-Space", "Login");
      // ... other logic
    } else if (state.newsfeedVisible) {
      updatePageContent("stateProperty", "newsfeed-Space", "Newsfeed");
      // let newsfeedSpace = document.querySelector(".newsfeed-Space");
      // ... other logic specific to the newsfeed page
    } else if (state.onboardingStepsVisible) {
      updatePageContent("stateProperty", "onboardingSteps-Space", "Onboarding Steps");
      // ... other logic
    } else if (state.onboardingVisible) {
      updatePageContent("stateProperty", "onboarding-Space", "Onboarding");
      // ... other logic
    } else if (state.insightsVisible || state.createVisible) {
      
      let insightsNavLink = document.querySelector(".insights-btn").closest(".nav-lnk");
      let createNavLink = document.querySelector(".create-btn").closest(".nav-lnk");
      let insightsSpace = elements.surfaceView.querySelector(".insights-Space")
      let createSpace = elements.surfaceView.querySelector(".create-Space");
      let feedWrapper = elements.surfaceView.querySelector(".feed-wrapper");
  
      if (state.insightsVisible) {
        insightsNavLink.classList.add("btn-active");
        createNavLink.classList.remove("btn-active");
        if (!insightsSpace) {
          loadPage("insights", actions.showInsights, actions.setInsightsContent);
        } else {
          updatePageContent("stateProperty", "insights-Space", "Insights");
          insightsSpace.style.display = "block";
          if (createSpace) {
            createSpace.style.display = "none";
          }
        }
        feedWrapper.style.display = "none";
      } else if (state.createVisible) {
        createNavLink.classList.add("btn-active");
        insightsNavLink.classList.remove("btn-active");
        if (!createSpace) {
          loadPage("create", actions.showCreate, actions.setCreateContent);
        }
         else {
          updatePageContent("stateProperty", "create-Space", "Create");
          createSpace.style.display = "block";
          if (insightsSpace) {
            insightsSpace.style.display = "none";
          }
        }
        feedWrapper.style.display = "none";
      } else {
        feedWrapper.style.display = "flex";
      }
    }

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
      navbarWrapper.style.height = "0px !important";
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


});
