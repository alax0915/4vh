let timeLeft = 20; // 20 seconds
const countdown = document.getElementById("countdown");
const link = document.getElementById("after-link");
const  showLink  = document.getElementById("show-link");

link.style.display = "none"; // hide the link at the start
showLink.style.display = "none"; // hide the show link button at the start

// show the starting number
countdown.textContent = timeLeft;

const timer = setInterval(() => {
  timeLeft--;
  countdown.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    countdown.textContent = "0"; // make sure it stops at 0
    timeLeft.textContent = "Done!";
    link.style.display = "inline"; // show the download link
    showLink.style.display = "inline"; // show the show link button

  }
}, 1000);
