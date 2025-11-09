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
