const progress = document.querySelector("#progress");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const steps = document.querySelectorAll(".step");

const contents = document.querySelectorAll(".step-content");

let currentActive = 1;

// Next button event listener.
next.addEventListener("click", () => {
  currentActive++;

  if (currentActive > steps.length) {
    currentActive = steps.length;
  }

  update();
});

// Previous button event listener.
prev.addEventListener("click", () => {
  currentActive--;

  if (currentActive < 1) {
    currentActive = 1;
  }

  update();
});

// Update progress bar and step classes.
function update() {
  steps.forEach((step, idx) => {

    step.classList.remove('active-step', 'last');

    if (idx < currentActive) {
      step.classList.add("active-step");
    } else {
      step.classList.remove("active-step");
    }

    if (idx === currentActive - 1) {
      step.classList.add('last');
    }
  });

  // Update content visibility
  contents.forEach((content, idx) => {
    if (idx === currentActive - 1) {
      content.classList.add('active-content');
    } else {
      content.classList.remove('active-content');
    }
  });


  // Update progress bar width.
  const actives = document.querySelectorAll(".active-step");

  // Set progress bar width based on the number of active steps.
  progress.style.width =
    ((actives.length - 1) / (steps.length - 1)) * 100 + "%";

  if (currentActive === 1) {
    prev.disabled = true;
  } else if (currentActive === steps.length) {
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
}
