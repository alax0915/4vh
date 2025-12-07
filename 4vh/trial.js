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
