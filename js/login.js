// document.addEventListener("DOMContentLoaded", () => {
//     // Action creators
//     const setCurrentPage = (page) => ({
//       type: "SET_CURRENT_PAGE",
//       payload: page,
//     });
//     const showLogin = () => ({ type: "SHOW_LOGIN" });
//     const hideLogin = () => ({ type: "HIDE_LOGIN" });
//     const logout = () => ({ type: "LOGOUT" });
//     const setLoginContent = (html) => ({
//       type: "SET_LOGIN_CONTENT",
//       payload: html,
//     });
//     const showNewsfeed = () => ({ type: "SHOW_NEWSFEED" });
//     const setNewsfeedContent = (html) => ({
//       type: "SET_NEWSFEED_CONTENT",
//       payload: html,
//     });
  
//     // New action creators for insights and create pages
//     const showInsights = () => ({ type: "SHOW_INSIGHTS" });
//     const setInsightsContent = (html) => ({
//       type: "SET_INSIGHTS_CONTENT",
//       payload: html,
//     });
//     const showCreate = () => ({ type: "SHOW_CREATE" });
//     const setCreateContent = (html) => ({
//       type: "SET_CREATE_CONTENT",
//       payload: html,
//     });
  
//     // Query the DOM elements
//     const loginButton = document.querySelector(".login-button");
//     const surfaceView = document.querySelector(".surface-view");
//     const footer = document.querySelector(".footer-Contents");
//     const feedScroll = document.querySelector(".feed-scroll");
//     const feedWrapper = document.querySelector(".feed-wrapper");
//     const insightsButton = document.querySelector(".lnk-ico .insights-btn");
//     const createButton = document.querySelector(".lnk-ico .create-btn");
  
//     // Event listener for the login button
//     if (loginButton) {
//       loginButton.addEventListener("click", () => {
//         if (loginButton.classList.contains("logout-button")) {
//           store.dispatch(logout());
//           updateLoginButton(false); // Call the updateLoginButton function when logging out
//         } else {
//           store.dispatch(showLogin());
//           fetch("pages/login.html")
//             .then((response) => response.text())
//             .then((html) => {
//               store.dispatch(setLoginContent(html));
//             });
//         }
//       });
//     }
  
//     // Event listener for the insights button to dispatch the new action creators for insights and create pages
  
//     if (insightsButton) {
//       insightsButton.addEventListener("click", () => {
//         store.dispatch(showInsights());
//         fetch("../pages/insights.html")
//           .then((response) => response.text())
//           .then((html) => {
//             store.dispatch(setInsightsContent(html));
//           });
//       });
//     }
  
//     if (createButton) {
//       createButton.addEventListener("click", () => {
//         store.dispatch(showCreate());
//         fetch("../pages/create.html")
//           .then((response) => response.text())
//           .then((html) => {
//             store.dispatch(setCreateContent(html));
//           });
//       });
//     }
    
//     store.subscribe(() => {
//       const state = store.getState();
    
//       // If the login form should be visible
//       if (state.loginVisible) {
//         let loginSpace = document.querySelector(".login-Space");
    
//         if (!loginSpace) {
//           loginSpace = document.createElement("div");
//           loginSpace.classList.add("login-Space", "fade-in");
//           surfaceView.insertBefore(loginSpace, surfaceView.firstChild);
//         }
    
//         loginSpace.innerHTML = state.loginContent;
//         document.title = "Login";
//         surfaceView.style.opacity = 0;
//         surfaceView.innerHTML = "";
//         surfaceView.appendChild(loginSpace);
//         footer.style.display = "none";
    
//         setTimeout(() => {
//           loginSpace.classList.add("active");
//           surfaceView.style.opacity = 1;
//         }, 100);
    
//         // Add event listener for form submission, only if it hasn't been added before
//         if (!loginSpace.dataset.formEventAttached) {
       
    
//           loginSpace.dataset.formEventAttached = "true";
    
//           setTimeout(() => {
//             const loginForm = document.querySelector(".form");
//             loginForm.addEventListener("submit", (event) => {
//               event.preventDefault();
    
//               const loginNumberInput = document.querySelector("#login-number");
//               const passwordInput = document.querySelector("#password");
    
//               // Fetch the newsfeed.html content and set it to the state
//               fetch("pages/newsfeed.html")
//                 .then((response) => response.text())
//                 .then((html) => {
//                   store.dispatch(setNewsfeedContent(html));
//                   window.location.href = "pages/newsfeed.html";
//                 });
    
//               if (loginNumberInput.value === "1" && passwordInput.value === "1") {
//                 store.dispatch(hideLogin());
//                 store.dispatch(showNewsfeed());
//               }
//             });
//           }, 100);
//         }
    
//       } else if (state.newsfeedVisible) {
//         // If the newsfeed should be visible
//         let newsfeedSpace = document.querySelector(".newsfeed-Space");
    
//         if (!newsfeedSpace) {
//           newsfeedSpace = document.createElement("div");
//           newsfeedSpace.classList.add("newsfeed-Space", "fade-in");
//           surfaceView.insertBefore(newsfeedSpace, surfaceView.firstChild);
//         }
    
//         newsfeedSpace.innerHTML = state.newsfeedContent;
//         document.title = "Newsfeed";
//         surfaceView.style.opacity = 0;
//         surfaceView.innerHTML = "";
//         surfaceView.appendChild(newsfeedSpace);
//         footer.style.display = "block";
    
//         setTimeout(() => {
//           newsfeedSpace.classList.add("active");
//           surfaceView.style.opacity = 1;
//         }, 100);
    
//       } else {
//         // insights and create page
//         if (state.insightsVisible) {
//           let insightsSpace = document.querySelector(".insights-Space");
    
//           if (!insightsSpace) {
//             insightsSpace = document.createElement("div");
//             insightsSpace.classList.add("insights-Space");
//             feedScroll.appendChild(insightsSpace);
    
//             fetch("../pages/insights.html")
//               .then((response) => response.text())
//               .then((html) => {
//                 insightsSpace.innerHTML = html;
//               });
//           }
    
//           let createSpace = document.querySelector(".create-Space");
//           if (createSpace) {
//             createSpace.style.display = "none";
//           }
    
//           feedWrapper.style.display = "none";
    
//         } else if (state.createVisible) {
//           let createSpace = document.querySelector(".create-Space");
    
//           if (!createSpace) {
//             createSpace = document.createElement("div");
//             createSpace.classList.add("create-Space");
//             feedScroll.appendChild(createSpace);
//             fetch("../pages/create.html")
//             .then((response) => response.text())
//             .then((html) => {
//               createSpace.innerHTML = html;
//             });
//         }
  
//         let insightsSpace = document.querySelector(".insights-Space");
//         if (insightsSpace) {
//           insightsSpace.style.display = "none";
//         }
//         feedWrapper.style.display = "none";
  
//       } else {
//         document.addEventListener("DOMContentLoaded", () => {
//           // Your entire script here
//           feedWrapper.style.display = "flex";
  
//           if (insightsSpace) {
//             insightsSpace.style.display = "none";
//           }
  
//           if (createSpace) {
//             createSpace.style.display = "none";
//           }
  
//           feedWrapper.style.display = "flex";
//         });
//       }
//     }
//   });
  
//     window.addEventListener("popstate", () => {
//       const currentPage = window.location.pathname.replace("/", "");
//       store.dispatch(setCurrentPage(currentPage));
//     });
//   });