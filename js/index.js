// Frontend-ONLY JS
document.addEventListener("DOMContentLoaded", () => {
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

  // ... your existing code ...

  const vFormBtn = document.querySelector(".v-form-btn");
  const vFormBtn2 = document.querySelector(".v-form-btn-2");
  const contactUsModalWrapper = document.querySelector(
    ".contact-us-modal-wrapper"
  );
  const vForminner = document.querySelector(".v-form-inner-wrapper");
  const vFormClose = document.querySelector(
    "#v-form-close , .login-button , .navbar-wrapper"
  );
  const navbarWrapper = document.querySelector(".navbar-wrapper");

  function showContactUS() {
    contactUsModalWrapper.style.display = "flex";
    navbarWrapper.style.cursor = "pointer";

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

  if (vFormBtn) {
    vFormBtn.addEventListener("click", function () {
      showContactUS();
    });
  }
  if (vFormBtn2) {
    vFormBtn2.addEventListener("click", function () {
      showContactUS();
    });
  }
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
///
///
///
///
/// main index.js section
document.addEventListener("DOMContentLoaded", () => {
  
  let Loadsplash = document.querySelector(".v-splash");
  isLoadPageRunning = false;
  loadLong();
  
  const createAction = (url, type, payload) => {
    const urlObj = new URL(url, window.location.href);
    const state = { page: urlObj.hash.slice(1) };
    history.pushState(state, "", urlObj.toString());

    return { type, payload };
  };

  const actions = {
    setCurrentPage: (page) => createAction(`#${page}`, SET_CURRENT_PAGE, page),
    showHome: () => createAction("#home", SHOW_HOME, "home"),
    setHomeContent: (html) => ({ type: SET_HOME_CONTENT, payload: html }),
    showLogin: () => createAction("#login", SHOW_LOGIN, "login"),
    logout: () => createAction("#logout", LOGOUT, "logout"),
    setLoginContent: (html) => ({ type: SET_LOGIN_CONTENT, payload: html }),
    showNewsfeed: () => createAction("#newsfeed", SHOW_NEWSFEED, "newsfeed"),
    setNewsfeedContent: (html) => ({
      type: SET_NEWSFEED_CONTENT,
      payload: html,
    }),
    showInsights: () => createAction("#insights", SHOW_INSIGHTS, "insights"),
    setInsightsContent: (html) => ({
      type: SET_INSIGHTS_CONTENT,
      payload: html,
    }),
    showCreate: () => createAction("#create", SHOW_CREATE, "create"),
    setCreateContent: (html) => ({ type: SET_CREATE_CONTENT, payload: html }),
    setOnboardingContent: (html) => ({
      type: SET_ONBOARDING_CONTENT,
      payload: html,
    }),
    showOnboarding: () =>
      createAction("#onboarding", SHOW_ONBOARDING, "onboarding"),
    setOnboardingStepsContent: (html) => ({
      type: SET_ONBOARDING_STEPS_CONTENT,
      payload: html,
    }),
    showOnboardingSteps: () =>
      createAction(
        "#onboardingSteps",
        SHOW_ONBOARDING_STEPS,
        "onboardingSteps"
      ),
  };
  const elements = {
    loginButton: document.querySelector(".login-button"),
    logoutButton: document.querySelector(".logout-button"),
    surfaceView: document.querySelector(".surface-view"),
    footer: document.querySelector(".footer-Contents"),
    insightsButton: document.querySelector(".lnk-ico .insights-btn"),
    createButton: document.querySelector(".lnk-ico .create-btn"),
    upNav: document.querySelector(".navbar-wrapper"),
    splash: document.querySelector(".v-splash"),
    refreshButtons: document.querySelectorAll(
      ".nav-logo, .nav-title, .VLOGO-wrapper"
    ),
  };
  const eventHandlers = {
    
    dispatchPageAction: async (pageName) => {

      switch (pageName) {
        case "login":
          await eventHandlers.handleLoginButtonClick();
          break;
        case "home":
          await store.dispatch(actions.showHome());
          break;
        case "newsfeed":
          await eventHandlers.handleNewsfeedButtonClick();
          break;
        case "insights":
          await store.dispatch(actions.showInsights());
          break;
        case "create":
          await store.dispatch(actions.showCreate());
          break;
        case "onboarding":
          await eventHandlers.handleToOnboardFormClick();
          break;
        case "onboardingSteps":
          await store.dispatch(actions.showOnboardingSteps());
          await eventHandlers.onboardSuccess();
          break;
        default:
          // Show a popup alert
          console.warn(`Unknown page | REDIRECTING TO HOME: ${pageName}`);
          alert(`Unknown page | Click ok to go to [Home]: ${pageName}`);
    
          // Redirect the user to the home page
          await store.dispatch(actions.showHome());
          break;
      }

      setTimeout(() => {
         // Now hide the splash screen
         isLoadPageRunning = false;
         elements.splash.style.display = "none";
      }, 260);


    },
    handleReirectDispatchOnLoad: async () => {

      const url = new URL(window.location.href);
      const pageName = url.hash ? url.hash.slice(1) : "home";
      url.pathname = getPagePath(pageName);
      url.hash = pageName;
      history.replaceState({}, document.title, `${url.hash}`);
    
      window.addEventListener("popstate", function (event) {
        const state = event.state;
        if (state) {
          window.location.reload();
        }
      });
    
      setTimeout(async () => {
        await eventHandlers.dispatchPageAction(pageName);
      }, 1000);
    },
    handleLoginButtonClick: () => {

      loadPage("login", actions.showLogin(), actions.setLoginContent).then(
        () => {
          // Call submission handler
          let loginSpace = document.querySelector(".login-Space");
          handleLoginFormSubmission(loginSpace);

          const toOnboardingForm = document.getElementById("registr");
          toOnboardingForm.addEventListener("click", () => {
            eventHandlers.handleToOnboardFormClick();
          });

          let waitListButton = document.querySelector("#waitList");
          waitListButton.addEventListener("click", () => {
            store.dispatch(actions.showHome()), window.location.reload();
          });
        }
      );
    },
    handleToOnboardFormClick: () => {
      setTimeout(() => {
        loadPage(
          "onboarding",
          actions.showOnboarding(),
          actions.setOnboardingContent
        ).then(() => {
          let onboardingSpace = document.querySelector(".onboarding-Space");
          handleOnboardingFormSubmission(onboardingSpace);
        });
      },20);
    },
    handleNewsfeedButtonClick: () => {

      isLoadPageRunning = true;
      loadLong();

      updateNewsfeedNAV(true);
      loadPage(
        "newsfeed",
        actions.showNewsfeed(),
        actions.setNewsfeedContent
      ).then(() => {
        eventHandlers.updateNewsfeedUI();
        isLoadPageRunning = false;
        elements.splash.style.display = "none";
      }, 800);
    },
    handleInsightsButtonClick: () => {
      store.dispatch(actions.hideCreate());
      loadPage("insights", actions.showInsights, actions.setInsightsContent);
    },
    handleCreateButtonClick: () => {
      store.dispatch(actions.hideInsights());
      loadPage("create", actions.showCreate, actions.setCreateContent);
    },
    handleRefreshButtonClick: () => {
      store.dispatch(actions.showHome());
      window.location.reload();
    },
    handleNavSlideUpClick: () => {},
    addStepButtonListeners: () => {
      document
        .querySelectorAll(".onboarding-steps .nav-button.next")
        .forEach((button) => {
          button.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            eventHandlers.updateStep(1);
          });
        });

      document
        .querySelectorAll(".onboarding-steps .nav-button.back")
        .forEach((button) => {
          button.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            eventHandlers.updateStep(-1);
          });
        });
    },
    updateStep: (increment) => {
      stepMainAdjust();

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
          const stepFinishButtons = nextStep.querySelectorAll(".step-finish");
          if (stepFinishButtons) {
            stepFinishButtons.forEach(function (button) {
              button.addEventListener("click", function () {
                isLoadPageRunning = true;
                loadLong();

                setTimeout(() => {
                  alert(
                    "Prototype: Data is not connected. Proceeding to news feed..."
                  );
                  eventHandlers.handleNewsfeedButtonClick();
                }, 800);
              });
            });
          }
        }
      }
    },
    onboardSuccess: () => {
      isLoadPageRunning = true;
      loadLong();

      setTimeout(() => {
        loadPage(
          "onboardingSteps",
          actions.showOnboardingSteps(),
          actions.setOnboardingStepsContent
        ).then(() => {
          eventHandlers.addStepButtonListeners();
          eventHandlers.updateStep();
          isLoadPageRunning = false;
          elements.splash.style.display = "none";
        });
      }, 700);
    },
    updateNewsfeedUI: () => {

      const LogOutButton = document.querySelector(".logout-button");
      LogOutButton.addEventListener("click", function () {
        alert("You are about to be logged out.");
        store.dispatch(actions.showHome());
        window.location.reload();
      });

      const newsfeedButton = document.querySelector(".newsfeed-button");
      const modal = document.querySelector(".collapsable-comp");
      newsfeedButton.addEventListener("click", function () {
        window.location.reload();
      });

      const navLink = document.querySelector("#hamBurg");
      const settingsModal = document.querySelector(".settings-modal");

      if (navLink && settingsModal) {
        navLink.addEventListener("click", function () {
          modal.style.display = "flex";

          setTimeout(() => {
            this.classList.toggle("active");
            settingsModal.classList.toggle("shown");
          });
        });
      }
      // We listen to the transitionend event which will be fired when the toggle animation finishes
      settingsModal.addEventListener("transitionend", function () {
        if (!settingsModal.classList.contains("shown")) {
          setTimeout(() => {
            modal.style.display = "none";
          }, 0);
        }
      });

      // get references to the elements
      const newsfeedLeft = document.querySelector(".Newsfeed-Left");
      const quickSurvey = document.querySelector(".Quick-survey");
      const closedeedLeft = document.getElementById("closeNewsfeed");
      const feedscrollHEAD = document.querySelector(".feed-scrollHead");

      // functions to handle the click events
      function handleNewsfeedLeftClick() {
        newsfeedLeft.style.maxHeight = "100%";
        quickSurvey.style.maxHeight = "60px";
        closedeedLeft.style.padding = "16px 16px 16px 16px";
      }

      function handleQuickSurveyClick() {
        quickSurvey.style.maxHeight = "100%";

        newsfeedLeft.style.maxHeight = "26px";
        newsfeedLeft.style.backgroundColor = "var(--v-white-plane-clear)";
        newsfeedLeft.style.border =
          "solid 0px var(--v-white-plane-clear) !important";
        newsfeedLeft.style.borderBottom =
          "solid 0px var(--v-white-plane-clear) !important";

        feedscrollHEAD.style.border =
          " 0px solid var(--v-lavender-plane); !important";
        feedscrollHEAD.style.borderBottom =
          " 0px solid var(--v-lavender-plane); !important";

        closedeedLeft.style.backgroundColor = "var(--v-white-plane-clear)";
        closedeedLeft.style.padding = "0px 0px 0px 16px";
      }

      // function to handle the change in media query
      function handleScreenChange() {
        if (window.innerWidth >= 200 && window.innerWidth <= 1060) {
          // tablet mode
          newsfeedLeft.style.transition =
            "max-height .5s cubic-bezier(0.4, 0, 0.2, 1)";
          quickSurvey.style.transition =
            "max-height .5s cubic-bezier(0.4, 0, 0.2, 1)";

          // add event listeners to the elements
          newsfeedLeft.addEventListener("click", handleNewsfeedLeftClick);
          quickSurvey.addEventListener("click", handleQuickSurveyClick);
        } else {
          // desktop mode
          newsfeedLeft.style.transition =
            "width .5s cubic-bezier(0.4, 0, 0.2, 1)";
          quickSurvey.style.transition =
            "width .5s cubic-bezier(0.4, 0, 0.2, 1)";

          // set the heights to 100%
          newsfeedLeft.style.maxHeight = "100%";
          quickSurvey.style.maxHeight = "100%";

          // remove event listeners from the elements
          newsfeedLeft.removeEventListener("click", handleNewsfeedLeftClick);
          quickSurvey.removeEventListener("click", handleQuickSurveyClick);
        }
      }
      handleScreenChange();
      window.addEventListener("resize", handleScreenChange);

      //////
      document
        .getElementById("written-survey-tab")
        .addEventListener("click", function () {
          activateTab("written-survey");
        });

      document
        .getElementById("multiple-choice-tab")
        .addEventListener("click", function () {
          activateTab("multiple-choice");
        });

      function activateTab(tabName) {
        // Hide all tab content
        var tabContents = document.getElementsByClassName("tab-content");
        for (var i = 0; i < tabContents.length; i++) {
          tabContents[i].style.display = "none";
        }

        // Remove the active class from all tabs
        var tabs = document.getElementsByClassName("tab");
        for (var i = 0; i < tabs.length; i++) {
          tabs[i].classList.remove("active");
        }

        // Show the selected tab content and add the active class to the selected tab
        document.getElementById(tabName + "-content").style.display = "block";
        document.getElementById(tabName + "-tab").classList.add("active");
      }
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
      if (!/^\d{3,9}$/.test(loginNumber)) {
        alert("Login Number should be between 3 and 9 digits.");
        return false;
      }
      if (!/^\d{3,9}$/.test(password)) {
        alert("Password should be between 3 and 9 digits.");
        return false;
      }
      if (loginNumber === "123456789" && password !== "123456") {
        alert("Please check your password.");
        return false;
      } else if (loginNumber === "123456789" && password === "123456") {
        
        setTimeout(() => {
            eventHandlers.handleNewsfeedButtonClick();
        },0);

      }
      return {
        loginNumber,
        password,
      };
    }
  };

  //attatch event listiners
  window.addEventListener("load", function () {
    eventHandlers.handleReirectDispatchOnLoad();

    if (elements.loginButton) {
      elements.loginButton.addEventListener(
        "click",
        eventHandlers.handleLoginButtonClick
      );
    }
    if (elements.logoutButton) {
      elements.logoutButton.addEventListener(
        "click",
        eventHandlers.handleLogoutButtonClick
      );
    }
    if (elements.insightsButton) {
      elements.insightsButton.addEventListener(
        "click",
        eventHandlers.handleInsightsButtonClick
      );
    }
    if (elements.createButton) {
      elements.createButton.addEventListener(
        "click",
        eventHandlers.handleCreateButtonClick
      );
    }
    if (elements.refreshButtons) {
      elements.refreshButtons.forEach((button) =>
        button.addEventListener("click", eventHandlers.handleRefreshButtonClick)
      );
    }
  });

  function displayLoadSplash() {
    // If the flag is set, display the splash screen and remove the flag
    if (!Loadsplash) return;
    Loadsplash.style.display = "flex";
    isLoadPageRunning = true;
    const hideSplashTime = Date.now();
    const remainingTime = Math.max(0, hideSplashTime + Date.now());
    setTimeout(() => {
      Loadsplash.style.display = "none";
    }, remainingTime);
  }
  function displayLongSplash() {
    if (!elements.splash) return;
    elements.splash.style.display = "flex";
    let logo = document.querySelector(".v-logo");
    let rotationSpeed = 5;

    logo.style.animation = `rotate ${rotationSpeed}s linear infinite`;
    const hideSplashTime = Date.now() + 5000;
    const remainingTime = Math.max(0, hideSplashTime + Date.now());
    setTimeout(() => {
      isLoadPageRunning = false;
    }, remainingTime);
  }

  function getPagePath(pageName) {
    const isHome = pageName === "home";
    const path = isHome ? "" : "./pages/";
    return `${path}${pageName}.html`;
  }
  function loadLong() {
    if (!isLoadPageRunning) {
      displayLoadSplash();
    } else if (isLoadPageRunning) {
      displayLongSplash();
    }
  }
  async function loadPage(pageName, actionToShow, actionToSetContent) {
    store.dispatch(actionToShow);

    try {
      const response = await fetch(getPagePath(pageName));
      const html = await response.text();

      store.dispatch(actionToSetContent(html));
      let pageSpace = document.querySelector(`.${pageName}-Space`);
      let homeScroll = document.querySelector(".Veras-surface");

      if (!pageSpace) {
        pageSpace = document.createElement("div");
        pageSpace.classList.add(`${pageName}-Space`, "fade-in");
        homeScroll.style.overflowY = "hidden";

        elements.surfaceView.insertBefore(
          pageSpace,
          elements.surfaceView.firstChild
        );
      }

      pageSpace.innerHTML = html;
      document.title = pageName.charAt(0).toUpperCase() + pageName.slice(1);
      elements.surfaceView.style.opacity = 0;
      pageSpace.style.height = "100dvh";
      pageSpace.style.width = "100%";

      elements.footer.style.display = "none";
      elements.surfaceView.innerHTML = "";
      elements.surfaceView.appendChild(pageSpace);
      await new Promise((resolve) => setTimeout(resolve,40));
      pageSpace.classList.add("active");
      elements.surfaceView.style.opacity = 1;
    } catch (error) {
      console.error(error);
    }
  }
  function stepMainAdjust() {
    const stepMains = document.querySelectorAll(".step-main");
    if (stepMains.length > 0) {
      stepMains.forEach((stepMain) => {
        if (window.innerHeight < 500) {
          stepMain.style.setProperty("height", "auto", "important");
          console.log("Y is Less than 500px.step-main height is auto");
        } else {
          console.log("Y is greater than 500px, .step-main height 100%");
          stepMain.style.setProperty("height", "100%");
        }
      });
      return true;
    } else {
      return false;
    }
  }
  function updateNewsfeedNAV(newsfeedVisible) {
    const upNavNewsfeed = document.querySelector(".navbar-wrapper");
    if (newsfeedVisible) {
      upNavNewsfeed.style.display = "none";
    } else {
      upNavNewsfeed.style.display = "flex";
    }
  }
  function handleLoginFormSubmission(loginSpace) {
    if (loginSpace.dataset.formEventAttached !== "true") {
      loginSpace.dataset.formEventAttached = "true";

      const loginForm = document.querySelector(".form");
      const loginNumberInput = document.getElementById("login-number");
      const passwordInput = document.getElementById("password");

      if (loginForm) {
        loginForm.onsubmit = (event) => {
          event.preventDefault();

          // Get form values
          const loginNumber = loginNumberInput.value;
          const password = passwordInput.value;

          // Validate form
          const formData = eventHandlers.validateLoginForm(
            loginNumber,
            password
          );

          if (!formData) {
            return;
          }

          // Construct user data object
          const userLoginData = {
            loginNumber: formData.loginNumber,
            password: formData.password,
          };

          // Make API request
          fetch("http://study.veras.ca/logins.phps", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userLoginData),
          })
            .then((response) => {
              if (!response.ok) {
                alert("Network Error: Failed to reach server.");
                return;
              }

              // Check for redirect url
              const redirectUrl = response.headers.get("Location");

              if (redirectUrl && redirectUrl.includes("#onboarding")) {
                eventHandlers.handleReirectDispatchOnLoad();
                return;
              }
              return response.text();
            })
          
            .catch((error) => {

              //for prototype//
              isLoadPageRunning = true;
              loadLong();
              setTimeout(() => {
                eventHandlers.handleToOnboardFormClick();
                  isLoadPageRunning = false;
              }, 200);

              alert("Unknown error occurred. Please try again later." + error);

            });
        };
      }
    }
  }


  function handleOnboardingFormSubmission(onboardingSpace) {
    if (onboardingSpace.dataset.formEventAttached !== "true") {
        onboardingSpace.dataset.formEventAttached = "true";

        const onboardingForm = document.querySelector(".form");
        const loginNumberInput = document.getElementById("login-number");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirm-password");
        const nicknameInput = document.getElementById("nickname");

        let waitListButton = document.querySelector("#waitList");
        waitListButton.addEventListener("click", () => {
            store.dispatch(actions.showHome());
            window.location.reload();
        })

        if (onboardingForm) {
            onboardingForm.onsubmit = (event) => {
                event.preventDefault();

                // Get form values
                const loginNumber = loginNumberInput.value;
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;
                const nickname = nicknameInput.value;

                // Validate form
                const formData = eventHandlers.validateForm(
                    loginNumber,
                    password,
                    confirmPassword,
                    nickname
                );

                if (typeof formData === "string") {
                    console.log(formData);
                    return; // Stop the function here if there are validation errors
                }

                // Construct user data object
                const onboardUserData = {
                    loginNumber: formData.loginNumber,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    nickname: formData.nickname,
                };

                // Make API request
                fetch("http://study.veras.ca/home.phps", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(onboardUserData),
                })
                    .then((response) => {
                        if (!response.ok) {
                            alert("Network Error: Failed to reach server.");
                            return;
                        }

                        // Check for redirect url
                        const redirectUrl = response.headers.get("Location");

                        if (redirectUrl && redirectUrl.includes("#onboardingSteps")) {
                            eventHandlers.handleReirectDispatchOnLoad();
                            return;
                        }
                        return response.text();
                    })
                    .catch((error) => {
                        alert("Unknown error occurred. Please try again later." + error);
                        
                        isLoadPageRunning = true;
                        loadLong();
  
                        setTimeout(() => {
                          eventHandlers.onboardSuccess();
                            isLoadPageRunning = false;
                        },1800);
                   
                      });
            };
        }
    }
}


  //UI-UPDATES
  store.subscribe(() => {
    const state = store.getState();
    if (state.loginVisible) {
    } else if (state.newsfeedVisible) {
    } else if (state.onboardingStepsVisible || stepMainAdjust()) {
      window.addEventListener("resize", function () {
        stepMainAdjust();
      });
    } else if (state.onboardingVisible) {
    } else if (state.insightsVisible || state.createVisible) {
      let insightsNavLink = document
        .querySelector(".insights-btn")
        .closest(".nav-lnk");
      let createNavLink = document
        .querySelector(".create-btn")
        .closest(".nav-lnk");
      let insightsSpace = elements.surfaceView.querySelector(".insights-Space");
      let createSpace = elements.surfaceView.querySelector(".create-Space");
      let feedWrapper = elements.surfaceView.querySelector(".feed-wrapper");

      if (state.insightsVisible) {
        insightsNavLink.classList.add("btn-active");
        createNavLink.classList.remove("btn-active");
        if (!insightsSpace) {
          loadPage(
            "insights",
            actions.showInsights,
            actions.setInsightsContent
          );
        } else {
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
        } else {
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
