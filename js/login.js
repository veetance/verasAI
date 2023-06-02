// document.addEventListener("DOMContentLoaded", () => {

//     const actionCreators = {
//         hideHome: () => ({ type: HIDE_HOME }),
//         setCurrentPage: (page) => ({ type: SET_CURRENT_PAGE, payload: page }),
//         showLogin: () => ({ type: SHOW_LOGIN }),
//         hideLogin: () => ({ type: HIDE_LOGIN }),
//         logout: () => ({ type: LOGOUT }),
//         setLoginContent: (html) => ({ type: SET_LOGIN_CONTENT, payload: html }),
//         showNewsfeed: () => ({ type: SHOW_NEWSFEED }),
//         setNewsfeedContent: (html) => ({ type: SET_NEWSFEED_CONTENT, payload: html }),
//         showInsights: () => ({ type: SHOW_INSIGHTS }),
//         hideInsights: () => ({ type: HIDE_INSIGHTS }),
//         setInsightsContent: (html) => ({ type: SET_INSIGHTS_CONTENT, payload: html }),
//         showCreate: () => ({ type: SHOW_CREATE }),
//         hideCreate: () => ({ type: HIDE_CREATE }),
//         setCreateContent: (html) => ({ type: SET_CREATE_CONTENT, payload: html }),
//         setOnboardingContent: (html) => ({ type: SET_ONBOARDING_CONTENT, payload: html }),
//         showOnboarding: () => ({ type: SHOW_ONBOARDING }),
//         hideOnboarding: () => ({ type: HIDE_ONBOARDING }),
//         setOnboardingStepsContent: (html) => ({ type: SET_ONBOARDING_STEPS_CONTENT, payload: html }),
//         showOnboardingSteps: () => ({ type: SHOW_ONBOARDING_STEPS }),
//         hideOnboardingSteps: () => {
//           localStorage.removeItem("onboardingStepsVisible");
//           return { type: HIDE_ONBOARDING_STEPS };
//         },
//       };


//       const domElements = {
//         loginButton: document.querySelector(".login-button"),
//         surfaceView: document.querySelector(".surface-view"),
//         footer: document.querySelector(".footer-Contents"),
//         insightsButton: document.querySelector(".lnk-ico .insights-btn"),
//         createButton: document.querySelector(".lnk-ico .create-btn"),
//         refreshButtons: document.querySelectorAll(".nav-logo, .nav-title, .VLOGO-wrapper")
//       };


//       domElements.refreshButtons.forEach((button) => {
//         button.addEventListener("click", () => {
//           window.location.href = "/index.html";
//         });
//       });
      
//       window.addEventListener("load", function () {
//         if (window.location.pathname !== "/index.html") {
//           // Redirect to index.html
//           window.location.href = "/index.html";
//         }
//       });


//       function updateStep(increment) {
//         let steps = Array.from(
//           document.querySelector(".onboarding-steps").querySelectorAll(".step")
//         );
//         let currentStep = steps.find((step) => step.classList.contains("active"));
    
//         if (!currentStep) {
//           steps.find((step) => step.dataset.step == "0").classList.add("active");
//           return;
//         }
    
//         let currentStepNumber = parseInt(currentStep.dataset.step);
//         let nextStepNumber = currentStepNumber + increment;
    
//         let nextStep = steps.find(
//           (step) => parseInt(step.dataset.step) === nextStepNumber
//         );
    
//         if (nextStep) {
//           currentStep.classList.remove("active");
//           nextStep.classList.add("active");
//         }
//       }
//       function addStepButtonListeners() {
//         document
//           .querySelectorAll(".onboarding-steps .nav-button.next")
//           .forEach((button) => {
//             button.addEventListener("click", function (event) {
//               event.preventDefault(); 
//               event.stopPropagation(); 
//               updateStep(1);
//             });
//           });
    
//         document
//           .querySelectorAll(".onboarding-steps .nav-button.back")
//           .forEach((button) => {
//             button.addEventListener("click", function (event) {
//               event.preventDefault(); 
//               event.stopPropagation(); 
//               updateStep(-1); 
//             });
//           });
//       }
//       function displaySplash() {
//         let splash = document.querySelector(".v-splash");
//         if (!splash) return;
//         splash.style.display = "flex";
//         const hideSplashTime = Date.now() + 1000; seconds
//         window.onload = function () { 
//           const remainingTime = Math.max(0, hideSplashTime - Date.now());
//           setTimeout(() => {
//             splash.style.display = "none";
//           }, remainingTime);
//         };
//       }
//       function displayLongSplash() {
//         let splash = document.querySelector(".v-splash");
//         if (!splash) return;
//         splash.style.display = "flex";
//         let logo = document.querySelector(".v-logo");
//         let rotationSpeed = 5;
//         logo.style.animation = `rotate ${rotationSpeed}s linear infinite`;
//         const hideSplashTime = Date.now() + 5000; 
    
//         window.onload = function () {
//           const remainingTime = Math.max(0, hideSplashTime - Date.now());
//           setTimeout(() => {
//             splash.style.display = "none";
//             logo.style.animation = "";
//           }, remainingTime);
//         };
//       }

      

   
    
      
// });



  // Helper function to fetch and update UI


//   async function fetchAndUpdateUI(url, spaceName, spaceClass) {
//   try {
//     const response = await fetch(url);
//     const html = await response.text();

//     let space = document.querySelector(spaceName);
//     if (!space) {
//       space = document.createElement("div");
//       space.classList.add(spaceClass, "fade-in");
//       surfaceView.insertBefore(space, surfaceView.firstChild);
//     }

//     space.innerHTML = html;

//     return space;

//   } catch (error) {
//     console.error("Fetch-Error:", error);
//     document.querySelector(".v-splash").style.display = "none";
//   }
// }

// store.subscribe(async () => {
//   const state = store.getState();

//   if (state.loginVisible) {
//     // Your code for loginVisible...
//     const url = "pages/login.html";
//     const spaceName = ".login-Space";
//     const spaceClass = "login-Space";
//     const space = await fetchAndUpdateUI(url, spaceName, spaceClass);
    
//     // The rest of your code...
//     window.history.pushState({ page: "login" }, "", "/login.html");
//     document.title = "Login";
//     surfaceView.style.opacity = 0;
//     surfaceView.innerHTML = "";
//     surfaceView.appendChild(space);

//     setTimeout(() => {
//       space.classList.add("active");
//       surfaceView.style.opacity = 1;
//     }, 100);
    
//     //... rest of your code...
//   } 
//   //... rest of the state cases...
// });
