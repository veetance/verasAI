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

// code for login/onboarding to newsfeed pagee
document.addEventListener("DOMContentLoaded", () => {
  // action Creators
  const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, payload: page });
  const showLogin = () => ({ type: SHOW_LOGIN });
  const hideLogin = () => ({ type: HIDE_LOGIN });
  const logout = () => ({ type: LOGOUT });
  const setLoginContent = (html) => ({
    type: SET_LOGIN_CONTENT,
    payload: html,
  });
  const showNewsfeed = () => ({ type: SHOW_NEWSFEED });
  const setNewsfeedContent = (html) => ({
    type: SET_NEWSFEED_CONTENT,
    payload: html,
  });

  const showInsights = () => ({ type: SHOW_INSIGHTS });
  const hideInsights = () => ({ type: HIDE_INSIGHTS });
  const setInsightsContent = (html) => ({
    type: SET_INSIGHTS_CONTENT,
    payload: html,
  });

  const showCreate = () => ({ type: SHOW_CREATE });
  const hideCreate = () => ({ type: HIDE_CREATE });
  const setCreateContent = (html) => ({
    type: SET_CREATE_CONTENT,
    payload: html,
  });

  const setOnboardingContent = (html) => ({
    type: SET_ONBOARDING_CONTENT,
    payload: html,
  });
  const showOnboarding = () => ({ type: SHOW_ONBOARDING });
  const hideOnboarding = () => ({ type: HIDE_ONBOARDING });

  const setOnboardingStepsContent = (html) => ({
    type: SET_ONBOARDING_STEPS_CONTENT,
    payload: html,
  });
  const showOnboardingSteps = () => ({ type: SHOW_ONBOARDING_STEPS });
  const hideOnboardingSteps = () => {
    localStorage.removeItem("onboardingStepsVisible");
    return { type: HIDE_ONBOARDING_STEPS };
  };

  // Query the DOM elements
  const loginButton = document.querySelector(".login-button");
  const surfaceView = document.querySelector(".surface-view");
  const footer = document.querySelector(".footer-Contents");
  const insightsButton = document.querySelector(".lnk-ico .insights-btn");
  const createButton = document.querySelector(".lnk-ico .create-btn");
  const refreshButtons = document.querySelectorAll(
    ".nav-logo, .nav-title, .VLOGO-wrapper"
  );

  refreshButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "/index.html";
    });
  });

  function updateStep(increment) {

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
        const stepFinishButton = nextStep.querySelector('.step-finish');
        if (stepFinishButton) {
          stepFinishButton.addEventListener('click', function() {
            // Prototype alert here
            alert('Prototype: Data is not connected. Proceeding to news feed...');
  
            // Call onboardComplete. Assume loginNumber, password, nickname are available in the scope
            onboardComplete(loginNumber, password, nickname);
          });
        }
      }
    }
  }
  

  function addStepButtonListeners() {
    document
      .querySelectorAll(".onboarding-steps .nav-button.next")
      .forEach((button) => {
        button.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent the default action
          event.stopPropagation(); // Stop event propagation
          updateStep(1); // Increment the step
        });
      });

    document
      .querySelectorAll(".onboarding-steps .nav-button.back")
      .forEach((button) => {
        button.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent the default action
          event.stopPropagation(); // Stop event propagation
          updateStep(-1); // Decrement the step
        });
      });
  }

  function displaySplash() {
    let splash = document.querySelector(".v-splash");
    if (!splash) return;
    splash.style.display = "flex";
    const hideSplashTime = Date.now() + 1000; 

    window.onload = function () {
      const remainingTime = Math.max(0, hideSplashTime - Date.now());
      setTimeout(() => {
        splash.style.display = "none";
      }, remainingTime);
    };
  }

  function displayLongSplash() {
    let splash = document.querySelector(".v-splash");
    if (!splash) return;
    splash.style.display = "flex";
    let logo = document.querySelector(".v-logo");
    let rotationSpeed = 5;
    logo.style.animation = `rotate ${rotationSpeed}s linear infinite`;
    const hideSplashTime = Date.now() + 5000;
    window.onload = function () {
    const remainingTime = Math.max(0, hideSplashTime - Date.now());

      setTimeout(() => {
        splash.style.display = "none";
        logo.style.animation = "";
      }, remainingTime);
    };
  }

  function onboardSuccess(loginNumber, password, nickname) {
    console.log(
      "Successful login with loginNumber:",
      loginNumber,
      "password:",
      password,
      "nickname:",
      nickname
    );

    // Transition to the next stage of the onboarding process
    store.dispatch(showOnboardingSteps());

    fetch("../pages/onboardingSteps.html")
      .then((response) => response.text())
      .then((html) => {

        store.dispatch(setOnboardingStepsContent())
        let onboardingStepsSpace = document.querySelector(
          ".onboardingSteps-Space"
        );

        if (!onboardingStepsSpace) {
          displaySplash();
          onboardingStepsSpace = document.createElement("div");
          onboardingStepsSpace.classList.add(
            "onboardingSteps-Space",
            "fade-in"
          );
          surfaceView.insertBefore(
            onboardingStepsSpace,
            surfaceView.firstChild
          );
        }

        onboardingStepsSpace.innerHTML = html;
        document.title = "Onboarding Steps";
        surfaceView.style.opacity = 0;
        surfaceView.innerHTML = "";
        surfaceView.appendChild(onboardingStepsSpace);

        setTimeout(() => {
          onboardingStepsSpace.classList.add("active");
          surfaceView.style.opacity = 1;
          document.querySelector(".v-splash").style.display = "none";
          addStepButtonListeners();
          updateStep(0);
        }, 1000);
      });
  }

  function onboardComplete(loginNumber, password, nickname) {
    console.log(
      "Completing onboarding with loginNumber:",
      loginNumber,
      "password:",
      password,
      "nickname:",
      nickname
    );
  
    // Dispatch the showNewsFeed here
    store.dispatch((showNewsfeed));
  
    fetch("../pages/newsFeed.html")
      .then((response) => response.text())
      .then((html) => {
        store.dispatch(setNewsfeedContent());
  
        let newsFeedSpace = document.querySelector(".newsFeed-Space");
  
        if (!newsFeedSpace) {
          displaySplash();
          newsFeedSpace = document.createElement("div");
          newsFeedSpace.classList.add("newsFeed-Space", "fade-in");
          surfaceView.insertBefore(newsFeedSpace, surfaceView.firstChild);
        }
  
        newsFeedSpace.innerHTML = html;
        document.title = "News Feed";
        surfaceView.style.opacity = 0;
        surfaceView.innerHTML = "";
        surfaceView.appendChild(newsFeedSpace);
  
        setTimeout(() => {
          newsFeedSpace.classList.add("active");
          surfaceView.style.opacity = 1;
          document.querySelector(".v-splash").style.display = "none";
          addNewsFeedButtonListeners(); // This should be similar to addStepButtonListeners but for the newsFeed UI
          updateNewsFeed(0); // This should be similar to updateStep but for the newsFeed UI
        }, 1000);
      });
  }

  function validateForm(loginNumber, password, confirmPassword, nickname) {
    // Login Number should be between 2 and 9 digits

    if (!/^\d{2,9}$/.test(loginNumber)) {
      alert("Login Number should be between 2 and 9 digits.");
      return false;
    }
  
    // Password should be between 2 and 9 digits
    if (!/^\d{2,9}$/.test(password)) {
      alert("Password should be between 2 and 9 digits.");
      return false;
    }
  
    // Confirm Password should match Password
    if (password !== confirmPassword) {
      alert("Confirm Password should match Password.");
      return false;
    }
  
    // Nickname should be alphanumeric and may contain periods, dashes and underscores
    // If it's provided, then it's checked for validity
    if (nickname && !/^[a-zA-Z0-9._-]*$/.test(nickname)) {
      alert(
        "Nickname should be alphanumeric and may contain periods, dashes and underscores."
      );
      return false;
    }
  
    // If validation passed, return the form data as an object
    return {
      loginNumber,
      password,
      nickname,
    };
  }
  
  function validateLoginForm(loginNumber, password) {

    if (!/^\d{2,9}$/.test(loginNumber)) {
      alert("Login Number should be between 2 and 9 digits.");
      return false;
    }
  
    // Password should be between 2 and 9 digits
    if (!/^\d{2,9}$/.test(password)) {
      alert("Password should be between 2 and 9 digits.");
      return false;
    }
  
    // If validation passed, return the form data as an object
    return {
      loginNumber,
      password,
    };

  }
  

  let loginSuccessful = false;

  if (loginButton) {
    loginButton.addEventListener("click", () => {

      displaySplash();

      store.dispatch(showLogin());

      // Start of fetch call
      fetch("../pages/login.html")
        .then((response) => response.text())
        .then((html) => {
          store.dispatch(setLoginContent(html));
          document.querySelector(".v-splash").style.display = "none";

          const onboardingButton = document.querySelector("#onboarding-button");

          if (loginSuccessful) {
            onboardingButton.style.display = "flex";
          } else {
            onboardingButton.style.display = "none";
          }

          if (onboardingButton) {
            onboardingButton.addEventListener("click", () => {
              displaySplash();
              store.dispatch(hideLogin());
              store.dispatch(showOnboarding());

              loginSuccessful = false;
              onboardingButton.style.display = "none";

              fetch("../pages/onboarding.html")
                .then((response) => response.text())
                .then((html) => {
                  store.dispatch(setOnboardingContent(html));
                  document.querySelector(".v-splash").style.display = "none";

                  const toStepsButton = document.querySelector("#to-steps");

                async function postUserData(onboardUserData) {
                    const response = await fetch("http://study.veras.ca/home.phps", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(onboardUserData),
                    });
                  
                    if (!response.ok) {
                      throw new Error("Network response was not ok");
                    }
                  
                    return await response.text();
                  }
                  
                  if (toStepsButton) {
                      toStepsButton.addEventListener("click", async () => {
                      const loginNumber = document.getElementById("login-number").value;
                      const password = document.getElementById("password").value;
                      const confirmPassword = document.getElementById("confirm-password").value;
                      const nickname = document.getElementById("nickname").value;
                  
                      const onboardUserData = validateForm(
                        loginNumber,
                        password,
                        confirmPassword,
                        nickname
                      );
                  
                      // Handle input field errors
                      if (typeof onboardUserData === 'string') {
                        alert(onboardUserData); // onboardUserData contains the error message
                        return; // Stop the function here if there are validation errors
                      }
                  
                      try {
                        // Handle posting errors
                        const data = await postUserData(onboardUserData);
                        
                        if (data.error) {
                          alert(data.error); // Show the error message returned by postUserData()
                        } 
                  
                      } catch (error) {
                        if (error.message.includes("NetworkError")) {
                          alert("Network Error: Failed to reach the server.");
                          alert("This is prototype, Data not connected to server yet.");
                        } else if (error.message.includes("TypeError")) {
                          alert("Type Error: There was a problem with the type of the input.");
                        }
                        onboardSuccess(loginNumber, password, nickname);
                      }
                    });
                  }                
                })

                .catch((error) => {
                  console.error("showonbrdCntnt-Error:", error);
                  document.querySelector(".v-splash").style.display = "none";
                });
            });
          }
        })

        .catch((error) => {
          console.error("login-Error:", error);
          document.querySelector(".v-splash").style.display = "none";
        });
      // End of fetch call
    });
  }

  function successfulLogin(loginNumberInput, passwordInput) {
    // Set loginSuccessful to true
    const loginSuccessful = true;

    const onboardingButton = document.querySelector("#onboarding-button");

    // if loginSuccessful and onboardingButton exists, display onboardingButton else hide onboardingButton and remove it from the DOM
    if (loginSuccessful) {
      onboardingButton.style.display = "flex";
    } else {
      onboardingButton.style.display = "none";
    }

    // Assuming that displayLongSplash() is a function that shows a splash screen
    displayLongSplash();

    // Clear and hide the form inputs
    loginNumberInput.value = "";
    passwordInput.value = "";
    loginNumberInput.style.display = "none";
    passwordInput.style.display = "none";

    // Change the form title
    const formTitle = document.querySelector(".form-title");
    formTitle.textContent = "Login Success";

    // hide tofeed button
    const ToFeedbtn = document.querySelector("#toFeed-button");
    ToFeedbtn.style.display = "none";

    // Change the title
    const title = document.querySelector(".title h1");

    title.innerHTML = "Veras<span>Authentication</span>";

    // Create and append the new message
    const h2Memo = document.createElement("h2");
    h2Memo.textContent = "Please change your password.";
    h2Memo.style.whiteSpace = "pre-wrap";
    h2Memo.style.marginBottom = "20px";
    h2Memo.style.color = "var(--f7-theme-color)";
    const buttonWrap = document.querySelector(".button-wrap");
    buttonWrap.parentNode.insertBefore(h2Memo, buttonWrap);

    // Hide the splash screen after 5 seconds
    setTimeout(() => {
      document.querySelector(".v-splash").style.display = "none";
    }, 2000);
  }

  let lastClickedButton = null;

  if (insightsButton) {
    insightsButton.addEventListener("click", function () {
      lastClickedButton = this;
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
    createButton.addEventListener("click", function () {
      lastClickedButton = this;
      store.dispatch(showCreate());
      store.dispatch(hideInsights());
      fetch("../pages/create.html")
        .then((response) => response.text())
        .then((html) => {
          store.dispatch(setCreateContent(html));
        });
    });
  }

  displaySplash();
  //ui changes are made
  store.subscribe(() => {
    const state = store.getState();

    if (state.loginVisible) {
      // Your code for loginVisible...
      window.history.pushState({ page: "login" }, "", "/pages/login.html");

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
              // Prevent form submission at the start of the event handler
              event.preventDefault();
          
              const loginNumberInput = document.querySelector("#login-number");
              const passwordInput = document.querySelector("#password");
          
              // Validate login number and password
              const loginNumber = loginNumberInput.value;
              const password = passwordInput.value;
          
              const formData = validateLoginForm(loginNumber, password);
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
                //do somethiing with the data
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
                    successfulLogin(loginNumberInput, passwordInput);
                  }
                });
            });

        }, 100);
      }

    } else if (state.onboardingStepsVisible) {
      // Your code for onboardingStepsVisible
      window.history.pushState(
        { page: "onboardingSteps" },
        "",
        "../pages/onboardingSteps.html"
      );

      displaySplash();
      // Call this function after the buttons have been added to the DOM

      let onboardingStepsSpace = document.querySelector(
        ".onboardingSteps-Space"
      );

      if (!onboardingStepsSpace) {
        onboardingStepsSpace = document.createElement("div");
        onboardingStepsSpace.classList.add("onboardingSteps-Space", "fade-in");
        surfaceView.insertBefore(onboardingStepsSpace, surfaceView.firstChild);
      }

      onboardingStepsSpace.innerHTML = state.onboardingStepsContent;
      document.title = "Onboarding Steps";
      surfaceView.style.opacity = 0;
      surfaceView.innerHTML = "";
      surfaceView.appendChild(onboardingStepsSpace);

      setTimeout(() => {
        onboardingStepsSpace.classList.add("active");
        surfaceView.style.opacity = 1;
        
      }, 100);
    } else if (state.onboardingVisible) {
      // Your code for onboardingVisible...
      window.history.pushState({ page: "onboarding" }, "", "../pages/onboarding.html");
      let onboardingSpace = document.querySelector(".onboarding-Space");

      if (!onboardingSpace) {
        onboardingSpace = document.createElement("div");
        onboardingSpace.classList.add("onboarding-Space", "fade-in");
        surfaceView.insertBefore(onboardingSpace, surfaceView.firstChild);
      }

      onboardingSpace.innerHTML = state.onboardingContent;
      document.title = "Onboarding";
      surfaceView.style.opacity = 0;
      surfaceView.innerHTML = "";
      surfaceView.appendChild(onboardingSpace);

      setTimeout(() => {
        onboardingSpace.classList.add("active");
        surfaceView.style.opacity = 1;
      }, 100);
    } else if (state.newsfeedVisible) {
      // Your code for newsfeedVisible...
      window.history.pushState({ page: "newsfeed" }, "", "../pages/newsfeed.html");
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

      setTimeout(() => {
        surfaceView.style.opacity = 1;
      }, 100);
    } else {
      if (lastClickedButton !== null) {
        let insightsNavLink = document
          .querySelector(".insights-btn")
          .closest(".nav-lnk");
        let createNavLink = document
          .querySelector(".create-btn")
          .closest(".nav-lnk");

        let insightsSpace = document.querySelector(".insights-Space");
        let createSpace = document.querySelector(".create-Space");

        let feedWrapper = document.querySelector(".feed-wrapper");
        let feedScroll = document.querySelector(".feed-scroll");

        if (state.insightsVisible) {
          window.history.pushState({ page: "insights" }, "", "../pages/insights.html");
          insightsNavLink.classList.add("btn-active");
          createNavLink.classList.remove("btn-active");
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
          window.history.pushState({ page: "create" }, "", "../pages/create.html");
          createNavLink.classList.add("btn-active");
          insightsNavLink.classList.remove("btn-active");

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
          feedWrapper.style.display = "flex";
        }
      }
    }
  });

  window.addEventListener("pushstate", (event) => {
    // Call history.pushState for every state change that should be reflected in the history

    if (event.state) {
      switch (state.currentPage) {
        case "login":
          window.history.pushState(state, "", "../pages/login.html");
          break;
        case "onboarding":
          window.history.pushState(state, "", "../pages/onboarding.html");
          break;
        case "onboardingSteps":
          window.history.pushState(state, "", "../pages/onboardingSteps.html");
          break;
        case "insights":
          window.history.pushState(state, "", "../pages/insights.html");
          break;
        case "create":
          window.history.pushState(state, "", "../pages/create.html");
          break;
        // Add other cases for all the possible pages...
        default:
          window.history.pushState(state, "", "../pages/index.html");
          break;
      }
    }
  });

  window.addEventListener("popstate", (event) => {
    if (event.state) {
      // Dispatch action based on the state stored in history
      switch (event.state.currentPage) {
        case "login":
          store.dispatch(showLogin());
          break;
        case "onboarding":
          store.dispatch(showOnboarding());
          break;
        case "onboardingteps":
          store.dispatch(showOnboardingSteps());
          break;
        case "insights":
          store.dispatch(showInsights());
          break;
        case "create":
          store.dispatch(showCreate());
          break;
        // add other cases for all the possible pages...
      }
    } else {
      store.dispatch(setCurrentPage("index"));
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
