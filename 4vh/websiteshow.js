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


// Disable right-click
document.addEventListener('contextmenu', event => {
    event.preventDefault();
    alert("This action is disabled on this page.");
});

// Disable key combinations for DevTools
document.addEventListener('keydown', function(event) {
    // Ctrl+Shift+I or Ctrl+Shift+J
    if (event.ctrlKey && event.shiftKey && (event.key.toLowerCase() === 'i' || event.key.toLowerCase() === 'j')) {
        event.preventDefault();
        alert("This action is disabled on this page.");
    }

    // Ctrl+U (View Source)
    if (event.ctrlKey && event.key.toLowerCase() === 'u') {
        event.preventDefault();
        alert("This action is disabled on this page.");
    }

    // F12
    if (event.key === 'F12') {
        event.preventDefault();
        alert("This action is disabled on this page.");
    }
});
