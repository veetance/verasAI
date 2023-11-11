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
        // showContactUS();

        window.location.href = "?logins";
      });
    }
    if (vFormBtn2) {
      vFormBtn2.addEventListener("click", function () {
         // showContactUS();

         window.location.href = "?logins";
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