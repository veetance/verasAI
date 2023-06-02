//  function successfulLogin(loginNumberInput, passwordInput) {
//     // Set loginSuccessful to true
//     loginSuccessful = true;

//     const onboardingButton = document.querySelector("#onboarding-button");

//     // if loginSuccessful and onboardingButton exists, display onboardingButton else hide onboardingButton and remove it from the DOM

//     if (loginSuccessful) {
//       onboardingButton.style.display = "flex";
//     } else {
//       onboardingButton.style.display = "none";
//     }

//     event.preventDefault();
//     event.stopPropagation();
//     displayLongSplash();

//     // Clear and hide the form inputs
//     loginNumberInput.value = "";
//     passwordInput.value = "";
//     loginNumberInput.style.display = "none";
//     passwordInput.style.display = "none";

//     // Change the form title
//     const formTitle = document.querySelector(".form-title");
//     formTitle.textContent = "Login Success";
 

//     // hide tofeed button
//     const ToFeedbtn = document.querySelector("#toFeed-button");
//     ToFeedbtn.style.display = "none";

//     // Change the title
//     const title = document.querySelector(".title h1");
//     title.innerHTML = "Veras<span>Authentication</span>";

//     // Create and append the new message
//     const h2Memo = document.createElement("h2");
//     h2Memo.textContent = "Please change your password.";
//     h2Memo.style.whiteSpace = "pre-wrap";
//     h2Memo.style.marginBottom = "20px";
//     h2Memo.style.color = "var(--f7-theme-color)";
//     const buttonWrap = document.querySelector(".button-wrap");
//     buttonWrap.parentNode.insertBefore(h2Memo, buttonWrap);

//     // Hide the splash screen after 5 seconds
//     setTimeout(() => {
//       document.querySelector(".v-splash").style.display = "none";
//     }, 2000);
//   }