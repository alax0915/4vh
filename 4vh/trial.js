// Countdown timer
let seconds = 10;
const countdownEl = document.getElementById('seconds');

const countdown = setInterval(() => {
    seconds--;
    countdownEl.textContent = seconds;
    if (seconds <= 0) {
        clearInterval(countdown);
        document.querySelector('.countdown').textContent = "Warning: Trial version active. Do not copy!";
    }
}, 1000);

// Button hover animation (extra visual)
const btn = document.querySelector('.btn');
btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.1)';
});
btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
});

// Anti-copy alert
document.addEventListener('copy', (e) => {
    e.preventDefault();
    alert("Copying this page is forbidden! Violation may lead to penalties.");
});


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
