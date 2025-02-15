const progress = document.querySelector("#progress");
const steps = document.querySelectorAll(".step");
const accordionTriggers = document.querySelectorAll(".accordion-trigger");
const accordionBodies = document.querySelectorAll(".accordion-body");
const stepContents = document.querySelectorAll(".step-content");

let currentActive = 1;
let autoplayInterval;
let autoplayTimeout;

document.addEventListener("DOMContentLoaded", () => {
  // Calculate the height of the first accordion body.
  const firstBody = accordionBodies[0];
  // Set the height of the first accordion body.
  firstBody.style.height = `${firstBody.scrollHeight}px`;
});



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
  accordionBodies.forEach((body, idx) => {
    if (idx === currentActive - 1) {
      // Expand the active content
      body.style.transition = "height 0.5s ease";
      body.style.height = `${body.scrollHeight}px`; // Set height to content height

      stepContents[idx].classList.add("active");
    } else {
      // Collapse inactive content
      body.style.transition = "height 0.5s ease";
      body.style.height = "0"; // Set height to 0

      stepContents[idx].classList.remove("active");
    }
  });

  // Update progress bar width
  progress.style.width = ((currentActive - 1) / (steps.length - 1)) * 100 + "%";
}

// Function to move to a specific step
function goToStep(stepNumber) {
  currentActive = stepNumber;
  update();
  pauseAutoplay(); // Pause autoplay for 30 seconds
}

// Add click event listeners to steps
steps.forEach((step, idx) => {
  step.addEventListener("click", () => {
    soundRestart(pluck);
    goToStep(idx + 1);
  });
});

// Add click event listeners to accordion triggers
accordionTriggers.forEach((trigger, idx) => {
  trigger.addEventListener("click", () => {
    soundRestart(pluck);
    goToStep(idx + 1);
  });
});

// Autoplay functionality
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    currentActive++;
    if (currentActive > steps.length) {
      currentActive = 1; // Loop back to the first step
    }
    update();
  }, 4000); // 4 seconds per step
}

// Function to pause autoplay for 8 seconds
function pauseAutoplay() {
  clearInterval(autoplayInterval); // Stop the current autoplay
  clearTimeout(autoplayTimeout); // Clear any existing timeout

  // Restart autoplay after 8 seconds
  autoplayTimeout = setTimeout(() => {
    startAutoplay();
  }, 8000); // 8 seconds
}

/* -------------------------
  Window resize listener
  ------------------------- */
window.addEventListener("resize", () => {
  console.log('Resizing');

  // Recalculate the height of the current open accordion
  const activeBody = accordionBodies[currentActive - 1];
  if (activeBody) {
    // Temporarily remove height to measure
    activeBody.style.height = "auto";
    const newHeight = `${activeBody.scrollHeight}px`;
    // Set back to the measured height
    activeBody.style.height = newHeight;
  }
});


// Initialize autoplay
startAutoplay();