const button = document.getElementById('build-btn');
const container = document.querySelector('.container');
const newContent = document.getElementById('new-content');

newContent.style.display = 'none'; // hide at the start

button.addEventListener('click', () => {
  container.style.display = 'none';
  newContent.style.display = 'block';
});
const checkbox = document.getElementById('checkbox');
const nextButton = document.getElementById('next');
nextButton.addEventListener('click',function () {
  if (checkbox.checked) {
    window.location.href = "#";
  } else {
    alert("Please agree to the Privacy And Policy to proceed.");
  }
})


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
