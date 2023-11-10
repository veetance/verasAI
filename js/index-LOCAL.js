////////// VERAS AI INDEX.JS //////////

window.tableData = new Map(); // let globalValue_mul;



//saeed code block 01// needs to be globbally accessable by backend submit btn()

window.eventHandlers = {
  updateNewsfeedUI: {
    handleWittenSurveyResponseSubmission: function (input) {
      console.log("handleWittenSurveyResponseSubmission called with ID", input);
      const response_Input = document.getElementById("survey-response");
      response_to_send = response_Input.value;
      const Topic_ID = input;
      console.log("test_success", response_to_send);
      // JavaScript
      if (response_to_send == "") {
        const radioOptions = document.querySelectorAll('input[name="v-radio"]');
        let selectedValue;
        radioOptions.forEach((option) => {
          if (option.checked) {
            selectedValue = option.value;
            response_to_send = selectedValue;
          }
        });
        if (selectedValue) {
          console.log("Selected radio option value: " + selectedValue);
        } else {
          console.log("No radio option selected.");
          alert("Please fill in all required fields.");
        }
      }
      // Call the function when the document is ready
      document.addEventListener("DOMContentLoaded", () => {
        updateCharacterCount();
      });
      const Res_surveyData = {
        response: response_to_send,
        TopicID: Topic_ID,
      };
      console.log("Responsedata:", Res_surveyData);
      fetch("https://study.veras.ca/surveypost.phps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Res_surveyData),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Response successful:", response);

            // Show an alert to the user
            alert("SUCCESS: Redirecting to newsfeed...");

            // Redirect the user after they acknowledge the alert
            window.location.href = "?newsfeed";
          } else {
            showAlert("FAILED-POST: HTTP error! status: " + response.status).then(
              () => {
                window.location.href = "?login";
              }
            );
          }
        })
        .catch((error) => {
          console.error("FAILED TO SUBMIT RESPONSE:", error.message); // Log the error message to the console

          // Show an alert to the user
          alert("FAILED TO SUBMIT RESPONSE: " + error.message);

          // After the user dismisses the alert, redirect them
          window.location.href = "?newsfeed";
        });
    },
  },
};

//saeed code block 01 end//


let Loadsplash = document.querySelector(".v-splash");

const createAction = (url, type, payload) => {
  const urlObj = new URL(url, window.location.href);
  const state = { page: urlObj.search.slice(1) }; // Change from hash to search
  history.pushState(state, "", urlObj.toString());
  return { type, payload };
};

