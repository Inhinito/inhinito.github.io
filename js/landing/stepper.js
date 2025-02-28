// Stepper variables
let progress, steps, accordionTriggers, accordionBodies, stepContents;
let currentActive = 1;
let autoplayInterval;
let autoplayTimeout;

// Function to initialize the stepper based on current language
function initStepper() {
  const stepperId = languageFlag === 'english' ? '#english-stepper' : '#greek-stepper';
  const stepper = document.querySelector(stepperId);
  
  if (!stepper) return;
  
  progress = stepper.querySelector(".progress");
  steps = stepper.querySelectorAll(".step");
  accordionTriggers = stepper.querySelectorAll(".accordion-trigger");
  accordionBodies = stepper.querySelectorAll(".accordion-body");
  stepContents = stepper.querySelectorAll(".step-content");
  
  // Reset to first step when language changes
  currentActive = 1;
  
  // Set up event listeners
  setupListeners();
  
  // Initialize accordion
  if (accordionBodies.length > 0) {
    const firstBody = accordionBodies[0];
    firstBody.style.height = `${firstBody.scrollHeight}px`;
  }
  
  // Start autoplay
  startAutoplay();
  
  // Update the stepper UI
  update();
}

// Function to set up event listeners
function setupListeners() {
  // Clear previous listeners by cloning and replacing elements
  if (steps) {
    steps.forEach((step, idx) => {
      const newStep = step.cloneNode(true);
      newStep.addEventListener("click", () => {
        soundRestart(pluck);
        goToStep(idx + 1);
      });
      step.parentNode.replaceChild(newStep, step);
    });
    // Re-select the elements after replacing
    steps = document.querySelectorAll(`#${languageFlag}-stepper .step`);
  }

  if (accordionTriggers) {
    accordionTriggers.forEach((trigger, idx) => {
      const newTrigger = trigger.cloneNode(true);
      newTrigger.addEventListener("click", () => {
        soundRestart(pluck);
        goToStep(idx + 1);
      });
      trigger.parentNode.replaceChild(newTrigger, trigger);
    });
    // Re-select the elements after replacing
    accordionTriggers = document.querySelectorAll(`#${languageFlag}-stepper .accordion-trigger`);
  }
}

// Function to update the stepper
function update() {
  if (!steps) return;
  
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
  if (accordionBodies) {
    accordionBodies.forEach((body, idx) => {
      if (idx === currentActive - 1) {
        // Expand the active content
        body.style.transition = "height 0.5s ease";
        body.style.height = `${body.scrollHeight}px`;
        stepContents[idx].classList.add("active");
        stepContents[idx].classList.add("active-content");
      } else {
        // Collapse inactive content
        body.style.transition = "height 0.5s ease";
        body.style.height = "0";
        stepContents[idx].classList.remove("active");
        stepContents[idx].classList.remove("active-content");
      }
    });
  }

  // Update progress bar width
  if (progress) {
    progress.style.width = ((currentActive - 1) / (steps.length - 1)) * 100 + "%";
  }
}

// Function to move to a specific step
function goToStep(stepNumber) {
  currentActive = stepNumber;
  update();
  pauseAutoplay();
}

// Autoplay functionality
function startAutoplay() {
  clearInterval(autoplayInterval);
  
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
  clearInterval(autoplayInterval);
  clearTimeout(autoplayTimeout);

  // Restart autoplay after 8 seconds
  autoplayTimeout = setTimeout(() => {
    startAutoplay();
  }, 8000);
}

/* -------------------------
  Window resize listener
  ------------------------- */
window.addEventListener("resize", () => {
  if (!accordionBodies || currentActive > accordionBodies.length) return;
  
  const activeBody = accordionBodies[currentActive - 1];
  if (activeBody) {
    activeBody.style.height = "auto";
    const newHeight = `${activeBody.scrollHeight}px`;
    activeBody.style.height = newHeight;
  }
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", initStepper);

// Export function to be called when language changes
window.resetStepper = initStepper;