// // OLD CODE - LEAVE THIS FILE AS IS//

// store.subscribe(() => {
//     const state = store.getState();
  
//     // Login state
//     if (state.loginVisible) {
//       history.pushState({ page: 'login' }, '', '/pages/login.html');
//       displayPage(state.loginContent, "Login", ".login-Space");
  
//       // Add existing code for handling login form submission here...
//       const loginSpace = document.querySelector(".login-Space");
//       if (!loginSpace.dataset.formEventAttached) {
//         loginSpace.dataset.formEventAttached = "true";
//         setTimeout(() => {
//             const loginForm = document.querySelector(".form");
  
//             loginForm.addEventListener("submit", (event) => {
//               // Prevent form submission at the start of the event handler
//               event.preventDefault();
            
//               const loginNumberInput = document.querySelector("#login-number");
//               const passwordInput = document.querySelector("#password");
            
//               // Validate login number and password
//               const loginNumber = loginNumberInput.value;
//               const password = passwordInput.value;
            
//               // Check for "God mode"
//               if (loginNumber === "1" && password === "1") {
//                 successfulLogin(loginNumberInput, passwordInput);
//                 return;
//               }
            
//               // Check for normal login
//               if (loginNumber.length !== 7 && loginNumber.length !== 8) {
//                 alert("Login number should be 7 or 8 digits.");
//                 return;
//               }
            
//               if (password.length !== 5) {
//                 alert("Password should be 5 digits.");
//                 return;
//               }
            
//               // Prepare the userLoginData object
//               const userLoginData = {
//                 loginNumber: loginNumber,
//                 password: password
//               };
            
//               // Send a POST request to login.phps
//               fetch("http://study.veras.ca/logins.phps", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(userLoginData)
//               })
//               .then(response => {
//                 if (!response.ok) {
//                   throw new Error("Network response was not ok");
//                 }
//                 return response.text();
//               })
//               .then(data => {
//                 // If validation passes, proceed with successful login
//                 successfulLogin(loginNumberInput, passwordInput);
//               })
//               .catch(error => {
//                 // Handle errors here
//                 if (error.message.includes("NetworkError")) {
//                   alert("Network Error: Failed to reach the server.");
//                 } else if (error.message.includes("TypeError")) {
//                   alert("Type Error: There was a problem with the type of the input.");
//                 } else {
//                   alert("Login Data Error: There was a problem with the login data.");
//                 }
//               });
//             });
            
  
//           }, 100);
//       }
//     } 
//     // Onboarding state
//     else if (state.onboardingVisible) {
//       history.pushState({ page: 'onboarding' }, '', '/pages/onboarding.html');
//       displayPage(state.onboardingContent, "Onboarding", ".onboarding-Space");
//     } 
//     // Onboarding steps state
//     else if (state.onboardingStepsVisible) {
//       history.pushState({ page: 'onboardingSteps' }, '', '/pages/onboardingSteps.html');
//       displayPage(state.onboardingStepsContent, "Onboarding Steps", ".onboardingSteps-Space");
//     } 
//     // Newsfeed state
//     else if (state.newsfeedVisible) {
//       history.pushState({ page: 'newsfeed' }, '', '/pages/newsfeed.html');
//       displayPage(state.newsfeedContent, "Newsfeed", ".newsfeed-Space");
//     } 
//     // Insights state
//     else if (state.insightsVisible) {
//       history.pushState({ page: 'insights' }, '', '/pages/insights.html');
//       displayPage(state.insightsContent, "Insights", ".insights-Space");
//     } 
//     // Create state
//     else if (state.createVisible) {
//       history.pushState({ page: 'create' }, '', '/pages/create.html');
//       displayPage(state.createContent, "Create", ".create-Space");
//     } 
//     // Default state
//     else {
//       history.pushState({ page: 'home' }, '', '/index.html');
//     }
//   });
  
//   function displayPage(content, title, selector, url = null) {
//     let space = document.querySelector(selector);
  
//     if (!space) {
//       space = document.createElement("div");
//       space.classList.add(selector.slice(1), "fade-in");
//       surfaceView.insertBefore(space, surfaceView.firstChild);
//     }

//     // If there's an URL, it means we need to fetch the content with AJAX
//     if (url) {
//       fetch(url)
//         .then((response) => response.text())
//         .then((html) => {
//           space.innerHTML = html;
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     } else {
//       space.innerHTML = content;
//     }
    
//     document.title = title;
//     surfaceView.style.opacity = 0;
//     surfaceView.innerHTML = "";
//     surfaceView.appendChild(space);
//     footer.style.display = "none";
  
//     setTimeout(() => {
//       space.classList.add("active");
//       surfaceView.style.opacity = 1;
//     }, 100);
// }



  