const actions = {
  setCurrentPage: (page) => createAction(`?${page}`, SET_CURRENT_PAGE, page),
  showHome: () => createAction("?home", SHOW_HOME, "home"),
  setHomeContent: (html) => ({ type: SET_HOME_CONTENT, payload: html }),
  showLogin: () => createAction("?login", SHOW_LOGIN, "login"),

  showLogins: () => createAction("?logins", SHOW_LOGINS, "logins"),
  setLoginsContent: (html) => ({ type: SET_LOGINS_CONTENT, payload: html }),

  logout: () => createAction("?logout", LOGOUT, "logout"),
  setLoginContent: (html) => ({ type: SET_LOGIN_CONTENT, payload: html }),
  showNewsfeed: () => createAction("?newsfeed", SHOW_NEWSFEED, "newsfeed"),
  setNewsfeedContent: (html) => ({
    type: SET_NEWSFEED_CONTENT,
    payload: html,
  }),
  showInsights: () => createAction("?insights", SHOW_INSIGHTS, "insights"),
  setInsightsContent: (html) => ({
    type: SET_INSIGHTS_CONTENT,
    payload: html,
  }),
  showCreate: () => createAction("?create", SHOW_CREATE, "create"),
  setCreateContent: (html) => ({ type: SET_CREATE_CONTENT, payload: html }),
  setOnboardingContent: (html) => ({
    type: SET_ONBOARDING_CONTENT,
    payload: html,
  }),
  showOnboarding: () =>
    createAction("?onboarding", SHOW_ONBOARDING, "onboarding"),
  setOnboardingStepsContent: (html) => ({
    type: SET_ONBOARDING_STEPS_CONTENT,
    payload: html,
  }),
  showOnboardingSteps: () =>
    createAction("?onboardingSteps", SHOW_ONBOARDING_STEPS, "onboardingSteps"),
};
const elements = {
  loginButton: document.querySelector(".login-button"),
  logoutButton: document.querySelector(".logout-button"),
  closeAlertButton: document.getElementById("closeAlertButton"),
  surfaceView: document.querySelector(".surface-view"),
  footer: document.querySelector(".footer-Contents"),
  insightsButton: document.querySelector(".lnk-ico .insights-btn"),
  createButton: document.querySelector(".lnk-ico .create-btn"),
  upNav: document.querySelector(".navbar-wrapper"),
  navbarWrapperElement: document.querySelector(".navbar-wrapper"),
  verasSurfaceElement: document.querySelector(".Veras-surface"),
  splash: document.querySelector(".v-splash"),
  refreshButtons: document.querySelectorAll(
    ".nav-logo, .nav-title, .VLOGO-wrapper"
  ),
};
const eventHandlers = {
  pageActions: {
    login: () => eventHandlers.handleLoginButtonClick(),
    logins: () => {
      isLoadPageRunning = true;
      loadLong();

      setTimeout(() => {
        loadPage("logins", actions.showLogins(), actions.setLoginsContent).then(
          () => {
            let loginsSpace = document.querySelector(".logins-Space");
            handleLoginsFormSubmission(loginsSpace);
            // You can add additional UI updates or logic specific to the 'logins' page here if needed.
            elements.splash.style.display = "none";
          }
        );
      }, 200);
    },
    home: () => {
      isLoadPageRunning = false;
      setTimeout(() => {
        Loadsplash.style.display = "none";
        console.log("home|loadLong", isLoadPageRunning);
      }, 400);
    },
    newsfeed: () => {
      isLoadPageRunning = true;
      loadLong();

      setTimeout(() => {
        loadPage(
          "newsfeed",
          actions.showNewsfeed(),
          actions.setNewsfeedContent
        ).then(() => {
          eventHandlers.updateNewsfeedUI();
          updateNewsfeedNAV(true);

          isLoadPageRunning = false;
          loadLong();
          elements.splash.style.display = "none";
        });
      }, 200);
    },
    insights: () => store.dispatch(actions.showInsights()),
    create: () => store.dispatch(actions.showCreate()),
    onboarding: () => eventHandlers.handleToOnboardFormClick(),
    onboardingSteps: () => eventHandlers.onboardSuccess(),
  },
  dispatchPageAction: async (pageName) => {
    if (pageName in eventHandlers.pageActions) {
      await eventHandlers.pageActions[pageName]();
    } else {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // CHANGE  TAB TIOTLE TO UNKNOWN PAGE
      document.title = "Unknown page | Click ok to go to [Home]";

      await showAlert(
        `Unknown page | Click ok to go to [Home]: ${pageName}`
      ).then(() => {
        window.location.href = "?home";
      });
    }
  },
  init: () => {
    window.onpopstate = function () {
      const newUrl = new URL(window.location.href);
      let newPageName = newUrl.search ? newUrl.search.slice(1) : "home"; // Change from hash to search
      eventHandlers.dispatchPageAction(newPageName);
      window.location.url = newUrl.toString();
    };
    eventHandlers.handleReirectDispatchOnLoad();
  },
  // handleReirectDispatchOnLoad: async () => {
  //   // Handle search change
  //   const url = new URL(window.location.href);
  //   let pageName = url.search ? url.search.slice(1) : "home"; // Change from hash to search
  //   url.pathname = getPagePath(pageName);
  //   url.search = pageName; // Change from hash to search
  //   history.replaceState({}, document.title, `${url.search}`);
  //   await eventHandlers.dispatchPageAction(pageName);
  // },
  handleReirectDispatchOnLoad: async () => {
    // Parse the current URL
    const currentUrl = new URL(window.location.href);
    let pageName = currentUrl.search ? currentUrl.search.slice(1) : "home";

    // Determine the new URL
    const newPagePath = getPagePath(pageName);
    const newUrl = new URL(currentUrl.toString()); // Create a copy of the current URL
    newUrl.pathname = newPagePath;
    newUrl.search = pageName;

    // Check if the URL has changed
    if (currentUrl.toString() !== newUrl.toString()) {
      // Update the URL and state
      history.replaceState({}, document.title, `${newUrl.search}`);

      // Dispatch the page action
      await eventHandlers.dispatchPageAction(pageName);
    }
    // If the URL hasn't changed, no action is taken, preventing a reload.
  },
  handleLoginButtonClick: () => {
    loadPage("login", actions.showLogin(), actions.setLoginContent).then(() => {
      // Call login handler///
      let loginSpace = document.querySelector(".login-Space");
      handleLoginFormSubmission(loginSpace);

      ///// logic to register /////
      const toOnboardingForm = document.getElementById("registr");
      toOnboardingForm.addEventListener("click", () => {
        // Set loading
        window.location.href = "?logins";
        eventHandlers.pageActions.logins();
      });

      let waitListButton = document.querySelector("#waitList");
      waitListButton.addEventListener("click", () => {
        store.dispatch(actions.showHome()), window.location = "?logins"; // Redirect to home
      });
    });
  },
  handleToOnboardFormClick: () => {
    loadPage(
      "onboarding",
      actions.showOnboarding(),
      actions.setOnboardingContent
    ).then(() => {
      let onboardingSpace = document.querySelector(".onboarding-Space");
      handleOnboardingFormSubmission(onboardingSpace);
    });
  },
  handleInsightsButtonClick: () => {
    store.dispatch(actions.hideCreate());
    loadPage("insights", actions.showInsights, actions.setInsightsContent);
  },
  handleCreateButtonClick: () => {
    store.dispatch(actions.hideInsights());
    loadPage("create", actions.showCreate, actions.setCreateContent);
  },
  handleRefreshButtonClick: (event) => {
    event.preventDefault(); // Prevent default action

    // Using currentTarget to refer to the element to which the event handler is attached
    const currentElement = event.currentTarget;

    // Check if the current element or any of its parents have the "nav-title" class
    if (currentElement.classList.contains("nav-title") ||
      currentElement.querySelector(".nav-title")) {
      window.location.href = '?login';  // Navigate login
    } else {
      window.location.href = '?home'; // Perform the default reload action

      if (window.location.href.includes("?home")) {
        window.location.reload();
      }
    }

  },
  handleNavSlideUpClick: () => { },
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
    fadeInOnLoad();
    elements.splash.style.display = "none";

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
      // Before switching steps, remove the 'visible' class to reset the animation
      let currentElementsToFade = currentStep.querySelectorAll(".softTransit");
      currentElementsToFade.forEach((el) => el.classList.remove("visible"));

      currentStep.classList.remove("active");
      nextStep.classList.add("active");

      // Soft transition effect
      let nextElementsToFade = nextStep.querySelectorAll(".softTransit");
      nextElementsToFade.forEach((el) => {
        setTimeout(() => {
          el.classList.add("visible");
        }, 100); // slight delay can be adjusted
      });

      if (parseInt(nextStep.dataset.step) === 5) {
        const stepFinishButtons = nextStep.querySelectorAll(".step-finish");
        if (stepFinishButtons) {
          console.log("REGISTERDATA", window.registerData);
          stepFinishButtons.forEach(function (button) {
            button.addEventListener("click", function () {
              isLoadPageRunning = true;
              loadLong();
              alert(
                "Prototype: Data is not connected. Proceeding to news feed..."
              );

              // Use window.registerData here to post to home.phps
              fetch("https://study.veras.ca/register.phps", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(window.registerData),
              })
                .then((response) => {
                  if (response.ok) {
                    window.location.href = response.url; // Redirect if the response wants a redirect
                  } else if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  return response.json();
                })
                .catch((error) => {
                  showAlert(
                    "Prototype call | Proceeding to newsfeed: " + error.message
                  ).then(() => {
                    // This block will run if there was an error with the fetch request.
                    // Here we're just redirecting to the newsfeed.
                    eventHandlers.pageActions.newsfeed();
                  });
                });
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
        elements.splash.style.display = "none";
      });
    }, 900);
  },
  updateNewsfeedUI: () => {
    /////////////// slide-out-modall ////////////////

    // Select elements
    const navLink = document.querySelector("#hamBurg");
    const settingsModal = document.querySelector(".settings-modal");
    const modal = document.querySelector(".collapsable-comp");

    const dataGrid = document.querySelector("tbody");

    const newsfeedLeft = document.querySelector(".Newsfeed-Left");
    const quickSurvey = document.querySelector(".Quick-survey");
    const feedBTN = document.getElementById("nFeed-lnk");
    const createBTN = document.getElementById("Create-lnk");
    const feedWRAP = document.querySelector(".feed-wrapper");
    let activeTab = "newsfeed"; // can be "newsfeed" or "quickSurvey"'

    // Attach listeners
    if (navLink && settingsModal) {
      navLink.addEventListener("click", () => {
        if (settingsModal.classList.contains("shown")) {
          settingsModal.classList.remove("shown");
        } else {
          modal.style.display = "flex";
          navLink.classList.add("active");

          setTimeout(() => {
            settingsModal.classList.add("shown");
          });
        }
      });

      modal.addEventListener("transitionend", (e) => {
        if (
          e.target === settingsModal &&
          !settingsModal.classList.contains("shown")
        ) {
          modal.style.display = "none";
          navLink.classList.remove("active");
        }
      });
    }

    //////////////// logout-logic ////////////////
    const LogOutButton = document.querySelector(".logout-button");
    LogOutButton.addEventListener("click", function () {

      fetch("https://study.veras.ca/logout.phps", {
        method: "POST",
      })
        .then((response) => {
          // Redirect to the URL specified by the backend
          showAlertFade("You have been logged out.");
          window.location.href = response.url;
        })
        .catch((error) => {
          console.error("Error during logout:", error);
        });

    });

    const newsfeedButton = document.querySelector(".newsfeed-button");
    newsfeedButton.addEventListener("click", function () {
      window.location.reload();
    });




    /////////////// grab Data ////////////////



    // Using async/await to handle the fetch operation
    async function fetchAndDisplayTable() {
      try {
        // Assuming user data is stored in global variables
        const userLoginData = window.userLoginData || window.registerData;

        // The 'await' keyword waits for the fetch operation to complete before moving on
        const response = await fetch("https://study.veras.ca/homepage.phps", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLoginData),
          redirect: 'manual' // prevent automatic redirection
        });

        // Check if the response is not okay
        if (!response.ok) {
          throw new Error('Failed to fetch: ' + response.statusText);
        }

        // Wait for the response text and handle it
        const responseText = await response.text();
        handleResponseText(responseText);
      } catch (error) {
        console.error('Error:', error);
        handleErrorResponse(error); // handle network error
      }
    }

    // Call the function
    //fetchAndDisplayTable();


    function handleErrorResponse(error) {
      isLoadPageRunning = true;
      loadLong();
      showAlert(
        "Error fetching table: " +
        (error.responseURL || 'Unknown URL') +  // Use the response URL from the error object or 'Unknown URL' if it's not available
        " | Redirecting to | " +
        "?login"
      ).then(() => {
        window.location.href = "?login";  // Redirect to login on error
        console.log("Error fetching table:", error.responseURL || 'Unknown URL');
      });
    }

    function handleResponseText(responseText) {

      appendTableToTarget(responseText);

      // console.log(responseText);

      let scriptLoadedEvent = new Event("scriptLoaded");
      document.dispatchEvent(scriptLoadedEvent);

      if (scriptLoadedEvent) {
        // console.log("populateTableData --> ARMED(1000ms)", scriptLoadedEvent);

        new Promise((resolve, reject) => {
          setTimeout(() => {
            // Extract script content from responseText
            let parser = new DOMParser();
            let doc = parser.parseFromString(responseText, "text/html");
            let scriptContent = doc.querySelector("script").innerText;

            // Define execScript if it doesn't exist and execute the script content
            window.execScript =
              window.execScript ||
              function (code) {
                window.eval.call(window, code);
              };
            window.execScript(scriptContent); // using execScript here

            // Check if the script has been executed successfully and if the function populateTableData is available
            if (
              scriptContent &&
              typeof window.populateTableData === "function"
            ) {
              // console.log("populateTableData --> READY");
              window.populateTableData();
              // console.log("PopulateData-available", populateTableData);
              resolve(); // Resolve the promise if the script executes successfully
            } else {
              console.error(
                "Either the script content could not be executed or populateTableData is not accessible or not a function"
              );
              reject(); // Reject the promise if there's an error
            }
          }, 10);
        })
          .then(() => {
            return new Promise((resolve) => {
              setTimeout(() => {


                document.querySelectorAll(".v-back").forEach((vBack) => {
                  vBack.addEventListener("click", function () {
                    const clickedRow = vBack.closest("tr");

                    if (
                      clickedRow &&
                      clickedRow.classList.contains("expanded-row")
                    ) {
                      const textArea = clickedRow.querySelector("textarea");
                      const closeButton =
                        clickedRow.querySelector(".close-discrip");

                      if (textArea && closeButton) {
                        const alertElement = document.querySelector(".alert");
                        if (alertElement) {
                          alertElement.style.top = "50%"; // Adjust the position
                        }

                        showLert("Are you sure you want to Abort your reply?")
                          .then(() => {
                            // Assuming closeTextArea is a method to close or clear the textarea
                            textArea.closeTextArea();
                            handleRowClick(clickedRow);
                            if (clickedRow.rsetAugmt) {
                              clickedRow.rsetAugmt();
                            }
                          })
                          .catch(() => {
                            // If the user decides not to abort the reply, handle it here. (Maybe do nothing?)
                          });
                      } else {
                        handleRowClick(clickedRow);
                        if (clickedRow.rsetAugmt) {
                          clickedRow.rsetAugmt();
                        }
                      }
                    }
                  });
                });


                document
                  .querySelector("#data-surface table tbody")
                  .addEventListener("click", function (event) {
                    let clickedRow = event.target.closest("tr");

                    if (
                      clickedRow &&
                      !clickedRow.classList.contains("expanded-row")
                    ) {
                      // Assume 'handleRowClick' is a function you've defined elsewhere to handle the row click.
                      handleRowClick(clickedRow);

                      const rowData = accessData(clickedRow);

                      setTimeout(() => {
                        console.log("Data-Post:", tableData); // Debugging line
                        appendOptionData(clickedRow, rowData);
                      }, 200);

                      setTimeout(() => {
                        elements.splash.style.display = "none";
                      }, 500);

                    }
                  });

                resolve(); // Resolve the promise when done
              }, 0);
            });
          })
          .catch((error) => {
            console.error("An error occurred:", error);
          });
      }
    }


    setTimeout(() => {


      document.querySelectorAll(".v-back").forEach((vBack) => {
        vBack.addEventListener("click", function () {
          const clickedRow = vBack.closest("tr");

          if (
            clickedRow &&
            clickedRow.classList.contains("expanded-row")
          ) {
            const textArea = clickedRow.querySelector("textarea");
            const closeButton =
              clickedRow.querySelector(".close-discrip");

            if (textArea && closeButton) {
              const alertElement = document.querySelector(".alert");
              if (alertElement) {
                alertElement.style.top = "50%"; // Adjust the position
              }

              showLert("Are you sure you want to Abort your reply?")
                .then(() => {
                  // Assuming closeTextArea is a method to close or clear the textarea
                  textArea.closeTextArea();
                  handleRowClick(clickedRow);
                  if (clickedRow.rsetAugmt) {
                    clickedRow.rsetAugmt();
                  }
                })
           
            } else {
              handleRowClick(clickedRow);
              if (clickedRow.rsetAugmt) {
                clickedRow.rsetAugmt();
              }
            }
          }
        });
      });


      document
        .querySelector("#data-surface table tbody")
        .addEventListener("click", function (event) {
          let clickedRow = event.target.closest("tr");

          if (
            clickedRow &&
            !clickedRow.classList.contains("expanded-row")
          ) {
            // Assume 'handleRowClick' is a function you've defined elsewhere to handle the row click.
            handleRowClick(clickedRow);

            const rowData = accessData(clickedRow);

            setTimeout(() => {
              console.log("Data-Post:", tableData); // Debugging line
              appendOptionData(clickedRow, rowData);
            }, 200);

            setTimeout(() => {
              elements.splash.style.display = "none";
            }, 500);

          }
        });

      // resolve(); // Resolve the promise when done
    }, 0);



    /////////////// grab Data end////////////////


    //// //saeed code block 02// /////

    // create  written survey

    function handleWittenSurveyFormSubmission(input) {
      const submitButton = document.getElementById("submit-written-survey");
      const titleInput = document.getElementById("survey-title-mc");
      const descriptionInput = document.getElementById("survey-description-mc");
      //const charLimitSelect = document.getElementById("char-limit"); // Added #char-limit-section

      submitButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const title = titleInput.value;
        const description = descriptionInput.value;
        //const charLimit = parseInt(charLimitSelect.value); // Added

        if (!title || !description) {
          showAlert("Please fill in all fields.");
          return;
        }

        /*           // Check if the description exceeds the character limit
                  if (description.length > charLimit) {
                    showAlert(`Description exceeds the character limit of ${charLimit} characters.`);
                    return;
                  } */

        // Function to update character count based on selected limit
        function updateCharacterCount() {
          const charLimitSelect = document.getElementById("char-limit");
          const descriptionInput =
            document.getElementById("survey-description");
          const charLimit = parseInt(charLimitSelect.value);

          descriptionInput.addEventListener("input", () => {
            const currentText = descriptionInput.value;
            if (currentText.length > charLimit) {
              descriptionInput.value = currentText.substring(0, charLimit);
            }
          });
        }

        // Call the function when the document is ready
        document.addEventListener("DOMContentLoaded", () => {
          updateCharacterCount();
        });

        const W_surveyData = {
          topic_title: title,
          description: description,
          options: "",
          type: "text",
        };

        console.log("Logindata:", W_surveyData);

        fetch("https://study.veras.ca/surveynew.phps", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(W_surveyData),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Response URL:", response.url);
              console.log("Logindata:", response);
              // Call showAlert with navigation to home
              showAlert("SUCCESS: Redirecting to newsfeed...").then(() => {
                window.location.reload();
              });
            } else {
              showAlert(
                "FAILED-POST: HTTP error! status: " + response.status
              ).then(() => {
                window.location.reload();
              });
            }
          })
          .catch((error) => {
            showAlert("FAILED TO POST SURVEY: " + error.message).then(() => {
              console.log(error);
              // window.location.href = response.url;
              window.location.reload();
            });
          });
      });
    }
    handleWittenSurveyFormSubmission(true);

    // create  mltple choice survey
    function handleMultipleChoiceSurveyFormSubmission(input) {
      //const submitButton = document.getElementById("submit-multiple-choice");
      //const titleInput = document.getElementById("survey-title-mc");
      //const descriptionInput = document.getElementById("survey-description-mc");

      //const titleInput = document.querySelector('input#survey-title-mc[type="text"]');
      //const descriptionInput = document.querySelector('textarea#survey-description-mc');

      const addOptionButton = document.getElementById("add-option");
      //console.log(titleInput, descriptionInput)

      const optionsDiv = document.getElementById("opt-space");
      const addRemove = document.querySelector(".add-remove");
      const globalRemoveButton = document.querySelector(".globalRemove");

      // Function to update the display state of optionsDiv
      function updateOptionsDisplay() {
        if (optionCount > 0) {
          optionsDiv.style.display = "grid";
          optionsDiv.style.height = "100% !important";
          addRemove.style.borderRadius = "0px 0px 0px 0px";
        } else {
          optionsDiv.style.display = "none";
          addRemove.style.borderRadius = "0px 0px 10px 10px";
        }
      }

      globalRemoveButton.addEventListener("click", () => {
        if (optionsDiv.lastChild) {
          optionsDiv.removeChild(optionsDiv.lastChild);
          optionCount--;
        }
        updateOptionsDisplay();
      });

      let optionCount = 0; // Initialize option count

      addOptionButton.addEventListener("click", () => {
        const newOptionInput = document.createElement("div");
        newOptionInput.classList.add("option");

        const newOptionTextInput = document.createElement("input");
        newOptionTextInput.classList.add("option-input");
        newOptionTextInput.type = "text";
        newOptionTextInput.placeholder = "Option " + (optionCount + 1);
        newOptionTextInput.required = true;

        const removeOptionButton = document.createElement("button");
        removeOptionButton.classList.add("remove-option");
        removeOptionButton.innerText = "-";
        removeOptionButton.onclick = () => {
          // Remove the corresponding option when the button is clicked
          optionsDiv.removeChild(newOptionInput);
          optionCount--;
          updateOptionsDisplay();
        };

        newOptionInput.appendChild(newOptionTextInput);
        newOptionInput.appendChild(removeOptionButton);

        optionsDiv.appendChild(newOptionInput);
        optionCount++;

        updateOptionsDisplay();
      });

      // Initial state check
      updateOptionsDisplay();

      const submitButton = document.getElementById("submit-multiple-choice");

      submitButton.addEventListener("click", async (event) => {
        event.preventDefault();

        //const titleInput = document.querySelector('input#survey-title-mc[type="text"]');
        // Targeting the input element with ID "survey-title-mc"
        //const titleInput = document.querySelector('#survey-title-mc[name="survey-title-mc"].create-input');
        // Targeting the input element with ID "survey-title-mc" inside the div with ID "multiple-choice-content"
        const titleInput = document.querySelector(
          '#multiple-choice-content #survey-title-mc[name="survey-title-mc"].create-input'
        );

        //const descriptionInput = document.querySelector('textarea#survey-description-mc');
        // Targeting the textarea element with ID "survey-description-mc"
        //const descriptionInput = document.querySelector('#survey-description-mc[name="survey-description-mc"].survey-input');
        // Targeting the textarea element with ID "survey-description-mc" inside the div with ID "multiple-choice-content"
        const descriptionInput = document.querySelector(
          '#multiple-choice-content #survey-description-mc[name="survey-description-mc"].survey-input'
        );

        if (titleInput.value && descriptionInput.value) {
          console.log("titleInput found");
          console.log("descriptionInput found");
        } else {
          console.log("titleInput not found");
          console.log("descriptionInput not found");
        }

        const title = titleInput.value;
        const description = descriptionInput.value;

        // Modify the options to be a single string with commas
        // const optionsString = options.filter(option => option.trim() !== '').join(', ');
        const optionInputs = document.querySelectorAll(".option-input");
        const options = Array.from(optionInputs).map((input) => input.value);

        // Remove empty options
        const filteredOptions = options.filter(
          (option) => option.trim() !== ""
        );

        // Convert the options into an object with numbered keys
        const optionsObject = {};
        filteredOptions.forEach((option, index) => {
          optionsObject[index + 1] = option;
        });

        // Perform validation
        //console.log("options.length", title, description, options.length)
        if (!title || !description || options.length < 2) {
          alert("Please fill in all fields and provide at least two options");
          return;
        }

        const MC_surveyData = {
          topic_title: title,
          description: description,
          options: optionsObject,
          type: "multiple",
        };
        console.log("W_surveyData:", MC_surveyData);

        fetch("https://study.veras.ca/surveynew.phps", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(MC_surveyData),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Response URL:", response.url);
              console.log("Logindata:", MC_surveyData);
              // Call showAlert with navigation to home
              showAlert("SUCCESS: Redirecting to newsfeed...").then(() => {
                window.location.reload();
              });
            } else {
              showAlert(
                "FAILED-POST: HTTP error! status: " + response.status
              ).then(() => {
                window.location.reload();
              });
            }
          })
          .catch((error) => {
            showAlert("FAILED TO POST SURVEY: " + error.message).then(() => {
              console.log(error);
              window.location.href = response.url;
              //window.location.reload();
            });
          });

        // Perform further processing or API call here
        // ...

        alert("Multiple Choice Survey submitted successfully!");
      });
    }
    handleMultipleChoiceSurveyFormSubmission(true);


    //// //saeed code block 02 end// /////






    /////////////// main dashboard section ////////////////


    function initialize() {
      // console.log('newsfeedLeft:', document.querySelector(".Newsfeed-Left"));
      // console.log('quickSurvey:', document.querySelector(".Quick-survey"));
      // console.log('feedWRAP:', document.querySelector(".feed-wrapper"));

      if (window.innerWidth > 1060) {
        // Desktop
        newsfeedLeft.style.transition = "All .4s cubic-bezier(0,1.02,0,.93)";
        quickSurvey.style.transition = "All .4s cubic-bezier(0,1.02,0,.93)";

        if (activeTab === "quickSurvey") {
          feedWRAP.style.gridTemplateColumns = "1.3fr 2fr";

          if (dataGrid) {
            dataGrid.style.gridTemplateColumns =
              "repeat(2, minmax(200px, 1fr))";
          }

          openVtabs(newsfeedLeft);
          quickSurvey.style.display = "flex";
          newsfeedLeft.style.display = "flex";
          feedBTN.classList.remove("active");
          createBTN.classList.add("active");
        } else {
          if (dataGrid) {
            dataGrid.style.gridTemplateColumns =
              "repeat(3, minmax(200px, 1fr))";
          }
          feedWRAP.style.gridTemplateColumns = "1fr";
          quickSurvey.style.display = "none";
          newsfeedLeft.style.display = "flex";
          feedBTN.classList.add("active");
          createBTN.classList.remove("active");
        }
      } else {
        // Mobile/Tablet
        newsfeedLeft.style.transition = "All .3s cubic-bezier(0,1.02,0,.93)";
        quickSurvey.style.transition = "All .3s cubic-bezier(0,1.02,0,.93)";

        if (activeTab === "quickSurvey") {
          closeVtabs(newsfeedLeft);
          openVtabs(quickSurvey);
          feedBTN.classList.remove("active");
          createBTN.classList.add("active");
        } else {
          if (dataGrid) {
            dataGrid.style.gridTemplateColumns =
              "repeat(2, minmax(200px, 1fr))";
          }
          newsfeedLeft.style.display = "flex";
          newsfeedLeft.style.maxHeight = "100%";
          newsfeedLeft.style.opacity = "1";

          quickSurvey.style.display = "none";
          quickSurvey.style.maxHeight = "0%";
          quickSurvey.style.opacity = "0";

          feedBTN.classList.add("active");
          createBTN.classList.remove("active");
        }
      }

      if (
        quickSurvey.style.opacity === "1" &&
        newsfeedLeft.style.opacity === "1"
      ) {
        quickSurvey.style.transition = "none";
        quickSurvey.style.height = "100%";
      }
    }
    function handleFeedBTNClick() {
      handleGchange(newsfeedLeft, "newsfeed");
      if (reloadIfActive("newsfeed")) return;

      if (window.innerWidth > 1060) {
        feedWRAP.style.gridTemplateColumns = "1fr";
        handleGchange(newsfeedLeft);
        if (dataGrid) {
          dataGrid.style.gridTemplateColumns = "repeat(3, minmax(200px, 1fr))";
        }

        quickSurvey.style.display = "none";
        openVtabs(newsfeedLeft);
        feedBTN.classList.add("active");
        closeVtabs(quickSurvey);
        createBTN.classList.remove("active");
      } else {
        if (dataGrid) {
          dataGrid.style.gridTemplateColumns = "repeat(2, minmax(200px, 1fr))";
        }
        openVtabs(newsfeedLeft);
        feedBTN.classList.add("active");
        closeVtabs(quickSurvey);
        createBTN.classList.remove("active");
      }
      activeTab = "newsfeed";
    }
    function handleCreateBTNClick() {
      handleGchange(newsfeedLeft, "quickSurvey");
      if (reloadIfActive("quickSurvey")) return;

      if (window.innerWidth > 1060) {
        feedWRAP.style.gridTemplateColumns = "1.3fr 2fr";

        if (dataGrid) {
          dataGrid.style.gridTemplateColumns = "repeat(2, minmax(200px, 1fr))";
        }
        quickSurvey.style.display = "flex";

        openVtabs(newsfeedLeft);
        feedBTN.classList.remove("active");
        openVtabs(quickSurvey);
        createBTN.classList.add("active");
      } else {
        closeVtabs(newsfeedLeft);
        feedBTN.classList.remove("active");
        openVtabs(quickSurvey);
        createBTN.classList.add("active");
      }
      activeTab = "quickSurvey";
    }
    function handleScreenChange() {
      keepOpen(newsfeedLeft);
      keepOpen(quickSurvey);

      initialize(); // Re-initialize on screen size change

      newsfeedLeft.style.transition = "All .3s cubic-bezier(0,1.02,0,.93)";
      quickSurvey.style.transition = "All .3s cubic-bezier(0,1.02,0,.93)";
    }
    function handleGchange(element, section) {
      // If the clicked tab is already active, reload the page

      // Continue with the width transition logic only if not on mobile or if the clicked tab isn't active
      if (window.innerWidth > 1060) {
        let currentWidth;
        if (section === "quickSurvey") {
          currentWidth = "120%";
        } else if (section === "newsfeed") {
          currentWidth = "84%";
        }

        element.style.transition = "none";
        element.style.width = currentWidth;

        element.offsetHeight;

        element.style.transition = "width .4s cubic-bezier(0,1.02,0,.93)";
        setTimeout(() => {
          element.style.width = "100%";
        }, 10);
      }
    }
    function reloadIfActive(clickedTab) {
      if (activeTab === clickedTab) {
        window.location.reload();
        return true; // Indicate that a reload occurred
      }
      return false; // Indicate that no reload occurred
    }

    // Functions for smooth height transitions, from old logic
    function openVtabs(element) {
      element.style.display = "flex";
      element.style.opacity = "1";
      // Check if the height is already 100% and opacity is 1
      if (element.style.maxHeight !== "100%" && element.style.opacity !== "1") {
        element.style.maxHeight = "0px"; // Set to 0% to ensure transition starts from here
        setTimeout(() => {
          element.style.maxHeight = "100%";
        }, 50); // A short delay to ensure the transition starts from 0%
      } else {
        element.style.maxHeight = "100%";
      }
    }
    function closeVtabs(element) {
      // Check if the height is already 0% and opacity is 0
      if (element.style.maxHeight !== "0px" && element.style.opacity !== "0") {
        element.style.maxHeight = "0px";
        element.style.opacity = "0";
        setTimeout(() => {
          if (element.style.opacity === "0") {
            element.style.display = "none";
          }
        }, 50); // Allow time for the opacity transition to complete
      } else {
        element.style.display = "none";
      }
    }
    function keepOpen(element) {
      element.style.transition = "none"; // Temporarily remove any transition
      element.style.maxHeight = "100%";
      element.style.opacity = "1";

      setTimeout(() => {
        newsfeedLeft.style.transition = "All 4s cubic-bezier(0,1.02,0,.93)";
        quickSurvey.style.transition = "All 4s cubic-bezier(0,1.02,0,.93)";
      }, 50); // Allow time for the height to be set to auto
    }

    initialize();
    window.addEventListener("resize", handleScreenChange);
    feedBTN.addEventListener("click", handleFeedBTNClick);
    createBTN.addEventListener("click", handleCreateBTNClick);

    ///////////////switch tabs/////////////////
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

    // add focus to tab lnks //
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
      document.getElementById(tabName + "-content").style.display = "flex";
      document.getElementById(tabName + "-tab").classList.add("active");
    }
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove the .focus class from all tabs
        tabs.forEach((tab) => {
          tab.classList.remove("focus");
        });

        // Add the .focus class to the clicked tab
        this.classList.add("focus");
      });
    });

    function handleRowClick(clickedRow) {
      const dataSurface = document.querySelector("#data-surface");
      const table = dataSurface.querySelector("table");
      const tBody = table.querySelector("tbody");

      const feedHead = clickedRow.querySelector(".feed-head");
      const feedpgrphP = clickedRow.querySelector(".feed-paragraph h1");
      const feedpgrph = clickedRow.querySelector("#feed-pg");
      const responseSpace = clickedRow.querySelector("#response-space");
      const feedparaG = clickedRow.querySelector(".feed-paragraph");
      const vTitle = clickedRow.querySelector(".v-title");
      const navBarr = document.querySelector(".N-Header");
      // const vtR = clickedRow.querySelector('tbody tr');

      let initialWidth =
        clickedRow.dataset.initialWidth || getComputedStyle(clickedRow).width;
      let initialHeight =
        clickedRow.dataset.initialHeight || getComputedStyle(clickedRow).height;
      clickedRow.dataset.initialWidth = initialWidth;
      clickedRow.dataset.initialHeight = initialHeight;

      const gridPosition = clickedRow.dataset.gridPosition;
      switch (gridPosition) {
        case "1":
          clickedRow.style.transformOrigin = "top left";
          break;
        case "2":
          clickedRow.style.transformOrigin = "top right";
          break;
        case "3":
          clickedRow.style.transformOrigin = "bottom left";
          break;
        case "4":
          clickedRow.style.transformOrigin = "bottom right";
          break;
      }

      if (clickedRow.classList.contains("expanded-row")) {
        table.querySelector("tbody").style.placeItems = "center";
        clickedRow.style.opacity = "1";
        feedHead.style.display = "flex";
        feedpgrphP.style.fontSize = "";
        feedpgrphP.style.lineHeight = "";
        feedpgrphP.style.width = "";
        feedpgrphP.style.padding = "";
        vTitle.style.padding = "";
        feedpgrph.style.height = "100%";
        feedparaG.style.padding = "16px";
        feedparaG.style.paddingBottom = "40px";
        feedparaG.style.backgroundColor = "";
        responseSpace.style.display = "none";
        tBody.style.padding = "";
        clickedRow.style.borderRadius = "";
        clickedRow.style.border = "";

        clickedRow.style.transition =
          "width .3s cubic-bezier(0,1.02,.06,.96), height 1.5s cubic-bezier(0,1.02,0,1.02), opacity 0.5s cubic-bezier(0,1.02,.06,.96)";
        clickedRow.style.width = initialWidth;
        clickedRow.style.height = initialHeight;
        setTimeout(() => {
          clickedRow.style.opacity = "0";
        }, 20);
        setTimeout(() => {
          clickedRow.classList.remove("expanded-row");
          dataSurface.classList.remove("expanding");
          clickedRow.classList.add("recently-closed");
          setTimeout(() => {
            clickedRow.style.width = "100%";
            clickedRow.style.height = "100%";
            clickedRow.style.opacity = "1";
          }, 0);
        }, 60);
        navBarr.style.maxHeight = "89px !important";
        navBarr.style.transition = "max-height .4s cubic-bezier(0,1.02,0,1.02)";
        setTimeout(() => {
          navBarr.style.display = "flex";
        }, 10);
      } else {
        table.querySelector("tbody").style.placeItems = "center";
        feedHead.style.display = "none";
        feedparaG.style.paddingBottom = "16px";
        feedparaG.style.padding = "26px";
        feedparaG.style.backgroundColor = "hsla(0, 0%, 100%, 1)";
        vTitle.style.padding = "10px 0px";
        feedpgrph.style.height = "fit-content";
        responseSpace.style.display = "flex";

        tBody.style.padding = "0px";
        clickedRow.style.borderRadius = "0px";
        clickedRow.style.border = "solid 0px #e0dbff00";

        setTimeout(() => {
          feedpgrphP.style.fontSize = "clamp(1.3rem, 2vw, 2.2rem)";
          feedpgrphP.style.lineHeight = "130%";
          feedpgrphP.style.padding = "0px 0px";
          feedpgrphP.style.paddingBottom = "0px";
          feedpgrphP.style.width = "clamp(50%, 70%, 100%)";
        }, 50);

        table
          .querySelectorAll("tr")
          .forEach((row) => row.classList.remove("recently-closed"));
        const existingExpanded = table.querySelector(".expanded-row");
        if (existingExpanded) {
          existingExpanded.classList.remove("expanded-row");
        }
        clickedRow.style.width = initialWidth;
        clickedRow.style.height = initialHeight;
        void clickedRow.offsetHeight;
        clickedRow.style.transition =
          "width .05s cubic-bezier(0,1.02,.06,.96), height .4s cubic-bezier(0,1.02,0,1.02)";
        setTimeout(() => {
          clickedRow.style.width = "100%";
          clickedRow.style.height = "100%";
          clickedRow.classList.add("expanded-row");
          dataSurface.classList.add("expanding");
        }, 20);
        navBarr.style.transition = "max-height .4s cubic-bezier(0,1.02,0,1.02)";
        navBarr.style.maxHeight = "0px !important";
        setTimeout(() => {
          navBarr.style.display = "none";
        }, 10);
      }

      // Define the rsetAugmt function
      const rsetAugmt = function (feedpgrphP) {
        if (feedpgrphP) {
          // RESET the width of '.feed-paragraph h1' when the row collapses
          feedpgrphP.style.width = "clamp(40%, 90%, 100%)"; // Reset the width
        }
      };

      // Attach rsetAgmt to the clickedRow so it can be accessed externally
      clickedRow.rsetAugmt = function () {
        rsetAugmt(feedpgrphP);
      };

      // OTHER ADJUSTMENTS ////

      if (window.innerWidth >= 890) {
        // If the viewport is 890 pixels or wider, we adjust the width of '.feed-paragraph h1'.
        feedpgrphP.style.width = "clamp(40%, 90%, 45%)";
      }

      // Add event listener to the textarea
      document.querySelector("#data-surface").addEventListener(
        "focus",
        function (event) {
          let focusedTextArea = event.target.closest("textarea");
          if (focusedTextArea) {
            onTextAreaFocus(event);
          }
        },
        true
      );
    }
    function onTextAreaFocus(event) {
      // Make sure we're getting the textarea from the event that was fired on focus
      const textArea = event.target;

      const currentRow = textArea.closest("tr"); // The row containing the textarea
      const survDescrp = currentRow.querySelector(".survey-discrip");
      const feedparaG = currentRow.querySelector(".feed-paragraph");
      const discripT = currentRow.querySelector(".descript");

      // Freeze the height of the textarea and hide certain elements
      const initialHeight = textArea.scrollHeight + "px"; // Capture initial height
      textArea.style.height = initialHeight; // Freeze height
      survDescrp.style.display = "none"; // Hide description
      feedparaG.style.display = "none"; // Hide paragraph
      textArea.style.transition = "height 3s cubic-bezier(0,1.02,.06,.96)";

      // Delay the animation of the textarea expansion
      setTimeout(() => {
        // Prepare for the transition
        textArea.style.height = "100%"; // Trigger the height change
        discripT.style.padding = "10px";
      }, 10); // A small delay for the other elements to hide

      // Check if the 'close' element already exists, if not, create it
      let closeDescrp = currentRow.querySelector(".close-discrip");
      if (!closeDescrp) {
        closeDescrp = document.createElement("div");
        closeDescrp.classList.add("close-discrip");
        closeDescrp.style.position = "absolute";
        closeDescrp.style.zIndex = "2"; // Adjust z-index as needed
        closeDescrp.style.top = "48px"; // Adjust position as needed
        closeDescrp.style.right = "20px"; // Adjust position as needed

        const closeIcon = document.createElement("i");
        closeIcon.id = "v-form-close";
        closeIcon.classList.add("material-symbols-outlined");
        closeIcon.textContent = "close_fullscreen"; // Add the 'close' text or icon representation here
        closeDescrp.appendChild(closeIcon);

        // Append to the textarea container (assuming the textarea is wrapped in a container)
        const textAreaContainer = textArea.parentNode;
        textAreaContainer.style.position = "relative"; // Ensure the container has a relative position
        textAreaContainer.appendChild(closeDescrp);

        // Event listener for 'close' click, using a named function to avoid duplicate listeners
        const closeFunction = function () {
          // Reset everything to initial state
          textArea.style.height = initialHeight; // Reset height
          survDescrp.style.display = ""; // Show description
          feedparaG.style.display = ""; // Show paragraph
          discripT.style.padding = "20px";

          // Remove the 'close' element after a slight delay
          setTimeout(() => {
            textAreaContainer.removeChild(closeDescrp); // Remove the 'close' icon
            // Important: Remove the event listener once it's been used to prevent duplicates
            closeDescrp.removeEventListener("click", closeFunction);
          }, 10); // Slight delay for visual adjustment
        };

        // Add the event listener for the 'close' click
        closeDescrp.addEventListener("click", closeFunction);

        // Attach closeFunction to the textArea so it can be accessed externally
        textArea.closeTextArea = closeFunction;
      }
    }

    function accessData(rowElement) {
      const topicId = rowElement.id.replace("topic", "");

      if (!topicId) {
        console.error("Error: Row does not have an ID");
        return null;
      }

      const tableRow = window.tableData.get(topicId);

      if (!tableRow) {
        console.error(`No data available for topicId: ${topicId}`);
        return null;
      }

      console.log(`accessedData for topicId ${topicId}: `, tableRow);

      return tableRow; // Data exists, return it for use
    }

    // Function to handle option data appending and interaction within a row.
    function appendOptionData(clickedRow, rowData) {
      // Validate rowData
      if (!rowData || rowData[0] !== "multiple" || !rowData[1]) {
        console.error("No matching data or not of type multiple");
        return;
      }

      // Locate the multiple choice section within the clicked row
      const multipleChoiceResponse = clickedRow.querySelector(".v-multiple-choice");
      if (!multipleChoiceResponse) {
        console.error("Multiple choice response section not found");
        return;
      }

      // Get all the option elements
      const options = multipleChoiceResponse.querySelectorAll(".option");
      if (!options.length) {
        console.error("No options elements found");
        return;
      }

      // Parse the option values from rowData
      let optionValues;
      try {
        optionValues = JSON.parse(rowData[1]);
      } catch (error) {
        console.error("Error parsing options:", error);
        return;
      }

      // Iterate over each fixed option. The number of iterations here should match the maximum number of possible options.
      for (let index = 0; index < 10; index++) { // Assuming a maximum of 10 options.
        const optionElement = options[index]; // Get the current option element.
        const optionDataText = optionValues[(index + 1).toString()];

        if (optionDataText && optionDataText.trim() !== "") {
          // Data exists for this option, so we prepare the option
          const label = optionElement.querySelector("label");
          const input = optionElement.querySelector('input[type="radio"]');

          if (label && input) {
            label.textContent = optionDataText;
            input.value = index + 1;

            // Event listener for this radio button
            input.addEventListener("change", function () {
              if (this.checked) {
                // Perform the action with the selected data
                logOptionData(clickedRow.id, this.value);
              }
            });

            // Make this option visible by removing the 'Empty-Option' class
            optionElement.classList.remove("Empty-Option");
          }
        } else {
          // No data for this option, keep it hidden
          optionElement.classList.add("Empty-Option"); // This class should hide the element via CSS
        }
      }
    }


    function logOptionData(topicId, selectedValue) {
      // Create a JSON object with the topic ID and the selected value
      const optionsRresponseObject = {
        topicId: topicId,
        selectedValue: selectedValue,
      };

      // For demonstration purposes, we're logging the object to the console
      // Here, you might want to send this response to a server or store it for later use
      console.log("optionsRresponseObject:", optionsRresponseObject);

      // TODO: Implement the functionality to submit the response,
      // e.g., send it to a server or make it globally accessible as needed
    }
  },
  validateForm: (loginNumber, password, confirmPassword, nickname) => {
    // Check if loginNumber, password, and confirmPassword fields are filled
    if (!loginNumber || !password || !confirmPassword) {
      alert(
        "Login Number, Password, and Confirm Password fields must be filled."
      );
      return false;
    }

    // Check if loginNumber and password have more than 1 character
    if (loginNumber.length < 1 || password.length < 1) {
      alert("Login Number and Password must have more than 1 character.");
      return false;
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      alert("Password and Confirm Password should match.");
      return false;
    }

    // If nickname is provided, check it's not empty
    if (nickname && nickname.length < 1) {
      alert("Nickname should not be empty.");
      return false;
    } else if (!nickname) {
      alert("Nickname is optional.");
    }

    // Return the form data
    let formData = {
      loginNumber,
      password,
    };

    // Add nickname to formData if provided
    if (nickname) {
      formData.nickname = nickname;
    }

    return formData;
  },
  validateLoginForm: (loginNumber, password) => {
    // Check if loginNumber and password fields are filled
    if (!loginNumber || !password) {
      alert("Both fields must be filled.");
      return false;
    }

    // Check if loginNumber and password have more than 1 character
    if (loginNumber.length < 1 || password.length < 1) {
      alert("Both fields must have more than 1 character.");
      return false;
    }

    // Return the login data
    return {
      loginNumber,
      password,
    };
  },
};
eventHandlers.init();

