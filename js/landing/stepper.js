const progress = document.querySelector("#progress");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const steps = document.querySelectorAll(".step");
const contents = document.querySelectorAll(".step-content");

let currentActive = 1;
let autoplayInterval;
let autoplayTimeout;

// Function to update the stepper
function update() {
  steps.forEach((step, idx) => {
    step.classList.remove('active-step', 'last');

    if (idx < currentActive) {
      step.classList.add("active-step");
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

  // Update progress bar width
  progress.style.width = ((currentActive - 1) / (steps.length - 1)) * 100 + "%";
}

// Function to move to a specific step.
function goToStep(stepNumber) {
  currentActive = stepNumber;
  update();
}

// Function to handle step navigation.
function navigateStep(direction) {
  if (direction === "next") {
    currentActive++;
    if (currentActive > steps.length) {
      currentActive = 1;
    }
  } else if (direction === "prev") {
    currentActive--;
    if (currentActive < 1) {
      currentActive = steps.length;
    }
  }
  update();

  // Pause autoplay for 30 seconds every time we navigate
  // so that the user has time to read the steps.
  pauseAutoplay(); 
}

// Next button event listener
next.addEventListener("click", () => {
  navigateStep("next");
});

// Previous button event listener
prev.addEventListener("click", () => {
  navigateStep("prev");
});

// Add click event listeners to steps
steps.forEach((step, idx) => {
  step.addEventListener("click", () => {
    goToStep(idx + 1);
    pauseAutoplay(); // Pause autoplay for 30 seconds
  });
});

// Autoplay functionality
function startAutoplay() {
  // Clear any existing autoplay interval.
  autoplayInterval = setInterval(() => {
    // Move to the next step.
    currentActive++;
    // If we reach the end of the steps, loop back to the first step.
    if (currentActive > steps.length) {
      // Loop back to the first step.
      currentActive = 1; 
    }
    // Update the stepper.
    update();

  }, 4000); // 4 seconds per step
}

// Function to pause autoplay for 30 seconds.
function pauseAutoplay() {
  console.log('Manual navigation. Pausing autoplay for 10 seconds...');

  // Stop the current autoplay.
  clearInterval(autoplayInterval); 
  // Clear any existing timeout.
  clearTimeout(autoplayTimeout); 

  // Restart autoplay after 30 seconds.
  autoplayTimeout = setTimeout(() => {
    // Call the autoplay to start again.
    startAutoplay();
  }, 10000); // 10 seconds
}

// Initialize autoplay
startAutoplay();