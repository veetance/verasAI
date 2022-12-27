var app = new Framework7({
  // App root element
  el: "#app",
  // other parameters

  routes: [
    {
      path: "/",
      url: "index.html",
    },

    {
      path: "/page3/",
      url: "pages/page3.html",
    },

    {
      path: "/",
      url: "index.html",
    },

    {
      path: "/index/",
      url: "index.html",
    },
  ],
});
var mainView = app.views.create(".view-main");

document.addEventListener("deviceready", onDeviceReady, false);

// make .leadBoard  and logo width the same as its height/ my fix for the aspect ratio issue//

function refreshaspectRatio() {
  var leadBoard = $(".leadBoard");
  var leadBoardH = leadBoard.height();
  leadBoard.css("width", leadBoardH);

  var logo = $(".logo");
  var logoH = logo.height();
  logo.css("width", logoH);
}

refreshaspectRatio();
$(window).resize(function () {
  refreshaspectRatio();
});

// set startGame to false using boolean
var startGame = false;

// startGame boolean is set to true on the touch or press of .button
// basically some sorta of start button

$(".button").on("touchend click", function () {
  startGame = true;
  $(".button h5").hide();
  $(".button").animate(
    {
      width: 0,
      height: 0,
      opacity: 0,
    },
    100,
    "linear"
  );
  meterTime();
});

// run the timer and update the .meterTimer div with the time in seconds max time of 60 seconds using innerHTML to update the h4 inside .meterTimer div and set the startGame boolean to true wile the timer is running and false when the timer is not running

// .meterBar div decreases as the time decreases smoothly one % at a time and stops when the time is 0 and the startGame boolean is set to false.

function meterTime() {
  if (startGame == true && nextLevel == false) {
    rotateHole();

    var time = 10;
    var timer = setInterval(function () {
      time--;
      $(".meterTimer").html("<h4>" + time + "s" + "</h4>");

      var width = time * 10;
      $(".meterBar").animate(
        {
          width: width + "%",
        },
        {
          duration: 1000 / 4,
          easing: "linear",
        }
      );

      if (time == 0 && nextLevel == false) {
        gameoverScreen();
        clearInterval(timer);
        $(".Time").html("<h5>" + time + "</h5>");
        gameOver();
      } else if (time > 1 && nextLevel == true) {
        // console.log("Current time:" + time);
        $(".Time").html("<h5>" + time + "s" + "</h5>");
        pauseMeter();
        clearInterval(timer);
      }
    }, 1000);
  }
}

function pauseMeter() {
  if (nextLevel == true) {
    var width = $(".meterBar").width();
    $(".meterBar").css("width", width);
    $(".meterBar").stop();
  }
}

/// display "Timeout" by replacing .meterBar with a new div with the class GameOver that has the text "Timeout" using h4, make the h3 font-size scale from 0rem to .8rem with smooth linear animation using the animate function and the css transform property scales the h3 font-size from 0rem to .8rem

function gameOver() {
  if (startGame == true && nextLevel == false) {
    $(".meterBar").replaceWith("<div class='GameOver'><h3>TIMEOUT</h3></div>");
    $(".GameOver").fadeOut(0);
    $(".GameOver").fadeIn(1000, "cubic-bezier(0.68, -0.55, 0.265, 1.55)");
    $(".GameOver h3").animate({ fontSize: "1rem" }, 200);
    $(".GameOver").addClass("shake");
    $(".Hole").css("animation-name", "none");
  }
}

// healthSystem

// rotatehole
function rotateHole() {
  if (startGame == true) {
    var hole = $(".Hole");
    var centerX = hole.width() / 2;
    var centerY = hole.height() / 2;

    hole.css({
      "transform-origin": centerX + "px " + centerY + "px",
      "animation-name": "rotate",
      "animation-duration": "2s",
      "animation-iteration-count": "infinite",
      "animation-timing-function": "linear",
    });

    var style = $("<style>").text(
      "@keyframes rotate { 100% { transform: rotate(360deg); } }"
    );
    $("head").append(style);
  }
}

//a pulsing animation around .Hole it fades in over a period of 500 milliseconds and grows outward from the center of the Hole element until it reaches a maximum size and then fades out. This animation continues to run as long as the startGame variable is true. When startGame becomes false, the animation stops and any remaining pulses are removed from the page.

function HoleSucking() {
  if (startGame) {
    var hole = $(".Hole");
    var centerX = hole.width() / 2;
    var centerY = hole.height() / 2;

    function createPulse() {
      var pulse = $("<div>")
        .addClass("pulse")
        .css({
          position: "absolute",
          top: centerY - 25,
          left: centerX - 25,
          width: 50,
          height: 50,
          "border-radius": "50%",
          border: "1px solid rgb(176 145 211 / 80%)",
          background: "none",
          "transform-origin": "50% 50%",
          transform: "scale(1)",
        });

      pulse.css({
        opacity: "-0",
      });

      pulse.animate(
        {
          opacity: "1",
        },
        {
          duration: 500,
          easing: "linear",
        }
      );

      hole.append(pulse);

      var scale = 11;
      var interval = setInterval(function () {
        scale -= 0.35;
        pulse.css("transform", "scale(" + scale + ")");
        pulse.css("transform", "scale(" + scale + ")");

        if (scale <= 0) {
          clearInterval(interval);
          pulse.remove();
          if (startGame) {
            createPulse();
          }
        }

        // clearInterval(interval) when stopHoleSucking is true
        if (stopHoleSucking == true) {
          clearInterval(interval);
          pulse.remove();
        }
      }, 20);
    }
    createPulse();
  }
}