//attatch event listiners
window.addEventListener("load", function () {

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

///////// SYSTEM FUNCTIONS /////////
function displayLoadSplash() {
  // If the flag is set, display the splash screen and remove the flag
  if (!Loadsplash) return;
  Loadsplash.style.display = "flex";
  const hideSplashTime = Date.now();
  const remainingTime = Math.max(0, hideSplashTime - Date.now());
  setTimeout(() => {
    Loadsplash.style.display = "none";
  }, remainingTime + 400);
}
function displayLongSplash() {
  if (!elements.splash) return;
  Loadsplash.style.display = "flex";
  let logo = document.querySelector(".v-logo");
  let rotationSpeed = 5;

  logo.style.animation = `rotate ${rotationSpeed}s linear infinite`;
  const hideSplashTime = Date.now();
  const remainingTime = Math.max(0, hideSplashTime - Date.now());
  setTimeout(() => {
    console.log("longsplashdone");
  }, remainingTime + 50000);
}
function fadeInOnLoad() {
  const url = new URL(window.location.href);
  const delayInterval = 50; // 50ms stagger delay

  if (url.search === "?onboardingSteps") {
    console.log("onboardingSteps");

    let parentElements = document.querySelectorAll(".softTransit");

    parentElements.forEach((parent) => {
      // Select immediate children of parent that don't have the .noSoft class and aren't descendants of .noSoft
      let childrenToFade = parent.querySelectorAll(
        ":scope > *:not(.noSoft):not(.noSoft *)"
      );

      Array.from(childrenToFade).forEach((child, index) => {
        // Apply initial fade-out
        child.style.opacity = "0";
        child.style.transform = "translateY(10px)";
        child.style.transition = "opacity 0.1s ease, transform 0.2s ease";

        // Stagger the fade-in effect based on the index
        setTimeout(() => {
          child.style.opacity = "1";
          child.style.transform = "translateY(0)";
        }, 1 + index * delayInterval);
      });
    });
  }
}
function showAlert(message) {
  return new Promise((resolve) => {
    document.getElementById("alertMessage").innerText = message;
    document.getElementById("customAlert").style.display = "flex";

    if (elements.navbarWrapperElement) {
      elements.navbarWrapperElement.style.display = "none";
    }
    if (elements.verasSurfaceElement) {
      elements.verasSurfaceElement.style.display = "none";
    }

    // Add event listener to RESOLVE the promise when the user clicks the button
    closeAlertButton.addEventListener("click", function closeAlertAndResolve() {
      closeAlert();

      // Remove this event listener so it doesn't pile up unwanted multiple listeners
      closeAlertButton.removeEventListener("click", closeAlertAndResolve);
      resolve();
    });
  });
}

function closeAlert() {
  document.getElementById("customAlert").style.display = "none";

  if (elements.navbarWrapperElement) {
    elements.navbarWrapperElement.style.display = "block";
  }
  if (elements.verasSurfaceElement) {
    elements.verasSurfaceElement.style.display = "block";
  }
}
function showAlertFade(message, duration = 1000) {
  const alertBox = document.createElement("div");
  alertBox.className = "fade-alert";
  alertBox.textContent = message;

  document.body.appendChild(alertBox);

  // Fade out after the specified duration
  setTimeout(() => {
    alertBox.style.opacity = "0";

    // Remove the alert from the DOM after it's fully faded out
    setTimeout(() => {
      document.body.removeChild(alertBox);
    }, 500); // This 500ms should match the transition duration in the CSS
  }, duration);
}
closeAlertButton.onclick = closeAlert;

///////// global functions /////////



function appendTableToTarget(responseText) {
  const target = document.querySelector("#data-surface");
  target.innerHTML = responseText;
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
    pageSpace.style.height = "100dvh";
    pageSpace.style.width = "100%";

    elements.footer.style.display = "none";
    elements.surfaceView.innerHTML = "";
    elements.surfaceView.appendChild(pageSpace);
    await new Promise((resolve) => setTimeout(resolve, 50));
    pageSpace.classList.add("active");

    // Only dispatch the action to show the page after its content is fully loaded and displayed
    store.dispatch(actionToShow);
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
  if (loginSpace.dataset.formEventAttached === "true") {
    return;
  }
  loginSpace.dataset.formEventAttached = "true";

  isLoadPageRunning = false;
  Loadsplash.style.display = "none";

  const loginForm = document.querySelector(".form");
  const loginNumberInput = document.getElementById("login-number");
  const passwordInput = document.getElementById("password");

  if (!loginForm) {
    return;
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const loginNumber = loginNumberInput.value;
    const password = passwordInput.value;

    const formData = eventHandlers.validateLoginForm(loginNumber, password);

    if (!formData) {
      return;
    }

    const userLoginData = {
      username: formData.loginNumber,
      password: formData.password,
    };

    window.userLoginData = userLoginData;

    isLoadPageRunning = true;
    loadLong();

    fetch("https://study.veras.ca/login.phps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLoginData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Response URL:", response.url);
          console.log("Logindata:", userLoginData);

          showAlertFade("SUCCESS: Redirecting to newsfeed...");
          setTimeout(() => {
            window.location.href = response.url;
          }, 1000);


        } else {
          showAlert("FAILED-POST: HTTP error! status: " + response.status).then(
            () => {
              window.location = "?login";
            }
          );
        }
      })
      .catch((error) => {
        showAlert("FAILED TO LOGIN: " + error.message).then(() => {
          console.log(error);
          window.location = "?login";
        });
      });
  });
}
function handleLoginsFormSubmission(loginsSpace) {
  if (loginsSpace.dataset.formEventAttached === "true") {
    return;
  }
  loginsSpace.dataset.formEventAttached = "true";

  isLoadPageRunning = false;
  Loadsplash.style.display = "none";

  const loginsForm = document.querySelector(".form");
  const loginNumberInput = document.getElementById("login-number");
  const passwordInput = document.getElementById("password");
  // Add any other inputs you have for the logins form here

  if (!loginsForm) {
    return;
  }

  loginsForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    isLoadPageRunning = true;
    loadLong();

    const loginNumber = loginNumberInput.value;
    const password = passwordInput.value;
    // Retrieve values from any other inputs you've added

    const formData = eventHandlers.validateLoginForm(loginNumber, password); // Adjust if you have a different validation function for logins

    if (!formData) {
      return;
    }

    const userLoginsData = {
      username: formData.loginNumber,
      password: formData.password,
      // Add any other form data you're sending to the server here
    };

    window.registerData = userLoginsData; // Assuming you want to store it in registerData

    setTimeout(() => {
      fetch("https://study.veras.ca/logins.phps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginsData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response;
        })

        .then((response) => {
          console.log("Loginsdata:", userLoginsData);
          showAlert("SUCCESS: Redirecting to" + response.url).then(() => {
            window.location.href = response.url;
          });
        })
        .catch((error) => {
          console.error("Error during 2Factor Registration:", error);
          showAlert("Error during 2Factor Registration: " + error.message).then(
            () => {
              window.location = "?login";
            }
          );
        });
    }, 10);
  });
}
function handleOnboardingFormSubmission(onboardingSpace) {
  if (onboardingSpace.dataset.formEventAttached !== "true") {
    onboardingSpace.dataset.formEventAttached = "true";

    if (onboardingSpace.dataset.formEventAttached === "true") {
      isLoadPageRunning = false;
      Loadsplash.style.display = "none";
      console.log("load err", isLoadPageRunning);
    }

    const onboardingForm = document.querySelector(".form");
    const loginNumberInput = document.getElementById("login-number");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const nicknameInput = document.getElementById("nickname");

    let waitListButton = document.querySelector("#waitList");
    waitListButton.addEventListener("click", () => {
      store.dispatch(actions.showHome());
      window.location = "?home";
    });

    if (onboardingForm) {
      onboardingForm.onsubmit = (event) => {
        event.preventDefault();

        console.log("onboardingBTN-CLICKED");

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
        const registerData = {
          username: formData.loginNumber,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          nickname: formData.nickname,
        };

        window.registerData = registerData; // Make registerData globally accessible
        eventHandlers.onboardSuccess(); // Call onboardSuccess function
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
  }
});



