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
  // Action creators
  function hideHome() {
    return { type: HIDE_HOME };
  }
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
    // If the splash div does not exist on this page, exit the function
    if (!splash) return;
    // Ensure the splash is displayed immediately
    splash.style.display = "flex";
    // Define a time when the splash screen can be hidden
    const hideSplashTime = Date.now() + 1000; // 9000 milliseconds = 9 seconds
    // Wait until the page is fully loaded
    window.onload = function () {
      // Calculate any remaining time to wait
      const remainingTime = Math.max(0, hideSplashTime - Date.now());

      // Wait the remaining time, then hide the splash screen
      setTimeout(() => {
        splash.style.display = "none";
      }, remainingTime);
    };
  }

  function displayLongSplash() {
    let splash = document.querySelector(".v-splash");
    // If the splash div does not exist on this page, exit the function
    if (!splash) return;
    // Ensure the splash is displayed immediately
    splash.style.display = "flex";

    // Get the logo element
    let logo = document.querySelector(".v-logo");
    // Set the rotation speed in seconds
    let rotationSpeed = 5;
    // Apply the rotation animation to the logo
    logo.style.animation = `rotate ${rotationSpeed}s linear infinite`;

    // Define a time when the splash screen can be hidden
    const hideSplashTime = Date.now() + 5000; // 5000 milliseconds = 5 seconds
    // Wait until the page is fully loaded
    window.onload = function () {
      // Calculate any remaining time to wait
      const remainingTime = Math.max(0, hideSplashTime - Date.now());

      // Wait the remaining time, then hide the splash screen
      setTimeout(() => {
        splash.style.display = "none";
        // Stop the rotation animation when the splash screen is hidden
        logo.style.animation = "";
      }, remainingTime);
    };
  }

  // Query the DOM elements
  const refreshButtons = document.querySelectorAll(
    ".nav-logo, .nav-title, .VLOGO-wrapper"
  );
  refreshButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "/index.html";
    });
  });
  window.addEventListener("load", function () {
    if (window.location.pathname !== "/index.html") {
      // Redirect to index.html
      window.location.href = "/index.html";
    }
  });

  // When the page is about to be unloaded (e.g., on refresh or navigation)
  window.addEventListener("beforeunload", function () {
    // Mark that a reload is happening
    localStorage.setItem("reload", "true");
  });

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

    fetch("pages/onboardingSteps.html")
      .then((response) => response.text())
      .then((html) => {
        store.dispatch(setOnboardingStepsContent());

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
        footer.style.display = "none !important";

        setTimeout(() => {
          onboardingStepsSpace.classList.add("active");
          surfaceView.style.opacity = 1;
          document.querySelector(".v-splash").style.display = "none";
          addStepButtonListeners();
          updateStep(0);
        }, 1000);
      });
  }

  let loginSuccessful = false;

  if (loginButton) {
    loginButton.addEventListener("click", () => {
      displaySplash();

      store.dispatch(showLogin());

      // Start of fetch call
      fetch("pages/login.html")
        .then((response) => response.text())
        .then((html) => {
          store.dispatch(setLoginContent(html));
          // Hide the splash screen after login page is successfully fetched
          document.querySelector(".v-splash").style.display = "none";

          // Add the event listener for the onboarding button here, after the login content is inserted into the DOM

          const onboardingButton = document.querySelector("#onboarding-button");

          if (loginSuccessful) {
            onboardingButton.style.display = "flex";
          } else {
            onboardingButton.style.display = "none";
          }

          if (onboardingButton) {
            onboardingButton.addEventListener("click", () => {
              displaySplash();
              store.dispatch(hideLogin()); // Hide the login form
              store.dispatch(showOnboarding()); // Show the onboarding form

              fetch("pages/onboarding.html")
                .then((response) => response.text())
                .then((html) => {
                  store.dispatch(setOnboardingContent(html));
                  // Hide the splash screen after login page is successfully fetched
                  document.querySelector(".v-splash").style.display = "none";

                  //validate form
                  function validateForm(
                    loginNumber,
                    password,
                    confirmPassword,
                    nickname
                  ) {
                    // Login Number should be 6 digits
                    if (!/^\d{6}$/.test(loginNumber)) {
                      alert("Login Number should be 6 digits.");
                      return false;
                    }

                    // Password should be minimum 6 digits
                    if (!/^\d{6,}$/.test(password)) {
                      alert("Password should be minimum 6 digits.");
                      return false;
                    }

                    // Confirm Password should match Password
                    if (password !== confirmPassword) {
                      alert("Confirm Password should match Password.");
                      return false;
                    }

                    // Nickname should be alphanumeric and may contain periods, dashes and underscores
                    if (nickname && !/^[a-zA-Z0-9._-]+$/.test(nickname)) {
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

                  // to onboardingSteps
                  // Add the event listener for the to-steps button here, after the onboarding content is inserted into the DOM
                  const toStepsButton = document.querySelector("#to-steps");
                  if (toStepsButton) {
                    toStepsButton.addEventListener("click", () => {
                      const loginNumber =
                        document.getElementById("login-number").value;
                      const password =
                        document.getElementById("password").value;
                      const confirmPassword =
                        document.getElementById("confirm-password").value;
                      const nickname =
                        document.getElementById("nickname").value;

                      // Check for "God mode"
                      if (loginNumber === "1" && password === "1") {
                        onboardSuccess(loginNumber, password, nickname);
                        return;
                      }

                      const onboardUserData = validateForm(
                        loginNumber,
                        password,
                        confirmPassword,
                        nickname
                      );

                      // If the form is not valid, userData will be false and we stop the event handler
                      if (!onboardUserData) {
                        return;
                      }

                      // Send a POST request to homepage.phps
                      fetch("http://study.veras.ca/home.phps", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(onboardUserData),
                      })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error("Network response was not ok");
                          }
                          return response.text();
                        })
                        .then((data) => {
                          onboardSuccess(loginNumber, password, nickname);
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
                            alert(
                              "Login Data Error: There was a problem with the login data."
                            );
                          }
                        });
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

        // Include error handling for login page fetch
        .catch((error) => {
          console.error("login-Error:", error);
          document.querySelector(".v-splash").style.display = "none";
        });
      // End of fetch call
    });
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
      window.history.pushState({ page: "login" }, "", "/login.html");

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
            // Prevent form submission at the start of the event handler
            event.preventDefault();

            const loginNumberInput = document.querySelector("#login-number");
            const passwordInput = document.querySelector("#password");

            // Validate login number and password
            const loginNumber = loginNumberInput.value;
            const password = passwordInput.value;

            // Check for "God mode"
            if (loginNumber === "1" && password === "1") {
              successfulLogin(loginNumberInput, passwordInput);
              return;
            }

            // Check for normal login
            if (loginNumber.length !== 7 && loginNumber.length !== 8) {
              alert("Login number should be 7 or 8 digits.");
              return;
            }

            if (password.length !== 5) {
              alert("Password should be 5 digits.");
              return;
            }

            // Prepare the userLoginData object
            const userLoginData = {
              loginNumber: loginNumber,
              password: password,
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
                // If validation passes, proceed with successful login
                successfulLogin(loginNumberInput, passwordInput);
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
                  alert(
                    "Login Data Error: There was a problem with the login data."
                  );
                }
              });
          });
        }, 100);
      }

      function successfulLogin(loginNumberInput, passwordInput) {
        // Set loginSuccessful to true
        loginSuccessful = true;

        const onboardingButton = document.querySelector("#onboarding-button");

        if (loginSuccessful) {
          onboardingButton.style.display = "flex";
        } else {
          onboardingButton.style.display = "none";
        }

        // Start the splash screen
        displayLongSplash();

        // Clear and hide the form inputs
        loginNumberInput.value = "";
        passwordInput.value = "";
        loginNumberInput.style.display = "none";
        passwordInput.style.display = "none";

        // Change the form title
        const formTitle = document.querySelector(".form-title");
        formTitle.textContent = "Login Success";
        // Create and append the back button
        const backButton = document.createElement("i");
        backButton.classList.add(
          "material-symbols-outlined",
          "global-back-btn"
        );
        backButton.textContent = "Done";
        formTitle.appendChild(backButton);

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
    } else if (state.onboardingStepsVisible) {
      // Your code for onboardingStepsVisible
      window.history.pushState(
        { page: "onboardingSteps" },
        "",
        "/onboardingSteps.html"
      );
      footer.style.display = "none !important";
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
      footer.style.display = "none !important";

      setTimeout(() => {
        onboardingStepsSpace.classList.add("active");
        surfaceView.style.opacity = 1;
        // Call addStepButtonListeners() after the new HTML content is inserted
      }, 100);
    } else if (state.onboardingVisible) {
      // Your code for onboardingVisible...
      window.history.pushState({ page: "onboarding" }, "", "/onboarding.html");
      let onboardingSpace = document.querySelector(".onboarding-Space");

      if (!onboardingSpace) {
        onboardingSpace = document.createElement("div");
        onboardingSpace.classList.add("onboarding-Space", "fade-in");
        surfaceView.insertBefore(onboardingSpace, surfaceView.firstChild);
      }

      //to onboarding steps

      onboardingSpace.innerHTML = state.onboardingContent;
      document.title = "Onboarding";
      surfaceView.style.opacity = 0;
      surfaceView.innerHTML = "";
      surfaceView.appendChild(onboardingSpace);
      footer.style.display = "none !important";

      setTimeout(() => {
        onboardingSpace.classList.add("active");
        surfaceView.style.opacity = 1;
      }, 100);
    } else if (state.newsfeedVisible) {
      // Your code for newsfeedVisible...
      window.history.pushState({ page: "newsfeed" }, "", "/newsfeed.html");
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
          window.history.pushState({ page: "insights" }, "", "/insights.html");
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
          window.history.pushState({ page: "create" }, "", "/create.html");
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
          window.history.pushState(state, "", "/login.html");
          break;
        case "onboarding":
          window.history.pushState(state, "", "/onboarding.html");
          break;
        case "onboardingSteps":
          window.history.pushState(state, "", "/onboardingSteps.html");
          break;
        case "insights":
          window.history.pushState(state, "", "/insights.html");
          break;
        case "create":
          window.history.pushState(state, "", "/create.html");
          break;
        // Add other cases for all the possible pages...
        default:
          window.history.pushState(state, "", "/index.html");
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

  // Wait for the DOM content to load
  document.addEventListener("DOMContentLoaded", () => {
    // Then try to add the event listener
    const backButton = document.querySelector(".global-back-btn");

    // Check if the button exists
    if (backButton) {
      backButton.addEventListener("click", () => {
        window.history.back();
      });
    } else {
      console.error("Back button not found");
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