function checkIfTouching() {
  // Select the target element and the other element
  const box = document.querySelector(".box");
  const hole = document.querySelector(".Hole");

  // Get the bounding client rects of both elements
  const boxRect = box.getBoundingClientRect();
  const holeRect = hole.getBoundingClientRect();

  // Check if the rects intersect
  if (
    boxRect.x < holeRect.x + holeRect.width &&
    boxRect.x + boxRect.width > holeRect.x &&
    boxRect.y < holeRect.y + holeRect.height &&
    boxRect.height + boxRect.y > holeRect.y
  ) {
    // Set stopHoleSucking to false
    stopHoleSucking = false;

    // If the rects intersect, log a message and call HoleSucking()
    console.log("intersecting");
    levelSuccess();

    // Check if HoleSucking has already been called
    if (!$(".pulse").length) {
      // If HoleSucking has not been called, call it
      HoleSucking();
    }
  } else {
    // If the rects do not intersect, log a message and set stopHoleSucking to true
    console.log("not intersecting");
    stopHoleSucking = true;
  }
}

function levelSuccess() {
  // Select the target element and the other element
  const box = document.querySelector(".box");
  const hole = document.querySelector(".Hole");

  // Initialize the timer and the stopInterval variable
  var timer = 0;
  var stopInterval = false;

  // Create an interval that runs every second
  var interval = setInterval(function () {
    // Get the bounding client rects of both elements
    const boxRect = box.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();

    // Check if the rects intersect
    if (
      boxRect.x < holeRect.x + holeRect.width &&
      boxRect.x + boxRect.width > holeRect.x &&
      boxRect.y < holeRect.y + holeRect.height &&
      boxRect.height + boxRect.y > holeRect.y
    ) {
      // If the rects intersect, increment the timer
      timer++;

      // If the timer reaches 3 seconds, log the message and clear the interval
      if (timer == 3) {
        console.log("next level");
        clearInterval(interval);
        suckedIn();
        levelEnd();
      }
    } else {
      // If the rects do not intersect, log the message and set stopInterval to true
      console.log("time cleared");
      stopInterval = true;
    }

    // If stopInterval is true, clear the interval

    if (stopInterval == true) {
      clearInterval(interval);
    }
  }, 1000);
}

// scales down to 0 the width and height with liner .animate, then removes the box element from the page and sets start game = false  This function is called when the box element intersects with the hole element for 3 seconds.

var nextLevel = false;

var levelSuccessCount = 0;

function suckedIn() {
  levelSuccessCount++;

  nextLevel = true;

  if (nextLevel == true) {
    $(".box").animate(
      { width: "0", height: "0" },
      { duration: 400, easing: "linear" }
    );
    setTimeout(function () {
      $(".box").remove();
      console.log("Level success count: " + levelSuccessCount);
    }, 300);
  }
}

// level end

// function levelEnd makes .level-end which is initaly hiden with display: none; visible and fades in over a period of 500 milliseconds.

function levelEnd() {
  if (startGame == true && nextLevel == true) {
    setTimeout(function () {
      $(".level-end").css("display", "flex");
      $(".level-end").animate(
        {
          opacity: "1",
        },
        {
          duration: 500,
          easing: "linear",
        }
      );
    }, 1000);
  }
}

// function gameoverScreen makes .game-over which is initaly hiden with display: none; visible and fades in over a period of 500 milliseconds. it triggeres if startGame == false and nextLevel == true

function gameoverScreen() {
  if (nextLevel == false) {
    suckedIn();

    setTimeout(function () {
      $(".game-over").css("display", "flex");
      $(".game-over").animate(
        {
          opacity: "1",
        },
        {
          duration: 500,
          easing: "linear",
        }
      );
    }, 10);
  }
}

var startTilt = false;

function onDeviceReady() {
  // if .button is pressed or touched startTilt is set to true and the deviceorientation event listener is added to the window object and the handleMotion function is called

  $(".button").on("touchend click", function () {
    startTilt = true;

    // Cordova is now initialized. Have fun!
    if (
      window.DeviceOrientationEvent &&
      startTilt == true &&
      startGame === true
    ) {
      window.addEventListener("deviceorientation", handleMotion);
    } else {
      alert("sorry not supported");
    }
  });

  var movebox = 10 / 50;

  function handleMotion(event) {
    if (startGame === true) {
      // Your code to handle the accelerometer data here

      // console.log(meterTimer)
      var z = event.alpha;
      var x = event.beta;
      var y = event.gamma;

      $("#z").text("z: " + z);
      $("#x").text("x: " + x);
      $("#y").text("y: " + y);

      movebox += x / 50;

      function rotateBox() {
        $(".box").css(
          "transform",
          "rotateX(" + y * 2 + "deg) rotateY(" + x * 2 + "deg)",
          "rotate(" + (x, y, z) * 10 + "deg)"
        );
      }

      rotateBox();

      function animateBall() {
        if (startGame == true) {
          // Update the x and y position of the .box element by adding
          // the x and y values from the accelerometer data

          var box = $(".box");
          var currentX = parseInt(box.css("left"));
          var currentY = parseInt(box.css("top"));
          box.css("left", currentX + y + movebox - 10);
          box.css("top", currentY + x + movebox - 10);

          // make .platform act as a portal.
          var pWW = $(".platform").width();
          var pHH = $(".platform").height();

          if (currentX > pWW) {
            box.css("left", 0);
          } else if (currentX < -20) {
            box.css("left", pWW);
          } else if (currentY > pHH) {
            box.css("top", 0);
          } else if (currentY < 0) {
            box.css("top", pHH);
          }

          checkIfTouching();
        }
      }

      animateBall();
    }
  }
}

// reset accelerometer on touch or click of .lives

$(".refresh-button, .lives").on("touchend click", function () {
  window.location.reload();
  $(".lives").css("opacity", ".5");
});
