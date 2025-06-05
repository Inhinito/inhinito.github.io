// Stepper variables
let progress, steps, accordionHeaders, accordionBodies, stepContents;
let currentActive = 1;
let autoplayInterval;
let autoplayTimeout;

// Re-calculate the height of the accordion content so that the content under the stepper
// doesn't jump around when the accordion expands or collapses.
function reheightAccordion() {
  const stepperId = languageFlag === 'english' ? '#english-stepper' : '#greek-stepper';
  const accordionContainer = document.querySelector(`${stepperId} .accordion`);
  if (!accordionContainer) return;

  // Get the scoll height of the accordion container.
  const scrollHeight = accordionContainer.scrollHeight;
  // Set the min-height of its parent to the scroll height + 70px so that 
  // the content under the stepper doesn't jump around when the accordion expands.
  accordionContainer.parentNode.style.minHeight = `${scrollHeight + 70}px`;
}

// Function to initialize the stepper based on current language
function initStepper() {
  const stepperId = languageFlag === 'english' ? '#english-stepper' : '#greek-stepper';
  const stepper = document.querySelector(stepperId);
  
  if (!stepper) return;
  
  progress = stepper.querySelector(".progress");
  steps = stepper.querySelectorAll(".step");
  accordionHeaders = stepper.querySelectorAll(".accordion-header");
  accordionBodies = stepper.querySelectorAll(".accordion-body");
  stepContents = stepper.querySelectorAll(".step-content");
  
  // Reset to first step when language changes
  currentActive = 1;

  reheightAccordion();
  
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
  const stepperId = `#${languageFlag}-stepper`;
  
  // Get parent containers
  const progressContainer = document.querySelector(`${stepperId} .progress-container`);
  const contentContainer = document.querySelector(`${stepperId} .content-container`);
  
  // Remove old event listeners if they exist
  if (progressContainer) {
    const newProgressContainer = progressContainer.cloneNode(true);
    progressContainer.parentNode.replaceChild(newProgressContainer, progressContainer);
    
    // Add new event listener to the progress container (parent of steps)
    newProgressContainer.addEventListener('click', (event) => {
      // Find if a step was clicked
      const step = event.target.closest('.step');
      if (!step) return;
      
      // Get the step number from the class name (step-1, step-2, etc.)
      const classes = step.className.split(' ');
      const stepClass = classes.find(cls => cls.startsWith('step-'));
      if (stepClass) {
        const stepNumber = parseInt(stepClass.split('-')[1]);
        soundRestart(pluck);
        goToStep(stepNumber);
      }
    });
  }
  
  // Set up event delegation for accordion headers
  if (contentContainer) {
    const newContentContainer = contentContainer.cloneNode(true);
    contentContainer.parentNode.replaceChild(newContentContainer, contentContainer);
    
    // Add a single event listener to the content container
    newContentContainer.addEventListener('click', (event) => {
      // Check if an accordion header was clicked
      const header = event.target.closest('.accordion-button');
      if (!header) return;
      
      // Find which header was clicked by its position among siblings
      const listItem = header.closest('.step-content');
      if (!listItem) return;
      
      const parent = listItem.parentNode;
      const index = Array.from(parent.children).indexOf(listItem);
      
      soundRestart(pluck);
      goToStep(index + 1);
    });
  }
  
  // Re-select all elements with the updated DOM
  const stepper = document.querySelector(stepperId);
  if (stepper) {
    progress = stepper.querySelector(".progress");
    steps = stepper.querySelectorAll(".step");
    accordionHeaders = stepper.querySelectorAll(".accordion-header");
    accordionBodies = stepper.querySelectorAll(".accordion-body");
    stepContents = stepper.querySelectorAll(".step-content");
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

  reheightAccordion();
});


// Initialize on page load
document.addEventListener("DOMContentLoaded", initStepper);

// Export function to be called when language changes
window.resetStepper = initStepper;